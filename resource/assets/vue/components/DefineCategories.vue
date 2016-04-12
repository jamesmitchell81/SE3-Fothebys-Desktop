<template>

  <form action="">
    <legend>Define Categories</legend>

      <button v-for="category in categories"
              class="btn btn-full-width"
              @click.prevent="showCategoryForm(category.id)"
              >
        {{ category.name }}
      </button>

      <button class="btn btn-full-width btn-distinct"
              @click.prevent="showCategoryForm"
              >
          Add New Category
      </button>

      <div class="control-bar">
        <div class="control-bar-content">
          <button class='btn btn-distinct'
                  @click.prevent="complete">
                  Complete
          </button>
        </div>
      </div>
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
                  this.$data.categories = response.data;

                }, function(response) {
                  console.log(response);
                });
    },

    methods: {
      showCategoryForm: function(e, id) {
        if ( !id ) id = 0;
        sessionStorage.setItem("category-selected", id);
        this.$dispatch('loadSideForm', 'DefineCategoryForm');
      },

      displayDefinedCatergories: function() {
        var data = JSON.parse(sessionStorage.getItem('defined-category'));
        this.$data.categories.push();
      },

      complete: function() {
        sessionStorage.clear();
      }
    }

  }
</script>