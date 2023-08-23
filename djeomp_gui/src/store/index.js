import { createStore } from 'vuex';
import axios from 'axios';

const cUrl = "https://dj-eomp.onrender.com/";

export default createStore({
  state: {
    users: null,
    user: null,
    Products: null,
    Product: null,
    spinner: false,
    token: null,
    msg: null
  },
  getters: {},
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, Products) {
      state.Products = Products;
    },
    setProduct(state, Product) {
      state.Product = Product;
    },
    setSpinner(state, value) {
      state.spinner = value;
    },
    setToken(state, token) {
      state.token = token;
    },
    setMsg(state, msg) {
      state.msg = msg;
    }
  },
  actions: {
    async fetchUsers(context) {
      try {
        const { data } = await axios.get(`${cUrl}users`);
        context.commit("setUsers", data.results);
      } catch (e) {
        context.commit("setMsg", "An error occurred");
      }
    },
    async fetchUser(context) {
      try {
        const { data } = await axios.get(`${cUrl}user`);
        context.commit("setUsers", data.results);
      } catch (e) {
        context.commit("setMsg", "An error occurred");
      }
    },
    async fetchProducts(context) {
      try {
        const { data } = await axios.get(`${cUrl}Products`);
        context.commit("setProducts", data.results);
      } catch (e) {
        context.commit("setMsg", "An error occurred");
      }
    },
    // new fetch ==========================
    async fetchProductsByCategory(context, category) {
      try {
        const { data } = await axios.get(`${cUrl}Products`);
        const filteredProducts = data.results.filter(product => product.category === category);
        context.commit("setProducts", filteredProducts);
      } catch (e) {
        context.commit("setMsg", "An error occurred");
      }
    },
    
    //============================================
      async fetchProduct(context) {
      try {
        const { data } = await axios.get(`${cUrl}Product/`+ id);
        context.commit("setProducts", data.result);
      } catch (e) {
        context.commit("setMsg", "An error occurred");
      }
    },
  },
  modules: {}
});