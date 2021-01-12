<template>
<div class="grid grid-cols-6 w-full text-xs">
  <div class="col-span-2 account-text">
    {{ account.officialName }}
  </div>
  <div class="col-span-2 account-text">
    {{ account.number }}
  </div>
  <div class="col-span-2 account-text">
    {{ amount }}
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
  computed: {
    amount() {
      return new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(Math.abs(this.account.balance.available));
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
