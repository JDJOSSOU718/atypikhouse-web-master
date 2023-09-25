<template>
    <client-only>
        <div class="col-lg-8 col-md-4">
            <div class="products-page-gallery">
                <div class="product-page-gallery-main">
                    <vueper-slides v-if="images[0]"
                        :bullets = "false"
                    >
                        <vueper-slide
                            v-for="(img, i) in imagesList"
                            :key="i"
                            :image="img.image" />
                    </vueper-slides>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script>
export default {
    props:{
        images: {
            type: Object,
        },
    },
    data(){
        return {
            imagesList: []
        }
    },
    created(){
        let returned = []

        if(this.images[0]){
            for (const img in this.images){
                returned.push({id: img, image: this.images[img]})
            }
        }
        this.imagesList = returned
    }
}
</script>

<style scoped>
/* Styles spécifiques à ce composant */

/* Style pour la galerie d'images */
.products-page-gallery {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 20px;
}

/* Style pour les images de la galerie */
.product-page-gallery-main {
    margin-top: 20px;
}

/* Style pour les images individuelles */
.vueper-slide img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>