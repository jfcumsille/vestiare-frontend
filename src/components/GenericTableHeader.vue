<script setup lang="ts">
const props = defineProps<{
  headers: string[]
}>();
</script>

<template>
  <thead class="bg-gray-100">
    <tr>
      <th
        v-for="header in props.headers"
        :key="header"
        scope="col"
        class="
          py-3 px-4 text-xs font-medium tracking-wider
          text-left text-gray-700 uppercase min-w-max whitespace-nowrap
        "
      >
        {{ header }}
      </th>
    </tr>
  </thead>
</template>
