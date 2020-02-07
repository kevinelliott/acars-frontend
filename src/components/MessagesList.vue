<template>
  <div>
    <MessagesLivePaused />
    <LoadingDots v-if="messages.length == 0" />
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
import MessagesListItemSlim from '@/components/MessagesListItemSlim.vue';
import MessagesLivePaused from '@/components/messages/MessagesLivePaused.vue';

@Component({
  components: {
    ActiveAirframes,
    LoadingDots,
    MessagesListItemSlim,
    MessagesLivePaused,
  },
})
export default class MessagesList extends Vue {
  @Prop() private messages!: Array<Object>;

  @Prop({ default: null }) private messagesCountMaximum!: Number;
}
</script>

<style scoped>
</style>
