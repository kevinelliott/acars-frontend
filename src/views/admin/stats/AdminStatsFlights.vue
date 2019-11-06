<template>
  <div class="container">
    <AdminNav />
    <h3 class="mb-4">Stats</h3>
    <div class="row">
      <div class="col-3">
        <AdminStatsNav />
      </div>
      <div class="col-9">
        <h5>Flight Stats</h5>
        <table class="table table-sm">
          <tr>
            <th>Flight Number</th>
            <th>Count</th>
          </tr>
          <tr v-for="flight in sortedFlights"
            :key="`stat-flight-${flight.flight}`">
            <td>{{ flight.flight }}</td>
            <td>{{ flight.count }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import VueAxios from 'vue-axios';

import AdminNav from '@/components/admin/AdminNav.vue';
import AdminStatsNav from '@/components/admin/stats/AdminStatsNav.vue';

Vue.use(VueAxios, axios);

@Component({
  components: {
    AdminNav,
    AdminStatsNav,
  },
})
export default class AdminStatsFlights extends Vue {
  sortedFlights = [];

  created() { // eslint-disable-line class-methods-use-this
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setStats') {
        this.sortFlightsByCountDesc(state.stats.flights);
      }
    });

    console.log('Fetching stats...');
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/admin/stats`).then((response) => {
      console.log('Fetched stats.');
      this.saveStats(response.data);
      console.log(response.data);
    });
  }

  saveStats(stats) {
    console.log('Storing stats...');
    this.$store.commit('setStats', stats);
  }

  stats() {
    return this.$store.state.stats;
  }

  sortFlightsByCountDesc(flights) {
    this.sortedFlights = flights.sort((a, b) => (b.count - a.count)); // eslint-disable-line max-len
  }
}
</script>
