<template>
  <div class="container-fluid p-0">
    <div class="">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span>Listes des commentaires</h2>
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
      <h3 v-else class="text-center">Aucune donnée disponible</h3>
    </div>
  </div>
</template>

<script>
import VGrid, { VGridVueTemplate } from '@revolist/vue-datagrid'
import statusFormatedTemplate from '../tableCommon/comments-parts/statusTemplate'
import actionTemplate from '../tableCommon/comments-parts/actionTemplate'
import comments from '../../mixins/comments'
import Paginations from '../../components/common/Paginations'

export default {
  props: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  components: { VGrid, Paginations },
  mixins: [comments],
  data() {
    return {
      columns: [
        {
          prop: 'content',
          name: 'Commentatire',
          sortable: false,
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
          name: 'Status',
          prop: 'status',
          size: 120,
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
          name: 'Biens',
          prop: 'title',
          sortable: true,
          size: 150,
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Créer par',
          prop: 'last_name',
          sortable: true,
          size: 180,
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
          name: 'Créer le',
          prop: 'created_date',
          sortable: true,
          size: 100,
          cellTemplate: (createElement, props) => {
            return createElement(
              'span',
              {},
              this.$moment.unix(props.model.created_date).format('L')
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
        result = await this.getComments()
      }

      if (await result) {
        this.listData = result.slice(0, 10)
        this.allData = result
        this.pagination.total = result.length
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