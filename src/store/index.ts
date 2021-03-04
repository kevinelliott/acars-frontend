import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment-timezone';

import acarsData from '../assets/acars-data.json';
import auth from './auth.module';
import userStation from './userStation.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    userStation,
  },
  state: {
    acarsData,
    activeFlights: [],
    airframes: [],
    apiServerBaseUrl: process.env.NODE_ENV === 'production' ? 'https://api.airframes.io' : 'http://localhost:3001',
    clients: {},
    isConnected: false,
    isProduction: process.env.NODE_ENV === 'production',
    isLiveMessagesPaused: false,
    messagesHistorical: [],
    messagesLive: [],
    messagesLivePerSecond: 0,
    messagesLiveCountLast: 0,
    lastMessageFromAirframes: [],
    lastMessageFromStations: [],
    stations: [],
    stats: {},
  },
  mutations: {
    socket_clients(state, clients) {
      console.log('Store: socket_clients');
      Vue.set(state, 'clients', clients);
    },
    socket_connect(state, status) {
      console.log('Store: socket_connect');
      state.isConnected = true;
    },
    calculateMessagesLivePerSecond(state: any) {
      console.log('Store: calculateMessagesLivePerSecond');
      if (!state.isLiveMessagesPaused) {
        const { messagesLiveCountLast } = state;
        const messagesLiveCountNow = state.messagesLive.length;
        const mps = (messagesLiveCountNow - messagesLiveCountLast) / 5;

        Vue.set(state, 'messagesLivePerSecond', mps);
        Vue.set(state, 'messagesLiveCountLast', messagesLiveCountNow);
      } else {
        Vue.set(state, 'messagesLivePerSecond', 0);
        Vue.set(state, 'messagesLiveCountLast', 0);
      }
    },
    initializeStore(state) {
      console.log('Store: initializeStore');
      const existingAirframes = localStorage.getItem('airframes');
      if (existingAirframes) {
        console.log(existingAirframes);
        Vue.set(state, 'airframes', JSON.parse(existingAirframes));
      }

      const existingStations = localStorage.getItem('stations');
      if (existingStations) {
        console.log(existingStations);
        Vue.set(state, 'stations', JSON.parse(existingStations));
      }
    },
    pauseLiveMessages(state: any) {
      console.log('Store: pauseLiveMessages');
      Vue.set(state, 'isLiveMessagesPaused', true);
    },
    playLiveMessages(state: any) {
      console.log('Store: playLiveMessages');
      Vue.set(state, 'isLiveMessagesPaused', false);
    },
    prependNewLiveMessages(state: any, newMessages: Array<any>) {
      // console.log('Store: prependNewLiveMessages');
      Vue.set(state, 'messagesLive', newMessages.concat(state.messagesLive).slice(0, 100));
    },
    setAirframes(state: any, airframes: Array<any>) {
      console.log('Store: setAirframes');
      Vue.set(state, 'airframes', airframes);
    },
    setActiveFlights(state: any, flights: Array<any>) {
      console.log('Store: setActiveFlights');
      Vue.set(state, 'activeFlights', flights);
    },
    setLastHeardFromAirframe(state: any, tail: any) {
      // console.log('Store: setLastHeardFromAirframe');
      if (!state.isLiveMessagesPaused) {
        let { lastMessageFromAirframes } = state;

        const filter = function t(last: any) {
          const lastDate = moment(last.when);
          const now = moment();
          const diff = now.diff(lastDate, 'minutes');
          return last.tail !== tail && diff < 5;
        };

        lastMessageFromAirframes = lastMessageFromAirframes.filter(filter);

        const last = { tail, when: Date.now() };
        lastMessageFromAirframes.push(last);
        lastMessageFromAirframes = lastMessageFromAirframes.sort((a: any, b: any) => (b.when - a.when)); // eslint-disable-line max-len

        Vue.set(state, 'lastMessageFromAirframes', lastMessageFromAirframes);
      }
    },
    setStations(state: any, stations: Array<any>) {
      console.log('Store: setStations');
      Vue.set(state, 'stations', stations);
    },
    setStats(state: any, stats: any) {
      console.log('Store: setStats');
      Vue.set(state, 'stats', stats);
    },
  },
  actions: {
    socket_activeFlights({ commit, dispatch }, flights) {
      commit('setActiveFlights', flights);
    },
    socket_newMessages({ commit, dispatch }, messages) {
      // console.log('Store: Socket: newMessages');

      // for (const message of messages) { // eslint-disable-line no-restricted-syntax,guard-for-in,max-len
      //   if (message.airframe && message.airframe.tail) {
      //     commit('setLastHeardFromAirframe', message.airframe.tail);
      //   }
      // }

      commit('prependNewLiveMessages', messages);
    },
    socket_airframes({ commit, dispatch }, airframes) {
      commit('setAirframes', airframes);
    },
    socket_clients({ commit, dispatch }, clients) {
      commit('socket_clients', clients);
    },
    socket_stations({ commit, dispatch }, stations) {
      // console.log('Store: Socket: stations');
      commit('setStations', stations.sort((a: any, b: any) => (b.messagesCount - a.messagesCount)));
    },
  },
});
