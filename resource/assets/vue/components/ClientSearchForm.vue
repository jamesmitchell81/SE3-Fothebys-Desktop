<template>

  <form method="get" action="http://localhost:8080/services/clients/">
    <fieldset>
      <span class="form-element">
        <label for="title">Email Address</label>
        <input type="text" v-model="emailAddress" @keyup="searchClient | debounce 200">
      </span>
    </fieldset>
    <fieldset>
      <span class="option-item" v-for="client in clients">
        <input type="radio"
               name="client"
               id="client-{{ client.id }}"
               data-index="{{ client.id }}">
        <label @click="setClient(client.id, client.name, client.emailAddress, client.addressFirstLine)"
               for="client-{{ client.id }}">
                    <span style="font-weight:300;">Name:</span> {{ client.name }},
               <br> <span style="font-weight:300;">Address First Line:</span> {{ client.addressFirstLine }},
               <br> <span style="font-weight:300;">Email:</span> {{ client.emailAddress }}</label>
      </span>
    </fieldset>
  </form>
</template>

<script>

  export default {
    name: "ClientSearchForm",

    data: function() {
      return {
        emailAddress: "",
        clients: []
      }
    },

    methods: {
      searchClient: function() {
        var query = "?emailAddress=" + this.$data.emailAddress;
        if ( this.$data.emailAddress.length > 1 ) {
          this.$http.get('http://localhost:8080/services/clients/search-client' + query).then(
            function(response) {
              this.$data.clients = response.data
            }, function(response) {
              console.log(response);
            });
        }
      },

      setClient: function(id, name, address, email) {
        var details = {
          "id": id,
          "name": name,
          "address": address,
          "email": email
        }
        sessionStorage.setItem("client-set", JSON.stringify(details));
        this.$dispatch('broadcastEvent', 'displayClientDetails');
        this.$dispatch('closeSidePanelView');
      }

    }

  }
</script>

<style>

</style>