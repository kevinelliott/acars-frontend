<template>
  <div class="home">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">My IP</h3>
    </div>
    <div class="border-bottom">
      <div class="container p-4">
        Known stations for this IP address.
      </div>
    </div>
    <div class="container p-2 mt-4">
      <h5 class="mb-2">
        Internet IP Address
      </h5>
      <h3>
        {{ ipAddress }}
      </h3>
    </div>
    <div class="container p-2 mb-2">
      <h5 class="mb-2">
        Detected from your IP Address
      </h5>
      <div v-for="station in unassociatedStations"
           :key="`your-station-${station.id}`"
           class="mb-2"
           >
        <MyIpStation
          :station="station"
          :associated="isAssociated(station)"
          />
      </div>
    </div>
    <div class="container p-2" v-if="loggedIn()">
      <h5 class="mb-2">
        Your Assigned Ground Stations
      </h5>
      <div v-for="station in associatedStations()"
          :key="`your-station-${station.id}`"
           class="mb-2"
           >
        <MyIpStation
          :station="station"
          :associated="true"
          />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import MyIpStation from './MyIpStation.vue';

@Component({
  components: {
    MyIpStation,
  },
})
export default class MyIp extends Vue {
  ipAddress = '';

  unassociatedStations = [];

  associatedStations() { // eslint-disable-line class-methods-use-this
    return this.$store.state.auth.user ? this.$store.state.auth.user.stations : [];
  }

  created() {
    this.refresh();
  }

  isAssociated(station) { // eslint-disable-line class-methods-use-this
    // const matching = this.associatedStations().find(
    // (associatedStation)
    // => associatedStation.id === station.id // eslint-disable-line comma-dangle
    // );
    // return matching;
    return station.userId;
  }

  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }

  refresh() {
    console.log('Fetching myip details...');
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/user/myip`).then((response) => {
      console.log('Fetched current myip details.');
      this.ipAddress = response.data.ipAddress;
      this.unassociatedStations = response.data.stations;
    });
  }
}
</script>
