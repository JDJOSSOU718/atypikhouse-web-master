<template>
  <div>
      <a class="title-p" :title="model.title" @click="goToEdit(model.id)" >{{ model.title }}</a>
  </div>
</template>
<script>
export default {
  props: ['rowIndex', 'model'],
  name: 'titleTemplate',
  methods: {
      goToEdit(id){
          if(this.$nuxt.$store.state.authUser.grade !== 'administrator' ){
              this.$nuxt.$options.router.push(`/dashboard/location-edit/${id}`)
          }else{
              this.$nuxt.$options.router.push(`/admin/location-edit/${id}`)
          }
          
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