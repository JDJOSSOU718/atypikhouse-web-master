<template>
  <div class="col-lg-8 col-md-12">
    <div class="products-filter-options">
      <div class="row align-items-center"></div>
    </div>

    <div id="products-filter" class="products-collections-listing row">
      <ProductItem
        v-for="(product, index) in currentsProducts"
        :product="product"
        :key="index"
        @clicked="toggle"
        :className="`col-lg-6 col-md-6 products-col-item`"
      ></ProductItem>
      <div v-if="currentsProducts.length == 0" class="col-12 text-center">
        <h3>Location non trouvé</h3>
      </div>
    </div>

    <Paginations
      v-if="pagination.total > pagination.perPage"
      :perPage="pagination.perPage"
      :total="pagination.total"
      :value="pagination.default"
      @input="changePage"
    />

    <QuckView :product="quickViewProduct" />
  </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import { mutations } from '../../utils/sidebar-util'
import ProductItem from '../landing-one/ProductItem'
import Paginations from '../common/Paginations'
import formUltis from '../../mixins/form-utils'
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    priceRange: {
      type: Object,
      default: () => ({}),
    },
    defaultType: {
      type: String,
      default: null,
    },
    query: {
      type: String,
      default: '',
    },
    availablesDates:{
      type: Object,
      default: () => ({})
    },
  },
  components: {
    QuckView,
    ProductItem,
    Paginations,
  },
  mixins:[formUltis],
  data() {
    return {
      quickViewProduct: null,
      allProducts: [],
      filteredProducts: [],
      currentsProducts: [],
      pagination: {
        default: 1,
        total: 0,
        perPage: 6,
      },
    }
  },
  methods: {
    toggle(item) {
      this.quickViewProduct = item
      mutations.toggleQuickView()
    },
    async updateGoodsList() {
      let self = this
      let { success, data } = await self.$axios.$get(
        `${self.$store.state.apiBaseUrl}/api/v1/houses/`
      )

      if (success) {
        let publishHouse = data.filter((item) => {
          return item.status == 'publish'
        })
        this.allProducts = publishHouse
        if (this.defaultType != null && this.defaultType.length > 0) {
          this.filteredProducts = publishHouse.filter((item) => {
            return item.type.toLowerCase().includes(this.defaultType)
          })
          this.currentsProducts = this.filteredProducts.slice(0, 6)
          this.pagination.total = this.filteredProducts.length
        } else if (this.query != '' && this.query.length > 0) {
          this.filteredProducts = this.allProducts.filter((item) => {
            if (
              item.title.toLowerCase().includes(this.query) ||
              item.description.toLowerCase().includes(this.query) ||
              (!!item.location && item.location.toLowerCase().includes(this.query))
            ) {
              return item
            }
          })
          this.currentsProducts = this.filteredProducts.slice(0, 6)
          this.pagination.total = this.filteredProducts.length
        } else {
          this.filteredProducts = publishHouse
          this.currentsProducts = publishHouse.slice(0, 6)
          this.pagination.total = publishHouse.length
        }
      }
    },
    changePage(page) {
      let start, end
      let self = this
      start = (page - 1) * self.pagination.perPage
      end = self.pagination.perPage * page
      self.currentsProducts = self.filteredProducts.slice(start, end)
      self.pagination.default = page
    },
  },
  watch: {
    type: function (newVal) {
      if (newVal != '') {
        this.filteredProducts = this.allProducts.filter((item) => {
          return item.type.toLowerCase().includes(newVal)
        })
        this.currentsProducts = this.filteredProducts.slice(0, 6)
        this.pagination.total = this.filteredProducts.length
      } else {
        this.filteredProducts = this.allProducts
        this.currentsProducts = this.filteredProducts.slice(0, 6)
        this.pagination.total = this.filteredProducts.length
      }
    },
    priceRange: function (newVal) {
      if (newVal.max && newVal.min) {
        this.filteredProducts = this.allProducts.filter((item) => {
          return item.price >= newVal.min && item.price < newVal.max
        })
        this.currentsProducts = this.filteredProducts.slice(0, 6)
        this.pagination.total = this.filteredProducts.length
      } else {
        this.filteredProducts = this.allProducts
        this.currentsProducts = this.filteredProducts.slice(0, 6)
        this.pagination.total = this.filteredProducts.length
      }
    },
    query: function (newVal) {
      if (newVal != '') {
        this.filteredProducts = this.allProducts.filter((item) => {
          if (
            item.title.toLowerCase().includes(newVal) ||
            item.description.toLowerCase().includes(newVal) ||
            (!!item.location && item.location.toLowerCase().includes(newVal))
          ) {
            return item
          }
        })
        this.currentsProducts = this.filteredProducts.slice(0, 6)
        this.pagination.total = this.filteredProducts.length
      } else {
        this.filteredProducts = this.allProducts
        this.currentsProducts = this.filteredProducts.slice(0, 6)
        this.pagination.total = this.filteredProducts.length
      }
    },
    availablesDates: function(newVal){
      const self = this
      if (newVal.start && newVal.end && newVal.start != null && newVal.end != null ){
        let dates = this.getDatesInRange(newVal.start, newVal.end)
        this.filteredProducts = this.allProducts.filter((item) => {
          if (
            Array.isArray(item.off_days) && item.off_days.length > 0
          ) {
            let inDates = false
            for (let i = 0; i < item.off_days.length; i++){
              for (let y =0; y < dates.length; y++){
                if (self.$moment.unix(item.off_days[i]).isSame(self.$moment.unix(dates[y]), 'date')) {
                  inDates = true
                  break
                }
              }
              if (inDates == true) {
                break
              }
            }
            
            if (inDates == false) {
              return item
            }
          }
        }) 
        this.currentsProducts = this.filteredProducts.slice(0, 6)
        this.pagination.total = this.filteredProducts.length
      }else{
        this.filteredProducts = this.allProducts
        this.currentsProducts = this.filteredProducts.slice(0, 6)
        this.pagination.total = this.filteredProducts.length
      }
    },

  },
  async created() {
    await this.updateGoodsList()
  },
}
</script>