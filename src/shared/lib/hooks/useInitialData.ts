import { ApiClient } from '@/shared/lib/services/ApiClient'
import { API_ENDPOINTS, API_URL } from '@/shared/constants'
import { useGeoServiceStore } from '@/app/providers'
import type { Schema } from '@/shared/types'

export const useInitialData = async () => {
  new ApiClient(API_URL);
  const store = useGeoServiceStore();

  await ApiClient.instance.post({
    url: API_ENDPOINTS.enumSchemas,
    body: {
      session: ApiClient.session
    },
    type: "json",
  }).then((schemasData: Schema[]) => {
    store.setIdSchemas(schemasData.map(schema => schema["ID"]))
  })
}
