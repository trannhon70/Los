export interface ICollateralType{
  collateral_type: string;
  collateral_type_desc: string;
}

export interface ICollateralTypeState{
  fetching: boolean;
  fetched: boolean;
  data: ICollateralType[];
}