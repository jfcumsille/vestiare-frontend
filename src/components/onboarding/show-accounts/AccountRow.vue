<template>
<div class="grid grid-cols-6 w-full text-xs">
  <div class="col-span-2 account-text font-300 text-center">
    {{ account.officialName }}
  </div>
  <div class="col-span-2 account-text font-300 text-right mr-1">
    #{{ account.number }}
  </div>
  <div class="col-span-2 account-text font-500 text-right">
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
  font-size: 16px;
  color: #4A4672;
  padding: 6px 10px;
}

</style>
