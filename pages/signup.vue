<template>
  <div>
    <TopHeader />
    <Menubar />
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Inscription</li>
        </ul>
      </div>
    </div>

    <div class="signup-area ptb-60">
      <div class="container">
        <div class="signup-content">
          <div class="section-title">
            <h2><span class="dot"></span> Créer un nouveau compte</h2>
          </div>

          <form class="signup-form" @submit.prevent="register">
            <p v-if="formError" class="error">
              {{ formError }}
            </p>
            <div class="form-group">
              <label class="grade-checkbox-wrapper float-right">
                <input
                  class="grade-checkbox"
                  type="radio"
                  value="customer"
                  name="grade"
                  v-model="user.grade"
                />
                <div class="checked-value">Client</div>
              </label>
              <label class="grade-checkbox-wrapper">
                <input
                  class="grade-checkbox"
                  type="radio"
                  value="owner"
                  name="grade"
                  checked
                  v-model="user.grade"
                />
                <div class="checked-value">Propriétaire</div>
              </label>
            </div>
            <div class="form-group">
              <label>Nom</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre nom"
                id="fname"
                name="fname"
                v-model="user.lastname"
              />
            </div>

            <div class="form-group">
              <label>Prénom</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre prénom"
                id="lname"
                name="lname"
                v-model="user.firstname"
              />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Entrer votre email"
                id="email"
                name="email"
                v-model="user.email"
              />
            </div>

            <div class="form-group" v-if="user.grade == 'owner'">
              <label>Ville</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre ville"
                id="city"
                name="city"
                v-model="user.city"
              />
            </div>
            <div class="form-group" v-if="user.grade == 'owner'">
              <label>Pays</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre adresse"
                id="country"
                name="country"
                v-model="user.country"
              />
            </div>
            <div class="form-group">
              <label>Adresse</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre adresse"
                id="address"
                name="address"
                v-model="user.address"
              />
            </div>

            <div class="form-group">
              <label>Téléphone</label>
              <input
                type="text"
                class="form-control"
                placeholder="Téléphone"
                id="phone"
                name="phone"
                v-model="user.phone"
              />
            </div>

            <div class="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                class="form-control"
                placeholder="Mot de passe"
                id="password"
                name="password"
                v-model="user.password"
              />
            </div>

            <div class="form-group">
              <label>Confirmation du mot de passe</label>
              <input
                type="password"
                class="form-control"
                placeholder="Confirmation du mot de passe"
                id="Cpassword"
                name="Cpassword"
                v-model="user.confirmPass"
              />
            </div>

            <div class="pl-4p pr-4p form-group">
              <recaptcha />
            </div>

            <button type="submit" class="btn btn-primary">
              <span v-if="!btnLoader">S'inscrire</span
              ><BLoader v-else loaderColor="#fff" />
            </button>

            <nuxt-link to="/login" class="return-store"
              >Avez-vous déjà un compte ?</nuxt-link
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import formUtils from '../mixins/form-utils'
import users from '../mixins/users'
import BLoader from '../components/common/btnLoader.vue'
import cacheControl from '../middleware/cacheControl'

export default {
  head() {
    return {
      title: 'Atypikhouse - Inscription',
      meta: [
        { hid: 'title', name: 'title', content: 'Atypikhouse - Inscription' },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Atypikhouse, Inscription, Espace utilisateur, Mon compte',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Atypikhouse louez vos biens en ligne! Inscrivez vous et louer la location de votre choix.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Atypikhouse - Inscription',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Atypikhouse louez vos biens en ligne! Inscrivez vous et louer la location de votre choix.',
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
          content: 'Atypikhouse - Inscription',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content:
            'Atypikhouse louez vos biens en ligne! Inscrivez vous et louer la location de votre choix.',
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
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  mixins: [formUtils, users],
  data() {
    return {
      user: {
        grade: 'customer',
        firstname: '',
        lastname: '',
        phone: '',
        address: '',
        email: '',
        social_link: {},
        password: '',
        confirmPass: '',
        city: '',
        country: '',
      },
      formError: null,
      btnLoader: false,
    }
  },
  methods: {
    async register() {
      this.formError = null
      if (
        !this.validateRequiredField(this.user.lastname) ||
        !this.validateRequiredField(this.user.firstname)
      ) {
        this.formError = 'Veuillez renseigner votre nom et prenoms'
        this.scrollToTop()
        return
      }
      
      if (!this.validateEmail(this.user.email)) {
        this.formError = 'Veuillez entrer une adresse email valide!'
        this.scrollToTop()
        return
      }

      if (this.user.grade == 'owner') {
        if (
          !this.validateRequiredField(this.user.city) ||
          !this.validateRequiredField(this.user.country)
        ) {
          this.formError = 'Veuillez renseigner votre ville et pays'
          this.scrollToTop()
          return
        }
      }

      if (!this.validatePhone(this.user.phone)) {
        this.formError = 'Veuillez entrer un numero de téléphone valide'
        this.scrollToTop()
        return
      }

      if (!this.validatePassword(this.user.password)) {
        this.formError =
          'Mot de passe trop court! Veuillez entrer un mot de passe valide 8 caractères minimum qui ne contiennent que des caractères, des chiffres, des lettres majuscule et miniscule.'
        this.scrollToTop()
        return
      }

      if (
        !this.validateConfirmPass(this.user.password, this.user.confirmPass)
      ) {
        this.formError = 'Mot passe non conforme!'
        this.scrollToTop()
        return
      }

      const validcp = await this.validateCaptcha()
      if (validcp == false){
        this.formError = 'Captcha invalide'
        this.scrollToTop()
        return
      }

      this.btnLoader = true
      let userdata = this.user
      delete userdata.confirmPass
      const result = await this.add(userdata, true)
      if (result.success == true) {
        this.btnLoader = false
        this.user = {
          grade: 'customer',
          firstname: '',
          lastname: '',
          phone: '',
          address: '',
          email: '',
          social_link: {},
          password: '',
          confirmPass: '',
        }
        this.$toast.success(result.message)
      } else {
        this.btnLoader = false
        this.$toast.error(result.message)
      }
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