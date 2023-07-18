export interface ICurrencyType{
  currency_type: string;
  currency_type_desc: string;
}

export interface ICurrencyTypeState{
  fetched: boolean;
  fetching: boolean;
  data: ICurrencyType[];
}