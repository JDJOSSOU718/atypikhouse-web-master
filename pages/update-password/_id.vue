<template>
  <div>
    <TopHeader />
    <Menubar />
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Définition du nouveau mot de passe</li>
        </ul>
      </div>
    </div>

    <div class="login-area ptb-60">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-12"></div>
          <div class="col-lg-6 col-md-12">
            <div class="login-content">
              <form
                class="login-form"
                v-if="!authUser"
                @submit.prevent="resetPass"
              >
                <div v-if="!displayMsg">
                  <p v-if="formError" class="error">
                    {{ formError }}
                  </p>
                  <div class="form-group">
                    <label>Nouveau mot de passe</label>
                    <input
                      v-model="newPass"
                      type="password"
                      class="form-control"
                      placeholder="*******"
                      name="mdp"
                    />
                  </div>
                  <div class="form-group">
                    <label>Confirmation du mot de passe</label>
                    <input
                      v-model="cNewPass"
                      type="password"
                      class="form-control"
                      placeholder="*******"
                      name="cmdp"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    <span v-if="!btnLoader">Enregistrer</span
                    ><BLoader v-else loaderColor="#fff" />
                  </button>
                </div>
                <div v-else>
                  <h3 class="text-center">{{ msg }}</h3>
                </div>
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

          <div class="col-lg-3 col-md-12"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../../layouts/TopHeader'
import Menubar from '../../layouts/Menubar'
import formUtils from '../../mixins/form-utils'
import users from '../../mixins/users'
import BLoader from '../../components/common/btnLoader.vue'
import Cookies from 'js-cookie'

export default {
  validate({ params }) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      params.id
    )
  },
  head() {
    return {
      title: 'Atypikhouse - Réinitialisation de mot de passe',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Atypikhouse - Réinitialisation de mot de passe',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Atypikhouse, Mot de passe',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Réinitialisation de mot de passe',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Atypikhouse - Réinitialisation de mot de pass',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Réinitialisation de mot de passe',
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
          content: 'Atypikhouse - Réinitialisation de mot de pass',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: 'Réinitialisation de mot de passe',
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
      btnLoader: false,
      newPass: '',
      cNewPass: '',
      displayMsg: false,
      msg: 'Cet lien est déjà expiré',
      user: null,
    }
  },
  mixins: [formUtils, users],
  methods: {
    async resetPass() {
      this.formError = null
      if (!this.validatePassword(this.newPass)) {
        this.formError =
          'Mot de passe trop court! Veuillez entrer un mot de passe valide 8 caractères minimum qui ne contiennent que des caractères, des chiffres, des lettres majuscule et miniscule.'
        return
      }

      if (this.newPass !== this.cNewPass) {
        this.formError = 'Mot de passe non conforme!'
        return
      }

      this.btnLoader = true
      const result = await this.updateUserPass(
        this.user.login_session_token,
        this.user.id,
        this.newPass
      )
      if (result.success) {
        this.$toast.success('Mot de passe modifier avec succès!')
        this.newPass = ''
        this.cNewPass = ''
        const that = this
        Cookies.remove(`tempUser_${this.$route.params.id}`)
        setTimeout(() => {
          that.btnLoader = false
          that.$router.push('/login')
        }, 800)
      } else {
        this.btnLoader = false
        this.$toast.error(
          "Une erreur s'est produite veuillez reessayer plutard"
        )
      }
    },
  },
  computed: {
    authUser() {
      return this.$store.state.authUser
    },
  },
  mounted() {
    if (Cookies.get(`tempUser_${this.$route.params.id}`)) {
      this.user = JSON.parse(Cookies.get(`tempUser_${this.$route.params.id}`))
    } else {
      this.displayMsg = true
    }
  },
}
</script>