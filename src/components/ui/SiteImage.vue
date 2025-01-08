<script setup>
import {defineProps, ref, watch} from 'vue';
const props = defineProps({
  src: {type: String, required: true},
  alt: {type: String, required: false},
  source: {type: Array, required: false},
  loading: {type: String, required: false, default: 'lazy'},
});

let errorLoad = false;
const currentSrc = ref(props.src);
const handleError = () => {
  errorLoad = true;
  currentSrc.value = "/errorImage.svg";
};
watch(() => props.src, (newValue) => {currentSrc.value = newValue;});
</script>

<template>
  <picture :class="{error: errorLoad}">
    <template v-if="source && Array.isArray(source) && source.length > 0" v-for="item in source">
      <source :media="item.media" :srcset="item.src">
    </template>
    <img
        :src="currentSrc"
        :alt="alt"
        :loading="loading"
        @error="handleError"
    />
  </picture>
</template>

<style scoped>
picture{display: flex;overflow: hidden}
picture img{width: 100%;object-fit: cover;transition: .2s linear}
.picture.error {background: #808080;}
.picture.error img {object-fit: contain;}
</style>