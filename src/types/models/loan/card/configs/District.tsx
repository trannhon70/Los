export interface IDistrict{
  district_code: string;
  district_name: string;
}

export interface IDistrictState{
  fetched: boolean;
  fetching: boolean;
  data: IDistrict[];
}