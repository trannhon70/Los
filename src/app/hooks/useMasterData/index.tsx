import { useDispatch, useSelector } from "react-redux";
import { getMasterData } from "features/master-data/selectors";
import { ucfirst } from "utils";
import {  
  FnMasterDataRegister, 
  IMasterData, 
  TMasterData, 
  TMasterDataHook, 
  TMasterDataProp 
} from "types/models/master-data";
import { registerMasterData } from "features/master-data/actions";
import { IStoreModel } from "types";

const useMasterData = (): TMasterDataHook => {

  const dispatch = useDispatch();
  const MasterData = useSelector(getMasterData);

  const register: FnMasterDataRegister = (name, param = '', exclude) => {
    if (name === '@all'){
      MasterData.register.mounted || dispatch(registerMasterData(name, { param, exclude }));
    }
    else{
      const store = MasterData[name as keyof IMasterData];
      if ('data' in store){
        !store.fetched && !store.fetching && dispatch(registerMasterData(name, { param, exclude }))
      }
      else if (param && !('mounted' in store)){
        (!store[param] || (!store[param].fetched && !store[param].fetching)) 
        && dispatch(registerMasterData(name, { param, exclude }))
      }
    }
  }

  const getStatus = (name: TMasterDataProp, code?: string):Omit<IStoreModel<any>, 'data'> | undefined  => {
    if('data' in MasterData[name]) {
      const {
        data, ...remain
      } = MasterData[name]
      return remain as Omit<IStoreModel<any>, 'data'>
    }
    else if('mounted' in MasterData[name] || !code ) return undefined;
    else {
      const store = MasterData[name] as Record<string, IStoreModel<any>>
      if(!store[code]) return undefined;
      const {
        data, ...remain
      } = store[code]
      return remain
    }
  } 

  const Data = {};

  Object.keys(MasterData).forEach(name => {
    if (name !== 'register'){
      const state = MasterData[name as TMasterDataProp];
      Object.assign(Data, { [ ucfirst(name) ]: 'data' in state ? state.data : state });
    }
  });

  return {
    ...Data as TMasterData,
    register,
    getStatus,
  };

}

export default useMasterData;