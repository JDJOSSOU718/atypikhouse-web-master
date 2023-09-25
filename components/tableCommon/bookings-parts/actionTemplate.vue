<template>
  <div>
    <a
      v-if="this.model.status != 'canceled'"
      class="btn btn-light m-2 btn-mini"
      title="Modifier"
      @click="goToEdit(model.id)"
      ><i class="fas fa-pencil-alt"></i
    ></a>
  </div>
</template>
<script>
export default {
  props: ['rowIndex', 'model'],
  name: 'ActionTemplate',
  methods: {
    goToEdit(id) {
      if (this.$nuxt.$store.state.authUser.grade !== 'administrator') {
        this.$nuxt.$options.router.push(`/dashboard/bookings/${id}`)
      } else {
        this.$nuxt.$options.router.push(`/admin/bookings/${id}`)
      }
    },
  },
}
</script>
<style scoped>
.btn.btn-mini {
  padding: 10px !important;
}
</style>