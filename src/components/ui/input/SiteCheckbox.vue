<script setup>
const props = defineProps({
  value: {type: String, default: "text", required: true},
  checked: {type: Boolean, default: false, required: false},
  name: {type: String, default: "text", required: true},
  type: {type: String, default: "checkbox"},
});
</script>

<template>
  <label>
    <input type="checkbox" :name="props.name" :value="value" :checked="checked" hidden="hidden">
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
  </label>
</template>

<style scoped>
label{display: block;cursor:pointer;}
.wrapper{display: flex;align-items: center;gap: 10px}
i{width: 20px;height: 20px;display: flex;align-items: center;justify-content: center;padding: 3px;border: 1px solid #1a1a1a;transition: .2s linear}
input:checked + .wrapper i {background: #1a1a1a;}
</style>