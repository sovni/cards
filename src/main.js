import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from './store/store'
import firebase from 'firebase'
import "./plugins/firebase";

Vue.use(VueRouter);
Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'history',
  routes
});
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('dashboard');
  else next();
});

let app = '';
firebase.auth().onAuthStateChanged(function() {
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});
