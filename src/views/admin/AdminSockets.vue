<template>
  <div class="container">
    <AdminNav />
    <h3>Active Sockets and Shit</h3>
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
  sockets = []

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'sockets') {
        this.sockets = state.sockets;
      }
    });
  }
}
</script>
