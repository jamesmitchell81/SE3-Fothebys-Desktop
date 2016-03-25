<template>

  <table>
    <thead>
      <tr>

      </tr>
    </thead>
    <tbody>
      <tr v-for="client in clients">
        <td>{{ client.firstName }}</td>
        <td>{{ client.surname }}</td>
        <td>{{ client.emailAddress }}</td>
      </tr>
    </tbody>
  </table>

</template>

<script>

  export default {

    name: "ClientList",

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