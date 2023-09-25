<template>
  <div class="col-lg-12 col-md-12">
    <div class="tab products-details-tab">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <ul class="tabs">
            <li>
              <a
                :class="{ active: tabs.descriptions }"
                @click="swicthTabs('descriptions')"
                style="cursor: pointer"
              >
                <div class="dot"></div>
                Description
              </a>
            </li>
            <li>
              <a
                :class="{ active: tabs.avis }"
                @click="swicthTabs('avis')"
                style="cursor: pointer"
              >
                <div class="dot"></div>
                Avis{{ comments.length > 0 ? `(${comments.length})` : '' }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-lg-12 col-md-12">
          <div class="tab_content">
            <div v-if="tabs.descriptions" class="tabs_item">
              <div class="products-details-tab-content">
                <p>{{ description }}</p>
              </div>
            </div>
            <div v-if="tabs.avis" class="tabs_item">
              <div class="products-comment-tab-content">
                <div v-if="comments.length > 0" class="row comments-list mb-3">
                  <div v-for="(comment, key) in comments" :key="key" class="col-12 mt-3">
                    <h6 class="user-name">{{ comment.first_name +' '+comment.last_name }} <span class="time">Publier {{ $moment.unix(comment.created_date).fromNow() }}</span></h6>
                    
                    <p>
                      {{ comment.content }}
                    </p>
                    <hr>
                  </div>
                </div>
                <div v-else class="row comments-list mb-3">
                  <div class="col-12">
                    <h6 class="text-center">Auncun commentaire disponible</h6>
                  </div>
                </div>
                <div class="row comments-form">
                  <div v-if="$store.state.authUser" class="col-md-8">
                    <div class="form-group">
                      <label for="comment">Votre commentaire</label><br />
                      <textarea
                        class="form-control"
                        name="comment"
                        rows="6"
                        v-model="commentMsg"
                      >
                        Ecrire ici
                    </textarea
                      >
                    </div>
                    <div class="form-group">
                      <recaptcha />
                    </div>

                    <div class="form-group">
                      <button class="btn btn-primary" @click="sendComment($store.state.authUser.id)">
                        <span v-if="!btnLoader">Envoyer</span
                        ><BLoader v-else loaderColor="#fff" />
                      </button>
                      <p v-if="formError" class="error">
                        {{ formError }}
                      </p>
                    </div>
                  </div>
                  <div v-else class="col-12 text-center">
                    <h6>
                      Souhaitez-vous ajouter un commentaire ? Connectez-vous
                      pour le faire.
                    </h6>
                    <nuxt-link to="/login" class="btn btn-primary mt-3"
                      >Connexion</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h6.user-name {
  font-size: 14px !important;
}
h6.user-name span.time{
  margin: 0px 15px;
  color: #666666;
  font-size: 12px;
}
.products-details-tab .tabs li a.active,
.products-details-tab .tabs li a.active .dot,
.products-details-tab .tabs li a.active .dot::before {
  color: #222222 !important;
}
.comments-list .col-12 hr, .comments-list .col-12 p{
  margin: 0px !important;
}
</style>
<script>
import BLoader from '../../components/common/btnLoader.vue'
import comments from '../../mixins/comments'
import formUtils from '../../mixins/form-utils'

export default {
  props: {
    description: {
      type: String,
      default: 'Aucune description disponible',
    },
    comments: {
      type: Array,
      default: [],
    },
    house: Number,
  },
  components: { BLoader },
  mixins: [comments, formUtils],
  data() {
    return {
      tabs: {
        descriptions: true,
        avis: false,
      },
      commentMsg: 'Ecrire ici',
      formError: null,
      btnLoader: false,
    }
  },
  methods: {
    swicthTabs(tab) {
      let self = this
      Object.keys(self.tabs).forEach((v) => {
        if (v == tab) {
          self.tabs[v] = true
        } else {
          self.tabs[v] = false
        }
      })
    },
    async sendComment(userId){
      this.formError = null

      if(this.commentMsg == 'Ecrire ici' || this.commentMsg == ''){
        this.formError = 'Veuillez saisir votre commentaire'
        return
      }
      let cpvalid = await this.validateCaptcha()
      if(cpvalid == false){
        this.formError = 'Captcha invalide'
        return
      }

      let data = {
        content: this.commentMsg,
        status: 'pending',
        stars_number: 0,
        house: this.house,
        user_id: userId,
      }
      this.btnLoader = true
      const result = await this.addComment(data)

      if(result){
        this.btnLoader = false
        this.commentMsg = 'Ecrire ici'
        this.$toast.success(
          'Votre commentaire est ajouter avec succès et sera visible après validation'
        )
      }else{
        this.btnLoader = false
        this.$toast.error(
          'Une erreur est survenue lors de l\'ajout veuillez reessayer ulterieurement'
        )
      }
    }
  },
}
</script>