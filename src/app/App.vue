<script setup lang="ts">
import Header from '@/widgets/Header/Header.vue';
import Map from '@/shared/ui/Map/Map.vue';
import { onBeforeMount, watch } from 'vue'
import VehicleGroups from '@/widgets/VehicleGroups/VehicleGroups.vue'
import { useInitialData } from '@/shared/lib/hooks/useInitialData'
import { useGeoServiceStore } from '@/app/providers'
import { getVehicleList } from '@/widgets/VehicleGroups/api'
import { getAdaptedVehiclesList } from '@/widgets/VehicleGroups/lib'

const store = useGeoServiceStore();

onBeforeMount(async () => {
  await useInitialData();
})

watch(() => store.idSchemas, async () => {
  await getVehicleList(store.getIdSchemas)
    .then((vehiclesData) => {
      const adaptedVehicles = getAdaptedVehiclesList(vehiclesData)
      store.setVehiclesData(adaptedVehicles)
    })
})
</script>

<template>
  <div class="pageLayout">
    <div class="pageLayout__header">
      <Header />
    </div>
    <main class="pageLayout__main container">
      <VehicleGroups :vehicles-data="store.vehiclesData" />
      <Map />
    </main>
  </div>
</template>

<style lang="scss">
</style>
