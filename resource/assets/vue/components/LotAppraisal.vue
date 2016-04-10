<template>
  <form action="">

    <span class="form-element">
      <label for="">Client</label>

      <span class="btn-group"><!-- v-show -->
        <span>Existing Client</span>
        <button @click.prevent="this.$dispatch('loadSideForm', 'ClientSearchForm')"
                class="btn">Yes</button>
        <button @click.prevent="this.$dispatch('loadSideForm', 'ClientDetailsForm')"
                class="btn">No</button>
      </span>

      <!-- details -->
      <ul>
        <li>Name: Client Name</li>
        <li>Details:
          <ul>
            <li>Email: Email</li>
            <li>Tel: Tel</li>
          </ul>
        </li>
      </ul>
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Expert</label>

      <button @click.prevent="this.$dispatch('loadSideForm', 'ExpertSelection')"
              class="btn">Add Expert
            </button>

      <!-- details -->
      <ul>
        <li>Name: Expert Name</li>
        <li>Specialities:
          <ul>
            <li>Speciality</li>
            <li>Speciality</li>
          </ul>
        </li>
      </ul>
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Category</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'CategorySelection')"
              class="btn">Select Category
            </button>

      <!-- details -->
      <ul>
        <li>Category: Category Name</li>
      </ul>
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Date Period</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'DatePeriodForm')"
              class="btn">
              Add Date Period
        </button>

      <!-- details -->
      <ul>
        <li>Key: Value</li>
      </ul>
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Item Dimensions</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemDimensionForm')"
              class="btn">Add Dimensions
            </button>

      <!-- details-->
      <ul>
        <li>Key: Value</li>
      </ul>
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Item Images</label>
      <span @click.prevent="this.$dispatch('loadSideForm', 'ItemImagesForm')" class="btn">Add Images</span>

      <!-- list of filenames -->

      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="itemName">Item Name</label>
      <input type="text" v-model="itemName">
    </span>

    <span class="form-element">
      <label for="estimatedPrice">Estimated Price</label>
      <input type="number" min="1" v-model="estimatedPrice">
    </span>

    <span class="form-element">
      <label for="textualDescription">Textual Description</label>
      <textarea rols="40" cols="20" v-model="textualDescription">
      </textarea>
    </span>

    <span class="form-element">
      <label for="provenanceDetails">Provenance Details</label>
      <textarea rols="40" cols="20" v-model="provenanceDetails">
      </textarea>
    </span>

    <span class="form-element">
      <label for="">Authenticated</label>
      <span class="form-input-inline">
        <span class="option-item">
          <input type="radio" name="authenticated" id="authenticatedYes">
          <label for="authenticatedYes">Yes</label>
        </span>
        <span class="option-item">
          <input type="radio" name="authenticated" id="authenticatedNo">
          <label for="authenticatedNo">No</label>
        </span>
      </span>
    </span>

    <span class="form-element">
      <label for="additionalNotes">Agreement Signed</label>
      <span class="form-input-inline">
        <span class="option-item">
          <input type="radio" name="agreement" id="agreedYes">
          <label for="agreedYes">Yes</label>
        </span>
        <span class="option-item">
          <input type="radio" name="agreement" id="agreedNo">
          <label for="agreedNo">No</label>
        </span>
      </span>
    </span>

    <span class="form-element">
      <label for="additionalNotes">Additional Notes</label>
      <textarea rols="40" cols="20" v-model="additionalNotes">
      </textarea>
    </span>

  </form>
</template>

<script>

  export default {
    name: "LotAppraisalForm",

    data: function() {
      return {
        agreement: false,
        authenticated: false,
        itemName: "",
        estimatedPrice: "",
        provenanceDetails: "",
        additionalNotes: ""
      }
    },

    methods: {
      submitForm: function() {
      var form = document.querySelector('form');
      var action = form.action;
      var method = form.method;

      var d = JSON.stringify(this.$data);

      this.$http.post('http://localhost:8080/services/clients', d)
                .then(function(response) {
                  console.log(response);
                  this.$dispatch('sendToParentForm', 'ClientDetailsForm', response.data);
                  this.$root.clearData(this.$data);
                  this.$dispatch('closeSidePanelView');
                }, function(response) {
                  console.log(response);
                });
      }
    }
  }
</script>

<style>

</style>