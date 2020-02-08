<template>
  <div class="mb-4 p-4 bg-light border">
    <h4 class="mb-4">Filters</h4>
    <div class="mb-4">
      <label>Stations</label>
      <multiselect
        v-model="filterIncludeStations"
        :options="$props.knownStations"
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
        :options="$props.knownAirframes"
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

    <div
      v-if="showButton"
      class="mb-4"
      >
      <b-button @click="onFiltersUpdated()">
        Update
      </b-button>
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
  @Prop() private knownAirframes!: Array<any>;

  @Prop() private knownStations!: Array<any>;

  @PropSync('selectedAirframeIds') private airframeIds!: Array<any>;

  @Prop() private showButton!: boolean;

  @Emit()
  onFiltersUpdated() {
    console.log('Filters clicked.');
    console.log(this.filterIncludeAirframes);
    const airframeIdsToInclude = this.filterIncludeAirframes.map((airframe: any) => airframe.id);
    const errorsToExclude = this.filterExcludeErrors.map((value: any) => value.error);
    const labelsToExclude = this.filterExcludeLabels.map((value: any) => value.label);
    const labelsToInclude = this.filterIncludeLabels.map((value: any) => value.label);
    const stationIdsToInclude = this.filterIncludeStations.map((station: any) => station.id);
    const textToInclude = this.filterIncludeTextSearch;

    return {
      airframeIdsToInclude,
      errorsToExclude,
      labelsToExclude,
      labelsToInclude,
      stationIdsToInclude,
      textToInclude,
    };
  }

  @Watch('knownAirframes')
  onAirframesChanged(val: any, oldVal: any) {
    this.filterIncludeAirframes = val.filter((airframe: any) => this.airframeIds.includes(airframe.id)); // eslint-disable-line max-len
  }

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

  textSearchChanged(event: any) {
    if (event && event.target) {
      this.filterIncludeTextSearch = event.target.value;
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>