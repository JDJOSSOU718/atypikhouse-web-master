<template>
  <div>
    <TopHeader />
    <Menubar />
    <!-- Start Page Title Area -->
    <div class="page-title-area">
      <div class="container">
        <ul>
          <li><nuxt-link to="/">Accueil</nuxt-link></li>
          <li>{{ house.title }}</li>
        </ul>
      </div>
    </div>
    <!-- End Page Title Area -->

    <!-- Start Products Details Area -->
    <div class="products-details-area ptb-60">
      <div class="container">
        <div class="row">
          <ProductImages :images="house.photos" />
          <Details :house="house" />
          <DetailsInfo
            :description="house.description"
            :house="house.id"
            :comments="comments"
          />
          <RelatedProducts :type="house.type" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import TopHeader from '../../layouts/TopHeader'
import Menubar from '../../layouts/Menubar'
import ProductImages from '../../components/products/ProductImages'
import Details from '../../components/products/Details'
import DetailsInfo from '../../components/products/DetailsInfo'
import RelatedProducts from '../../components/products/RelatedProducts'
import users from '../../mixins/users'
import comments from '../../mixins/comments'
export default {
  validate({ params }) {
    return !isNaN(+params.id)
  },
  head() {
    return {
      title: 'Atypikhouse - ' + this.house.title,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Atypikhouse - ' + this.house.title,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Atypikhouse, Location, Détail de location',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            this.house.description.length > 250
              ? this.house.description.substr(0, this.house.description.length - 1) + '&hellip;'
              : this.house.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Atypikhouse - ' + this.house.title,
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.house.description.length > 250
              ? this.house.description.substr(0, this.house.description.length - 1) + '&hellip;'
              : this.house.description,
        },
        { hid: 'og:image', property: 'og:image', content: '/icon.png' },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: 'Atypikhouse - ' + this.house.title,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content:
            this.house.description.length > 250
              ? this.house.description.substr(0, this.house.description.length - 1) + '&hellip;'
              : this.house.description,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: '/icon.png',
        },
      ],
    }
  },
  components: {
    TopHeader,
    Menubar,
    ProductImages,
    Details,
    DetailsInfo,
    RelatedProducts,
  },
  mixins: [users, comments],
  async asyncData({ params, error, $axios, store }) {
    const data = await $axios.$get(
      `${store.state.apiBaseUrl}/api/v1/houses/${params.id}`
    )
    if (data.success) {
      return {
        house: data.data,
        house_id: params.id,
        comments: [],
      }
    } else {
      error({ statusCode: 404, message: 'Biens non trouvé' })
    }
  },

  async created() {
    const data = await this.getHouseComment(this.$route.params.id)

    if (data) {
      this.comments = data.filter((item) => {
        return item.status == 'publish'
      })
    }
  },
}
</script>