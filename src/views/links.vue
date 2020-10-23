<template>
<div class="bg-gray-200">
  <main class="h-screen">
    <div class="max-w-full mx-auto p-6 lg:p-8 relative">
      <div class="grid place-items-center">
        <spinner v-if="loadingLinks"></spinner>
      </div>
      <div v-if="!loadingLinks" class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full overflow-hidden
                      sm:rounded-md border-gray-200">

            <link-table v-if="shouldShowTable" />

            <div v-if="!shouldShowTable" class="text-center">
              <h1 class="text-4xl mt-4">
                Todavía no agregas ninguna credencial 👀
              </h1>
            </div>
          </div>
          <div class="mt-4 text-right">
            <router-link to="/links/new?holder_type=individual&product=movements"
              :class="{ 'text-xs': shouldShowTable }"
              class="px-2 py-1 inline-flex text-l leading-5 font-semibold rounded-md bg-gray-200
                      text-gray-900 hover:bg-gray-300">
              <font-awesome-icon icon="plus" class="mt-1 mr-1"/> Nuevo link personas
            </router-link>
            <router-link to="/links/new?holder_type=business&product=movements"
              :class="{ 'text-xs': shouldShowTable }"
              class="px-2 py-1 inline-flex text-l leading-5 font-semibold rounded-md bg-gray-200
                      text-gray-900 hover:bg-gray-300">
              <font-awesome-icon icon="plus" class="mt-1 mr-1"/> Nuevo link empresas
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </main>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LinkTable from '../components/links/link-table.vue';
import Spinner from '../components/lib/spinner.vue';

export default {
  created() {
    this.getUserLinks();
  },
  mounted() {
    window.analytics.page('Links');
  },
  methods: {
    ...mapActions([
      'getUserLinks',
    ]),
  },
  computed: {
    ...mapState({
      userLinks: (state) => state.links.userLinks,
      loadingLinks: (state) => state.links.loading,
    }),
    shouldShowTable() {
      return !this.loadingLinks && this.userLinks.length !== 0;
    },
  },
  components: {
    LinkTable,
    Spinner,
  },
};
</script>
