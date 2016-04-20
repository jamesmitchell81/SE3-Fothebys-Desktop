<template>

  <form action="">
    <fieldset>
      <legend>Expert Selection</legend>
      <span class="form-element">
        <label for="date-description">Expert Search</label>
        <input @keyup="searchExperts | debounce 200" type="text" v-model="emailAddress">
      </span>
    </fieldset>

    <fieldset>

      <span class="option-item" v-for="expert in experts">
        <input type="radio"
               name="expert"
               id="expert-{{ expert.id }}"
               data-index="{{ expert.id }}">
        <label @click="setExpert(expert.id, expert.name, expert.location.name, expert.emailAddress, expert.category.name)"
               for="expert-{{ expert.id }}">
                    <span style="font-weight:300;">Name:</span> {{ expert.name }},
               <br> <span style="font-weight:300;">Location:</span> {{ expert.location.name }},
               <br> <span style="font-weight:300;">Email:</span> {{ expert.emailAddress }},
               <br> <span style="font-weight:300;">Specialisation:</span> {{ expert.category.name }}</label>
      </span>

    </fieldset>
  </form>

</template>

<script>

  export default {
    name: "ExpertSelection",

    data: function() {
      return {
        emailAddress: "",
        experts: []
      }
    },

    ready: function() {

    },

    methods: {
      searchExperts: function() {
        var query = "?emailAddress=" + this.$data.emailAddress;
        console.log(query);
        if ( this.$data.emailAddress.length > 1 ) {
          this.$http.get('http://localhost:8080/services/expert/search' + query).then(
            function(response) {
              this.$data.experts = response.data
            }, function(response) {
              console.log(response);
            });
        }
      },

      setExpert: function(id, name, location, email, category) {
        var details = {
          "id": id,
          "name": name,
          "location": location,
          "email": email,
          "category": category
        }
        sessionStorage.setItem("expert-selection", JSON.stringify(details));
        this.$dispatch('broadcastEvent', 'showExpertDetails');
        this.$dispatch('closeSidePanelView');
      }
    },

  }

</script>

<style>

</style>