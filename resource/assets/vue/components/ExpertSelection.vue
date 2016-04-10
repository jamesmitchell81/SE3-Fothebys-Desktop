<template>

  <form action="">
    <fieldset>
      <legend>Expert Selection</legend>
      <span class="form-element">
        <label for="date-description">Expert Search</label>
        <input @keyup="searchExperts | debounce 500" type="text" v-model="expertSearch">
      </span>
    </fieldset>

    <fieldset>

      <span class="option-item" v-for="expert in experts">
        <input type="radio"
               name="expert"
               id="expert-{{ expert.id }}"
               data-index="{{ expert.id }}">
        <label @click="setExpert(expert.id, expert.fullName, expert.location.name, expert.emailAddress)"
               for="expert-{{ expert.id }}">{{ expert.fullName }}, {{ expert.location.name }}, {{ expert.emailAddress }}</label>
      </span>

    </fieldset>
  </form>

</template>

<script>

  export default {
    name: "ExpertSelection",

    data: function() {
      return {
        expertSearch: "",
        experts: []
      }
    },

    ready: function() {
      this.$http.get('http://localhost:8080/services/expert')
                .then(function(response) {
                  this.experts = response.data;
                }, function(err) {
                  this.experts = [];
                  console.log(err);
                });
    },

    methods: {
      searchExperts: function() {
        console.log(this.$data.expertSearch);
      },

      setExpert: function(id, name, location, email) {
        var details = {
          "id": id,
          "name": name,
          "location": location,
          "email": email
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