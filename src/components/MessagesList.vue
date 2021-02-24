<template>
  <div>
    <MessagesLivePaused />
    <MessageBox
      v-if="!isSearching && messages.length == 0 && instructions"
      :message="instructions" />
    <MessageBox
      v-if="isSearching"
      :message="searchingText" />
    <MessageBox
      v-if="isErrorGettingMessages"
      message="There was an error trying to get messages with these filters. Please try again." />
    <LoadingDots v-if="messages.length == 0 && !instructions" loadingText="Loading" />
    <MessagesListItemSlim
      v-for="message in messages"
      :key="`message-list-item-${message.id}`"
      :message="message"
      />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';

import ActiveAirframes from '@/components/ActiveAirframes.vue';
import LoadingDots from '@/components/shared/LoadingDots.vue';
import MessageBox from '@/components/shared/MessageBox.vue';
import MessagesListItemSlim from '@/components/MessagesListItemSlim.vue';
import MessagesLivePaused from '@/components/messages/MessagesLivePaused.vue';

@Component({
  components: {
    ActiveAirframes,
    LoadingDots,
    MessageBox,
    MessagesListItemSlim,
    MessagesLivePaused,
  },
})
export default class MessagesList extends Vue {
  @Prop() private instructions!: String;

  @Prop({ default: false }) private isErrorGettingMessages!: boolean;

  @Prop({ default: false }) private isSearching!: boolean;

  @Prop() private messages!: Array<Object>;

  @Prop({ default: null }) private messagesCountMaximum!: Number;

  searchingText = 'Searching for messages in the archives...';
}
</script>

<style scoped>
</style>
