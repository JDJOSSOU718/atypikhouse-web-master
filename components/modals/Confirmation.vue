<template>
  <div>
    <b-modal id="confirmation-modal" title="" hide-footer>
      <div class="d-block text-center">
        <h5 class="my-4">Souhaitez-vous effectué cet action!</h5>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-button class="float-left" variant="danger" @click="confirmed()"
            >Oui</b-button
          >
        </div>
        <div class="col-md-6">
          <b-button class="float-right" variant="dark" @click="closeModal()"
            >Non</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    confirmed() {
      this.$emit('confirmation', true)
    },
    closeModal() {
      this.$bvModal.hide('confirmation-modal')
    },
  },
}
</script>