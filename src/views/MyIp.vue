<template>
  <div class="home">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">My IP</h3>
    </div>
    <div class="border-bottom">
      <div class="container p-4">
        Known stations for your IP address.
      </div>
    </div>
    <div class="container p-4">
      <h5>
        Internet IP Address
      </h5>
      <div class="mb-4">
        {{ myData.ipAddress }}
      </div>
      <h5>
        Your Stations
      </h5>
      <div v-for="station in myData.stations"
           :key="`your-station-${station.id}`"
           >
        <table class="table">
          <tr class="border">
            <td class="w-25">
              {{ station.id }}<br>
              <small class="text-muted">ID</small>
            </td>
            <td class="text-left">
              {{ station.ident }}<br>
              <small class="text-muted">IDENT</small>
            </td>
            <td class="w-50 align-middle alert" :class="stationStatusClass(station)">
              {{ stationStatusName(station) }}<br>
              <small class="text-muted">
                Last Received: {{ station.lastReportAt | moment("from", "now") }}
              </small>
            </td>
          </tr>
        </table>
      </div>
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
export default class MyIp extends Vue {
  myData = [];

  created() {
    this.refresh();
  }

  dateDiffInMinutesFromNow(date) { // eslint-disable-line class-methods-use-this
    const now = new Date();
    let diff = (now.getTime() - date.getTime()) / 1000;
    diff /= 60;
    console.log(diff);
    return Math.abs(Math.round(diff));
  }

  refresh() {
    console.log('Fetching myip details...');
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/user/myip`).then((response) => {
      console.log('Fetched current myip details.');
      console.log(response.data);

      this.myData = response.data;
    });
  }

  stationStatusClass(station) {
    return {
      'alert-success': this.dateDiffInMinutesFromNow(new Date(station.lastReportAt)) <= 60,
      'alert-warning': this.dateDiffInMinutesFromNow(new Date(station.lastReportAt)) > 60
        && this.dateDiffInMinutesFromNow(new Date(station.lastReportAt)) <= 1440,
      'alert-danger': this.dateDiffInMinutesFromNow(new Date(station.lastReportAt)) > 1440,
    };
  }

  stationStatusName(station) {
    if (this.dateDiffInMinutesFromNow(new Date(station.lastReportAt)) <= 60) {
      return 'Healthy';
    }
    if (this.dateDiffInMinutesFromNow(new Date(station.lastReportAt)) > 60
        && this.dateDiffInMinutesFromNow(new Date(station.lastReportAt)) <= 1440) {
      return 'Potential Issue';
    }
    return 'Not Working';
  }
}
</script>
