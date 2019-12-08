<template>
  <div>
    <h5>{{ decodedMessage.formatted.description }}</h5>
    <table class="table table-sm table-bordered">
      <tr
        v-for="(item, key) of decodedMessage.formatted.items"
        :key="`decoded-message-item-${key}`"
        >
        <td>
          {{ item.label }}
        </td>
        <td>
          {{ item.value }}
        </td>
      </tr>
      <tr v-if="decodedMessage.remaining && decodedMessage.remaining.text">
        <td>Remainder</td>
        <td>
          {{ decodedMessage.remaining.text }}
          <span class="text-muted">(Will anayze and decode in the future)</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class MessageDecodingTable extends Vue {
  @Prop() private decodedMessage!: any;
}
</script>

<style scoped>
</style>
