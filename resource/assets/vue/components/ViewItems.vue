<template>

<div>
  <form action="">
    <fieldset>
      <legend>Search Items</legend>

      <span class="form-element">
        <label for="">Name</label>
        <input type="text" v-model="searchName" @keyup="searchItem | debounce 200">
      </span>

    </fieldset>
  </form>

  <div class="page-notification" v-if="items.length === 0">
    You have currently have no items...
  </div>

  <div class="item-list-view">
    <div v-for="item in items" class="item-list" data-id="{{ item.id }}" @click="select">
      <span class="item-list-columns">
        <span class="item-list-column">
          <span class="item-list-cell">Item Name: <span class="item-list-cell-value">{{ item.itemName }}</span></span>
          <span class="item-list-cell">Category: <span class="item-list-cell-value">{{ item.category.name }}</span></span>
          <span class="item-list-cell">
            Classifications:
            <span v-for="classification in item.classifications"><span class="item-list-cell-value">{{ classification.name }}</span></span>
          </span>
          <span class="item-list-cell">
            <div v-for="attribute in item.attributes">
              <span> {{ attribute.name }}</span>:<span class="item-list-cell-value"> {{ attribute.value }}</span>
            </div>
          </span>
        </span>
        <span class="item-list-column">
          <span class="item-list-cell">Textual Description:</span>
          <span class="item-list-cell item-list-textual-description">{{ item.textualDescription }}</span>
        </span>
      </span>

      <div class="image-list">
        <div class="image-item-small" v-for="image in item.images">
          <div class="item-image-wrap">
            <img class="image-upload-preview" :src="image.dataURL" alt="{{ image.filename }}">
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="control-bar" v-show="selected !== 0">
    <div class="item-list-controls">
      <button class="btn" @click.prevent="go" data-route-name="item.view">View</button>
      <button class="btn" @click.prevent="go" data-route-name="item.update">Update</button>
      <button class="btn" @click.prevent="go" data-route-name="item.delete">Delete</button>
      <button class="btn" @click.prevent="go" data-route-name="item.page.design">Design Page</button>
    </div>
  </div>

</div><!-- end -->

</template>
<script>

export default {
  name: "ViewItems",

  data: function() {
    return {
      items: [],
      selected: 0
    }
  },

  ready: function() {
    var path = "http://localhost:8080/services/lot-item";

    this.$http.get(path).then(
      function(response) {
        this.$data.items = response.data;
        console.log(response);
        // get the correct images.
        for ( var j = 0; j < this.$data.items.length; j++ ) {
          var images = this.$data.items[j].images;
          var realImages = [];
          for ( var i in images ) {
            var id = images[i];
            this.$http.get("http://localhost:8080/services/item-images/" + id).then(
              function(response) {
                realImages.push(response.data);
              }, function(response) {
                console.log(response);
              });
          }
          this.$data.items[j].images = realImages;
          this.$data.items[j].displayImage = realImages[0];
        }

    }, function(response) {
      console.log(response);
    });


  },

  methods: {
    search: function() {

    },

    select: function(e) {
      var src = e.target;
      var tag = src.parentElement;

      while ( !tag.hasAttribute("data-id") ) {
        if ( tag.tagName === "BODY" ) break;

        tag = tag.parentElement;
      }

      this.$data.selected = tag.getAttribute("data-id");
    },

    go: function(e) {
      var src = e.target;
      var routename = src.getAttribute("data-route-name");
      this.$router.go({ name: routename, params:{ id: this.$data.selected } });
    }
  }

}

</script>