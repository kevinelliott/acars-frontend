<template>
  <div id="app" class="height: 100%;">
    <div class="d-flex vh-100 flex-column">
      <div class="flex-row" style="height: 56px;">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand>AIRFRAMES</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/">Home</b-nav-item>
              <b-nav-item to="/stations">Stations</b-nav-item>
              <b-nav-item to="/stations/leaderboard">Leaderboard</b-nav-item>
              <b-nav-item to="/airframes">Airframes</b-nav-item>
              <b-nav-item to="/flights">Flights</b-nav-item>
              <b-nav-item to="/messages/live">Messages</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-if="$store.state.auth.status.loggedIn">
              <b-nav-item-dropdown
                id="user-menu-dropdown"
                :text="$store.state.auth.user.username"
                right
              >
                <b-dropdown-item to="/user/dashboard">Dashboard</b-dropdown-item>
                <b-dropdown-item to="/myip">My IP</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item to="/about">About</b-dropdown-item>
                <b-dropdown-item @click="handleLogout">
                  Logout
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-else>
              <b-nav-item to="/about">About</b-nav-item>
              <b-nav-item to="/auth/login">Login</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div
        class="bg-light"
        style="height: -webkit-calc(100% - 88px); height: calc(100% - 88px); overflow-y: scroll;"
        >
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
      <div class="flex-row" style="height: 32px;">
        <div id="status_bar"
            class="p-1 px-4 bg-white border-top d-flex justify-content-between">
          <a
            :href="`https://github.com/kevinelliott/acars-frontend/releases/tag/v${version.version()}`"
            target="_blank"
            class="font-weight-light text-muted">
            {{ version.toString() }}
          </a>
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

  version = new Version();

  handleLogout() {
    this.$store.dispatch('auth/logout');
    this.$router.push('/auth/login');
  }

  mounted() {
    this.$gtag.event('main_page_mounted');
    this.$data.messagesLivePerSecondInterval = setInterval(this.updateMessagesListPerSecond, 5000);
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
}

</script>

<style>

#body {
  overflow-y: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
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
