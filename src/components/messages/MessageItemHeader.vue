<template>
  <div class="bg-white text-muted">
    <div class="row">
      <div class="col-12">
        <div class="p-1">
          <small>
            <div class="p-2 float-left">
              <span v-if="message.sourceType" :title="message.source">
                {{ message.sourceType.toUpperCase() }}
              </span>
              <span v-else>
                UNKNOWN
              </span>
              <span v-if="!!message.station && !!message.station.ident">
                from {{ message.station.ident }}
              </span>
            </div>
            <div class="p-2 float-right">
              {{ message.timestamp }}
            </div>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class MessageItemHeader extends Vue {
  @Prop() private message!: any;
}
</script>

<style scoped>
</style>
