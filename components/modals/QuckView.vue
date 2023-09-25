<template>
    <div>
        <div class="modal-backdrop" v-if="isQuickViewOpen"></div>
        <transition name="slide-fade">
            <!-- Start Products QuickView Modal Area -->
            <div v-if="isQuickViewOpen" class="modal fade productQuickView" id="productQuickView" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <button 
                            type="button" 
                            class="close" 
                            @click="closeQuickView"
                        >
                            <span aria-hidden="true"><i class="fas fa-times"></i></span>
                        </button>
                        <div class="row align-items-center">
                            <div class="col-lg-6 col-md-6">
                                <div class="productQuickView-image">
                                    <img :src="product.photos[0]" alt="image">
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                                <div class="product-content">
                                    <h3><nuxt-link :to="`/products-details/${product.id}`">{{ product.title }}</nuxt-link></h3>
                                    <div class="price">
                                        <span class="new-price">{{product.price}}€ / Nuit</span>
                                    </div>
                                    <div class="product-review">
                                        <!-- <div class="rating">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                        </div> -->
                                        <span href="#" class="rating-count">3 Commentaire(s)</span>
                                    </div>
                                    <ul class="product-info">
                                        <li><span>Propiétaire:</span> {{ product.first_name }} {{product.last_name}}</li>
                                        <li><span>Type:</span> {{product.type}}</li>
                                        <li><span>Nombre de couchage:</span> {{product.nbr_couchage}}</li>
                                        <li><span>Capacité:</span> {{product.capacity}}</li>
                                        <li v-if="product.location != null"><span>Localisation:</span> {{product.location}}</li>
                                    </ul>
                                    <div class="product-color-switch mb-5">
                                    </div>
                                    <div class="product-size-wrapper mb-5">
                                    </div>
                                    <div class="product-add-to-cart">
                                        <!-- <button 
                                            type="submit" 
                                            class="btn btn-primary"
                                            @click="addToCart(product)"
                                        >
                                            <i class="fas fa-cart-plus"></i> Ajouter au panier
                                        </button> -->
                                    </div>
                                    <nuxt-link :to="`/products-details/${product.id}`" class="view-full-info">Voir plus</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- End Products QuickView Modal Area -->
        </transition>
    </div>
</template>

<script>
import { store, mutations } from '../../utils/sidebar-util';
export default {
    name: 'QuckView',
    props:{
        product:{
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return{
            quantity: 1,
        }
    },
    methods: {
        closeQuickView: mutations.toggleQuickView,
        addToCart(item){
            const product = [{
                id: item.id,
                title: item.title,
                price: item.price,
                photos: item.photos,
                quantity: this.quantity
            }]

            if(this.cart.length > 0){
                let id = item.id 
                this.getExistPId = id
                let cartIndex = this.cart.findIndex(cart => {
                    return cart.id == id
                })

                if(cartIndex == -1){
                    this.$store.dispatch('addToCart', product);
                    this.$toast("Ajouté au panier", {
                        icon: 'fas fa-cart-plus'
                    });
                } else {
                    this.$store.dispatch('updateCart', {
                        id, unit: 1, cart: this.cart
                    });
                    this.$toast.info("Déjà ajouté au panier et mettre à jour avec un");
                }
            } else {
                this.$store.dispatch('addToCart', product)
                this.$toast("Ajouté au panier",{
                    icon: 'fas fa-cart-plus'
                });
            }

            this.closeQuickView()
        },
    },
    computed: {
        isQuickViewOpen(){
            return store.isQuickViewOpen
        },
        cart(){
            return this.$store.getters.cart
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/styles/_transitions.scss";
</style>