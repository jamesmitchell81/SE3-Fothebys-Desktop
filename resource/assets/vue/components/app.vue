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
      </nav>
    </div>

    <div class="content-wrap">
      <div class="content">
        <router-view></router-view>
      </div>

      <div class="side-panel-view" v-show="show" transition="slideout">
        <span @click="cancelSide" class="btn cancel-side">Cancel</span>
        <div :is="sidePanelView"></div>
      </div>
    </div>

  </div>
</template>

<script>
var SidePanel = require('./SidePanel.vue');
var ClientDetailsForm = require('./ClientDetailsForm.vue');
var DatePeriodForm = require('./DatePeriodForm.vue');
var CategorySelection = require('./CategorySelection.vue');

  export default {

    components: {
      SidePanel,
      ClientDetailsForm,
      DatePeriodForm,
      CategorySelection
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
      cancelSide: function() {
        this.show = false;
      }
    },

    events: {
      loadSideForm: function(form) {
        this.sidePanelView = form;
        this.show = true;
      },

      sendToParentForm: function(form, data) {
        this.$broadcast(form, data);
      },

      closeSidePanelView: function() {
        console.log("!");
        this.show = false;
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
