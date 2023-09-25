<template>
  <nav
    class="woocommerce-pagination"
    :class="[align && `justify-content-${align}`]"
  >
    <ul>
      <li>
        <a class="prev page-numbers" :class="{ 'd-none': value === 1 }"
          ><i class="fas fa-chevron-left"></i
        ></a>
      </li>
      <li
        class="page-item"
        :key="item"
        v-for="item in range(minPage, maxPage)"
      >
        <a class="page-numbers" :class="{ current: value === item }" @click="changePage(item)">{{
          item
        }}</a>
      </li>

      <li :class="{ 'd-none': value === totalPages }">
        <a class="next page-numbers" @click="nextPage"
          ><i class="fas fa-chevron-right"></i
        ></a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'paginations',
  props: {
    pageCount: {
      type: Number,
      default: 0,
      description:
        'Nombre de pages de la pagination. Ceci doit être spécifié en combinaison avec perPage',
    },
    perPage: {
      type: Number,
      default: 10,
      description:
        'Pagination par page. Doit être spécifié avec total ou pageCount',
    },
    total: {
      type: [String, Number],
      default: 0,
      description:
        'Peut être spécifié à la place de pageCount. Dans ce cas, le nombre de pages sera total/parPage.',
    },
    value: {
      type: Number,
      default: 1,
      description: 'Pagination value',
    },
    align: {
      type: String,
      default: '',
      description: 'Pagination alignment (e.g center|start|end)',
    },
  },
  computed: {
    totalPages() {
      if (this.pageCount > 0) return this.pageCount
      if (this.total > 0) {
        return Math.ceil(this.total / this.perPage)
      }
      return 1
    },
    pagesToDisplay() {
      if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
        return this.totalPages
      }
      return this.defaultPagesToDisplay
    },
    minPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
        const newMaxPage = pagesToAdd + this.value
        if (newMaxPage > this.totalPages) {
          return this.totalPages - this.pagesToDisplay + 1
        }
        return this.value - pagesToAdd
      } else {
        return 1
      }
    },
    maxPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
        const newMaxPage = pagesToAdd + this.value
        if (newMaxPage < this.totalPages) {
          return newMaxPage
        } else {
          return this.totalPages
        }
      } else {
        return this.pagesToDisplay
      }
    },
  },
  data() {
    return {
      defaultPagesToDisplay: 5,
    }
  },
  methods: {
    range(min, max) {
      let arr = []
      for (let i = min; i <= max; i++) {
        arr.push(i)
      }
      return arr
    },
    changePage(item) {
      this.$emit('input', item)
    },
    nextPage() {
      if (this.value < this.totalPages) {
        this.$emit('input', this.value + 1)
      }
    },
    prevPage() {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    },
  },
  watch: {
    perPage() {
      this.$emit('input', 1)
    },
    total() {
      this.$emit('input', 1)
    },
  },
}
</script>
