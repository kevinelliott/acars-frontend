<template>
  <div class="mb-4 border" @click="showMessageModal">
    <FlightDetailModal v-if="message.flight" :message="message" :flight="message.flight" />
    <b-modal
      :id="`message-modal-${message.id}`"
      size="lg"
      ref="messageModal"
      title="Message Detail"
      >
      <h5>ID</h5>
      <div class="mb-2">{{ message.id }}</div>
      <h5>Station</h5>
      <div class="mb-2">{{ !!message.station ? message.station.ident : 'N/A' }}</div>
      <div class="mb-2" v-if="message.text">
        <h5>Text</h5>
        <div class="text-wrap text-break" v-html="convertNewlinesToBRs(message.text)" />
      </div>
      <div class="mb-2" v-if="message.data">
        <h5>Data</h5>
        <div class="text-wrap text-break" v-html="convertNewlinesToBRs(message.data)" />
      </div>
      <h5>Decoded</h5>
      <div class="text-wrap">
        <span v-if="decodeMessage(message)" v-html="decodeMessage(message)" />
        <span v-else>
          Not decodable at this time.
        </span>
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <div class="w-100">
          <span @click="cancel()" class="float-left">
            <router-link
              :to="`/messages/${message.id}`"
              class="btn btn-sm btn-secondary"
              >
              View
            </router-link>
          </span>
          <b-button size="sm" variant="secondary" class="float-right" @click="cancel()">
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
    <MessageItemHeader :message="message" />
    <div class="border-bottom border-top text-black">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row">
            <div class="w-100 text-break text-left">
              <div class="p-3 bg-inner inner-shadow">
                <span v-if="message.text || message.data">
                  <div v-html="convertNewlinesToBRs(message.text || message.data)"></div>
                  <div v-if="decodeMessage(message)">
                    <div class="mt-1 text-muted"><small>DECODED</small></div>
                    <div v-html="decodeMessage(message)"></div>
                  </div>
                </span>
                <span v-else class="text-muted">
                  <span v-if="message.latitude">
                    <div>Position Report</div>
                    <div>
                      Coordinates: {{ message.latitude }}, {{ message.longitude }}
                    </div>
                    <div>
                      Altitude: {{ message.altitude }}
                    </div>
                  </span>
                  <span v-else>
                    No text or data.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MessageItemFooter :message="message" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { MessageDecoder } from '@airframes/acars-decoder/dist/MessageDecoder';
import FlightDetailModal from '@/components/flights/FlightDetailModal.vue';
import MessageItemHeader from '@/components/messages/MessageItemHeader.vue';
import MessageItemFooter from '@/components/messages/MessageItemFooter.vue';

@Component({
  components: {
    FlightDetailModal,
    MessageItemFooter,
    MessageItemHeader,
  },
})
export default class MessagesListItemSlim extends Vue {
  @Prop() private message!: any;

  convertNewlinesToBRs(text: string) : string { // eslint-disable-line class-methods-use-this
    return text ? text.split('\n').join('<br>') : text;
  }

  decodeMessage(message: any) : string { // eslint-disable-line class-methods-use-this
    const decoder = new MessageDecoder();
    return decoder.decodeMessage(message);
  }

  showFlightModal() {
    this.$bvModal.show(`flight-modal-${this.message.flight.id}`);
  }

  showMessageModal() {
    this.$bvModal.show(`message-modal-${this.message.id}`);
  }
}
</script>

<style scoped>
.inner-shadow {
  box-shadow: inset 0px 0px 10px 0px rgba(0,0,0,0.1);
}
.bg-inner {
  background-color: rgba(100,100,100,0.05);
}
</style>
