<template>
  <div class="m-0 p-0">
    <div class="p-4 bg-white border">
      <div
        v-if="!filterDataIsReady()"
        class="ml-3 mr-3 filter-overlay d-flex align-items-center justify-content-center"
        >
        <b-spinner
          type="grow"
          style="width: 4rem; height: 4rem;"
          />
      </div>
      <h4 class="mb-4">Filters</h4>
      <div class="mb-4">
        <label>Stations</label>
        <multiselect
          v-model="filterIncludeStations"
          placeholder="Select Stations to Include"
          label="ident"
          track-by="ident"
          open-direction="bottom"
          :options="$props.knownStations"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="false"
          :preselect-first="false"
          :disabled="!filterDataIsReady()"
          :searchable="true"
          :hide-selected="true"
          :internal-search="true"
          :loading="isStationsLoading"
          @input="onFiltersUpdated"
          />
      </div>

      <div class="mb-4">
        <label>Airframes</label>
        <multiselect
          v-model="filterIncludeAirframes"
          placeholder="Select Airframes to Include"
          label="tail"
          track-by="tail"
          open-direction="bottom"
          :multiple="true"
          :options="$props.knownAirframes"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="false"
          :preselect-first="false"
          :disabled="!filterDataIsReady()"
          :searchable="true"
          :hide-selected="true"
          :internal-search="true"
          :loading="isAirframesLoading"
          @input="onFiltersUpdated"
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
          :disabled="!filterDataIsReady()"
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
          placeholder="Select Labels to Include"
          label="displayName"
          track-by="displayName"
          :preselect-first="false"
          :disabled="!filterDataIsReady()"
          @input="onFiltersUpdated"
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
          :disabled="!filterDataIsReady()"
          @input="onFiltersUpdated"
          />
      </div>

      <div class="mb-4">
        <label>Text Search</label>
        <div>
          <input
            class="form-control"
            placeholder="Search message text"
            @change="textSearchChanged($event)"
            v-on:keyup.enter="textSearchEnter"
            v-model="filterIncludeTextSearch"
            :disabled="!filterDataIsReady()"
            />
        </div>
      </div>

      <div class="mb-4">
        <label>Timeframe</label>
        <div>
          <multiselect
            v-model="filterTimeframe"
            placeholder="Messages Since"
            track-by="value"
            label="name"
            :options="optionsForTimeframe"
            :allow-empty="false"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preselect-first="true"
            :preserve-search="false"
            :searchable="false"
            >
          </multiselect>
        </div>
      </div>

      <hr class="mb-4" />

      <b-button
        block
        size="sm"
        variant="outline-secondary"
        class="mb-2"
        @click="onCopySearchURL()"
        >
        <font-awesome-icon icon="copy" />
        Copy Search URL
      </b-button>

      <div v-if="showButton">
        <span v-if="isSearching">
          <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </span>
        <span v-else>
          <b-button
            @click="onFiltersUpdated()"
            :disabled="!filterDataIsReady()"
            block
            variant="info"
            >
            Search
          </b-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {
  Component,
  Emit,
  Vue,
  Prop,
  PropSync,
  Watch,
} from 'vue-property-decorator';

import Multiselect from 'vue-multiselect';

@Component({
  components: {
    Multiselect,
  },
})

export default class MessageFilters extends Vue {
  @Prop({ default: false })
  private isSearching!: boolean;

  @Prop({ default: [] })
  private knownAirframes!: Array<any>;

  @Prop({ default: [] })
  private knownStations!: Array<any>;

  @PropSync('selectedAirframeIds')
  private airframeIds!: Array<any>;

  @PropSync('selectedLabels')
  private labels!: Array<any>;

  @PropSync('selectedStationIds')
  private stationIds!: Array<any>;

  @PropSync('selectedText')
  private text!: Array<any>;

  @PropSync('selectedTimeframe')
  private timeframe!: String;

  @Prop({ default: false })
  private showButton!: boolean;

  @Emit()
  onFiltersUpdated() {
    console.log('Filters clicked.');
    const airframeIdsToInclude = this.filterIncludeAirframes.map((airframe: any) => airframe.id);
    const errorsToExclude = this.filterExcludeErrors.map((value: any) => value.error);
    const labelsToExclude = this.filterExcludeLabels.map((value: any) => value.label);
    const labelsToInclude = this.filterIncludeLabels.map((value: any) => value.label);
    const stationIdsToInclude = this.filterIncludeStations.map((station: any) => station.id);
    const textToInclude = this.filterIncludeTextSearch;
    const timeframeToUse = this.filterTimeframe.value;

    return {
      airframeIdsToInclude,
      errorsToExclude,
      labelsToExclude,
      labelsToInclude,
      stationIdsToInclude,
      textToInclude,
      timeframeToUse,
    };
  }

  @Watch('knownAirframes')
  onAirframesChanged(val: any, oldVal: any) {
    this.filterAirframes(val);
  }

  @Watch('knownStations')
  onStationsChanged(val: any, oldVal: any) {
    this.filterStations(val);
  }

  @Watch('labels')
  onLabelsChanged(val: any, oldVal: any) {
    this.filterIncludeLabels = this.optionsForFilterLabels().filter((option: any) => this.labels.includes(option.label)); // eslint-disable-line max-len
  }

  @Watch('text')
  onTextChanged(val: any, oldVal: any) {
    this.filterIncludeTextSearch = val;
  }

  optionsForFilterExcludeErrors = [
    { name: 'Level 0', error: 0 },
    { name: 'Level 1', error: 1 },
    { name: 'Level 2', error: 2 },
    { name: 'Level 3', error: 3 },
  ]

  optionsForTimeframe = [
    { name: 'Within Last Day', value: 'last-day' },
    { name: 'Within Last Week', value: 'last-week' },
    { name: 'Within Last Month', value: 'last-month' },
    { name: 'Within Last 3 Months', value: 'last-3-months' },
    // { name: 'Within Last 6 Months', value: 'last-6-months' },
    // { name: 'Within Last Year', value: 'last-year' },
    // { name: 'All Time', value: 'all-time' },
  ]

  defaultFilterLabels = ['_d', 'Q0'];

  filterIncludeAirframes : Array<any> = [];

  filterIncludeLabels : Array<any> = [];

  filterIncludeTextSearch = '';

  filterIncludeStations : Array<any> = [];

  filterExcludeErrors : Array<any> = [{ error: 3, name: 'Level 3' }]

  filterExcludeLabels : Array<any> = this.optionsForFilterLabels().filter((option: any) => this.defaultFilterLabels.includes(option.label)); // eslint-disable-line max-len

  filterTimeframe = { name: 'Within Last Week', value: 'last-week' };

  isAirframesLoading = false;

  isStationsLoading = false;

  copyMessage(val: string) { // eslint-disable-line class-methods-use-this
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  mounted() {
    this.filterAirframes(this.knownAirframes);
    this.filterStations(this.knownStations);
  }

  filterAirframes(airframes: any[]) {
    console.log('MessageFilters: Filtering airframes');
    console.log(airframes);
    console.log(this.airframeIds);
    this.filterIncludeAirframes = airframes.filter((airframe: any) => this.airframeIds.includes(airframe.id)); // eslint-disable-line max-len
  }

  filterStations(stations: any[]) {
    console.log('MessageFilters: Filtering stations');
    console.log(stations);
    console.log(this.stationIds);
    this.filterIncludeStations = stations.filter((station: any) => this.stationIds.includes(station.id)); // eslint-disable-line max-len
  }

  filterDataIsReady() : boolean { // eslint-disable-line class-methods-use-this
    // return (this.knownAirframes.length > 0) && (this.knownStations.length > 0);
    return true;
  }

  optionsForFilterLabels() : Array<any> {
    const labelsObj = this.$store.state.acarsData.labels;
    const labels = Object.keys(labelsObj).map((key) => labelsObj[key]);
    const values = labels.map((label) => {
      const fixedLabel = label;
      fixedLabel.displayName = `${label.label} - ${label.name}`;
      return fixedLabel;
    });
    return values;
  }

  onCopySearchURL() {
    console.log('Copy Search URL clicked.');
    let newLocation = document.location.toString();
    if (!newLocation.includes('action=execute')) {
      newLocation += '&action=execute';
    }

    this.copyMessage(newLocation);
  }

  textSearchChanged(event: any) {
    if (event && event.target) {
      this.filterIncludeTextSearch = event.target.value;
    }
  }

  textSearchEnter(event: any) {
    this.filterIncludeTextSearch = event.target.value;
    this.onFiltersUpdated();
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.filter-overlay {
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 2;
  cursor: pointer;
}
</style>
