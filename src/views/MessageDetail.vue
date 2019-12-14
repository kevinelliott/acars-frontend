<template>
  <div class="container">
    <MessagesNav />
    <div class="text-left">
      <table class="table">
        <tr class="bg-dark text-light">
          <th>ID</th>
          <th>Timestamp</th>
          <th>Airframe</th>
          <th>Flight</th>
          <th>Label</th>
          <th>Block ID</th>
          <th>Message Number</th>
        </tr>
        <tr class="bg-light">
          <td>{{ message.id }}</td>
          <td>
            <span :title="message.timestamp">
              {{ message.timestamp | moment("MMM DD YYYY, HH:mm:ss") }}
            </span>
          </td>
          <td>
            <span v-if="message.airframe">
              {{ message.airframe.tail }}
            </span>
          </td>
          <td>
            <span v-if="message.airframe">
              {{ message.flight.flight }}
            </span>
          </td>
          <td>{{ message.label }}</td>
          <td>{{ message.blockId }}</td>
          <td>{{ message.messageNumber }}</td>
        </tr>
      </table>
      <div class="mb-2">
        <h4>Text</h4>
        <div class="text-wrap text-break" v-html="convertNewlinesToBRs(message.text)" />
      </div>
      <div class="mb-2">
        <h4>Decoded</h4>
        <div v-html="decodeMessage(message)" />
      </div>
      <div class="mb-2">
        <h4>Decoded (New Decoder)</h4>
        <div v-if="decodedMessage.decoded">
          <MessageDecodingTable :decodedMessage="decodedMessage" />
        </div>
        <div v-else class="text-muted">
          Not currently decodeable.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { MessageDecoder } from '@airframes/acars-decoder/dist/MessageDecoder';

import MessageDecodingTable from '@/components/messages/MessageDecodingTable.vue';
import MessagesNav from '@/components/MessagesNav.vue';

Vue.use(VueAxios, axios);

@Component({
  components: {
    MessageDecodingTable,
    MessagesNav,
  },
})
export default class MessageDetail extends Vue {
  decoded = { decoded: false };

  message = {};

  beforeMount() {
    this.message = {};
  }

  created() {
    this.refresh();
  }

  @Watch('$route')
  onPropertyChanged(newValue, oldValue) {
    if (newValue.params.id && newValue.params.id !== oldValue.params.id) {
      this.refresh();
    }
  }

  convertNewlinesToBRs(text) { // eslint-disable-line class-methods-use-this
    return text ? text.split('\n').join('<br>') : '';
  }

  decode(message) { // eslint-disable-line class-methods-use-this
    return new MessageDecoder(this.$store).decode(message);
  }

  get decodedMessage() {
    return this.decoded;
  }

  decodeMessage(message) { // eslint-disable-line class-methods-use-this
    return new MessageDecoder(this.$store).decodeMessage(message);
  }

  refresh() {
    console.log('Fetching message detail...');
    Vue.axios.get(`${this.$store.state.apiServerBaseUrl}/messages/${this.$route.params.id}`).then((response) => {
      console.log('Fetched message detail.');
      console.log(response.data);
      this.message = response.data;
      this.decoded = this.decode(this.message);
      console.log(this.decoded);
    });
  }
}
</script>
