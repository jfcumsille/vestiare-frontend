<template>
<div class="bg-gray-200">
  <main class="h-full min-h-screen">
    <div class="max-w-full mx-auto p-6 lg:p-8 relative">
      <div class="grid place-items-center">
        <spinner v-if="initLoading" :widthClsName="'w-64'" :heightClsName="'h-64'"></spinner>
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
          </div>
          <div class="flex justify-end">
            <h1 class="text-gray-900 font-semibold text-2xl leading-9 mr-2">Modo</h1>
            <toggle-button :css-colors="false" :color="{checked: '#8cdee2',
                                    unchecked: '#7f7fe8'}"
              :value="!testMode"
              :sync="true"
              :width="100"
              :height="36"
              :fontSize="24"
              :margin="4"
              :labels="{checked: 'Live', unchecked: 'Test'}"
              @change="updateLinksMode()"/>
          </div>
        </div>
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full overflow-hidden
                      sm:rounded-md border-gray-200">

            <link-table :loading="loadingLinks" :filters="filtersOn"/>
            <pagination v-if="pagination && pagination.currentPage" class="pl-2 py-2 float-right"
              :currentPage="pagination.currentPage"
              :lastPage="pagination.lastPage"
              :paginate="selectPage"
            />
          </div>
          <div class="mt-4 text-right">
            <router-link to="/links/new?holder_type=individual&product=movements"
              :class="{ 'text-xs': shouldShowTable }"
              class="pr-2 py-1 inline-flex text-l leading-5 font-semibold rounded-md bg-gray-200
                      text-gray-900 hover:bg-gray-300">
              <font-awesome-icon icon="plus" class="mt-1 mr-1"/>
              {{ `Nuevo link ${testMode ? 'personas de prueba' : 'personas'}` }}
            </router-link>
            <router-link to="/links/new?holder_type=business&product=movements"
              :class="{ 'text-xs': shouldShowTable }"
              class="pl-2 py-1 inline-flex text-l leading-5 font-semibold rounded-md bg-gray-200
                      text-gray-900 hover:bg-gray-300">
              <font-awesome-icon icon="plus" class="mt-1 mr-1"/>
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
import Spinner from '../components/lib/spinner.vue';
import Pagination from '../components/lib/pagination.vue';


export default {
  data() {
    return {
      loadingLinks: false,
      activeFilter: 'all',
    };
  },
  async created() {
    await Promise.all([
      this.getUserLinks({ page: 1, mode: 'live', filters: {} }),
      this.getUserLinks({ page: 1, mode: 'test', filters: {} }),
    ]);
    this.updateInitLoading(false);
    if (!this.skipped) {
      this.showOnboarding();
    }
  },
  mounted() {
    window.analytics.page('Links');
  },
  methods: {
    ...mapActions([
      'getUserLinks',
      'showOnboarding',
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
        prevent: this.preventRefreshFilter,
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
      show: (state) => state.onboarding.show,
      skipped: (state) => state.onboarding.skipped,
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
      return Boolean(this.activeFilter);
    },
  },
  components: {
    LinkTable,
    Spinner,
    Pagination,
    DropdownFilter,
  },
  watch: {
    show(newValue) {
      if (newValue) {
        this.$router.push('/onboarding');
      }
    },
  },
};
</script>
