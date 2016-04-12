<template>
  <form action="">
    <legend>Record Lot Appraisal</legend>

    <span class="form-element">
      <label for="">Client</label>

      <span class="btn-group"><!-- v-show -->
        <span>Existing Client</span>
        <button @click.prevent="this.$dispatch('loadSideForm', 'ClientSearchForm')"
                class="btn">Yes</button>
        <button @click.prevent="this.$dispatch('loadSideForm', 'ClientDetailsForm')"
                class="btn">No</button>
      </span>

      <div id="client-details"></div>
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
      <label for="">Item Dimensions</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemWeightForm')"
              class="btn">Add Item Weight
            </button>
      <div id="item-weight-details"></div>
    </span>

    <span class="form-element">
      <label for="">Item Images</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemImagesForm')" class="btn">Add Images</button>
      <!-- list of filenames -->

      <div id="item-images-details"></div>
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

    <div class="control-bar">
      <div class="control-bar-content">
        <button class='btn'
                @click.prevent="submitForm">
                Complete
        </button>
      </div>
    </div>

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

      this.$http.post('http://localhost:8080/services/lot-item', d)
                .then(function(response) {
                  console.log(response);

                }, function(response) {
                  console.log(response);
                });
      },

      updateDetails: function(details, elem) {

      },

      updateCollectionDetails: function(storagePath, displayPath) {
        var details = JSON.parse(sessionStorage.getItem(storagePath));
        var box = document.getElementById(displayPath);
        box.innerHTML = "";
        if ( details ) {
          var ul = this.makeList(details);
          box.appendChild(ul);
          box.classList.add("details-display__displayed");
        }
      },

      makeList: function(details) {
        var ul = document.createElement("ul");
        for ( var prop in details ) {
          if ( details.hasOwnProperty(prop) ) {
            if ( (details[prop] !== "") && (prop !== "id")) {
              var li = document.createElement("li");
              if ( details[prop] !== null && typeof details[prop] === 'object' ) {
                li.appendChild(this.makeList(details[prop]));
              }
              var label = prop.split(/(?=[A-Z])/g).join(" ");
              li.innerHTML = label + ": " + details[prop];
              ul.appendChild(li);
            }
          }
        }
        return ul;
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
      },
      showExpertDetails: function() {
        this.updateCollectionDetails("expert-selection", "expert-selected-details");
      },
      displayClientDetails: function() {
        this.updateCollectionDetails("client-set", "client-details");
      },
      displayItemWeight: function() {
        this.updateCollectionDetails("item-weight-set", "item-weight-details");
      }

    }, // end of events.

  }
</script>

<style>

</style>