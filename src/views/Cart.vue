<template>
  <div>
    <TopNavBar/>

    <div class="main-cart-main-container">

      <div class="loading-icon-wrap" v-if="isCartLoading">
        <img src="../assets/cart-loading1.gif">
        <p>Loading Cart . . .</p>
      </div>

      <div class="request-failed-icon-wrap" v-else-if="isRequestFailed">
        <img src="../assets/warning.png">
        <p>We could not find any results for <b>#{{ searchTerm }}</b>.</p>
      </div>
      
      <div class="main-cart-main" v-else>
        
        <div class="row no-margin">
          <div class="col-sm-12 col-md-2">
          </div>

          <div class="col-sm-12 col-md-8">
            <div class="cart-icon-wrap"><i class="fas fa-shopping-cart"></i></div>
            <h6 id="main-cart-title"><span>MY CART</span></h6>
            
            <div class="main-cart-item-container">
              
              <div>

                <div class="row">
                  <div class="col-1 cart-item-column-title">
                    
                  </div>
                  <div class="col-5 cart-item-column-title">
                    <p>Part Number</p>
                  </div>
                  <div class="col-2 cart-item-column-title">
                    <p>Quantity</p>
                  </div>
                  <div class="col-2 cart-item-column-title">
                    <p>Unit Price.</p>
                  </div>
                  <div class="col-2 cart-item-column-title">
                    <p>Total</p>
                  </div>
                </div>

                <div class="row" v-for="i in 3">
                  <div class="col-1 cart-item-column">
                    <img src="../assets/no-image.png">
                  </div>
                  <div class="col-5 cart-item-column">
                    <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  </div>
                  <div class="col-2 cart-item-column">
                    <p>10</p>
                  </div>
                  <div class="col-2 cart-item-column">
                    <p>1000$</p>
                  </div>
                  <div class="col-2 cart-item-column">
                    <p>1000$</p>
                  </div>
                </div>

                <div class="row" >
                  <div class="col-1">
                  </div>
                  <div class="col-5">
                  </div>
                  <div class="col-2">
                    
                  </div>
                  <div class="col-2 cart-item-column-total-tax-gross ">
                    <p>Total</p>
                  </div>
                  <div class="col-2 cart-item-column-total-amount ">
                    <p>34000$</p>
                  </div>
                </div>

                <div class="row" >
                  <div class="col-1">
                  </div>
                  <div class="col-5 ">
                  </div>
                  <div class="col-2 ">
                    
                  </div>
                  <div class="col-2 cart-item-column-total-tax-gross ">
                    <p>Tax</p>
                  </div>
                  <div class="col-2 cart-item-column-total-amount ">
                    <p>300$</p>
                  </div>
                </div>

                <div class="row" >
                  <div class="col-1">
                  </div>
                  <div class="col-5">
                  </div>
                  <div class="col-2">
                    
                  </div>
                  <div class="col-2 cart-item-column-total-tax-gross ">
                    <p>GROSS TOTAL</p>
                  </div>
                  <div class="col-2 cart-item-column-total-amount ">
                    <p>30000$</p>
                  </div>
                </div>

              </div>

              <div class="cart-action-wrap">
                <el-button type="primary">CHECK OUT <i class="fas fa-arrow-right"></i></el-button>
              </div>
              

            </div>
          </div>

          <div class="col-sm-12 col-md-2">
          </div>
        </div>

        

      </div>

    </div>

    

    

  </div>
</template>

<script>
import TopNavBar from '@/components/TopNavBarSecond.vue'
export default {
  name: "Cart",
  components: {
     TopNavBar
  },
  data () {
    return {
      localHost: "http://localhost:8090/",
      resultsObj : '',
      priceBrkUpObj: '',
      isCartLoading : false,
      isRequestFailed : false,
      isRequestCompleted : true
    }
  },
  methods: {
      fetchResults() {
        
      }
  },
  mounted: function () {
    //this.fetchResults();
  }
};
</script>

<style scoped>

.no-padding{
  padding-left: 0px;
  padding-right: 0px;
}

.no-margin{
  margin-left: 0px;
  margin-right: 0px;
}

.main-cart-main-container {
  background: #f9f9f9;
  height: auto;
  min-height: calc(100vh - 70px);
}

.main-cart-item-container {
  background: #ffffff;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #e2e2e2;
  padding: 30px;
}

.main-cart-item-img-wrap {
  text-align: center;
  
}

#main-cart-title {
   width: 100%; 
   text-align: center; 
   border-bottom: 1px solid #26c281;
   line-height: 0.1em;
   margin: 20px 0 30px 0; 
   color: #26c281;
   font-weight: 600;
   font-size: 14px;
   opacity: .7;
}

#main-cart-title span { 
    background: #f9f9f9; 
    padding:0 10px; 
    
}



.loading-icon-wrap {
  width: 100%;
  text-align: center;
  padding-top: 15vh; 
}

.loading-icon-wrap img{
  width: 250px;
  opacity: .7;
}

.loading-icon-wrap p {
  font-size: 14px;
  opacity: .8;
  font-weight: 500;
}

.request-failed-icon-wrap {
  width: 100%;
  text-align: center;
  padding-top: 25vh; 
}

.request-failed-icon-wrap img{
  width: 100px;
  padding-bottom: 30px;
  opacity: .7;
}

.request-failed-icon-wrap p {
  font-size: 14px;
  opacity: .7;
}

.cart-item-column {
  height: 60px;
  line-height: 60px;
  text-align: left;
  font-size: 15px;
  color: #888;
}

.cart-item-column-title {
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 13px;
  color: rgb(141, 140, 140);
  text-transform: uppercase;
  font-weight: 600;
}

.cart-item-column img{
  max-height: 40px;
  border-radius: 50%;
  border: 2px solid rgb(214, 214, 214);
}

.cart-action-wrap {
  padding: 15px 0 0 0;
  text-align: right;
}

.cart-item-column-total-tax-gross {
  font-weight: 600;
  color: #5f5f5f;
  padding-top: 10px;
  font-size: 15px;
}

.cart-item-column-total-amount {
  font-weight: 700;
  padding-top: 10px;
  font-size: 15px;
  color: #5f5f5f;
}

.border-top {
  
}

.border-top-bold {
  border-top: 2px solid #efefef;
  border-bottom: 2px solid #efefef;
}

.cart-icon-wrap {
  text-align: center;
  padding: 20px 0 5px 0;
  font-size: 20px;
  color: #26c281;
  opacity: .7;;
}

</style>


