import { createWebHistory, createRouter } from 'vue-router'

import MainView from '../views/MainView.vue'
import MakeOrderView from "@/views/MakeOrderView.vue";
import PrivacyView from "@/views/PrivacyView.vue";
import ProductCreateView from "@/views/ProductCreateView.vue";
import CatalogView from "@/views/CatalogView.vue";
import ProductDetail from "@/views/ProductDetail.vue";

const routes = [
    { path: '/', component: MainView },
    { path: '/order/make/', component: MakeOrderView },
    { path: '/privacy/', component: PrivacyView },
    { path: '/product/', component: CatalogView },
    { path: '/product/:id', component: ProductDetail },
    { path: '/product/create/', component: ProductCreateView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;