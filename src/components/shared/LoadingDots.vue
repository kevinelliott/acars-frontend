<template>
  <div class="p-4 border border-muted">
    <b-spinner type="grow" label="Spinning"></b-spinner>
    <b-spinner type="grow" label="Spinning"></b-spinner>
    <b-spinner type="grow" label="Spinning"></b-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class LoadingDots extends Vue {
}
</script>

<style scoped>
</style>
