import { IPagingFilter } from "types/base";
import { ILOANMixed } from "./LOANs";

export interface IDashboardState{
  LOAN: {
    data: ILOANMixed[];
    fetching: boolean;
    fetched: boolean;
  } & IPagingFilter;
}

export interface IGeojsonGeometry {
  type: 'Point';
  coordinates: [number, number, number];
}
export interface IGeojsonProperties {
  id: string;
  name: string;
  code: string;
  address: string;
  zone_id: string;
  zone_name: string;
  area_id: string;
  area_name: string;
  type: string;
}
export interface IGeojsonFeature {
  id: string;
  type: 'Feature';
  properties: IGeojsonProperties;
  geometry: IGeojsonGeometry;
}
export interface IGeojsonData { 
  features: IGeojsonFeature[];
}

