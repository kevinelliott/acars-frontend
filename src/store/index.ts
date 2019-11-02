import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment-timezone';

import acarsData from '../assets/acars-data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    acarsData,
    clients: {},
    isConnected: false,
    messagesHistorical: [],
    messagesLive: [],
    messagesLivePerSecond: 0,
    messagesLiveCountLast: 0,
    lastMessageFromAirframes: [],
    lastMessageFromStations: [],
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
      const { messagesLiveCountLast } = state;
      const messagesLiveCountNow = state.messagesLive.length;
      const mps = messagesLiveCountNow - messagesLiveCountLast;

      Vue.set(state, 'messagesLivePerSecond', mps);
      Vue.set(state, 'messagesLiveCountLast', messagesLiveCountNow);
    },
    prependNewLiveMessages(state: any, newMessages: Array<any>) {
      Vue.set(state, 'messagesLive', newMessages.concat(state.messagesLive));
    },
    setLastHeardFromAirframe(state: any, tail: any) {
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
  },
  actions: {
    socket_newMessages({ commit, dispatch }, messages) {
      console.log('Store: Socket: newMessages');
      for (const message of messages) { // eslint-disable-line no-restricted-syntax,guard-for-in
        commit('setLastHeardFromStation', message.station);
      }

      for (const message of messages) { // eslint-disable-line no-restricted-syntax,guard-for-in,max-len
        if (message.airframe && message.airframe.tail) {
          console.log(message.airframe.tail);
          commit('setLastHeardFromAirframe', message.airframe.tail);
        }
      }

      commit('prependNewLiveMessages', messages);
    },
    socket_clients({ commit, dispatch }, clients) {
      commit('socket_clients', clients);
    },
    socket_stations({ commit, dispatch }, stations) {
      console.log('Store: Socket: stations');
      commit('setStations', stations.sort((a: any, b: any) => (b.messagesCount - a.messagesCount)));
    },
  },
  modules: {
  },
});
