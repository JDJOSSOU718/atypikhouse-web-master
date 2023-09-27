<template>
  <div>
    <div :class="['navbar-area', { 'is-sticky': isSticky }]">
      <div class="comero-nav">
        <div class="container">
          <nav class="navbar navbar-expand-md navbar-light">
            <nuxt-link class="navbar-brand" to="/">
              <img src="../assets/img/logo.png" alt="logo" />
            </nuxt-link>

            <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>

            <b-collapse
              class="collapse navbar-collapse"
              id="navbarSupportedContent"
              is-nav
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <nuxt-link to="/" class="nav-link active">
                    Accueil
                  </nuxt-link>
                </li>

                <li class="nav-item">
                  <nuxt-link to="/products" class="nav-link">
                    Biens
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/devenir-partenaire" class="nav-link">
                    Partenariat
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/contact" class="nav-link">
                    Contact
                  </nuxt-link>
                </li>
              </ul>


            

              <div class="others-option">
                
                <div class="option-item">
                  <!-- <a @click.prevent="toggle" href="#">
                    Panier({{ cart.length }}) <i class="fas fa-shopping-bag"></i>
                  </a> -->
                </div>
              </div>
            </b-collapse>
          </nav>
        </div>
      </div>
    </div>

    <SidebarPanel></SidebarPanel>
  </div>
</template>

<script>
import SidebarPanel from '../layouts/SidebarPanel'
import { mutations } from '../utils/sidebar-util'

export default {
  components: {
    SidebarPanel,
  },
  data() {
    return {
      isSticky: false,
    }
  },
  mounted() {
    const that = this
    window.addEventListener('scroll', () => {
      let scrollPos = window.scrollY
      if (scrollPos >= 100) {
        that.isSticky = true
      } else {
        that.isSticky = false
      }
    })
  },
  computed: {
    cart() {
      return this.$store.getters.cart
    },
  },
  methods: {
    toggle() {
      mutations.toggleNav()
    },
    async logout(e) {
      e.preventDefault()
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/')
      } catch (error) {
        this.formError = error.message
      }
    },
  },
}
</script>