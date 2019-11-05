<template>
  <div
    v-if="$store.state.isLiveMessagesPaused"
    class="p-4 bg-light"
    >
    Live messages are paused.
  </div>
</template>

<script>
export default {
  name: 'messages_live_paused',
};
</script>
