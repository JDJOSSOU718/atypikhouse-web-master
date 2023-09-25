<template>
  <div class="col-lg-4 col-md-12">
    <div class="woocommerce-sidebar-area">
      <div class="collapse-widget collections-list-widget">
        <div class="col form-group pl-0">
          <input
            type="text"
            placeholder="Entre un(e) nom/lieu/description"
            class="form-control"
            v-model="searchQuery"
            @change="filterQuery"
          />
        </div>
      </div>

      <div class="collapse-widget collections-list-widget">
        <h3 v-b-toggle.collapse-2 class="collapse-widget-title">
          Type
          <i class="fas fa-angle-up"></i>
        </h3>
        <b-collapse id="collapse-2">
          <ul class="collections-list-row">
            <li :class="{ active: typeFilterSelected == 0 }">
              <a href="javascript:void(0)" @click="filterType('', 0)">Tout</a>
            </li>
            <li :class="{ active: typeFilterSelected == 1 }">
              <a href="javascript:void(0)" @click="filterType('yourt', 1)"
                >Yourt</a
              >
            </li>
            <li :class="{ active: typeFilterSelected == 2 }">
              <a href="javascript:void(0)" @click="filterType('tente', 2)"
                >Tente</a
              >
            </li>
            <li :class="{ active: typeFilterSelected == 3 }">
              <a href="javascript:void(0)" @click="filterType('tiny', 3)"
                >Tiny House</a
              >
            </li>
            <li :class="{ active: typeFilterSelected == 4 }">
              <a href="javascript:void(0)" @click="filterType('cube', 4)"
                >Le cube</a
              >
            </li>
            <li :class="{ active: typeFilterSelected == 5 }">
              <a href="javascript:void(0)" @click="filterType('cabane', 5)"
                >Cabane</a
              >
            </li>
          </ul>
        </b-collapse>
      </div>

      <div class="collapse-widget price-list-widget">
        <h3 v-b-toggle.collapse-5 class="collapse-widget-title">
          Prix

          <i class="fas fa-angle-up"></i>
        </h3>

        <b-collapse id="collapse-5">
          <ul class="price-list-row">
            <li :class="{ active: priceFilterSelected == 0 }">
              <a href="javascript:void(0)" @click="filterPrice({}, 0)">Tout</a>
            </li>
            <li :class="{ active: priceFilterSelected == 1 }">
              <a
                href="javascript:void(0)"
                @click="filterPrice({ min: 50, max: 100 }, 1)"
                >50€ - 100€</a
              >
            </li>
            <li :class="{ active: priceFilterSelected == 2 }">
              <a
                href="javascript:void(0)"
                @click="filterPrice({ min: 100, max: 200 }, 2)"
                >100€ - 200€</a
              >
            </li>
            <li :class="{ active: priceFilterSelected == 3 }">
              <a
                href="javascript:void(0)"
                @click="filterPrice({ min: 200, max: 300 }, 3)"
                >200€ - 300€</a
              >
            </li>
            <li :class="{ active: priceFilterSelected == 4 }">
              <a
                href="javascript:void(0)"
                @click="filterPrice({ min: 300, max: 400 }, 4)"
                >300€ - 400€</a
              >
            </li>
            <li :class="{ active: priceFilterSelected == 5 }">
              <a
                href="javascript:void(0)"
                @click="filterPrice({ min: 400, max: 9999999999 }, 5)"
                >400€ - plus</a
              >
            </li>
          </ul>
        </b-collapse>
      </div>
      <div class="collapse-widget price-list-widget">
        <h3 v-b-toggle.collapse-6 class="collapse-widget-title">
          Disponibilité

          <i class="fas fa-angle-up"></i>
        </h3>

        <b-collapse id="collapse-6" class="pt-4">
          <vc-date-picker
            color="green"
            :columns="$screens({ default: 1 })"
            is-range
            :attributes="calendarAttrs"
            v-model="availableDates"
            @input="filterDates()"
          />
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      typeFilterSelected: 0,
      priceFilterSelected: 0,
      searchQuery: '',
      availableDates: {
          start: null,
          end: null,
        },
      calendarAttrs: [
        {
          key: 'today',
          dot: true,
          dates: new Date(),
          popover: {
            label: "Aujourd'hui",
          },
        },
      ],
    }
  },
  methods: {
    filterPrice(price, selector) {
      this.priceFilterSelected = selector
      this.$emit('priceFiltered', price)
      
    },
    filterType(type, selector) {
      this.typeFilterSelected = selector
      this.$emit('typeFiltered', type)
      
    },
    filterQuery() {
      this.$emit('handlehQuery', this.searchQuery)
    },
    filterDates(){
      this.$emit('dateFiltered', this.availableDates)
      
    },
  },
  watch: {
    searchQuery: function (newVal) {
      if (newVal != '') {
        this.$emit('handlehQuery', newVal)
      }
    },
  },
}
</script>