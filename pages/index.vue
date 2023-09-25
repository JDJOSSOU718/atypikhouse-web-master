<template>
  <div>
    <TopHeader />
    <Menubar />
    <Banner />
    <AlowYourStyle
      :yourtCount="yourtTypeCount"
      :tenteCount="tenteTypeCount"
      :cubeCount="cubeTypeCount"
      :tinyCount="tinyHouseTypeCount"
    />
    <BestSellers :provData="products" />
    <Offer />
    <Testimonials></Testimonials>
    <Facility></Facility>
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/diction-two/Banner'
import AlowYourStyle from '../components/diction-two/AlowYourStyle'
import Offer from '../components/diction-two/Offer'
import Facility from '../components/common/Facility'
import BestSellers from '../components/diction-two/BestSellers'
import Testimonials from '../components/common/Testimonials'
// import Subscribe from '../components/common/Subscribe'
import cacheControl from '../middleware/cacheControl'

export default {
  components: {
    TopHeader,
    Menubar,
    Banner,
    AlowYourStyle,
    Offer,
    Facility,
    Testimonials,
    BestSellers,
    // Subscribe,
  },
  head() {
    return {
      title: 'Atypikhouse',
      meta: [
        { hid: 'title', name: 'title', content: 'Atypikhouse' },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Atypikhouse, Locations, Habitation, En location',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Atypikhouse louez vos biens en ligne!',
        },
        { hid: 'og:title', property: 'og:title', content: 'Atypikhouse' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Atypikhouse louez vos biens en ligne!',
        },
        { hid: 'og:image', property: 'og:image', content: '/icon.png' },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: 'Atypikhouse',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: 'Atypikhouse louez vos biens en ligne!',
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: '/icon.png',
        },
      ],
    }
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  async asyncData({ error, $axios, store }) {
    let { success, data } = await $axios.$get(
        `${store.state.apiBaseUrl}/api/v1/houses/`
      ),
      returned = {
        products: [],
        yourtTypeCount: 0,
        tenteTypeCount: 0,
        tinyHouseTypeCount: 0,
        cubeTypeCount: 0,
      }
    if (success) {
      let publishHouse = data.filter((item) => {
        return item.status == 'publish'
      })
      returned.products = publishHouse.slice(
        Math.max(publishHouse.length - 4, 0)
      )
      returned.yourtTypeCount = data.filter((item) => {
        return (
          item.status == 'publish' && item.type.toLowerCase().includes('yourt')
        )
      }).length
      returned.tenteTypeCount = data.filter((item) => {
        return (
          item.status == 'publish' && item.type.toLowerCase().includes('tente')
        )
      }).length
      returned.tinyHouseTypeCount = data.filter((item) => {
        return (
          item.status == 'publish' && item.type.toLowerCase().includes('tiny')
        )
      }).length
      returned.cubeTypeCount = data.filter((item) => {
        return (
          item.status == 'publish' && item.type.toLowerCase().includes('cube')
        )
      }).length
    }
    return returned
  },
}
</script>