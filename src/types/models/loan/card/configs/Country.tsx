import { IProvinceState } from "./Province";

export interface ICountry{
  country_code: string;
  country_name: string;
  provinces?: IProvinceState;
}

export interface ICountryState{
  fetched: boolean;
  fetching: boolean;
  data: ICountry[];
}