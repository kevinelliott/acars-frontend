<template>
  <div style="height: 800px; width: 100%">
    <l-map
      ref="flightsMap"
      style="height: 100%; width: 100%"
      :zoom='zoom'
      :center="center"
      @update:zoom='zoomUpdated'
      @update:center='centerUpdated'
      @update:bounds='boundsUpdated'
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-moving-marker
        v-for="flight in flightsWithCoordinates"
        :key="`flight-marker-${flight.id}`"
        :lat-lng="[flight.latitude, flight.longitude]"
        :duration="2000"
      >
        <l-icon
          iconAnchor="[15, 15]"
          >
          <img width="30" src="https://c7.uihere.com/icons/73/941/94/plane-ticket-transportation-vacation-icon-9da33228b803bd44baa206d8f5491157.png"/>
        </l-icon>
      </l-moving-marker>
      <v-locatecontrol />
    </l-map>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// const Vue2LeafletLocatecontrol = require('vue2-leaflet-locatecontrol');
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'; // eslint-disable-line
import LMovingMarker from 'vue2-leaflet-movingmarker'; // eslint-disable-line
import { LIcon } from 'vue2-leaflet';

@Component({
  components: {
    'l-icon': LIcon,
    'l-moving-marker': LMovingMarker,
    'v-locatecontrol': Vue2LeafletLocatecontrol,
  },
})
export default class FlightsMap extends Vue {
  @Prop() private flights!: any;

  data() { // eslint-disable-line class-methods-use-this
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [39.8283, -98.5795],
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

  get flightsWithCoordinates() {
    const flights = this.flights.filter((flight: any) => flight.latitude && flight.latitude !== 0);
    return flights;
  }
}
</script>

<style scoped>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
