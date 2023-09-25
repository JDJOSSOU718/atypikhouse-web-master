<template>
  <div>
    <TopHeader />
    <Menubar />

    <!-- Section: Bannière -->
    <section class="banner-section">
      <Banner />
    </section>

    
    <!-- Section: Statistiques (Noir) -->
    <section class="statistics-section black-bg large-number-plus" @scroll="onScroll">
      <div class="container">
        <div class="row">
          <div v-for="(statistic, index) in statistics" :key="index" class="col-md-4">
            <div class="statistic" ref="statistics[index]">
              <count-up
                :start-val="0"
                :end-val="statistic.value"
                :duration="10"
                @ready="onCountUpReady(statistic)"
                @end="onCountUpEnd(statistic)"
              >
                <template slot-scope="{ countDecimal, countDone }">
                  <!-- La valeur animée -->
                  <h1 :class="{ 'large-number-plus': countDone }">{{ countDecimal }}</h1>
                </template>
              </count-up>
              <p>{{ statistic.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  

    <!-- Section: À Propos (Noir clair) -->
    <section class="about-section light-black-bg">
      <div class="row">
        <div class="col-md-7">
          <img src="../assets/img/qui.jpg" alt="">
        </div>
        <div class="col-md-5 p-4 p-xs-0">
          <h3>QUI SOMMES-NOUS ?</h3>
          <p>Basée dans le Sud de la France, Atypikhouse est leader sur le marché de l'insolite et référence des hébergements atypiques partout sur son territoire, et même à l'étranger !</p>
          <h6>NOS VALEURS</h6>
          <p>Chez Atypikhouse, nous plaçons la relation avec les propriétaires au cœur du partenariat. Notre collaboration avec les hébergeurs est basée sur le respect des intérêts de chacun, tout en laissant la liberté et l'indépendance nécessaires à leur activité. Une équipe de professionnels du tourisme, spécialisés dans le secteur de l'insolite, vous propose un service réactif et efficace qui se veut humain, qualitatif et adapté.</p>
        </div>
      </div>
    </section>

    <!-- Section: Concept (Noir) -->
  <section class="concept-section black-bg">
    <div class="container">
      <h1 class="concept-title">LE CONCEPT</h1>
      <div class="row">
        <div class="col-md-4 text-center">
          <div class="concept-item">
            <i class="fas fa-home concept-icon"></i>
            <h3 class="concept-subtitle">Place de marché</h3>
            <p>Une offre centralisée et spécialisée dans les logements atypiques.</p>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="concept-item">
            <i class="fas fa-percent concept-icon"></i>
            <h3 class="concept-subtitle">Modèle à la performance</h3>
            <p>Sans abonnement, ni frais de mise en service, uniquement une commission sur les ventes.</p>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="concept-item">
            <i class="fas fa-calendar-check concept-icon"></i>
            <h3 class="concept-subtitle">Réservation instantanée</h3>
            <p>Une réservation ferme et payée à 100% en ligne par le client.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Section: Éligibilité (Noir clair) -->
    <section class="eligibility-section light-black-bg">
      <div class="container">
        <h1 class="eligibility-titles"> VOTRE OFFRE EST-ELLE ÉLIGIBLE ?</h1>
        <div class="eligibility-tests">
          <!-- Premier test -->
          <div class="eligibility-test">
            <div class="test-content">
              <img src="../assets/img/dimension.png" alt="dimension" class="test-image">
              <h3>Dimension insolite</h3>
              <p>Votre hébergement doit être privatif et proposer une expérience atypique grâce à sa typologie et/ou son concept. Les internautes recherchent un séjour unique avec des services et activités de qualité !</p>
            </div>
          </div>

          <!-- Deuxième test -->
          <div class="eligibility-test">
            <div class="test-content">
              <img src="../assets/img/environnement.png" alt="Image 2" class="test-image">
              <h3>Environnement privilégié</h3>
              <p>Loin des sentiers battus, l'hébergement proposé doit être implanté dans un cadre préservé. Il s'agit de partager avec les voyageurs un cadre hors du commun ou un site d'exception !</p>
            </div>
          </div>

          <!-- Troisième test -->
          <div class="eligibility-test">
            <div class="test-content">
              <img src="../assets/img/offre.png" alt="Image 3" class="test-image">
              <h3>Une offre et des tarifs cohérents</h3>
              <p>Les tarifs et conditions doivent être en adéquation avec le marché et notre cible de clientèle. Il s’agit de présenter une offre et des prestations cohérentes et justes pour le client.</p>
            </div>
          </div>

          <!-- Quatrième test -->
          <div class="eligibility-test">
            <div class="test-content">
              <img src="../assets/img/qualite.png" alt="Image 4" class="test-image">
              <h3>Qualité de la collaboration</h3>
              <p>L'hébergeur doit témoigner d'une réelle envie d'être partenaire de notre réseau : un bon contact, de la réactivité et du professionnalisme sont des éléments primordiaux à la collaboration !</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section: Ce que l'on vous apporte (Noir) -->
    <section class="what-we-offer-section black-bg">
      <div class="container">
        <h2 class="what-we-offer-title">CE QUE L'ON VOUS APPORTE</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="what-we-offer-item">
              <i class="fas fa-calendar-check what-we-offer-icon"></i>
              <p class="what-we-offer-description">
                <p class="what-we-description-title">RÉSERVATIONS INSTANTANÉES</p>
                Une réservation ferme avec un règlement de 100% du séjour à la réservation.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="what-we-offer-item">
              <i class="fas fa-users what-we-offer-icon"></i>
              <p class="what-we-offer-description">
                <p class="what-we-description-title">AUDIENCE CIBLÉE</p>
                Des clients en recherche d'une expérience unique.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="what-we-offer-item">
              <i class="fas fa-chart-bar what-we-offer-icon"></i>
              <p class="what-we-offer-description">
                <p class="what-we-description-title">FORTE VISIBILITÉ</p>
                Une notoriété et une visibilité grâce à un référencement pertinent et ciblé.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="what-we-offer-item">
              <i class="fas fa-gift what-we-offer-icon"></i>
              <p class="what-we-offer-description">
                <p class="what-we-description-title">BOUTIQUE CADEAU</p>
                La possibilité pour le client d'offrir un séjour sans date. Un levier de vente supplémentaire en toute saison.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="what-we-offer-item">
              <i class="fas fa-hands-helping what-we-offer-icon"></i>
              <p class="what-we-offer-description">
                <p class="what-we-description-title">ACCOMPAGNEMENT ET CONSEILS</p>
                Une équipe à votre écoute pour répondre à vos demandes et une aide en ligne accessible 24/7.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="what-we-offer-item">
              <i class="fas fa-bullhorn what-we-offer-icon"></i>
              <p class="what-we-offer-description">
                <p class="what-we-description-tilet">SERVICE MARKETING ET PRESSE*</p>
                Une communauté de 150 000 followers sur nos réseaux sociaux. * Sous conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <template>
  <!-- ... Autres éléments de votre modèle ... -->

  <!-- Section: Comment ça marche (Noir) -->
  <section class="how-it-works-section light-black-bg">
      <h1>COMMENT ÇA MARCHE ?</h1>

      <details>
        <summary>Système de recherche performant</summary>
        <p>
          Un moteur de recherche adapté au contenu insolite.
          Le moteur de recherche propose des champs pertinents et adaptés à l'offre insolite pour une expérience client optimale. Il est possible de sélectionner une destination, une typologie de l'hébergement, une thématique ou encore de filtrer selon des critères de confort (eau, électricité, sanitaires…).
        </p>
        <i class="fas fa-search fa-3x"></i>
      </details>

      <details>
        <summary>Interface hébergeur dédiée</summary>
        <p>
          Un espace administrateur pratique.
          Un compte hébergeur adapté aux établissements insolites et répondant à toutes les exigences de leur utilisateur : un outil de mise à jour des offres, l’accès à vos réservations, et votre fichier clients ainsi qu’une aide en ligne.
        </p>
        <i class="fas fa-cog fa-3x"></i>
      </details>

      <details>
        <summary>SYNCHRONISATION DES CALENDRIERS</summary>
        <p>
          Mise à jour des disponibilités.
          Afin d’éviter la double gestion de planning, nous vous proposons de synchroniser automatiquement vos calendriers de disponibilités avec notre système.
        </p>
        <i class="fas fa-calendar fa-3x"></i>
      </details>

      <details>
        <summary>DÉROULEMENT D'UNE RÉSERVATION</summary>
        <p>
          Les étapes d'une réservation.
          Nous vous proposons une réservation clé-en-main avec un paiement 100% en ligne.
          <br />
          Paiement du séjour en ligne.
          <br />
          Crédit du porte-monnaie virtuel.
          <br />
          Confirmation par e-mail et/ou SMS.
          <br />
          Versement du montant net de la réservation.
        </p>
        <i class="fas fa-credit-card fa-3x"></i>
      </details>

      <details>
        <summary>PORTE-MONNAIE VIRTUEL</summary>
        <p>
          Utilisation d'un compte tiers.
          Un compte d’attente dédié à votre établissement est ouvert afin de recevoir les règlements des clients et assurer le suivi des virements sur votre compte bancaire.
        </p>
        <i class="fas fa-wallet fa-3x"></i>
      </details>
    </section>

  <!-- ... Autres éléments de votre modèle ... -->
</template>

    <!-- Section: Installations (Noir clair) -->
    <section class="facility-section light-black-bg">
      <Facility />
    </section>

    <!-- Section: Témoignages (Noir) -->
    <section class="testimonials-section black-bg">
      <Testimonials />
    </section>
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/diction-two/Banner2'
import Facility from '../components/common/Facility'
import Testimonials from '../components/common/Testimonials'
import cacheControl from '../middleware/cacheControl'
import CountUp from 'vue-countup-v2'

export default {
  components: {
    CountUp, // Utilisez "CountUp" avec la première lettre en majuscule
    TopHeader,
    Menubar,
    Banner,
    Facility,
    Testimonials
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),

  data() {
    return {
      statistics: [
        { label: "établissements référencés partout en France", value : 500 },
        { label: "hébergements insolites présentés sur notre centrale", value: 900 },
        { label: "millions de pages vues", value: 50 },
      ],
      isStatisticsAnimated: false
    };
  },
  methods: {


    formatNumber(number) {
    return Number(number).toLocaleString('fr-FR', { minimumFractionDigits: 0 });
  },

    onScroll() {
      // Vérifiez si la section "Statistiques" est au milieu de la page
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (!this.isStatisticsAnimated) {
        this.statistics.forEach((statistic, index) => {
          const section = this.$refs.statistics[index];
          const rect = section.getBoundingClientRect();
          if (rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2) {
            // La section est au milieu de la page, déclenchez l'animation
            this.isStatisticsAnimated = true;
            statistic.countDone();
          }
        });
      }
    },
    onCountUpReady(statistic) {
      // L'animation est prête (démarrez l'animation ici si nécessaire)
      console.log(`Statistique "${statistic.label}" est prête pour l'animation.`);
    },
    onCountUpEnd(statistic) {
      // L'animation a atteint sa valeur finale (vous pouvez ajouter des actions ici)
      console.log(`Statistique "${statistic.label}" a atteint sa valeur finale.`);

      // Réinitialisez la statistique pour permettre une nouvelle animation
      statistic.startVal = 0;

      

      
    },

    
  },
};
</script>


<style scoped>

/* Styles spécifiques à la section "Concept" */
.concept-section {
  padding: 40px 0;
  text-align: center;
}

/* Style pour le titre principal */
.concept-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #33cc33; /* Couleur verte pour le titre principal */
  margin-bottom: 20px;
}

/* Style pour les éléments individuels */
.concept-item {
  margin-bottom: 20px;
}

/* Style pour les icônes */
.concept-icon {
  font-size: 4rem;
  color: #f3f6f3; /* Couleur verte pour les icônes */
  margin-bottom: 10px;
}

/* Style pour les sous-titres */
.concept-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  color: #8bc34a; /* Couleur verte pâle pour les sous-titres */
  margin-bottom: 10px;
}

/* Style pour les descriptions */
.concept-item p {
  font-size: 1rem;
  color: #555;
}

/* Styles spécifiques aux sections (Noir et Noir clair) */
.black-bg {
  background-color: #000;
  color: #fff;
}

.light-black-bg {
  background-color: #111;
  color: #eee;
}

.eligibility-section {
  text-align: center;
  padding: 40px 0;
}

.eligibility-tests {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Deux colonnes par ligne */
  grid-gap: 20px; /* Espacement entre les éléments */
}

.eligibility-test {
  display: flex;
  align-items: center; /* Centrer verticalement */
}

.test-image {
  width: 100px; /* Ajustez la largeur de l'image */
  height: 100px; /* Ajustez la hauteur de l'image */
  border-radius: 50%; /* Pour obtenir une forme de cercle */
  margin-right: 20px; /* Espacement à droite de l'image */
}

.test-content {
  text-align: left; /* Alignement du texte à gauche */
}

.eligibility-test h3 {
  font-size: 1.2rem; /* Ajustez la taille de la police du titre */
  font-weight: bold;
  color: #8bc34a; /* Couleur verte pâle pour les sous-titres */
  margin-bottom: 10px; /* Espacement en bas du titre */
}
.eligibility-titles {
  font-size: 2,5rem; /* Ajustez la taille de la police du titre */
  font-weight: bold;
  color: #33cc33; /* Couleur du titre en vert */
  margin-bottom: 10px; /* Espacement en bas du titre */
}



.eligibility-test p {
  font-size: 1rem; /* Taille du texte des tests */
  color: #555; /* Couleur du texte des tests */
}

/* Styles pour les images avec contour de cercle */
.eligibility-test img {
  width: 80px; /* Largeur des images */
  height: 80px; /* Hauteur des images */
  border-radius: 50%; /* Contour de cercle */
  border: 2px solid; /* Bordure verte pâle */
  margin-bottom: 10px; /* Espacement sous les images */
}

/* Styles spécifiques à la section "CE QUE L'ON VOUS APPORTE" */
.what-we-offer-section {
  padding: 40px 0;
  text-align: center;
}

/* Style pour le grand titre */
.what-we-offer-title {
  font-size: 2.5rem; /* Taille de la police du grand titre agrandie */
  font-weight: bold;
  color: #33cc33; /* Couleur verte pour le grand titre */
  margin-bottom: 20px; /* Espacement en bas du grand titre */
  text-align: center; /* Centrer le grand titre */
}

.what-we-description-title {
  font-size: 1rem;
  font-weight: bold;
  color: #8bc34a; /* Couleur verte pale */
}

/* Style pour les éléments individuels */
.what-we-offer-item {
  margin-bottom: 20px; /* Espacement entre les éléments */
  text-align: left; /* Aligner le texte à gauche */
  color: #555;
  
}

/* Style pour les icônes (utilisez une police d'icônes ou des images) */
.what-we-offer-icon {
  font-size: 4rem; /* Taille de la police de l'icône agrandie */
  color: #f5fbf5; /* Couleur blanche pour les icônes */
  margin-bottom: 10px; /* Espacement en bas de l'icône */
}

/* Style pour les descriptions */
.what-we-offer-description {
  font-size: 1rem; /* Taille de la police des descriptions */
  color: #8bc34a; /* Couleur verte pâle pour les sous-titres */
  margin-bottom: 20px; /* Espacement en bas de la description */
}


/* Agrandir la taille de la section */
.statistics-section {
  background-color: #000; /* Couleur de fond noir */
  color: #fff; /* Couleur du texte blanc */
  padding: 50px 0; /* Ajustez la hauteur de la section en ajoutant du padding */
}

/* Agrandir la taille des nombres */
.large-number-plus {
  font-size: 3rem; /* Ajustez la taille de la police (4rem pour cet exemple, ajustez selon vos besoins) */
  font-weight: bold; /* Mettez les chiffres en caractères gras */
  color: #33cc33; /* Couleur verte ou votre choix */
  margin-bottom: 20px; /* Espacement en bas des nombres */
  transform: scale(1.1); /* Ajustez l'échelle pour augmenter la taille si nécessaire */
  transition: transform 10s; /* Animation de transition avec une durée de 10 secondes */
}


/* Style général pour la section */
.how-it-works-section {
  background-color: #f2f2f2; /* Noir clair */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Style pour chaque élément cliquable (details) */
details {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px; /* Largeur maximale des éléments cliquables */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

details:hover {
  background-color: #d3e6cb; /* Vert pâle plus foncé au survol */
}

/* Style pour le texte à l'intérieur de details */
details p {
  margin: 0;
  flex-grow: 1; /* Permet au texte de prendre tout l'espace vertical disponible */
}

/* Style pour les icônes */
i {
  color: rgb(55, 54, 54);
  margin: 10px; /* Espacement autour de l'icône */
  flex-shrink: 0; /* Empêche les icônes de rétrécir */
}

/* Centrer le titre principal */
h1 {
  text-align: center;
  margin-top: 0;
  color:#33cc33;
  font-size: 2.5;
}

/* Masquer les détails par défaut */
details[open] {
  transition: none;
}

/* Style pour les détails ouverts */
details[open] {
  background-color: #d3e6cb; 
}


</style>
