<template>

  <form method="get" action="http://localhost:8080/services/clients/">

    <span class="form-element">
      <label for="surname">Surname</label>
      <input type="text" v-model="surname">
    </span>

    <span class="form-element">
      <label for="title">Email Address</label>
      <input type="email" v-model="emailAddress">
    </span>

    <span class="form-element">
      <label for="telNumber">Telephone Number</label>
      <input type="text" v-model="telNumber">
    </span>

    <button class="btn" @click.prevent="searchClient">Search</button>

  </form>
</template>

<script>

  export default {
    name: "ClientSearchForm",

    data: function() {
      return {
        emailAddress: "",
        surname: "",
        telNumber: ""
      }
    },

    methods: {
      searchClient: function() {

        var query = "?";
        var data = this.$data;

        for ( var prop in data ) {
          if ( data.hasOwnProperty(prop) ) {
            // if ( !data[prop].length === 0 ) {
              query += ( prop + "=" + data[prop] + "&");
            // }
          }
        }
        query = query.slice(0, -1);
        console.log(query);

        this.$http.get('http://localhost:8080/services/clients/search-client' + query)
                  .then(function(response) {
                    console.log(response)
                  }, function(response) {
                    console.log(response);
                  });
      }
    }

  }
</script>

<style>

</style>