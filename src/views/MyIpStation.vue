<template>
  <div class="row mb-3 p-0 bg-white border align-items-center">
    <div class="col-2 p-4">
      <h5 class="mb-0">{{ station.id }}</h5>
      <div class="text-muted">ID</div>
    </div>
    <div class="col-2 p-4">
      <h5 class="mb-0">{{ station.ident }}</h5>
      <div class="text-muted">IDENT</div>
    </div>
    <div class="col-2 p-4">
      <h5 class="mb-0">
        {{ (station.sourceType || 'UNKNOWN').toUpperCase() }}
      </h5>
      <div class="text-muted">TYPE</div>
    </div>
    <div class="col-2 p-4">
      <div v-if="associated">
        <h5 class="mb-0">&check;</h5>
        <div class="text-muted">LINKED</div>
      </div>
      <div v-else>
        <b-button variant="primary" @click="handleClaim">Claim</b-button>
      </div>
    </div>
    <div class="col-4 p-4 mb-0 alert" :class="stationStatusClass(station)">
      {{ stationStatusName(station) }}<br>
      <small class="text-muted">
        Last Received:
        <span v-if="station.lastReportAt">
          {{ station.lastReportAt | moment("from", "now") }}
        </span>
        <span v-else>Never</span>
      </small>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class MyIpStation extends Vue {
  @Prop() private station: any;

  @Prop({ default: false }) private associated!: boolean;

  loading = false

  dateDiffInMinutesFromNow(date: any) { // eslint-disable-line class-methods-use-this
    const now = new Date();
    let diff = (now.getTime() - date.getTime()) / 1000;
    diff /= 60;
    console.log(diff);
    return Math.abs(Math.round(diff));
  }

  handleClaim() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }
      this.$store.dispatch('userStation/claim', this.station).then(
        () => {
          this.loading = false;
          Vue.toasted.show('Claimed ground station.');
          this.$router.push('/myip');
        },
        (error) => {
          this.loading = false;
          this.station = (error.response && error.response.data)
            || error.message
            || error.toString();
        },
      );
    });
  }

  stationStatusClass(station: any) { // eslint-disable-line class-methods-use-this
    return {
      'alert-success': station.status === 'active',
      'alert-warning': station.status === 'pending-reception',
      'alert-danger': station.status === 'inactive',
    };
  }

  stationStatusName(station: any) { // eslint-disable-line class-methods-use-this
    if (station.status === 'active') {
      return 'Healthy';
    }
    if (station.status === 'inactive') {
      return 'Not Working';
    }
    if (station.status === 'pending-reception') {
      return 'Potential Issue';
    }
    return 'Not Working';
  }
}
</script>
