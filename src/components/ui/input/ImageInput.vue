<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  files: { type: Array, default: [] },
  value: { type: Object, default: null},
  message: { type: Object, default: null },
  multiple: { type: Boolean, default: false },
  placeholder: {type: String, default: "Приложить файл"},
});
const localValue = ref(props.value)
const files = ref(props.files);
const inputRef = ref(null);
const emit = defineEmits(["update:files", "update:value", "changeFileInput"]);
watch(() => props.files, (newValue) => {files.value = newValue;});
watch(() => props.value, (newValue) => {localValue.value = newValue;});
watch(localValue, () => emit("update:value", localValue.value));
const handleFileChange = (event) => {
  localValue.value = {
    value: inputRef.value.value,
    files: inputRef.value.files
  };
  const tmpFiles = Array.from(inputRef.value.files);
  tmpFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      files.value.push({
        preview: e.target.result,
        name: file.name,
        fileData: file,
      });
      emit("update:files", files.value)
      emit("changeFileInput", files.value)
    };
    reader.readAsDataURL(file);
  });
};
const removeImage = (index) => {
  files.value.splice(index, 1);
  if (inputRef.value) {
    const newFileList = new DataTransfer();
    files.value.forEach((file) => {
      const blob = new Blob([file.preview], { type: file.type });
      newFileList.items.add(new File([blob], file.name));
    });
    inputRef.value.files = newFileList.files;
    localValue.value = {
      value: inputRef.value.value,
      files: inputRef.value.files
    };
    emit("update:files", files.value)
    emit("changeFileInput", files.value)
  }
};
</script>

<template>
  <div class="inputFile">
    <label class="inner">
      <input type="file" name="file" :placeholder="placeholder" :multiple="multiple" @change="handleFileChange" ref="inputRef"/>
      <span class="placeholder">{{ placeholder }}</span>
      <i>
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2934 7.36678L8.1667 13.4934C7.41613 14.244 6.39815 14.6657 5.3367 14.6657C4.27524 14.6657 3.25726 14.244 2.5067 13.4934C1.75613 12.7429 1.33447 11.7249 1.33447 10.6634C1.33447 9.60199 1.75613 8.58401 2.5067 7.83344L8.63336 1.70678C9.13374 1.2064 9.81239 0.925293 10.52 0.925293C11.2277 0.925293 11.9063 1.2064 12.4067 1.70678C12.9071 2.20715 13.1882 2.88581 13.1882 3.59344C13.1882 4.30108 12.9071 4.97973 12.4067 5.48011L6.27336 11.6068C6.02318 11.857 5.68385 11.9975 5.33003 11.9975C4.97621 11.9975 4.63688 11.857 4.3867 11.6068C4.13651 11.3566 3.99596 11.0173 3.99596 10.6634C3.99596 10.3096 4.13651 9.9703 4.3867 9.72011L10.0467 4.06678" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </i>
    </label>
    <div class="list" v-if="files && files.length > 0">
      <div class="text-with-icon" v-for="(file, index) in files" :key="file.name + index">
        <span>{{ file.name }}</span>
        <i @click="removeImage(index)">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L6 6M1 11L6 6M6 6L1 1M6 6L11 11" stroke="black"></path>
          </svg>
        </i>
      </div>
    </div>
    <div class="message" :class="message.class" v-if="message">{{ message.message }}</div>
  </div>
</template>

<style scoped>
.inputFile{display: flex;flex-direction: column;gap: 0.8125em;border: 1px solid #cacaca;background: transparent;flex: 1 1 auto;padding: 0.6em 1.2em;}
input {display: none;}
.inner {display: flex;align-items: center;justify-content: space-between;flex-direction: row;cursor: pointer}
.placeholder {display: flex;align-items: center;}
.list{display: flex;flex-wrap: wrap;gap: 0.5em;}
.text-with-icon{display:flex;transition: .2s linear;gap: 0.5em;padding: 0.5em;background: #cacaca;flex: 0 0 auto;cursor: pointer}
@media (hover: hover) {
  .text-with-icon:hover{background: #646cff}
}
.message.error {color: red;font-size: 0.9em;}
</style>