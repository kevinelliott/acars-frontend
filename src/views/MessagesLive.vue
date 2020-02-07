<template>
  <div class="home p-4">
    <div class="container">
      <MessagesNav />
      <div class="row" v-if="enableActiveAirframes || enableFilters">
        <div class="col-4">
          <MessageFilters
            :knownAirframes="knownAirframes"
            :knownStations="knownStations"
            v-on:on-filters-updated="filtersUpdated"
            />
          <div>
            Matching {{ filteredMessages.length }} of {{ messages.length }} Messages
          </div>
          <ActiveAirframes v-if="enableActiveAirframes" />
        </div>
        <div class="col-8">
          <MessagesList
            :messages="messages"
            :enableActiveAirframes="false"
            :enableFilters="true"
            />
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12">
          <MessagesList
            :messages="messages"
            :enableActiveAirframes="false"
            :enableFilters="true"
            />
        </div>
      </div>
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
