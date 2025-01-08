<script setup>
import {useField, useForm} from "vee-validate";
import { required } from "@vee-validate/rules";
import {useRouter} from "vue-router";

import SiteInput from "@/components/ui/input/SiteInput.vue";

const router = useRouter();

const initialValues = {
  login: "",
  password: "",
};

const { handleSubmit, validate } = useForm({ initialValues });
const { value: login, errorMessage: loginError } = useField("login", required);
const { value: password, errorMessage: passwordError } = useField("password", required);
const checkErrors = async () => {
  const { errors, valid } = await validate();
  if (!valid) {
    console.log("Ошибки в форме:", errors);
    alert("Пожалуйста, исправьте ошибки в форме.");
  }
};

const onSubmit = async (values) => {
  localStorage.setItem('auth', 'true');
  await router.push('/');
};
</script>

<template>
  <form
      @submit.prevent="async () => {
      await checkErrors();
      handleSubmit(onSubmit)();
    }"
  >
    <strong>Авторизация<br></strong>
    <SiteInput name="login" placeholder="Логин"
               v-model:value="login"
               :message="{ message: loginError, class: 'error' }"/>
    <SiteInput name="password" placeholder="Пароль" inputType="password"
               v-model:value="password"
               :message="{ message: passwordError, class: 'error' }"/>
    <button type="submit">Войти</button>
  </form>
</template>

<style scoped>
form{display: flex;flex-direction: column;gap: 10px;background: #FFFF;padding: 20px;filter: drop-shadow(2px 4px 6px black)}
</style>