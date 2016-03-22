export default {
  data: {
    routes: [
      { name: "Welcome",   url: "/", component: "./welcome.vue"},
      { name: "Lot Items", url: "/lot-items", component: "./page-nav.vue"},
      { name: "Add Lot Item", url: "/lot-items/add-item", component: "./add-lot-item.vue"}
    ]
  }
}