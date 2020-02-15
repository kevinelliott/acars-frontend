<template>
  <div class="home">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Leaderboard</h3>
    </div>
    <div class="border-bottom">
      <div class="container p-4">
        Now what fun would it be without some healthy competition? The following
        leaderboard scores and then ranks station feeders by a number of characteristics
        and lists them here. Try tuning your station to climb the chart.
      </div>
    </div>
    <div class="p-4">
      <div class="mb-4 text-muted">Last updated {{ leaderboard.updatedAt }}</div>
      <table class="table text-left bg-white">
        <tr>
          <th>Rank</th>
          <th>Station</th>
          <th class="border-left border-right text-center" colspan="3">
            Airframes<br>
          </th>
          <th class="border-left border-right text-center" colspan="3">
            Flights<br>
          </th>
          <th class="border-left border-right text-center" colspan="3">
            Messages<br>
          </th>
          <th class="text-right">Points</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th class="border-left text-center"><small class="text-muted">Last 24 Hours</small></th>
          <th class="text-center"><small class="text-muted">This Month</small></th>
          <th class="border-right text-center"><small class="text-muted">All Time</small></th>
          <th class="border-left text-center"><small class="text-muted">Last 24 Hours</small></th>
          <th class="text-center"><small class="text-muted">This Month</small></th>
          <th class="border-right text-center"><small class="text-muted">All Time</small></th>
          <th class="border-left text-center"><small class="text-muted">Last 24 Hours</small></th>
          <th class="text-center"><small class="text-muted">This Month</small></th>
          <th class="border-right text-center"><small class="text-muted">All Time</small></th>
          <th></th>
        </tr>
        <tr
          v-for="rank in leaderboard.ranks"
          :key="`leaderboard-rank-${rank.id}`">
          <td class="text-center">{{ rank.ranking }}</td>
          <td>{{ rank.station.ident }}</td>
          <td class="border-left text-center">
            {{ rank.airframeLast24HoursCount }}
          </td>
          <td class="text-center">
            {{ rank.airframeThisMonthCount }}
          </td>
          <td class="border-right text-center">
            {{ rank.airframeAllTimeCount }}
          </td>
          <td class="border-left text-center">
            {{ rank.flightLast24HoursCount }}
          </td>
          <td class="text-center">
            {{ rank.flightThisMonthCount }}
          </td>
          <td class="border-right text-center">
            {{ rank.flightAllTimeCount }}
          </td>
          <td class="border-left text-center">
            {{ rank.messageLast24HoursCount }}
          </td>
          <td class="text-center">
            {{ rank.messageThisMonthCount }}
          </td>
          <td class="border-right text-center">
            {{ rank.messageAllTimeCount }}
          </td>
          <td class="text-right">{{ rank.points }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Leaderboard extends Vue {
  leaderboard = {};

  created() {
    this.refresh();
  }

  refresh() {
    console.log('Fetching current leaderboard...');
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/leaderboard/current`).then((response) => {
      console.log('Fetched current leaderboard.');
      console.log(response.data);
      const leaderboard = response.data;
      leaderboard.ranks = leaderboard.ranks.sort((a, b) => { // eslint-disable-line arrow-body-style
        return ((a.points > b.points) ? 1 : -1);
      }).reverse();
      this.leaderboard = leaderboard;
    });
  }
}
</script>
