<template>
  <div>
    <TopHeader />
    <Menubar />
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Réinitialisation de mot de passe</li>
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
                @submit.prevent="checkEmail"
              >
                <p v-if="formError" class="error">
                  {{ formError }}
                </p>
                <div class="form-group">
                  <label>Email</label>
                  <input
                    v-model="emailForCheck"
                    type="email"
                    class="form-control"
                    placeholder=""
                    name="email"
                  />
                </div>

                <button type="submit" class="btn btn-primary">
                  <span v-if="!btnLoader">Envoyer</span
                  ><BLoader v-else loaderColor="#fff" />
                </button>
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
      emailForCheck: '',
      password: {
        newPass: '',
        cNewPass: '',
        displayMsg: '',
        msg: '',
      },
    }
  },
  mixins: [formUtils, users],
  methods: {
    async checkEmail() {
      this.formError = null

      if (!this.validateEmail(this.emailForCheck)) {
        this.formError = 'Veuillez entrer une adresse email valide!'
        return
      }

      this.btnLoader = true
      const result = await this.getUserByEmail(this.emailForCheck)
      if (result.success) {
        this.btnLoader = false
        const token = this.uuidv4()
        Cookies.set(`tempUser_${token}`, JSON.stringify(result.data), 1)
        this.sendmail(
          result.data.email,
          'Réinitialisation de mot de passe',
          `Afin de réinitialiser votre mot de passe veuillez cliquez sur le lien suivant: ${window.location.href}/${token}`
        )

        this.$toast.success(
          'Un email de réinitialisation de mot de passe à été envoyer dans votre boite mail.'
        )
      } else {
        this.btnLoader = false
        this.$toast.error(
          "Une erreur s'est produite verifié votre email puis réessayer"
        )
        this.emailForCheck = ''
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