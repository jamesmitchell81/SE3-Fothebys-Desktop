<template>

  <form action="">

    <legend>Define Category</legend>

    <span>{{ message }}</span>

    <span class="form-element">
      <label for="name">Category Name</label>
      <input type="text" v-model="category.name">
    </span>

    <label for="">Attribute and Type</label>
    <span class="form-element"
          v-for="attribute in category.attributes">
      <span class="form-input-inline">
        <input type="text" v-model="attribute.name">
        <select name="attrType" id="">
          <option v-for="type in types"
                  value="type.name"
                  v-if="type.name == attribute.type"
                  >
                  {{ type.name }}
          </option>
          <option v-for="type in types"
                  value="type.name"
                  v-if="type.name != attribute.type"
                  >
                  {{ type.name }}
          </option>
        </select>
      </span>
      <span class="checkbox-item">
        <label for="required-{{attribute.name | lowercase }}">
        <input type="checkbox"
               name="required"
               id="required-{{attribute.name | lowercase }}"
               v-model="attribute.required">
          Required Field?</label>
      </span>
      <span class="checkbox-item">
        <label for="active-{{attribute.name | lowercase }}">
        <input type="checkbox"
               name="active"
               id="active-{{attribute.name | lowercase }}"
               v-model="attribute.active">
          Active?</label>
      </span>
    </span>

    <span class="form-element">
      <span class="form-input-inline">
        <input type="text" v-model="newAttr.name">
        <select id="" v-model="newAttr.type">
          <option v-for="type in types"
                  value="{{ type.name }}">{{ type.name }}</option>
        </select>
      </span>
      <span class="checkbox-item">
        <label for="required-new">
        <input type="checkbox"
               name="required-new"
               id="required-new" v-model="newAttr.required">
          Required Field?</label>
      </span>
      <button @click.prevent="addAttribute"
              class="btn">
              Add Attribute
      </button>
    </span>

    <button @click.prevent="confirm"
            class="btn side-bar-confirm">Confirm</button>

  </form>

</template>

<script>

  export default {
    name: "DefineCategoryForm",

    data: function() {
      return {
        id: 0,
        message: "",
        category: {
          name: "",
          attributes: []
        },
        newAttr: {
          name: "",
          type: "",
          required: false
        },
        types: [
          { name: "text"},
          { name: "number"},
          { name: "date"},
          { name: "true/false"},
        ]
      }
    },

    ready: function() {
      this.$data.id = sessionStorage.getItem("category-selected");

      if ( this.$data.id != 0 ) {
        console.log(this.$data.id);
        this.getCategoryData();
      }

    },

    methods: {
      getCategoryData: function(id) {

        this.$http.get('http://localhost:8080/services/category/' + this.$data.id)
                  .then(function(response) {
                    this.$data.name = response.data.name;
                    this.$data.category = response.data;
                  }, function(response) {
                    this.$data.message = "Connection Failed";
                  });
      },

      addAttribute: function() {
        var attr = {
          name: this.$data.newAttr.name,
          type: this.$data.newAttr.type,
          required: this.$data.newAttr.required,
          active: true
        }

        this.$data.category.attributes.push(attr);
        this.$data.newAttr.name = "";
        this.$data.newAttr.required = false;
        this.$data.newAttr.type = false;
      },

      getIdFromHeaderLocation: function(data) {
        var split = data.split("/");
        return split[split.length - 1];
      },

      confirm: function() {
        if ( this.$data.id == 0 ) {
          this.post();
        } else {
          this.update();
        }
      },

      post: function() {
        var path = "http://localhost:8080/services/category";
        var data = JSON.stringify(this.$data.category);
        this.$http.post(path, data)
                  .then(function(response) {
                    var sess = JSON.parse(data);
                    sess.id = this.getIdFromHeaderLocation(response.headers("Location"));
                    sessionStorage.setItem("defined-category", JSON.stringify(sess));
                    this.$dispatch('broadcastEvent', 'displayDefinedCategories');
                    this.$dispatch('closeSidePanelView');
                  }, function(response) {
                    this.$data.message = "Request Failed";
                  });
      },

      update: function(data) {
        var path = "http://localhost:8080/services/category/" + this.$data.id;
        var data = JSON.stringify(this.$data.category);
        this.$http.put(path, data)
                  .then(function(response) {
                    sessionStorage.setItem("defined-category", data);
                    this.$dispatch('broadcastEvent', 'displayDefinedCategories');
                    this.$dispatch('closeSidePanelView');
                  }, function(response) {
                    this.$data.message = "Request Failed";
                  });
      }
    },


  }


</script>