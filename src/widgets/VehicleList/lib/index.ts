import { createTree } from '@/shared/lib/utils'

export const getAdaptedVehiclesList = (vehiclesList) => {
  const { Groups, Items } = vehiclesList
  const groupData = [...Groups];

  setItemsToGroups(Items, groupData);

  return createTree(groupData)
}

const setItemsToGroups = (Items, groupData) => {
  Items.forEach((item) => {
    const { ParentID } = item;
    const itemGroup = groupData.find((group) => group['ID'] === ParentID);
    if(!itemGroup.vehicles) {
      itemGroup.vehicles = [];
    }
    itemGroup.vehicles.push(item)
  })
}


