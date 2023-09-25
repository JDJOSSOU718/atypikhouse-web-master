<template>
    <div class="admin-dashboard">
        <nuxt />
    </div>
</template>

<script>
const defaultCookieName = 'atipikhouse'

// cookies
import Cookies from 'js-cookie'
export default {
    async beforeCreate(){
    if (await Cookies.get(defaultCookieName)) {
        this.$store.commit('SET_USER', JSON.parse(Cookies.get(defaultCookieName)))
    }
  }
}
</script>