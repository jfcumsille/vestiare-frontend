<template>
<div class="bg-gray-200">
  <header class="bg-white">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-medium leading-tight text-gray-900">
        Credenciales activas
      </h1>
    </div>
  </header>
  <main class="h-screen">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex flex-col">
          <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="align-middle inline-block min-w-full overflow-hidden
                        sm:rounded-md border-gray-200">
              <link-table></link-table>
            </div>
            <div class="mt-4 text-right">
              <router-link to="/links/new"
                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-200
                        text-gray-900 hover:bg-gray-300">
                <font-awesome-icon icon="plus" class="mt-1 mr-1"/> Agregar credenciales
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import LinkTable from '../components/links/link-table.vue';

export default {
  created() {
    this.$store.dispatch('getUserLinks');
  },
  components: {
    LinkTable,
  },
};
</script>
