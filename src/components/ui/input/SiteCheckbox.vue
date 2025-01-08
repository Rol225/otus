<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  value: {type: Boolean, required: true},
  name: {type: String, default: "text", required: true},
  type: {type: String, default: "checkbox"},
  message: {type: Object, default: null}
});
const localValue = ref(props.value);
const emit = defineEmits(["update:value", "customSubmit"]);
watch(() => props.value, (newValue) => {localValue.value = newValue;});
watch(localValue, () => emit("update:value", localValue.value));
</script>

<template>
  <label>
    <input type="checkbox" :name="props.name" v-model="localValue"  hidden="hidden">
    <span class="wrapper">
      <i>
        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="14.5972" height="4.57153" rx="1" transform="matrix(0.685646 0.727936 -0.685646 0.727936 3.13428 0.046875)" fill="white"/>
          <rect width="11.7603" height="4.57153" rx="1" transform="matrix(-0.685646 0.727936 0.685646 0.727936 14.9204 2.06445)" fill="white"/>
        </svg>
      </i>
      <span class="content">
        <slot></slot>
      </span>
    </span>
    <span class="message" :class="message.class" v-if="message">{{message.message}}</span>
  </label>
</template>

<style scoped>
label{display: block;cursor:pointer;}
.wrapper{display: flex;align-items: center;gap: 10px}
i{width: 20px;height: 20px;display: flex;align-items: center;justify-content: center;padding: 3px;border: 1px solid #1a1a1a;transition: .2s linear}
input:checked + .wrapper i {background: #1a1a1a;}
.message.error {color: red;font-size: 0.9em;}
</style>