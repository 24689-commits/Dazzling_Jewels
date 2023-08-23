<template>
  <div>
<!-- ==============PRODUCTS================= -->
    <h2>Admin Component</h2>
    <button class="btn btn-primary" @click="showAddModal = true">Add Product</button>
    <table class="table">
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
            <button class="btn btn-primary" @click="deleteProduct(product.prodID)">Delete</button>
            <button class="btn btn-secondary" @click="editProduct(product)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showAddModal" class="modal-over">
      <div class="modal-content">
      <h3>Add Product</h3>
      <form @submit.prevent="addProduct">
        <div class="mb-3">
        <label for="name">Name: </label>
        <input type="text" id="name" v-model="newProduct.prodName" required><br>
        </div>
        <div class="mb-3">
        <label for="amount">Amount: </label>
        <input type="number" id="amount" v-model="newProduct.amount" required><br>
        </div>
        <div class="mb-3">
        <label for="category">Category: </label>
        <input type="text" id="category" v-model="newProduct.category" required><br>
        </div>
        <div class="mb-3">
          <label for="category">About: </label>
          <input type="text" id="category" v-model="newProduct.about" required><br>
          </div>
        <div class="mb-3">
        <label for="gender">Gender: </label>
        <input type="text" id="gender" v-model="newProduct.gender" required><br>
        </div>
        <div class="mb-3">
        <label for="image">Image URL: </label>
        <input type="text" id="image" v-model="newProduct.image" required><br>
        </div>
        <button class="btn btn-primary" type="submit">Add</button>
        <button class="btn btn-secondary" @click="showAddModal = false">Cancel</button>
      </form>
    </div>
    </div>

    <div v-if="showEditModal" class="modal-over">
      <div class="modal-content">
      <h3>Edit Product</h3>
      <form @submit.prevent="updateProduct">
        <div class="mb-3">
        <label for="editName">Name:</label>
        <input type="text" id="editName" v-model="editProductData.prodName" required>
      </div>
      <div class="mb-3">
        <label for="editAmount">Amount:</label>
        <input type="number" id="editAmount" v-model="editProductData.amount" required>
      </div>
      <div class="mb-3">
        <label for="editCategory">Category:</label>
        <input type="text" id="editCategory" v-model="editProductData.category" required>
        </div>
        <div class="mb-3">
          <label for="editDescription">Description:</label>
          <input type="text" id="editDescription" v-model="editProductData.about" required>
          </div>
        <div class="mb-3">
        <label for="editGender">Gender:</label>
        <input type="text" id="editGender" v-model="editProductData.gender" required>
        </div>
        <div class="mb-3">
        <label for="editImage">Image URL:</label>
        <input type="text" id="editImage" v-model="editProductData.image" required>
        </div>
        <button type="submit">Update</button>
        <button @click="showEditModal = false">Cancel</button>
      </form>
      </div>
    </div>

    <!-- <button @click="showAddModal = true">Add Product</button> -->
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
        about:'',
        gender: '',
        image: '',
      },
      editProductData: {
        prodID: null,
        prodName: '',
        amount: 0,
        category: '',
        about:'',
        gender: '',
        image: '',
      },
    };
  },
  methods: {
    async fetchProducts() {
  try {
    const response = await axios.get(`https://dj-eomp.onrender.com/products`);
    const data = response.data.results; 
    console.log(data);
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
        this.newProduct = { prodName: '', amount: 0, category: '', about:'', gender: '', image: '' };
        await this.fetchProducts();
      } catch (err) {
        alert(err);
      }
    },
    async updateProduct() {
      try {
        await axios.put(`https://dj-eomp.onrender.com/product/${this.editProductData.prodID}`, this.editProductData);
        this.showEditModal = false;
        this.editProductData = { prodID: null, prodName: '', amount: 0, category: '', about:'', gender: '', image: '' };
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
      this.editProductData.about = product.about;
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
<style scoped>
  .modal-over {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal-content {
   
    background-color: white;
    width: 39%;
    padding: 20px;
    border-radius: 8px;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

</style>

