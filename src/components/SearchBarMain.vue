<template>
<!-- Sample comment -->
  <div class="search-box-wrap-outer">
    <div class="search-item-wrap">
      <input
        class="search-box-main"
        type="text"
        placeholder="Search by Part Number..."
        v-model="searchQuery"
        @input="searchSuggest()"
      >

      <button class="search-button-main" @click="handleSearch">Search
        <i class="el-icon-search"></i>
      </button>

      <div class="suggestion-tag-wrap" v-if="isSuggestionsOn">
        <div class="suggestion-tag-wrap-inner">
          <div v-if="isSuggestionsLoading" class="suggestions-loading-wrap">
            <img src="../assets/loading4.gif">
            <p>Looking for suggestions...</p>
          </div>

          <div v-else>

              <div v-for="i in suggestionsObj" :key="i" class="suggestion-tag" @click="handleSuggestionClick(i)">
                <p>{{i}}</p>
              </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SearchBarMain",

  data() {
    return {
      localHost: "http://localhost:8090/",
      searchQuery: "",
      isSuggestionsOn: false,
      isSuggestionsLoading: false,
      suggestionsObj: []
    };
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.length >= 3 && this.searchQuery != null && this.searchQuery != "") {
        this.$router.push("/search/" + this.searchQuery);
      }
    },
    handleSuggestionClick(partNo){
        //this.$router.push("/search?q=" + partNo);
        
        this.$router.push({ name: 'SearchResults', params: { q: partNo }});
        this.searchQuery = partNo;
        this.isSuggestionsOn = false;
    },
    searchSuggest() {
      if (this.searchQuery.length >= 3 && this.searchQuery != null && this.searchQuery != "") {
        // Nullifying suggestion object inorder to avoid UI remaining same.
        (this.suggestionsObj = []), (this.isSuggestionsOn = true);
        this.isSuggestionsLoading = true;

        this.$http
          .get(this.localHost + "searchSuggest", {
            params: { searchQuery: this.searchQuery }
          })
          .then(
            function(response) {
              //console.log(response.body);
              //this.isSearching = false;
              this.isSuggestionsLoading = false;
              this.suggestionsObj = response.body;

              //this.isRequestCompleted = true;
            },
            function(errorResponse) {
              this.isSearching = false;
              console.log(errorResponse.body);
              //this.isRequestFailed = true;
              //this.isRequestCompleted = true;
              this.isSuggestionsOn = false;
              this.isSuggestionsLoading = false;
            }
          );
      } else {
        this.isSuggestionsOn = false;
      }
    }
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

.search-item-wrap {
  text-align: center;
}

.search-box-main,
.search-button-main {
  font-size: 14px;
  vertical-align: bottom;
  height: 40px;
}

.search-box-main {
  width: 33%;
  padding-left: 20px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  outline: none;
  border: 1px solid rgb(136, 176, 219);
}

.search-button-main {
  background: #409eff;
  width: 10%;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  font-weight: 500;
  color: #ffffff;
  border: 1px solid rgb(52, 142, 238);
}

.main-logo-wrap {
  text-align: center;
}

.main-logo-wrap img {
  opacity: 0.8;
  max-width: 250px;
}

.suggestion-tag-wrap {
  width: 33%;
  margin: 2px 28.5%;
  padding-left: 15px;
  position: absolute;
  z-index: 2;
}

.suggestion-tag-wrap-inner {
  background: #ffffff;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}

.suggestion-tag {
  width: 100%;
  text-align: left;
  padding-left: 20px;
  height: 40px;
  border-bottom: 1px solid #efefef;
}

.suggestion-tag:hover {
  background: #efefef;
}

.suggestion-tag p {
  padding: 0;
  margin: 0;
  line-height: 40px;
  font-size: 14px;
  font-weight: 500;
}

.suggestion-tag-wrap-inner a {
  color: #000;
  text-decoration: none;
}

.suggestions-loading-wrap {
  padding: 15px 0 1px 0;
}
.suggestions-loading-wrap img {
  width: 40px;
}

.suggestions-loading-wrap p {
  font-size: 13px;
  padding-top: 10px;
  opacity: 0.6;
}
</style>
