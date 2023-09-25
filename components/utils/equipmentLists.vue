<template>
  <div class="container-fluid p-0">
    <div class="">
      <div v-if="!admin" class="section-title">
        <h2><span class="dot"></span>Listes des équipements</h2>
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
import actionTemplate from '../tableCommon/equipements-parts/actionTemplate'
import iconTemplate from '../tableCommon/equipements-parts/iconTemplate'
import equipement from '../../mixins/equipment'
import Paginations from '../../components/common/Paginations'
export default {
  props: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  components: { VGrid, Paginations },
  mixins: [equipement],
  data() {
    return {
      columns: [
        {
          prop: 'name',
          name: 'Nom',
          sortable: true,
          size: 300,
          cellProperties: () => {
            return {
              class: {
                'p-2': true,
              },
            }
          },
        },        
        {
          name: 'Icon',
          prop: 'icon',
          sortable: true,
          size: 250,
          cellTemplate: VGridVueTemplate(iconTemplate),
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
        result = await this.getEquipments()
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