<template>
  <form method="POST" action="/">

    <!-- client details -->
    <span class="form-element">
      <label for="">Client</label>
      <span class="btn-group">
        <span>Existing Client</span>
        <button @click.prevent="this.$dispatch('loadSideForm', 'ClientSearchForm')" class="btn">Yes</button><!-- /arrange-appraisal/client-search.vue -->
        <button @click.prevent="this.$dispatch('loadSideForm', 'ClientDetailsForm')" class="btn">No</button><!-- /arrange-appraisal/client-details.vue -->
      </span>
    </span>
      <!-- search or enter details -->
      <div v-show="showClientDetails">
        <client-details :details="clientDetails"></client-details>
      </div>

      <!-- <router-view></router-view> -->

    <!-- item name -->
    <span class="form-element">
      <label for="item-name">Item Name</label>
      <input type="text" id="itemName" name="itemName" v-model="itemName">
    </span>

    <!-- category -->
    <span class="form-element">
      <label for="">Category</label>
      <button class="btn"
              @click.prevent="this.$dispatch('loadSideForm', 'CategorySelection')">
              Select Category
            </button>
      <!-- display selected category and classification -->
    </span>

    <!-- ... -->
    <!-- on click -> get experts related -->

    <!-- list of experts related to category -->
    <span class="form-element">
      <label for="">Expert</label>
      <!-- ... -->

    </span>

    <span class="form-element">
      <label for="">Agreed date for Appraisal</label>
      <input type="date">
    </span>

    <button class='btn'>Submit</button>

  </form>
</template>

<script>
  var ClientDetails = require('./ClientDetails.vue');
  var DataStore = require('../data.js');

  export default {
    name: "ArrangeAppraisal",

    components: {
      ClientDetails
    },

    data: function() {
      return {
        showClientDetails: false,
        clientDetails: DataStore.clientDetails,
        categories: [],
        itemName: ''
      }
    },

    methods: {
      loadSideForm: function(form) {
        console.log(form);
      }
    },

    events: {
      ClientDetailsForm: function(data) {
        this.$data.clientDetails = data;



        this.showClientDetails = true;
        return true;
      }
    }

  }
</script>

<style>

</style>