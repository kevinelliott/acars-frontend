<template>
  <div class="container">
    <AdminNav />
    <div class="row">
      <div class="col-3">
        <AdminStatsNav />
      </div>
      <div class="col-9">
        <h5>Errors</h5>
        <table class="table table-sm">
          <tr>
            <th>Error Level</th>
            <th>Message Count</th>
          </tr>
          <tr v-for="error in stats().errors"
            :key="`stat-level-${error.error}`">
            <td>Level {{ error.error }}</td>
            <td>{{ error.count }}</td>
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
export default class AdminStatsErrors extends Vue {
  created() { // eslint-disable-line class-methods-use-this
    console.log('Fetching stats...');
    Vue.axios.get('http://localhost:3001/admin/stats').then((response) => {
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
}
</script>
