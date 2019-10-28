<template>
  <div class="home">
    <div class="container">
      <h3>Messages</h3>
      <MessagesNav />
      <MessagesList :messages="messages" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MessagesList from '@/components/MessagesList.vue';
import MessagesNav from '@/components/MessagesNav.vue';

export default {
  name: 'messages_live',
  components: {
    MessagesList,
    MessagesNav,
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
      const newMessages = val;
      const messages = val.concat(this.$data.messages);

      if (newMessages.length > 0) {
        for (const message of newMessages) { // eslint-disable-line no-restricted-syntax,guard-for-in,max-len
          if (message.airframe && message.airframe.tail) {
            console.log(message.airframe.tail);
            this.$store.commit('setLastHeardFromAirframe', message.airframe.tail);
          }
        }
      }

      console.log(`Socket: ${messages.length} known messages`);
      this.$data.messages = messages;
      console.log('Messages:', this.$data.messages);
    },
  },
  data() {
    return {
      messages: [],
    };
  },
};
</script>
