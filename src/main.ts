import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

import App from './App.vue';
import router from './router';
import store from './store';

const appHost = process.env.BACKEND_HOST ? process.env.BACKEND_HOST : 'api.airframes.io';
const appPort = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : '443';
let remoteUrl;

if (process.env.NODE_ENV === 'production') {
  console.log('Running in Production mode.');
  remoteUrl = `https://${appHost}:${appPort}`;
} else {
  console.log('Running in Development mode.');
  remoteUrl = 'http://localhost:3001';
}

const socket = io(remoteUrl, { secure: false });
Vue.use(VueSocketIOExt, socket, { store });

library.add(faHeart);
library.add(faPauseCircle);
library.add(faPlayCircle);
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
