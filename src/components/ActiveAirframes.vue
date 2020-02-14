<template>
  <div class="p-4 bg-white border">
    <h4 class="mb-1">Active Airframes</h4>
    <div class="mb-3 text-muted">Heard within last 5 minutes</div>
    <table class="table table-sm">
      <tr v-if="$store.state.isLiveMessagesPaused">
        <td colspan="2">Live messages are paused.</td>
      </tr>
      <tr v-for="last in lastMessageFromAirframes()"
        :class="lastMessageClass(last)"
        :key="`last-heard-${last.tail}`">
        <td>{{ last.tail }}</td>
        <td>{{ new Date(last.when) | moment("from", "now") }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';

@Component({

})
export default class ActiveAirframes extends Vue {
  lastMessageClass(last: any) : any { // eslint-disable-line class-methods-use-this
    const lastDate = moment(last.when);
    const now = moment();
    const diff = now.diff(lastDate, 'minutes');

    return {
      'text-muted': diff >= 2,
    };
  }

  lastMessageFromAirframes() : Object {
    return this.$store.state.lastMessageFromAirframes;
  }
}
</script>

<style scoped>

</style>
