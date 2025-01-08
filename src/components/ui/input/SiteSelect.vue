<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  value: {},
  options: {type: Array, required: true},
  label: {type: String, required: false}
});
const localValue = ref(props.value);
const emit = defineEmits(['update:value']);
watch(() => props.value, (newValue) => {localValue.value = newValue;});
watch(localValue, ()=> emit('update:value', localValue.value));

const isShow = ref("");
const showClose = () => isShow.value = !isShow.value;
const selectOption = (option) => {
  localValue.value = option.value;
};
window.addEventListener("click", event => isShow.value = false)
</script>

<template>
  <div class="select" :class="{active: isShow}">
    <select v-model="localValue" hidden="hidden">
      <option v-for="option in props.options" :value="option.value" :key="option.value">{{ option.text }}</option>
    </select>
    <span class="inner" @click.stop.prevent="showClose">
      <span class="label" v-if="props.label">{{ props.label }}</span>
      <span class="content">{{ props.options.find(el => el.value === localValue).text }}</span>
      <i>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"/>
        </svg>
      </i>
    </span>
    <div class="dropDawn" v-show="isShow">
      <div class="option" v-for="option in props.options" @click="selectOption(option)" :class="{active: localValue === option.value}">
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.select{position: relative;z-index: 1}
.inner{display: flex;align-items: center;justify-content: space-between;gap: 10px;border: 1px solid #cacaca;background: transparent;padding: 0.6em 1.2em;cursor: pointer}
.label{position: absolute;top: -.9em;left: .5em;background: #FFF;font-size: .8em;color: #6666fd;pointer-events: none}
i{display: flex;transition: .2s linear}
.select.active .inner i{transform: rotate(180deg)}
.dropDawn{z-index: 2;position: absolute;top: 100%;left: 0;width: 100%;max-height: 150px;background: #FFFF;box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);border: 1px solid #cacaca;overflow: hidden;overflow-y: auto}
.option{padding: 0.6em 1.2em;cursor: pointer;transition: .2s linear}
.option:not(:last-child){border-bottom: 1px solid #cacaca;}
.option.active{background: #1a1a1a;color: #FFFF}
@media (hover: hover) {
  .option:hover{background: #1a1a1a;color: #FFFF}
}
</style>