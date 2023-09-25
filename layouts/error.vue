<template>
  <div>
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>404 Non trouvé</li>
        </ul>
      </div>
    </div>

    <div class="error-area ptb-60">
      <div class="container">
        <div class="error-content">
          <img src="../assets/img/404.png" alt="error" />

          <h3>Page non trouvé</h3>
          <p>
            La page que vous recherchez a peut-être été supprimée, son nom a été modifié ou elle est temporairement indisponible.
            changé ou est temporairement indisponible.
          </p>

          <nuxt-link to="/" class="btn btn-light">Aller à l'accueil</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error-layout',
}
</script>