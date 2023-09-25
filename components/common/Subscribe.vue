<template>
  <!-- Start Subscribe Area -->
  <div class="subscribe-area ptb-60">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="newsletter-content">
            <h3>Souscrire à la newsletter</h3>
            <p>
              Une courte phrase décrivant ce que quelqu'un recevra en s'inscrivant à la liste de diffusion.
              s'abonnant à
            </p>
          </div>
        </div>

        <div class="col-lg-6">
          <form class="newsletter-form" v-on:submit.prevent>
            <input
              type="email"
              class="form-control"
              placeholder="Enter your email address"
              id="email"
              v-model="subscriptions.email"
              autocomplete="off"
            />
            <button @click="subscribe" type="submit">Souscrire!</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- End Subscribe Area -->
</template>
<script>
export default {
  data() {
    return {
      subscriptions: {
        email: '',
        createdAt: new Date(),
      },
    }
  },
  methods: {
    subscribe() {
      if (
        this.subscriptions.email != '' &&
        this.validateEmail(this.subscriptions.email)
      ) {
        
        this.$toast.success(`Merci pour vos abonnements`, {
          icon: 'fas fa-user-check',
        })
        this.subscriptions.email = ''
      } else {
        this.$toast.error(`Veuillez remplir le formulaire avec une adresse e-mail valide`, {
          icon: 'fas fa-times',
        })
      }
    },
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>