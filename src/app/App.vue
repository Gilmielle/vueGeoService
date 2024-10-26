<script setup lang="ts">
import Header from '@/widgets/Header/Header.vue';
import Map from '@/shared/ui/Map/Map.vue';
import { ApiClient } from '@/shared/lib/services/ApiClient'
import { onBeforeMount } from 'vue'
import { API_URL } from '@/shared/constants'

onBeforeMount(() => {
  new ApiClient(API_URL);
})
</script>

<template>
  <div class="pageLayout">
    <div class="pageLayout__header">
      <Header />
    </div>
    <main class="pageLayout__main container">
      <Map />
    </main>
  </div>
</template>

<style lang="scss">
</style>
