import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from './store/store'
import firebase from 'firebase'
import "./plugins/firebase";
//import "./plugins/vuefire";

Vue.use(VueRouter);
Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
