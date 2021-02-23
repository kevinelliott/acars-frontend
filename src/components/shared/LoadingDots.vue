<template>
  <div>
    <div class="p-4 bg-white border border-muted">
      <b-spinner type="grow" label="Spinning"></b-spinner>
      <b-spinner type="grow" label="Spinning"></b-spinner>
      <b-spinner type="grow" label="Spinning"></b-spinner>
      <div class="mt-1">
        {{ loadingText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class LoadingDots extends Vue {
  @Prop() private loadingText!: String;
}
</script>

<style scoped>
</style>
