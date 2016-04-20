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
    component: require('./components/ItemPageNav.vue')
  },
  '/lot-items/record-appraisal': {
    component: require('./components/LotAppraisal.vue')
  },
  '/lot-items/define-categories': {
    component: require('./components/DefineCategories.vue'),
  },
  '/lot-items/arrange-appraisal': {
    component: require('./components/ArrangeAppraisal.vue'),
    subRoutes: {
      '/client-details': {
        component: require('./components/ClientDetails.vue')
      }
    }
  },
  '/lot-items/:id': {
    name: "item.view",
    component: require('./components/ViewItem.vue')
  },
  '/lot-items/lot-appraisal': {
    component: require('./components/LotAppraisal.vue')
  },
  '/lot-items/lot-appraisal/update/:id': {
    name: "item.update",
    component: require('./components/LotAppraisal.vue')
  },
  '/lot-items/lot-appraisal/delete/:id': {
    name: "item.delete",
    component: require('./components/ItemDeleteConfirm.vue')
  },
  '/lot-items/view-items': {
    name: "items.view",
    component: require('./components/ViewItems.vue')
  },
  '/lot-items/design/:id': {
    name: "item.page.design",
    component: require('./components/ItemPageDesign.vue')
  },
  '/clients': {
    component: require('./components/ClientList.vue')
  }
});
Vue.config.debug = true;
router.start(App, '#app');
