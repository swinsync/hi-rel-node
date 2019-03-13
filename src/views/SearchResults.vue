<template>
  <div class="search-results">
    <TopNavBar/>

    <div class="search-results-main-container">
      <!-- Modal -->
      <div
        class="modal fade"
        id="priceBreakUpModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="priceBreakUpModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="priceBreakUpModalLabel">Price Breakup</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table table-striped price-breakup-table">
                <thead>
                  <tr>
                    <th scope="col">Qty</th>
                    <th></th>
                    <th scope="col">Price/Qty</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pb in priceBrkUpObj">
                    <td scope="row">{{pb.Quantity}}</td>
                    <td>X</td>
                    <td scope="row">{{pb.UnitPrice}}</td>
                    <td scope="row">{{pb.Quantity * pb.UnitPrice}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <el-button data-dismiss="modal" type="primary" size="small">Close</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal ends here -->

      <div class="search-bar-wrapper">
        <SearchBarMain/>
      </div>
      

      <div class="loading-icon-wrap" v-if="isSearching">
        <img src="../assets/loading1.gif">
        <p>Searching . . .</p>
      </div>

      <div class="request-failed-icon-wrap" v-else-if="isRequestFailed">
        <img src="../assets/warning.png">
        <p>We could not find any available products for
          <b>#{{ q }}</b>.
        </p>
      </div>

      <div class="search-results-main" v-else>
        <div class="row no-margin">
          <div class="col-sm-12 col-md-2"></div>

          <div class="col-sm-12 col-md-8">
            <h6 id="search-results-title">
              <span>Showing results for {{ q }}</span>
            </h6>

            <div class="search-result-item-container" v-for="r in resultsObj" :key="r">
              <div>
                <div class="row no-margin">
                  <div class="col-3 search-result-item-img-wrap">
                    <img
                      v-if="r.ImageURL==null"
                      class="search-result-item-img"
                      src="../assets/no-image.png"
                    >
                    <img v-else class="search-result-item-img" v-bind:src="r.ImageURL">
                  </div>
                  <div class="col-9">
                    <div class="row" style="padding-bottom: 5px;">
                      <div class="col-7">
                        <h5 class="search-result-item-part-num">{{r.MFPartNumber}}</h5>
                        <p class="search-result-item-manf">
                          <i class="fas fa-industry"></i>
                          {{r.ManufacturerName}}
                        </p>
                        <p class="search-result-item-desc">
                          <i class="fas fa-info-circle"></i>
                          {{r.Description.substring(0, 100)+"..."}}
                        </p>
                      </div>
                      <div class="col-5 price-breakup-wrap">
                        <el-button
                          class="view-price-break-up-button"
                          size="mini"
                          round
                          @click="handlePriceBrkUpClick(r.PriceBreakUp)"
                          data-toggle="modal"
                          data-target="#priceBreakUpModal"
                        >View Details
                          <i class="fas fa-info-circle"></i>
                        </el-button>
                      </div>
                    </div>

                    <div class="price-breakup-table-wrap">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="View Price Breakup" name="1">
                          <table class="table table-striped price-breakup-table table-hover">
                            <thead>
                              <tr>
                                <th>Qty</th>
                                <th></th>
                                <th>Price/Qty</th>
                                <th></th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="pb in r.PriceBreakUp" :key="pb">
                                <td>{{pb.Quantity}}</td>
                                <td>X</td>
                                <td>
                                  <b>{{pb.UnitPrice}}</b>
                                </td>
                                <td>=</td>
                                <td>
                                  <b>{{pb.Quantity * pb.UnitPrice}}$</b>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </el-collapse-item>
                      </el-collapse>
                    </div>

                    <div class="search-result-item-actions-wrap">
                      <el-button type="primary" size="small">Add to Cart&nbsp;
                        <i style="color: #ffffff;" class="fas fa-cart-plus"></i>
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from "@/components/TopNavBarSecond.vue";
import SearchBarMain from "@/components/SearchBarMain.vue";

export default {
  name: "SearchResults",
  props: ["q"],
  components: {
    TopNavBar,
    SearchBarMain
  },
  data() {
    return {
      localHost: "http://localhost:8090/",
      searchQuery: this.q,
      resultsObj: "",
      priceBrkUpObj: "",
      isSearching: false,
      isRequestFailed: false,
      isRequestCompleted: false
    };
  },
  watch: {
    '$route.params.q': function (qq) {
      this.fetchResults(qq);
    }
  },
  methods: {
    fetchResults(actualSearchQuery) {
      this.isSearching = true;
      this.$http
        .get(this.localHost + "search", {
          params: { searchQuery: actualSearchQuery }
        })
        .then(
          function(response) {
            console.log(response.body);
            this.isSearching = false;
            if (
              response.body.results != null &&
              response.body.results.length != 0
            ) {
              this.resultsObj = response.body.results;
            } else {
              this.isRequestFailed = true;
            }

            this.isRequestCompleted = true;
          },
          function(errorResponse) {
            this.isSearching = false;
            console.log(errorResponse.body);
            this.isRequestFailed = true;
            this.isRequestCompleted = true;
          }
        );
    },
    handlePriceBrkUpClick(pbObj) {
      this.priceBrkUpObj = pbObj;
    }
  },
  mounted: function() {
    this.fetchResults(this.searchQuery);
  }
};
</script>

<style scoped>
.no-padding {
  padding-left: 0px;
  padding-right: 0px;
}

.no-margin {
  margin-left: 0px;
  margin-right: 0px;
}

.search-results-main-container {
  background: #f9f9f9;
}

.search-result-item-container {
  background: #ffffff;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #efefef;
  padding: 15px 15px;
}

.search-result-item-img-wrap {
  text-align: center;
}

.search-result-item-img {
  width: 100%;
  max-width: 160px;
  border: 1px solid #efefef;
}

.search-result-item-part-num {
  font-size: 17px;
  font-weight: 600;
}

.search-result-item-manf {
  font-size: 14px;
  color: rgb(95, 95, 95);
  font-weight: 500;
  margin-bottom: 5px;
}

.search-result-item-desc {
  font-size: 12px;
  color: rgb(95, 95, 95);
}

.search-result-item-container i {
  padding-right: 4px;
  color: rgb(82, 82, 82);
}

.price-breakup-wrap {
  padding-right: 0;
  text-align: right;
  padding-right: 15px;
}

#search-results-title {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #26c281;
  line-height: 0.1em;
  margin: 20px 0 30px 0;
  color: #26c281;
  font-size: 14px;
}

#search-results-title span {
  background: #f9f9f9;
  padding: 0 10px;
}

.search-result-item-actions-wrap {
  text-align: right;
  width: 100%;
  padding-top: 15px;
  border-top: 1px solid #efefee;
}

.price-breakup-table {
  font-size: 13px;
  text-align: center;
}

.loading-icon-wrap {
  width: 100%;
  text-align: center;
  padding-top: 30vh;
}

.loading-icon-wrap img {
  width: 50px;
  padding-bottom: 30px;
}

.loading-icon-wrap p {
  font-size: 14px;
  opacity: 0.8;
}

.request-failed-icon-wrap {
  width: 100%;
  text-align: center;
  padding-top: 25vh;
}

.request-failed-icon-wrap img {
  width: 100px;
  padding-bottom: 30px;
  opacity: 0.7;
}

.request-failed-icon-wrap p {
  font-size: 14px;
  opacity: 0.7;
}

.view-price-break-up-button {
  vertical-align: bottom;
}

.el-collapse-item__content {
  padding-bottom: 5px !important;
}

.price-breakup-table-wrap {
  border-left: 2px solid #ddd;
  padding-left: 15px;
}

.search-bar-wrapper {
  padding: 20px 0 10px 0;
}
</style>


