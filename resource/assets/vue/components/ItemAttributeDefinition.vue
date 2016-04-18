<template>

  <form action="">
    <fieldset>
      <legend>Item Attribute Definition</legend>
    </fieldset>

    <span>{{ category.name }}</span>

    <span class="form-element" v-for="attribute in category.attributes">
      <label for="itemName">{{ attribute.name }}
          <span class="msg" transition="msg-hide" v-if="attribute.required">Required field</span>
      </label>

      <input type="text" v-model="" required v-if="attribute.type === 'text'">
      <input type="number" v-model="" required v-if="attribute.type === 'number'">
      <input type="date" v-model="" required v-if="attribute.type === 'date'">

      <span class="form-input-inline" v-if="attribute.type === 'true/false'">
        <span class="option-item">
          <input type="radio" name="{{ attribute.name | lowercase }}" id="true">
          <label for="true">Yes</label>
        </span>
        <span class="option-item">
          <input type="radio" name="{{ attribute.name | lowercase }}" id="false">
          <label for="false">No</label>
        </span>
      </span>
    </span>

  </form>

</template>

<script>
export default {

  name: "ItemAttributeDefinition",
  data: function() {
    return {
      attributes: [],
      category: {}
    }
  },

  ready: function() {
    var category = sessionStorage.getItem("category-selected");
    var path = "http://localhost:8080/services/category/";

    if ( category !== null )
    {
      category = JSON.parse(category);

      this.$http.get(path + category.id).then(
        function(response) {
          this.$data.category = response.data;
        }, function(response) {

        });

    }

  }

}

</script>

<style>

</style>