<template>
  <div class="home">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">Airframes</h3>
    </div>
    <div class="border-bottom">
      <div class="container p-4">
        Information about all known airframes.
      </div>
    </div>
    <div class="container p-4">
      <h5>Coming Soon. Please stand by.</h5>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Airframes extends Vue {
}
</script>
