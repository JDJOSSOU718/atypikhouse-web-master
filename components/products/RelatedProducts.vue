<template>
  <div>
    <div v-if="relatedProducts.length > 0" class="related-products-area">
      <div class="container">
        <div class="section-title">
          <h2><span class="dot"></span> Location similaire</h2>
        </div>

        <div class="row">
          <ProductItem
            v-for="product in relatedProducts"
            :product="product"
            :key="product.id"
            @clicked="toggle"
            :className="`col-lg-3 col-md-6 col-6`"
          ></ProductItem>
        </div>
      </div>
    </div>
    <QuckView v-if="relatedProducts.length > 0" />
  </div>
</template>

<script>
import ProductItem from '../landing-one/ProductItem'
import { mutations } from '../../utils/sidebar-util'
import QuckView from '../modals/QuckView'
export default {
  components: {
    ProductItem,
    QuckView,
  },
  props: {
    type: {
      type: String,
    },
  },
  data(){
      return {
          relatedProducts: []
      }
  },
  methods: {
    toggle() {
      mutations.toggleQuickView()
    },
    async updateRelatedDataList(){
        let { success, data } = await this.$axios.$get(`${this.$store.state.apiBaseUrl}/api/v1/houses/`)
        if (success) {
            this.relatedProducts = data.filter((item) => {
                return item.status == 'publish' && item.type.toLowerCase().includes(this.type) 
            })
        }
    }
  },
  async created(){
      await this.updateRelatedDataList()
  }
}
</script>