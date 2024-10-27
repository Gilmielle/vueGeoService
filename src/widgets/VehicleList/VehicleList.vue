<script setup lang="ts">
import { useGeoServiceStore } from '@/app/providers'
import { watch } from 'vue'
import { getVehicleList } from './api'
import { getAdaptedVehiclesList } from './lib'
import GroupVehicles from '@/widgets/VehicleList/GroupVehicles.vue'
import GroupSubgroups from '@/widgets/VehicleList/GroupSubgroups.vue'

const store = useGeoServiceStore();

watch(() => store.idSchemas, async () => {
  await getVehicleList(store.getIdSchemas)
    .then((vehiclesData) => {
      const adaptedVehicles = getAdaptedVehiclesList(vehiclesData)
      store.setVehiclesData(adaptedVehicles)
    })
})
</script>

<template>
  <div v-if="!store.vehiclesData.length">Список пока пуст</div>
  <ul v-else>
    <template v-for="group in store.vehiclesData" :key="group['ID']">
      <li>
        <p>{{ group["Name"] + " " + group["ID"] }}</p>
        <GroupVehicles :vehicles="group.vehicles" />
        <ul v-if="!!group.children.length">
          <GroupSubgroups :children="group.children" />
        </ul>
      </li>
    </template>
  </ul>
</template>

<style scoped lang="scss">

</style>
