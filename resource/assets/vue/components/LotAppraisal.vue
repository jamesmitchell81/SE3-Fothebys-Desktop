<template>
  <form action="">
<!--
  @ManyToOne private Client client;
  @ManyToOne private Category category;
  @ManyToOne private Expert expert;

  @Embedded private DatePeriod productionDate;
  @Embedded private ItemDimensions dimensions;
-->

    <span class="form-element">
      <label for="">Client</label>
      <!-- <button @click.prevent="" class="btn">Add Date Period</button> -->
      <!-- details -->
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Expert</label>
      <!-- <button @click.prevent="" class="btn">Add Date Period</button> -->

      <!-- details -->
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Category</label>
      <button @click.prevent="" class="btn">Select Category</button>

      <!-- details -->
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Date Period</label>
      <button @click.prevent="this.$dispatch('loadSideForm', 'DatePeriodForm')"
              class="btn">
              Add Date Period
        </button>

      <!-- details -->
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Item Dimensions</label>
      <button @click.prevent="" class="btn">Add Dimensions</button>

      <!-- details-->
      <!-- edit -->
    </span>

    <span class="form-element">
      <label for="">Item Images</label>
      <button @click.prevent="" class="btn">Add Images</button>

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
      <label for="additionalNotes">Additional Notes</label>
      <textarea rols="40" cols="20" v-model="additionalNotes">
      </textarea>
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

  </form>
</template>

<script>

  export default {


    data: function() {
      return {
        agreement: {

        }
      }
    }
  }
</script>

<style>

</style>