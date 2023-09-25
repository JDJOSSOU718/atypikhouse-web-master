<template>
    <div>
        <div class="best-sellers-area pb-60">
            <div class="container">
                <div class="section-title without-bg">
                    <h2><span class="dot"></span> Derniers Biens</h2>
                </div>

                <div class="row" v-if="provData.length > 0">
                    <ProductItem
                        :product="product"
                        v-for="(product, index) in provData"
                        :key="index"
                        @clicked="toggle"
                    ></ProductItem>
                </div>
                <div v-else class="row">
                    <div class="col-12">
                        <h3 class="text-center">Aucun produit disponible actuellement</h3>
                    </div>
                </div>
            </div>
        </div>

        <QuckView :product="quickViewProduct" />
    </div>
</template>

<script>
import ProductItem from './ProductItem'
import { mutations } from '../../utils/sidebar-util'
import QuckView from '../modals/QuckView'

export default {
    props:{
        provData: {
            type: Array,
            default: []
        }
    },
    name: 'BestSellers',  
    components: {
        ProductItem,
        QuckView,
    },
    data(){
        return {
            quickViewProduct: null
        }
    },
    methods: {
        toggle(data) {
            this.quickViewProduct = data
            mutations.toggleQuickView()
        },
    },
}
</script>