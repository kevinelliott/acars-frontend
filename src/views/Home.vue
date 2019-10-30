<template>
  <div class="home">
    <div class="container">
      <h3>Stations</h3>
      <StationsTable :stations="stations" />
      <br>

      <h3>Recent Live Messages</h3>
      <MessagesList :messages="messages" />
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
      console.log('Socket: events', val);
    },
    newMessages(val) {
      console.log('Socket: new-messages', val);
      let messages = val.concat(this.$data.messages);
      if (messages.length > 20) {
        messages = messages.slice(0, 20);
      }
      this.$data.messages = messages;
      // console.log('Messages:', this.$data.messages);
    },
    stations(val) {
      this.$data.stations = val.sort((a, b) => (b.messagesCount - a.messagesCount));
      // console.log('Stations:', this.$data.stations);
    },
  },
  data() {
    return {
      messages: [],
      stations: [],
    };
  },
};
</script>
