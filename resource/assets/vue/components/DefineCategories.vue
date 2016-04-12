<template>

  <form action="">
    <legend>Define Categories</legend>

      <span class="option-item" v-for="category in categories">
        <input type="radio"
               name="category"
               id="{{ category.name | lowercase }}"
               data-index="{{ category.id }}">
        <label @click="showCategoryForm(category.id)"
               for="{{ category.name | lowercase }}">{{ category.name }}</label>
      </span>

      <span class="option-item">
        <input type="radio"
               name="category"
               id="addNew">
        <label @click="showCategoryForm"
               for="addNew">Add New Category</label>
      </span>

      <button class='btn'
              @click.prevent="complete">
              Complete
      </button>
  </form>



</template>

<script>
  export default {
    name: "DefineCategories",

    data: function() {
      return {
        categories: []
      }
    },

    ready: function() {
      this.$http.get('http://localhost:8080/services/category/')
                .then(function(response) {
                  console.log(response);
                  this.$data.categories = response.data;

                }, function(response) {
                  console.log(response);
                });
    },

    methods: {
      showCategoryForm: function(id) {
        this.$dispatch('loadSideForm', 'DefineCategoryForm', id);
      },

      complete: function() {

      }
    }

  }
</script>