<template>
  <div>
    <h2>USERS</h2>
    <button class="btn btn-primary" @click="showAddModal = true">Add User</button>
    <table class="table">
      <thead>
        <tr>
          <th>userID</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>gender</th>
          <th>userDOB</th>
          <th>emailAdd</th>
          <th>profileUrl</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userID">
          <td>{{ user.userID }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ dateFormat(user.userDOB) }}</td>
          <td>{{ user.emailAdd }}</td>
          <td><img class="img-top img-fluid" style="height: 100px; width: 100px" :src="user.profileUrl" alt="user Image"></td>
          <td>
            <button class="btn btn-primary" @click="deleteUser(user.userID)">Delete</button>
            <button class="btn btn-secondary" @click="editUser(user)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showAddModal" class="modal-over">
      <div class="modal-content">
        <h3>Add user</h3>
        <form @submit.prevent="addUser">
          <div>
            <spinner-comp v-if="isLoading" />
          </div>
          <div class="mb-3">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newUser.firstName" required><br>
          </div>
          <div class="mb-3">
            <label for="lastName">lastName:</label>
            <input type="text" id="lastName" v-model="newUser.lastName" required><br>
          </div>
          <div class="mb-3">
            <label for="gender">gender:</label>
            <input type="text" id="gender" v-model="newUser.gender" required><br>
          </div>
          <div class="mb-3">
            <label for="userDOB">userDOB:</label>
            <input type="date" id="userDOB" v-model="newUser.userDOB" required><br>
          </div>
          <div class="mb-3">
            <label for="emailAdd">emailAdd:</label>
            <input type="text" id="emailAdd" v-model="newUser.emailAdd" required><br>
          </div>
          <div class="mb-3">
            <label for="userPassword">userPassword:</label>
            <input type="password" id="userPassword" v-model="newUser.userPassword" required><br>
          </div>
          <div class="mb-3">
            <label for="profileUrl">profileUrl:</label>
            <input type="text" id="profileUrl" v-model="newUser.profileUrl" required><br>
          </div>
          <button class="btn btn-primary" type="submit" :disabled="isLoading">Add</button>
          <button class="btn btn-secondary" @click="showAddModal = false" :disabled="isLoading">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-over">
      <div class="modal-content">
      <h3>Edit user</h3>
      <form @submit.prevent="updateUser">
        <div>
          <spinner-comp v-if="isLoadingUpdate"  />
        </div>
        <div class="mb-3">
        <label for="editName">firstName:</label>
        <input type="text" id="editName" v-model="editUserData.firstName" required>
      </div>
      <div class="mb-3">
        <label for="editlastName">lastName:</label>
        <input type="text" id="editlastName" v-model="editUserData.lastName" required>
      </div>
      <div class="mb-3">
        <label for="editgender">gender:</label>
        <input type="text" id="editgender" v-model="editUserData.gender" required>
        </div>
        <div class="mb-3">
          <label for="edituserDOB">userDOB</label>
          <input type="date" id="edituserDOB" :value="dateFormat(editUserData.userDOB)" required>
          </div>
        <div class="mb-3">
        <label for="editemailAdd:">emailAdd:</label> 
        <input type="text" id="editemailAdd" v-model="editUserData.emailAdd" required>
        </div>
        <div class="mb-3">
        <label for="edituserPassword">userPassword:</label>
        <input type="password" id="edituserPassword" v-model="editUserData.userPassword" required>
        </div>
        <div class="mb-3">
          <label for="editprofileUrl">profileUrl:</label>
          <input type="text" id="editprofileUrl" v-model="editUserData.profileUrl" required>
          </div>
        <button class="btn btn-primary" type="submit" :disabled="isLoading">Update</button>
        <button class="btn btn-secondary" @click="showEditModal = false" :disabled="isLoading">Cancel</button>
      </form>
      </div>
    </div>
  </div>
</template>


<script>
import dayjs from 'dayjs';
import SpinnerComp from './SpinnerComp.vue';

export default {
  components: { 
    SpinnerComp 
  },
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      isLoading: false,
      newUser: {
        firstName: '',
        lastName: '',
        gender: '',
        userDOB: null,
        emailAdd: '',
        userPassword: '',
        profileUrl: ''
      },
      editUserData: {
        userID: null,
        firstName: '',
        lastName: '',
        gender: '',
        userDOB: null,
        emailAdd: '',
        userPassword: '',
        profileUrl: ''
      },
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
  },
  methods: {
    dateFormat(dateTime) {
      return dayjs(dateTime).format('YYYY-MM-DD');
    },
    async editUser(user) {
      this.isLoadingUpdate = true; 
      this.editUserData = { ...user };
      this.isLoadingUpdate = false; 
      this.showEditModal = true;
    },
    async addUser() {
      this.isLoading = true; 
      await this.$store.dispatch('addUser', this.newUser);
      this.isLoading = false; 
      this.showAddModal = false;
    },
    async updateUser() {
      this.isLoadingUpdate = true; 
      try {
        await this.$store.dispatch('updateUser', this.editUserData);
      } catch (error) {
        console.error('Update user error:', error);
      }
      this.isLoadingUpdate = false; 
      this.showEditModal = false;
    },
    async deleteUser(id) {
      await this.$store.dispatch('deleteUser', id);
    },
  },
  created() {
    this.$store.dispatch('fetchUsers');
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

