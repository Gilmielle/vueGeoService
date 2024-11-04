import { createTree } from '@/shared/lib/utils'
import type {
  VehicleEnumDevices,
  VehicleGroup,
  VehicleItem,
  VehicleTrackData,
} from '@/shared/types'


export const getAdaptedVehiclesList = (vehiclesList: VehicleEnumDevices) => {
  const { Groups, Items } = vehiclesList
  const groupData = [...Groups];

  setItemsToGroups(Items, groupData);

  return createTree(groupData)
}

const setItemsToGroups = (Items: VehicleItem[], groupData: VehicleGroup[]): void => {
  Items.forEach((item) => {
    const { ParentID } = item;
    const itemGroup = groupData.find((group) => group['ID'] === ParentID);
    if(!!itemGroup) {
      if(!itemGroup.vehicles) {
        itemGroup.vehicles = [];
      }
      itemGroup.vehicles.push(item)
    }
  })
}

export const getAdaptedVehiclesTrackData = (tracks: VehicleTrackData[]): VehicleTrackData[] => {
  return tracks.map(track => {
    const { Lat, Lng} = track;
    track.Coordinates = [];

    const maxArrayLength = Lat.length > Lng.length ? Lng.length : Lat.length;
    for (let i = 0; i < maxArrayLength; i++) {
      track.Coordinates.push([ Lat[i], Lng[i] ])
    }

    return track;
  })
}


