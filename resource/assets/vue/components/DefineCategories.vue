<template>

  <form action="">
    <legend>Define Categories</legend>

      <button class="btn btn-full-width btn-distinct"
              @click.prevent="showCategoryForm(0)"
              >
          Add New Category
      </button>

      <button v-for="category in categories"
              class="btn btn-full-width"
              @click.prevent="showCategoryForm(category.id)"
              >
        {{ category.name }}
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
                  console.log(this.$data.categories);
                }, function(response) {
                  console.log(response);
                });
    },

    methods: {
      showCategoryForm: function(id) {
        if ( !id ) id = 0;
        sessionStorage.setItem("category-selected", id);
        this.$dispatch('loadSideForm', 'DefineCategoryForm');
      },

      complete: function() {
        sessionStorage.clear();
        this.$router.go("/lot-items");
      }
    },

    events: {
      displayDefinedCategories: function() {
        var data = JSON.parse(sessionStorage.getItem('defined-category'));
        this.$data.categories.push(data);
        sessionStorage.clear();
      }
    }

  }
</script>