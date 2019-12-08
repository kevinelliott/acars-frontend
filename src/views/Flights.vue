<template>
  <div class="home">
    <div class="container">
      <h3>Flights</h3>
      <FlightsMap />
      <FlightsTable :flights="activeFlights" class="mb-4" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import FlightsMap from '@/components/flights/FlightsMap.vue';
import FlightsTable from '@/components/flights/FlightsTable.vue';

@Component({
  components: {
    FlightsMap,
    FlightsTable,
  },
})
export default class Flights extends Vue {
  get activeFlights() {
    return this.$store.state.activeFlights;
  }
}
</script>
