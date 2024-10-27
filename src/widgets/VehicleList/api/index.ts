import { ApiClient } from '@/shared/lib/services/ApiClient'
import { API_ENDPOINTS } from '@/shared/constants'

export const getVehicleList = async (schemaID) => {
  return await ApiClient.instance.post({
    url: API_ENDPOINTS.enumDevices,
    body: {
      session: ApiClient.session,
      schemaID
    },
    type: "json",
  })
}
