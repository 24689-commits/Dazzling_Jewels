<template>
  <div>
    <h2>Admin Component</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Gender</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.prodID">
          <td>{{ product.prodID }}</td>
          <td>{{ product.prodName }}</td>
          <td>{{ product.amount }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.gender }}</td>
          <td>  <img :src="product.image" alt="Product Image"></td>
          <td>
            <button @click="deleteProduct(product.prodID)">Delete</button>
            <button @click="editProduct(product)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showAddModal">
      <h3>Add Product</h3>
      <form @submit.prevent="addProduct">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newProduct.prodName" required>
        <label for="amount">Amount:</label>
        <input type="number" id="amount" v-model="newProduct.amount" required>
        <label for="category">Category:</label>
        <input type="text" id="category" v-model="newProduct.category" required>
        <label for="gender">Gender:</label>
        <input type="text" id="gender" v-model="newProduct.gender" required>
        <label for="image">Image URL:</label>
        <input type="text" id="image" v-model="newProduct.image" required>
        <button type="submit">Add</button>
        <button @click="showAddModal = false">Cancel</button>
      </form>
    </div>

    <div v-if="showEditModal">
      <h3>Edit Product</h3>
      <form @submit.prevent="updateProduct">
        <label for="editName">Name:</label>
        <input type="text" id="editName" v-model="editProductData.prodName" required>
        <label for="editAmount">Amount:</label>
        <input type="number" id="editAmount" v-model="editProductData.amount" required>
        <label for="editCategory">Category:</label>
        <input type="text" id="editCategory" v-model="editProductData.category" required>
        <label for="editGender">Gender:</label>
        <input type="text" id="editGender" v-model="editProductData.gender" required>
        <label for="editImage">Image URL:</label>
        <input type="text" id="editImage" v-model="editProductData.image" required>
        <button type="submit">Update</button>
        <button @click="showEditModal = false">Cancel</button>
      </form>
    </div>

    <button @click="showAddModal = true">Add Product</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      products: [],
      showAddModal: false,
      showEditModal: false,
      newProduct: {
        prodName: '',
        amount: 0,
        category: '',
        gender: '',
        image: '',
      },
      editProductData: {
        prodID: null,
        prodName: '',
        amount: 0,
        category: '',
        gender: '',
        image: '',
      },
    };
  },
  methods: {
    async fetchProducts() {
  try {
    const response = await axios.get(`https://dj-eomp.onrender.com/products`);
    const data = response.data.results; // Access the data from the Proxy object
    console.log(data); // Log the data to ensure it's what you expect
    this.products = data;
  } catch (err) {
    alert(err);
  }
}
,
    async addProduct() {
      try {
        await axios.post(`https://dj-eomp.onrender.com/addproduct`, this.newProduct);
        this.showAddModal = false;
        this.newProduct = { prodName: '', amount: 0, category: '', gender: '', image: '' };
        await this.fetchProducts();
      } catch (err) {
        alert(err);
      }
    },
    async updateProduct() {
      try {
        await axios.put(`https://dj-eomp.onrender.com/product/${this.editProductData.prodID}`, this.editProductData);
        this.showEditModal = false;
        this.editProductData = { prodID: null, prodName: '', amount: 0, category: '', gender: '', image: '' };
        await this.fetchProducts();
      } catch (err) {
        alert(err);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`https://dj-eomp.onrender.com/product/${id}`);
        await this.fetchProducts();
      } catch (err) {
        alert(err);
      }
    },
    editProduct(product) {
      this.editProductData.prodID = product.prodID;
      this.editProductData.prodName = product.prodName;
      this.editProductData.amount = product.amount;
      this.editProductData.category = product.category;
      this.editProductData.gender = product.gender;
      this.editProductData.image = product.image;
      this.showEditModal = true;
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>
