import { RootState } from "types";
import * as _ from 'lodash';
import { IDocumentType } from "types/models/master-data/state";
export const fetchingLOANNormalData = 
  (state: RootState) => state.LOANNormal.storage.full.fetching;

export const existLOANNormalData = 
  (state: RootState) => state.LOANNormal.storage.full.fetched// && !!state.LOANNormal.storage.full.data;

export const  getLOANNormalLOSuuid = 
  (state: RootState) => state.LOANNormal.storage.full.data?.form.los_info.los_uuid ?? '-';
export const  getLOANNormalExistData = 
  (state: RootState) => state.LOANNormal.storage.full.data;
export const  getLOANNormalLOSId = 
  (state: RootState) => state.LOANNormal.storage.full.data?.form.los_info.los_id ?? '';
export const shouldFetchLOANNormalData = (state: RootState) => {
  return fetchingLOANNormalData(state) && !state.LOANNormal.storage.full.starting;
}

export const existLOANNormalLegal = 
  (state: RootState) => !!state.LOANNormal.storage.full?.data?.form.legal_info_form;

export const existLOANNormalLOAN = 
  (state: RootState) => true;// !!state.LOANNormal.storage.full?.data?.form;

export const getDataDocumentWithKey = (key:string)=>(state:RootState): IDocumentType[] =>{
  return _.get(state.LOANNormal,['configs','documentType',key,'data'],[]);
}

//   export const getLOANNormalLegalFirstUuid = 
//   (state: RootState) => state.LOANNormal.storage.full?.data?.form
//     .legal_info_form?.data.find(d => d.legal_type === 'BORROWER')?.basic_info.uuid ?? '';

// export const getLOANNormalLegalFirstMarriageUuid = 
//   (state: RootState) => state.LOANNormal.storage.full?.data?.form
//     .legal_info_form?.data.find(d => d.legal_type === 'MARRIAGE')?.basic_info.uuid ?? '';

// export const getLOANNormalLegalFirstCoBorrowerUuid = 
//   (state: RootState) => state.LOANNormal.storage.full?.data?.form
//     .legal_info_form?.data.find(d => d.legal_type === 'CO_BRW')?.basic_info.uuid ?? '';

// export const getLOANNormalLegalFirstCoPayerUuid = 
//   (state: RootState) => state.LOANNormal.storage.full?.data?.form
//     .legal_info_form?.data.find(d => d.legal_type === 'CO_PAYER')?.basic_info.uuid ?? '';

// export const getLOANNormalLegalCoBorrower = 
//   (state: RootState) => state.LOANNormal.storage.full?.data?.form
//     .legal_info_form?.data.filter(d => d.legal_type === 'CO_BRW') ?? []

// export const getLOANNormalLegalCoPayer = 
//   (state: RootState) => state.LOANNormal.storage.full?.data?.form
//     .legal_info_form?.data.filter(d => d.legal_type === 'CO_PAYER') ?? []

