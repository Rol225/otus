import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBasket } from '@/hooks/useBasket';

vi.mock('vuex', () => ({
    useStore: () => mockStore,
}));

let mockStore;

describe('useBasket', () => {
    beforeEach(() => {
        mockStore = {
            state: {
                cart: [],
            },
            getters: {
                cartItemCount: 0,
                totalCartPrice: 0,
            },
            dispatch: vi.fn(),
        };
    });

    it('вызывает addToCart при добавлении в корзину', () => {
        const { addToBasket } = useBasket();
        const product = { id: 1, title: 'Test Product', price: 100 };
        addToBasket(product);
        expect(mockStore.dispatch).toHaveBeenCalledWith('addToCart', product);
    });

    it('возвращает обновленные продукты из корзины', () => {
        mockStore.state.cart = [
            { id: 1, title: 'Test Product', price: 100, count: 1 },
        ];
        const { products } = useBasket();
        expect(products.value).toEqual([
            { id: 1, title: 'Test Product', price: 100, count: 1 },
        ]);
    });

    it('возвращает правильное количество товаров в корзине', () => {
        mockStore.getters.cartItemCount = 2;
        const { count } = useBasket();
        expect(count.value).toBe(2);
    });

    it('возвращает правильную общую стоимость корзины', () => {
        mockStore.getters.totalCartPrice = 200;
        const { totalPrice } = useBasket();
        expect(totalPrice.value).toBe(200);
    });
});
