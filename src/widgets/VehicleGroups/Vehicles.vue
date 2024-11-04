<script setup lang="ts">
import type { VehicleItem, VehicleTrack } from '@/shared/types'
import { useGeoServiceStore } from '@/app/providers'
import { getVehicleTrack } from '@/widgets/VehicleGroups/api'
import { getAdaptedVehiclesTrackData } from '@/widgets/VehicleGroups/lib'

defineProps<{
  vehicles: VehicleItem[] | undefined;
}>();

const store = useGeoServiceStore();
const handleVehicleChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;

  if(target.checked) {
    if(store.getIsHasTrack(target.value)) {
      store.setVehicleTracksVisibility(target.value, true)
    } else {
      await getVehicleTrack({
        vehicleIDs: [ target.value ],
        schemaID: store.getIdSchemas
      }).then((trackData: VehicleTrack) => {
        const adaptedVehiclesTrack: VehicleTrack = {};
        Object.entries(trackData).forEach(([key, value]) => {
          adaptedVehiclesTrack[key] = getAdaptedVehiclesTrackData(value).map(track => {
            return {
              ...track,
              isVisible: true,
            }
          })
        });

        console.debug(adaptedVehiclesTrack)
        store.setVehicleTracks(adaptedVehiclesTrack)
      })
    }

  } else {
    store.setVehicleTracksVisibility(target.value, false)
  }
}
</script>

<template>
  <ul class="vehicles" v-if="!!vehicles && vehicles.length">
    <template v-for="vehicle in vehicles" :key="vehicle.ID">
      <li class="vehicles__item">
        <label class="vehicles__itemLabel">
          <input class="vehicles__itemChecker" type="checkbox" :value="vehicle.ID" @change="handleVehicleChange">
          <span class="vehicles__itemTitle">{{ vehicle.Name }}</span>
        </label>
      </li>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.vehicles {
  list-style-type: none;

  &__item {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }

  &__itemLabel {
    display: flex;
    flex-flow: row nowrap;
  }

  &__itemTitle {
    display: block;
    margin-left: 1rem;
  }
}
</style>
