<template>
  <div id="nav" class="mt-0 pt-0 pb-3">
    <h3>Messages</h3>
    <router-link to="/messages/live">Live</router-link> |
    <router-link :to="{ path: '/messages/historical' }">Historical</router-link> |
    <router-link :to="{ name: 'message_detail' }">Detail</router-link>
  </div>
</template>

<script>
export default {
  name: 'messages_nav',
};
</script>
