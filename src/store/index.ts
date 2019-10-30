import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment-timezone';

import acarsData from '../assets/acars-data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    acarsData,
    messagesHistorical: [],
    messagesLive: [],
    lastMessageFromAirframes: [],
    lastMessageFromStations: [],
  },
  mutations: {
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
  },
  actions: {
  },
  modules: {
  },
});
