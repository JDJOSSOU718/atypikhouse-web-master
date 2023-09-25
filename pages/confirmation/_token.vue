<template>
  <div>
    <TopHeader />
    <Menubar />
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Confirmation de compte</li>
        </ul>
      </div>
    </div>

    <div class="login-area ptb-60">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="login-content text-center">
              <h3>
                  {{
                    message
                  }}
              </h3>

              <nuxt-link
                to="/login"
                class="btn btn-primary btn-mini"
                >Connexion</nuxt-link
              >
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../../layouts/TopHeader'
import Menubar from '../../layouts/Menubar'

export default {
  validate({ params }) {
    return params.token !== '' ? true : false;
  },
  components: {
    TopHeader,
    Menubar,
  },
  async asyncData({params, error, $axios, store}) {
    const data = await $axios.$put(
      `${store.state.apiBaseUrl}/api/v1/users/confirmation/${params.token}`
    )
    if (data.success) {
        return {
            message: 'Votre compte a été confirmé avec succès! Vous pouvez vous connectez a votre compte.',
        }
    }else{
        error({ statusCode: 404, message: 'Utilisateur non trouvé' })
    }
    
  },
}
</script>