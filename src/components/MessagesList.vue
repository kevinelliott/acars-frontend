<template>
  <div class="row" v-if="enableActiveAirframes || enableFilters">
    <div class="col-4">

      <div class="mb-4 p-4 bg-light border">
        <h4 class="mb-4">Filters</h4>
        <div class="mb-4">
          <label>Stations</label>
          <multiselect
            v-model="filterIncludeStations"
            :options="knownStations"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select Stations to Include"
            label="ident"
            track-by="ident"
            :preselect-first="false"
            />
        </div>

        <div class="mb-4">
          <label>Airframes</label>
          <multiselect
            v-model="filterIncludeAirframes"
            :options="knownAirframes"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select Airframes to Include"
            label="tail"
            track-by="tail"
            :preselect-first="false"
            />
        </div>

        <div class="mb-4">
          <label>Errors to Exclude</label>
          <multiselect
            v-model="filterExcludeErrors"
            :options="optionsForFilterExcludeErrors"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select Errors to Exclude"
            label="name"
            track-by="name"
            :preselect-first="true"
            />
        </div>

        <div class="mb-4">
          <label>Labels to Include</label>
          <multiselect
            v-model="filterIncludeLabels"
            :options="optionsForFilterLabels()"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select Labels to Exclude"
            label="displayName"
            track-by="displayName"
            :preselect-first="false"
            />
        </div>

        <div class="mb-4">
          <label>Labels to Exclude</label>
          <multiselect
            v-model="filterExcludeLabels"
            :options="optionsForFilterLabels()"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select Labels to Exclude"
            label="displayName"
            track-by="displayName"
            :preselect-first="false"
            />
        </div>

        <div class="mb-4">
          <label>Text Search</label>
          <div>
            <input
              class="form-control"
              placeholder="Search message text"
              @change="textSearchChanged($event)"
              />
          </div>
        </div>

        <div>
          Matching {{ filteredMessages.length }} of {{ messages.length }} Messages
        </div>
      </div>

      <ActiveAirframes v-if="enableActiveAirframes" />
    </div>
    <div class="col-8">
      <MessagesLivePaused />
      <LoadingDots v-if="filteredMessages.length == 0" />
      <MessagesListItemSlim
        v-for="message in filteredMessages"
        :key="`message-list-item-${message.id}`"
        :message="message"
        />
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12">
      <MessagesLivePaused />
      <MessagesListItemSlim
        v-for="message in filteredMessages"
        :key="`message-list-item-slim-${message.id}`"
        :message="message"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Multiselect from 'vue-multiselect';
import moment from 'moment-timezone';

import ActiveAirframes from '@/components/ActiveAirframes.vue';
import LoadingDots from '@/components/shared/LoadingDots.vue';
import { MessageFilter } from '@/utilities/MessageFilter';
import MessagesListItem from '@/components/MessagesListItem.vue';
import MessagesListItemSlim from '@/components/MessagesListItemSlim.vue';
import MessagesLivePaused from '@/components/messages/MessagesLivePaused.vue';

@Component({
  props: {
    enableActiveAirframes: {
      default: false,
    },
    enableFilters: {
      default: false,
    },
  },
  components: {
    ActiveAirframes,
    LoadingDots,
    MessagesListItem,
    MessagesListItemSlim,
    MessagesLivePaused,
    Multiselect,
  },
})
export default class MessagesList extends Vue {
  @Prop() private messages!: Array<Object>;

  @Prop({ default: null }) private messagesCountMaximum!: Number;

  optionsForFilterExcludeErrors = [
    { name: 'Level 0', error: 0 },
    { name: 'Level 1', error: 1 },
    { name: 'Level 2', error: 2 },
    { name: 'Level 3', error: 3 },
  ]

  defaultFilterLabels = ['_d', 'Q0'];

  filterIncludeAirframes : Array<any> = [];

  filterIncludeLabels : Array<any> = [];

  filterIncludeTextSearch = '';

  filterIncludeStations : Array<any> = [];

  filterExcludeErrors : Array<any> = [{ error: 3, name: 'Level 3' }]

  filterExcludeLabels : Array<any> = this.optionsForFilterLabels().filter((option: any) => this.defaultFilterLabels.includes(option.label)); // eslint-disable-line max-len

  get filteredMessages() {
    console.log('filtered messages');
    const airframeIdsToInclude = this.filterIncludeAirframes.map((airframe: any) => airframe.id);
    const errorsToExclude = this.filterExcludeErrors.map((value: any) => value.error);
    const labelsToExclude = this.filterExcludeLabels.map((value: any) => value.label);
    const labelsToInclude = this.filterIncludeLabels.map((value: any) => value.label);
    const stationIdsToInclude = this.filterIncludeStations.map((station: any) => station.id);
    const textToInclude = this.filterIncludeTextSearch;

    return new MessageFilter(this.messages)
      .includeByStations(stationIdsToInclude)
      .includeByLabels(labelsToInclude)
      .includeByAirframes(airframeIdsToInclude)
      .includeByText(textToInclude)
      .excludeByLabels(labelsToExclude)
      .excludeByErrors(errorsToExclude)
      .limit(500)
      .filter();
  }

  get knownAirframes() {
    const result = [];
    const airframes = this.messages.map((message: any) => message.airframe);
    const map = new Map();
    for (const airframe of airframes) { // eslint-disable-line no-restricted-syntax
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

  optionsForFilterLabels() : Array<any> {
    const labelsObj = this.$store.state.acarsData.labels;
    const labels = Object.keys(labelsObj).map(key => labelsObj[key]);
    const values = labels.map((label) => {
      const fixedLabel = label;
      fixedLabel.displayName = `${label.label} - ${label.name}`;
      return fixedLabel;
    });
    return values;
  }

  textSearchChanged(event: any) {
    if (event && event.target) {
      this.filterIncludeTextSearch = event.target.value;
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
</style>
