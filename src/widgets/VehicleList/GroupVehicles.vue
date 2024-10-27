<script setup lang="ts">

const props = defineProps({
  vehicles: [],
})
</script>

<template>
  <div>GroupVehicles: </div>
  <ul v-if="props.vehicles.length">
    <template v-for="vehicle in props.vehicles" :key="vehicle['ID']">
      <li>
        {{ vehicle["ID"] + " " + vehicle["Name"] }}
      </li>
    </template>
  </ul>
</template>

<style scoped lang="scss">

</style>
