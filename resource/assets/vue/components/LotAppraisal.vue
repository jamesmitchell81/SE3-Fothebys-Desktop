<template>
  <form action="" @keyup.enter.prevent="" @change="validate">
    <legend>Record Lot Appraisal</legend>

    <span class="form-element">
      <label for="appraisalDate">Appraisal Date
          <span class="msg" transition="msg-hide">Required field</span>
      </label>
      <input type="date" name="appraisalDate" id="appraisalDate" v-model="appraisalDate" required @change="store">
    </span>

    <span class="form-element">
      <label for="">Client</label>

      <span class="btn-group"><!-- v-show -->
        <span>Existing Client</span>
        <button @click.prevent="this.$dispatch('loadSideForm', 'ClientSearchForm')"
                class="btn">Yes</button>
        <button @click.prevent="this.$dispatch('loadSideForm', 'ClientDetailsForm')"
                class="btn">No</button>
      </span>

      <div class="details-display" id="client-details"></div>
    </span>

    <span class="form-element">
      <label for="">Expert</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ExpertSelection')"
              class="btn">Add Expert
            </button>
      <!-- details -->
      <div class="details-display" id="expert-selected-details"></div>
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Category</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'CategorySelection')"
              class="btn">Select Category
            </button>
      <div class="details-display" id="category-details"></div>
    </span>

    <span class="form-element">
      <label for="">Category Specific Attributes</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemAttributeDefinition')"
              class="btn">Set Attributes
            </button>
      <div class="details-display" id="attribute-details"></div>
    </span>

    <span class="form-element">
      <label for="">Classification</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ClassificationSelection')"
              class="btn">Select Classifications
            </button>
      <div class="details-display"  class="details-display" id="classification-details"></div>
    </span>

    <span class="form-element">
      <label for="">Date Period</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'DatePeriodForm')"
              class="btn">
              Add Date Period
        </button>
      <div class="details-display"  class="details-display" id="date-period-details"></div>
    </span>

    <span class="form-element">
      <label for="">Item Dimensions</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemDimensionForm')"
              class="btn">Add Dimensions
            </button>
      <div class="details-display" id="dimension-details"></div>
    </span>

    <span class="form-element">
      <label for="">Item Weight</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemWeightForm')"
              class="btn">Add Item Weight
            </button>
      <div  class="details-display" id="item-weight-details"></div>
    </span>

    <span class="form-element">
      <label for="">Item Images</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'ItemImagesForm')"
              class="btn">Add Images</button>
      <!-- list of filenames -->
      <div class="details-display" id="item-images-details"></div>
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="itemName">Item Name
          <span class="msg" transition="msg-hide" v-if="itemName.length === 0">Required field</span>
      </label>
      <input type="text" name="itemName" id="itemName" v-model="itemName" required @change="store">
    </span>

    <span class="form-element">
      <label for="estimatedPrice">Estimated Price
          <span class="msg" transition="msg-hide" v-if="estimatedPrice.length === 0">Required field</span>
      </label>
      <input type="number" min="1" name="estimatedPrice" id="estimatedPrice" v-model="estimatedPrice" required @change="store">
    </span>

    <span class="form-element">
      <label for="estimatedPrice">Agreed Reserve Price
          <span class="msg" transition="msg-hide" v-if="agreedPrice.length === 0">Required field</span>
      </label>
      <input type="number" min="1" name="agreedPrice" id="agreedPrice" v-model="agreedPrice" required @change="store">
    </span>

    <span class="form-element">
      <label for="textualDescription">Textual Description
          <span class="msg" transition="msg-hide" v-if="textualDescription.length === 0">Required field</span>
      </label>
      <textarea rols="40" cols="20" name="textualDescription" id="textualDescription" v-model="textualDescription" required @change="store">
      </textarea>
    </span>

    <span class="form-element">
      <label for="provenanceDetails">Provenance Details
          <span class="msg" transition="msg-hide" v-if="provenanceDetails.length === 0">Required field</span>
      </label>
      <textarea rols="40" cols="20" name="provenanceDetails" id="provenanceDetails" v-model="provenanceDetails" required @change="store">
      </textarea>
    </span>

    <span class="form-element">
      <label for="">Authenticated</label>
      <span class="form-input-inline">
        <span class="option-item">
          <input type="radio" name="authenticated" id="authenticatedYes" @change="store" v-model="authenticated" value="true">
          <label for="authenticatedYes">Yes</label>
        </span>
        <span class="option-item">
          <input type="radio" name="authenticated" id="authenticatedNo" @change="store" v-model="authenticated" value="false">
          <label for="authenticatedNo">No</label>
        </span>
      </span>
    </span>

    <span class="form-element">
      <label for="additionalNotes">Agreement Signed</label>
      <span class="form-input-inline">
        <span class="option-item">
          <input type="radio" name="agreement" id="agreedYes" @change="store" v-model="agreement" value="true">
          <label for="agreedYes">Yes</label>
        </span>
        <span class="option-item">
          <input type="radio" name="agreement" id="agreedNo" @change="store" v-model="agreement" value="false">
          <label for="agreedNo">No</label>
        </span>
      </span>
    </span>

    <span class="form-element">
      <label for="additionalNotes">Additional Notes</label>
      <textarea rols="40" cols="20" name="additionalNotes" id="additionalNotes" v-model="additionalNotes" @change="store">
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
      var data = {
        textualDescription: '',
        appraisalDate: '',
        agreement: false,
        authenticated: false,
        itemName: "",
        estimatedPrice: "",
        agreedPrice: "",
        provenanceDetails: "",
        additionalNotes: ""
      }
      for ( var prop in data ) {
        if ( data.hasOwnProperty(prop) ) {
          var sess = sessionStorage.getItem(prop);

          if ( sess !== null ) {
            data[prop] = JSON.parse(sess);
          }
        }
      }
      return data;
    },

    ready: function() {
      console.log(this.$route.params.id);
      if ( this.$route.params.id ) {
        // populate session
        this.$http.get("http://localhost:8080/services/lot-item/" + this.$route.params.id).then(
          function(response) {
            var category = {
              id: response.data.category.id,
              name: response.data.category.name
            }

            var dimensions = {
              baseMeasure: response.data.dimensions.baseMeasure,
              height: response.data.dimensions.height,
              length: response.data.dimensions.length,
              width: response.data.dimensions.width
            }

            sessionStorage.setItem("category", JSON.stringify(category));
            sessionStorage.setItem("dimensions", JSON.stringify(dimensions));
            sessionStorage.setItem("attributes", JSON.stringify(response.data.attributes));
            sessionStorage.setItem("productionDate", JSON.stringify(response.data.productionDate));
            sessionStorage.setItem("images", JSON.stringify(response.data.images));

            this.$data.authenticated = response.data.authenticated;
            this.$data.itemName = response.data.itemName;
            this.$data.textualDescription = response.data.textualDescription;
            this.$data.authenticated = response.data.authenticated;
            this.$data.itemName = response.data.itemName;
            this.$data.provenanceDetails = response.data.provenanceDetails;

            this.$http.get("http://localhost:8080/services/lot-item/item-appraisal/" + this.$route.params.id).then(
              function(response) {
                this.$data.estimatedPrice = response.data.estimatedPrice;
                this.$data.agreedPrice = response.data.agreedPrice;
                this.$data.additionalNotes = response.data.additionalNotes;
                this.$data.appraisalDate = response.data.appraisalDate;
                this.$data.agreement = response.data.agreement;

                var expert = {
                  "id": response.data.expert.id,
                  "name": response.data.expert.fullName,
                  "location": response.data.expert.location.name,
                  "email": response.data.expert.emailAddress,
                  "category": response.data.expert.category.name
                }

                var client = {
                  "id": response.data.client.id,
                  "name": response.data.client.fullName,
                  "address": response.data.client.address,
                  "email": response.data.client.emailAddress
                }

                sessionStorage.setItem("client", JSON.stringify(client));
                sessionStorage.setItem("expert", JSON.stringify(expert));

                this.updatePage();
              }, function(error) {
                console.log(error);
              });

          }, function(error) {
            console.log(error);
          });

      } else {
        this.updatePage();
      }

    },

    methods: {
      updatePage: function() {
        this.$dispatch("broadcastEvent", "updateCategory");
        this.$dispatch("broadcastEvent", "updateClassifications");
        this.$dispatch("broadcastEvent", "updateDimensions");
        this.$dispatch("broadcastEvent", "updateDatePeriod");
        this.$dispatch("broadcastEvent", "showExpertDetails");
        this.$dispatch("broadcastEvent", "displayClientDetails");
        this.$dispatch("broadcastEvent", "displayItemWeight");
        this.$dispatch("broadcastEvent", "displayUploadedImages");
        this.$dispatch("broadcastEvent", "displayAttributes");
      },

      validate: function(e) {
        var src = e.target;
        var err = src.parentElement.querySelector(".msg-error");

        if ( err ) {
          if ( !src.validity.valid ) {
            err.style.display = "block";
          } else {
            err.style.display = "none";
          }
        }
      },

      store: function(e) {
        var src = e.target;
        sessionStorage.setItem(src.name, JSON.stringify(src.value));
      },

      submitForm: function() {
        var data = {};
        for ( var i = 0; i < sessionStorage.length; i++ ) {
          var key = sessionStorage.key(i);
          data[key] = JSON.parse(sessionStorage.getItem(key));
        }

        var client = JSON.parse(sessionStorage.getItem("client"));
        var expert = JSON.parse(sessionStorage.getItem("expert"));
        if ( client ) data.client = client.id;
        if ( expert ) data.expert = expert.id;

        // for ( var prop in this.$data ) {
        //   if ( this.$data.hasOwnProperty(prop) ) {
        //     if ( this.$data[prop] === "on" ) {
        //       this.$data[prop] = true;
        //     }
        //     data[prop] = this.$data[prop];
        //   }
        // }

        // if not update
      console.log(this.$route.params.id);
      if ( !this.$route.params.id ) {
        this.$http.post('http://localhost:8080/services/lot-item', JSON.stringify(data))
                  .then(function(response) {
                    if ( response.status === 201 ) {
                      this.$router.go("/lot-items");
                    }
                  }, function(response) {
                    console.log(response);
                  });
        } else {
          this.$http.put('http://localhost:8080/services/lot-item/' + this.$route.params.id, JSON.stringify(data))
                    .then(function(response) {
                      console.log(response);
                      if ( response.status === 204 ) {
                        this.$router.go("/lot-items");
                      }
                    }, function(response) {
                      console.log(response);
                    });
        }

        sessionStorage.clear();
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
              } else {
                var label = prop.split(/(?=[A-Z])/g).join(" ").toUpperCase();
                if ( !(details[prop] === -1) ) {
                  li.innerHTML = label + ": " + "<strong>" + details[prop] + "</strong>";
                }
              }
              ul.appendChild(li);
            }
          }
        }
        return ul;
      },

      displayImageList: function(imageData) {
        var parent = document.getElementById("item-images-details");
        var image = document.createElement("img");
        var wrapper = document.createElement("div");
        var imageWrap = document.createElement("div");
        var span = document.createElement("span");

        span.innerHTML = imageData.filename;
        image.src = imageData.dataURL; //"data:image/" + imageData.extension + ";base64," + imageData.data;
        image.alt = imageData.filename;
        image.classList.add("image-upload-preview-small");
        imageWrap.classList.add("item-image-wrap");
        wrapper.classList.add("image-item-small");
        imageWrap.appendChild(image);
        wrapper.appendChild(imageWrap);
        wrapper.appendChild(span);
        parent.appendChild(wrapper);
      }
    },

    events: {
      updateCategory: function() {
        var details = JSON.parse(sessionStorage.getItem("category"));
        var box = document.getElementById("category-details");
        if ( details ) {
          box.innerHTML = details.name;
          box.classList.add("details-display__displayed");
        }
      },

      updateClassifications: function() {
        var details = JSON.parse(sessionStorage.getItem("classifications"));
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
        this.updateCollectionDetails("dimensions", "dimension-details");
      },
      updateDatePeriod: function() {
        this.updateCollectionDetails("productionDate", "date-period-details");
      },
      showExpertDetails: function() {
        this.updateCollectionDetails("expert", "expert-selected-details");
      },
      displayClientDetails: function() {
        this.updateCollectionDetails("client", "client-details");
      },
      displayItemWeight: function() {
        this.updateCollectionDetails("weight", "item-weight-details");
      },
      displayAttributes: function() {
        this.updateCollectionDetails("attributes", "attribute-details");
      },
      displayUploadedImages: function() {
        var uploadedImages = JSON.parse(sessionStorage.getItem("images")) || [];
        var path = "http://localhost:8080/services/item-images/";
        var parent = document.getElementById("item-images-details");
        parent.innerHTML = "";

        for ( var i = 0; i < uploadedImages.length; i++ ) {
          this.$http.get(path + uploadedImages[i]).then(function(response) {
            this.displayImageList(response.data);
          }, function(response) {
            console.log(response);
          });
        }
      }

    },

  }
</script>

<style>

</style>