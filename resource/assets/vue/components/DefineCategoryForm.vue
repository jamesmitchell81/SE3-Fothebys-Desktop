<template>

  <form action="">

    <legend></legend>

    <span class="form-element">
      <label for="name">Category Name</label>
      <input type="text" v-model="name">
    </span>

    <span class="form-element" v-for="attribute in attributes">
      <span class="form-input-inline">
        <input type="text">
        <select name="attrType" id="">
          <option v-for="type in types"
                  value="">{{ type.name }}</option>
        </select>
      </span>
    </span>

    <span class="form-element">
      <label for="">Attribute and Type</label>
      <span class="form-input-inline">
        <input type="text">
        <select id="">
          <option v-for="type in types"
                  value="">{{ type.name }}</option>
        </select>
      </span>
    </span>

    <button @click.prevent="confirm"
        class="btn side-bar-confirm">Confirm</button>

  </form>

</template>

<script>

  export default {
    name: "DefineCategoryForm",

    data: function() {
      return {
        id: 0,
        name: "",
        attributes: [],
        types: [
          { name: "text"},
          { name: "number"},
          { name: "date"}
        ]
      }
    },

    ready: function() {
      var id = this.$data.id;

      if ( id !== 0 ) {
        getCategoryData(id);
      }

    },

    methods: {
      getCategoryData: function(id) {
        this.$http.get('http://localhost:8080/services/category/' + id)
                  .then(function(response) {
                    console.log(response);
                  }, function(response) {
                    console.log(response);
                  });
      },

      confirm: function() {
        var definition = {
          id: "",
          name: "",
          attributes: []
        };

      // this.$http.get('http://localhost:8080/services/category/',
      //           JSON.stringify(definition)
      //           .then(function(response) {
      //             console.log(response);
      //           }, function(response) {
      //             console.log(response);
      //           });

        sessionStorage.setItem("defined-category", JSON.stringify(definition));
        this.$dispatch('broadcastEvent', 'displayDefinedCategories');
        this.$dispatch('closeSidePanelView');
      }
    },

    events: {
      DefineCategoryForm: function(id) {
        this.$data.id = id;
      }
    }


  }


</script>