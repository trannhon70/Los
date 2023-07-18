import { IStoreModel } from 'types';
import { IMasterData, TMasterDataProp } from './state';

export type TMasterDataHookProps = Capitalize<Exclude<keyof IMasterData, 'register'>>;

export type TMasterSplitData<K extends keyof IMasterData>  = 
  IMasterData[K] extends IStoreModel<any> ? IMasterData[K]['data'] : IMasterData[K];

export type TMasterData = {
  [A in TMasterDataHookProps ]: TMasterSplitData<
    Uncapitalize<A> extends keyof IMasterData ? Uncapitalize<A> : never
  >;
}

export type FnMasterDataRegister = <T,>(
  name: T extends (TMasterDataProp | '@all') ? T : TMasterDataProp, 
  param?: T extends 'province' | 'district' | 'ward'
    ? string 
    : any,
  exclude?: (keyof IMasterData)[]
 ) => void;

export type TMasterDataHook = TMasterData & {
  register: FnMasterDataRegister;
  getStatus: (name: TMasterDataProp, code?: string) => Omit<IStoreModel<any>, 'data'> | undefined
}

export type { IMasterData, TMasterDataProp };
