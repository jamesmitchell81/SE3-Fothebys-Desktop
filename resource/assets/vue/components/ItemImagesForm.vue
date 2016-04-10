<template>

  <div>
    <div class='drop-zone'>
      DROP IMAGE[S] or FOLDER HERE
    </div>

    <ul class="images-list">
      <li v-for="image in images">
        <img src="" alt="{{ image.alt }}">
        <span class="input-btn-group">
          <input type="text" value="{{ image.name }}">
          <button class="btn">Remove</button>
        </span>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: "ItemImagesForm",

    components: {
    },

    data: function() {
      return {
        images: []
      }
    },

    ready: function() {
      this.images = [
        { id: 1, name: "james", alt: "rules"}
      ]
    }

  }
</script>

<style>

.drop-zone {
  width: 70%;
  margin: 0 auto;
  padding: 5em 0;
  background: #cacaca;
  border-radius: 10px;
  text-align: center;
}

.images-list {
  width: 70%;
  margin: 2em auto 0 auto;
}

.input-btn-group {
  width: 100%;
}

.input-btn-group input {
  width: 70%;
  display: inline-block;
}

.input-btn-group button {
  width: 20%;
  display: inline-block;
}

</style>