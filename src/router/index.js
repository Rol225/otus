import { createWebHistory, createRouter } from 'vue-router'

import MainView from '../views/MainView.vue'
import MakeOrderView from "@/views/MakeOrderView.vue";
import PrivacyView from "@/views/PrivacyView.vue";
import ProductCreateView from "@/views/ProductCreateView.vue";

const routes = [
    { path: '/', component: MainView },
    { path: '/order/make/', component: MakeOrderView },
    { path: '/privacy/', component: PrivacyView },
    { path: '/productcreate/', component: ProductCreateView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;