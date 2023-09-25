<template>
  <div class="container-fluid p-0">
    <div class="">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span>Listes des utilisateurs</h2>
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
import gradeFormatedTemplate from '../tableCommon/users-parts/gradeFormatedTemplate'
import actionTemplate from '../tableCommon/users-parts/actionTemplate'
import nameTemplate from '../tableCommon/users-parts/nameTemplate'
import onlineTemplate from '../tableCommon/users-parts/onlineTemplate'
import users from '../../mixins/users'
import Paginations from '../../components/common/Paginations'
export default {
  props: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  components: { VGrid, Paginations },
  mixins: [users],
  data() {
    return {
      columns: [
        {
          prop: 'id',
          name: 'Nom et Prénoms',
          sortable: true,
          size: 200,
          cellTemplate: VGridVueTemplate(nameTemplate),
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Grade',
          prop: 'grade',
          size: 120,
          sortable: true,
          cellTemplate: VGridVueTemplate(gradeFormatedTemplate),
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Email',
          prop: 'email',
          sortable: true,
          size: 180,
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Téléphone',
          prop: 'phone',
          sortable: true,
          size: 100,
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Connecter',
          prop: 'is_online',
          sortable: true,
          size: 100,
          cellTemplate: VGridVueTemplate(onlineTemplate),
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },
        {
          name: 'Dernière connexion',
          prop: 'last_login',
          sortable: true,
          size: 120,
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

      result = await this.getUsers()

      if (result.success) {
        let reData = result.data.filter((item)=>{
          return item.status != "deleted"
        })
        this.listData =reData.slice(0, 10)
        this.allData = reData
        this.pagination.total = reData.length
        this.tableDataReady = true
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