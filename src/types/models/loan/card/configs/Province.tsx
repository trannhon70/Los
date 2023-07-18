export interface IProvince{
  province_code: string;
  province_name: string;
}

export interface IProvinceState{
  fetched: boolean;
  fetching: boolean;
  data: IProvince[];
}