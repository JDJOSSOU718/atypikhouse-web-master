<template>
    <div>
        <!-- <TopPanel v-if="isShowing" @clicked="onTopPanelClose"></TopPanel> -->

        <div class="top-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7 col-md-6">
                        <ul class="top-header-nav">
                            
                            <li><a href="https://www.facebook.com/atypikhouse.2i" target="_blank"><i class="fab fa-facebook"></i></a></li>
                            <li><a href="https://twitter.com/AtypikHouse2" target="_blank"> <img src="../assets/img/x.png" alt="" width="12px"> </a></li>
                            <li><a href="https://www.instagram.com/atypikhouse.2i/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>

                    <div class="col-lg-5 col-md-6">
                        <ul class="top-header-right-nav">
                            <!-- <li><nuxt-link to="/cart">Panier</nuxt-link></li> -->
                            <li v-if="!$store.state.authUser"><nuxt-link to="/signup">Inscription</nuxt-link></li>
                            <li v-else>
                                <nuxt-link v-if="$store.state.authUser.grade == 'administrator'" to="/admin"><i class="fa fa-user"></i> Mon compte</nuxt-link>
                                <nuxt-link v-else to="/dashboard"><i class="fa fa-user"></i> Mon compte</nuxt-link>
                            </li>
                            <li v-if="!$store.state.authUser">
                                <nuxt-link to="/login">Connexion</nuxt-link>
                            </li>
                            <li v-else @click="logout">
                                <nuxt-link to="#">Déconnexion</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopPanel from '../layouts/TopPanel'

export default {
    components: {
        TopPanel,
    },
    data() {
        return {
            isShowing: true,
        }
    },
    methods: {
        onTopPanelClose(value) {
            this.isShowing = value
        },
        async logout(e){
            e.preventDefault()
            try {
                await this.$store.dispatch('logout', this.$store.state.authUser.id)
                this.$router.push('/')
            } catch (error) {
                this.formError = error.message
                this.$toast.error(error.message)

            }
        }
    }
}
</script>