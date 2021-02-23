<template>
<div class="bg-gray-200">
  <main class="h-full min-h-screen">
    <div class="max-w-full mx-auto p-6 lg:p-8 relative">
      <div class="grid place-items-center">
        <spinner v-if="initLoading" :widthClsName="'w-64'" :heightClsName="'h-64'"></spinner>
      </div>
      <div v-if="!initLoading" class="flex flex-col">
        <div class="flex justify-end mb-8 mr-1">
          <h1 class="text-gray-900 font-semibold text-xl leading-9 mr-2">Modo</h1>
          <toggle-button :css-colors="false" :color="{checked: '#8cdee2',
                                  unchecked: '#7f7fe8'}"
            :value="!testMode"
            :sync="true"
            :width="90"
            :height="35"
            :fontSize="18"
            :margin="3"
            :labels="{checked: 'Live', unchecked: 'Test'}"
            @change="updateLinksMode()"/>
        </div>
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full overflow-hidden
                      sm:rounded-md border-gray-200">

            <link-table :loading="loadingLinks"/>
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
import Spinner from '../components/lib/spinner.vue';
import Pagination from '../components/lib/pagination.vue';


export default {
  data() {
    return {
      loadingLinks: false,
    };
  },
  created() {
    this.getUserLinks({ page: 1, mode: 'live' });
    this.getUserLinks({ page: 1, mode: 'test' });
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
    ]),
    async selectPage(page) {
      const mode = this.testMode ? 'test' : 'live';
      this.loadingLinks = true;
      try {
        await this.getUserLinks({ page, mode });
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
      testMode: (state) => state.links.mode === 'test',
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
  },
  components: {
    LinkTable,
    Spinner,
    Pagination,
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
