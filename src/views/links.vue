<template>
<div class="bg-gray-200">
  <main class="h-screen">
    <div class="max-w-full mx-auto p-6 lg:p-8 relative">
      <spinner v-if="shouldShowSpinner"></spinner>
      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full overflow-hidden
                      sm:rounded-md border-gray-200">
            <link-table v-if="shouldShowTable"></link-table>
            <div v-if="!shouldShowTable" class="text-center">
              <h1 class="text-4xl mt-4">
                Todavía no agregaste ninguna credencial 👀
              </h1>
            </div>
          </div>
          <div class="mt-4 text-right">
            <router-link to="/links/new?holder-type=individual"
              :class="{ 'text-xs': shouldShowTable }"
              class="px-2 py-1 inline-flex text-l leading-5 font-semibold rounded-md bg-gray-200
                      text-gray-900 hover:bg-gray-300">
              <font-awesome-icon icon="plus" class="mt-1 mr-1"/> Nuevo link personas
            </router-link>
            <router-link to="/links/new?holder-type=business"
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
import { mapGetters } from 'vuex';
import LinkTable from '../components/links/link-table.vue';
import Spinner from '../components/spinner.vue';

export default {
  data() {
    return {
      retrievingUserLinks: false,
    };
  },
  created() {
    this.retrievingUserLinks = true;
    this.$store.dispatch('getUserLinks').then(() => {
      this.retrievingUserLinks = false;
    });
  },
  mounted() {
    window.analytics.page('Links');
  },
  computed: {
    ...mapGetters([
      'userLinks',
    ]),
    shouldShowTable() {
      return this.userLinks.length !== 0;
    },
    shouldShowSpinner() {
      return this.$store.getters.userLinks.length === 0 && this.retrievingUserLinks;
    },
  },
  components: {
    LinkTable,
    Spinner,
  },
};
</script>
