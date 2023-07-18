import { IIdCodeName,TDefaultFlag } from 'types';


export interface IVehicleDetailState{
    fetching: boolean;
    fetched: boolean;
    started: boolean;
    data: IVehicleDetail[]
}
export interface IVehicleDetail extends IIdCodeName {
    other_value_flag: TDefaultFlag;
}
