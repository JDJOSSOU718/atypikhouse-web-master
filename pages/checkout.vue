<template>
  <div>
    <TopHeader />
    <Menubar />
    <CheckoutItem
      v-if="payIntent.length > 0"
      :intentKey="payIntent"
      :user="$store.state.authUser"
    />
    <CheckoutNotLogged v-else />
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import CheckoutItem from '../components/cart/CheckoutItem'
import CheckoutNotLogged from '../components/cart/CheckoutNotLogged'
import cacheControl from '../middleware/cacheControl'
export default {
  head() {
    return {
      title: 'Atypikhouse - Caisse',
      meta: [
        { hid: 'title', name: 'title', content: 'Atypikhouse - Caisse' },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Atypikhouse, Caisse, Payer votre location, Payer, Paiement en ligne',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Payer la réservation de votre location en ligne.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Atypikhouse - Caisse',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Payer la réservation de votre location en ligne.',
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
          content: 'Atypikhouse - Caisse',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: 'Payer la réservation de votre location en ligne.',
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: '/icon.png',
        },
      ],
    }
  },
  components: {
    TopHeader,
    Menubar,
    CheckoutItem,
    CheckoutNotLogged,
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  data() {
    return {
      payIntent: '',
    }
  },
  methods: {
    async generatePaymentIntent() {
      const getTokken = this.$store.state.authUser.login_session_token
      let data = {
        amount: this.$store.getters.totalAmount,
        currency: 'eur',
        paymentType: 'card',
      }
      const result = await this.$axios.$post(
        `${process.env.APIBASEURI}/api/v1/booking/payintentment/`,
        data,
        {
          withCredentials: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            authorization: getTokken,
          },
        }
      )
      if (result.success) {
        return result.data
      } else {
        return false
      }
    },
  },
  async created() {
    if (this.$store.state.authUser) {
      this.payIntent = await this.generatePaymentIntent()
      console.log(this.payIntent)
    }
  },
}
</script>