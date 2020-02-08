<template>
  <div class="mb-4 border border-grey" @click="showMessageModal">
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
      <h5>Text</h5>
      <div class="mb-2 text-wrap text-break" v-html="convertNewlinesToBRs(message.text)" />
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
    <div class="bg-light">
      <div class="row">
        <div class="col-12">
          <div class="p-1 text-dark text-left">
            <small>
              <div class="p-1 float-left">
                <span v-if="!!message.airframe && !!message.airframe.tail">
                  <span class="ml-1 text-muted">Tail</span>
                  {{ message.airframe.tail }}
                </span>

                <span v-if="!!message.flight && !!message.flight.flight">
                  <span class="ml-1 text-muted">Flight </span>
                  <a
                    href="#"
                    @click="$bvModal.show(`flight-modal-from-message-${message.id}`)"
                    @click.stop
                    >{{ message.flight.flight }}</a>
                </span>
              </div>
              <div class="p-1 float-right">
                <span v-if="!!message.frequency">
                  <span class="ml-1 text-muted">F: </span>
                  <a :id="`message-${message.id}-frequency`" href="#">{{ message.frequency }}</a>
                  <b-popover
                    :target="`message-${message.id}-frequency`"
                    triggers="hover"
                    placement="top"
                    >
                    <template v-slot:title>Frequency: {{ message.frequency }} MHz</template>
                    {{ frequencyName(message.frequency) }}
                  </b-popover>
                </span>

                <span v-if="!!message.mode">
                  <span class="ml-1 text-muted">M: </span>
                  <a :id="`message-${message.id}-mode`" href="#">{{ message.mode }}</a>
                  <b-popover
                    :target="`message-${message.id}-mode`"
                    triggers="hover"
                    placement="top"
                    >
                    <template v-slot:title>Mode: {{ message.mode }}</template>
                    Mode {{ message.mode }}
                  </b-popover>
                </span>

                <span v-if="!!message.label">
                  <span class="ml-1 text-muted">L: </span>
                  <a
                    :title="labelName(message.label)"
                    :id="`message-${message.id}-label`"
                    href="#">{{ message.label }}</a>
                  <b-popover
                    :target="`message-${message.id}-label`"
                    triggers="hover"
                    placement="top"
                    >
                    <template v-slot:title>Label: {{ message.label }}</template>
                    {{ labelName(message.label) }}
                  </b-popover>
                </span>

                <span v-if="!!message.blockId">
                  <span class="ml-1 text-muted">B:</span>
                  {{ message.blockId }}
                </span>

                <span v-if="!!message.messageNumber">
                  <span class="ml-1 text-muted">M#:</span>
                  {{ message.messageNumber }}
                </span>

                <span v-if="message.error >= 1" class="ml-1 text-danger">
                  <strong>E:</strong>
                  {{ message.error }}
                </span>
              </div>
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="border-bottom text-black">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row">
            <div class="text-break text-left">
              <div class="p-3 bg-white">
                <span v-if="message.text">
                  <div v-html="convertNewlinesToBRs(message.text)"></div>
                  <div v-if="decodeMessage(message)">
                    <div class="mt-1 text-muted"><small>DECODED</small></div>
                    <div v-html="decodeMessage(message)"></div>
                  </div>
                </span>
                <span v-else class="text-muted">
                  No text.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-light text-muted">
      <div class="row">
        <div class="col-12">
          <div class="p-1">
            <small>
              <div class="p-1 float-left">
                <span :title="message.source">
                  {{ message.sourceType.toUpperCase() }}
                </span>
                <span v-if="!!message.station && !!message.station.ident">
                  from {{ message.station.ident }}
                </span>
              </div>
              <div class="p-1 float-right">
                {{ message.timestamp }}
              </div>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { MessageDecoder } from '@airframes/acars-decoder/dist/MessageDecoder';
import FlightDetailModal from '@/components/flights/FlightDetailModal.vue';

@Component({
  components: {
    FlightDetailModal,
  },
})
export default class MessagesListItemSlim extends Vue {
  @Prop() private message!: any;

  frequencyName(frequency: number) : string {
    const frequencyString = frequency.toFixed(3);
    const frequencyObj = this.$store.state.acarsData.frequencies[frequencyString];
    let frequencyName = 'Unknown';

    if (frequencyObj) {
      frequencyName = frequencyObj.name;
    }

    return frequencyName;
  }

  labelName(label: string) : string {
    const labelObj = this.$store.state.acarsData.labels[label];
    let labelName = 'Unknown';

    if (labelObj) {
      labelName = labelObj.name;
    }

    return labelName;
  }

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
</style>
