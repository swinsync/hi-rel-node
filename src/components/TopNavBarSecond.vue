<template>
  <div class="top-nav-wrap border-bottom shadow-sm">

    <div class="row no-margin">
      <div class="col-4 top-nav-wrap-img-wrap">
        <router-link to="/"><img src="../assets/hi-rel-logo.png" alt=""></router-link>
    </div>
    <div class="col-8 top-nav-wrap-menu-wrap">
      <router-link to="/">Cart <i class="fas fa-cart-plus"></i></router-link> 
      <router-link to="/">Sign In <i class="fas fa-sign-in-alt"></i></router-link> 
      <router-link to="/">Sign Up <i class="fas fa-user-plus"></i></router-link> 
    </div>
    </div>

      

         
  </div>
</template>

<script>


export default {
  name: 'TopNavBarSecond',
  
  data () {
    return {
     
    }
  },
  methods: {
      
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-nav-wrap {
  height: 70px;
  line-height: 70px;
  font-weight: 500;
  font-size: 14px;
  text-align: right;
  background: #ffffff;
}

.no-padding {
  padding-right: 0px;
  padding-left: 0px;
}

.no-margin {
  margin-right: 0px;
  margin-left: 0px;
}

.top-nav-wrap a{
  padding-right: 30px;
}

.top-nav-wrap img{
  max-width: 140px;
}

.top-nav-wrap-img-wrap {
  text-align: left;
}

</style>
