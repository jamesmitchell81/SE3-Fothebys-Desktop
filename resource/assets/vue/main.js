var Vue = require('vue')
var VueResource = require('vue-resource')
var Router = require('vue-router')

var App = require('./app.vue')
// var navComponent = require('./nav-item.vue')

Vue.use(Router);

Vue.component('login', {
  template: '<h2>Login</h2>'
});

Vue.component('lot-items', {
  template: '<h2>Lot Items</h2>'
});

var router = new Router();

router.map({

})

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