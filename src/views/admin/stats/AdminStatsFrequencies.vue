<template>
  <div class="container">
    <AdminNav />
    <h3>Stats</h3>
    <div class="row">
      <div class="col-3">
        <AdminStatsNav />
      </div>
      <div class="col-9">
        <table class="table table-sm">
          <tr>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import AdminNav from '@/components/admin/AdminNav.vue';
import AdminStatsNav from '@/components/admin/stats/AdminStatsNav.vue';

@Component({
  components: {
    AdminNav,
    AdminStatsNav,
  },
})
export default class AdminStatsFrequencies extends Vue {
  stats = {}

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'admin_stats') {
        this.stats = state.admin_stats;
      }
    });
  }
}
</script>
