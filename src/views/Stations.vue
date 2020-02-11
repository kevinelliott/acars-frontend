<template>
  <div class="home p-4">
    <div class="container">
      <h3>Stations</h3>
      <p>
        The following is a list of feeder stations delivering messages heard by SDR equipment
        located at various locations around the world. The number of messages and last heard
        update at an interval of 5 seconds and reflect near realtime status of these stations.
      </p>
      <div v-if="stations && stations.length > 0">
        <StationsTable :stations="stations" />
      </div>
      <div v-else>
        Initial stations data is pending...
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import StationsTable from '@/components/StationsTable.vue';

@Component({
  components: {
    StationsTable,
  },
})
export default class Stations extends Vue {
  get stations() {
    return this.$store.state.stations;
  }
}
</script>
