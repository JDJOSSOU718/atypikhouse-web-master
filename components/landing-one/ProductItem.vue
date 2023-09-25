<template>
    <div :class="className">
        <div class="single-product-box">
            <div class="product-image">
                <nuxt-link :to="`/products-details/${product.id}`">
                    <img :src="product.photos[0]" :alt="product.title" />
                    <img :src="product.photos[1]" :alt="product.title" />
                </nuxt-link>

                <ul>
                    <li>
                        <a
                            href="javascript:void(0)"
                            title="Vu rapide"
                            v-b-tooltip.hover
                            @click.prevent="quickView(product)"
                        >
                        <i class="far fa-eye"></i>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="product-content">
                <h3>
                    <nuxt-link :to="`/products-details/${product.id}`">
                        {{product.title}}
                    </nuxt-link>
                </h3>

                <div class="product-price">
                    <span class="new-price">{{ product.price }}€</span>
                </div>

                
                <nuxt-link :to="`/products-details/${product.id}`"  class="btn btn-light">
                        Réserver
                </nuxt-link>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProductItem',
    data() {
        return {
            getExistPId: null,
        }
    },
    props: ['product', 'className'],
    computed: {
        cart() {
            return this.$store.getters.cart
        },
    },
    methods: {
        quickView(product) {
            this.$emit('clicked', product)
        },
        addToCart(item) {
            const product = [
                {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    photos: item.photos,
                    off_days: item.off_days,
                    quantity: 1,
                },
            ]

            if (this.cart.length > 0) {
                 this.$toast.info('Vous ne pouvez pas ajouter plus d\'un élément dans votre panier');
                // let id = item.id
                // this.getExistPId = id
                // let cartIndex = this.cart.findIndex((cart) => {
                //     return cart.id == id
                // })

                // if (cartIndex == -1) {
                //     this.$store.dispatch('addToCart', product)
                //     this.$toast('Ajouté au panier', {
                //         icon: 'fas fa-cart-plus',
                //     })
                // } else {
                //     this.$store.dispatch('updateCart', {
                //         id,
                //         unit: 1,
                //         cart: this.cart,
                //     })
                //     this.$toast.info('Déjà ajouté au panier et mettre à jour avec un')
                // }
            } else {
                this.$store.dispatch('addToCart', product)
                this.$toast('Ajouté au panier', {
                    icon: 'fas fa-cart-plus',
                })
            }
        },
    },
}
</script>