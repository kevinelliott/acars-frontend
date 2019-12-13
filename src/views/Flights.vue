<template>
  <div class="home">
    <div>
      <FlightsNav />
      <FlightsMap :flights="activeFlights" />
      <div class="fixed-bottom" style="bottom: 33px; height: 300px;">
        <FlightsTable :flights="activeFlights" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import FlightsMap from '@/components/flights/FlightsMap.vue';
import FlightsNav from '@/components/flights/FlightsNav.vue';
import FlightsTable from '@/components/flights/FlightsTable.vue';

@Component({
  components: {
    FlightsMap,
    FlightsNav,
    FlightsTable,
  },
})
export default class Flights extends Vue {
  get activeFlights() {
    return this.$store.state.activeFlights;
  }
}
</script>
