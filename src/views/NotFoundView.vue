<script setup>

</script>

<template>
  <div class="notFound">
    <div class="container">
      <h1>404</h1>
      <p>Страница не найдена!</p>
      <router-link to="/">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<style scoped>
.notFound {display: flex;flex-direction: column;flex: 1 1 auto;align-items: center;justify-content: center;text-align: center;margin-top: 50px;}
</style>