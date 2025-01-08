<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import IMask from "imask";

const props = defineProps({
  value: {type: String, default: "",},
  inputType: {type: String, default: "text",},
  placeholder: {type: String, default: "",},
  isShowButton: {type: Boolean, default: false,},
  mask: {type: [Object, null], default: null,},
  message: {type: Object, default: null}
});

const emit = defineEmits(["update:value", "customSubmit"]);
const inputElement = ref(null);
let maskInstance = null;
const initMask = () => {
  if (inputElement.value) {
    if (maskInstance) maskInstance.destroy();
    maskInstance = IMask(inputElement.value, props.mask || {mask: /.*/});
    maskInstance.value = props.value || "";
    maskInstance.on("accept", () => {
      emit("update:value", maskInstance.value);
    });
  }
};
onBeforeUnmount(() => {
  if (maskInstance) {
    maskInstance.destroy();
    maskInstance = null;
  }
});
onMounted(initMask);
watch(
    () => props.value,
    (newValue) => {
      if (maskInstance && maskInstance.value !== newValue) {
        maskInstance.value = newValue || "";
      }
    }
);
watch(() => props.mask, () => initMask());
const customSubmit = () => {emit("customSubmit", maskInstance?.value || "");};
</script>

<template>
  <label>
    <span class="content">
      <input
          :type="inputType"
          :placeholder="placeholder"
          ref="inputElement"
      />
      <button type="button" @click="customSubmit" v-if="isShowButton">
        <slot></slot>
      </button>
    </span>
    <span class="message" :class="message.class" v-if="message">{{message.message}}</span>
  </label>
</template>

<style scoped>
label, .content{display: flex;}
label {flex-direction: column;}
.content{height: 100%}
input {border: 1px solid #cacaca;background: transparent;flex: 1 1 auto;padding: 0.6em 1.2em;}
button {display: flex;justify-content: center;align-items: center;border-radius: 0;}
.message.error {color: red;font-size: 0.9em;}
</style>
