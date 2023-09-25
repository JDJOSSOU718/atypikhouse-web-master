<template>
  <div>
    <TopHeader />
    <Menubar />
    <!-- Start Page Title Area -->
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->
    <CartItems />
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import CartItems from '../components/cart/CartItems'
import cacheControl from '../middleware/cacheControl'

export default {
  head() {
    return {
      title: 'Atypikhouse - Panier',
      meta: [
        { hid: 'title', name: 'title', content: 'Atypikhouse - Panier' },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Atypikhouse, Panier, Liste des locations, Location choisi, vos locations',
        },
        { hid: 'description', name: 'description', content: 'Panier' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Atypikhouse - Panier',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Panier',
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
          content: 'Atypikhouse - Panier',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: 'Panier',
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
  components: {
    TopHeader,
    Menubar,
    CartItems,
  },
}
</script>