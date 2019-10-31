<template>
  <div class="home">
    <div class="container">
      <h3>Stations</h3>
      <StationsTable :stations="stations" />
      <br>

      <h3>
        Recent Live Messages
        <small><router-link to="/messages/live">See All</router-link></small>
      </h3>
      <MessagesList
        :messages="messagesFiltered"
        :enableActiveAirframes="false"
        :enableFilters="false"
        />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import MessagesList from '@/components/MessagesList.vue';
import StationsTable from '@/components/StationsTable.vue';

@Component({
  components: {
    MessagesList,
    StationsTable,
  },
})
export default class Home extends Vue {
  messagesFiltered = []

  get stations() {
    return this.$store.state.stations;
  }

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'prependNewLiveMessages') {
        if (state.messagesLive.length > 20) {
          this.messagesFiltered = state.messagesLive.slice(0, 20);
        } else {
          this.messagesFiltered = state.messagesLive;
        }
      }
    });
  }
}
</script>
