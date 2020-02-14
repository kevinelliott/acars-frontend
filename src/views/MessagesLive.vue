<template>
  <div class="home">
    <MessagesNav />
    <div class="p-4 bg-light">
      <div class="row">
        <div class="col-4">
          <div class="mb-4 p-4 border bg-white">
            <h4 class="mb-4">Control</h4>
            <div class="font-weight-light text-muted">
              <span v-if="$store.state.isLiveMessagesPaused">
                <div>
                  <font-awesome-icon
                  icon="play-circle"
                  class="fa-2x"
                  v-on:click="playLiveMessages()"
                  />
                </div>
                Paused
              </span>
              <span v-else>
                <div>
                  <font-awesome-icon
                    icon="pause-circle"
                    class="fa-2x"
                    v-on:click="pauseLiveMessages()"
                    />
                </div>
                Updating
              </span>
            </div>
          </div>
          <MessageFilters
            :knownAirframes="knownAirframes"
            :knownStations="knownStations"
            :selectedAirframeIds.sync="currentFilters().airframeIdsToInclude"
            :selectedLabels.sync="currentFilters().labelsToInclude"
            :selectedExcludeLabels.sync="currentFilters().labelsToExclude"
            :selectedStationIds.sync="currentFilters().stationIdsToInclude"
            :selectedText.sync="currentFilters().textToInclude"
            v-on:on-filters-updated="filtersUpdated"
            :showButton="false"
            :isSearching="isSearching"
            />
          <div class="mt-4 mb-4 p-2 bg-white border">
            Showing {{ filteredMessages().length }} Messages
          </div>
          <ActiveAirframes />
        </div>
        <div class="col-8">
          <MessagesList :messages="messages" />
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

import ActiveAirframes from '@/components/ActiveAirframes.vue';
import { MessageFilter } from '@/utilities/MessageFilter';
import MessageFilters from '@/components/messages/MessageFilters.vue';
import MessagesList from '@/components/MessagesList.vue';
import MessagesNav from '@/components/MessagesNav.vue';

@Component({
  components: {
    ActiveAirframes,
    MessageFilters,
    MessagesList,
    MessagesNav,
  },
})
export default class MessagesLive extends Vue {
  airframes: any = [];

  filters: any = {
    airframeIdsToInclude: [],
    errorsToExclude: [],
    labelsToExclude: [],
    labelsToInclude: [],
    stationIdsToInclude: [],
    textToInclude: '',
  };

  instructions = 'Begin searching the historical archives by selecting filters to the left and then click Update.';

  isSearching = false;

  messages = [];

  queries: any = {
    exclude_errors: '3',
    exclude_labels: '_d,Q0',
    text: '',
  };

  currentFilters() {
    return this.filters;
  }

  created() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'prependNewLiveMessages'
        && !state.isLiveMessagesPaused
      ) {
        console.log('Updating messages...');
        this.messages = state.messagesLive;
        // console.log(this.messages);
      }
    });

    window.addEventListener('keydown', (e) => {
      // console.log(e.code);
      // console.log(e.key);
      if (e.key === 'p' || e.key === ' ') {
        this.toggleLiveMessages();
      }
    });
  }

  filteredMessages() {
    // const airframeIdsToInclude = this.filterIncludeAirframes.map((airframe: any) => airframe.id);
    // const errorsToExclude = this.filterExcludeErrors.map((value: any) => value.error);
    // const labelsToExclude = this.filterExcludeLabels.map((value: any) => value.label);
    // const labelsToInclude = this.filterIncludeLabels.map((value: any) => value.label);
    // const stationIdsToInclude = this.filterIncludeStations.map((station: any) => station.id);
    // const textToInclude = this.filterIncludeTextSearch;

    const filtered = new MessageFilter(this.messages)
      .includeByStations(this.filters.stationIdsToInclude)
      .includeByLabels(this.filters.labelsToInclude)
      .includeByAirframes(this.filters.airframeIdsToInclude)
      .includeByText(this.filters.textToInclude)
      .excludeByLabels(this.filters.labelsToExclude)
      .excludeByErrors(this.filters.errorsToExclude)
      .limit(500)
      .filter();

    console.log('Filtered messages.');
    // console.log(filtered);

    return filtered;
  }

  filtersUpdated(filters: any) {
    this.filters = filters;
    console.log('Updated filters.', filters);
  }

  get knownAirframes() {
    const result = [];
    const map = new Map();
    for (const airframe of this.airframes) { // eslint-disable-line no-restricted-syntax
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

  mounted() {
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

    this.fetchAirframes();
  }

  fetchAirframes() {
    Vue.axios({
      url: `${this.$store.state.apiServerBaseUrl}/airframes`,
      method: 'GET',
    }).then((response) => {
      console.log('Fetched airframes.');
      this.airframes = response.data;
    });
  }

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
    this.updateRoute();
  }

  pauseLiveMessages() {
    console.log('Pausing live messages.');
    this.$store.commit('pauseLiveMessages');
  }

  playLiveMessages() {
    console.log('Playing live messages.');
    this.$store.commit('playLiveMessages');
  }

  toggleLiveMessages() {
    if (this.$store.state.isLiveMessagesPaused) {
      this.playLiveMessages();
    } else {
      this.pauseLiveMessages();
    }
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
