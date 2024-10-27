<script setup lang="ts">
import Header from '@/widgets/Header/Header.vue';
import Map from '@/shared/ui/Map/Map.vue';
import { onBeforeMount } from 'vue'
import VehicleList from '@/widgets/VehicleList/VehicleList.vue'
import { useInitialData } from '@/shared/lib/hooks/useInitialData'


onBeforeMount(async () => {
  await useInitialData();
})
</script>

<template>
  <div class="pageLayout">
    <div class="pageLayout__header">
      <Header />
    </div>
    <main class="pageLayout__main container">
      <VehicleList />
      <Map />
    </main>
  </div>
</template>

<style lang="scss">
</style>
