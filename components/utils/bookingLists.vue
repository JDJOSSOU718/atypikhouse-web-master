<template>
  <div class="container-fluid p-0">
    <div class="">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span>Listes des réservations</h2>
      </div>
    </div>
    <div class="col-lg-12 p-0">
      <div v-if="tableDataReady" class="table-responsive">
        <v-grid
          v-if="tableDataReady"
          theme="compact"
          :readonly="true"
          :canFocus="false"
          :filter="true"
          :source="listData"
          :columns="columns"
          :resize="true"
          :autoSizeColumn="{
            mode: 'autoSizeOnTextOverlap',
          }"
          style="min-height: 72vh; width: 100%"
          row-size="60"
        ></v-grid>
        <Paginations
          v-if="pagination.total > pagination.perPage"
          :perPage="pagination.perPage"
          :total="pagination.total"
          :value="pagination.default"
          @input="changePage"
        />
      </div>
      <h4 v-else class="text-center">Aucune réservations en cours</h4>
    </div>
  </div>
</template>

<script>
import VGrid, { VGridVueTemplate } from '@revolist/vue-datagrid'
import booking from '../../mixins/booking'
import Paginations from '../../components/common/Paginations'
import statusFormatedTemplate from '../tableCommon/comments-parts/statusTemplate'
import actionTemplate from '../tableCommon/bookings-parts/actionTemplate'


export default {
  props: {
    admin: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Boolean,
      default: false,
    }
  },
  components: { VGrid, Paginations },
  mixins: [booking],
  data() {
    return {
      columns: this.owner == true ? [
        {
          prop: 'title',
          name: 'Titre',
          sortable: true,
          size: 250,
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Prix (€)',
          prop: 'price',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement('span', {}, props.model.price + ' €')
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Status',
          prop: 'status',
          size: 80,
          sortable: true,
          cellTemplate: VGridVueTemplate(statusFormatedTemplate),
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Réserver par',
          prop: 'last_name',
          sortable: true,
          size: 150,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              props.model.first_name + ' ' + props.model.last_name
            )
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Date de début',
          prop: 'start_date',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              this.$moment.unix(props.model.start_date).format('L')
            )
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Date de fin',
          prop: 'end_date',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              this.$moment.unix(props.model.end_date).format('L')
            )
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Créer le',
          prop: 'created_at',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              props.model.created_at != null
                ? this.$moment.unix(props.model.created_at).format('L')
                : '--'
            )
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          prop: 'id',
          name: 'Actions',
          filter: false,
          cellTemplate: VGridVueTemplate(actionTemplate),
        },
      ] : [
        {
          prop: 'title',
          name: 'Titre',
          sortable: true,
          size: 250,
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Prix (€)',
          prop: 'price',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement('span', {}, props.model.price + ' €')
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Status',
          prop: 'status',
          size: 80,
          sortable: true,
          cellTemplate: VGridVueTemplate(statusFormatedTemplate),
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Réserver par',
          prop: 'last_name',
          sortable: true,
          size: 150,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              props.model.first_name + ' ' + props.model.last_name
            )
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Date de début',
          prop: 'start_date',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              this.$moment.unix(props.model.start_date).format('L')
            )
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Date de fin',
          prop: 'end_date',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              this.$moment.unix(props.model.end_date).format('L')
            )
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Créer le',
          prop: 'created_at',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              props.model.created_at != null
                ? this.$moment.unix(props.model.created_at).format('L')
                : '--'
            )
          },
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          prop: 'id',
          name: 'Actions',
          filter: false,
          cellTemplate: VGridVueTemplate(actionTemplate),
        },
      ],
      allData: [],
      listData: [],
      toDelete: null,
      tableDataReady: false,
      pagination: {
        default: 1,
        total: 0,
        perPage: 10,
      },
    }
  },
  methods: {
    async updateDataList() {
      this.loading = true
      let result = false
      if (this.admin) {
        result = await this.getBookings()
      } else {
        if (this.$store.state.authUser.grade == 'owner') {
          result = await this.getOwnerBookings()
        } else {
          result = await this.getUserBookings()
        }
      }

      if (await result) {
        let reData = result.filter((item)=>{
          return item.status != 'deleted'
        })
        this.listData = reData.slice(0, 10)
        this.allData = reData
        this.pagination.total = reData.length
        this.tableDataReady = true
        this.loading = false
      } else {
        this.loading = false
      }
    },
    changePage(page) {
      let start, end
      start = (page - 1) * this.pagination.perPage
      end = this.pagination.perPage * page
      this.listData = this.allData.slice(start, end)
      this.pagination.default = page
    },
  },
  async beforeMount() {
    await this.updateDataList()
  },
}
</script>