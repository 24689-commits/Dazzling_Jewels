<template>
  <div class="home">
    <nav class="navbar">
      <div class="container-fluid">
        <h3><b style="font-size:larger">D</b>AZZLING<b style="font-size:larger">J</b>EWELS</h3>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
    
    <!-- Horizontal Line -->
    <hr class="horizontal-line">
   
    <nav class="navbar">
      <form class="container-fluid justify-content-start">
        <a class="btn me-5" type="button" href="/products">ShopNow</a>
        <a class="btn btn-sm me-5" type="button" href="/products">Watches</a>
        <a class="btn btn-sm me-5" type="button" href="/products">Rings</a>
        <a class="btn btn-sm me-5" type="button" href="/products">Necklaces</a>
      </form>
    </nav>
    <div class="container text-center">
      <div class="row g-0 align-items-center">
        <div class="col">
          <div class="text-overlay">
            <div class="texts">
              <h3>Where opulence meets essence</h3>
              <p>Elevating Elegance, Enriching Essence.</p>
              <a class="btn me-5" href="/products">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- featured products -->
    <div class="container mt-4">
      <h2>Featured Products</h2>
      <div class="row justify-content-center " v-if="Products">
        <div v-for="product in Products" :key="product.prodID" class="col-lg-2 col-md-4 col-sm-6 mb-4">
          <div class="card d-flex flex-column h-100">
            <img :src="product.image" class="card-img-top" alt="Product Image">
            <div class="card-body">
              <p class="card-title">{{ product.prodName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row justify-content-center">
        <SpinnerComp/>
      </div>
    </div>
      </div>
</template>
<script>
import SpinnerComp from '@/components/SpinnerComp.vue';
export default {
  components: {
    SpinnerComp
  },
  computed: {
    Products() {
      if (this.$store.state.Products) {
        const prodID = [2, 9, 11, 18, 21, 5, 1, 7, 3, 18, 21, 28, 17, 30 ];
        return this.$store.state.Products.filter(product => prodID.includes(product.prodID));
      }
      return this.$store.state.Products;
    }
  },
  mounted() {
    this.$store.dispatch('fetchProducts');
  }
};
</script>

<style>
.text-overlay {
  background-image: url("https://i.postimg.cc/rsCx4gHY/20230728-American-Swiss-Spotlight-Diamond-Showcase-Update2-Desktop-896e055d61.jpg");
  background-size: cover; 
  background-position: center;
  height: 350px;
  width: 100%; 
  position: relative;
  text-align: center;
  color: black;
}

.texts{
  position: absolute;
  color:black;
  top: 40%;
  left: 20%;
  transform: translate(-50%, -50%);
  font-size: 25px;
 
}
.texts h3{
  font-weight: bold;
  font-size: 35px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
}


img{
width:100px;
height:120px;
}
col{
  margin:0px!important;
  padding:0 !important;
}
p{
  font-weight: bold;
  font-size: 5 0px;
}
</style>