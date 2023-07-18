
export interface ILOANNormalCustomerDataAPI {
  data: ICustomerGroupActivity[],
}

export interface ILOANNormalStorageCustomerState {
  discussions: ICustomerGroupActivites[],
  query : ICustomerQuery,
  fetched: boolean,
  fetching: boolean,
}

export interface ICustomerGroupActivites {
  date: string,
  activities : ICustomerGroupActivity[]
}

export interface ICustomerGroupActivity {
  id: string,
  content: string,
  created_by: string,
  full_name: string,
  user_title_name: string | null,
  user_title_code: string | null,
  created_at: number
  avatar:string;
}

export interface ICustomerQuery {
  page: number,
  size: number,
  sort: string,
}