<template>
  <client-only>
    <!-- Start Testimonials Area -->
    <div class="testimonials-area ptb-60">
      <div class="container">
        <div class="testimonials-slides owl-carousel owl-theme">
          <carousel
            :autoplay="true"
            :autoplayTimeout="1000"
            :perPageCustom="[
              [0, 1],
              [768, 1],
              [1024, 1],
            ]"
          >
            <slide v-for="item in items" :key="item.id">
              <div class="single-testimonials">
                <div class="client-image">
                  <img :src="item.image" :alt="item.name" />
                </div>

                <p>{{ item.feedback }}</p>

                <div class="client-info">
                  <h4>{{ item.name }}</h4>
                  <span>{{ item.position }}</span>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
    <!-- End Testimonials Area -->
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Jason Statham',
          position: 'Salarié',
          feedback:
            'La navigation est fluide, facile à comprendre, le processus de paiement a été lui aussi efficace, je suis satisfaite et je compte réserver sur ce même site pour mes prochaines escapades !',
          image: require('../../assets/img/client1.jpg'),
        },
        {
          id: 2,
          name: 'William Val',
          position: 'CEO',
          feedback:
            'Site très facile d\'utilisation (de nombreuses informations sont données pour indiquer la démarche à suivre) et Service Client très à l\'écoute des demandes particulières. Formulation de confirmation de réservation très amusante : "dites à votre enfant que dans 60 dodos, il pourra vivre une expérience insolite...". Je recommande',
          image: require('../../assets/img/client1.jpg'),
        },
        {
          id: 3,
          name: 'Gilles Ferrie',
          position: 'Salarié',
          feedback:
            'Équipe très réactive et dispo pour répondre en moins de 24h. Tellement hate de vivre une belle expérience avec AtypikHouse.',
          image: require('../../assets/img/client1.jpg'),
        },
      ],
    }
  },
}
</script>