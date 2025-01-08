import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import MaskDirective from './directives/mask';

const app = createApp(App);

app.directive('mask', MaskDirective);

app
    .use(router)
    .mount('#app')
