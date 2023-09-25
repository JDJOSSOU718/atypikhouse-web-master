<template>
  <div class="cart-area ptb-60">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <form v-if="cart.length > 0">
            <div class="cart-table table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Biens</th>
                    <th scope="col">Noms</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>

                <tbody v-if="cart.length > 0">
                  <tr v-for="(cart, i) in cart" :key="i">
                    <td class="product-thumbnail">
                      <a href="#">
                        <img :src="cart.photos[0]" :alt="cart.title" />
                      </a>
                    </td>

                    <td class="product-name">
                      <nuxt-link :to="`/products-details/${cart.id}`">
                        {{ cart.title }}
                      </nuxt-link>
                    
                    </td>

                    <td class="product-price">
                      <span class="unit-amount">${{ cart.price }}</span>
                    </td>

                    <td class="product-subtotal">
                      <span class="subtotal-amount"
                        >{{ cart.price * cart.quantity }}€</span
                      >

                      <a
                        href="javascript:void(0)"
                        @click="removeItemFromCart(cart.id)"
                        class="remove"
                        ><i class="far fa-trash-alt"></i
                      ></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="cart-buttons">
              <div class="row">
                <div class="col-lg-7 col-md-7">
                  <div class="continue-shopping-box">
                    <nuxt-link to="/products" class="btn btn-light"
                      >Trouvez d'autres locations</nuxt-link
                    >
                  </div>
                </div>

                <div class="col-lg-5 col-md-5 text-right">
                  <div class="cart-totals">
                    <h3>Cart Totals</h3>

                    <ul>
                      <li>
                        Sous-total <span>{{ cartTotal }}€</span>
                      </li>
                      <li>
                        Total
                        <span
                          ><b
                            >{{ parseFloat(cartTotal).toFixed(2) }}€</b
                          ></span
                        >
                      </li>
                    </ul>
                    <nuxt-link to="/checkout" class="btn btn-light"
                      >Passer à la caisse</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </form>
          <h6 class="text-center">Aucun biens dans le panier.</h6>
          <div class="col-md-12 text-center mt-3">
               <nuxt-link to="/products" class="btn btn-primary"
                      >Listes des Biens</nuxt-link
                    >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.cart
    },
    cartTotal() {
      return this.$store.getters.totalAmount
    },
  },
  methods: {
    removeItemFromCart(id) {
      this.$store.dispatch('deleteCart', id)
    },
  },
}
</script>