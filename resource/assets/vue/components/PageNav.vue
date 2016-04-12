<template>
  <div class="nav-tiles">

    <tile v-for="tile in tiles"
          :tile="tile"></tile>

  </div>
</template>

<script>
var Tile = require("./Tile.vue");
// var d = require("./data.js");

  export default {
    name: 'PageNav',

    components: {
      Tile
    },

    data: function() {
      return {
        tiles: [
          { name: "Add Item", url: "/lot-items/add-item" },
          { name: "Arrange Appraisal", url: "/lot-items/arrange-appraisal" },
          { name: "Record Lot Appraisal", url: "/lot-items/record-appraisal" },
          { name: "Define Categories", url: "/lot-items/define-categories" }
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