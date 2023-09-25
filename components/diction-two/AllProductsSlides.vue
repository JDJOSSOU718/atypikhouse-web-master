<template>
    <div>
        <div class="all-products-area pb-60">
            <div class="container">
                <div class="products-category-tab">
                    <b-tabs content-class="mt-3 tab_content">
                        <b-tab title="Latest Products">
                            <TabLatestProducts />
                        </b-tab>
                        <b-tab title="Special Products">
                            <TabSpecialProducts />
                        </b-tab>
                        <b-tab title="Featured Products">
                            <TabFeaturedProducts />
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
        <QuckView />
    </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import TabLatestProducts from './TabLatestProducts'
import TabSpecialProducts from './TabSpecialProducts'
import TabFeaturedProducts from './TabFeaturedProducts'

export default {
    name: 'AllProductsSlides',  
    components: {
        QuckView,
        TabLatestProducts,
        TabSpecialProducts,
        TabFeaturedProducts
    },
}
</script>