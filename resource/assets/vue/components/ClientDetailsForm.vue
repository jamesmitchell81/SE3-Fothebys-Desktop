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
        <label for="townCity">Country of Residence</label>
        <select type="text" id="country" name="country" v-model="contactAddress.country">
            <option value="{{ country.shortCode }}" v-for="country in countries">
              {{ country.shortCode }} {{ country.name }}
            </option>
        </select>
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

      <button @click.prevent="saveClientDetails"
              class="btn side-bar-confirm">Confirm</button>

      <button @click.prevent="demoPopulateForm"
              class="btn">Demo Populate Form</button>

  </form>

</template>

<script>

export default {
  name: "ClientDetailsForm",

  data: function() {
    return {
      countries: [],
      title: '',
      firstName: '',
      surname: '',
      emailAddress: '',
      telNumber: '',
      contactAddress: {
        firstLine: '',
        secondLine: '',
        townCity: '',
        postalCode: '',
        country: ''
      }
    }
  },

  ready: function() {
      this.$http.get('http://localhost:8080/services/countries')
                .then(function(response) {
                  console.log(response);
                  this.$data.countries = response.data;
                },function(response) {
                  console.log(response);
                });
  },

  methods: {
    saveClientDetails: function() {
      var form = document.querySelector('form');
      var action = form.action;
      var method = form.method;
      var details = JSON.stringify(this.$data);

      this.$http.post('http://localhost:8080/services/clients', details)
                .then(function(response) {
                  var location = response.headers("location");
                  var parts = location.split("/");
                  details = JSON.parse(details);
                  details.id = parts[parts.length];
                  sessionStorage.setItem("client-set", details);
                  this.$dispatch('broadcastEvent', 'displayClientDetails');
                  this.$dispatch('closeSidePanelView');
                }, function(response) {
                  console.log(response);
                });
    },

    demoPopulateForm: function() {
      var d = {
          title: 'Mr',
          firstName: 'James',
          surname: 'Mitchell',
          emailAddress: 'james.mitchell81@live.co.uk',
          telNumber: '07789 558 138',
          contactAddress: {
            firstLine: 'Apt 4, The Gallery',
            secondLine: '2/3 Market Square',
            townCity: 'Northampton',
            postalCode: 'NN1 2DL'
          }
        }

        this.$data = d;
    }
  }
}
</script>

<style>

</style>