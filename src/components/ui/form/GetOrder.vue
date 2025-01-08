<script setup>
import { ref } from "vue";
import { useForm, useField, defineRule } from "vee-validate";
import { required, email } from "@vee-validate/rules";

import SiteInput from "@/components/ui/input/SiteInput.vue";
import SelectAddress from "@/components/ui/input/SelectAddress.vue";
import PayCard from "@/components/ui/input/PayCard.vue";
import SiteCheckbox from "@/components/ui/input/SiteCheckbox.vue";

defineRule("fioRule", (value) => /^\S+\s+\S+\s+\S+$/.test(value) || "ФИО должно состоять из трех слов");
defineRule("phoneRule", (value) => /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(value) || "Некорректный номер телефона");
defineRule("cardNumberRule", (value) => /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value) || "Номер карты должен быть в формате XXXX-XXXX-XXXX-XXXX");
defineRule("cardOwnerRule", (value) => /^[A-Za-z]+\s[A-Za-z]+$/.test(value) || "Имя владельца должно быть на латинице и состоять из двух слов");
defineRule("cvcRule", (value) => /^\d{3}$/.test(value) || "CVC должен состоять из 3 цифр");
defineRule("cardDateRule", (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) || "Дата должна быть в формате MM/YY");

const initialValues = {
  fio: "",
  phone: "",
  email: "",
  address: "",
  payNumber: "",
  payOwner: "",
  payCvc: "",
  payDate: "",
  agree: false,
};

const orderAccept = ref(false);
const { handleSubmit, validate } = useForm({ initialValues });

const { value: fio, errorMessage: fioError } = useField("fio", "fioRule");
const { value: phone, errorMessage: phoneError } = useField("phone", "phoneRule");
const { value: emailField, errorMessage: emailError } = useField("email", email);
const { value: address, errorMessage: addressError } = useField("address", required);
const { value: agree, errorMessage: agreeError } = useField("agree", required);
const { value: payNumber, errorMessage: payNumberError } = useField("payNumber", "cardNumberRule");
const { value: payOwner, errorMessage: payOwnerError } = useField("payOwner", "cardOwnerRule");
const { value: payCvc, errorMessage: payCvcError } = useField("payCvc", "cvcRule");
const { value: payDate, errorMessage: payDateError } = useField("payDate", "cardDateRule");

const checkErrors = async () => {
  const { errors, valid } = await validate();
  if (!valid) {
    console.log("Ошибки в форме:", errors);
    alert("Пожалуйста, исправьте ошибки в форме.");
  }
};

const onSubmit = async (values) => {
  console.log("submit", values);
  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      orderAccept.value = true;
    } else {
      console.error(data);
    }
  } catch (error) {
    console.error(error);
    alert("Ошибка при отправке заказа!");
  }
};
</script>

<template>
  <form
      @submit.prevent="async () => {
      await checkErrors();
      handleSubmit(onSubmit)();
    }"
  >
    <template v-if="!orderAccept">
      <h3>Данные покупателя</h3>
      <SiteInput
          name="fio"
          placeholder="ФИО"
          v-model:value="fio"
          :message="{ message: fioError, class: 'error' }"
      />
      <SiteInput
          :mask="{ mask: '+{7} (000) 000-00-00' }"
          placeholder="+7 (___) ___-__-__"
          v-model:value="phone"
          :message="{ message: phoneError, class: 'error' }"
      />
      <SiteInput
          name="email"
          :mask="{ mask: /^\S*@?\S*$/ }"
          placeholder="example@mail.com"
          v-model:value="emailField"
          :message="{ message: emailError, class: 'error' }"
      />
      <SelectAddress
          placeholder="Адрес доставки"
          v-model:value="address"
          :message="{ message: addressError, class: 'error' }"
      />
      <h3>Реквизиты оплаты</h3>
      <PayCard
          v-model:number="payNumber"
          v-model:owner="payOwner"
          v-model:cvc="payCvc"
          v-model:date="payDate"
          :payNumberError="{ message: payNumberError, class: 'error' }"
          :payOwnerError="{ message: payOwnerError, class: 'error' }"
          :payCvcError="{ message: payCvcError, class: 'error' }"
          :payDateError="{ message: payDateError, class: 'error' }"
      />
      <SiteCheckbox
          name="agree"
          v-model:value="agree"
          :message="{ message: agreeError, class: 'error' }"
      >
        Я согласен с условиями доставки, оплаты и <router-link to="/privacy/">политикой
        персональных данных</router-link>
      </SiteCheckbox>
      <button type="submit">Оформить заказ</button>
    </template>

    <template v-else>
      <article>
        <h2>Благодарим вас за оформление заказа в нашем магазине!</h2>
        <p>
          Мы рады, что Вы выбрали нас, и уверены, что Вы останетесь довольны своей покупкой.
        </p>
        <p>
          Мы всегда стремимся предложить нашим клиентам только лучшее, поэтому приглашаем Вас
          ознакомиться с нашим широким ассортиментом продукции. Возможно, Вы найдете что-то еще,
          что Вас заинтересует.
        </p>
        <p>
          Если у Вас возникнут вопросы или потребуется помощь, пожалуйста, не стесняйтесь
          обращаться к нам. Мы всегда готовы Вам помочь!
        </p>
        <p>
          С уважением, <strong>Гаврилов Е.В.</strong>
        </p>
      </article>
    </template>
  </form>
</template>

<style scoped>
form {display: flex;flex-direction: column;gap: 20px;}
</style>
