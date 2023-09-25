<template>
  <div>
      <a class="title-p" :title="model.title" @click="goToEdit(model.id)" >{{ model.first_name+' '+model.last_name }}</a>
  </div>
</template>
<script>
export default {
  props: ['rowIndex', 'model'],
  name: 'nameTemplate',
  methods: {
      goToEdit(id){
        this.$nuxt.$options.router.push(`/admin/user-edit/${id}`)
      },
  }
}
</script>
<style scoped>
    .title-p{
        cursor: pointer;
        color: #000 !important;
    }
    .title-p:hover{
        color: blue !important;
    }

</style>