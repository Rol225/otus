<script setup>
import GetOrder from "@/components/ui/form/GetOrder.vue";
import {useBasket} from "@/hooks/useBasket.js";
import ProductCard from "@/components/product/ProductCard.vue";

const {products, totalPrice, addToBasket, removeFromBasket, clearBasket} = useBasket();
</script>

<template>
  <div class="container">
    <h1>Оформление заказа</h1>
  </div>
  <section>
    <div class="container">
      <div class="items">
        <ProductCard
            v-for="item in products" :key="item.id"
            :id="String(item.id)"
            :title="item.title" :image="item.image"
            :price="String(item.price)" :rating="String(item.rating)" :countRate="String(item.countRate)"
            :count="String(item.count)"
        />
      </div>
    </div>
  </section>
  <section class="makeOrderForm">
    <div class="container">
      <GetOrder/>
    </div>
  </section>
</template>

<style scoped>
.makeOrderForm{background: #1a1a1a;padding-top: 60px;padding-bottom:60px}
::v-deep(form){max-width: 1000px;margin: 0 auto;background: #FFFF;border-radius: 30px;padding: 30px;filter: drop-shadow(2px 4px 6px #696969)}

.items, .result{padding: 20px 0;}
::v-deep(.card){flex-direction: row;padding: 10px;border-radius: 0;gap: 10px}
::v-deep(.card picture){height: 80px;width: 80px;flex: 0 0 80px;aspect-ratio: 1}
::v-deep(.card .content){margin: 0}
::v-deep(.card h4){margin: 0}
</style>