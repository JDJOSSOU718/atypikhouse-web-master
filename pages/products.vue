<template>
  <div>
    <TopHeader />
    <Menubar />
    
    <!-- Start Page Title Area -->
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Tous les biens</li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->

    <!-- Start Collections Area -->
    <div class="products-collections-area ptb-60">
      <div class="container">
        <div class="section-title">
          <h2><span class="dot"></span> Biens</h2>
        </div>

        <div class="row">
          <!-- Sidebar Component -->
          <Sidebar
            @typeFiltered="updateTypeFilter"
            @priceFiltered="updatePriceFilter"
            @handlehQuery="updateSearchQuery"
            @dateFiltered="updateAvailableDate"
          />
          
          <!-- All Products Component -->
          <AllProducts
            :defaultType="defaultType"
            :type="typeFilter"
            :priceRange="priceFilter"
            :query="searchQuery"
            :availablesDates="dateFilter"
          />
        </div>
      </div>
    </div>
    <!-- End Collections Area -->
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Sidebar from '../components/all-products/Sidebar'
import AllProducts from '../components/all-products/AllProducts'

export default {
  head() {
    return {
      title: 'Atypikhouse - Biens',
      meta: [
        // ... Vos métadonnées ...
      ],
    }
  },
  components: {
    TopHeader,
    Menubar,
    Sidebar,
    AllProducts,
  },
  data() {
    return {
      typeFilter: '',
      priceFilter: {},
      defaultType: '',
      searchQuery: '',
      dateFilter: {},
      resetFilter: false
    }
  },
  methods: {
    updateTypeFilter(type) {
      this.typeFilter = type
    },
    updatePriceFilter(price) {
      this.priceFilter = price
    },
    updateSearchQuery(text){
      this.searchQuery = text
    },
    updateAvailableDate(datess){
      this.dateFilter = datess
    },
  },
  created() {
    if (this.$route.query.cat && this.$route.query.cat !== '') {
      this.defaultType = this.$route.query.cat
    }

    if (this.$route.query.crn && this.$route.query.crn !== '') {
      this.searchQuery = this.$route.query.crn
    }
  },
}
</script>
