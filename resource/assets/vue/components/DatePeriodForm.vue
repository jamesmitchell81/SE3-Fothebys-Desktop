<template>

  <form method="" action="">

    <span class="form-element">
      <label for="itemName">Date Description</label>
      <input type="text" v-model="dateDescription">
    </span>

    <span class="form-element">
      <label for="productionDate">Year</label>
      <input type="number" min="0" v-model="productionDate">
    </span>

    <span class="form-element">
      <label for="itemName">Years Between</label>
      <span class="form-input-inline">
        <input type="number" min="0" v-model="yearBetweenStart" placeholder="Start">
        <input type="number" min="0" v-model="yearBetweenEnd" placeholder="End">
      </span>
    </span>

    <span class="form-element">
      <label for="year">Year</label>
      <input type="number" v-model="year">
    </span>
  </form>

</template>

<script>
  export default {
    name: "DatePeriodForm",


  }
</script>

<style>

</style>