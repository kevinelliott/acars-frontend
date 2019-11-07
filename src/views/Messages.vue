<template>
  <div class="home">
    <div class="container">
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
  name: 'messages',
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
      console.log('Socket: events', val);
    },
    newMessages(val) {
      console.log('Socket: new-messages', val);
      let messages = val.concat(this.$data.messages);
      if (messages.length > 1000) {
        messages = messages.slice(0, 1000);
      }
      this.$data.messages = messages;
      // console.log('Messages:', this.$data.messages);
    },
  },
  data() {
    return {
      messages: [],
    };
  },
};
</script>
