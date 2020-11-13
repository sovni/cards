import Vue from 'vue'
import App from './App.vue'
import "./plugins/vue2-leaflet";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
