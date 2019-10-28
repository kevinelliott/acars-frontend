<template>
  <div class="mb-4 border border-grey">
    <div class="bg-secondary">
      <div class="row">
        <div class="col-12">
          <div class="p-1 text-light text-left">
            <small>
              <div class="p-1 float-left">
                <span class="text-white-50">FREQ</span> {{ message.frequency }} MHz
                <span class="ml-3 text-white-50">MODE</span> {{ message.mode }}
                <span class="ml-3 text-white-50">LABEL</span> {{ message.label }}
              </div>
              <div class="p-1 float-right">
                <span class="text-white-50">BLOCK</span> {{ message.block_id }}
                <span class="ml-3 text-white-50">MSG #</span> {{ message.message_number }}
              </div>
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="border-bottom text-black">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row">
            <div class="text-nowrap border-right">
              <div class="px-3 pt-3 pb-2 bg-light text-dark">
                <div v-if="message.airframe">
                  {{ message.airframe.tail }}
                </div>
                <br>
                <small class="text-muted">TAIL</small>
              </div>
              <div class="px-3 pb-3 bg-light text-dark">
                <div v-if="message.flight">
                  {{ message.flight.flight }}
                </div>
                <small class="text-muted">FLIGHT</small>
              </div>
            </div>
            <div class="text-break text-left">
              <div class="p-3 bg-white">
                {{ message.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-light small">
      <div class="row">
        <div class="col-6">
          <div class="p-2 text-left">
            <span class="mr-2 text-muted"><small>HEARD BY</small> <a href="#">KE-MHR1</a></span>
          </div>
        </div>
        <div class="col-6">
          <div class="p-2 text-right">
            <span class="text-muted" :title=message.timestamp>{{ message.timestamp }}</span>
            <span class="ml-2"><a href="#" class="text-muted">
              <font-awesome-icon icon="heart" />
            </a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MessagesListItem extends Vue {
  @Prop() private message!: Object;
}
</script>

<style scoped>
</style>
