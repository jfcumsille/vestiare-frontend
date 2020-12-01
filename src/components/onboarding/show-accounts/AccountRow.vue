<template>
<div class="grid grid-cols-6 w-full text-xs">
  <div class="col-span-2 account-text">
    {{account.officialName}}
  </div>
  <div class="col-span-2 account-text">
    {{account.number}}
  </div>
  <div class="col-span-2 account-text">
    $ {{account.balance.available}}
  </div>
</div>
</template>

<script>
export default {
  props: {
    account: {
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
