<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  value: {},
  inputType: {type: String, default: "text"},
  placeholder: {type: String},
  isShowButton: {type: Boolean, default: false},
});
const localValue = ref(props.value);
const emit = defineEmits(['update:value']);
watch(() => props.value, (newValue) => {localValue.value = newValue;});
watch(localValue, ()=> emit('update:value', localValue.value));
const customSubmit = () => emit("customSubmit", localValue.value);

</script>

<template>
  <label>
    <input
        :type="inputType"
        :placeholder="placeholder"
        v-model="localValue"
    />
    <button type="button" @click="customSubmit" v-if="isShowButton">
      <slot></slot>
    </button>
  </label>
</template>

<style scoped>
label {display: flex;}
input {border: 1px solid #cacaca;background: transparent;flex: 1 1 auto;padding: 0.6em 1.2em}
button{display: flex;justify-content: center;align-items: center;border-radius: 0}
</style>
