<template>

  <form method="get" action="http://localhost:8080/services/clients/">

    <span class="form-element">
      <label for="surname">Surname</label>
      <input type="text" id="surname" name="surname" v-model="surname">
    </span>

    <span class="form-element">
      <label for="title">Email Address</label>
      <input type="email" id="emailAddress" name="emailAddress" v-model="emailAddress">
    </span>

    <span class="form-element">
      <label for="telNumber">Telephone Number</label>
      <input type="text" id="telNumber" name="telNumber" v-model="telNumber">
    </span>
  </form>

</template>

<script>

  export default {
    name: "ClientSearchForm",


  }
</script>

<style>

</style>