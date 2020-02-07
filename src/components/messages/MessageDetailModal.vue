<template>
  <div>
    <b-modal
      :id="`flight-modal-from-message-${message.id}`"
      size="xl"
      title="Message Detail"
      >
      <h5>ID</h5>
      <div class="mb-2">{{ message.id }}</div>
      <h5>Airframe</h5>
      <div class="mb-2">{{ message.airframe.tail }}</div>
      <h5>Flight</h5>
      <div class="mb-2">{{ message.flight.flight }}</div>
      <h5>Timestamp</h5>
      <div class="mb-2">
        <span :title="message.timestamp">
          {{ message.timestamp | moment("MMM DD YYYY, HH:mm:ss") }}
        </span>
      </div>
      <h5>Label</h5>
      <div class="mb-2">{{ message.label }}</div>
      <h5>Block ID</h5>
      <div class="mb-2">{{ message.blockId }}</div>
      <h5>Message Number</h5>
      <div class="mb-2">{{ message.messageNumber }}</div>
      <h5>Text</h5>
      <div class="mb-2 text-wrap text-break" style="width: 60%;">
        {{ message.text }}
      </div>
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
export default class MessageDetailModal extends Vue {
  @Prop() private message!: any;

  messageDetail: any = {};

  refreshing = false;

  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent: any, modalId: string) => {
      if (modalId === `message-detail-modal-${this.message.id}`) {
        this.refresh();
      }
    });
  }

  refresh() {
    console.log(`Fetching message detail for ${this.message.id}...`);
    this.refreshing = true;
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/messages/${this.message.id}`).then((response) => {
      console.log('Fetched message detail.');
      console.log(response.data);
      this.messageDetail = response.data;
      this.refreshing = false;
    });
  }
}
</script>

<style scoped>
</style>
