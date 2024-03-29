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
import './style/cards.min.css'
import mitt from 'mitt';
import ToastService from 'primevue/toastservice';

const emitter = mitt();

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  console.log("router to " + to + " from " + from);
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser && to.name != "pseudo") next('dashboard');
  else next();
});

const store = createStore({
  modules: {
     authStore
  }
});

firebase.analytics();

let app = '';
firebase.auth().onAuthStateChanged(function() {
  if(!app){
    app = createApp(App).use(ToastService).use(router).use(store);
    app.config.globalProperties.emitter = emitter;
    app.mount('#app');
  }
});
