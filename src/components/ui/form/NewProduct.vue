<script setup>
import { useForm, useField } from "vee-validate";
import { required, url } from "@vee-validate/rules";
import { defineRule } from "vee-validate";

import SiteInput from "@/components/ui/input/SiteInput.vue";
import ProductCard from "@/components/product/ProductCard.vue";
import ImageInput from "@/components/ui/input/ImageInput.vue";
import {ref, watch} from "vue";

defineRule("minPrice", (value) => Number(value) > 0.01 || "дожно быть больше 0.01");
defineRule("minLength", (value) => value.length > 3 || "Слишком короткое");
defineRule("validUrl", url);

const files = ref([]);

const initialValues = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
};

const { handleSubmit, resetForm, validate } = useForm({ initialValues });

const { value: title, errorMessage: titleError } = useField("title", "minLength");
const { value: price, errorMessage: priceError } = useField("price", "minPrice");
const { value: description, errorMessage: descriptionError } = useField("description", "minLength");
const { value: category, errorMessage: categoryError } = useField("category", required);
const { value: image, errorMessage: imageError } = useField("image", "validUrl");

watch(files, () => image.value = files.value[0] || "");

const changeFileInput = (val) => {
  image.value = val[0]?.preview || "";
}
const checkErrors = async () => {
  const { errors, valid } = await validate();
  if (!valid) {
    console.log("Ошибки в форме:", errors);
    alert("Пожалуйста, исправьте ошибки в форме.");
  }
};

const onSubmit = async (values) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Продукт успешно создан! ID: ${data.id}`);
      resetForm();
    } else {
      console.error("Ошибка:", await response.json());
      alert("Не удалось создать продукт!");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Ошибка при подключении к серверу!");
  }
};
</script>

<template>
  <div class="product__wrapper">
    <form
        @submit.prevent="async () => {
      await checkErrors();
      handleSubmit(onSubmit)();
    }"
    >
      <h2>Конструктор</h2>
      <SiteInput name="name" placeholder="Имя товара"
                 v-model:value="title"
                 :message="{ message: titleError, class: 'error' }"/>
      <SiteInput name="category" placeholder="Категория"
                 v-model:value="category"
                 :message="{ message: categoryError, class: 'error' }"/>
      <SiteInput name="description" placeholder="Описание товара"
                 v-model:value="description"
                 :message="{ message: descriptionError, class: 'error' }"/>
      <SiteInput name="price" placeholder="Цена товара"
                 v-model:value="price"
                 :message="{ message: priceError, class: 'error' }"/>
      <ImageInput
          name="image" placeholder="Добавить изображение"
          v-model:files="files"
          @changeFileInput="changeFileInput"
          :message="{ message: imageError, class: 'error' }"/>
      <button type="submit">Добавить товар</button>
    </form>
    <div class="product">
      <h2>Превью</h2>
      <ProductCard
          id="0" :title="title" :image="image" :description="description"
          :price="price" rating="0" count="0" :category="category"
      />
    </div>
  </div>

</template>

<style scoped>
.product__wrapper{display: flex;justify-content: space-between;gap: 20px}
form {display: flex;flex-direction: column;gap: 20px;flex: 1 1 auto}
.product{flex: 0 0 375px}
</style>