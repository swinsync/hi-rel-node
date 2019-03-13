<template>
  <div id="app" class="container-fluid">
  <transition name="fade" mode="out-in">
    <router-view/>
    </transition>
  </div>
</template>

<style>
#app {
  padding-right: 0px;
  padding-left: 0px;
  background: #f9f9f9;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
