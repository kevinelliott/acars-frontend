<template>
  <table class="table table-sm table-bordered">
    <tr>
      <th>ID</th>
      <th>Ident</th>
      <th>IP Address</th>
      <th># of Messages</th>
    </tr>
    <tr v-for="station in stations"
        :key="station.id">
      <td>{{ station.id }}</td>
      <td>{{ station.ident }}</td>
      <td>{{ station.ipAddress }}</td>
      <td>{{ station.messagesCount }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StationsTable extends Vue {
  @Prop() private stations!: Array<Object>;
}
</script>

<style scoped>

</style>
