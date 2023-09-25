<template>
    <div class="tabs_item">
        <div class="row">
            <SpecialOfferItem
                v-for="(product, index) in products"
                :product="product"
                :key="index"
                @clicked="toggle"
                :className="`col-lg-3 col-md-6 col-sm-6`"
            ></SpecialOfferItem>
        </div>
    </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import { mutations } from '../../utils/sidebar-util'
import SpecialOfferItem from './SpecialOfferItem'

export default {
    name: 'TabMenProducts',
    components: {
        QuckView,
        SpecialOfferItem,
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.specialOne === true
            )
        },
    },
}
</script>