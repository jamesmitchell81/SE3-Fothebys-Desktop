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
      <div id="expert-selected-details"></div>
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Category</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'CategorySelection')"
              class="btn">Select Category
            </button>
      <div id="category-details"></div>
    </span>

    <span class="form-element">
      <label for="">Classification</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ClassificationSelection')"
              class="btn">Select Classifications
            </button>
      <div id="classification-details"></div>
    </span>

    <span class="form-element">
      <label for="">Date Period</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'DatePeriodForm')"
              class="btn">
              Add Date Period
        </button>
      <div id="date-period-details"></div>
    </span>

    <span class="form-element">
      <label for="">Item Dimensions</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemDimensionForm')"
              class="btn">Add Dimensions
            </button>
      <div id="dimension-details"></div>
    </span>

    <span class="form-element">
      <label for="">Item Images</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemImagesForm')" class="btn">Add Images</button>

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
        additionalNotes: "",
        category: ""
      }
    },

    ready: function() {
      // relaod all the displayed data on reload.
      this.$dispatch("broadcastEvent", "updateCategory");
      this.$dispatch("broadcastEvent", "updateClassifications");
      this.$dispatch("broadcastEvent", "updateDimensions");
      this.$dispatch("broadcastEvent", "updateDatePeriod");
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
      },

      updateDetails: function(details, elem) {

      },

      updateCollectionDetails: function(storagePath, displayPath) {
        var details = JSON.parse(sessionStorage.getItem(storagePath));
        console.log(details);
        var box = document.getElementById(displayPath);
        box.innerHTML = "";
        if ( details ) {
          var ul = document.createElement("ul");
          for ( var prop in details ) {
            if ( details.hasOwnProperty(prop) ) {
              if ( details[prop] !== "" ) {
                var li = document.createElement("li");
                var label = prop.split(/(?=[A-Z])/g).join(" ");
                li.innerHTML = label + ": " + details[prop];
                ul.appendChild(li);
              }
            }
          }
          box.appendChild(ul);
          box.classList.add("details-display__displayed");
        }
      }
    },

    events: {
      updateCategory: function() {
        var details = JSON.parse(sessionStorage.getItem("category-selected"));
        var box = document.getElementById("category-details");
        if ( details ) {
          box.innerHTML = details.name;
          box.classList.add("details-display__displayed");
        }
      },

      updateClassifications: function() {
        var details = JSON.parse(sessionStorage.getItem("classifications-selection"));
        var box = document.getElementById("classification-details");
        box.innerHTML = "";
        if ( details ) {
          var ul = document.createElement("ul");
          for ( var i = 0; i < details.length; i++ ) {
            var li = document.createElement("li");
            li.innerHTML = details[i].name;
            ul.appendChild(li);
          }
          box.appendChild(ul);
          box.classList.add("details-display__displayed");
        }
      },
      updateDimensions: function() {
        this.updateCollectionDetails("dimensions-set", "dimension-details");
      },
      updateDatePeriod: function() {
        this.updateCollectionDetails("date-period-set", "date-period-details");
      }

    }, // end of events.

  }
</script>

<style>

</style>