import { computed } from 'vue';
import { useStore } from 'vuex';

export function useBasket() {
    const store = useStore();

    const products = computed(() => store.state.cart);
    const count = computed(() => store.getters.cartItemCount);
    const totalPrice = computed(() => store.getters.totalCartPrice);

    const addToBasket = (product) => {
        store.dispatch('addToCart', product);
    };

    const removeFromBasket = (productId) => {
        store.dispatch('removeFromCart', productId);
    };

    const getItem = (productId) => {
        return products.value.find(el => el.id === productId);
    };

    const clearBasket = () => {
        store.dispatch('clearCart');
    };

    return {products, count, totalPrice, addToBasket, removeFromBasket, getItem, clearBasket};
}
