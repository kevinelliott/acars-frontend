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
  name: 'messages_historical',
  components: {
    MessagesList,
    MessagesNav,
  },
  data() {
    return {
      messages: [],
    };
  },
};
</script>
