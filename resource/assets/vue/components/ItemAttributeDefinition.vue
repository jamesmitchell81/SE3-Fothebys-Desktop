<template>

  <form action="">
    <fieldset>
      <legend>Item Attributes for {{ category.name }}</legend>
    </fieldset>

    <span class="form-element" v-for="attribute in category.attributes">
      <label for="itemName">{{ attribute.name }}
          <span class="msg" transition="msg-hide" v-if="attribute.required">Required field</span>
      </label>

      <input class="attribute-input"
             type="text"
             name="{{ attribute.name }}"
             id="{{ attribute.name }}" required
             v-if="attribute.type === 'text'">
      <input class="attribute-input"
             type="number"
             name="{{ attribute.name }}"
             id="{{ attribute.name }}" required
             v-if="attribute.type === 'number'">
      <input class="attribute-input" type="date"
             name="{{ attribute.name }}" id="{{ attribute.name }}" required
             v-if="attribute.type === 'date'">

      <span class="form-input-inline" v-if="attribute.type === 'true/false'">
        <span class="option-item">
          <input class="attribute-input" type="radio"
                 name="{{ attribute.name | lowercase }}"
                 id="{{ attribute.name | lowercase }}-true">
          <label for="{{ attribute.name | lowercase }}-true">Yes</label>
        </span>
        <span class="option-item">
          <input class="attribute-input"
                 type="radio" name="{{ attribute.name | lowercase }}"
                 id="{{ attribute.name | lowercase }}-false">
          <label for="{{ attribute.name | lowercase }}-false">No</label>
        </span>
      </span>
    </span>

      <button @click.prevent="setAttributes"
              class="btn side-bar-confirm">Confirm</button>

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
    var values = sessionStorage.getItem("attributes-set");

    if ( category !== null )
    {
      category = JSON.parse(category);
      this.$http.get(path + category.id).then(
        function(response) {
          this.$data.category = response.data;
        }, function(response) {
          console.log(response);
        });
    }

    if ( values ) {
      // populate the values.
    }
  },

  methods: {
    setAttributes: function() {
      var inputs = document.querySelectorAll("input.attribute-input");
      var attributes = [];

      for ( var i = 0; i < inputs.length; i++ ) {
        var data = {};
        if ( inputs[i].type === "radio" || inputs[i].type === "checkbox" ) {
          // get the selected.
          if ( inputs[i].checked ) {
            data.name = inputs[i].name;
            data.value = inputs[i].checked;
            attributes.push(data);
          }
        } else {
          data.name = inputs[i].name;
          data.value = inputs[i].value;
          attributes.push(data);
        }
      }

      sessionStorage.removeItem("attributes-set");
      sessionStorage.setItem("attributes-set", JSON.stringify(attributes));
      this.$dispatch('broadcastEvent', 'displayAttributes');
      this.$dispatch('closeSidePanelView');
    }
  }

}

</script>

<style>

</style>