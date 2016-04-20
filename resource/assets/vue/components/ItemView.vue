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
          <span>{{ item.dimensions }}</span>
        </span>
      </span>
      <span class="item-row">
        <span class="item-cell">Textual Description:</span>
        <span class="item-cell item-textual-description">{{ item.textualDescription }}</span>
      </span>

      <div class="image-list">
        <div class="image-item" v-for="image in item.images">
          <div class="item-image-wrap">
            <img class="image-upload-preview" :src="image.dataURL" alt="{{ image.filename }}">
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