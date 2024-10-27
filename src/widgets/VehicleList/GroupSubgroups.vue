<script setup lang="ts">
import GroupVehicles from '@/widgets/VehicleList/GroupVehicles.vue'

const props = defineProps({
  children: [],
})
</script>

<template>
  <div>sub items: </div>
  <template v-for="subGroup in props.children" :key="subGroup['ID']">
    <li>
      <p>{{ subGroup["Name"] + " " + subGroup["ID"] }}</p>
      <ul v-if="subGroup.vehicles.length">
        <GroupVehicles :vehicles="subGroup.vehicles" />
      </ul>
      <ul v-if="!!subGroup.children.length">
        <GroupSubgroups :children="subGroup.children" />
      </ul>
    </li>
  </template>
</template>

<style scoped lang="scss">

</style>
