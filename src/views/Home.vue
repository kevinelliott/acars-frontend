<template>
  <div class="home">
    <div class="p-4 bg-white">
      <div class="container">
        <div class="d-flex justify-content-center">
          <div class="w-75">
            <img src="/plane.png" title="Airframes Logo" width="200" class="mb-2">
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
              <router-link to="/about" class="btn btn-primary">
                Learn more about Feeding
              </router-link>
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
          :messagesCountMaximum="4"
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

@Component({
  components: {
    MessagesList,
  },
})
export default class Home extends Vue {
  messagesFiltered = []

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'prependNewLiveMessages') {
        this.messagesFiltered = state.messagesLive.slice(0, 20);
      }
    });
  }
}
</script>
