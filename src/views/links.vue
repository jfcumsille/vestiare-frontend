<template>
<div class="bg-white">
  <main class="h-full min-h-screen">
    <div class="max-w-full mx-auto p-6 lg:p-8 relative">
      <div class="grid place-items-center">
        <spinner
          v-if="initLoading"
          :widthClsName="'w-20'"
          :heightClsName="'h-20'" :borderClsName="'border-2 border-t-2'"></spinner>
      </div>
      <div v-if="!initLoading" class="flex flex-col">
        <span class="text-xl tracking-wider font-semibold py-1">Filtros</span>
        <div class="flex justify-between mb-8 mr-1">
          <div class="flex">
            <dropdown-filter class="mr-1"
                :onSelection="selectFilter"
                :filterKey="'activeFilter'"
                :options="{all: 'Todos', true:  'Activos', false: 'Inactivos'}"
                :selected="this.activeFilter"/>
            <div class="mx-1 flex justify-between items-center bg-white border-1 sm:rounded-md
                border border-gray-300 text-gray-900 py-2 px-4">
              <span class="text-base font-medium">Contraseña</span>
              <checkbox-filter
                class="flex ml-4"
                :filterKey="'preventRefreshFilter'"
                :onClick="this.selectFilter"/>
            </div>
            <search-filter class="mx-1" :filterKey="'rutFilter'" :onClick="this.selectFilter"/>
          </div>
          <div class="flex justify-end">
            <h1 class="text-gray-900 font-semibold text-xl leading-9 mr-2">Modo</h1>
            <toggle-button class="mt-1" :css-colors="false" :color="{checked: '#475FF1',
                                    unchecked: '#475FF1'}"
              :value="!testMode"
              :sync="true"
              :width="70"
              :height="26"
              :fontSize="16"
              :margin="6"
              :labels="{checked: 'Live', unchecked: 'Test'}"
              @change="updateLinksMode()"/>
          </div>
        </div>
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full overflow-hidden
                      sm:rounded-md">

            <link-table class="border border-gray-300"
            :loading="loadingLinks" :filters="filtersOn"/>
            <pagination v-if="pagination && pagination.currentPage" class="pl-2 py-2 float-right"
              :currentPage="pagination.currentPage"
              :lastPage="pagination.lastPage"
              :paginate="selectPage"
            />
          </div>
          <div class="mt-4 text-right flex flex-row justify-end space-x-2">
            <router-link to="/links/new?holder_type=individual&product=movements"
              class="text-center justify-content flex flex-col items-center
                     font-medium rounded-md bg-main text-md
                     text-white hover:bg-sub w-64 h-10 py-2">
              {{ `Nuevo link ${testMode ? 'personas de prueba' : 'personas'}` }}
            </router-link>
            <router-link to="/links/new?holder_type=business&product=movements"
              class="text-center justify-content flex flex-col items-center
                     font-medium rounded-md bg-main text-md
                     text-white hover:bg-sub w-64 h-10 py-2">
              {{ `Nuevo link ${testMode ? 'empresas de prueba' : 'empresas'}` }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import LinkTable from '../components/links/link-table.vue';
import DropdownFilter from '../components/links/filters/dropdown-filter.vue';
import CheckboxFilter from '../components/links/filters/checkbox-filter.vue';
import SearchFilter from '../components/links/filters/search-filter.vue';
import Spinner from '../components/lib/spinner.vue';
import Pagination from '../components/lib/pagination.vue';


export default {
  data() {
    return {
      loadingLinks: false,
      activeFilter: 'all',
      preventRefreshFilter: 'all',
      rutFilter: null,
    };
  },
  async created() {
    await Promise.all([
      this.getUserLinks({ page: 1, mode: 'live', filters: {} }),
      this.getUserLinks({ page: 1, mode: 'test', filters: {} }),
    ]);
    this.updateInitLoading(false);
  },
  mounted() {
    window.analytics.page('Links');
  },
  methods: {
    ...mapActions([
      'getUserLinks',
      'updateLinksMode',
      'updateInitLoading',
    ]),

    async selectFilter(value, filterKey) {
      this.loadingLinks = true;
      this[filterKey] = value;
      try {
        await Promise.all([
          this.refreshLinks({ page: 1, mode: 'test' }),
          this.refreshLinks({ page: 1, mode: 'live' }),
        ]);
        this.loadingLinks = false;
      } catch {
        // TODO: notify error to user
      }
    },

    async refreshLinks({ page, mode }) {
      const filters = {
        active: this.activeFilter,
        prevent_refresh: this.preventRefreshFilter,
        rut: this.rutFilter,
      };
      await this.getUserLinks({ page, mode, filters });
    },

    async selectPage({ page, mode }) {
      this.loadingLinks = true;
      try {
        await this.refreshLinks({ page, mode });
        this.loadingLinks = false;
      } catch {
        // TODO: notify error to user
      }
    },
  },
  computed: {
    ...mapGetters({
      userLinks: 'getLinks',
    }),
    ...mapState({
      mode: (state) => state.links.mode,
      initLoading: (state) => state.links.loading,
    }),
    ...mapGetters({
      userLinks: 'getLinks',
      pagination: 'getPagination',
    }),
    shouldShowTable() {
      return !this.initLoading && this.userLinks.length !== 0;
    },
    testMode() {
      return this.mode === 'test';
    },
    filtersOn() {
      return Boolean(
        (this.activeFilter !== 'all')
        || (this.preventRefreshFilter !== 'all')
        || this.rutFilter,
      );
    },
  },
  components: {
    LinkTable,
    Spinner,
    Pagination,
    DropdownFilter,
    CheckboxFilter,
    SearchFilter,
  },
};
</script>
