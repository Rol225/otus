<script setup>
import SiteNav from "@/components/SiteNav.vue";
</script>

<template>
  <footer>
    <div class="container">
      <SiteNav/>
      <SiteNav group="politics"/>
    </div>
  </footer>

</template>

<style scoped>
footer {padding: 30px 0;margin-top: 60px;background: #1a1a1a;}
</style>