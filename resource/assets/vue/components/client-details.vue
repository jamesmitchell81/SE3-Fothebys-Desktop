<template>

  <!-- <form method="post" action=""> -->
    <fieldset>
      <legend>Contact</legend>

      <span class="form-element">
        <label for="title">Title</label>
        <input type="text" id="title" name="title">
      </span>

      <span class="form-element">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName">
      </span>

      <span class="form-element">
        <label for="surname">Surname</label>
        <input type="text" id="surname" name="surname">
      </span>

      <span class="form-element">
        <label for="telNumber">Telephone Number</label>
        <input type="text" id="telNumber" name="telNumber">
      </span>
    </fieldset>


    <fieldset>
      <legend>Address</legend>

      <span class="form-element">
        <label for="firstLine">First Line</label>
        <input type="text" id="firstLine" name="firstLine">
      </span>

      <span class="form-element">
        <label for="secondLine">Second Line</label>
        <input type="text" id="secondLine" name="secondLine">
      </span>

      <span class="form-element">
        <label for="townCity">Town/City</label>
        <input type="text" id="townCity" name="townCity">
      </span>

      <span class="form-element">
        <label for="postalCode">Postal Code</label>
        <input type="text" id="postalCode" name="postalCode">
      </span>
    </fieldset>

  <!-- </form> -->

</template>

<script>


export default {
  name: "ClientDetails",

}
</script>

<style>

</style>