export interface IWard{
  ward_code: string;
  ward_name: string;
}

export interface IWardState{
  fetched: boolean;
  fetching: boolean;
  starting?: boolean;
  data: IWard[];
}