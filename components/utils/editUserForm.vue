<template>
  <div class="container">
    <div class="mb-5">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span>Modifier le profile</h2>
      </div>

      <form class="signup-form" @submit.prevent="editUser">
        <p v-if="formError" class="error">
          {{ formError }}
        </p>
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Nom *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre nom"
                id="lastname"
                name="lastname"
                v-model="user.lastname"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Prénom *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre prenom"
                id="firstname"
                name="firstname"
                v-model="user.firstname"
              />
            </div>
          </div>
          <div v-if="!provData.last_name" class="col-lg-12 col-md-12">
            <div class="form-group">
              <label>Email *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre email"
                id="email"
                name="email"
                v-model="user.email"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Téléphone *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre Téléphone"
                id="phone"
                name="phone"
                v-model="user.phone"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>votre adresse *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer votre adresse"
                id="address"
                name="address"
                v-model="user.address"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Profile facebook</label>
              <input
                type="text"
                class="form-control"
                placeholder="Lien de votre profile"
                id="fblink"
                name="fblink"
                v-model="user.social_link[0]"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Profile intagram</label>
              <input
                type="text"
                class="form-control"
                placeholder="Lien de votre profile"
                id="instalink"
                name="instalink"
                v-model="user.social_link[1]"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Profile linkedin</label>
              <input
                type="text"
                class="form-control"
                placeholder="Lien de votre profile"
                id="inlink"
                name="onlink"
                v-model="user.social_link[2]"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Profile twitter</label>
              <input
                type="text"
                class="form-control"
                placeholder="Lien de votre profile"
                id="twlink"
                name="twlink"
                v-model="user.social_link[3]"
              />
            </div>
          </div>

          <div
            v-if="$store.state.authUser.grade == 'administrator'"
            class="col-md-12"
          >
            <div class="form-group">
              <label>Role *</label>
              <select
                name="grade"
                class="form-control"
                id="grade"
                v-model="user.grade"
              >
                <option value="customer">Client</option>
                <option value="owner">Propriétaire</option>
                <option value="administrator">Administrateur</option>
              </select>
            </div>
          </div>
          <div v-if="!provData.last_name" class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Mot de passe *</label>
              <input
                type="password"
                class="form-control"
                placeholder="Nouveau mot de passe"
                id="password"
                name="password"
                v-model="user.password"
              />
            </div>
          </div>
          <div v-if="!provData.last_name" class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Confirmation du mot de passe *</label>
              <input
                type="password"
                class="form-control"
                placeholder="Confirmation du mot de passe"
                id="Cpassword"
                name="Cpassword"
                v-model="user.confirmPass"
              />
            </div>
          </div>

          <div class="col-md-12 text-center">
            <button
              type="submit"
              class="btn btn-primary"
              style="width: 60%; display: inline-block"
              :disabled="formDisabled"
            >
              <span v-if="!btnLoader">{{
                provData.last_name ? 'Modifier' : 'Ajouter'
              }}</span>
              <BLoader v-else loaderColor="#fff" />
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="provData.last_name" class="mt-5 mb-5">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span>Modifier le mot de passe</h2>
      </div>

      <form
        class="signup-form"
        @submit.prevent="updatePass"
        id="change-password"
      >
        <p v-if="password.formError" class="error">
          {{ password.formError }}
        </p>
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="form-group">
              <label>Ancien mot de passe *</label>
              <input
                type="password"
                class="form-control"
                placeholder="Ancien mot de passe"
                id="oldpass"
                name="oldpass"
                v-model="password.data.oldPass"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Nouveau mot de passe *</label>
              <input
                type="password"
                class="form-control"
                placeholder="Nouveau mot de passe"
                id="newpass"
                name="newpass"
                v-model="password.data.newPass"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Confirmation du mot de passe *</label>
              <input
                type="password"
                class="form-control"
                placeholder="Confirmation du mot de passe"
                id="cnewpass"
                name="cnewpass"
                v-model="password.data.cNewPass"
              />
            </div>
          </div>

          <div class="col-md-12 text-center">
            <button
              type="submit"
              class="btn btn-primary"
              style="width: 60%; display: inline-block"
              :disabled="password.formDisabled"
            >
              <span v-if="!password.btnLoader">Modifier</span>
              <BLoader v-else loaderColor="#fff" />
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="row mt-2">
      <div class="col-md-12">
        <b-button
          v-if="
            provData.last_name
          "
          v-b-tooltip.hover
          title="Appuyez pour supprimer définitivement cet utilisateur"
          class="float-left"
          variant="danger"
          @click="showConfirmation()"
          >Supprimer</b-button
        >
      </div>
    </div>
    <Confirmation
      v-if="
        provData.last_name
      "
      @confirmation="delUser"
    />
  </div>
</template>
<script>
import BLoader from '../../components/common/btnLoader.vue'
import Confirmation from '../../components/modals/Confirmation'
import formUtils from '../../mixins/form-utils'
import users from '../../mixins/users'

export default {
  props: {
    provData: {
      type: Object,
      default: () => ({}),
    },
    notify: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BLoader,
    Confirmation,
  },
  mixins: [formUtils, users],
  data() {
    return {
      formError: null,
      user: {
        lastname: this.provData.last_name ? this.provData.last_name : '',
        firstname: this.provData.first_name ? this.provData.first_name : '',
        address: this.provData.address ? this.provData.address : '',
        phone: this.provData.phone ? this.provData.phone : '',
        social_link: {
          0:
            this.provData.social_link && this.provData.social_link[0]
              ? this.provData.social_link[0]
              : '',
          1:
            this.provData.social_link && this.provData.social_link[1]
              ? this.provData.social_link[1]
              : '',
          2:
            this.provData.social_link && this.provData.social_link[2]
              ? this.provData.social_link[2]
              : '',
          3:
            this.provData.social_link && this.provData.social_link[2]
              ? this.provData.social_link[2]
              : '',
        },
        grade: this.provData.grade ? this.provData.grade : 'customer',
        city: this.provData.city ? this.provData.city : '',
        country: this.provData.country ? this.provData.country : '',
        confirmPass: '',
        password: '',
        email: '',
      },
      disableForm: false,
      btnLoader: false,
      formDisabled: false,
      password: {
        formError: null,
        disableForm: false,
        btnLoader: false,
        formDisabled: false,
        data: {
          oldPass: '',
          newPass: '',
          cNewPass: '',
        },
      },
    }
  },
  methods: {
    async editUser() {
      let result = null
      this.formError = null
      if (
        !this.validateRequiredField(this.user.lastname) ||
        !this.validateRequiredField(this.user.firstname) ||
        !this.validateRequiredField(this.user.address) ||
        !this.validateRequiredField(this.user.grade)
      ) {
        this.formError =
          'Un ou plusieurs champs requis! veuillez remplir tout les champs comportant *'
        this.scrollToTop()
        return
      }

      if (!this.validatePhone(this.user.phone)) {
        this.formError = 'Veuillez entrer un numéro de téléphone valide'
        this.scrollToTop()
        return
      }

      if (!this.provData.last_name && !this.validateEmail(this.user.email)) {
        this.formError = 'Veuillez entrer une adresse email valide!'
        this.scrollToTop()
        return
      }

      if (
        !this.provData.last_name &&
        !this.validatePassword(this.user.password)
      ) {
        this.formError =
          'Mot de passe trop court! Veuillez entrer un mot de passe valide de 8 charactères minimum!'
        this.scrollToTop()
        return
      }

      if (
        !this.provData.last_name &&
        !this.validateConfirmPass(this.user.password, this.user.confirmPass)
      ) {
        this.formError = 'Mot passe non conforme!'
        this.scrollToTop()
        return
      }

      this.btnLoader = true
      this.formDisabled = true
      if (this.provData && this.provData.last_name) {
        let { firstname, lastname, address, phone, grade, social_link } = this.user
        result = await this.edit({ firstname, lastname, address, phone, grade, social_link }, this.provData.id)
      } else {
        let { firstname, lastname, address, phone, grade, social_link, email, password } = this.user
        result = await this.add({ firstname, lastname, address, phone, grade, social_link, email, password })
      }

      if (await result.success) {
        this.btnLoader = false
        this.formDisabled = false
        if (this.provData && this.provData.last_name) {
          this.$toast.success('Informations modifier avec succès.')
        } else {
          this.$toast.success('Utilisateur ajouter avec succès.')
          this.resetForm();
        }
        this.formError = null
      } else {
        this.btnLoader = false
        this.formDisabled = false
        if (this.provData && this.provData.last_name) {
          this.$toast.error('Une erreur est survenue lors de la modification.')
        } else {
          this.$toast.error("Une erreur est survenue lors de l'ajout.")
        }

        this.formError = null
      }
    },
    async updatePass() {
      let result = null
      this.password.formError = null
      if (
        !this.validateRequiredField(this.password.data.oldPass) ||
        !this.validateRequiredField(this.password.data.newPass)
      ) {
        this.password.formError =
          'Un ou plusieurs champs requis! veuillez remplir tout les champs comportant *'
        return
      }

      if (!this.validatePassword(this.password.data.newPass)) {
        this.password.formError =
          'Mot de passe trop court! Veuillez entrer un mot de passe valide 8 caractères minimum qui ne contiennent que des caractères, des chiffres, des lettres majuscule et miniscule.'
        return
      }

      if (
        !this.validateConfirmPass(
          this.password.data.newPass,
          this.password.data.cNewPass
        )
      ) {
        this.password.formError =
          'Les mots de passse entrés ne correspondent pas'
        return
      }
      this.password.btnLoader = true
      this.password.formDisabled = true
      const checkoldPass = await this.login(
        this.provData.email,
        this.password.data.oldPass
      )

      if (checkoldPass.success) {
        let getTokken = this.$store.state.authUser.login_session_token
        result = await this.updateUserPass(
          getTokken,
          this.provData.id,
          this.password.data.newPass
        )
        if (result.success) {
          this.password.btnLoader = false
          this.password.formDisabled = false
          this.$toast.success('Mot de passe modifier avec succès.')
          this.password.formError = null
          this.resetPassForm()
        } else {
          this.password.btnLoader = false
          this.password.formDisabled = false
          this.password.formError = null
          this.$toast.error('Une erreur est survenue lors de la modification.')
        }
      } else {
        this.password.btnLoader = false
        this.password.formDisabled = false
        this.password.formError = null
        this.$toast.error('Ancien mot de passe incorrect.')
      }
    },
    resetPassForm() {
      this.password.data = {
        oldPass: '',
        newPass: '',
        cNewPass: '',
      }
    },
    resetForm() {
      this.user = {
        lastname: '',
        firstname: '',
        address: '',
        phone: '',
        social_link: {
          0: '',
          1: '',
          2: '',
          3: '',
        },
        grade: 'customer',
        confirmPass: '',
        password: '',
        email: '',
      }
    },
    showConfirmation() {
      this.$bvModal.show('confirmation-modal')
    },
    async delUser(confirmation) {
      if (!confirmation) {
        return
      }
      const result = this.deleteUser(this.provData.id)
      if (result) {
        this.$toast.success('Utiliateur supprimer avec succès.')
        this.$router.push('/admin')
      } else {
        this.$toast.error(
          'Une erreur est survenue. Veuillez réessayer plutard!'
        )
      }
    },
  },
}
</script>