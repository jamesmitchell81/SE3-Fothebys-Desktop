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
        this.$data.files = e.target.files;
        console.log(this.$data.files);
        for ( var i = 0; i < this.$data.files.length; i++ )
        {
          this.addImage(e.target.files[0]);
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

        this.$http.post(path, data, {headers: headers})
                  .then(function(response){
                    var  images = [];
                    images = JSON.parse(sessionStorage.getItem("uploaded-images")) || [];
                    var id = this.getIdFromLocationHeader(response.headers("Location"));
                    images.push(id);
                    this.$data.images[index].id = id;
                    sessionStorage.setItem("uploaded-images", JSON.stringify(images));
                    this.$data.images[index].action = "remove";
                  }, function(response) {

                  });
      },

      getIdFromLocationHeader: function(data) {
        var split = data.split("/");
        return split[split.length - 1];
      },

      remove: function(index) {
        var id = this.$data.images[index].id;
        var path = 'http://localhost:8080/services/item-images/' + id;
        this.$http.delete(path)
                  .then(function(response){
                    console.log(response);
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
        this.$dispatch('broadcastEvent', 'displayDefinedCategories');
        this.$dispatch('closeSidePanelView');
      }
    }

  }
</script>