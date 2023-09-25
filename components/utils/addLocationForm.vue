<template>
  <div class="container">
    <div class="">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span> Ajouter une location</h2>
      </div>

      <form class="signup-form" @submit.prevent="add">
        <p v-if="formError" class="error">
          {{ formError }}
        </p>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Titre *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer un titre"
                id="htitle"
                name="htitle"
                v-model="house.title"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label>Descriptions *</label>
              <textarea
                class="form-control"
                id="hdesc"
                name="hdesc"
                rows="6"
                v-model="house.description"
              >
              </textarea>
            </div>
          </div>
          <div class="col-lg-12 col-md-12">
            <div class="form-group">
              <label>Adresse *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer l'adresse"
                id="haddress"
                name="haddress"
                v-model="house.location"
              />
            </div>
          </div>
          <div class="col-lg-12 col-md-12">
            <div class="form-group">
              <label>type</label>
              <select
                class="form-control"
                name="htype"
                id="htype"
                v-model="house.type"
              >
                <option value="" disabled>Séléctionner le type</option>
                <option value="tente">Tente</option>
                <option value="cube">Cube</option>
                <option value="tiny">Tiny House</option>
                <option value="yourt">Yourt</option>
                <option value="cabane">Cabane</option>
              </select>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Nombre de couchage *</label>
              <input
                type="number"
                class="form-control"
                placeholder="Entrer le nombre"
                id="hcouchage"
                name="hcouchage"
                v-model="house.nbr_couchage"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Capacités *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer la capacité"
                id="hcapacity"
                name="hcapacity"
                v-model="house.capacity"
              />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Prix *</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Entrer le prix"
                  id="hprice"
                  name="hprice"
                  v-model="house.price"
                />
                <div class="input-group-append">
                  <span
                    class="input-group-text"
                    style="background-color: #f5f5f5; border-color: #f5f5f5"
                    >€</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="form-group">
              <label>Equipements</label>
              <multiselect
                class="form-control no-padding"
                v-model="house.equipements"
                placeholder="Sélection d'équipement"
                label="name"
                track-by="id"
                :options="equipementsOptions"
                :multiple="true"
                :searchable="true"
                :loading="equipementsIsLoading"
                :internal-search="true"
                :close-on-select="false"
                :preserve-search="true"
                :show-no-results="false"
                :clear-on-select="false"
                :preselect-first="true"
                selectLabel="Appuyez entré pour selectionner"
                selectedLabel="Sélectionné"
                deselectLabel="Appuyez entré déselectionner"
                :limit="equipLimit"
                :limitText="limiTexte"
                :max="equipMax"
              >
                
              </multiselect>
            </div>
          </div>
          <div class="col-lg-12 col-md-12">
            <div class="form-group">
              <label>Jours d'indisponibilité </label>
              <vc-date-picker
                color="green"
                :columns="$screens({ default: 1, laptop: 2, desktop: 2 })"
                is-range
                :attributes="calendarAttrs"
                v-model="callendarOffdays"
              />
            </div>
          </div>
          <div
            v-if="$store.state.authUser.grade == 'administrator'"
            class="col-md-12"
          >
            <div class="form-group">
              <label>Status *</label>
              <select
                name="hstatus"
                class="form-control"
                id="hstatus"
                v-model="house.status"
              >
                <option value="pending">En attente</option>
                <option value="ban">Non autorisé</option>
                <option value="publish">Publier</option>
              </select>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label>Images</label>
              <input
                v-if="
                  fileProgressBar.inProgress == false &&
                  fileProgressBar.isFinished == false
                "
                ref="himages"
                type="file"
                class="form-control mb-2"
                id="himages"
                name="himages"
                multiple
                @change="uploadFiles()"
              />
              <b-progress
                v-if="fileProgressBar.inProgress == true"
                :max="pbarmax"
                variant="dark"
              >
                <b-progress-bar
                  :value="fileProgressBar.pbarvalue"
                  :label="`${parseInt(
                    (fileProgressBar.pbarvalue / fileProgressBar.pbarmax) * 100
                  )} %`"
                ></b-progress-bar>
              </b-progress>
              <div v-if="fileProgressBar.isFinished == true">
                <a
                  v-for="(name, k) in filesNames"
                  :key="k"
                  class="badge badge-pill badge-dark m-2"
                  @click="removefile(k)"
                  >{{ name }}
                  <i style="margin-left: 5px" class="fa fa-times"></i
                ></a>
              </div>
              <div
                v-if="provData.id && Object.keys(house.photos).length !== 0"
                class="col-12"
              >
                <img
                  v-for="(photo, y) in house.photos"
                  :key="y"
                  :src="photo"
                  class="thumbnail-img"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12 text-center">
            <button
              type="submit"
              class="btn btn-primary"
              style="width: 60%; display: inline-block"
              :disabled="formDisabled"
            >
              <span v-if="!btnLoader">Enregistrer</span>
              <BLoader v-else loaderColor="#fff" />
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="row mt-2">
      <div class="col-md-12">
        <b-button
          v-if="provData.id"
          v-b-tooltip.hover
          title="Appuyez pour supprimer définitivement ce Bien"
          class="float-left"
          variant="danger"
          @click="showConfirmation()"
          >Supprimer</b-button
        >
      </div>
    </div>
    <Confirmation v-if="provData.id" @confirmation="delHouse" />
  </div>
</template>
<script>
import BLoader from '../../components/common/btnLoader.vue'
import Confirmation from '../../components/modals/Confirmation'
import Multiselect from 'vue-multiselect'
import formUtils from '../../mixins/form-utils'
import users from '../../mixins/users'
import houses from '../../mixins/houses'
import equipment from '~/mixins/equipment'

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
    Multiselect,
  },
  mixins: [formUtils, users, houses, equipment],
  data() {
    return {
      formError: null,
      house: {
        title: this.provData.title ? this.provData.title : '',
        description: this.provData.description ? this.provData.description : '',
        status: this.provData.status ? this.provData.status : 'pending',
        type: this.provData.type ? this.provData.type : '',
        nbr_couchage: this.provData.nbr_couchage
          ? this.provData.nbr_couchage
          : '',
        capacity: this.provData.capacity ? this.provData.capacity : '',
        price: this.provData.price ? this.provData.price : 0,
        photos: this.provData.photos ? this.provData.photos : {},
        user_id: this.$store.state.authUser.id,
        location: this.provData.location ? this.provData.location : '',
        off_days: this.provData.off_days ? this.provData.off_days : [],
        equipements: this.provData.equipements ? this.provData.equipements : [],
      },
      disableForm: false,
      btnLoader: false,
      fileProgressBar: {
        pbarmax: 100,
        pbarvalue: '0',
        inProgress: false,
        isFinished: false,
      },
      files: null,
      filesNames: [],
      formDisabled: false,
      calendarAttrs: [
        {
          key: 'today',
          dot: true,
          dates: new Date(),
          popover: {
            label: "Aujourd'hui",
          },
        },
      ],
      callendarOffdays: {
        start: null,
        end: null,
      },
      equipementsOptions: [],
      equipementsIsLoading: false,
      equipLimit: 3,
      equipMax: 6,
    }
  },
  methods: {
    async uploadFiles() {
      this.files = this.$refs.himages.files

      this.formError = null
      if (this.files === '') {
        this.formError = 'Fichier(s) non uploader!'
        this.$refs.himages.value = ''
        this.files = null
        this.scrollToTop()
        return
      }

      if (
        !this.checkFileExt(this.files, [
          'jpg',
          'png',
          'PNG',
          'JPG',
          'JPEG',
          'jpeg',
        ])
      ) {
        this.formError =
          'Type de Fichier(s) non valide! Type de fichier valide jpg et png'
        this.$refs.himages.value = ''
        this.files = null
        this.scrollToTop()
        return
      }

      var formData = new FormData()
      const getTokken = this.$store.state.authUser.login_session_token
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append(`images${i}`, file)
      }
      this.filesNames = this.keepFilesArrays(this.files)
      const that = this
      await that.$axios
        .$post(
          that.$store.state.apiBaseUrl + '/api/v1/houses/images/',
          formData,
          {
            withCredentials: false,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'multipart/form-data',
              authorization: getTokken,
            },
            onUploadProgress: function (progressEvent) {
              that.fileProgressBar.pbarvalue = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
            }.bind(that),
          }
        )
        .then((response) => {
          if (response.success) {
            that.fileProgressBar.inProgress = false
            that.fileProgressBar.isFinished = true
            for (let index = 0; index < response.files.length; index++) {
              that.house.photos[index] = response.files[index]
            }
            that.files = null
          } else {
            that.fileProgressBar.inProgress = false
            that.fileProgressBar.isFinished = false
            that.files = null
            that.formError =
              'Une erreur est survenue! Veuillez réessayer ulteriement!'
            that.scrollToTop()
          }
        })
        .catch((error) => {
          that.fileProgressBar.inProgress = false
          that.fileProgressBar.isFinished = false
          that.files = null
          that.formError =
            'Une erreur est survenue! Veuillez réessayer ulteriement!'
          that.scrollToTop()
        })
    },
    removefile(key) {
      if (this.filesNames.length == 1) {
        that.fileProgressBar.inProgress = false
        that.fileProgressBar.isFinished = false
      }
      this.filesNames = this.filesNames.splice(key, 1)

      delete this.house.photos[key]
    },
    async add() {
      this.formError = null
      if (
        !this.validateRequiredField(this.house.title) ||
        !this.validateRequiredField(this.house.description) ||
        !this.validateRequiredField(this.house.type) ||
        !this.validateRequiredField(this.house.nbr_couchage) ||
        !this.validateRequiredField(this.house.capacity) ||
        !this.validateRequiredField(this.house.price) ||
        !this.validateRequiredField(this.house.location)
      ) {
        this.formError =
          'Un ou plusieurs champs requis! veuillez remplir tout les champs comportant *'
        this.scrollToTop()
        return
      }

      if (!this.validateRequiredField(this.house.price)) {
        this.formError = 'Veuillez renseigner un prix valide!'
        this.scrollToTop()
        return
      }

      const getTokken = this.$store.state.authUser.login_session_token
      this.btnLoader = true
      this.formDisabled = true
      let result = null
      if (this.provData.id) {
        result = await this.$axios.$put(
          `${this.$store.state.apiBaseUrl}/api/v1/houses/${this.provData.id}`,
          this.house,
          {
            withCredentials: false,
            headers: {
              'Access-Control-Allow-Origin': '*',
              authorization: getTokken,
            },
          }
        )
      } else {
        result = await this.$axios.$post(
          `${this.$store.state.apiBaseUrl}/api/v1/houses/`,
          this.house,
          {
            withCredentials: false,
            headers: {
              'Access-Control-Allow-Origin': '*',
              authorization: getTokken,
            },
          }
        )
      }

      if (await result.success) {
        this.btnLoader = false
        this.formDisabled = false
        if (!this.provData.id) {
          if (this.notify) {
            this.sendmail(
              process.env.ADMINEMAIL,
              `Nouveau bien`,
              `Nouveau bien ajouter par ${this.$store.state.authUser.first_name} ${this.$store.state.authUser.last_name}`
            )
          }
          this.$toast.success('Votre location a été créer avec succès.')
          this.resetForm()
        } else {
          this.$toast.success('Bien modifier avec succès.')
        }
      } else {
        this.btnLoader = false
        this.formDisabled = false
        this.formError =
          "Une erreur s'est produite lors de la création veuillez reessayer ulterieurement"
      }
    },
    resetForm() {
      this.house = {
        title: '',
        description: '',
        status: 'pending',
        type: '',
        nbr_couchage: '',
        capacity: '',
        price: '0',
        photos: {},
        user_id: this.$store.state.authUser.id,
        off_days: {},
      }
      this.fileProgressBar.inProgress = false
      this.fileProgressBar.isFinished = false
      this.filesNames = []
      this.files = null
      this.formDisabled = false
    },
    showConfirmation() {
      this.$bvModal.show('confirmation-modal')
    },
    async delHouse(confirmation) {
      if (!confirmation) {
        return
      }
      const result = await this.deleteHouse(this.provData.id)

      if (result) {
        this.$toast.success('Bien supprimer avec succès.')
        const that = this
        setTimeout(() => {
          if (that.$store.state.authUser.grade == 'administrator') {
            that.$router.push('/admin/locations-lists')
          } else {
            that.$router.push('/dashboard/locations-lists')
          }
        }, 600)
      } else {
        this.$toast.error(
          'Une erreur est survenue. Veuillez réessayer plutard!'
        )
      }
    },
    limiTexte(count){
      return `et ${count} en plus...`
    }
  },
  async created() {
    if (Array.isArray(this.house.off_days) && this.house.off_days.length > 0) {
      this.callendarOffdays.start = new Date(
        Math.min(...this.house.off_days) * 1000
      )
      this.callendarOffdays.end = new Date(
        Math.max(...this.house.off_days) * 1000
      )
    }
    this.equipementsIsLoading = true
    let re = await this.getEquipments()
    if (re) this.equipementsOptions = re
    this.equipementsIsLoading = false
  },
  watch: {
    callendarOffdays() {
      this.house.off_days = this.getDatesInRange(
        this.callendarOffdays.start,
        this.callendarOffdays.end
      )
    },
  },
}
</script>
<style>
img.thumbnail-img {
  display: inline;
  margin: 15px 7px;
  width: 80px;
  height: 80px;
}
.multiselect__content-wrapper .multiselect__content{
  list-style-type: none !important;
}

.multiselect__tags{
  height: 45px !important;
  padding: 12px 0px;
  background: #f5f5f5 !important;
}
.multiselect__element{
  padding: 8px 0;
}
.no-padding{
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>