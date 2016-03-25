<template>

  <form method="post" action="http://localhost:8080/services/clients">
    <fieldset>
      <legend>Contact</legend>

      <span class="form-element">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" v-model="title">
      </span>

      <span class="form-element">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" v-model="firstName">
      </span>

      <span class="form-element">
        <label for="surname">Surname</label>
        <input type="text" id="surname" name="surname" v-model="surname">
      </span>

      <span class="form-element">
        <label for="emailAddress">Email Address</label>
        <input type="email" id="emailAddress" name="emailAddress" v-model="emailAddress">
      </span>

      <span class="form-element">
        <label for="telNumber">Telephone Number</label>
        <input type="text" id="telNumber" name="telNumber" v-model="telNumber">
      </span>
    </fieldset>


    <fieldset>
      <legend>Address</legend>

      <span class="form-element">
        <label for="firstLine">First Line</label>
        <input type="text" id="firstLine" name="firstLine" v-model="contactAddress.firstLine">
      </span>

      <span class="form-element">
        <label for="secondLine">Second Line</label>
        <input type="text" id="secondLine" name="secondLine" v-model="contactAddress.secondLine">
      </span>

      <span class="form-element">
        <label for="townCity">Town/City</label>
        <input type="text" id="townCity" name="townCity" v-model="contactAddress.townCity">
      </span>

      <span class="form-element">
        <label for="postalCode">Postal Code</label>
        <input type="text" id="postalCode" name="postalCode" v-model="contactAddress.postalCode">
      </span>
    </fieldset>

    <button @click.prevent="submitForm" class="btn">
      Register Client
    </button>

    <button @click.prevent="submitForm" class="btn">
      Use Details
    </button>

  </form>

</template>

<script>

export default {
  name: "ClientDetailsForm",

  data: function() {
    return {
      title: '',
      firstName: '',
      surname: '',
      emailAddress: '',
      telNumber: '',
      contactAddress: {
        firstLine: '',
        secondLine: '',
        townCity: '',
        postalCode: ''
      }
    }
  },

  methods: {
    submitForm: function() {
      var form = document.querySelector('form');
      var action = form.action;
      var methods = form.method;

      var d = JSON.stringify(this.$data);

      this.$http.post('http://localhost:8080/services/clients', d)
                .then(function(response) {
                  console.log(response);
                  this.$dispatch('sendToParentForm', 'ClientDetailsForm', response.data);
                  this.$root.clearData(this.$data);
                  this.$dispatch('closeSidePanelView');
                }, function(response) {
                  console.log(response);
                });
    }

  }
}
</script>

<style>

</style>