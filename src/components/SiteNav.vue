<script setup>
import { generateMenuItems } from '@/router';
const props = defineProps({
  group: {type: String, default: "main", required: false}
});

const menuItems = generateMenuItems(props.group);

</script>

<template>
  <nav>
    <router-link v-for="item in menuItems" :key="item.name" :to="item.path">
      {{ item.title }}
    </router-link>
  </nav>
</template>

<style scoped>
nav {display: flex;gap: 10px;}
</style>