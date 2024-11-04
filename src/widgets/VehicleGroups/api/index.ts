import { ApiClient } from '@/shared/lib/services/ApiClient'
import { API_ENDPOINTS } from '@/shared/constants'
import { getDateString } from '@/shared/lib/utils'

interface getVehicleTrackProps {
  vehicleIDs: string[];
  schemaID: string;
}
export const getVehicleList = async (schemaID: string) => {
  return await ApiClient.instance.post({
    url: API_ENDPOINTS.enumDevices,
    body: {
      session: ApiClient.session,
      schemaID
    },
    type: "json",
  })
}

export const getVehicleTrack = async ({
  vehicleIDs,
  schemaID,
}: getVehicleTrackProps) => {
  const today = new Date();
  const yesterday = new Date(new Date().setDate(today.getDate() - 1));
  const ED = getDateString(today)
  const SD = getDateString(yesterday)

  return await ApiClient.instance.post({
    url: API_ENDPOINTS.getTrack,
    body: {
      schemaID,
      IDs: vehicleIDs.join(","),
      SD,
      ED,
    },
    type: "json",
  })
}
