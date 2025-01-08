import { createWebHistory, createRouter } from 'vue-router'

import MainView from '../views/MainView.vue'
import MakeOrderView from "@/views/MakeOrderView.vue";
import PrivacyView from "@/views/PrivacyView.vue";
import ProductCreateView from "@/views/ProductCreateView.vue";
import CatalogView from "@/views/CatalogView.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AuthorizationView from "@/views/AuthorizationView.vue";

const routes = [
    { path: '/', component: MainView, meta: {group: ["main"], title: 'Главная'}},
    { path: '/order/make/', component: MakeOrderView, meta: {requiresAuth: true, title: 'Оформление заказа'}},
    { path: '/privacy/', component: PrivacyView, meta: {group: ["politics"], title: 'Политика в отношении обработки персональных данных'}},
    { path: '/product/', component: CatalogView, meta: {group: ["main"], title: 'Каталог'}},
    { path: '/product/:id', component: ProductDetail, meta: {title: 'Детальная страница продукции'}},
    { path: '/product/create/', component: ProductCreateView, meta: {requiresAuth: true, title: 'Создание продукта'}},
    { path: '/authorization/', component: AuthorizationView, meta: {title: 'Авторизация'}},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView, meta: {title: '404'}},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const generateMenuItems = (group = "main") => {
    return routes
        .filter(route => route.meta?.group && route.meta?.group.includes(group))
        .map(route => ({
            name: route.name,
            path: route.path,
            title: route.meta.title || route.name,
        }));
}

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('auth') === 'true';
    if (to.meta.requiresAuth && !isAuthenticated) next('/authorization');
    else next();
});

export default router;
export { routes, generateMenuItems }