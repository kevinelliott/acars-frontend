<template>
  <div class="admin-body">
    <PageWithoutNavbar />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

import PageWithoutNavbar from './PageWithoutNavbar.vue';

@Component({
  components: {
    PageWithoutNavbar,
  }
})
class NoNavigation extends Vue {
}
export default NoNavigation;
</script>

<style scoped>
.admin-body {
  display: flex;
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: row;
  flex-grow: 1;
}

.admin-nav {
  align-items: unset;
}

</style>
