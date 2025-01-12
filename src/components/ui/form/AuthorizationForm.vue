<script setup>
import {useField, useForm} from "vee-validate";
import { required } from "@vee-validate/rules";
import {useRouter} from "vue-router";

import SiteInput from "@/components/ui/input/SiteInput.vue";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import SiteSpinner from "@/components/ui/SiteSpinner.vue";

const store = useStore();
const router = useRouter();

const initialValues = {
  login: "",
  password: "",
};

const { handleSubmit, validate } = useForm({ initialValues });
const { value: login, errorMessage: loginError } = useField("login", required);
const { value: password, errorMessage: passwordError } = useField("password", required);
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const isLoading = ref(false);
const isError = ref(false);

const checkErrors = async () => {
  const { errors, valid } = await validate();
  if (!valid) {
    console.log("Ошибки в форме:", errors);
    alert("Пожалуйста, исправьте ошибки в форме.");
  }
};

const onSubmit = async (values) => {
  isLoading.value = true;
  await store.dispatch("login",{
    username: login.value,
    password: password.value
  });
  isLoading.value = false;
  if(isAuthenticated.value)
    await router.push('/');
};
</script>

<template>
  <template v-if="isLoading">
    <SiteSpinner/>
  </template>
  <template v-else>
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
</template>

<style scoped>
form{display: flex;flex-direction: column;gap: 10px;background: #FFFF;padding: 20px;filter: drop-shadow(2px 4px 6px black)}
</style>