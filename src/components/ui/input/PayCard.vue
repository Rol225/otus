<script setup>
import {ref, watch} from "vue";
import IMask from "imask";
import SiteInput from "@/components/ui/input/SiteInput.vue";

const props = defineProps({
  number: {type: String, default: ""},
  owner: {type: String, default: ""},
  cvc: {type: String, default: ""},
  date: {type: String, default: ""},
  payNumberError: {type: Object, default: null},
  payOwnerError: {type: Object, default: null},
  payCvcError: {type: Object, default: null},
  payDateError: {type: Object, default: null},
});

const emit = defineEmits(['update:number', 'update:owner', 'update:cvc', 'update:date']);

const number = ref(props.number);
const owner = ref(props.owner);
const cvc = ref(props.cvc);
const date = ref(props.date);

watch(number, ()=> emit('update:number', number.value));
watch(() => props.number, (newValue) => {number.value = newValue;});

watch(owner, ()=> emit('update:owner', owner.value));
watch(() => props.owner, (newValue) => {owner.value = newValue;});

watch(cvc, ()=> emit('update:cvc', cvc.value));
watch(() => props.cvc, (newValue) => {cvc.value = newValue;});

watch(date, ()=> emit('update:date', date.value));
watch(() => props.date, (newValue) => {date.value = newValue;});
</script>

<template>
  <div class="payCard">
    <SiteInput class="field full" name="card_number"
               :mask="{ mask: '0000-0000-0000-0000' }"
               placeholder="XXXX-XXXX-XXXX-XXXX"
               v-model:value="number"
               :message="props.payNumberError"/>
    <SiteInput class="field full" name="card_owner"
               :mask="{ mask: /^[a-zA-Z ]*$/ }"
               placeholder="Владелец карты"
               v-model:value="owner"
               :message="props.payOwnerError"/>
    <footer>
      <SiteInput name="card_cvc"
                 :mask="{ mask: '000' }"
                 placeholder="CVC"
                 v-model:value="cvc"
                 :message="props.payCvcError"/>
      <div class="payCard__date">
        <SiteInput
            :mask="{mask: 'MM/YY', blocks: {MM: { mask: IMask.MaskedRange, from: 1, to: 12 },YY: { mask: IMask.MaskedRange, from: 0, to: 99 }}}"
            placeholder="MM/YY"
            v-model:value="date"
            :message="props.payDateError"
        />
      </div>
    </footer>
  </div>
</template>

<style scoped>
.payCard, .payCard__date{display: flex;flex-wrap: wrap;}
.payCard{gap: 20px;background: #f7f7f7;color: #FFF;padding: 30px;border-radius: 20px;justify-content:space-between;max-width: 500px}
footer{display: flex;justify-content: space-between;flex: 1 1 100%;gap: 20px}
.payCard__date{gap: 10px}
.field{flex: 1 1 auto}
.full{flex: 1 1 100%}
::v-deep(label){height: fit-content}
</style>