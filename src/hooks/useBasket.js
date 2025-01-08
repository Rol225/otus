import {reactive, computed, ref} from 'vue';

const basketState = reactive({
    products: [],
    count: 0
});

export function useBasket(){
    const products = computed(() => basketState.products);
    const count = computed(() => basketState.count);
    const totalPrice = computed(() => basketState.products.reduce((acc, product) => acc + (product.price * product.count), 0));

    const addToBasket = (product) => {
        const productTmp = basketState.products.find(el => el.id === product.id);
        if(productTmp) {
            productTmp.count++;
        } else {
            product["count"] = 1;
            basketState.products.push(product);
        }
        basketState.count++;
    }

    const removeFromBasket = (productId) => {
        basketState.products = basketState.products.filter(product => product.id !== productId);
        basketState.count--;
    }

    const getItem = (productId) => {
        return basketState.products.find(el => el.id === productId);
    }

    const clearBasket = () => {
        basketState.products.forEach(el => el.count = 0);
        basketState.products = [];
        basketState.count = 0;
    }

    return {products, count, totalPrice, addToBasket, removeFromBasket, getItem, clearBasket};
}
