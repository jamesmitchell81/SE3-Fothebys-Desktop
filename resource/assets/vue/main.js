var Vue = require('vue');
var VueResource = require('vue-resource');
var Router = require('vue-router');

var App = require('./app.vue');

var PageNav = require('./page-nav.vue');
var Welcome = require('./welcome.vue');

var AddLotItem = require('./add-lot-item.vue');

Vue.use(Router);

var router = new Router();

router.map({
  '/': {
    component: Welcome
  },
  '/page/lot-items': {
    component: PageNav
  },
  '/page/lot-items/add-item': {
    component: AddLotItem
  }
})

Vue.config.debug = true;

router.start(App, '#app');

// new Vue({
//   el: 'body',
//   components: {
//     app: App,
//     'nav-core': navComponent
//   },
//   data: {
//     view: 'login',
//     navItems: [
//       { navName: "Lot Items", linkedView: "lot-items" },
//       { navName: "Auction Events", linkedView: "auction-events" }
//     ]
//   },

//   methods: {
//     swapView(newView) {
//       this.view = newView;
//     }
//   }
// })