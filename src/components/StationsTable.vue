<template>
  <table class="table table-sm table-bordered">
    <tr>
      <th>ID</th>
      <th>Ident</th>
      <th>IP Address</th>
      <th># of Messages</th>
      <th>Last Heard</th>
    </tr>
    <tr v-for="station in stations"
        :key="station.id">
      <td>{{ station.id }}</td>
      <td>{{ station.ident }}</td>
      <td>{{ ipMask(station.ipAddress) }}</td>
      <td>{{ station.messagesCount }}</td>
      <td>
        <span v-if="station.lastReportAt">
          {{ station.lastReportAt | moment("from", "now") }}
        </span>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { HostUtils } from '../utilities/host_utils';

@Component
export default class StationsTable extends Vue {
  @Prop() private stations!: Array<Object>;

  hostUtils = new HostUtils();

  ipMask(ipAddress: string) : string { // eslint-disable-line class-methods-use-this
    return this.hostUtils.ipMask(ipAddress);
  }

  lastHeardFromStation(station: any) : string {
    const last = this.$store.state.lastMessageFromStations[station.id];

    let lastHeard;
    if (last) {
      lastHeard = last.when;
    }
    return lastHeard;
  }
}
</script>

<style scoped>

</style>
