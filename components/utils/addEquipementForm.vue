<template>
  <div class="container">
    <div class="">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span> Ajouter un équipement</h2>
      </div>

      <form class="signup-form" @submit.prevent="add">
        <p v-if="formError" class="error">
          {{ formError }}
        </p>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Nom *</label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrer un titre"
                id="htitle"
                name="htitle"
                v-model="equip.name"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label>Icon </label>
              <multiselect
                class="form-control no-padding"
                v-model="equip.icon"
                placeholder="Icon"
                :options="options"
                :option-height="50"
                :show-labels="false"
                :searchable="false"
                :allow-empty="false"
              >
                <template slot="singleLabel" slot-scope="props">
                  <i
                    :class="'option__icon fa-lg fa ' + props.option"
                    :alt="props.option"
                  ></i>
                </template>
                <template slot="option" slot-scope="props">
                  <i
                    :class="'option__icon fa-2x fa ' + props.option"
                    :alt="props.option"
                  >
                  </i>
                </template>
              </multiselect>
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
          v-if="EquipData.id"
          v-b-tooltip.hover
          title="Appuyez pour supprimer définitivement cet équipement"
          class="float-left"
          variant="danger"
          @click="showConfirmation()"
          >Supprimer</b-button
        >
      </div>
    </div>
    <Confirmation v-if="EquipData.id" @confirmation="delEquip" />
  </div>
</template>
<script>
import BLoader from '../../components/common/btnLoader.vue'
import Confirmation from '../../components/modals/Confirmation'
import formUtils from '../../mixins/form-utils'
import equipementUtils from '../../mixins/equipment'
import Multiselect from 'vue-multiselect'

export default {
  props: {
    EquipData: {
      type: Object,
      default: () => ({}),
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
  mixins: [formUtils, equipementUtils],
  data() {
    return {
      formError: null,
      equip: {
        name: this.EquipData.name ? this.EquipData.name : '',
        icon: this.EquipData.icon ? this.EquipData.icon : '',
      },
      options: [
        'fa-wifi',
        'fa-bath',
        'fa-shower',
        'fa-car',
        'fa-utensils',
        'fa-tv',
        'fa-thermometer-full',
        'fa-bed',
      ],
      disableForm: false,
      btnLoader: false,
      formDisabled: false,
    }
  },
  methods: {
    async add() {
      this.formError = null
      if (!this.validateRequiredField(this.equip.name)) {
        this.formError =
          'Un ou plusieurs champs requis! veuillez remplir tout les champs comportant *'
        this.scrollToTop()
        return
      }

      const getTokken = this.$store.state.authUser.login_session_token
      this.btnLoader = true
      this.formDisabled = true
      let result = null
      if (this.EquipData.id) {
        result = await this.editEquipment(this.EquipData.id, this.equip)
      } else {
        result = await this.addEquipment(this.equip)
      }

      if (result) {
        this.btnLoader = false
        this.formDisabled = false
        if (!this.EquipData.id) {
          this.$toast.success('Votre équipement a été créer avec succès.')
          this.resetForm()
        } else {
          this.$toast.success('Equipement modifier avec succès.')
        }
      } else {
        this.btnLoader = false
        this.formDisabled = false
        this.formError =
          "Une erreur s'est produite lors de la création veuillez reessayer ulterieurement"
      }
    },
    resetForm() {
      this.equip = {
        nom: '',
        icon: '',
      }
      this.formDisabled = false
    },
    showConfirmation() {
      this.$bvModal.show('confirmation-modal')
    },
    async delEquip(confirmation) {
      if (!confirmation) {
        return
      }
      const result = await this.deleteEquipment(this.EquipData.id)

      if (result) {
        this.$toast.success('Equipement supprimer avec succès.')
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
  },
}
</script>
<style>
.no-padding{
  padding-left: 0px !important;
  padding-right: 0px !important;
}
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

</style>