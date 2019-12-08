<template>
  <div style="height: 600px; width: 100%" class='mb-4'>
    <l-map
      ref="flightsMap"
      style="height: 95%; width: 100%"
      :zoom='zoom'
      @update:zoom='zoomUpdated'
      @update:center='centerUpdated'
      @update:bounds='boundsUpdated'
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="[47.413220, -1.219482]"></l-marker>
      <v-locatecontrol />
    </l-map>
    <div class="info text-muted text-sm" style="height: 5%">
      <span class='mr-2'>Center: {{ center }}</span>
      <span class='mr-2'>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// const Vue2LeafletLocatecontrol = require('vue2-leaflet-locatecontrol');
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol';

@Component({
  components: {
    'v-locatecontrol': Vue2LeafletLocatecontrol,
  },
})
export default class FlightsMap extends Vue {
  @Prop() private flights!: any;

  data() { // eslint-disable-line class-methods-use-this
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.413220, -1.219482],
      bounds: null,
    };
  }

  // mounted() {
  // }

  // refresh() {
  // }
  zoomUpdated(zoom: any) {
    this.$data.zoom = zoom;
  }

  centerUpdated(center: any) {
    this.$data.center = center;
  }

  boundsUpdated(bounds: any) {
    this.$data.bounds = bounds;
  }
}
</script>

<style scoped>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
