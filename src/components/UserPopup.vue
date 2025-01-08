<script setup>
import {ref} from "vue";
import BasketPopup from "@/components/BasketPopup.vue";

const isOpen = ref(false);

const isAuthenticated = localStorage.getItem('auth') === 'true';

const toggle = () => {
  isOpen.value = !isOpen.value;
}

const logout = () => {
  localStorage.removeItem('auth');
  location.reload();
}
</script>

<template>
<div class="user">
  <div class="inner" @click="toggle">
    <i>
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </i>
    <div class="content" v-if="isAuthenticated">
      <div class="login">admin</div>
    </div>
  </div>
  <div class="tools" v-if="isOpen">
    <template v-if="isAuthenticated">
      <BasketPopup/>
      <a @click.prevent="logout">Выйти</a>
    </template>
    <template v-else>
      <router-link to="/authorization/">Войти</router-link>
    </template>
  </div>
</div>
</template>

<style scoped>
.user{position: relative;}
.inner{cursor: pointer;display: flex;gap: 10px;align-items: center}
.inner i{width: 40px;height: 40px;background: #000000;border-radius: 50%;overflow: hidden;display: flex;justify-content: center;align-items: center}
.tools{position: absolute;top: 100%;right: 0;width: 250px;box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);border: 1px solid #eeeeee;max-height: 80vh;overflow: hidden;overflow-y: auto}
.tools > *{display: flex;background: #ffffff;padding: 10px 15px;flex: 1 1 auto}
.tools > *:not(:last-child){border-bottom: 1px solid #cacaca;}
</style>