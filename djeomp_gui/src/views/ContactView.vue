<template>
<div  id="contact">
    <h2>Contact Page</h2>
            <div class="container me-2"> 
                <div class="row align-items-center">
                  <div class="col ms-6">
                    <h1>Drop us a Line</h1>
                    <div class="mb-4">
                      <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="FirstName">
                    </div>
                    <div class="mb-4">
                      <input type="name" class="form-control" id="exampleFormControlInput2" placeholder="LastName">
                    </div>
                    <div class="mb-4">
                      <input type="email" class="form-control" id="exampleFormControlInput3" placeholder="name@email.com">
                    </div>
                    <div class="mb-4">
                      <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="col ms-4">
                    <div class="row mb-4">
                          <h5 class="card-title">Khayelitsha</h5>
                          <p class="card-text">5968, Intandele Street Site B
                          8000<br>
                        </p>
                    </div>
                    <div class="row mb-4">
                            <h5 class="card-title">Mfuleni</h5>
                            <p class="card-text">9973,Polar Park Street, Bardale,7100</p>
                        </div>
                  </div>
                </div>
            </div>      
</div>
</template>

<script>
    export default {
       
    }
</script>

<style>
input{
    width:500px!important;
}
textarea{
    width:500px!important;
}

</style>