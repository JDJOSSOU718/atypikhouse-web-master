<template>
  <div class="container">
    <div class="">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span> Modifier un commentaire</h2>
      </div>

      <form class="signup-form" @submit.prevent="edit">
        <p v-if="formError" class="error">
          {{ formError }}
        </p>
        <div class="row">
          <div v-if="$store.state.authUser.grade == 'administrator'" class="col-md-12">
            <div class="form-group">
              <label>Titre *</label>
              <textarea class="form-control" name="content" rows="6" v-model="comment.content">

              </textarea>
            </div>
          </div>
          <div v-else class="col-md-12">
              <p>{{ comment.content }}</p>
          </div>
          <div
            v-if="$store.state.authUser.grade == 'administrator'"
            class="col-md-12"
          >
            <div class="form-group">
              <label>Status *</label>
              <select
                name="status"
                class="form-control"
                id="status"
                v-model="comment.status"
              >
                <option value="pending">En attente</option>
                <option value="ban">Bloquer</option>
                <option value="publish">Publier</option>
              </select>
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
  </div>
</template>
<script>
import BLoader from '../../components/common/btnLoader.vue'
import formUtils from '../../mixins/form-utils'
import comments from '../../mixins/comments'


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
    BLoader
  },
  mixins: [formUtils, comments],
  data() {
    return {
      formError: null,
      comment: {
        content: this.provData.content ? this.provData.content : '',
        status: this.provData.status ? this.provData.status : 'pending',
        stars_number: this.provData.stars_number ? this.provData.stars_number : 0
      },
      btnLoader: false,
      formDisabled: false,
    }
  },
  methods: {
    async edit() {
      this.formError = null
      if (
        !this.validateRequiredField(this.comment.content) ||
        !this.validateRequiredField(this.comment.status)
      ) {
        this.formError =
          'Un ou plusieurs champs requis! veuillez remplir tout les champs comportant *'
        this.scrollToTop()
        return
      }

      this.btnLoader = true
      this.formDisabled = true
      const result = await this.editComment(this.provData.id, this.comment)

      if (result) {
        this.btnLoader = false
        this.formDisabled = false
        this.$toast.success('Commentaire modifier avec succès.')
        
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
  },
}
</script>