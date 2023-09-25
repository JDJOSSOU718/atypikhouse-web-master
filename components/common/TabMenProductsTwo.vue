<template>
    <div class="tabs_item">
        <div class="row">
            <ProductItemTwo
                v-for="(product, index) in products"
                :product="product"
                :key="index"
                @clicked="toggle"
            ></ProductItemTwo>
        </div>
    </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import { mutations } from '../../utils/sidebar-util'
import ProductItemTwo from './ProductItemTwo'

export default {
    name: 'TabMenProducts',
    components: {
        QuckView,
        ProductItemTwo,
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.bestSellers === true
            )
        },
    },
}
</script>