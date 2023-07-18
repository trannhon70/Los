import { IIncomeTabsDetails } from "types/models/loan/normal/storage/Income";
import * as _ from 'lodash';
import { RootState } from "types/reducer";
import { PREFIX_LOCAL } from "utils";

export const getLoanNormalCICBussinesState = (state: RootState) => state.LOANNormal.storage.icr.data.data.business_employee;
export const getLoanNormalCICLevelOfApprovalState = (state: RootState) => state.LOANNormal.storage.icr.data.data.approval_level;
export const setLoanNormalCICRiskManagementState = (state: RootState) => state.LOANNormal.storage.icr.data.data.risk_management;
export const getLoanNormalICRData = (state: RootState) => state.LOANNormal.storage.icr.data.data
export const getLoanNormalICRStorage= (state: RootState) => state.LOANNormal.storage.icr
export const getFullICR = ( state: RootState) =>state.LOANNormal.storage.full.data?.form.internal_credit_rating.data
export const isCheckExistNormalIncome = (state: RootState) => {
    const income: IIncomeTabsDetails | undefined = _.get(state, 'LOANNormal.storage.full.data.form.source_income_form.data.tabs', {});
    if( !income) return false;
    if(!income.ability_to_repay) return false;
    return true;
  }

export const isExistNormalICR = (state: RootState) =>{
  const icr = state.LOANNormal.storage.full.data?.form.internal_credit_rating.data
  if(icr?.approval_level && icr?.business_employee && icr?.risk_management){
    return true
  }
  return false
}

export const getLOANNormalStorageListDocumentInfosICR = (state: RootState) => state?.LOANNormal?.storage?.icr?.data?.data?.document_info_list ?? [];


export const getDataConfigDocumentICR = () => (state: RootState) => {
  return _.get(state.LOANNormal,['configs','documentType','XHTDNB_LOAN','data'],[]);
}
export const getDataConfigDocumentWithKey = (key:string) => (state: RootState) => {
  return _.get(state.LOANNormal,['configs','documentType',key,'data'],[]);
}
export const getCodeDocumentTypeChildList = (key: string , cicType: string | number) => (state: RootState) => {

  return state.LOANNormal.configs.documentType[key]?.data?.find(d => d.id === +cicType)?.child_list ?? []
}
export const getLOANNormalStorageICRCountFile  = (state: RootState) => {
  const docs = getLOANNormalStorageListDocumentInfosICR(state);
  if(docs.length === 0) return 0;
  let count = 0;
  docs.forEach(doc=>{
    (doc.document_group ?? []).forEach(docG=>{
      count += docG.child_files?.filter(file=> !file?.uuid?.includes(PREFIX_LOCAL))?.length ?? 0;
    })
  })
  return count;
}