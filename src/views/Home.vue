<template>
  <div class="home">
    <TopNavBarSecond/>

    <div class="search-container-wrap">
      <SearchBarMain/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNavBarSecond from "@/components/TopNavBarSecond.vue";
import SearchBarMain from "@/components/SearchBarMain.vue";

export default {
  name: "home",
  components: {
    TopNavBarSecond,
    SearchBarMain
  },
  data() {
    return {
      localHost: "http://localhost:8090/",
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
.no-padding {
  padding-right: 0px;
  padding-left: 0px;
}

.no-margin {
  margin-right: 0px;
  margin-left: 0px;
}

.search-container-wrap {
  height: calc(100vh - 70px);
  background-image: url("../assets/bg3.jpg");
  background-size: cover;
  padding-top: 35vh;
}
</style>
