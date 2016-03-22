<template>
  <span class="option-item">
    <input :type="type" :name="name" id="{{ item.name | lowercase }}">
    <label for="{{ item.name | lowercase }}">{{ item.name }}</label>
  </span>
</template>

<script>
  export default {
    name: "OptionItem",

    props: {
      type: String,
      item: Object,
      name: String
    },

    // computed: {
    //   type: function() {
    //     return this.type;
    //   }
    // }
  }
</script>

<style>
/*.option-item {

}

.option-item input[type='checkbox'] {
  display: none;
}


.option-item input[type='checkbox']:checked + label {
  background: #000;
  color: #fff;
}*/
</style>