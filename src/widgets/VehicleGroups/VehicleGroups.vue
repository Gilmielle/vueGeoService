<script setup lang="ts">
import Vehicles from '@/widgets/VehicleGroups/Vehicles.vue'
import type { VehicleGroup } from '@/shared/types'

defineProps<{
  vehiclesData: VehicleGroup[];
}>();

</script>

<template>
  <div class="vehicleGroups">
    <div class="vehicleGroups__emptyMsg" v-if="!vehiclesData || !vehiclesData.length">Список ТС пока пуст</div>
    <ul class="vehicleGroups__list" v-else>
      <template v-for="group in vehiclesData" :key="group.ID">
        <template v-if="!!group">
          <li class="vehicleGroups__item">
            <p class="vehicleGroups__groupName">{{ group.Name }}</p>
            <template v-if="!!group.vehicles && !!group.vehicles.length">
              <div class="vehicleGroups__vehicles">
                <Vehicles :vehicles="group.vehicles" />
              </div>
            </template>
            <template v-if="!!group.children && !!group.children.length">
              <VehicleGroups :vehicles-data="group.children" />
            </template>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.vehicleGroups {

  .vehicleGroups {
    padding-left: 2rem;
  }

  &__emptyMsg {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
  }

  &__list {
    list-style-type: none;
  }

  &__item {

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  &__groupName {
    font-weight: bold;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  &__vehicles {
    padding-left: 2rem;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
