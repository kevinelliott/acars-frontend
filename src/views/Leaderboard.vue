<template>
  <div class="home">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Leaderboard</h3>
      <div>
        <span v-if="leaderboards.previous">
          <router-link to="/stations/leaderboard/202001">Previous</router-link>
          &lt;
        </span>
        <router-link to="/stations/leaderboard">
          {{ leaderboards.current.date | moment('YYYY MMMM') }}
        </router-link>
        <span v-if="leaderboards.next">
          &gt;
          <router-link to="/stations/leaderboard/202003">Next</router-link>
        </span>
      </div>
    </div>
    <div class="border-bottom">
      <div class="container p-4">
        Now what fun would it be without some healthy competition? The following
        leaderboard scores and then ranks station feeders by a number of characteristics
        and lists them here. Try tuning your station to climb the chart.
      </div>
    </div>
    <div class="p-4">
      <div class="mb-4 text-muted">
        <h4>{{ leaderboards.current.date | moment('YYYY MMMM') }}</h4>
        Last updated {{ leaderboards.current.updatedAt | moment("from", "now") }}
      </div>
      <table class="table text-left bg-white">
        <tr>
          <th>Rank</th>
          <th class="border-left">Station</th>
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
          <th class="border-left"></th>
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
          v-for="rank in leaderboards.current.ranks"
          :key="`leaderboard-rank-${rank.id}`">
          <td class="text-center">{{ rank.ranking }}</td>
          <td class="border-left">{{ rank.station.ident }}</td>
          <td class="border-left text-right">
            {{ rank.airframeLast24HoursCount }}
          </td>
          <td class="text-right">
            {{ rank.airframeThisMonthCount }}
          </td>
          <td class="border-right text-right">
            {{ rank.airframeAllTimeCount }}
          </td>
          <td class="border-left text-right">
            {{ rank.flightLast24HoursCount }}
          </td>
          <td class="text-right">
            {{ rank.flightThisMonthCount }}
          </td>
          <td class="border-right text-right">
            {{ rank.flightAllTimeCount }}
          </td>
          <td class="border-left text-right">
            {{ rank.messageLast24HoursCount }}
          </td>
          <td class="text-right">
            {{ rank.messageThisMonthCount }}
          </td>
          <td class="border-right text-right">
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
  leaderboards = {
    current: {
      date: new Date(),
      updatedAt: new Date(),
    },
    next: null,
    previous: null,
  };

  created() {
    this.refresh();
  }

  refresh() {
    const date = new Date();
    const dateString = `${date.getFullYear()}${(date.getMonth() + 101).toString().substring(1)}`;

    console.log(`Fetching leaderboard ${dateString}...`);
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/leaderboard/${dateString}`).then((response) => {
      console.log('Fetched current leaderboard.');
      console.log(response.data);

      const { data } = response;
      if (data.current) {
        data.current.ranks = data.current.ranks.sort((a, b) => { // eslint-disable-line arrow-body-style, max-len
          return ((a.points > b.points) ? 1 : -1);
        }).reverse();
        this.leaderboards.current = data.current;
      }
    });
  }
}
</script>
