<template>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class MessageItemFooter extends Vue {
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
}
</script>

<style scoped>
</style>
