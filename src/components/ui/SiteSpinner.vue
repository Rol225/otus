<script setup>

</script>

<template>
  <div class="loaderContainer">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.loaderContainer {
  backdrop-filter: brightness(0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 150px 0
}
.noOffset{margin:0;padding: 0}
.absolute{position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
.loader {
  width: 48px;
  height: 48px;
  border: 3px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid;
  border-color: #007BFF transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>