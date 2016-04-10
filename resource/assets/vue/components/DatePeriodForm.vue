<template>

  <form method="" action="">

    <legend>Date Period Entry</legend>

    <span class="form-element">
      <label for="date-description">Date Description</label>
      <input type="text" v-model="dateDescription">
    </span>

    <span class="form-element">
      <label for="date">Specific Date</label>
      <input type="date" min="0" v-model="date">
    </span>

    <span class="form-element">
      <label for="itemName">Years Between</label>
      <span class="form-input-inline">
        <input type="number" min="0" v-model="yearBetweenStart">
        <input type="number" min="0" v-model="yearBetweenEnd">
      </span>
    </span>

    <span class="form-element">
      <label for="year">Year</label>
      <input type="number" v-model="year">
    </span>

      <button @click.prevent="setDatePeriod"
              class="btn side-bar-confirm">Confirm</button>
  </form>

</template>

<script>
  export default {
    name: "DatePeriodForm",

    data: function() {
      return {
        dateDescription: "",
        date: "",
        yearBetweenStart: "",
        yearBetweenEnd: "",
        year: ""
      }
    },

    methods: {
      setDatePeriod: function() {
        sessionStorage.setItem("date-period-set", JSON.stringify(this.$data));
        this.$dispatch('broadcastEvent', 'updateDatePeriod');
        this.$dispatch('closeSidePanelView');
      }
    }


  }
</script>

<style>

</style>