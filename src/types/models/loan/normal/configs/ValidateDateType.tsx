export interface IValidateDateTypeState{
    fetched: boolean,
    fetching: boolean,
    started: boolean,
    data: IValidateDateType[]
} 
export interface IValidateDateType{
    code: string;
    value: string;
}