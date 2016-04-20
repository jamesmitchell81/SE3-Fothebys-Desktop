<template>

  <form action="">
    <legend>Category Selection</legend>
      <span class="option-item" v-for="category in categories">
        <input type="radio"
               name="category"
               id="{{ category.name | lowercase }}"
               data-index="{{ category.id }}">
        <label @click="setCategory(category.id, category.name)"
               for="{{ category.name | lowercase }}">{{ category.name }}</label>
      </span>
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
                  this.categories = category.data;
                }, function(err) {
                  this.categories = [];
                  console.log(err);
                });
    },

    methods: {
      setCategory: function(index, name) {
        var category = {
          "id": index,
          "name": name
        };

        sessionStorage.setItem("category", JSON.stringify(category));
        this.$dispatch('broadcastEvent', 'updateCategory');
        this.$dispatch('closeSidePanelView');
      }
    }

  }
</script>

<style>

</style>