<template>
  <div class="about text-center">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Your Dashboard</h3>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container text-left">
        <h3 class="mb-4">
          <img
            :src="$store.state.auth.user.gravatarUrl"
            class="rounded-circle"
            width="40"
          >
          <span class="ml-2">
            {{ $store.state.auth.user.name }}
            <small class="text-muted">({{ $store.state.auth.user.role }})</small>
          </span>
          <div class="pull-right">
            <button class="mr-2 btn btn-primary">Settings</button>
            <b-button v-b-modal.modal-api-key>API Key</b-button>
              <b-modal id="modal-api-key" title="Your API Key">
                <p class="my-4">{{ $store.state.auth.user.apiKey }}</p>
              </b-modal>
          </div>
        </h3>
        <h4 class="mb-4">Ground Stations</h4>
        <table class="table table-hover mb-4 bg-white">
          <tr>
            <th>ID</th>
            <th>Ident</th>
            <th>Type</th>
            <th>Nearest Airport</th>
            <th>Heard Messages</th>
            <th>Status</th>
            <th>Last Report</th>
            <th>Info</th>
          </tr>
          <tbody>
            <tr v-for="station in $store.state.auth.user.stations"
              :key="`station-table-row-${station.id}`"
              @click="handleStationClick(station)"
            >
              <td>
                <span class="badge badge-primary text-white pl-2 pr-2">
                  {{ station.id }}
                </span>
              </td>
              <td>
                {{ station.ident }}
              </td>
              <td>
                <span v-if="station.sourceType">
                  {{ station.sourceType.toUpperCase() }}
                </span>
                <span v-else class="text-muted">
                  UNKNOWN
                </span>
              </td>
              <td class="text-muted">Coming Soon</td>
              <td class="text-center">
                <span class="badge badge-pill badge-info">
                  {{ station.stationMessageCount.messagesCount }}
                </span>
              </td>
              <td class="text-center">
                <span class="mr-1 p-1 badge" :class="statusBadgeClass(station.status)" >
                  {{ humanize(station.status) }}
                </span>
              </td>
              <td>
                {{ station.lastReportAt | moment("from", "now") }}
              </td>
              <td class="text-muted">
                <span class="mr-1 p-1 badge badge-secondary">
                  Coming Soon
                </span>
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
import moment from 'moment-timezone';

@Component({
  components: {
  },
})
export default class UserDashboard extends Vue {
  statusBadgeClass(status) { // eslint-disable-line class-methods-use-this
    if (status === 'active') return 'badge-success';
    if (status === 'inactive') return 'badge-danger';
    return 'badge-info';
  }

  handleStationClick(station) {
    this.$router.push(`/user/station/${station.id}`);
  }

  humanize(str) { // eslint-disable-line class-methods-use-this
    const frags = str.split('-');
    for (let i = 0; i < frags.length; i += 1) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }
}
</script>
