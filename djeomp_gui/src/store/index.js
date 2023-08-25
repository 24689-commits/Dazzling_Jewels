import { createStore } from 'vuex';
import axios from 'axios';

const cUrl = "https://dj-eomp.onrender.com/";

export default createStore({
  state: {
    users: [],
    user: null,
    Products: [],
    Product: null,
    spinner: false,
    token: null,
    msg: null
  },
  getters: {
    getUsers: state => state.users,
    getProducts: state => state.Products

  },
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
        const response = await axios.get(`${cUrl}users`);
        context.commit("setUsers", response.data.results);
      } catch (error) {
        console.error(error);
      }
    },
    async addUser(context, newUser) {
      try {
        let {msg} = (await axios.post(`${cUrl}register`, newUser)).data;
        if(msg) {
          context.dispatch('fetchUsers'); 
          alert(msg);
        
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser(context, editUserData) {
      try {
        if (editUserData.userDOB) {
          editUserData.userDOB = new Date(editUserData.userDOB).toISOString().slice(0, 19).replace('T', ' ');
        }
    
        let { msg } = (await axios.put(`${cUrl}user/${editUserData.userID}`, editUserData)).data;
        if (msg) {
          context.dispatch('fetchUsers');
         alert(msg);
        }
      } catch (error) {
        console.error(error);
      }
    }
,    
    async deleteUser(context, id) {
      try {
        let {msg} = (await axios.delete(`${cUrl}user/${id}`)).data;
        if (msg) {
          context.dispatch('fetchUsers');
          alert(msg);
        } 
      } catch (error) {
        console.error(error);
      }
    },

    async fetchProducts(context) {
      try {
        const response = await axios.get(`${cUrl}products`);
        context.commit("setProducts", response.data.results);
      } catch (error) {
        console.error(error);
      }
    },
    async addProduct(context, newProduct) {
      try {
        let {msg} = (await axios.post(`${cUrl}addproduct`, newProduct)).data;
        if (msg) {
          context.dispatch('fetchProducts'); 
          alert(msg)
        }
      
      } catch (error) {
        console.error(error);
      }
    },
    async updateProduct(context, editProductData) {
      try {
        let {msg} = (await axios.put(`${cUrl}product/${editProductData.prodID}`, editProductData)).data;
        if (msg){
          context.dispatch('fetchProducts'); 
          alert(msg)
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteProduct(context, id) {
      try {
        let {msg} = (await axios.delete(`${cUrl}product/${id}`)).data;
        if (msg){
          await context.dispatch('fetchProducts'); 
          alert(msg)
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {}
});