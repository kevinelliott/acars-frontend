<template>
  <div>
    <l-map
      ref="map"
      :zoom='zoom'
      :center="center"
      style="height: 100%;"
      @update:zoom='zoomUpdated'
      @update:center='centerUpdated'
      @update:bounds='boundsUpdated'
    >
      <l-marker :lat-lng="[this.coordinates.latitude, this.coordinates.longitude]">
      </l-marker>
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// const Vue2LeafletLocatecontrol = require('vue2-leaflet-locatecontrol');
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'; // eslint-disable-line
import LMovingMarker from 'vue2-leaflet-movingmarker'; // eslint-disable-line
import { LIcon, LMarker } from 'vue2-leaflet';

@Component({
  components: {
    'l-icon': LIcon,
    'l-marker': LMarker,
    'l-moving-marker': LMovingMarker,
    'v-locatecontrol': Vue2LeafletLocatecontrol,
  },
})
export default class Map extends Vue {
  @Prop() private coordinates: any;

  data() { // eslint-disable-line class-methods-use-this
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: this.coordinates && this.coordinates.latitude ? 9 : 3,
      center: this.coordinates && this.coordinates.latitude && this.coordinates.longitude
        ? [this.coordinates.latitude, this.coordinates.longitude] : [39.8283, -98.5795],
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
