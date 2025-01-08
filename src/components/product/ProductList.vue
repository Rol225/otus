<script setup>
import { ref } from "vue";
import ProductCard from "@/components/product/ProductCard.vue";
import SiteSpinner from "@/components/ui/SiteSpinner.vue";
import {useProduct} from "@/hooks/useProduct.js";

const isEmpty = ref(false);
const { products, isLoading, isError, fetchProducts } = useProduct();
fetchProducts();
</script>

<template>
  <div class="container">
    <template v-if="isLoading">
      <SiteSpinner/>
    </template>
    <template v-else-if="isError">
      <h2>Произошла ошибка при загрузке товаров</h2>
    </template>
    <template v-else-if="isEmpty">
      <h2>Список товаров пуст</h2>
    </template>
    <template v-else>
      <div class="list">
        <ProductCard
            v-for="item in products" :key="item.id"
            :id="String(item.id)"
            :title="item.title" :image="item.image" :description="item.description" :category="item.category"
            :price="String(item.price)" :rating="String(item.rating.rate)" :count="String(item.rating.count)"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
  .list{display: grid;grid-template-columns: repeat(4, 1fr);gap: 20px}
  @media(max-width: 1300px){
    .list{grid-template-columns: repeat(3,1fr)}
  }
  @media(max-width: 1000px){
    .list{grid-template-columns: repeat(2,1fr)}
  }
  @media(max-width: 700px){
    .list{grid-template-columns: repeat(1,1fr)}
  }
</style>