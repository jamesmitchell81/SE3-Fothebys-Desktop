module.exports = {
  clientDetails: {
    title: '',
    firstName: '',
    surname: '',
    telNumber: '',
    emailAddress: '',
    contactAddress: {
      firstLine: '',
      secondLine: '',
      townCity: '',
      postalCode: ''
    }
  },
  setClientDetails: function(d) {
    // for ( var obj in d ) {
      this.clientDetails = d;
    // }
  },
  data: {
    routes: [
      { name: "Welcome",   url: "/", component: "./welcome.vue"},
      { name: "Lot Items", url: "/lot-items", component: "./page-nav.vue"},
      { name: "Add Lot Item", url: "/lot-items/add-item", component: "./add-lot-item.vue"},
      { name: "Define Categories", url: "/lot-items/category-definition", component: "./add-lot-item.vue"}
    ]
  }
}