import { createApp } from 'vue';
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { createStore } from 'vuex'
import authStore from './store/modules/authStore'
import firebase from 'firebase'
import "./plugins/firebase";
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './style/cards.css'

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('dashboard');
  else next();
});

const store = createStore({
  modules: {
     authStore
  }
});

let app = '';
firebase.auth().onAuthStateChanged(function() {
  if(!app){
    createApp(App).use(router).use(store).mount('#app')
  }
});
