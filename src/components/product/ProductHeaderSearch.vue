<script setup>
import { ref } from "vue";
import SiteSpinner from "@/components/ui/SiteSpinner.vue";
import ProductCard from "@/components/product/ProductCard.vue";
import SearchForm from "@/components/ui/form/SearchForm.vue";

const product = ref([]);
const isLoading = ref(false);
const isError = ref(false);
const isEmpty = ref(false);

const fetchProducts = async ({title, price}) => {
  isError.value = false;
  if(title || price) {
    isLoading.value = true;
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
      const data = await response.json();
      product.value = data?.filter(el => {
        if(title && el.title.toLowerCase().includes(title.toLowerCase())) return el;
        if(
            price &&
            (price.from === undefined || el.price >= price.from) &&
            (price.to === undefined || el.price <= price.to)
        ) return el;
      }) || [];
      isEmpty.value = product.value.length === 0;
    } catch (error) {
      console.error(error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  } else {
    product.value = [];
  }
};

const customClear = () => product.value = [];
</script>

<template>
  <SearchForm @customSubmit="fetchProducts" @customClear="customClear" :isShowShort="true"/>
  <SiteSpinner v-if="isLoading" class="noOffset absolute"/>
  <div class="searchResult" v-if="product.length > 0">
    <div class="container">
      <template v-if="isError">
        <h2>Произошла ошибка при загрузке товаров</h2>
      </template>
      <template v-else-if="isEmpty">
        <h2>Список товаров пуст</h2>
      </template>
      <template v-else>
        <div class="list">
          <ProductCard
              v-for="item in product" :key="item.id"
              :id="String(item.id)"
              :title="item.title" :image="item.image"
              :price="String(item.price)" :rating="String(item.rating.rate)" :count="String(item.rating.count)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.searchResult{position: absolute;left: 0;top: 100%;width: 100%;}
.list{background: #FFFF;display: grid;grid-template-columns: repeat(4,1fr);overflow: hidden;overflow-y: auto;max-height: 80vh;-webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);-moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);}
.list ::v-deep(.card){flex-direction: row;padding: 10px;border-radius: 0;gap: 10px}
.list ::v-deep(.card picture){height: 80px;width: 80px;flex: 0 0 80px;aspect-ratio: 1}
.list ::v-deep(.card .content){margin: 0}
.list ::v-deep(.card h4){margin: 0}
@media (max-width: 1400px) {
  .list{grid-template-columns: repeat(3,1fr);}
}
@media (max-width: 1100px) {
  .list{grid-template-columns: repeat(2,1fr);}
}
@media (max-width: 600px) {
  .list{grid-template-columns: repeat(1,1fr);}
}
</style>