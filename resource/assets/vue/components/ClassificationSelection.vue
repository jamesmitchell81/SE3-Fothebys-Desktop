<template>
  <form method="" action="">
    <legend>Classification Selection</legend>

      <span class="option-item" v-for="classification in classifications">
        <input type="checkbox"
               name="classification"
               id="{{ classification.name | lowercase }}"
               data-index="{{ classification.id }}">
        <label @click="setClassification(classification.id, classification.name)"
               for="{{ classification.name | lowercase }}">{{ classification.name }}</label>
      </span>

      <button @click.prevent="setClassifications"
              class="btn side-bar-confirm">Confirm</button>

  </form>
</template>

<script>

  export default {

    data: function() {
      return {
        classifications: []
      }
    },

    ready: function() {
      this.$http.get('http://localhost:8080/services/classification')
                .then(function(response) {
                  this.classifications = response.data;
                }, function(err) {
                  this.classifications = [];
                  console.log(err);
                });
    },

    methods: {
      setClassification: function(id, name) {
        var detail = {
          "id"   : id,
          "name" : name
        };
        var data = sessionStorage.getItem("classifications-selection");
        var details =  JSON.parse(data) || [];
        details.push(detail);
        sessionStorage.setItem("classifications-selection", JSON.stringify(details));
      },

      setClassifications: function() {
        this.$dispatch('broadcastEvent', 'updateClassifications');
        this.$dispatch('closeSidePanelView');
      }
    }
  }

</script>