<script setup>
import SiteInput from "@/components/ui/input/SiteInput.vue";
import {ref, watch} from "vue";
const props = defineProps({
  value: {type: String},
});
const localValue = ref(props.value);
const emit = defineEmits(['update:value', 'customSubmit']);
watch(localValue, ()=> emit('update:value', localValue.value));
watch(() => props.value, (newValue) => {localValue.value = newValue;});
const customSubmit = () => emit("customSubmit", localValue.value);
</script>

<template>
  <SiteInput class="searchInput" placeholder="Поиск" v-model:value="localValue" @customSubmit="customSubmit" :isShowButton="true">
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </SiteInput>
</template>

<style scoped>

</style>