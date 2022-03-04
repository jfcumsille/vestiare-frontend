<script setup lang="ts">
import { useRoute } from 'vue-router';

interface Link {
  text: string
  path: string
}

const $props = defineProps<{ brand: Link, links: Link[] }>();

const route = useRoute();

const selectionClasses = (link: Link) => {
  if (route.path === link.path) {
    return 'text-blue-700';
  }
  return 'text-gray-700 hover:text-blue-700';
};
</script>

<template>
  <nav class="bg-white border-gray-200 px-2 py-2.5 rounded">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link
        :to="$props.brand.path"
        class="flex items-center"
      >
        <span class="self-center text-xl font-semibold whitespace-nowrap">
          {{ $props.brand.text }}
        </span>
      </router-link>
      <div class="block w-auto">
        <ul class="flex mt-4 flex-row space-x-8 text-sm font-medium">
          <li
            v-for="link in $props.links"
            :key="link.path"
          >
            <router-link
              :to="link.path"
              :class="`block p-0 ${selectionClasses(link)}`"
            >
              {{ link.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
