import { defineStore } from 'pinia'
import type { VehicleGroup, VehicleTrack, VehicleTrackData } from '@/shared/types'

interface GeoServiceState {
  idSchemas: Set<string>;
  vehiclesData: VehicleGroup[];
  vehicleTracks: Map<string, VehicleTrackData[]>
}

export const useGeoServiceStore = defineStore('geoServiceData', {
  state: (): GeoServiceState => ({
    idSchemas: new Set(),
    vehiclesData: [],
    vehicleTracks: new Map(),
  }),
  getters: {
    getIdSchemas(state) {
      return Array.from(state.idSchemas).join(",")
    },
    getVisibleTracks(state) {
      return Array.from(state.vehicleTracks)
        .map(([, value]) => value)
        .flat()
        .filter(track => !!track.isVisible)
    },
  },
  actions: {
    setIdSchemas(idSchemas: string[]) {
      const newIdSchemas = new Set(this.idSchemas);
      idSchemas.forEach((idSchema) => newIdSchemas.add(idSchema));

      this.idSchemas = newIdSchemas
    },
    setVehiclesData(vehiclesData: VehicleGroup[]) {
      this.vehiclesData = vehiclesData
    },
    setVehicleTracks(trackData: VehicleTrack) {
      Object.entries(trackData).forEach(([key, value]) => {
        this.vehicleTracks.set(key, value)
      })
    },
    setVehicleTracksVisibility(vehicleTrackId: string, isVisible = true) {
      const tracks = this.vehicleTracks.get(vehicleTrackId);
      if(!!tracks) {
        for(let i = 0; i < tracks.length; i++) {
          tracks[i].isVisible = isVisible;
        }
      }
    },
    getIsHasTrack(vehicleTrackId: string) {
      return this.vehicleTracks.has(vehicleTrackId);
    },
  },
})
