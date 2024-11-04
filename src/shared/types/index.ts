interface Schema {
  Group: string;
  GroupID: string;
  ID: string;
  Name: string;
}

interface VehicleGroup {
  ID: string;
  Name: string;
  ParentID: string | null;
  vehicles?: VehicleItem[];
  children?: VehicleGroup[];
}

interface VehicleTripSplitter {
  "ID": number;
  "Name": string;
}

interface VehicleItem {
  "Serial": number;
  "Allowed": boolean;
  "Properties": unknown[];
  "FixedLocation": null;
  "Image": string;
  "ImageColored": string;
  "TripSplitters": VehicleTripSplitter[],
  "IsAreaEnabled": boolean;
  "ImageHue": number;
  "ID": string;
  "ParentID": string;
  "Name": string;
}

interface VehicleEnumDevices {
  Groups: VehicleGroup[];
  ID: string;
  Items: VehicleItem[];
  VirtualTreeAssigned: unknown;
  VirtualTrees: unknown[]
}

interface VehicleTrackData {
  ColorSettings: unknown;
  DT: string[];
  Index: number;
  Lat: number[];
  Lng: number[];
  Photos: unknown;
  Speed: number[];
  Coordinates?: number[][];
  isVisible?: boolean;
}

interface VehicleTrack {
  [index: string]: VehicleTrackData[];
}

export type {
  Schema,
  VehicleGroup,
  VehicleItem,
  VehicleEnumDevices,
  VehicleTrackData,
  VehicleTrack,
}
