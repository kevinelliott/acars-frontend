<template>
  <div class="p-4 border border-muted">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class MessagesList extends Vue {
  @Prop() private message!: String;
}
</script>

<style scoped>

</style>
