<template>
  <div class="home">
    <nav class="navbar">
      <div class="container-fluid">
        <h3><b style="font-size:larger">D</b>AZZLING<b style="font-size:larger">J</b>EWELS</h3>
        <a class="btn btn-outline-success" id="shop" href="products">Shop Now</a>
        </div>
    </nav>
    <hr class="horizontal-line">
    <nav class="navbar">
      <form class="container-fluid justify-content-start" >
        <button class="btn btn-xl me-5" type="button" href="/products" style="font-size:20px!important;" >Elevating</button>
        <button class="btn btn-sm me-5" type="button" href="/products" style="font-size:20px!important;" >Elegance</button>
        <button class="btn btn-sm me-5" type="button" href="/products" style="font-size:20px!important;" >Enriching</button>
        <button class="btn btn-sm me-5" type="button" href="/products" style="font-size:20px!important;" >Essence.</button>
      </form>
    </nav>
    <div class="container text-center">
      <div class="row g-0 align-items-center">
        <div class="col">
          <div class="text-overlay">
           <div class="texts lobster-font">
                <h3>Where opulence meets essence</h3>
                <a class="btn btn-outline-success" id="shop" href="#featured">FEATURED</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-4 md-4 sm-1">
      <h2 id="featured" style="padding-top:70px;">Featured Products</h2>
      <div class="row justify-content-center " v-if="Products">
        <div v-for="product in Products" :key="product.prodID" class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div class="card d-flex flex-column h-100">
            <img :src="product.image" class="card-img-top" alt="Product Image">
            <div class="card-body">
              <p class="card-title">{{ product.prodName }}</p>
              <a class="view" href="/products">View More</a>
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
#featured{
  padding: 3rem 0;
}
.text-overlay {
  background-image: url("https://i.pinimg.com/564x/5c/d1/1b/5cd11b5495d1b2a26e70f075f8ef3944.jpg");
  background-size: cover;
  background-position: center;
  height: 500px;
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
  font-size: 50px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
}
.lobster-font {
  font-family: 'Lobster', cursive;
}
img{
width:500px;
height:50px;
}
col{
  margin:0px!important;
  padding:0 !important;
}
p{
  font-weight: bold;
  font-size: 5 0px;
}
.card-img-top {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.card{
  width:250px;
  height: 230px;
}
.view{
  padding:4px;
  color:black;
  text-decoration: none;
}
.view:hover{
  color: rgb(76, 36, 36);
}
#shop{
  display: inline-block;
  margin: 0 0.5rem;
  animation: heartBeat;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  border:1px solid  rgb(76, 36, 36);
  color: rgb(76, 36, 36);
}
#shop:hover{
  background-color:  rgb(76, 36, 36)!important;
  color:white;
}
@media screen and (max-width: 320px) {
div h3{
  padding-left: 50px;
    font-size: 20px;
  }

  p {
    font-size: 12px;
    
  }
  form.container-fluid button {
    font-size: 2px !important;
    padding: 0 !important;
    margin: 0;
  }
 #featured{
  padding-left: 40px;
 }
}
</style>