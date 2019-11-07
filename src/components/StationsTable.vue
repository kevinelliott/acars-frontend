<template>
  <div>
    <b-table
      bordered
      responsive="sm"
      small
      selectable="false"
      :items="myProvider()"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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
    { key: 'messagesCount', label: '# of Messages', sortable: true },
    {
      key: 'lastReportAt',
      label: 'Last Heard',
      sortable: true,
      formatter: (value: any, key: any, item: any) => { // eslint-disable-line arrow-body-style
        return this.$moment(value).fromNow();
      },
    },
  ];

  hostUtils = new HostUtils();

  ipMask(ipAddress: string) : string {
    return this.hostUtils.ipMask(ipAddress);
  }

  myProvider(ctx: any) {
    const items = [];
    for (const station of this.stations) { // eslint-disable-line no-restricted-syntax
      const mergedStation = {
        id: station.id,
        ident: station.ident,
        ipAddress: this.ipMask(station.ipAddress),
        messagesCount: station.messagesCount,
        lastReportAt: station.lastReportAt,
      };
      items.push(mergedStation);
    }
    return items || [];
  }
}
</script>

<style scoped>

</style>
