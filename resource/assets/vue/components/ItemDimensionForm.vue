<template>

  <form action="">
    <fieldset>
      <legend>Item Dimensions</legend>

      <span class="form-element">
        <label>Select a Measure</label>
          <span class="form-input-inline" v-for="measure in measures">
          <span class='inline-title'>{{ measure.name }}</span>

            <span class="option-item" v-for="unit in measure.units">
              <input type="radio" name="unit" id="{{ unit | lowercase }}">
              <label for="{{ unit | lowercase }}">{{ unit }}</label>
            </span>

          </span>
      </span>

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

      <button @click.prevent="setDimensions"
              class="btn side-bar-confirm">Confirm</button>

    </fieldset>
  </form>

</template>

<script>

  export default {
    name: "ItemDimensionForm",

    data: function() {
      return {
        measures: [],
        width: 0,
        height: 0,
        length: 0,
        measure: ""
      }
    },

    ready: function() {
      this.measures = [
        { name: "Metric",   units: ['m', 'cm', 'mm'] },
        { name: "Imperial", units: ['yd', 'ft', 'in']}
      ]
    },

    methods: {
      setDimensions: function() {
        var details = {
          measure: document.querySelector("input[type='radio']:checked").id,
          width: this.$data.width === "" ? 0 : this.$data.width,
          height: this.$data.height === "" ? 0 : this.$data.height,
          length: this.$data.length === "" ? 0 : this.$data.length,
        }

        sessionStorage.setItem("dimensions", JSON.stringify(details));
        this.$dispatch('broadcastEvent', 'updateDimensions');
        this.$dispatch('closeSidePanelView');
      }
    }

  }
</script>