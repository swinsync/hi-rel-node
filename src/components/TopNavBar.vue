<template>
  <div
        id="top-nav-wrap"
        class="border-bottom shadow-sm"
      >
        <h5 class="my-0 mr-md-auto font-weight-normal"><router-link to="/">Hi-Rel Tech</router-link> </h5>
        <nav class="my-2 my-md-0 mr-md-3">
          <a class="p-2 text-dark" href="#">About</a>
          <a class="p-2 text-dark" href="#">Contact</a>
          <a class="p-2 text-dark" href="#">Alliance</a>
          <a class="p-2 text-dark" href="#">Principals</a>
        </nav>
      </div>
</template>

<script>


export default {
  name: 'TopNavBar',
  
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
#top-nav-wrap {
  height: 70px;
}

</style>
