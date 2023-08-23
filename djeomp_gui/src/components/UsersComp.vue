<template>
    <div>
  <!-- ==============PRODUCTS================= -->
      <h2>Admin Component</h2>
      <button class="btn btn-primary" @click="showAddModal = true">Add Product</button>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>gender</th>
            <th>userDOB</th>
            <th>emailAdd</th>
            <th>userPassword</th>
            <th>profileUrl</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.userID">
            <td>{{ user.userID}}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.userDOB }}</td>
            <td>{{ user.emailAdd }}</td>
            <td>{{ user.userPassword }}</td>
            <td>  <img :src="user.profileUrl" alt="Product Image"></td>
            <td>
              <button class="btn btn-primary" @click="deleteUser(user.userID)">Delete</button>
              <button class="btn btn-secondary" @click="editUser(user)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="showAddModal" class="modal-over">
        <div class="modal-content">
        <h3>Add User</h3>
        <form @submit.prevent="addProduct">
          <div class="mb-3">
          <label for="name">FirstName: </label>
          <input type="text" id="name" v-model="newUser.firstName" required><br>
          </div>
          <div class="mb-3">
          <label for="amount">LastName: </label>
          <input type="text" id="name" v-model="newUser.lastName" required><br>
          </div>
          <div class="mb-3">
          <label for="category">gender: </label>
          <input type="text" id="gender" v-model="newUser.gender" required><br>
          </div>
          <div class="mb-3">
            <label for="category">date Of Birth: </label>
            <input type="number" id="dateOfBirsth" placeholder="0000-00-00" v-model="newUser.userDOB" required><br>
            </div>
          <div class="mb-3">
          <label for="gender">Email Address: </label>
          <input type="text" id="email" v-model="newUser.emailAdd" required><br>
          </div>
          <div class="mb-3">
            <label for="gender">Password: </label>
            <input type="text" id="password" v-model="newUser.userPassword" required><br>
            </div>
          <div class="mb-3">
          <label for="image">Image URL: </label>
          <input type="text" id="image" v-model="newUser.profileUrl" required><br>
          </div>
          <button class="btn btn-primary" type="submit">Add</button>
          <button class="btn btn-secondary" @click="showAddModal = false">Cancel</button>
        </form>
      </div>
      </div>
  
      <div v-if="showEditModal" class="modal-over">
        <div class="modal-content">
        <h3>Edit User</h3>
        <form @submit.prevent="updateProduct">
          <div class="mb-3">
          <label for="editName">FirstName:</label>
          <input type="text" id="editFirstName" v-model="editUserData.firstName" required>
        </div>
        <div class="mb-3">
          <label for="editLast">LastName:</label>
          <input type="text" id="editLasName" v-model="editUserData.lastName" required>
        </div>
        <div class="mb-3">
          <label for="editGender">Gender:</label>
          <input type="text" id="editGender" v-model="editUserData.gender" required>
          </div>
          <div class="mb-3">
            <label for="editDOB">Date of birth:</label>
            <input type="text" id="editDOB" v-model="editUserData.userDOB" required>
            </div>
          <div class="mb-3">
          <label for="editEmail">Email:</label>
          <input type="text" id="editEmail" v-model="editUserData.emailAdd" required>
          </div>
          <div class="mb-3">
          <label for="editPass">Image URL:</label>
          <input type="text" id="editPass" v-model="editUserData.userPassword" required>
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
        users: [],
        showAddModal: false,
        showEditModal: false,
        newUser: {
          firstNameName: '',
          lastName: '',
          gender: '',
          userDOB:'',
          userPassword: '',
          profileUrl: '',
        },
        editUserData: {
          userID: null,
          firstNameName: '',
          lastName: '',
          gender: '',
          userDOB:'',
          userPassword: '',
          profileUrl: '',
        },
      };
    },
    methods: {
      async fetchUsers() {
    try {
      const response = await axios.get(`https://dj-eomp.onrender.com/users`);
      const data = response.data.results; 
      console.log(data);
      this.users = data;
    } catch (err) {
      alert(err);
    }
  }
  ,
      async register() {
        try {
          await axios.post(`https://dj-eomp.onrender.com/register`, this.newUser);
          this.showAddModal = false;
          this.newProduct = { firstName: '', lastName: '', gender: '', userDOB:'', emailAdd: '', userPassword: '',profileUrl:'' };
          await this.fetchUsers();
        } catch (err) {
          alert(err);
        }
      },
      async updateUser() {
        try {
          await axios.put(`https://dj-eomp.onrender.com//${this.editUserData.prodID}`, this.editUserData);
          this.showEditModal = false;
          this.editUserData = { prodID: null, prodName: '', amount: 0, category: '', about:'', gender: '', image: '' };
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
        this.editUserData.prodID = product.prodID;
        this.editUserData.prodName = product.prodName;
        this.editUserData.amount = product.amount;
        this.editUserData.category = product.category;
        this.editUserData.about = product.about;
        this.editUserData.gender = product.gender;
        this.editUserData.image = product.image;
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
  
  