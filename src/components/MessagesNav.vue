<template>
  <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
    <h3>Messages</h3>
    <router-link to="/messages/live">Live</router-link> |
    <router-link :to="{ path: '/messages/historical' }">Historical</router-link>
    <span v-if="$route.params.id">
      |
      <router-link
        :to="{ name: 'message_detail' }"
        >Detail</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'messages_nav',
};
</script>
