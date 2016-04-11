<template>

  <form action="">
    <fieldset>
      <legend>Item Image Upload</legend>
      <span class="form-element">
        <input class="drop-zone-input"
               type="file"
               name="image-input"
               id="image-input" multiple @change="changed">
        <label class="drop-zone" for="image-input" @drop="dropped">
          DROP IMAGE[S] or FOLDER HERE
        </label>
      </span>
    </fieldset>

    <fieldset>
      <legend>Image List</legend>
      <div id="image-list">
        <div class="image-item" v-for="image in images">
          <img src="" alt="">
          <span>filename</span>
          <span class="btn">action</span>
        </div>
      </div>
    </fieldset>

    <button @click.prevent="confirm"
            class="btn side-bar-confirm">Confirm</button>

  </form>

</template>

<script>
  export default {
    name: "ItemImagesForm",

    data: function() {
      return {
        images: [],
        files: []
      }
    },

    ready: function() {
      // get the images for this item.
      // this.$http.get('http://localhost:8080/services/item-images/item/1')
      //           .then(function(response) {
      //             console.log(response);
      //             this.images = response.data;
      //           }, function(err) {
      //             this.images = [];
      //             console.log(err);
      //           });

    },

    methods: {
      dropped: function(e) {

      },

      changed: function(e) {
        console.log(e.target.files);
      },

      addImages: function() {
        // preview.file = file.

        // REFERENCE: https://developer.mozilla.org/en/docs/
        // Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
        var fr = new FileReader();
        fr.onload = (function(img) {
          return function(e) {
            img.src = e.target.result;
          };
        }) (preview);

        fr.readAsDataURL(file);
      }

      confirm: function() {
        // close form.
      }
    }

  }
</script>