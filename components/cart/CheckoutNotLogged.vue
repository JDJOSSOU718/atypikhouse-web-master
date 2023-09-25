<template>
  <div>
    <!-- Start Page Title Area -->
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Caisse</li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->

    <!-- Start Checkout Area -->
    <div class="checkout-area ptb-60">
      <div class="container">
        <div class="row">
          <div
            v-if="!$store.state.authUser || !$store.state.authUser.grade"
            class="col-12 text-center"
          >
            <h6>Veuillez vous connectez pour effectuer votre réservation</h6>
            <nuxt-link to="/login" class="btn btn-primary mt-3"
              >Connexion</nuxt-link
            >
          </div>
          <div class="col-12 text-center" v-else>
            <div class="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #000;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>

