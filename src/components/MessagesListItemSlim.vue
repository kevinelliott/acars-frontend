<template>
  <div class="mb-4 border border-grey">
    <div class="bg-light">
      <div class="row">
        <div class="col-12">
          <div class="p-1 text-dark text-left">
            <small>
              <div class="p-1 float-left">
                {{ message.timestamp }}

                <span v-if="message.airframe.tail">
                  <span class="ml-1 text-muted">T:</span>
                  {{ message.airframe ? message.airframe.tail : 'N/A' }}
                </span>

                <span v-if="message.flight.flight">
                  <span class="ml-1 text-muted">F:</span>
                  {{ message.flight ? message.flight.flight : 'N/A' }}
                </span>
              </div>
              <div class="p-1 float-right">
                <span class="text-muted">ST:</span>
                {{ message.station ? message.station.ident : 'N/A' }}

                <span class="ml-1 text-muted">F: </span>
                <span v-if="message.frequency">
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
                <span v-else>
                  N/A
                </span>

                <span class="ml-1 text-muted">M: </span>
                <span v-if="message.mode">
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
                <span v-else>
                  N/A
                </span>

                <span class="ml-1 text-muted">L: </span>
                <span v-if="message.label">
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
                <span v-else>
                  N/A
                </span>

                <span class="ml-1 text-muted">B:</span>
                {{ message.blockId ? message.blockId : 'N/A' }}

                <span class="ml-1 text-muted">M#:</span>
                {{ message.messageNumber ? message.messageNumber : 'N/A' }}

                <span v-if="message.error >= 1" class="ml-1 text-danger">
                  <strong>E:</strong>
                  {{ message.error }}
                </span>
                <span v-else>
                  <span class="text-muted">E:</span> 0
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { MessageDecoder } from '@/utilities/decoders/acars/MessageDecoder';

@Component
export default class MessagesListItem extends Vue {
  @Prop() private message!: Object;

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
    return text.replace('\n', '<br>');
  }

  decodeMessage(message: any) : string {
    const decoder = new MessageDecoder(this.$store);
    return decoder.decodeMessage(message);
  }
}
</script>

<style scoped>
</style>
