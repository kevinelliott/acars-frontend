<template>
  <div class="row" v-if="enableActiveAirframes || enableFilters">
    <div class="col-4">

      <div class="mb-4 p-4 bg-light border">
        <h4 class="mb-4">Filters</h4>
        <div class="mb-4">
          <label>Airframe</label>
          <multiselect v-model="filterAirframes"
                      :options="knownAirframes()"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Select Airframes to Include"
                      label="tail"
                      track-by="tail"
                      :preselect-first="false">
          </multiselect>
        </div>

        <div class="mb-4">
          <label>Errors to Exclude</label>
          <multiselect v-model="filterErrorValues"
                      :options="filterErrorOptions"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Select Errors to Exclude"
                      label="name"
                      track-by="name"
                      :preselect-first="true">
          </multiselect>
        </div>

        <div class="mb-4">
          <label>Labels to Exclude</label>
          <multiselect v-model="filterLabelValues"
                      :options="filterLabelOptions()"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Select Labels to Exclude"
                      label="displayName"
                      track-by="displayName"
                      :preselect-first="true">
          </multiselect>
        </div>

        <div class="mb-4">
          <label>Text Search</label>
          <div>
            <input
              class="form-control"
              placeholder="Search message text"
              @change="textSearchChanged($event)"
              />
          </div>
        </div>

        <div>
          Matching {{ filteredMessages.length }} of {{ messages.length }} Messages
        </div>
      </div>

      <ActiveAirframes v-if="enableActiveAirframes == true" />
    </div>
    <div class="col-8">
      <MessagesListItemSlim
        v-for="message in filteredMessages"
        :key="`message-list-item-${message.id}`"
        :message="message"
        />
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12">
      <MessagesListItemSlim
        v-for="message in filteredMessages"
        :key="`message-list-item-slim-${message.id}`"
        :message="message"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Multiselect from 'vue-multiselect';
import moment from 'moment-timezone';

import MessagesListItem from '@/components/MessagesListItem.vue';
import MessagesListItemSlim from '@/components/MessagesListItemSlim.vue';

@Component({
  props: {
    enableActiveAirframes: {
      default: false,
    },
    enableFilters: {
      default: false,
    },
  },
  components: {
    MessagesListItem,
    MessagesListItemSlim,
    Multiselect,
  },
})
export default class MessagesList extends Vue {
  @Prop() private messages!: Array<Object>;

  filterErrorOptions = [
    { name: 'Level 0', error: 0 },
    { name: 'Level 1', error: 1 },
    { name: 'Level 2', error: 2 },
    { name: 'Level 3', error: 3 },
  ]

  filterErrorValues : Array<any> = [{ error: 3, name: 'Level 3' }]

  defaultFilterLabels = ['_d', 'Q0'];

  filterLabelValues : Array<any> = this.filterLabelOptions().filter(option => this.defaultFilterLabels.includes(option.label)); // eslint-disable-line max-len

  filterTextSearch = '';

  filterAirframes : Array<any> = [];

  excludeByError(messages: Array<any>) : Array<any> {
    const errorsToMatch = this.filterErrorValues.map(value => value.error);
    const filteredMessages = messages.filter(message => !errorsToMatch.includes(message.error));

    return filteredMessages;
  }

  excludeByLabel(messages: Array<any>) : Array<any> {
    const labelsToMatch = this.filterLabelValues.map(value => value.label);
    const filteredMessages = messages.filter(message => !labelsToMatch.includes(message.label));

    return filteredMessages;
  }

  filterLabelOptions() : Array<any> {
    const labelsObj = this.$store.state.acarsData.labels;
    const labels = Object.keys(labelsObj).map(key => labelsObj[key]);
    const values = labels.map((label) => {
      const fixedLabel = label;
      fixedLabel.displayName = `${label.label} - ${label.name}`;
      return fixedLabel;
    });

    return values;
  }

  lastMessageClass(last: any) : any { // eslint-disable-line class-methods-use-this
    const lastDate = moment(last.when);
    const now = moment();
    const diff = now.diff(lastDate, 'minutes');

    return {
      'text-muted': diff >= 2,
    };
  }

  knownAirframes() : Array<any> {
    const airframes = this.messages.map((message: any) => message.airframe);

    const result = [];
    const map = new Map();
    for (const airframe of airframes) { // eslint-disable-line no-restricted-syntax
      if (!map.has(airframe.id) && airframe.tail !== '') {
        map.set(airframe.id, true);
        result.push(airframe);
      }
    }

    return result;
  }

  includeByAirframe(messages: Array<any>) : Array<any> {
    let matchingMessages;

    if (this.filterAirframes.length > 0) {
      const tails = this.filterAirframes.map(airframe => airframe.tail);
      console.log('Tails');
      console.log(tails);
      matchingMessages = messages.filter((message: any) => tails.includes(message.airframe.tail)); // eslint-disable-line max-len
    } else {
      matchingMessages = messages;
    }

    return matchingMessages;
  }

  matchText(messages: Array<any>) : Array<any> {
    let filteredMessages = [];

    if (this.filterTextSearch && this.filterTextSearch !== '') {
      filteredMessages = messages.filter(message => message.text.includes(this.filterTextSearch));
    } else {
      filteredMessages = messages;
    }

    return filteredMessages;
  }

  get filteredMessages() {
    return this.excludeByError(
      this.excludeByLabel(this.matchText(this.includeByAirframe(this.$props.messages))),
    );
  }

  textSearchChanged(event: any) {
    if (event && event.target) {
      console.log('Setting text search to ', event.target.value);
      this.filterTextSearch = event.target.value;
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
</style>
