<template>
  <div>
    <!-- Start Page Title Area -->
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>Caisse</li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->

    <!-- Start Checkout Area -->
    <div class="checkout-area ptb-60">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="user-actions">
              <p v-if="formError" class="error">
                {{ formError }}
              </p>
            </div>
          </div>
        </div>

        <form v-if="$store.state.authUser">
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="billing-details">
                <h3 class="title">Details de réservation</h3>

                <div class="row">
                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <label
                        >Nom et prénoms <span class="required">*</span></label
                      >
                      <input
                        type="text"
                        id="fullName"
                        v-model="personDetails.fullName"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <label>Adresse <span class="required">*</span></label>
                      <input
                        type="text"
                        id="address"
                        v-model="personDetails.address"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>Email <span class="required">*</span></label>
                      <input
                        type="email"
                        id="email"
                        v-model="personDetails.email"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>Téléphone <span class="required">*</span></label>
                      <input
                        type="text"
                        id="phone"
                        v-model="personDetails.phone"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6">
                    <label
                      >Date de réservation
                      <span class="required">*</span></label
                    >
                    <vc-date-picker
                      color="green"
                      :columns="$screens({ default: 1, laptop: 2, desktop: 2 })"
                      is-range
                      :attributes="calendarAttrs"
                      :disabled-dates="offDays"
                      v-model="personDetails.bookingDate"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-12">
              <div class="order-details">
                <h3 class="title">Votre commande</h3>

                <div class="order-table table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Nom de la location</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(cart, i) in cart" :key="i">
                        <td class="product-name">
                          <a href="#">{{ cart.title }} * {{ bookingsDaysCount }} jour(s)</a>
                        </td>

                        <td class="product-total">
                          <span class="subtotal-amount"
                            >{{ cart.price * bookingsDaysCount }}€</span
                          >
                        </td>
                      </tr>

                      <tr>
                        <td class="order-subtotal">
                          <span>Panier Sous-total</span>
                        </td>

                        <td class="order-subtotal-price">
                          <span class="order-subtotal-amount"
                            >{{ cartTotal * bookingsDaysCount}} €</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td class="total-price">
                          <span>Commande Total</span>
                        </td>

                        <td class="product-subtotal">
                          <span class="subtotal-amount">{{ cartTotal * bookingsDaysCount}} €</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="payment-method">
                  <div class="row">
                    <div class="col-12 form-group">
                      <label>Carte No.</label>
                      <div id="card-number"></div>
                    </div>
                    <div class="col-md-6 form-group">
                      <label>Carte Exp.</label>
                      <div id="card-expiry"></div>
                    </div>
                    <div class="col-md-6 form-group">
                      <label>Carte CVC</label>
                      <div id="card-cvc"></div>
                    </div>
                    <div class="col-12 form-group">
                      <div id="card-error"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 form-group">
                      <label for="">
                        <input type="checkbox" name="terms" v-model="terms" />
                        j'ai lu et accepté les
                        <a href="/cgv" target="_blank" style="display: inline"
                          >conditions générales</a
                        >
                        <span class="required" style="color: red">*</span>
                      </label>
                    </div>
                  </div>
                </div>

                <a
                  href="javascript:void(0)"
                  @click="add"
                  class="btn btn-primary order-btn"
                  :disabled="formDisabled"
                  ><span v-if="!btnLoader">RESERVER</span
                  ><BLoader v-else loaderColor="#fff"
                /></a>
              </div>
            </div>
          </div>
        </form>
        <div v-else class="row">
          <div class="col-12 text-center">
            <h6>Veuillez vous connectez pour effectuer votre réservation</h6>
            <nuxt-link to="/login" class="btn btn-primary mt-3"
              >Connexion</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- End Checkout Area -->
  </div>
</template>


<script>
import BLoader from '../../components/common/btnLoader'
import formUtils from '../../mixins/form-utils'
import booking from '../../mixins/booking'
export default {
  props: {
    intentKey: {
      type: String,
      default: '',
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { BLoader },
  mixins: [formUtils, booking],
  data() {
    return {
      personDetails: {
        fullName: this.user.last_name
          ? `${this.user.first_name} ${this.user.last_name}`
          : '',
        address: this.user.address ? this.user.address : '',
        email: this.user.email ? this.user.email : '',
        phone: this.user.phone ? this.user.phone : '',
        bookingDate: {
          start: null,
          end: null,
        },
      },
      bookingsDaysCount: 1,
      elementsOptions: {
        clientSecret: this.intentKey,
        appearance: {},
      },
      btnLoader: false,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      formError: null,
      calendarAttrs: [
        {
          key: 'today',
          dot: true,
          dates: new Date(),
          popover: {
            label: "Aujourd'hui",
          },
        },
      ],
      offDays: [],
      formDisabled: false,
      terms: false,
    }
  },
  computed: {
    cart() {
      return this.$store.getters.cart
    },
    cartTotal() {
      return this.$store.getters.totalAmount
    },
    stripeElements() {
      return this.$stripe.elements()
    },
  },
  methods: {
    async add() {
      this.formError = null
      if (
        !this.validateRequiredField(this.personDetails.fullName) ||
        !this.validateRequiredField(this.personDetails.address) ||
        !this.validateRequiredField(this.personDetails.email) ||
        !this.validateRequiredField(this.personDetails.phone) ||
        this.terms == false
      ) {
        this.formError =
          'Un ou plusieurs champs requis! veuillez remplir tout les champs comportant *'
        this.scrollToTop()
        return
      }

      if (
        this.personDetails.bookingDate.start == null ||
        this.personDetails.bookingDate.end == null
      ) {
        this.formError = 'Veuillez selectionner une date de réservation'
        this.scrollToTop()
        return
      }
      this.btnLoader = true
      this.formDisabled = true
      const payValidate = await this.validatePay()
      if (payValidate) {
        let datar = {
          price: `${this.cartTotal * this.bookingsDaysCount}`,
          start_date: this.$moment(this.personDetails.bookingDate.start).unix(),
          end_date: this.$moment(this.personDetails.bookingDate.end).unix(),
          house: this.cart[0].id,
          user_id: this.user.id,
          reserved_names: this.personDetails.fullName,
          billing_details: this.personDetails,
        }
        const getTokken = this.$store.state.authUser.login_session_token,
          self = this
        this.$axios
          .$post(`${process.env.APIBASEURI}/api/v1/booking`, datar, {
            withCredentials: false,
            headers: {
              'Access-Control-Allow-Origin': '*',
              authorization: getTokken,
            },
          })
          .then((response) => {
            if (response.success == true) {
              self.$toast.success(
                `Réservation effectuer avec succès! Merci pour votre commande`,
                {
                  icon: 'fas fa-cart-plus',
                }
              )
              self.btnLoader = false
              self.formDisabled = false
              self.$store.dispatch('cartEmpty')
              self.$router.push('/')
            } else {
              self.btnLoader = false
              self.formDisabled = false
              self.$toast.error(
                `Une erreur s'est produite lors de la réservation. Veuillez réessayer plus tard.`,
                {
                  icon: 'fas fa-times',
                }
              )
            }
          })
      } else {
        this.btnLoader = false
        this.formDisabled = false
      }
    },
    async validatePay() {
      const { error, paymentIntent } = await this.$stripe.confirmCardPayment(
        this.elementsOptions.clientSecret,
        {
          payment_method: {
            card: this.cardNumber,
            billing_details: {
              name: this.personDetails.fullName,
              email: this.personDetails.email,
              phone: this.personDetails.phone,
            },
          },
        }
      )
      if (error && error != null) {
        switch (error.code) {
          case 'payment_intent_unexpected_state':
            this.$toast.error(
              `Une erreur s'est produite lors du paiement. Vérifiez les informations de votre carte.`,
              {
                icon: 'fas fa-times',
              }
            )
            return false
            break
          case 'card_declined':
            if (error.decline_code == 'insufficient_funds') {
              this.$toast.error(
                `Found insuffisant!. Veuillez Vérifier les informations de votre carte.`,
                {
                  icon: 'fas fa-times',
                }
              )
              return false
            }
            this.$toast.error(
              `Votre carte est rejeté. Veuillez Vérifier les informations de votre carte.`,
              {
                icon: 'fas fa-times',
              }
            )
            return false
            break
        }
      }

      if (paymentIntent) {
        return true
      }
    },
    getcartOffDays() {
      let ofd = []
      this.$store.getters.cart.forEach((element) => {
        if (Array.isArray(element.off_days)) {
          ofd = ofd.concat(element.off_days)
        }
      })

      return [...new Set(ofd)]
    },
  },
  mounted() {
    const style = {
      base: {
        color: '#222222',
        fontSmoothing: 'antialiased',
        fontSize: '14px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    }
    this.cardNumber = this.stripeElements.create('cardNumber', {
      style,
    })
    this.cardNumber.mount('#card-number')
    this.cardExpiry = this.stripeElements.create('cardExpiry', {
      style,
    })
    this.cardExpiry.mount('#card-expiry')
    this.cardCvc = this.stripeElements.create('cardCvc', { style })
    this.cardCvc.mount('#card-cvc')
  },
  created() {
    this.offDays = this.getCalendarOffDays(this.getcartOffDays())
  },
  beforeDestroy() {
    this.cardNumber.destroy()
    this.cardExpiry.destroy()
    this.cardCvc.destroy()
  },
  watch: {
    'personDetails.bookingDate.end': function(newVal){
      let diff = newVal.getTime() - this.personDetails.bookingDate.start
      let TotalDays = Math.ceil(diff / (1000 * 3600 * 24));
      if (TotalDays > 0) {
        this.bookingsDaysCount = TotalDays;
      }
      
    },
  },
}
</script>