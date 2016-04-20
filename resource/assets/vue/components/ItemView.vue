<template>

    <div class="item" data-id="{{ item.id }}">
      <span class="item-row">
        <span class="item-cell">Item Name: {{ item.itemName }}</span>
        <span class="item-cell">Category: {{ item.category.name }}</span>
        <span class="item-cell">
          Classifications:
          <span v-for="classification in item.classifications">{{ classification.name }} </span>
        </span>
        <span class="item-cell">
          <div v-for="attribute in item.attributes">
            <span> {{ attribute.name }}</span>:<span> {{ attribute.value }}</span>
          </div>
        </span>
        <span class="item-cell">
          <div>Date Details</div>
          <div v-if="item.productionDate.productionDate !== ''">Production Date: {{ item.productionDate.productionDate }}</div>
          <div v-if="item.productionDate.dateDescription !== ''">Date Description: {{ item.productionDate.dateDescription }}</div>
          <div v-if="item.productionDate.year !== ''">Year: {{ item.productionDate.year }}</div>
          <div v-if="item.productionDate.yearBetweenStart !== -1 && item.productionDate.yearBetweenEnd !== -1">
            Between: {{ item.productionDate.yearBetweenStart }} and {{ item.productionDate.yearBetweenEnd }}</div>
        </span>
        <span class="item-cell">
          <span>Dimensions: {{ item.dimensions.dimensions }}, {{ item.dimensions.baseMeasure }}</span>
        </span>
        <span class="item-cell">
          <span>Provenance Details: {{ item.provenanceDetails }}</span>
        </span>
        <span class="item-cell">
          <span>Textual Description: {{ item.textualDescription }}</span>
        </span>
      </span>

      <div class="image-list">
        <div class="image-item-small" v-for="image in item.images">
          <div class="item-image-wrap">
            <img class="image-upload-preview-small" :src="image.dataURL" alt="{{ image.filename }}">
          </div>
        </div>
      </div>

    </div>



</template>
<script>

export default {
  name: "ItemView",

  props: ["item"],

  data: function() {
    return {}
  },

  ready: function() {
  }
}
</script>