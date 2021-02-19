<template>
  <div>
    <l-map
      ref="flightsMap"
      :zoom='zoom'
      :center="center"
      style="height: 100%;"
      @update:zoom='zoomUpdated'
      @update:center='centerUpdated'
      @update:bounds='boundsUpdated'
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-moving-rotated-marker
        v-for="flight in flightsWithCoordinates"
        :key="`flight-marker-${flight.id}`"
        :lat-lng="[flight.latitude, flight.longitude]"
        :duration="2000"
        :rotationAngle="flight.track"
        :icon="icon"
      >
      </l-moving-rotated-marker>
      <v-locatecontrol />
    </l-map>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// const Vue2LeafletLocatecontrol = require('vue2-leaflet-locatecontrol');
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'; // eslint-disable-line
import LMovingRotatedMarker from 'vue2-leaflet-moving-rotated-marker'; // eslint-disable-line
import * as L from 'leaflet';
import { LIcon, LIconDefault } from 'vue2-leaflet';

const iconUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNS8wOC8xOemWac0AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAF6ElEQVRYhc2YXYhdVxXHf2vvfT7uvXPnzk0ySaYkzZcWGq0lNn4UtY2C2qLog/qkaEHQgiCKKFV8EJQ+Fd+MVvAL9KE+qcVaRdOiVCs00RgIbdM00yY0mWQ+7te5c+69Z+/lw0yIrTDjudMZXLDgclh7/39rnbs/1hFV5f/Z3EYn+Os3v31nrZbcT2v5Q9KY3I7qSLvt59TxeP7rP/78nWeeOr2R+WUjFfzVxz/95elW9+vVen3aL7XR5WXEGKRaQazVxVBcyrZPff6jj/z0d1sO+JtP3PeV5rkLD7m5q1ivqHOINaCgwSNB8ZFjMLOzyHdsu+uex375t3F0zDiDHnv7sQ80Z196KJpfwKcJUqsiSQzOQeSQJEEqKYU1pHPzrnZ57offOH58LK2xKvjkG99yquHdka73WBFiMbx2FgEGGkCV2Bl6UnzkfS+cebSsVumsvvOOd+8Jyq2o4FFknfgCMAGWrf3iTV/90nrhGwdsN+r7CzGpoBQoVgRlpWLXHUABg+AJGGBg7R1JofWyeqW3GVENKAQFEwINhIAyWgU1KFZXMlcgVyWsxA971aSsXHnAq7UqQ4RqUM5FltMVx9nE0DYrgA6oBqURlL0j5VBWMOMDA+tY2L1z8wEvbmuYpdjySCo8OlllIIL9z4lECEChikeZmnTcP58jUWJ1767NB9Q0/ddFP3z+t83JWyKFKoIYgzEGMTf+0sF7UOibwE+2V/hse/AUdx/rldUrvUhOHP9+pyHRZWsssXPYKMLFMS6KbrhzK8/imKqxFM4ihV/Q5t6w6YDn9x3ZO0vYIwaqtSpJmhBFEdY5zHW3FmstxhriOCYIPGe5ld1vLb1KSgGeOnT0XZ2i+GeY2XEIY4njhDSpkCYJSRwTigItPM45vCqIoZJWGBlLe7Jy55nIn3rm4B1v2jRAr/oZ8uUHbnvz4ZOxi+h2e3SzPu1+zuJgyEKeM7/cpzUcMQpQ+EAvy4idY9/25rNhNPqFwqfKaJZaJG978eTnAJ7/2gNfiOKYa+0O1SShMRjRHI6YGBYo0M0LemlCO3b0vGcyTXBp6m+/cvbBMnqlAa9bAXJo5ibu7QzYd/4KOzHUgxKtniMF0JOMeQMvbZvkHzffjO92aplIXFMdltEa64bRQ83RpMYnm7s40MtJFIbG0DNCzwgDIziBPctDPhbV+GBSp6/BtsCW1RqrgsF744cD2sEzMAbk1ZkqEBAGAl1nyYdDxDlfgc3fZhAheC+qirH2v65ZrzJVTJqAtYCEyTEAx6mgvHLpotSIMS6BtRCD4tKUXj+jn+fBbUkFQYpRYdqtFs65NflUFZMkDIdDgqpnKyp4EuTAwYMyXOxS9NfTU4LA1LYmEirKmum8ToDzYDSoETH/e/1VUTGeMdqL0q84B0RANIBdf7gIeB9gjNcLYwAOQAQxK0ftOsMVEEPQgAY/Vn9bGlBBCEFEw0qbuZ5ZSwgr3d04VhrwCATvC++HxcpXhDWjFbGGIgTwvtgSwBPTO9NOu1XLl/uYOF433iYJ3U6bdq838d3Dt0WbDvh3G01bMbun6pMouu6+ocaQJCkmimdOz12Z2nTAXrutdWt1olZFRdZt3NUaqpUKzXo9zC3Ob/5JYiYm0KyPUxCzNp6sNlJaFFjAs24+GweUWk00z8VmfVp/eBJTrWBEkNe4EcFWq3RO/IVRliGqdlBWbBzAqaWFuSjL5q72u8jCItYYLKtAq37jt2H48kWq+/YS97OXe9DadMAftJay/Z3W2dlmnacbFbJRTpZn9LotLi9d45Wlq7RaC7Tbi7SzDtfefzdvOPYeDs+ee/yUaumtZqwL6y1568ftCy+89093HeW0wq5qjR1pSmIE6xxxkmJrE8S7dkKjTvSzH4UDz5x6eBytsb+wPnFo/4OXXO2+fHtzWifqLppqkNRq2CiC0UhD1vfaWuoNX7zw7P6ly986ttD5/ZYCAjzc3HG7Kfw9Yu2Hg4YDoSh66v1iKPys94OTBZw+D3/+XslG6XUD3Ar7N74gmZ5pHIu0AAAAAElFTkSuQmCC';

@Component({
  components: {
    'l-icon': LIcon,
    'l-moving-rotated-marker': LMovingRotatedMarker,
    'v-locatecontrol': Vue2LeafletLocatecontrol,
    LIconDefault,
  },
})
export default class FlightsMap extends Vue {
  @Prop() private flights!: any;

  data() { // eslint-disable-line class-methods-use-this
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 2,
      center: [39.8283, -98.5795],
      bounds: null,
      icon: L.icon({
        iconUrl,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -25],
      }),
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
    console.log(this.flights);
    const flights = this.flights.filter((flight: any) => flight.latitude && flight.latitude !== 0);
    return flights;
  }
}
</script>

<style scoped>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
