<template>
  <div class="about text-center">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Your Dashboard</h3>
      <router-link :to="`/user/station/${station.id}`">Ground Station Detail</router-link>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h3 class="mb-0">
          Edit Ground Station {{ station.id }}
          <div class="pull-right">
            <b-button
              :to="`/user/station/${id}`"
              variant="default"
              class="mr-2">
              Cancel
            </b-button>
            <b-button variant="primary" @click="handleSave">Save</b-button>
          </div>
        </h3>
      </div>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <div class="row">
          <div class="col-6">
            <b-card
              title="Basic Info"
              bd-variant="light"
              class="mb-4"
              >
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="UUID"
                    >
                    <input
                      type="text"
                      name="uuid"
                      placeholder="This is auto-generated."
                      class="form-control"
                      :value="station.uuid"
                      disabled
                      >
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Name / Ident"
                    >
                    <input
                      type="text"
                      name="name"
                      placeholder="KE-KMHR1"
                      class="form-control"
                      :value="station.ident"
                      >
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Description">
                    <b-form-textarea
                      name="description"
                      placeholder="Describe the ground station for its public page."
                      class="form-control"
                      >
                    </b-form-textarea>
                  </b-form-group>
                </div>
              </div>
            </b-card>

            <b-card
              title="System"
              bd-variant="light"
              class="mb-4"
              >
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Platform">
                    <input
                      type="text"
                      name="name"
                      placeholder="Raspberry Pi 3+"
                      class="form-control"
                      :value="station.systemPlatform"
                      >
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Operating System">
                    <input
                      type="text"
                      name="name"
                      placeholder="Raspbian Buster"
                      class="form-control"
                      :value="station.systemOS"
                      >
                  </b-form-group>
                </div>
              </div>
            </b-card>

            <b-card
              title="Connection"
              sub-title="Automatically detected. If it is wrong, please contact the admin."
              bd-variant="light"
              class="mb-4"
              >
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Ingest">
                    <input
                      type="text"
                      name="ingest"
                      placeholder="ACARS (Host: feed.airframes.io, Port: 5550)"
                      class="form-control"
                      :value="station.source_type"
                      disabled
                      >
                  </b-form-group>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Feeder Client">
                    <input
                      type="text"
                      name="feeder_client"
                      placeholder="acarsdec"
                      class="form-control"
                      disabled>
                  </b-form-group>
                </div>
              </div>
            </b-card>
          </div>
          <div class="col-6">
            <b-card
              title="Location"
              sub-title="The location of your radio and antenna."
              bd-variant="light"
              class="mb-4"
              >
              <div class="row">
                <div class="col-4">
                  <b-form-group
                    label="Latitude">
                    <input
                      type="text"
                      name="latitude"
                      placeholder="38.21312"
                      :value="station.latitude"
                      class="form-control"
                      >
                  </b-form-group>
                </div>
                <div class="col-4">
                  <b-form-group
                    label="Longitude">
                    <input
                      type="text"
                      name="longitude"
                      placeholder="-121.99112"
                      :value="station.longitude"
                      class="form-control"
                      >
                  </b-form-group>
                </div>
                <div class="col-4">
                  <b-form-group
                    label="Altitude (feet ASL)">
                    <input
                      type="text"
                      name="altitude"
                      placeholder="50"
                      :value="station.altitude"
                      class="form-control"
                      >
                  </b-form-group>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Nearest Airport">
                    <input
                      type="text"
                      name="name"
                      placeholder="KMHR"
                      :value="station.nearestAirportIcao"
                      class="form-control"
                      >
                  </b-form-group>
                </div>
              </div>
            </b-card>

            <b-card
              title="Equipment"
              bd-variant="light"
              class="mb-4"
              >
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="SDR">
                    <input
                      type="text"
                      name="sdr"
                      placeholder="RTL-SDR v3"
                      :value="station.equipmentSdr"
                      class="form-control"
                      >
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Filter">
                    <input
                      type="text"
                      name="sdr"
                      placeholder="FM Bandstop"
                      :value="station.equipmentFilters"
                      class="form-control"
                      >
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Antenna">
                    <input
                      type="text"
                      name="sdr"
                      placeholder="DPD Airband Outdoor"
                      :value="station.equipmentAntenna"
                      class="form-control"
                      >
                  </b-form-group>
                </div>
              </div>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import Map from '@/components/shared/Map.vue';

@Component({
  components: {
    Map,
  },
})
export default class EditUserStation extends Vue {
  id = 0;

  station = {
    id: 'N/A',
    ident: 'N/A',
  };

  @Watch('$route')
  onPropertyChanged(newValue, oldValue) {
    if (newValue.params.id && newValue.params.id !== oldValue.params.id) {
      this.refresh();
    }
  }

  beforeMount() {
    this.refresh();
  }

  handleSave() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }
      this.$store.dispatch('userStation/save', this.station).then(
        () => {
          this.loading = false;
          Vue.toasted.show('Saved ground station.');
          this.$router.push(`/user/station/${this.station.id}`);
        },
        (error) => {
          this.loading = false;
          this.message = (error.response && error.response.data)
            || error.message
            || error.toString();
        },
      );
    });
  }

  refresh() {
    console.log(this.$route.params);
    this.id = Number(this.$route.params.id);
    this.station = this.$store.state.auth.user.stations.find((station) => station.id === this.id);
  }
}
</script>
