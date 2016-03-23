<template>
      <a class="nav-tile" v-link="href">{{ tile.name }}</a>
    </div>
</template>

<script>
  export default {
    name: "Tile",

    props: {
      tile: Object
    },

    computed: {
      href() {
        return this.tile.url;
      }
    }
  }
</script>