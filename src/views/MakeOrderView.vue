<script setup>

import GetOrder from "@/components/ui/form/GetOrder.vue";
</script>

<template>
  <div class="container">
    <h1>Оформление заказа</h1>
  </div>
  <section class="makeOrderForm">
    <div class="container">
      <GetOrder/>
    </div>
  </section>
</template>

<style scoped>
.makeOrderForm{background: #1a1a1a;padding-top: 60px;padding-bottom:60px}
::v-deep(form){max-width: 1000px;margin: 0 auto;background: #FFFF;border-radius: 30px;padding: 30px;filter: drop-shadow(2px 4px 6px #696969)}
</style>