<template>
<div class="grid grid-cols-6 w-full text-xs">
  <div class="col-span-2 account-text">
    {{movement.postDate.slice(0, 10)}}
  </div>
  <div class="col-span-2 account-text">
    {{movement.description}}
  </div>
  <div class="col-span-2 account-text">
    $ {{movement.amount}}
  </div>
</div>
</template>

<script>
export default {
  props: {
    movement: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.account-text {
  @apply text-center;
  @apply self-center;
}

</style>
