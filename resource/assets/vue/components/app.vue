<template>
  <div class="body-wrap">
    <div class="side-wrap">
      <header>
        <img src="../assets/svg/fb-logo-white.svg" alt="Fothebys Auction House">
      </header>
      <nav>
        <a v-link="'/lot-items'" class="nav-core">Lot Items</a>
        <a :href="" class="nav-core">Auction Events</a>
        <a :href="" class="nav-core">Employees</a>
        <a v-link="'/clients'" class="nav-core">Clients</a>
      </nav>
    </div>

    <div class="content-wrap">
      <div class="content">
        <router-view></router-view>
      </div>

      <div class="side-panel side-panel__closed" transition="slideout" id="side-bar">
        <span @click="cancelSide" class="btn cancel-side" id="close-side-bar">Cancel</span>
        <div class="side-bar-content">
          <div :is="sidePanelView"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
var SidePanel = require('./SidePanel.vue');
var ClientDetailsForm = require('./ClientDetailsForm.vue');
var ClientSearchForm = require('./ClientSearchForm.vue');
var DatePeriodForm = require('./DatePeriodForm.vue');
var CategorySelection = require('./CategorySelection.vue');
var ClassificationSelection = require('./ClassificationSelection.vue');
var ExpertSelection = require('./ExpertSelection.vue');
var ItemDimensionForm = require('./ItemDimensionForm.vue');
var ItemImagesForm = require('./ItemImagesForm.vue');
var ItemWeightForm = require('./ItemWeightForm.vue');
var DefineCategoryForm = require('./DefineCategoryForm.vue');

  export default {

    components: {
      SidePanel,
      ClientDetailsForm,
      ClientSearchForm,
      DatePeriodForm,
      CategorySelection,
      ClassificationSelection,
      ExpertSelection,
      ItemDimensionForm,
      ItemImagesForm,
      ItemWeightForm,
      DefineCategoryForm
    },

    props: {
      sidePanelView: {
        default: 'empty'
      }
    },

    data: function() {
      return {
        show: false
      }
    },

    methods: {
      openSide: function() {
        var side = document.getElementById("side-bar");
        side.classList.remove("side-panel__closed");
        side.classList.add("side-panel__open");
      },

      cancelSide: function() {
        var side = document.getElementById("side-bar");
        side.classList.remove("side-panel__open");
        side.classList.add("side-panel__closed");
      },

      clearData: function(data) {
        for ( var prop in data ) {
          if ( data.hasOwnProperty(prop) ) {
            var d = data[prop];

            if ( d !== null && typeof d === 'object') {
              data[prop] = this.clearData(d);
            } else {
              data[prop] = "";
            }

          }
        }
        return data;
      }
    },

    events: {
      loadSideForm: function(form, data) {
        this.sidePanelView = form;
        if ( data ) {
          this.$broadcast(form, data);
        }
        this.openSide();
      },

      sendToParentForm: function(form, data) {
        this.$broadcast(form, data);
      },

      closeSidePanelView: function() {
        this.sidePanelView = null;
        this.cancelSide();
      },

      broadcastEvent: function(event) {
        console.log(event);
        this.$broadcast(event);
      }
    }
  }

</script>

<style>
  .nav-core {
    color: #fff;
    display: block;
    padding: 2em 0 2em 3em;
    cursor: pointer;
  }

  .cancel-side {
    position: fixed;
    top: 0;
    right: 0;
    margin: 1em;
  }
</style>
