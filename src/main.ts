import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import LogRocket from 'logrocket';
import VueMoment from 'vue-moment';
import Toasted from 'vue-toasted';
import VeeValidate from 'vee-validate';
import VueGtag from 'vue-gtag';
import moment from 'moment-timezone';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCopy,
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

LogRocket.init('6n9b7u/acars-dev');

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

// eslint-disable-next-line
delete (Icon.Default.prototype as any)._getIconUrl;
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

library.add(faCopy);
library.add(faHeart);
library.add(faPauseCircle);
library.add(faPlayCircle);
library.add(faSpinner);
library.add(faSync);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(require('vue-moment'), {
  moment,
});

Vue.use(BootstrapVue);
Vue.use(Toasted, { position: 'bottom-right', duration: 3000, theme: 'bubble' });
Vue.use(VeeValidate);
Vue.use(VueGtag, {
  config: { id: 'G-004ZF59XP6' },
  appName: 'Airframes Web App',
  pageTrackerScreenviewEnaled: true,
}, router);

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
  render: (h) => h(App),
}).$mount('#app');

store.subscribe((mutation, state) => {
  if (mutation.type === 'setAirframes') {
    localStorage.setItem('airframes', JSON.stringify(state.airframes));
  }
  if (mutation.type === 'setStations') {
    localStorage.setItem('stations', JSON.stringify(state.stations));
  }
});
