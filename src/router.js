import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SearchResults from './views/SearchResults.vue'
import Cart from './views/Cart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search/:q',
      name: 'SearchResults',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: SearchResults,
      //props: (route) => ({
        //searchTerm: route.query.q,
      //})
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
