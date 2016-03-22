<template>
  <form method="POST" action="">

    <!-- client details -->
    <label for="">Client</label>
    <span class="btn-group">
      <span>Existing Client</span>
      <a href="" class="btn">Yes</a><!-- /page/arrange-appraisal/client-search.vue -->
      <a href="" class="btn">No</a><!-- /page/arrange-appraisal/client-details.vue -->
    </span>
      <!-- search or enter details -->
      <router-view></router-view>

    <!-- item name -->
    <label for="item-name">Item Name</label>
    <input type="text" id="item-name" name="item-name">

    <!-- category -->
    <label for="">Category</label>

    <option-item v-for="category in categories"
                 :type="'radio'"
                 :name="'category'"
                 :item="category">
    </option-item>

    <!-- ... -->
    <!-- on click -> get experts related -->

    <!-- list of experts related to category -->
    <label for="">Expert</label>

    <!-- ... -->

    <label for="">Agreed date for Appraisal</label>


  </form>
</template>

<script>
  var OptionItem = require('./option-item.vue');
  // http://localhost:8080/services/category

  export default {
    name: "ArrangeAppraisal",

    components: {
      OptionItem
    },

    data: function() {
      return {
        categories: []
      }
    },

    route: {
      activate: function() {
        // get all categories and experts.
        this.$http.get('http://localhost:8080/services/category')
                  .then(function(category) {
                    // for ( var i in category.data ) {
                    //   var obj = {};
                    //   obj.name = category.data[i].name;
                    //   console.log(category.data[i].name);
                    //   this.categories.push(obj);
                    // }
                    this.categories = category.data;
                  }, function(err) {
                    console.log(err);
                  });

        // return categories => (categories);
      }
    }

  }
</script>

<style>

</style>