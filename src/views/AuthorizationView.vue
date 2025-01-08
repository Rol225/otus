<script setup>
import AuthorizationForm from "@/components/ui/form/AuthorizationForm.vue";
</script>

<template>
  <section>
    <AuthorizationForm/>
  </section>
</template>

<style scoped>
section{display: flex;justify-content: center;align-items: center;width: 100%;height: 100vh;}
section:after{display: block;content: "";position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: -1;background: conic-gradient(from 180deg at 90%  5%, rgba(86,155,255,0.94) 0%, rgba(44,145,233,0.57) 50%, rgb(82,180,228) 100%) 70% 50%/150% 195%, conic-gradient(from 20deg at 20%  40%, rgb(57,94,224) 0%, rgb(1,90,216) 40%, rgb(55,134,242) 40%, rgb(121,99,235) 40%, rgb(21,213,228) 100%) 45% 15%/125% 145%;}
</style>