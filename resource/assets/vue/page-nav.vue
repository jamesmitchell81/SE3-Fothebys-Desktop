<template>
  <div class="nav-tiles">

    <tile v-for="tile in tiles"
          :tile="tile"></tile>

  </div>
</template>

<script>
var Tile = require("./tile.vue");

  export default {
    name: 'PageNav',

    components: {
      Tile
    },

    data: function() {
      return {
        tiles: [
          { name: "Add Item", url: "/page/lot-items/add-item" },
          { name: "Arrange Appraisal", url: "/page/lot-items/arrange-appraisal" }
        ]
      }
    }

    // route: {
    //   activate: function(transition) {
    //     console.log("Activated");
    //     console.log(transition.to.path);
    //   }
    // }

    // data: function() {
    //   return 1;
    // }
  }
</script>