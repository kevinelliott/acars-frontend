<template>
  <div>
    <b-table
      :selectable="false"
      :items="myProvider()"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      bordered
      responsive="sm"
      small
      />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';

import { HostUtils } from '../utilities/host_utils';

@Component
export default class StationsTable extends Vue {
  @Prop() private stations!: Array<any>;

  sortBy = 'messagesCount';

  sortDesc = true;

  fields = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'ident', sortable: true },
    { key: 'ipAddress', label: 'IP Address', sortable: true },
    { key: 'sourceType', label: 'Ingest', sortable: true },
    { key: 'messagesCount', label: '# of Messages', sortable: true },
    {
      key: 'status',
      sortable: true,
    },
    {
      key: 'lastReportAt',
      label: 'Last Heard',
      sortable: true,
      formatter: (value: any, key: any, item: any) => { // eslint-disable-line arrow-body-style
        return moment(value).fromNow();
      },
    },
  ];

  hostUtils = new HostUtils();

  statusString(status: String) { // eslint-disable-line class-methods-use-this
    let statusString = 'Unknown';

    switch (status) {
      case 'active':
        statusString = 'Active';
        break;
      case 'inactive':
        statusString = 'Inactive';
        break;
      case 'pending-reception':
        statusString = 'Pending Reception';
        break;
      default:
        statusString = 'Unknown';
        break;
    }

    return statusString;
  }

  statusColorClass(status: String) { // eslint-disable-line class-methods-use-this
    let colorClass = '';

    switch (status) {
      case 'active':
        colorClass = 'success';
        break;
      case 'inactive':
        colorClass = 'danger';
        break;
      case 'pending-reception':
        colorClass = 'warning';
        break;
      default:
        colorClass = '';
        break;
    }

    return colorClass;
  }

  myProvider(ctx: any) {
    const items = [];
    for (const station of this.stations) { // eslint-disable-line no-restricted-syntax
      const mergedStation = {
        id: station.id,
        ident: station.ident,
        ipAddress: station.ipAddress || 'Unknown',
        messagesCount: station.messagesCount,
        sourceApplication: station.sourceApplication,
        sourceProtocol: station.sourceProtocol,
        sourceType: station.sourceType,
        status: this.statusString(station.status),
        lastReportAt: station.lastReportAt,
        _cellVariants: { status: this.statusColorClass(station.status) },
      };
      items.push(mergedStation);
    }
    return items || [];
  }
}
</script>

<style scoped>

</style>
