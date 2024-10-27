import { defineStore } from 'pinia'

interface GeoServiceState {
  idSchemas: Set<string>;
  setIdSchemas: (idSchemas: string[]) => void;
}

export const useGeoServiceStore = defineStore('geoServiceData', {
  state: (): GeoServiceState => ({
    idSchemas: new Set(),
    vehiclesData: [],
  }),
  getters: {
    getIdSchemas(state) {
      return Array.from(state.idSchemas).join(",")
    }
  },
  actions: {
    setIdSchemas(idSchemas) {
      const newIdSchemas = new Set(this.idSchemas);
      idSchemas.forEach((idSchema) => newIdSchemas.add(idSchema));

      this.idSchemas = newIdSchemas
    },
    setVehiclesData(vehiclesData) {
      this.vehiclesData = vehiclesData
    },
  },
})
