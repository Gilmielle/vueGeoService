import { config } from '@/shared/lib/config'

const API_URL = config.API_URL;
const API_PASSWORD = config.API_PASSWORD;
const API_USERNAME = config.API_USERNAME;

const API_ENDPOINTS = {
  login: "/ServiceJSON/Login",
  enumSchemas: "/ServiceJSON/EnumSchemas",
  enumDevices: "/ServiceJSON/EnumDevices",
  enumGeoFences: "/ServiceJSON/EnumGeoFences",
  getTrack: "/ServiceJSON/GetTrack",
  getGeofences: "/ServiceJSON/GetGeofences",
};

export {
  API_URL,
  API_PASSWORD,
  API_USERNAME,
  API_ENDPOINTS,
};
