import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart,
  faPlayCircle,
  faPauseCircle,
  faSync,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

// eslint-disable-next-line
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), // eslint-disable-line global-require
  iconUrl: require('leaflet/dist/images/marker-icon.png'), // eslint-disable-line global-require
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // eslint-disable-line global-require
});

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
library.add(faSpinner);
library.add(faSync);
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
