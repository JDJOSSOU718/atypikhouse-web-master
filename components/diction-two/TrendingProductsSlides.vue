<template>
    <div>
        <div class="trending-products-area pb-60">
            <div class="container">
                <div class="section-title without-bg">
                    <h2><span class="dot"></span> Trending Products</h2>
                </div>

                <div class="row">
                    <ProductItem
                        :product="product"
                        v-for="(product, index) in products"
                        :key="index"
                        @clicked="toggle"
                    ></ProductItem>
                </div>
            </div>
        </div>

        <QuckView />
    </div>
</template>

<script>
import ProductItem from './ProductItem'
import { mutations } from '../../utils/sidebar-util'
import QuckView from '../modals/QuckView'

export default {
    name: 'TrendingProductsSlides',  
    components: {
        ProductItem,
        QuckView,
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.trendingTwo === true
            )
        },
    },
}
</script>