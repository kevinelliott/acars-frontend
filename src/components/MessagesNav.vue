<template>
  <div id="nav" class="mt-0 pt-0 pb-3">
    <router-link to="/messages/live">Live</router-link> |
    <router-link to="/messages/historical">Historical</router-link>
  </div>
</template>

<script>
export default {
  name: 'messages_nav',
};
</script>
