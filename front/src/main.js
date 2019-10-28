// IMPORTS
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import App from './App';
import Api from './components/Api.vue'

const routes = [
  {path: "/api", component: Api}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
