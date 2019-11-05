<template>
  <div id="nav" class="mt-0 pt-0 pb-3">
    <h1>Admin</h1>
    <router-link to="/admin/sockets">Sockets</router-link> |
    <router-link to="/admin/stats">Stats</router-link>
  </div>
</template>

<script>
export default {
  name: 'admin_nav',
};
</script>
