<template>
  <div>
    <TopHeader />
    <Menubar />
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Connexion</li>
        </ul>
      </div>
    </div>

    <div class="login-area ptb-60">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="login-content">
              <div class="section-title">
                <h2><span class="dot"></span> Connexion</h2>
              </div>

              <form class="login-form" v-if="!authUser" @submit.prevent="login">
                <p v-if="formError" class="error">
                  {{ formError }}
                </p>
                <div class="form-group">
                  <label>Email</label>
                  <input
                    v-model="formEmail"
                    type="email"
                    class="form-control"
                    placeholder="test@mail.com"
                    name="email"
                  />
                </div>

                <div class="form-group">
                  <label>Mot de passe</label>
                  <input
                    v-model="formPassword"
                    type="password"
                    class="form-control"
                    placeholder="****"
                    name="password"
                  />
                </div>

                <div class="pl-4p pr-4p form-group">
                  <recaptcha />
                </div>

                <button type="submit" class="btn btn-primary">
                  <span v-if="!btnLoader">Connexion</span
                  ><BLoader v-else loaderColor="#fff" />
                </button>

                <nuxt-link to="/update-password" class="forgot-password"
                  >Mot de passe oublier?</nuxt-link
                >
              </form>
              <div v-else class="col-md-12 text-center">
                <p>Vous etes deja connecté</p>
                <nuxt-link
                  v-if="authUser.grade == 'administrator'"
                  to="/admin"
                  class="btn btn-primary"
                  >Accéder au dashbboard</nuxt-link
                >
                <nuxt-link v-else to="/dashboard" class="btn btn-primary"
                  >Accéder au dashbboard</nuxt-link
                >
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-12">
            <div class="new-customer-content">
              <div class="section-title">
                <h2><span class="dot"></span> Nouveau utilisateur</h2>
              </div>

              <span>Créer un compte</span>
              <p>
                Creer un compte pour avoir accès au logement, les commentés ou
                les reservés
              </p>
              <nuxt-link v-if="!authUser" to="/signup" class="btn btn-light"
                >Créer un compte</nuxt-link
              >
              <nuxt-link
                v-else-if="authUser.grade == 'administrator'"
                to="/admin"
                class="btn btn-primary"
                >Accéder au dashbboard</nuxt-link
              >
              <nuxt-link v-else to="/dashboard" class="btn btn-primary"
                >Accéder au dashbboard</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import formUtils from '../mixins/form-utils'
import BLoader from '../components/common/btnLoader.vue'
import cacheControl from '../middleware/cacheControl'

export default {
  head() {
    return {
      title: 'Atypikhouse - Connexion',
      meta: [
        { hid: 'title', name: 'title', content: 'Atypikhouse - Connexion' },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Atypikhouse, Connexion, Espace utilisateur, Mon compte',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Atypikhouse louez vos biens en ligne! Connectez vous et louer la location de votre choix.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Atypikhouse - Connexion',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Atypikhouse louez vos biens en ligne! Connectez vous et louer la location de votre choix.',
        },
        { hid: 'og:image', property: 'og:image', content: '/icon.png' },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: 'Atypikhouse - Connexion',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content:
            'Atypikhouse louez vos biens en ligne! Connectez vous et louer la location de votre choix.',
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: '/icon.png',
        },
      ],
    }
  },
  components: {
    TopHeader,
    Menubar,
    BLoader,
  },
  data() {
    return {
      formError: null,
      formEmail: '',
      formPassword: '',
      cpvalid: false,
      btnLoader: false,
    }
  },
  mixins: [formUtils],
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  methods: {
    async login() {
      this.formError = null

      if (!this.validateEmail(this.formEmail)) {
        this.formError = 'Veuillez entrer une adresse email valide!'
        return
      }

      if (
        this.formPassword != 'admin' &&
        !this.validatePassword(this.formPassword)
      ) {
        this.formError =
          'Mot de passe trop court! Veuillez entrer un mot de passe valide!'
        return
      }
      this.cpvalid = await this.validateCaptcha()
      if (!this.cpvalid){
        this.formError =
          'Captcha invalide'
        return
      }

      try {
        this.btnLoader = true

        const result = await this.$store.dispatch('login', {
          email: this.formEmail,
          password: this.formPassword,
        })
        if (result) {
          this.btnLoader = false
          this.formEmail = ''
          this.formPassword = ''
          this.formError = null
          if (result.grade == 'administrator') {
            this.$router.push('/admin')
          } else {
            this.$router.push('/dashboard')
          }
        } else {
          this.btnLoader = false
          this.formError =
            'Une erreur est survenue, veuillez verifier vos informations puis réessayer!'
        }
      } catch (error) {
        this.btnLoader = false
        console.log(error.message)
        this.formError =
          'Une erreur est survenue, veuillez verifier vos informations puis réessayer!'
      }
    },
  },
  computed: {
    authUser() {
      return this.$store.state.authUser
    },
  },
}
</script>

<style scope>
  .pl-4p { 
    padding-left: 20%; 
  }

  .pr-4p {
    padding-right: 20%;
  }

</style>