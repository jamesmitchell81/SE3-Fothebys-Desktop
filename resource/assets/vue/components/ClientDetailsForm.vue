<template>

  <form method="post" action="http://localhost:8080/services/clients" @keyup.enter.prevent="" @change="validate">
    <fieldset>
      <legend>Contact</legend>

      <span class="form-element">
        <label for="title">Title
          <span class="msg" transition="msg-hide" v-if="title.length === 0">Required field</span>
        </label>
        <input pattern="^([^0-9]*)$" type="text" id="title" name="title" v-model="title" required>
        <span class="msg msg-error">Letters only please.</span>
      </span>

      <span class="form-element">
        <label for="firstName">First Name
          <span class="msg" transition="msg-hide" v-if="firstName.length === 0">Required field</span>
        </label>
        <input pattern="^([^0-9]*)$" type="text" id="firstName" name="firstName" v-model="firstName" required>
        <span class="msg msg-error">Letters only please.</span>
      </span>

      <span class="form-element">
        <label for="surname">Surname
          <span class="msg" transition="msg-hide" v-if="surname.length === 0">Required field</span>
        </label>
        <input pattern="^([^0-9]*)$" type="text" id="surname" name="surname" v-model="surname" required>
        <span class="msg msg-error">Letters only please.</span>
      </span>

      <span class="form-element">
        <label for="emailAddress">Email Address
          <span class="msg" transition="msg-hide" v-if="emailAddress.length === 0">Required field</span>
        </label>
        <input type="email" id="emailAddress" name="emailAddress" v-model="emailAddress" required>
        <span class="msg msg-error">Email address appears to be invalid.</span>
      </span>

      <span class="form-element">
        <label for="telNumber">Telephone Number
          <span class="msg" transition="msg-hide" v-if="telNumber.length === 0">Required field</span>
        </label>
        <input pattern="^([0-9-\s]*)$" type="tel" id="telNumber" name="telNumber" v-model="telNumber" required>
        <span class="msg msg-error">Please only use numbers hyphans (-) or spaces.</span>
      </span>
    </fieldset>


    <fieldset>
      <legend>Address</legend>

      <span class="form-element">
        <label for="firstLine">First Line
          <span class="msg" transition="msg-hide" v-if="contactAddress.firstLine.length === 0">Required field</span>
        </label>
        <input type="text" id="firstLine" name="firstLine" v-model="contactAddress.firstLine" required>
      </span>

      <span class="form-element">
        <label for="secondLine">Second Line</label>
        <input type="text" id="secondLine" name="secondLine" v-model="contactAddress.secondLine">
      </span>

      <span class="form-element">
        <label for="townCity">Country of Residence
          <span class="msg" transition="msg-hide" v-if="!country.selected">Required field</span>
        </label>
        <select type="text" id="country" name="country" v-model="country">
            <option value="">Please Select</option>
            <option value="{{ c.shortCode }}" v-for="c in countries">
              {{ c.shortCode }} {{ c.name }}
            </option>
        </select>
      </span>

      <span class="form-element">
        <label for="townCity">Town/City
          <span class="msg" transition="msg-hide" v-if="contactAddress.townCity.length === 0">Required field</span>
        </label>
        <input pattern="^([^0-9]*)$" type="text" id="townCity" name="townCity" v-model="contactAddress.townCity" required>
      </span>

      <span class="form-element">
        <label for="postalCode">Postal Code
          <span class="msg" transition="msg-hide" v-if="contactAddress.postalCode.length === 0">Required field</span>
        </label>
        <input type="text" id="postalCode" name="postalCode" v-model="contactAddress.postalCode" required>
      </span>
    </fieldset>

      <button @click.prevent="saveClientDetails" class="btn side-bar-confirm">Confirm</button>
  </form>

</template>

<script>

export default {
  name: "ClientDetailsForm",

  data: function() {
    return {
      id: 0,
      countries: [],
      title: '',
      firstName: '',
      surname: '',
      emailAddress: '',
      telNumber: '',
      country: '',
      contactAddress: {
        firstLine: '',
        secondLine: '',
        townCity: '',
        postalCode: ''
      }
    }
  },

  ready: function() {
    var detailSet = sessionStorage.getItem("client-set");
    if ( detailSet !== null ) {
      var data = JSON.parse(detailSet);
      this.setData(data);
    }

    this.$http.get('http://localhost:8080/services/countries').then(
      function(response) {
        this.$data.countries = response.data;
      },function(response) {
        console.log(response);
      });
  },

  methods: {
    setData: function(data) {
      for ( var prop in data ) {
        if ( data.hasOwnProperty(prop) && this.$data.hasOwnProperty(prop) ) {
          this.$data[prop] = data[prop];
        }
      }
    },

    validate: function(e) {
      var src = e.target;
      var err = src.parentElement.querySelector(".msg-error");

      if ( err ) {
        if ( !src.validity.valid ) {
          err.style.display = "block";
        } else {
          err.style.display = "none";
        }
      }
    },

    saveClientDetails: function() {
      var form = document.querySelector('form');
      var action = form.action;
      var method = form.method;
      var details = this.$data;
      delete details["countries"];

      details = JSON.stringify(details);

      console.log(details);

      if ( this.$data.id == 0 ) {
        this.$http.post('http://localhost:8080/services/clients', details).then(
          function(response) {
              var location = response.headers("location");
              var parts = location.split("/");
              details = JSON.parse(details);
              details.id = parts[parts.length - 1];
              sessionStorage.setItem("client", JSON.stringify(details));
              this.$dispatch('broadcastEvent', 'displayClientDetails');
              this.$dispatch('closeSidePanelView');
          }, function(response) {
              console.log(response);
          });
      } else {
        this.$http.put('http://localhost:8080/services/clients/' + this.$data.id, details).then(
          function(response) {
              this.$dispatch('broadcastEvent', 'displayClientDetails');
              this.$dispatch('closeSidePanelView');
          }, function(response) {
              console.log(response);
          });
      }
    },
  }
}
</script>

<style>

</style>