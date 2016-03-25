var Vue = require('vue');
var VueResource = require('vue-resource');
var Router = require('vue-router');
var App = require('./components/App.vue');

Vue.use(Router);
Vue.use(VueResource);

Vue.component('empty', { template: "<div>asdas<div>"});

var router = new Router();

router.map({
  '/': {
    component: require('./components/Welcome.vue')
  },
  '/lot-items': {
    component: require('./components/PageNav.vue')
  },
  '/lot-items/add-item': {
    component: require('./components/AddLotItem.vue')
  },
  '/lot-items/record-appraisal': {
    component: require('./components/LotAppraisal.vue')
  },
  '/lot-items/arrange-appraisal': {
    component: require('./components/ArrangeAppraisal.vue'),
    subRoutes: {
      '/client-details': {
        component: require('./components/ClientDetails.vue')
      }
    }
  },
  '/lot-items/lot-appraisal': {
    component: require('./components/LotAppraisal.vue')
  },
  '/clients': {
    component: require('./components/ClientList.vue')
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