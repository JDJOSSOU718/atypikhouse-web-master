<template>
  <ClientOnly>
    <div class="home-slides owl-carousel owl-theme">
      <carousel
        :autoplay="true"
        :autoplayTimeout="3000"
        :navigationEnabled="true"
        navigationNextLabel="<i class='fas fa-arrow-right'></i>"
        navigationPrevLabel="<i class='fas fa-arrow-left'></i>"
        :paginationEnabled="true"
        :perPage="1"
      >
        <slide>
          <div class="main-banner item-bg2">
            <div class="d-table">
              <div class="d-table-cell">
                <div class="container">
                  <div class="main-banner-content">
                    <span>Yourt</span>
                    <h1 style="color: #fff;">Yourt à louer</h1>

                    <nuxt-link to="/products" class="btn btn-primary text-center">Location</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slide>

        <slide>
          <div class="main-banner item-bg1">
            <div class="d-table">
              <div class="d-table-cell">
                <div class="container">
                  <div class="main-banner-content">
                    <span>Tente</span>
                    <h1 style="color: #fff;">Tente à louer</h1>

                    <nuxt-link to="/products" class="btn btn-primary text-center">Location</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slide>

        <slide>
          <div class="main-banner item-bg3">
            <div class="d-table">
              <div class="d-table-cell">
                <div class="container">
                  <div class="main-banner-content">
                    <span>Le cude</span>
                    <h1 style="color: #fff;">Maison à louer</h1>

                    <nuxt-link to="/products" class="btn btn-primary text-center">Location</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: 'Banner',
}
</script>
<style>

.main-banner-content{
  max-width: none !important;
}

.main-banner-content .btn-primary{
  margin-left: 45% !important;
  margin-right: 45% !important;
}
@media only screen and (max-width: 600px) {
  .main-banner-content .btn-primary{
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .home-slides.owl-theme:hover .VueCarousel-navigation .VueCarousel-navigation-prev, .home-slides.owl-theme:hover .VueCarousel-navigation .VueCarousel-navigation-next{
    left: 10px;
  }

  .home-slides.owl-theme:hover .VueCarousel-navigation .VueCarousel-navigation-prev.VueCarousel-navigation-next, .home-slides.owl-theme:hover .VueCarousel-navigation .VueCarousel-navigation-next.VueCarousel-navigation-next{
    right: 10px;
  }
}
</style>