<template>
  <div class='nav-core'
       @click="swapView(view)">{{ name }}</div>
</template>

<script>
export default {
  props: ['name', 'view'],

  methods: {
    swapView(newView) {
      console.log(newView);
      this.$parent.view = newView;
    }
  }
}
</script>

<style>
.nav-core {
  padding: 2em 0 2em 3em;
  cursor: pointer;
}
</style>