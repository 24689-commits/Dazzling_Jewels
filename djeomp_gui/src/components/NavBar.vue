<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
            <div class="container-fluid">
              <a class="navbar-brand" href="/"><img src="https://i.imgur.com/eXk4QIO.png" alt=""></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <router-link to="/">Home</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/about">About</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/Products">Products</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/Contact">Contact</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/Admin">Admin</router-link>
                  </li>
                  <!-- <li class="nav-item">
                    <router-link to="/users">Users</router-link>
                  </li> -->
                  
                </ul>
              </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
img{
  width:80px;
  height:50px;
}


</style>
