<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/stations">Stations</router-link> |
      <router-link to="/stations/leaderboard">Leaderboard</router-link> |
      <router-link to="/airframes">Airframes</router-link> |
      <router-link to="/flights">Flights</router-link> |
      <router-link to="/messages/live">Messages</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <div id="status_bar"
         class="fixed-bottom p-1 px-4 bg-light border-top d-flex justify-content-between">
      <span class="font-weight-light text-muted">{{ version() }}</span>
      <span
        class="font-weight-bold"
        :class="{ 'text-success': $socket.connected, 'text-danger': !$socket.connected }">
        {{ $socket.connected ? 'Connected' : 'Disconnected' }}
      </span>
      <span class="font-weight-light text-muted">
        {{ $store.state.messagesLivePerSecond }} msgs/second
        <span v-if="$store.state.isLiveMessagesPaused" class="ml-2">
          <font-awesome-icon
            icon="play-circle"
            v-on:click="playLiveMessages()"
            />
        </span>
        <span v-else class="ml-2">
          <font-awesome-icon
            icon="pause-circle"
            v-on:click="pauseLiveMessages()"
            />
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

import { Version } from './utilities/version';

@Component({

})
export default class App extends Vue {
  messagesLivePerSecondInterval = 0;

  mounted() {
    this.$data.messagesLivePerSecondInterval = setInterval(this.updateMessagesListPerSecond, 1000);
  }

  pauseLiveMessages() {
    console.log('Pausing live messages.');
    this.$store.commit('pauseLiveMessages');
  }

  playLiveMessages() {
    console.log('Playing live messages.');
    this.$store.commit('playLiveMessages');
  }

  updateMessagesListPerSecond() {
    this.$store.commit('calculateMessagesLivePerSecond');
  }

  version() { // eslint-disable-line class-methods-use-this
    const version = new Version();
    return version.toString();
  }
}

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

#status_bar {
  /* position: absolute;
  bottom: 0;
  margin: auto 0;
  width: 100%; */
}
</style>
