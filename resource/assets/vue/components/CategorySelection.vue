<template>

  <form action="">

    <span class="form-element">
      <label for="">Category</label>
      <option-item v-for="category in categories"
                   :type="'radio'"
                   :name="'category'"
                   :item="category">
      </option-item>
    </span>

    <!-- classification selection -->

  </form>


</template>

<script>
  var OptionItem = require('./OptionItem.vue');

  export default {
    name: "CategorySelection",

    components: {
      OptionItem
    },

    data: function() {
      return {
        categories: []
      }
    },

    ready: function() {
      this.$http.get('http://localhost:8080/services/category')
                .then(function(category) {
                  console.log(category);
                  this.categories = category.data;
                }, function(err) {
                  this.categories = [];
                  console.log(err);
                });
    },

    // computed: {
    //   categories: function() {

    //     }
    // }

  }
</script>

<style>

</style>