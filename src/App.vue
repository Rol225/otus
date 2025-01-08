<script setup>
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";
</script>

<template>
  <SiteHeader/>
  <div class="mainView">
    <router-view/>
  </div>
  <SiteFooter/>
</template>

<style scoped>

</style>
