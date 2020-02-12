<template>
  <div class="home p-4">
    <div class="container">
      <MessagesNav />
      <div class="row">
        <div class="col-4">
          <div class="mb-4 p-4 border bg-light">
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
            :selectedStationIds.sync="currentFilters().stationIdsToInclude"
            v-on:on-filters-updated="filtersUpdated"
            />
          <div class="mb-4">
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

  messages = [];

  queries: any = {
    exclude_errors: '3',
    exclude_labels: '_d,Q0',
    text: '',
  };

  created() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'prependNewLiveMessages'
        && !state.isLiveMessagesPaused
      ) {
        console.log('Updating messages...');
        this.messages = state.messagesLive;
        console.log(this.messages);
      }
    });

    window.addEventListener('keydown', (e) => {
      console.log(e.code);
      console.log(e.key);
      if (e.key === 'p' || e.key === ' ') {
        this.toggleLiveMessages();
      }
    });
  }

  currentFilters() {
    return this.filters;
  }

  filteredMessages() {
    console.log('filtered messages');
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
    console.log(filtered);

    return filtered;
  }

  filtersUpdated(filters: any) {
    this.filters = filters;
    console.log('Updated filters', filters);
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

    this.$router.replace({
      query: {
        ...this.queries,
      },
    }).catch((e: any) => {}); // eslint-disable-line max-len

    this.queries = { ...this.$route.query };
    console.log('Queries', this.queries);

    if (this.queries.airframe_ids) {
      const selectedIds = this.queries.airframe_ids.split(',').map((id: string) => Number(id));
      console.log('Selected IDs', selectedIds);
      this.filters.airframeIdsToInclude = selectedIds;
    }
  }

  @Watch('filters')
  onFiltersChanged(val: any, oldVal: any) {
    if (val.airframeIdsToInclude !== oldVal.airframeIdsToInclude) {
      console.log('Airframes filter changed', this.filters);
      if (val.airframeIdsToInclude.length > 0) {
        this.queries.airframe_ids = val.airframeIdsToInclude.join(',');
      } else {
        delete this.queries.airframe_ids;
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

      if (val.stationIdsToInclude.length > 0) {
        this.queries.station_ids = val.stationIdsToInclude.join(',');
      } else {
        delete this.queries.station_ids;
      }

      if (val.textToInclude) {
        this.queries.text = val.textToInclude;
      } else {
        delete this.queries.text;
      }
      this.updateRoute();
    }
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
