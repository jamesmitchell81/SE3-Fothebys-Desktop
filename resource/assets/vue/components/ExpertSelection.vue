<template>

  <form action="">
    <fieldset>
      <legend>Expert Selection</legend>
      <span class="form-element">
        <label for="date-description">Expert Search</label>
        <input @keyup="searchExperts | debounce 500" type="text" v-model="expertSearch">
      </span>
    </fieldset>

    <fieldset>


    </fieldset>
  </form>

</template>

<script>

  export default {
    name: "ExpertSelection",

    data: function() {
      return {
        expertSearch: ""
      }
    }

    methods: {
      searchExperts: function() {
        console.log(this.$data.expertSearch);
      }
    }
  }

</script>

<style>

</style>