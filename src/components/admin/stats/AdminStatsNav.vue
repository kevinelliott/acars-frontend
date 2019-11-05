<template>
  <div>
    <h3>Stats</h3>
    <div class="list-group">
      <router-link to="/admin/stats/airlines" class="list-group-item">Airlines</router-link>
      <router-link to="/admin/stats/airframes" class="list-group-item">Airframes</router-link>
      <router-link to="/admin/stats/errors" class="list-group-item">Errors</router-link>
      <router-link to="/admin/stats/flights" class="list-group-item">Flights</router-link>
      <router-link to="/admin/stats/frequencies" class="list-group-item">Frequencies</router-link>
      <router-link to="/admin/stats/labels" class="list-group-item">Labels</router-link>
      <router-link to="/admin/stats/stations" class="list-group-item">Stations</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin_stats_nav',
};
</script>
