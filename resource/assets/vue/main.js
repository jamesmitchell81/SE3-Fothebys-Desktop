var Vue = require('vue')
var App = require('./app.vue')
var VueResource = require('vue-resource')

new Vue({
  el: 'body',
  components: {
    app: App
  }
})