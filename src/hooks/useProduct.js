import { ref } from 'vue';

export function useProduct() {
    const products = ref([]);
    const product = ref(null);
    const filteredProducts = ref([]);
    const isLoading = ref(false);
    const isError = ref(false);
    const isEmpty = ref(false);

    const fetchProducts = async () => {
        isError.value = false;
        isLoading.value = true;
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            products.value = await response.json();
        } catch (error) {
            console.error(error);
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    };

    const searchProducts = async ({title, price} = {}) => {
        isError.value = false;
        if (!title && !price) {
            filteredProducts.value = [];
            isEmpty.value = true;
            return;
        }
        await fetchProducts();
        filteredProducts.value =
            products.value.filter((el) => {
                const matchesTitle = title
                    ? el.title.toLowerCase().includes(title.toLowerCase())
                    : true;
                return matchesTitle;
            }) || [];
        isEmpty.value = filteredProducts.value.length === 0;
    };

    const fetchProductById = async (productId) => {
        if (!productId) return;
        isLoading.value = true;
        isError.value = null;
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            product.value = await response.json();
        } catch (err) {
            isError.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {products, product, filteredProducts, isLoading, isError, isEmpty, fetchProducts, searchProducts, fetchProductById};
}
