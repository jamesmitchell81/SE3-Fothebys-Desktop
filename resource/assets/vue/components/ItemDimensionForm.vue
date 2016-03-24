<template>

  <form action="">
    <fieldset>
      <legend>Item Dimensions</legend>

      <option-item v-for="measure in measures"
                   :type="'radio'"
                   :name="'measure'"
                   :item="measure">
      </option-item>

      <span class="form-element">
        <label for="width">Width</label>
        <input type="number" min="0" v-model="width">
      </span>

      <span class="form-element">
        <label for="height">Height</label>
        <input type="number" min="0" v-model="height">
      </span>

      <span class="form-element">
        <label for="length">Length</label>
        <input type="number" min="0" v-model="length">
      </span>

    </fieldset>
  </form>

</template>

<script>
var OptionItem = require('./OptionItem.vue');

  export default {
    name: "ItemDimensionForm",

    components: {
      OptionItem
    },

    data: function() {
      return {
        measures: []
      }
    },

    ready: function() {
      this.measures = [
        { name: "Centimeters" },
        { name: "Millimeters" },
        { name: "Meters" },
        { name: "Inches" },
        { name: "Feet" }

      ]
    }

  }
</script>