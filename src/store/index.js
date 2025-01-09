import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
    filteredProducts: [],
    cart: [],
    user: null,
    token: null,
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_FILTERED_PRODUCTS(state, products) {
      state.filteredProducts = products;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    ADD_TO_CART(state, product) {
      const productTmp = state.cart.find(el => el.id === product.id);
      if(!productTmp) {
        product["count"] = 1;
        state.cart.push(product);
      } else productTmp.count++;
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async searchProducts({ commit, state }, { title, price }) {
      if (!title && !price) {
        commit('SET_FILTERED_PRODUCTS', []);
      } else {
        try {
          const filtered = state.products.filter((product) => {
            const matchesTitle = title ? product.title.toLowerCase().includes(title.toLowerCase()) : true;
            return matchesTitle;
          });
          commit('SET_FILTERED_PRODUCTS', filtered);
        } catch (error) {
          console.error('Error filtering products:', error);
        }
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', credentials);
        commit('SET_TOKEN', response.data.token);
        const userResponse = await axios.get('https://fakestoreapi.com/users/1');
        commit('SET_USER', userResponse.data);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
  },

  getters: {
    products: (state) => state.products,
    filteredProducts: (state) => state.filteredProducts,
    cartItemCount: (state) => state.cart.length,
    totalCartPrice: (state) => state.cart.reduce((acc, product) => acc + (product.price * product.count), 0),
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
  },
});

export default store;
