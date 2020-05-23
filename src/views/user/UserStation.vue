<template>
  <div class="about text-center">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Ground Station</h3>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h3 class="mb-0">
          3 - KE-KMHR1
          <div class="pull-right">
            <button class="mr-2 btn btn-primary">Edit</button>
            <button class="btn btn-danger">Destroy</button>
          </div>
        </h3>
      </div>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h4 class="mb-4">Specifications</h4>
        <div class="row">
          <div class="col-6">
            <table class="table table-hover mb-0 bg-white">
              <tr>
                <td>UUID</td>
                <td>66A8B7A3-15B8-4C73-8A49-5B7E7C8E857F</td>
              </tr>
              <tr>
                <td>Owner</td>
                <td>Kevin Elliott</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>CM98kq</td>
              </tr>
              <tr>
                <td>Nearest Airport</td>
                <td>Mather</td>
              </tr>
              <tr>
                <td>Platform</td>
                <td>Raspberry Pi 3+</td>
              </tr>
              <tr>
                <td>Operating System</td>
                <td>Raspbian Buster</td>
              </tr>
              <tr>
                <td>SDR</td>
                <td>RTL-SDR v3</td>
              </tr>
              <tr>
                <td>Filters</td>
                <td>FM Bandstop</td>
              </tr>
              <tr>
                <td>Antenna</td>
                <td>DPD Outdoor Airband</td>
              </tr>
              <tr>
                <td>Ingest</td>
                <td>ACARS @ feed.acars.io:5550</td>
              </tr>
              <tr>
                <td>Feeder Client</td>
                <td>acarsdec</td>
              </tr>
            </table>
          </div>
          <div class="col-6">
            <Map
              style="height: 100%;"
              />
          </div>
        </div>
      </div>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h4 class="mb-4">Recent Messages</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Map from '@/components/shared/Map.vue';

@Component({
  components: {
    Map,
  },
})
export default class UserStation extends Vue {
}
</script>
