// Import Vue
import Vue from 'vue'

// Import Framework7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Style
import Framework7CSS from 'framework7/dist/css/framework7.css'

// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css'

// Import Fontawesome Theme Styles
import FontAwesome from 'font-awesome/css/font-awesome.css'

// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'

// Import App Component
import app from './main.vue'

// Import Routes
import routes from './routes.js'

// Import Vuex Storage
import store from './assets/vuex/storage.js'

// import auth0 instance
import auth0 from 'auth0-js'

// load vue resource for ajax
import VueResource from 'vue-resource'
Vue.use(VueResource)

// Install F7 Plugin
Vue.use(Framework7Vue, Framework7);

// set the theme
let theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// start auth0 instance
export var webAuth = new auth0.WebAuth({
  domain: 'jimmyb.auth0.com',
  clientID: '<yourclient_id>',
  responseType: 'token',
  redirectUri: 'http://192.168.12.136:8081/',
  audience: 'https://jimmyb.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid profile email'
});

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  store,
  render: c => c('app'),
  components: {
    app,
  },
  framework7: {
    id: 'io.framework7.testapp',
    theme: 'md', // md or ios
  },
  routes,
});
