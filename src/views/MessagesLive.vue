<template>
  <div class="home">
    <div class="container">
      <h3>Messages</h3>
      <MessagesNav />
      <MessagesList :messages="messages" :enableActiveAirframes="true" :enableFilters="true" />
    </div>
  </div>
</template>

<script>
import MessagesList from '@/components/MessagesList.vue';
import MessagesNav from '@/components/MessagesNav.vue';

export default {
  name: 'messages_live',
  components: {
    MessagesList,
    MessagesNav,
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'prependNewLiveMessages'
        && !state.isLiveMessagesPaused
      ) {
        this.messages = state.messagesLive;
      }
    });
  },
};
</script>
