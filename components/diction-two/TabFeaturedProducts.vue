<template>
    <div class="tabs_item">
        <div class="row">
            <ProductItem
                :product="product"
                v-for="(product, index) in products"
                :key="index"
                @clicked="toggle"
            ></ProductItem>
        </div>
    </div>
</template>

<script>
import ProductItem from './ProductItem'
import { mutations } from '../../utils/sidebar-util'

export default {
    name: 'TabFeaturedProducts',  
    components: {
        ProductItem,
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.trendingOne === true
            )
        },
    },
}
</script>