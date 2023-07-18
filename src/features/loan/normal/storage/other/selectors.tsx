import { RootState } from "types";
import { OtherValidate } from "views/pages/LOAN/utils/validate";

export const getExeptions =
  (state: RootState) => state.LOANNormal.storage.other.exception;

export const getRiskGroup = 
  (state: RootState) => state.LOANNormal.storage.other.analysis.risksGroup;

export const getAnalysis = 
  (state: RootState) => state.LOANNormal.storage.other.analysis;
 
export const getReport = 
  (state: RootState) => state.LOANNormal.storage.other.report;
export const getDetailsList  = (uuid:string) =>
  (state: RootState) => state.LOANNormal.storage.other.exception.find(item=>item.uuid === uuid);
export const checkSavedExceptionList = (uuid: string) => (state: RootState) =>{
  return state.LOANNormal.storage.full.data?.form.other_profile.data.exception_list.every(i => i.uuid === uuid)
}
export const getLOANNormalStorageOtherSave = (state: RootState) => [
  state.LOANNormal.storage.other,
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string,
  state.masterData,
];

export const validateNormalStorageOtherException = (state: RootState) => {
  const {
    report, exception
  } = state.LOANNormal.storage.other;

  // const otherException = OtherValidate.exception(exception);
  // if (!otherException.valid) return { ...otherException, declare: 'exception', position: i };

  // for(let i = 0; i < exception.length; i++){
  //   const otherException = OtherValidate.exception(exception[i]);
  //   if(!otherException.valid){
  //     return { ...otherException, positionException: i };
  //   } else {
  //     for(let x = 0; x < exception[i].detailList.length; x++){
  //       const exceptionDetail = OtherValidate.exceptionDetail(exception[i].detailList[x]);
  //       if(!exceptionDetail?.valid) return { ...exceptionDetail, positionException: exception[i].exceptionId, positionDetail: x };
  //     }
  //   }
    
  // }
  if(exception.length >0){
    const vReport = OtherValidate.report(report ?? "")
    if(!vReport.valid) return vReport
  }
  

  return { valid: true };
}


export const validateNormalStorageOtherAnalysis = (state: RootState) => {
  const {
    analysis,
  } = state.LOANNormal.storage.other;

  for(let x = 0; x < analysis.risksGroup.length; x++){
    const riskDetail = OtherValidate.riskDetail(analysis.risksGroup[x]);
    if(!riskDetail.valid) return { ...riskDetail, position: x };
    for(let i = x + 1; i < analysis.risksGroup.length; i++){
      if(analysis.risksGroup[x].riskInfo === analysis.risksGroup[i].riskInfo){
        return { valid: false };
      }
    }
  }

  return { valid: true };
}

export const getValidateNormalStorageOther = (state: RootState) => {
  return state.LOANNormal.storage.other.validate;
};