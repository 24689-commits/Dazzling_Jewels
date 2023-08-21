<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="sidebar">
          <div class="search-container">
            <input v-model="searchQuery" @input="performSearch" class="search-input" type="text" placeholder="Search products...">
          </div>
          <div class="filters">
            <h4>Filter By</h4>
            <ul>
              <li @click="applyCategoryFilter('Watches')">Watches</li>
              <li @click="applyCategoryFilter('Rings')">Rings</li>
              <li @click="applyCategoryFilter('Necklaces')">Necklaces</li>
              <li @click="applyGenderFilter('male')">Male</li>
              <li @click="applyGenderFilter('female')">Female</li>
              <li @click="clearFilters">Show All</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <h2 class="display-2">Products</h2>
        <div class="row justify-content-center gap-3" v-if="filteredProducts">
          <div v-for="Product in filteredProducts" class="col-2" :key="Product.prodID">
            <div class="col">
              <img :src="Product.image" class="card-img-top img fluid" :alt="Product.prodName" style="height:15rem" />
              <div class="card-body">
                <h5 class="card-title">{{ Product.prodName }}</h5>
                <p class="card-text">Category: {{ Product.category }}</p>
                <h5 class="card-title"> R{{ Product.amount }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row justify-content-center">
          <SpinnerCompVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerCompVue from '../components/SpinnerComp.vue';

export default {
  components: {
    SpinnerCompVue,
  },
  computed: {
    Products() {
      return this.$store.state.Products;
    },
    filteredProducts() {
      let filtered = this.Products;

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(product => product.prodName.toLowerCase().includes(query));
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }

      if (this.selectedGender) {
        filtered = filtered.filter(product => product.gender === this.selectedGender);
      }

      return filtered;
    },
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedGender: '',
    };
  },
  methods: {
    performSearch() {
    },
    applyCategoryFilter(category) {
      this.selectedCategory = category;
    },
    applyGenderFilter(gender) {
      this.selectedGender = gender;
    },
    clearFilters() {
      this.selectedCategory = '';
      this.selectedGender = '';
    },
  },
  mounted() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<style scoped>
.sidebar {
  height: 340vh;
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.filters {
  margin-top: 20px;
}

.filters ul {
  list-style: none;
  padding: 0;
}

.filters li {
  cursor: pointer;
  margin-bottom: 5px;
}

.form-select {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
