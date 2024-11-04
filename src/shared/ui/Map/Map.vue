<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 1000px"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <template v-for="(coords, index) in coordinates" :key="index">
            <ol-geom-multi-line-string
              :coordinates="coords"
            ></ol-geom-multi-line-string>
          </template>
          <ol-style>
            <ol-style-stroke
              :color="strokeColor"
              :width="strokeWidth"
            ></ol-style-stroke>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGeoServiceStore } from '@/app/providers'
import { fromLonLat } from 'ol/proj';

const center = ref(fromLonLat([ 55.1028469,  61.3586438 ]));
const projection = ref('EPSG:3857');
const zoom = ref(10);
const rotation = ref(0);
const strokeWidth = ref(5);
const strokeColor = ref("red");
const coordinates = ref([])

const store = useGeoServiceStore();

watch(() => store.getVisibleTracks.length, async () => {
  const coords = store.getVisibleTracks.map((item) => {
    if(!!item.Coordinates) {
      return item.Coordinates.map(coordPair => fromLonLat(coordPair))
    }
  }).filter(item => !!item)
  if(!!coords.length) {
    center.value = coords[0][0]
  }
  coordinates.value = [coords]
})
</script>

<style lang="scss">

</style>
