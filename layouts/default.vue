<template>
  <div v-if="!loading">
    <Nuxt />
    <Footer></Footer>
    <BackToTop></BackToTop>
  </div>
</template>

<script>
import Footer from './Footer'
import BackToTop from './BackToTop'
const defaultCookieName = 'atipikhouse'

// cookies
import Cookies from 'js-cookie'
export default {
  components: {
    Footer,
    BackToTop,
  },
 
  data() {
    return {
      loading: true
    }
  },
  watch: {
    $route(pathUrl) {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 600)
    },
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      that.$nuxt.$loading.start()
      setTimeout(()=>{
        that.loading = false
      }, 500)
      setTimeout(()=>{
        that.$nuxt.$loading.finish()
      },600)
    })
  },
  async beforeCreate(){
    if (await Cookies.get(defaultCookieName)) {
        this.$store.commit('SET_USER', JSON.parse(Cookies.get(defaultCookieName)))
    }   
  }
}
</script>