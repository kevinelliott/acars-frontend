<template>
  <div class="bg-white" style="height: 300px;">
    <b-table
      bordered
      responsive="sm"
      small
      selectable="false"
      sticky-header
      head-variant="dark"
      :items="myProvider()"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';

@Component
export default class FlightsTable extends Vue {
  @Prop() private flights!: Array<any>;

  sortBy = 'lastHeard';

  sortDesc = true;

  fields = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'airframe', sortable: true },
    { key: 'flight', sortable: true },
    { key: 'departingAirport', label: 'Departing Airport', sortable: true },
    { key: 'destinationAirport', label: 'Destination Airport', sortable: true },
    { key: 'coordinates', sortable: true },
    { key: 'altitude', sortable: true },
    { key: 'status', sortable: true },
    { key: 'messagesCount', label: '# of Messages', sortable: true },
    {
      key: 'lastHeard',
      sortable: true,
      formatter: (value: any, key: any, item: any) => { // eslint-disable-line arrow-body-style
        return moment(value).fromNow();
      },
    },
  ];

  myProvider(ctx: any) {
    const items = [];
    for (const flight of this.flights) { // eslint-disable-line no-restricted-syntax
      const mergedFlight = {
        id: flight.id,
        airframe: flight.airframe.tail,
        flight: flight.flight,
        messagesCount: flight.messagesCount,
        departingAirport: flight.departingAirport,
        destinationAirport: flight.destinationAirport,
        coordinates: flight.latitude ? `${flight.latitude}, ${flight.longitude}` : '',
        altitude: flight.altitude,
        status: flight.status,
        lastHeard: flight.updatedAt,
      };
      items.push(mergedFlight);
    }
    return items || [];
  }
}
</script>

<style scoped>

</style>
