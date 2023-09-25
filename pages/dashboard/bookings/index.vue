<template>
  <div>
    <TopHeader />
    <Menubar />
    <!-- Start Page Title Area -->
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Réservations</li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->
    <div class="container-fluid pt-5">
      <div class="row">
        <Sidebar />
        <div class="col-md-12 ml-sm-auto col-lg-10 px-4">
          <BookkingsList :owner="true" />
          
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
import BookkingsList from '../../../components/utils/bookingLists.vue'

export default {
  head() {
    return {
      title: 'Atypikhouse - Réservations',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Atypikhouse, Locations, Habitation, En location',
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
  components: { TopHeader, Menubar, Sidebar, BookkingsList },
  middleware: [auth, checkOwnerGrade],
}
</script>