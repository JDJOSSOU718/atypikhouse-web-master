<template>
  <div>
    <TopHeader />
    <Menubar />
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Mentions légales</li>
        </ul>
      </div>
    </div>

    <div class="ptb-60">
      <div class="container">
        <div class="section-title">
          <h2><span class="dot"></span> Mentions légales</h2>
        </div>

        <div class="row">
          <div class="col-12">
            <p>
              Mention légale

Nom : Atypikhouse
Adresse : Rue Napoléon, 60350 Pierrefonds
Capital social : 10 000 EUR
Numéro RCS : Compiègne A 359 733 770
Statut : SARL
Code NAF : 5520Z
Date de création : 03 Septembre 2021

Domaine d’expertise : Hébergement touristique et autre hébergement de courte durée de type insolite

Hébergement du site :
Ce site web est hébergé par OVH.
Siège social : OVH, 2 rue Kellermann - 59100 Roubaix - France.

Responsabilité :
Atypikhouse met tout en œuvre pour fournir des informations précises et à jour sur ce site, mais ne peut garantir l'exactitude ou l'exhaustivité des informations fournies. Les utilisateurs de ce site sont responsables de l'utilisation des informations fournies.

Droits d'auteur :
Tous les contenus de ce site web, y compris mais sans s'y limiter, les textes, les images, les graphiques et les logos, sont la propriété exclusive d'Atypikhouse, sauf indication contraire. Toute reproduction, distribution, modification ou utilisation de ces contenus sans autorisation préalable écrite est strictement interdite.

Protection des données personnelles :
Atypikhouse s'engage à protéger la vie privée de ses utilisateurs. Les données personnelles collectées sur ce site sont traitées conformément à notre politique de confidentialité. En utilisant ce site, vous consentez à la collecte et à l'utilisation de vos données personnelles conformément à cette politique.

Cookies :
Ce site web utilise des cookies pour améliorer l'expérience de l'utilisateur. En utilisant ce site, vous consentez à l'utilisation de cookies conformément à notre politique en matière de cookies.

Pour toute question ou préoccupation concernant cette mention légale, veuillez nous contacter à l'adresse suivante :
Adresse e-mail : juliusdjossou@gmail.com

Nous nous réservons le droit de modifier cette mention légale à tout moment. Veuillez consulter régulièrement cette page pour vous tenir informé des mises à jour.

            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import cacheControl from '../middleware/cacheControl'


export default {
  head() {
    return {
      title: 'Atypikhouse - Mentions légales',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Atypikhouse - Mentions légales',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Atypikhouse, Mentions Légales, Légales, Sécurité',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Toute les informations sur nos mentions légales',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Atypikhouse - Mentions légales',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Toute les informations sur nos mentions légales',
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
          content: 'Atypikhouse - Mentions légales',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: 'Toute les informations sur nos mentions légales',
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
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
}
</script>



<style scoped>
/* Ajoutez le CSS ici */
/* Style pour la section des mentions légales */
p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

/* Style pour le titre "Mention légale" */
p:first-child {
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 30px;
}

/* Style pour les éléments clés de la mention légale */
p strong {
  font-weight: bold;
}

/* Style pour les informations spécifiques (nom, adresse, etc.) */
p em {
  font-style: italic;
}

/* Style pour l'hébergement du site */
p:nth-of-type(5) {
  margin-top: 30px;
  font-weight: bold;
}

/* Style pour les responsabilités */
p:nth-of-type(6) {
  margin-top: 30px;
  font-weight: bold;
}

/* Style pour les droits d'auteur */
p:nth-of-type(7) {
  margin-top: 30px;
  font-weight: bold;
}

/* Style pour la protection des données personnelles */
p:nth-of-type(8) {
  margin-top: 30px;
  font-weight: bold;
}

/* Style pour les cookies */
p:nth-of-type(9) {
  margin-top: 30px;
  font-weight: bold;
}

/* Style pour la section de contact */
p:last-child {
  margin-top: 30px;
}

/* Style pour les liens de contact */
p:last-child a {
  text-decoration: underline;
  color: #007BFF; /* Couleur du lien (personnalisez selon votre choix) */
}

/* Style pour les mises à jour */
p:last-child + p {
  margin-top: 20px;
  font-size: 14px;
  font-style: italic;
}


/* ... Autres styles ... */
</style>




