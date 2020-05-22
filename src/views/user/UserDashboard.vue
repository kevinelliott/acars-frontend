<template>
  <div class="about text-center">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Your Dashboard</h3>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h3 class="mb-4">
          <img
            src="https://www.gravatar.com/avatar/ac1c51f25718910e4a6d19ee44b5d465/?s=50&d=mm"
            class="rounded-circle"
            width="40"
          >
          <span class="ml-2">Kevin Elliott</span>
          <div class="pull-right">
            <button class="mr-2 btn btn-primary">Settings</button>
            <button class="btn btn-primary">API Key</button>
          </div>
        </h3>
        <h4 class="mb-4">Ground Stations</h4>
        <table class="table table-hover mb-4 bg-white">
          <tr>
            <th>ID</th>
            <th>Ident</th>
            <th>Location</th>
            <th>Nearest Airport</th>
            <th>Heard Messages</th>
            <th>Info</th>
          </tr>
          <tbody>
            <tr>
              <td>
                <span class="badge badge-primary text-white pl-2 pr-2">3</span>
              </td>
              <td>KE-KMHR1</td>
              <td>CM98kq @ 1004m</td>
              <td>KMHR - Mather Airport</td>
              <td><span class="badge badge-pill badge-info">2201630</span></td>
              <td>
                <span class="mr-1 p-1 badge badge-secondary">Raspberry Pi 3+</span>
                <span class="mr-1 p-1 badge badge-secondary">RTL-SDR v3</span>
                <span class="p-1 badge badge-secondary">DPD Airband Antenna</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="badge badge-primary text-white pl-2 pr-2">74</span>
              </td>
              <td>KE-KMHR2</td>
              <td>CM98kq @ 1004m</td>
              <td>KMHR - Mather Airport</td>
              <td><span class="badge badge-pill badge-info">2201630</span></td>
              <td>
                <span class="mr-1 p-1 badge badge-secondary">Raspberry Pi 4</span>
                <span class="mr-1 p-1 badge badge-secondary">RTL-SDR v3</span>
                <span class="p-1 badge badge-secondary">DPD Airband Antenna</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-outline-secondary">
          Add Ground Station
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class UserDashboard extends Vue {
}
</script>
