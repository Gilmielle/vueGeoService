import { config } from '@/shared/lib/config'

const API_URL = config.API_URL;
const API_PASSWORD = config.API_PASSWORD;
const API_USERNAME = config.API_USERNAME;

const API_ENDPOINTS = {
  login: "/ServiceJSON/Login",
  enumSchemas: "/ServiceJSON/EnumSchemas", // получает список схем
  enumDevices: "/ServiceJSON/EnumDevices", // получает список ТС
  enumGeoFences: "/ServiceJSON/EnumGeoFences", // получает список геозон
  getTrack: "/ServiceJSON/GetTrack", // Получение трека (даты/время, координаты, скорость) прибора = ТС
  getGeofences: "/ServiceJSON/GetGeofences", // Получение информации о геозонах (точки для полигонов и т.д.)
};

export {
  API_URL,
  API_PASSWORD,
  API_USERNAME,
  API_ENDPOINTS,
};
