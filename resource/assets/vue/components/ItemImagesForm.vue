<template>

  <form action="">
    <fieldset>
      <legend>Item Image Upload</legend>
      <span class="form-element">
        <input class="drop-zone-input"
               type="file"
               name="image-input"
               id="image-input" multiple @change="changed">
        <label droppable="true" class="drop-zone" for="image-input" @drop.stop="dropped">
          DROP IMAGE[S] or FOLDER HERE
        </label>
      </span>
    </fieldset>

    <fieldset>
      <legend>Image List</legend>

      <button @click.prevent="uploadAll"
              class="btn"
              style="width:100%;"
              v-show="images.length > 1">
        Upload All
      </button>

      <div id="image-list">
        <div class="image-item" v-for="image in images">
          <div class="item-image-wrap">
            <img :src="image.src" alt="image preview" class="image-upload-preview">
          </div>
          <input type="text" class="image-filename" v-model="image.filename">
          <button @click.prevent="action(image.index)"
                  class="image-upload-btn"
                  data-action="{{ image.action | lowercase }}">{{ image.action | capitalize }}</button>
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
      var sess = sessionStorage.getItem("uploaded-images");

      if ( sess !== null ) {
        sess = JSON.parse(sess);
        for ( var i = 0; i < sess.length; i++ ) {
          var id = sess[i];
          this.$http.get('http://localhost:8080/services/item-images/' + id).then(
            function(response) {
              var image = {
                id: response.data.id,
                index: this.$data.images.length,
                src: "data:image/" + response.data.extension + ";base64," + response.data.data,
                extension: response.data.extension,
                filename: response.data.filename,
                action: "remove",
              }
              this.$data.images.push(image);
            }, function(err) {
              this.images = [];
              console.log(err);
            });
        }
      }

    },

    methods: {
      dropped: function(e) {
        e.preventDefault();
        e.stopPropagation();
        var data = e.dataTransfer;
        var files = data.files;

        this.addImages(files);
      },

      draggedover: function(e) {
        e.preventDefault();
      },

      changed: function(e) {
        this.addImages(e.target.files);
      },

      addImages: function(files) {
        this.$data.files = files;
        for ( var i = 0; i < this.$data.files.length; i++ ) {
          this.addImage(this.$data.files[i]);
        }
      },

      addImage: function(file) {
        var preview = {
          index: this.$data.images.length,
          action: "upload",
          src: "",
          filename: ""
        };

        preview.file = file;
        preview.filename = file.name.split(".")[0];
        preview.extension = file.name.split(".")[1];
        preview.size = file.size;
        this.$data.images.push(preview);

        // REFERENCE: https://developer.mozilla.org/en/docs/
        // Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
        var fr = new FileReader();
        fr.onload = (function(img) {
          return function(e) {
            img.src = e.target.result;
          };
        }) (preview);

        fr.readAsDataURL(file);
      },

      action: function(index) {
        if ( this.$data.images[index].action === "upload" ) {
          this.upload(index);
        } else {
          this.remove(index);
        }
      },

      uploadAll: function() {
        // get all that are present but not uploaded.
      },

      upload: function(index) {
        var path = 'http://localhost:8080/services/item-images';
        var image = this.$data.images[index];
        var contentType = image.src.split(",")[0];
        var data = {
          filename: image.filename,
          extension: image.extension,
          data: image.src.split(",")[1]
        }
        var headers = {
          "Content-Type" : contentType
        }

        this.$http.post(path, data, {headers: headers}).then(function(response){
          var  images = [];
          images = JSON.parse(sessionStorage.getItem("uploaded-images")) || [];
          var id = this.getIdFromLocationHeader(response.headers("Location"));
          images.push(id);
          this.$data.images[index].id = id;
          sessionStorage.setItem("uploaded-images", JSON.stringify(images));
          this.$data.images[index].action = "remove";
        }, function(response) {
          console.log(response);
        });
      },

      getIdFromLocationHeader: function(data) {
        var split = data.split("/");
        return split[split.length - 1];
      },

      remove: function(index) {
        console.log(this.$data.images);
        var id = this.$data.images[index].id;
        var path = 'http://localhost:8080/services/item-images/' + id;
        this.$http.delete(path)
                  .then(function(response){
                    // hate this.
                    var  images = [];
                    images = JSON.parse(sessionStorage.getItem("uploaded-images")) || [];
                    for ( var i = 0; i < images.length; i++ ) {
                      if ( images[i] == id ) {
                        images.splice(i, 1);
                      }
                    }
                    sessionStorage.setItem("uploaded-images", JSON.stringify(images));
                    this.$data.images[index].action = "upload";
                  }, function(response){

                  });

      },

      confirm: function() {
        this.$dispatch('broadcastEvent', 'displayUploadedImages');
        this.$dispatch('closeSidePanelView');
      }
    }

  }
</script>