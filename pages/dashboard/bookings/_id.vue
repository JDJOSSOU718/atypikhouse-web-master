<template>
  <div>
    <TopHeader />
    <Menubar />
    <!-- Start Page Title Area -->
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li><nuxt-link to="/dashboard">Mon compte</nuxt-link></li>
          <li><nuxt-link to="/dashboard/bookings">Réservations {{ booking_id }}</nuxt-link></li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->
    <div class="container-fluid pt-5">
      <div class="row">
        <Sidebar />
        <div class="col-md-12 ml-sm-auto col-lg-10 px-4">
          <BookingDetails :provData="booking" :owner="true" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../../../layouts/TopHeader'
import Menubar from '../../../layouts/Menubar'
import Sidebar from '../../../components/landing-one/Siderbar'
import auth from '../../../middleware/auth'
import checkOwnerGrade from '../../../middleware/checkGradeOwner'
import BookingDetails from '../../../components/utils/bookingDetails'

export default {
  validate({ params }) {
    return !isNaN(+params.id)
  },
  head() {
    return {
      title: 'Atypikhouse - Réservation '+this.booking_id,
      meta: [
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
        { property: 'og:type', content: 'website' },
        {
          property: 'og:description',
          content: 'Atypikhouse louez vos biens en ligne!',
        },
        { property: 'og:image', content: '/icon.png' },
      ],
    }
  },
  components: { TopHeader, Menubar, Sidebar, BookingDetails },
  middleware: [auth, checkOwnerGrade],
  async asyncData({ params, error, $axios, store }) {
    const getTokken = store.state.authUser.login_session_token
    const data = await $axios.$get(
      `${store.state.apiBaseUrl}/api/v1/booking/${params.id}`,
      {
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          authorization: getTokken,
        },
      }
    )
    console.log(data)
    if (data.success) {
      return {
        booking: data.data[0],
        booking_id: params.id,
      }
    } else {
      error({ statusCode: 404, message: 'Réservation non trouvé' })
    }
  },
}
</script>
