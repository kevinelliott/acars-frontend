<template>
  <div class="home">
    <div class="container">
      <h3>Stations</h3>
      <StationsTable :stations="stations" />
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
