<script setup>
import SearchInput from "@/components/ui/input/SearchInput.vue";
import DoubleInput from "@/components/ui/input/DoubleInput.vue";
import {ref} from "vue";

const props = defineProps({
  isShowShort: {type: Boolean, default: true}
});

const localIsShowShort = ref(props.isShowShort);
const title = ref("");
const priceFrom = ref("");
const priceTo = ref("");

const emit = defineEmits(["customSubmit", "customClear"]);
const customSubmit = () => {
  emit("customSubmit", {price: {from: priceFrom.value, to: priceTo.value}, title: title.value});
}
const clearForm = () => {
  title.value = "";
  priceFrom.value = "";
  priceTo.value = "";
  emit("customClear");
}
const changeVue = () => localIsShowShort.value = !localIsShowShort.value;

</script>

<template>
  <form @submit.prevent="customSubmit">
    <div class="searchTools">
      <button type="button" @click="changeVue" :class="{active: !localIsShowShort}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z" fill="#FFFF"/>
        </svg>
      </button>
      <SearchInput v-model:value="title" @customSubmit="customSubmit"/>
      <button type="button" @click="clearForm">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6L18 18M18 6L6 18" stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div v-show="!localIsShowShort">
      <span>Цена:</span>
      <DoubleInput v-model:from="priceFrom" v-model:to="priceTo"/>
    </div>
  </form>
</template>

<style scoped>
form{display: flex;flex-wrap: wrap;gap: 20px}
::v-deep(.searchInput){flex: 1 1 auto}
.actions > button{flex: 1 1 auto}
.searchTools{display: flex;flex: 1 1 100%}
.searchTools button{border-radius: 0}
</style>