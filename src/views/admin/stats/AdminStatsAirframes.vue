<template>
  <div class="container">
    <AdminNav />
    <div class="row">
      <div class="col-3">
        <AdminStatsNav />
      </div>
      <div class="col-9">
        <h5>Airframes</h5>
        <table class="table table-sm">
          <tr>
            <th>Tail</th>
            <th>Flights</th>
            <th>Messages</th>
          </tr>
          <tr v-for="airframe in sortedAirframes"
            :key="`stat-airframe-${airframe.tail}`">
            <td>{{ airframe.tail }}</td>
            <td>{{ airframe.flight_count }}</td>
            <td>{{ airframe.message_count }}</td>
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
export default class AdminStatsAirframes extends Vue {
  sortedAirframes = [];

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setStats') {
        this.sortAirframesByCountDesc(state.stats.airframes);
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

  sortAirframesByCountDesc(airframes) {
    this.sortedAirframes = airframes.sort((a, b) => (b.flight_count - a.flight_count)); // eslint-disable-line max-len
  }
}
</script>
