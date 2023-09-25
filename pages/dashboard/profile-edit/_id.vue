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
          <li>Modification de profile</li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->
    <div class="container-fluid pt-5">
      <div class="row">
        <Sidebar />
        <div class="col-md-12 ml-sm-auto col-lg-10 px-4">
          <EditUserForm :provData="user" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../../../layouts/TopHeader'
import Menubar from '../../../layouts/Menubar'
import Sidebar from '../../../components/landing-one/Siderbar'
import EditUserForm from '../../../components/utils/editUserForm.vue'
import auth from '../../../middleware/auth'
import checkGrade from '../../../middleware/checkGrade'


export default {
    validate({ params }) {
    return params.id != '' ? true : false;
  },
  head() {
    return {
      title: 'Atypikhouse - Edition de profile',
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
  components: { TopHeader, Menubar, Sidebar, EditUserForm },
  middleware: [auth, checkGrade],
  async asyncData({ params, error, $axios, store }) {
    const data = await $axios.$get(
      `${store.state.apiBaseUrl}/api/v1/users/${params.id}`
    )
    if (data.success) {
      return {
        user: data.data,
        user_id: params.id,
      }
    } else {
      error({ statusCode: 404, message: 'Utilisateur non trouvé' })
    }
  },
}
</script>
