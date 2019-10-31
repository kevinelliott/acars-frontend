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
// @ is an alias to /src
import MessagesList from '@/components/MessagesList.vue';
import StationsTable from '@/components/StationsTable.vue';

export default {
  name: 'home',
  components: {
    MessagesList,
    StationsTable,
  },
  sockets: {
    connect() {
      console.log('Socket connected.');
      this.$socket.client.emit('events', 'testing');
    },
    events(val) {
      // console.log('Socket: events', val);
    },
    newMessages(val) {
      // console.log('Socket: new-messages', val);

      for (const message of val) { // eslint-disable-line no-restricted-syntax,guard-for-in
        this.$store.commit('setLastHeardFromStation', message.station);
      }

      // let messages = val.concat(this.$data.messages);
      // if (messages.length > 20) {
      //   messages = messages.slice(0, 20);
      // }
      // this.$data.messages = messages;
      // console.log('Messages:', this.$data.messages);
    },
    stations(val) {
      this.$data.stations = val.sort((a, b) => (b.messagesCount - a.messagesCount));
      // console.log('Stations:', this.$data.stations);
    },
  },
  data() {
    return {
      messagesFiltered: [],
      stations: [],
    };
  },
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
  },
};
</script>
