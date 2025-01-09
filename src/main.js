import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import store from './store';
import MaskDirective from './directives/mask';

const app = createApp(App);

app.directive('mask', MaskDirective);

app
    .use(store)
    .use(router)
    .mount('#app')
