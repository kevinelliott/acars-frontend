<template>
  <div class="container">
    <AdminNav />
    <div class="row">
      <div class="col-3">
        <AdminStatsNav />
      </div>
      <div class="col-9">
        <h5>Message Labels</h5>
        <table class="table table-sm">
          <tr>
            <th>Label</th>
            <th>Count</th>
          </tr>
          <tr v-for="label in sortedLabels"
            :key="`stat-label-${label.label}`">
            <td>{{ label.label }}</td>
            <td>{{ label.count }}</td>
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
export default class AdminStatsMessageLabels extends Vue {
  sortedLabels = [];

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setStats') {
        this.sortLabelsByCountDesc(state.stats.labels);
      }
    });

    console.log('Fetching stats...');
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/admin/stats/labels`).then((response) => {
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

  sortLabelsByCountDesc(labels) {
    this.sortedLabels = labels.sort((a, b) => (b.count - a.count)); // eslint-disable-line max-len
  }
}
</script>
