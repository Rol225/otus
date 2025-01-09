import {computed, ref} from 'vue';
import { useStore } from 'vuex';

export function useProduct() {
    const store = useStore();

    const products = computed(() => store.state.products);
    const filteredProducts = computed(() => store.state.filteredProducts);
    const isLoading = ref(false);
    const isError = ref(false);
    const isEmpty = ref(false);

    const fetchProducts = async () => {
        isLoading.value = true;
        try {
            await store.dispatch('fetchProducts');
        } catch (error) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    };

    const searchProducts = async ({title, price} = {}) => {
        isError.value = false;
        if (!title && !price) {
            store.commit('SET_FILTERED_PRODUCTS', []);
            isEmpty.value = true;
            return;
        }
        await store.dispatch('searchProducts', {title, price});
        isEmpty.value = (store.getters.filteredProducts).length === 0;
    };

    const clearFilteredProducts = async () => {
        store.commit('SET_FILTERED_PRODUCTS', []);
    };

    const fetchProductById = async (productId) => {
        if (!productId) return;
        if(products.value.length <= 0) await fetchProducts();
        return products.value.find(el => el.id == productId)
    };

    return { products, filteredProducts, isLoading, isError, isEmpty, fetchProducts, searchProducts, clearFilteredProducts, fetchProductById };
}
