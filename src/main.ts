import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

import App from './App.vue';
import router from './router';
import store from './store';

const appHost = process.env.BACKEND_HOST ? process.env.BACKEND_HOST : 'localhost';
const appPort = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : '5581';
const remoteUrl = `http://${appHost}:${appPort}`;
const socket = io(remoteUrl);
Vue.use(VueSocketIOExt, socket);

library.add(faHeart);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueMoment, {
  moment,
});

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
