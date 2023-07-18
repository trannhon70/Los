export interface IDependentPerson{
  name: string;
  min_value: 0,
  max_value: 0
}

export interface IDependentPersonState{
  fetched: boolean;
  fetching: boolean;
  data: IDependentPerson;
}