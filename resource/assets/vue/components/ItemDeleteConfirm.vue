<template>

  <div>

    <div class="item-view">
      <h3>
        Are you sure you want to delete this item?
      </h3>
      <item-view v-for="item in items" :item="item"></item-view>
    </div>

    <div class="control-bar">
      <div class="item-list-controls">
        <button class="btn" @click.prevent="delete">Delete</button>
        <button class="btn" @click.prevent="go" data-route-name="items.view">Return</button>
      </div>
    </div>

  </div>

</template>
<script>
var ItemView = require('./ItemView.vue');

export default {
  name: "ItemDeleteConfirm",

  components: {
    ItemView
  },

  data: function() {
    return {
      id: 0,
      items: []
    }
  },

  ready: function() {
    var path = "http://localhost:8080/services/lot-item/" + this.$route.params.id;
    this.$data.id = this.$route.params.id;
    this.$http.get(path).then(
      function(response) {
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
    delete: function() {
      var path = "http://localhost:8080/services/lot-item/" + this.$data.id;
      this.$http.delete(path).then(
        function(response) {
          if ( response.status === 200 ) {
            this.$router.go({ name: 'items.view' });
          }
      }, function(response) {
        console.log(response);
      })
    },

    go: function(e) {
      var src = e.target;
      var routename = src.getAttribute("data-route-name");
      this.$router.go({ name: routename });
    }
  }
}
</script>

