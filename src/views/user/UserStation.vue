<template>
  <div class="about text-center">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Your Dashboard</h3>
      <router-link :to="`/user/station/${station.id}`">Ground Station Detail</router-link>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h3 class="mb-0">
          {{ station.id }} - {{ station.ident }}
          <div class="pull-right">
            <b-button
              :to="`/user/station/${id}/edit`"
              variant="warning"
              class="mr-2">
              Edit
            </b-button>
            <b-button variant="danger">Destroy</b-button>
          </div>
        </h3>
      </div>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h4 class="mb-4">Specifications</h4>
        <div class="row">
          <div class="col-6">
            <table class="table table-hover mb-0 bg-white">
              <tr>
                <td>UUID</td>
                <td>{{ station.uuid }}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{{ station.sourceType.toUpperCase() }}</td>
              </tr>
              <tr>
                <td>Owner</td>
                <td>{{ $store.state.auth.user.name }}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{{ station.latitude || 'Unknown' }}, {{ station.longitude || 'Unknown' }}</td>
              </tr>
              <tr>
                <td>Nearest Airport</td>
                <td>{{ station.nearest_airport || 'Unknown' }}</td>
              </tr>
              <tr>
                <td>Platform</td>
                <td>{{ station.platform || 'Unknown' }}</td>
              </tr>
              <tr>
                <td>Operating System</td>
                <td>{{ station.operating_system || 'Unknown' }}</td>
              </tr>
              <tr>
                <td>SDR</td>
                <td>{{ station.sdr || 'Unknown' }}</td>
              </tr>
              <tr>
                <td>Filters</td>
                <td class="text-muted">Coming Soon</td>
              </tr>
              <tr>
                <td>Antenna</td>
                <td>{{ station.antenna || 'Unknown' }}</td>
              </tr>
              <tr>
                <td>Ingest</td>
                <td class="text-muted">Coming Soon</td>
              </tr>
              <tr>
                <td>Feeder Client</td>
                <td>{{ station.sourceApplication || 'Unknown' }}</td>
              </tr>
            </table>
          </div>
          <div class="col-6">
            <Map
              :coordinates="stationCoordinates()"
              style="height: 100%;"
              />
          </div>
        </div>
      </div>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h4 class="mb-4">Recent Messages</h4>
        <h5 class="text-muted">Coming soon...</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import Map from '@/components/shared/Map.vue';

@Component({
  components: {
    Map,
  },
})
export default class UserStation extends Vue {
  id = 0;

  station = {
    id: 'N/A',
    ident: 'N/A',
  };

  @Watch('$route')
  onPropertyChanged(newValue, oldValue) {
    if (newValue.params.id && newValue.params.id !== oldValue.params.id) {
      this.refresh();
    }
  }

  beforeMount() {
    this.refresh();
  }

  refresh() {
    console.log(this.$route.params);
    this.id = Number(this.$route.params.id);
    this.station = this.$store.state.auth.user.stations.find((station) => station.id === this.id);
  }

  stationCoordinates() {
    const coords = { latitude: this.station.latitude, longitude: this.station.longitude };
    console.log(coords);
    return coords;
  }
}
</script>
