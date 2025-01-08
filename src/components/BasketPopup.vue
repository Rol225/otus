<script setup>

import {ref} from "vue";
import {useBasket} from "@/hooks/useBasket.js";
import ProductCard from "@/components/product/ProductCard.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const isOpen = ref(false);
const {products, totalPrice, addToBasket, removeFromBasket, clearBasket} = useBasket();

const toggle = () => {
  isOpen.value = !isOpen.value;
}
const toOrder = () => {
  router.push("/order/make/");
}
</script>

<template>
<div class="basket">
  <div class="inner" @click="toggle">
    <i>
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4" stroke="#000" stroke-width="1.5"/>
        <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z" stroke="#000" stroke-width="1.5"/>
        <path d="M8 13V17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 13V17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 13V17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </i>
    <div>Корзина</div>
  </div>
  <div class="wrapper" :class="{active: isOpen}">
    <div class="wrapperTitle">
      <strong>Корзина</strong>
      <button type="button" @click="toggle">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6L18 18M18 6L6 18" stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="items">
      <ProductCard
          v-for="item in products" :key="item.id"
          :id="String(item.id)"
          :title="item.title" :image="item.image"
          :price="String(item.price)" :rating="String(item.rating)" :countRate="String(item.countRate)"
          :count="String(item.count)"
      />
    </div>
    <div class="result">
      <div>
        <strong>Итого: </strong>
        <span><span>{{ totalPrice }}</span> $</span>
      </div>
    </div>
    <div class="actions">
      <button type="button" @click="toggle">Продолжить покупки</button>
      <button type="button" v-if="products.length > 0" @click="clearBasket">Отчистить</button>
      <button type="button" @click="toOrder">К оформлению</button>
    </div>
  </div>
</div>
</template>

<style scoped>
.inner{display: flex;align-items: center;gap: 10px;justify-content: flex-start;cursor: pointer;flex: 1 1 auto}
i{display: flex}
.wrapper{padding:20px;display: flex;flex-direction: column;position: fixed;top: 0;right: 0;transform:translateX(100%);transition: .2s linear;max-width: 650px;width: 100%;background: #FFFF;height: 100vh;box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);border: 1px solid #eeeeee;overflow: hidden;overflow-y: auto}
.wrapper.active{transform: translateX(0)}
.wrapperTitle{display: flex;gap: 10px;align-items: center;justify-content: space-between}
.wrapperTitle strong{font-size: 1.5em}
.items, .result{padding: 20px 0;}
.items, .actions > *{flex: 1 1 auto}
.result{border-top: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee}
.actions{display: flex;gap: 10px}


::v-deep(.card){flex-direction: row;padding: 10px;border-radius: 0;gap: 10px}
::v-deep(.card picture){height: 80px;width: 80px;flex: 0 0 80px;aspect-ratio: 1}
::v-deep(.card .content){margin: 0}
::v-deep(.card h4){margin: 0}
</style>