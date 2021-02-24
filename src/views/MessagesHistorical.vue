<template>
  <div class="home">
    <MessagesNav />
    <div class="p-4 bg-light">
      <div class="row">
        <div class="col-4">
          <MessageFilters
            :knownAirframes="knownAirframes"
            :knownStations="knownStations"
            :selectedAirframeIds.sync="currentFilters().airframeIdsToInclude"
            :selectedLabels.sync="currentFilters().labelsToInclude"
            :selectedExcludeLabels.sync="currentFilters().labelsToExclude"
            :selectedStationIds.sync="currentFilters().stationIdsToInclude"
            :selectedText.sync="currentFilters().textToInclude"
            :selectedTimeframe.sync="currentFilters().timeframe"
            v-on:on-filters-updated="filtersUpdated"
            :showButton="true"
            :isSearching="isSearching"
            />
        </div>
        <div class="col-8">
          <MessagesList
            :instructions="instructions"
            :messages="messages"
            :isSearching="isSearching"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import { MessageFilter } from '@/utilities/MessageFilter';
import MessageFilters from '@/components/messages/MessageFilters.vue';
import MessagesList from '@/components/MessagesList.vue';
import MessagesNav from '@/components/MessagesNav.vue';

@Component({
  components: {
    MessageFilters,
    MessagesList,
    MessagesNav,
  },
})
export default class MessagesHistorical extends Vue {
  @Watch('filters')
  onFiltersChanged(val: any, oldVal: any) {
    console.log('Filters have changed', this.filters);
    if (val.airframeIdsToInclude.length > 0) {
      this.queries.airframe_ids = val.airframeIdsToInclude.join(',');
    } else {
      delete this.queries.airframe_ids;
    }

    if (val.stationIdsToInclude.length > 0) {
      this.queries.station_ids = val.stationIdsToInclude.join(',');
    } else {
      delete this.queries.station_ids;
    }

    if (val.errorsToExclude.length > 0) {
      this.queries.exclude_errors = val.errorsToExclude.join(',');
    } else {
      delete this.queries.exclude_errors;
    }

    if (val.labelsToExclude.length > 0) {
      this.queries.exclude_labels = val.labelsToExclude.join(',');
    } else {
      delete this.queries.exclude_labels;
    }

    if (val.labelsToInclude.length > 0) {
      this.queries.labels = val.labelsToInclude.join(',');
    } else {
      delete this.queries.labels;
    }

    if (val.stationIdsToInclude.length > 0) {
      this.queries.station_ids = val.stationIdsToInclude.join(',');
    } else {
      delete this.queries.station_ids;
    }

    if (val.textToInclude && val.textToInclude !== '') {
      this.queries.text = val.textToInclude;
    } else {
      delete this.queries.text;
    }

    if (val.timeframeToUse && val.timeframeToUse !== '') {
      this.queries.timeframe = val.timeframeToUse;
    } else {
      delete this.queries.timeframe;
    }
    this.updateRoute();
  }

  airframes: any = [];

  filters: any = {
    airframeIdsToInclude: [],
    errorsToExclude: [],
    labelsToExclude: [],
    labelsToInclude: [],
    stationIdsToInclude: [],
    textToInclude: '',
    timeframeToUse: 'last-week',
  };

  instructions = 'Begin searching the historical archives by selecting filters to the left and then click Search.';

  isSearching = false;

  messages = [];

  queries: any = {
    exclude_errors: '3',
    exclude_labels: '_d,Q0',
  };

  currentFilters() {
    return this.filters;
  }

  created() {
    console.log('Query params', this.$route.query);

    // this.$router.replace({
    //   query: {
    //     ...this.queries,
    //   },
    // }).catch((e: any) => {}); // eslint-disable-line max-len

    this.queries = { ...this.$route.query };
    console.log('Queries', this.queries);

    if (this.queries.airframe_ids) {
      const selectedIds = this.queries.airframe_ids.split(',').map((id: string) => Number(id));
      this.filters.airframeIdsToInclude = selectedIds;
    }

    if (this.queries.labels && this.queries.labels !== '') {
      const selectedLabels = this.queries.labels.split(',');
      this.filters.labelsToInclude = selectedLabels;
    }

    if (this.queries.exclude_labels) {
      const selectedLabels = this.queries.exclude_labels.split(',');
      this.filters.labelsToExclude = selectedLabels;
    }

    if (this.queries.station_ids) {
      const selectedIds = this.queries.station_ids.split(',').map((id: string) => Number(id));
      this.filters.stationIdsToInclude = selectedIds;
    }

    if (this.queries.text && this.queries.text !== '') {
      this.filters.textToInclude = this.queries.text;
    }

    if (this.queries.timeframe && this.queries.timeframe !== '') {
      this.filters.timeframeToUse = this.queries.timeframe;
    }
  }

  mounted() {
    if (this.queries.action === 'execute') {
      this.fetchMessages();
    }
  }

  fetchMessages() {
    this.isSearching = true;
    this.messages = [];
    Vue.axios({
      url: `${this.$store.state.apiServerBaseUrl}/messages`,
      method: 'GET',
      params: {
        airframe_ids: this.filters.airframeIdsToInclude.join(','),
        exclude_errors: this.filters.errorsToExclude.join(','),
        exclude_labels: this.filters.labelsToExclude.join(','),
        labels: this.filters.labelsToInclude.join(','),
        station_ids: this.filters.stationIdsToInclude.join(','),
        text: this.filters.textToInclude,
        timeframe: this.filters.timeframeToUse,
      },
    }).then((response) => {
      console.log('Fetched messages.');
      this.saveMessages(response.data);
      this.isSearching = false;
    });
  }

  filtersUpdated(filters: any) {
    this.filters = filters;
    console.log('Updated filters', filters);

    this.fetchMessages();
  }

  get knownAirframes() {
    const result = [];
    const map = new Map();
    for (const airframe of this.$store.state.airframes) { // eslint-disable-line no-restricted-syntax,max-len
      if (!map.has(airframe.id) && airframe.tail !== '') {
        map.set(airframe.id, true);
        result.push(airframe);
      }
    }
    return result;
  }

  get knownStations() {
    const result = [];
    const stations = this.$store.state.stations.sort((a: any, b: any) => (a.ident > b.ident ? 1 : -1)); // eslint-disable-line max-len
    const map = new Map();
    for (const station of stations) { // eslint-disable-line no-restricted-syntax
      if (!map.has(station.id) && station.ident !== '') {
        map.set(station.id, true);
        result.push(station);
      }
    }
    return result;
  }

  saveMessages(messages: any) {
    this.messages = messages;
    console.log('Saved messages.');
  }

  updateRoute() {
    this.$router.push({
      query: {
        ...this.queries,
      },
    }).catch((e: any) => {}); // eslint-disable-line max-len
  }
}
</script>
