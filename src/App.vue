<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/stations">Stations</router-link> |
      <router-link to="/stations/leaderboard">Leaderboard</router-link> |
      <router-link to="/airframes">Airframes</router-link> |
      <router-link to="/flights">Flights</router-link> |
      <router-link to="/messages">Messages</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';

export default {
  name: 'app',
  sockets: {
    connect() {
      console.log('App: Socket connected.');
    },
    events(val) {
      // console.log('Socket: events', val);
    },
    newMessages(messages) {
      console.log('App: Socket: new-messages', messages);

      for (const message of messages) { // eslint-disable-line no-restricted-syntax,guard-for-in
        this.$store.commit('setLastHeardFromStation', message.station);
      }

      this.$store.commit('prependNewLiveMessages', messages);
    },
    stations(stations) {
      this.$store.commit('setStations', stations);
    },
  },
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
