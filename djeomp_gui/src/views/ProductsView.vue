<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="sidebar sticky-top">
          <div class="search-container">
            <input v-model="searchQuery" @input="performSearch" class="search-input" type="text" placeholder="Search products...">
            <select v-model="sortingOption" class="form-select" @change="applySorting">
              <option value="default">Sort By:</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="nameAsc">Name: A-Z</option>
              <option value="nameDesc">Name: Z-A</option>
            </select>
          </div>
          <div class="filters">
            <h4>Filter By</h4>
            <ul>
              <li @click="clearFilters">Show All</li>
              <li @click="applyCategoryFilter('Watches')">Watches</li>
              <li @click="applyCategoryFilter('Rings')">Rings</li>
              <li @click="applyCategoryFilter('Necklaces')">Necklaces</li>
              <li @click="applyGenderFilter('male')">Male</li>
              <li @click="applyGenderFilter('female')">Female</li>
              <GenderComp/>
            </ul>
          </div>
        </div>
        </div>
      </div>
      <div class="col-md-9">
        <h2 class="display-2">Products</h2>
        <div class="row justify-content-center gap-3" v-if="filteredProducts">
         <div v-for="Product in filteredProducts" class="col-2" :key="Product.prodID">
            <div class="col">
              <img :src="Product.image" class="card-img-top img fluid" :alt="Product.prodName" />
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
  
</template>

<script>
import SpinnerCompVue from '../components/SpinnerComp.vue';
import GenderComp from '../components/GenderComp.vue';

export default {
  components: {
    SpinnerCompVue,
    GenderComp, 
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

      if (this.sortingOption === 'priceLowToHigh') {
        filtered.sort((a, b) => a.amount - b.amount);
      } else if (this.sortingOption === 'priceHighToLow') {
        filtered.sort((a, b) => b.amount - a.amount);
      } else if (this.sortingOption === 'nameAsc') {
        filtered.sort((a, b) => a.prodName.localeCompare(b.prodName));
      } else if (this.sortingOption === 'nameDesc') {
        filtered.sort((a, b) => b.prodName.localeCompare(a.prodName));
      }

      return filtered;
    },
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedGender: '',
      sortingOption: 'default',
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
    applySorting() {

    },
  },
  mounted() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<style scoped>
.container{
  display: flex;
}
.sidebar {
 
  background-color: #f0f0f0;
  padding: 20px;
  position: fixed; 
  top: 5rem;
  left: 3rem; 
  bottom: 0rem;
  
}

.search-container {
  margin-bottom: 40px;
  margin-top: 2rem;
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
li{
  padding: .4rem;
}
li:hover{
  color:blue;
}
.card-img-top {
  object-fit: cover;
  height: 200px;
}
.card-body {
  padding: 10px;
}
.row{
  margin-left: 8rem;
}
</style>
