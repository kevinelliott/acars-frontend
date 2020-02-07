<template>
  <div>
    <b-modal
      :id="`flight-modal-from-message-${message.id}`"
      size="xl"
      title="Flight Detail"
      >
      <h5>ID</h5>
      <div class="mb-2">{{ flight.id }}</div>
      <h5>Flight</h5>
      <div class="mb-2">{{ flight.flight }}</div>
      <h5>Messages</h5>
      <table class="table table-sm">
        <tr>
          <th>Timestamp</th>
          <th>Label</th>
          <th>Block ID</th>
          <th>Msg #</th>
          <th>Text</th>
        </tr>
        <tr v-for="message in flightDetail.messages"
          :key="`fd-message-${message.id}`"
          >
          <td>
            <span :title="message.timestamp">
              {{ message.timestamp | moment("MMM DD YYYY, HH:mm:ss") }}
            </span>
          </td>
          <td>{{ message.label }}</td>
          <td>{{ message.blockId }}</td>
          <td>{{ message.messageNumber }}</td>
          <td class="text-wrap text-break" style="width: 60%;">{{ message.text }}</td>
        </tr>
      </table>
      <template v-slot:modal-footer="{ ok, cancel }">
        <div class="w-100">
          <b-button size="sm" variant="secondary" class="float-left" @click="refresh()">
            <font-awesome-icon icon="sync" v-if="!refreshing" />
            <font-awesome-icon icon="spinner" spin v-else />
          </b-button>
          <b-button size="sm" variant="secondary" class="float-right" @click="cancel()">
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import VueAxios from 'vue-axios';
import moment from 'moment-timezone';

Vue.use(VueAxios, axios);

@Component({})
export default class FlightDetailModal extends Vue {
  @Prop() private flight!: any;

  @Prop() private message!: any;

  flightDetail: any = {};

  refreshing = false;

  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent: any, modalId: string) => {
      if (modalId === `flight-modal-from-message-${this.message.id}`) {
        this.refresh();
      }
    });
  }

  refresh() {
    console.log(`Fetching flight detail for ${this.flight.id}...`);
    this.refreshing = true;
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/flights/${this.flight.id}`).then((response) => {
      console.log('Fetched flight.');
      console.log(response.data);
      const flightDetail = response.data;
      flightDetail.messages = flightDetail.messages.sort((a: any, b: any) => (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())); // eslint-disable-line max-len
      this.flightDetail = flightDetail;
      this.refreshing = false;
    });
  }
}
</script>

<style scoped>
</style>
