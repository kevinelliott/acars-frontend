<template>
  <div class="container">
    <AdminNav />
    <h3>Active Sockets</h3>
    <table class="table table-sm">
      <tr>
        <th>ID</th>
        <th>IP Address</th>
        <th>Connected</th>
        <th>Details</th>
      </tr>
      <tr v-for="client in clients"
        :key="`admin-client-${client.id}`"
        >
        <td>{{ client.id }}</td>
        <td>{{ client.handshake.headers['x-forwarded-for'] }}</td>
        <td>{{ new Date(client.handshake.time) | moment("from", "now") }}</td>
        <td class="text-left">
          <div class="mb-2">
            <div><strong>User Agent</strong></div>
            <div>{{ client.handshake.headers['user-agent'] }}</div>
          </div>
          <div class="mb-2">
            <div><strong>Rooms</strong></div>
            <div>{{ client.rooms }}</div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import AdminNav from '@/components/admin/AdminNav.vue';

@Component({
  components: {
    AdminNav,
  },
})
export default class AdminSockets extends Vue {
  clients = []

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'socket_clients') {
        this.clients = state.clients;
      }
    });
  }
}
</script>
