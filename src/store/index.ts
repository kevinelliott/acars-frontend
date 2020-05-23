import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment-timezone';

import acarsData from '../assets/acars-data.json';
import auth from './auth.module';
import userStation from './user_station.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    userStation,
  },
  state: {
    acarsData,
    activeFlights: [],
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
      console.log('Store: Socket: clients');
      Vue.set(state, 'clients', clients);
    },
    socket_connect(state, status) {
      console.log('Socket connect');
      state.isConnected = true;
    },
    calculateMessagesLivePerSecond(state: any) {
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
    pauseLiveMessages(state: any) {
      Vue.set(state, 'isLiveMessagesPaused', true);
    },
    playLiveMessages(state: any) {
      Vue.set(state, 'isLiveMessagesPaused', false);
    },
    prependNewLiveMessages(state: any, newMessages: Array<any>) {
      Vue.set(state, 'messagesLive', newMessages.concat(state.messagesLive).slice(0, 500));
    },
    setActiveFlights(state: any, flights: Array<any>) {
      Vue.set(state, 'activeFlights', flights);
    },
    setLastHeardFromAirframe(state: any, tail: any) {
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
    setLastHeardFromStation(state: any, station: any) {
      const { lastMessageFromStations } = state;

      const last = { station, when: Date.now() };
      lastMessageFromStations[station.id] = last;

      Vue.set(state, 'lastMessageFromStations', lastMessageFromStations);
    },
    setStations(state: any, stations: Array<any>) {
      Vue.set(state, 'stations', stations);
    },
    setStats(state: any, stats: any) {
      Vue.set(state, 'stats', stats);
    },
  },
  actions: {
    socket_activeFlights({ commit, dispatch }, flights) {
      commit('setActiveFlights', flights);
    },
    socket_newMessages({ commit, dispatch }, messages) {
      // console.log('Store: Socket: newMessages');
      for (const message of messages) { // eslint-disable-line no-restricted-syntax,guard-for-in
        if (message.station) {
          commit('setLastHeardFromStation', message.station);
        }
      }

      for (const message of messages) { // eslint-disable-line no-restricted-syntax,guard-for-in,max-len
        if (message.airframe && message.airframe.tail) {
          commit('setLastHeardFromAirframe', message.airframe.tail);
        }
      }

      commit('prependNewLiveMessages', messages);
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
