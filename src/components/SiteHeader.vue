<script setup>
import ProductHeaderSearch from "@/components/product/ProductHeaderSearch.vue";
import SiteNav from "@/components/SiteNav.vue";
import UserPopup from "@/components/UserPopup.vue";
</script>

<template>
<header>
  <div class="container">
    <SiteNav/>
    <ProductHeaderSearch/>
    <UserPopup/>
  </div>
</header>
</template>

<style scoped>
header {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  padding: 1.2em 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  background: #fffffff7;
  backdrop-filter: blur(1px);
}
.container{display: flex;justify-content: space-between}
::v-deep(nav){align-items: center;}
</style>