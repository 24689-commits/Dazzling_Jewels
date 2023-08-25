<template>
  <div>
    <users-comp/>
<!-- ==============PRODUCTS================= -->
    <h2>PRODUCTS</h2>
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
          <td> <img class="img-top img-fluid" style="height:100px; width:100px" :src="product.image" alt="Product Image"></td>
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
        <div>
          <spinner-comp v-if="isLoadingAdd" />
        </div>
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
        <button class="btn btn-primary" type="submit" :disabled="isLoadingAdd">Add</button>
        <button class="btn btn-secondary" @click="showAddModal = false" :disabled="isLoadingAdd">Cancel</button>
      </form>
    </div>
    </div>

    <div v-if="showEditModal" class="modal-over">
      <div class="modal-content">
      <h3>Edit Product</h3>
      <form @submit.prevent="updateProduct">
        <div>
          <spinner-comp v-if="isLoadingUpdate" />
        </div>
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
        <button class="btn btn-primary" type="submit" :disabled="isLoadingUpdate">Update</button>
        <button class="btn btn-secondary" @click="showEditModal = false" :disabled="isLoadingUpdate">Cancel</button>
      </form>
      </div>
    </div>

  </div>
</template>

<script>
import SpinnerComp from '@/components/SpinnerComp.vue';
import UsersComp from '../components/UsersComp.vue';

export default {
  components: {
    UsersComp,
    SpinnerComp
  },
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      isLoadingAdd: false, 
      isLoadingUpdate: false, 
      newProduct: {
        prodName: '',
        amount: 0,
        category: '',
        about: '',
        gender: '',
        image: '',
      },
      editProductData: {
        prodID: null,
        prodName: '',
        amount: 0,
        category: '',
        about: '',
        gender: '',
        image: '',
      },
    };
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },
  methods: {
    async editProduct(product) {
      this.editProductData = { ...product };
      this.showEditModal = true;
    },
    async addProduct() {
      this.isLoadingAdd = true;

      try {
        await this.$store.dispatch('addProduct', this.newProduct);
        this.isLoadingAdd = false;
        this.showAddModal = false;
        this.newProduct = {
          prodName: '',
          amount: 0,
          category: '',
          about: '',
          gender: '',
          image: '',
        };
      } catch (error) {
        console.error('Error adding product:', error);
        this.isLoadingAdd = false;
      }
    },
    async updateProduct() {
      this.isLoadingUpdate = true;
      try {
        await this.$store.dispatch('updateProduct', this.editProductData);
        this.isLoadingUpdate = false;
        this.showEditModal = false;
        this.editProductData = {
          prodID: null,
          prodName: '',
          amount: 0,
          category: '',
          about: '',
          gender: '',
          image: '',
        };
      } catch (error) {
        console.error('Error updating product:', error);
        this.isLoadingUpdate = false;
      }
    },
    async deleteProduct(id) {
      await this.$store.dispatch('deleteProduct', id);
    },
  },
  created() {
    this.$store.dispatch('fetchProducts');
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

