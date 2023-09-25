<template>
  <div>
      <a class="btn btn-light m-2 btn-mini" title="Modifier" @click="goToEdit(model.id)" ><i class="fas fa-pencil-alt"></i></a>
  </div>
</template>
<script>
export default {
  props: ['rowIndex', 'model'],
  name: 'ActionTemplate',
  methods: {
      goToEdit(id){
        this.$nuxt.$options.router.push(`/admin/equipment/${id}`)
      },
  }
}
</script>
<style scoped>
    .btn.btn-mini{
        padding: 10px !important;
    }
</style>