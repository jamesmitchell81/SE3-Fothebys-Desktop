<template>
  <form method="POST" action="/">

    <!-- client details -->
    <span class="form-element">
      <label for="">Client</label>
      <span class="btn-group">
        <span>Existing Client</span>
        <a v-link="" class="btn">Yes</a><!-- /arrange-appraisal/client-search.vue -->
        <a v-link="'arrange-appraisal/client-details'" class="btn">No</a><!-- /arrange-appraisal/client-details.vue -->
      </span>
    </span>
      <!-- search or enter details -->
      <router-view></router-view>

    <!-- item name -->
    <span class="form-element">
      <label for="item-name">Item Name</label>
      <input type="text" id="item-name" name="item-name">
    </span>

    <!-- category -->
    <span class="form-element">
      <label for="">Category</label>
      <option-item v-for="category in categories"
                   :type="'radio'"
                   :name="'category'"
                   :item="category">
      </option-item>
    </span>

    <!-- ... -->
    <!-- on click -> get experts related -->

    <!-- list of experts related to category -->
    <span class="form-element">
      <label for="">Expert</label>
      <!-- ... -->

    </span>

    <span class="form-element">
      <label for="">Agreed date for Appraisal</label>
      <input type="date">
    </span>

    <button class='btn'>Submit</button>

  </form>
</template>

<script>
  var OptionItem = require('./option-item.vue');
  var ClientDetails = require('./client-details.vue');

  export default {
    name: "ArrangeAppraisal",

    components: {
      OptionItem, ClientDetails
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
                    this.categories = category.data;
                  }, function(err) {
                    console.log(err);
                  });

      }
    }

  }
</script>

<style>

</style>