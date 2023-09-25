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
          <li>Listes des locations</li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->
    <div class="container-fluid pt-5">
      <div class="row">
        <Sidebar />
        <div class="col-md-12 ml-sm-auto col-lg-10 p-0">
          <LocationList />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../../layouts/TopHeader'
import Menubar from '../../layouts/Menubar'
import Sidebar from '../../components/landing-one/Siderbar'
import auth from '../../middleware/auth'
import checkGrade from '../../middleware/checkGrade'
import LocationList from '../../components/utils/locationList'

export default {
  head() {
    return {
      title: 'Atypikhouse - Listes des locations',
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
  components: { TopHeader, Menubar, Sidebar, LocationList },
  middleware: [auth, checkGrade],
  data() {
    return {
      
    }
  },
}
</script>
