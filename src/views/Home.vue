<template>
  <div class="home">
    <div class="p-4 bg-light">
      <div class="container">
        <div class="d-flex justify-content-center">
          <div class="w-75">
            <h1 class="mt-3 mb-4">Welcome!</h1>
            <p class="text-left">
              This is an aircraft-related aggregation service that receives ACARS data from
              volunteers around the world. It is under <strong>very active development</strong> and
              you will notice changes from day to day. Also, issues are expected.
            </p>
            <div class="mb-4 text-left">
              Contributing your feed allows us to make ground developing new decoders and make
              important statistical observations. It also benefits users of the service so that they
              can see more about flights as they traverse covered territories.
            </div>
            <div class="text-center">
              <a href="/about" class="btn btn-primary">Learn more about Feeding</a>
            </div>
          </div>
        </div>
        <br>
      </div>
    </div>
    <div class="p-4">
      <div class="container">
        <h3 class="mb-4">
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
