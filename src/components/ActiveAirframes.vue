<template>
  <div>
    <h4 class="mb-1">Active Airframes</h4>
    <div class="mb-3 text-muted">Heard within last 5 minutes</div>
    <table class="table table-sm">
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

@Component({

})
export default class ActiveAirframes extends Vue {
  lastMessageFromAirframes() : Object {
    return this.$store.state.lastMessageFromAirframes;
  }
}
</script>

<style scoped>

</style>