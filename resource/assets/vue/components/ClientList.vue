<template>

  <client-search-form>
  </client-search-form>

  <div v-for="client in clients">
      <span>Name: <span>{{ client.fullName }}</span></span>
      <span>Email: <span>{{ client.emailAddress }}</span></span>
  </div>


</template>

<script>
var ClientSearchForm = require('./ClientSearchForm.vue');

export default {

  name: "ClientList",

  components: {
    ClientSearchForm
  },

  data: function() {
    return {
      clients: []
    }
  },

  route: {
    activate: function() {

      this.$http.get('http://localhost:8080/services/clients')
                .then(function(response) {
                  console.log(response);
                  this.$data.clients = response.data;
                }, function(response) {
                  console.log(response);
                });



    }
  }

}

</script>

<style>

</style>