<template>
  <form method="" action="">
    <legend>Item Weight</legend>

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
        <label for="weight">Weight</label>
        <input type="number" min="0" v-model="weight">
      </span>

      <button @click.prevent="setWeight"
              class="btn side-bar-confirm">Confirm</button>

  </form>
</template>

<script>

  export default {

    data: function() {
      return {
        measures: [],
        weight: ""
      }
    },

    ready: function() {
      this.measures = [
        { name: "Metric",   units: ['k', 'kg', 'g'] },
        { name: "Imperial", units: ['st', 'lb', 'oz']}
      ]
    },

    methods: {
      setWeight: function(id, name) {
        var details = {
          measure: document.querySelector("input[type='radio']:checked").id,
          weight: this.$data.weight,
        }

        sessionStorage.setItem("weight", JSON.stringify(details));
        this.$dispatch('broadcastEvent', 'displayItemWeight');
        this.$dispatch('closeSidePanelView');
      },

    }
  }

</script>