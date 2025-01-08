<script setup>
import SiteInput from "@/components/ui/input/SiteInput.vue";
import {ref, watch} from "vue";

const props = defineProps({
  from: {required: true},
  to: {required: true}
});
const localValueFrom = ref(props.from);
const localValueTo = ref(props.to);
const emit = defineEmits(['update:from', 'update:to']);

watch(localValueFrom, (newValue)=> {
  if (newValue >= localValueTo.value && localValueTo.value > 0) {
    localValueTo.value = newValue + 1;
    emit('update:to', localValueTo.value);
  }
  emit('update:from', localValueFrom.value)
});
watch(localValueTo, (newValue)=> {
  if (newValue <= localValueFrom.value && localValueFrom.value > 0 && newValue - 1 >= 0) {
    localValueFrom.value = newValue - 1;
    emit('update:from', localValueFrom.value);
  }
  emit('update:to', localValueTo.value);
});
watch(() => props.from, (newValue) => {localValueFrom.value = newValue;});
watch(() => props.to, (newValue) => {localValueTo.value = newValue;});


const customChange = () => emit("customChange", {from:localValueFrom.value, to:localValueTo.value});
</script>

<template>
  <div>
    <SiteInput inputType="number" placeholder="От" @customChange="customChange" v-model:value="localValueFrom"/>
    <span>-</span>
    <SiteInput inputType="number" placeholder="До" @customChange="customChange" v-model:value="localValueTo"/>
  </div>
</template>

<style scoped>
  div{display: flex;align-items: center;gap: 10px}
</style>