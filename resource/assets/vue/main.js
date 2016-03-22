var Vue = require('vue');
var VueResource = require('vue-resource');
var Router = require('vue-router');

var App = require('./components/app.vue');

var PageNav = require('./components/page-nav.vue');
var Welcome = require('./components/welcome.vue');

var AddLotItem = require('./components/add-lot-item.vue');
var ArrangeAppraisal = require('./components/arrange-appraisal.vue')

Vue.use(Router);
Vue.use(VueResource);

var router = new Router();

router.map({
  '/': {
    component: Welcome
  },
  '/lot-items': {
    component: PageNav
  },
  '/lot-items/add-item': {
    component: AddLotItem
  },
  '/lot-items/arrange-appraisal': {
    component: ArrangeAppraisal,
    subRoutes: {
      '/client-details': {
        component: require('./components/client-details.vue')
      }
    }
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