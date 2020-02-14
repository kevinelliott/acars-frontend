<template>
  <div class="home">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Stations</h3>
    </div>
    <div class="border-bottom">
      <div class="container p-4">
        The following is a list of feeder stations delivering messages heard by SDR equipment
        located at various locations around the world. The number of messages and last heard
        update at an interval of 5 seconds and reflect near realtime status of these stations.
      </div>
    </div>
    <div class="container p-4">
      <div v-if="stations && stations.length > 0">
        <StationsTable :stations="stations" class="bg-white" />
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
