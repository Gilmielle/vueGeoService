<template>
  <div class="map" ref="map-root" />
</template>

<script lang="ts">
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'

export default {
  name: 'MapContainer',
  components: {},
  props: {},
  mounted() {
    // this is where we create the OpenLayers map
    new Map({
      // the map will be created using the 'map-root' ref
      target: this.$refs['map-root'],
      layers: [
        // adding a background tiled layer
        new TileLayer({
          source: new OSM() // tiles are served by OpenStreetMap
        }),
      ],

      view: new View({
        center: [4190701.0645526173, 7511438.408408914],
        zoom: 10,
      }),
    })
  },
}
</script>

<style lang="scss">
.map {
  --mapSize: 1000px;
  width: var(--mapSize);
  height: var(--mapSize);
}
</style>
