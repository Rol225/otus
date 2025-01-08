<script setup>
import SiteInput from "@/components/ui/input/SiteInput.vue";
import {ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  value: {},
  placeholder: { type: String, default:"Введите адрес" },
  message: {type: Object, default: null}
});

const query = ref(props.value);
const emit = defineEmits(["update:value", "customSubmit"]);
watch(() => props.value, (newValue) => {query.value = newValue;});
watch(query, () => emit("update:value", query.value));

const suggestions = ref([]);
const selectedAddress = ref(null);
const apiKey = import.meta.env.VITE_DADATA_API_KEY;

watch(query, ()=> {
  fetchSuggestions();
});

const fetchSuggestions = async () => {
  if (query.value.length < 3) {
    suggestions.value = [];
    return;
  }
  try {
    const response = await axios.post(
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
        {query: query.value},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${apiKey}`,
          },
        }
    );
    suggestions.value = response.data.suggestions;
  } catch (error) {
    console.error("Ошибка при запросе DaData:", error);
  }
}

const selectSuggestion = (suggestion) => {
  selectedAddress.value = suggestion;
  suggestions.value = [];
  query.value = suggestion.value;
}
</script>

<template>
  <div class="selectAddress">
    <SiteInput v-model:value="query" :placeholder="placeholder" :message="message"/>
    <div class="dropDawn" v-if="suggestions.length">
      <div class="option" v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
        {{ suggestion.value }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.selectAddress{position: relative;z-index: 1}
.dropDawn{z-index: 2;position: absolute;top: 100%;left: 0;width: 100%;max-height: 150px;background: #FFFF;box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);border: 1px solid #cacaca;overflow: hidden;overflow-y: auto}
.option{padding: 0.6em 1.2em;cursor: pointer;transition: .2s linear;font-size: 14px}
.option:not(:last-child){border-bottom: 1px solid #cacaca;}
@media (hover: hover) {
  .option:hover{background: #1a1a1a;color: #FFFF}
}
</style>