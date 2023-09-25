<template>
  <div class="col-lg-4 col-md-4">
    <div class="product-details-content">
      <h3>{{ house.title }}</h3>

      <div class="price">
        <span class="new-price">{{ house.price }}€ / Nuit</span>
      </div>

      <div class="product-review">
        <!-- <div class="rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <a href="#" class="rating-count">3 reviews</a> -->
      </div>

      <ul class="product-info mb-5 inlined">
        <li><span>Type:</span> {{ house?.type }}</li>
        <li><span>Nombre de couchage:</span> {{ house?.nbr_couchage }}</li>
        <li><span>Capacité:</span> {{ house?.capacity }}</li>
        <li v-if="house.location != null">
          <span>Localisation:</span> {{ house.location }}
        </li>
      </ul>

      <div v-if="house?.equipements && house?.equipements.length > 0" class="product-info mb-5 inlined">
        <h5>Equipements</h5>
        <ul class="product-info">
          <li v-for="equip in house.equipements" :key="equip?.id">
            <i :class="'fa-lg fa ' +  equip?.icon"></i> {{equip?.name}}
          </li>
        </ul>
      </div>

      <div class="product-info mb-5">
        <h5>Propriétaire:</h5>

        <ul class="product-info">
          <li>
          <span>Noms:</span> {{ house.first_name }}
          {{ house.last_name }}
        </li>
        <!-- <li v-if="house?.social_link && Object.keys(house.social_link).length > 0">
            <span>Reseaux sociaux:</span> 
            <a v-if="house.social_link[0] != ''" :href="house.social_link[0]" target="_blank" rel="noopener noreferrer"><i class="fa fa-facebook"></i></a>
            <a v-if="house.social_link[1] != undefined && house.social_link[1] != ''" :href="house.social_link[1]" target="_blank" rel="noopener noreferrer"><i class="fa fa-instagram"></i></a>
            <a v-if="house.social_link[2] != undefined && house.social_link[2] != ''" :href="house.social_link[2]" target="_blank" rel="noopener noreferrer"><i class="fa fa-linkedin"></i></a>
            <a v-if="house.social_link[3] != undefined && house.social_link[3] != ''" :href="house.social_link[3]" target="_blank" rel="noopener noreferrer"><i class="fa fa-twitter"></i></a>
        </li> -->
        <li>
          <span>Téléphone:</span> <a :href="`tel:${house?.phone}`">{{ house?.phone }}</a>
        </li>
        <li>
          <span>Adresse:</span> {{ house?.address }}
        </li>
        <li>
          <span>Email:</span> <a :href="`mailto:${house?.email}`">{{ house?.email }}</a>
        </li>
        </ul>
      </div>

    

      <div class="product-add-to-cart">
        <button
          type="submit"
          class="btn btn-primary"
          @click="addToCart()"
        >
          <i class="fas fa-cart-plus"></i> Réserver
        </button>
      </div>


      <!-- <div class="buy-checkbox-btn">
        <div class="item">
          <input class="inp-cbx" id="cbx" type="checkbox" />
          <label class="cbx" for="cbx">
            <span>
              <svg width="12px" height="10px" viewbox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </svg>
            </span>
            <span>Je suis d'accord avec les termes et conditions</span>
          </label>
        </div>

        <div class="item">
          <a href="#" class="btn btn-primary">Louez maintenant!</a>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getExistPId: false,
      quantity: 1,
    }
  },
  props: {
    house: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cart() {
      return this.$store.getters.cart
    },
  },
  methods: {
    addToCart() {
      const product = [
        {
          id: this.house.id,
          title: this.house.title,
          price: this.house.price,
          photos: this.house.photos,
          off_days: this.house.off_days,
          quantity: 1,
        },
      ]
      this.$store.dispatch('addToCart', product)
      this.$router.push("/checkout")
    },
  },
  created(){
    this.$store.dispatch('cartEmpty')
  }
}
</script>
<style>
.inlined{
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;
}
@media only screen and (max-width: 600px) {
  .inlined{
    display: block;
     margin-left: 0px;
    margin-right: 0px;
  }
}

</style>