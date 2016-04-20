<template>

  <div>
    <item-view v-for="item in items" :item="item"></item-view>



    <div class="control-bar">
      <div class="item-list-controls">
        <button class="btn" @click.prevent="go" data-route-name="items.view">Return</button>
        <button class="btn" @click.prevent="go" data-route-name="item.update">Update</button>
        <button class="btn" @click.prevent="go" data-route-name="item.delete">Delete</button>
        <button class="btn" @click.prevent="go" data-route-name="item.page.design">Design Page</button>
      </div>
    </div>

  </div>

</template>
<script>
var ItemView = require('./ItemView.vue');

export default {
  name: "ViewItem",

  components: {
    ItemView
  },

  data: function() {
    return {
      items: []
    }
  },

  ready: function() {
    var id = this.$route.params.id;
    var path = "http://localhost:8080/services/lot-item/" + id;

    this.$http.get(path).then(
      function(response) {
        console.log(response);
        this.$data.items.push(response.data);
        var images = response.data.images;
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

        this.$data.items[0].images = realImages;
      }, function(response) {
        console.log(response);
      });

  },

  methods: {
    go: function(e) {
        var src = e.target;
        var routename = src.getAttribute("data-route-name");
        this.$router.go({ name: routename, params:{ id: this.$route.params.id } });
    }
  }

}
</script>