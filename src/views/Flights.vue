<template>
  <div style="height: 100%;">
    <FlightsNav style="height: 97px;" />
    <div style="height: -webkit-calc(100% - 97px); height: calc(100% - 97px);">
      <FlightsMap
        :flights="activeFlights"
        style="height: -webkit-calc(100% - 300px); height: calc(100% - 300px);"
        />
      <FlightsTable :flights="activeFlights" style="height: 300px;" />
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
