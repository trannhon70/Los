import { Draft } from "@reduxjs/toolkit";
import * as _ from 'lodash';
import { RootState } from "types";
import {
  ICICDataAPI,
  ICICDeclareAttachmentCount,
  ICICDeclareDataAPI, ICICDeclareMultiAPI, ICICIdentityAPI, ICICNormalStorageLegalCustomDetail, ICICNormalStorageLegalIdentityCustom, ICICOrganAPI, ILOANNormalAllCreditDeleteInfo, ILOANNormalStorageCICCreditDetailGroup, ILOANNormalStorageCICDeclare, ILOANNormalStorageCICDeclareData, ILOANNormalStorageCICDocumentList, ILOANNormalStorageCICOrgan,
  ILOANNormalStorageCICOrganData,
  ILOANNormalStorageCICOther,
  IRiskInfo
} from "types/models/loan/normal/storage/CIC";
import { ILOANNormalStorageLegalIdentityData } from "types/models/loan/normal/storage/Legal";
import { PREFIX_LOCAL } from "utils";
import { ValidateCIC } from "./validate";

export const getIdentityLOANNormalStoredFull = (state: RootState) => {
  return state.LOANNormal?.storage?.full.data?.form?.legal_info_form?.data;
};

export const getDataCIC = (state:RootState) =>{
  return state.LOANNormal.storage.cic.scb
}


export const getCurrentListIdentity = (state: RootState) => {

  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  
  switch (declareActive) {
    case 'borrower':
      return state.LOANNormal.storage.full.data?.form?.legal_info_form?.data?.borrower?.identity_info ?? null;
    case 'marriage':
      return state.LOANNormal.storage.full.data?.form?.legal_info_form?.data?.marriage?.identity_info ?? null;
    case 'co-brw':
      return state.LOANNormal.storage.full.data?.form?.legal_info_form?.data?.co_brw?.find(person => person.basic_info.uuid === positionActive)?.identity_info ?? null;
    case 'co-payer':

      return state.LOANNormal.storage.full.data?.form?.legal_info_form?.data.co_payer?.find(person => person.basic_info.uuid === positionActive)?.identity_info ?? null;
    case 'law-rlt':
      if(state.LOANNormal.storage.full.data?.form?.legal_info_form?.data?.law_rlt?.find(person => person.basic_info.uuid === positionActive)?.identity_info !== undefined){
        return [state.LOANNormal.storage.full.data?.form?.legal_info_form?.data?.law_rlt?.find(person => person.basic_info.uuid === positionActive)?.identity_info] as ILOANNormalStorageLegalIdentityData[];
      }
      else return null
    case 'other':

      return state.LOANNormal.storage.full.data?.form?.legal_info_form?.data?.others?.find(person => person.basic_info.uuid === positionActive)?.identity_info ?? null;
    default:
      return null;
  }

};
export const getIdentityLOANCardStoredFull = (state: RootState) => {
  return [];
};

export const getDeclareLegal = (state: RootState) => {
  return state.LOANNormal.storage.legal.data['BORROWER'].info[0].declare ?? [];
}
export const getLegalExistData = (state:RootState) => {
  
    let listDeclareExist : string[] = []
    const legalData = state.LOANNormal.storage.full.data?.form.legal_info_form.data
  
    if (legalData?.borrower.basic_info.uuid) {
      listDeclareExist.push('BORROWER');
    }
    if (legalData?.marriage?.basic_info?.uuid) {
      listDeclareExist.push('MARRIAGE');
    }
    if (legalData?.co_brw[0]?.basic_info?.uuid) {
      listDeclareExist.push('CO_BRW');
    }
    if (legalData?.co_payer[0]?.basic_info?.uuid) {
      listDeclareExist.push('CO_PAYER');
    }
    if (legalData?.law_rlt[0]?.basic_info?.uuid) {
      listDeclareExist.push('LAW_RLT');
    }
    if (legalData?.others[0]?.basic_info?.uuid) {
      listDeclareExist.push('OTHER');
    }
    return listDeclareExist
}
export const getLOANCICDetails = () => (state: Draft<RootState>) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
  const creditUUID = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data?.find((x) => x.uuid === identityActive)?.activeCredit;
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
    .find((x) => x.uuid === identityActive)
    ?.credit.find((c) => c.uuid === creditUUID)?.detail;
};

// get identity current
export const getLOANNormalStorageCICIdentityActive =
  (
    organActive: keyof ILOANNormalStorageCICOther,
    declareActive: keyof ILOANNormalStorageCICOrganData,
  ) =>
    (state: RootState) => {
      const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      return (
        state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive ?? ""
      );
    };

// get height debit group current
export const getLOANNormalStorageCICCurrentCreditGroup =
  () =>
    (state: RootState) => {
      const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
      const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
      return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data?.find(
        (d) => d.uuid === identityActive
      );
    };
export const getLOANNormalStorageCICCurrentCreditGroupWithUuid = (uuid:string) =>(state:RootState) =>{
      const organActiveUuid = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActiveUuid = state.LOANNormal.storage.cic[organActiveUuid]?.declareActive as keyof ILOANNormalStorageCICOrganData;
      const identyActiveUuid = state.LOANNormal.storage.cic[organActiveUuid]?.data[declareActiveUuid]?.data.find(x=>x.person_uuid === uuid)?.identityActive;
      return state.LOANNormal.storage.cic[organActiveUuid]?.data[declareActiveUuid]?.data.find(x=>x.person_uuid === uuid)?.data?.find((d)=> d.uuid === identyActiveUuid);
}
export const getLOANNormalStorageCICCurrentIdentity = (state: RootState)=>{
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive ?? '';
  return identityActive;
}

export const checkLOANNormalStorageCICIdentityEmptyCredit = (state: RootState) => {
  const cic_form = state.LOANNormal.storage.full.data?.form?.cic_form;
  if (!cic_form) return true;
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x => x.person_uuid === positionActive)?.identityActive ?? '';
  const organ: { [key: string]: keyof ICICDataAPI } = {
    other: 'other_credit_institution',
    scb: 'current_credit_institution',
  }
  const declareFormCic: { [key: string]: keyof ICICOrganAPI } = {
    'borrower': 'borrower',
    'co-brw': 'co_brw',
    'co-payer': 'co_payer',
    'law-rlt': 'law_rlt',
    'marriage': 'marriage',
    'other': 'others',
  }
  const currentCICInstitution = cic_form[organ[organActive]] as ICICOrganAPI;
  if (!currentCICInstitution) return true;

  const de = declareFormCic[declareActive];
  if (!de) return true;
  const getCICInfos = (data: ICICIdentityAPI[]) => data.find(it => it.uuid === identityActive);
  // case single declare
  if (de === 'borrower' || de === 'marriage') {
    const declareCICFullForm = currentCICInstitution[declareFormCic[declareActive]] as ICICDeclareMultiAPI<ICICDeclareDataAPI>;
    if (!declareCICFullForm) return true;
    const creditInfos = _.get(getCICInfos(declareCICFullForm?.data?.cic_identity_info ?? []), 'cic_identity_credit_institution_info', []);
    return !(creditInfos.length > 0);
  }

  // case multiple declare
  const declareCICFullForm = currentCICInstitution[declareFormCic[declareActive]] as ICICDeclareMultiAPI<ICICDeclareDataAPI[]>;
  const activePerson = declareCICFullForm.data.find(item => item.person_uuid === positionActive);
  if (!activePerson) return true;
  const creditInfos = _.get(getCICInfos(activePerson?.cic_identity_info ?? []), 'cic_identity_credit_institution_info', []);
  return !(creditInfos.length > 0);
}


export const getLOANNormalStorageCICDeclare =
  (declare: string) => (state: Draft<RootState>) => {
    let data: any[] =[];
    let result: ICICNormalStorageLegalCustomDetail[] = [] as ICICNormalStorageLegalCustomDetail[];
    const val = declare
    switch (val) {
      case "borrower":
        data = [state.LOANNormal.storage.full.data?.form.legal_info_form.data.borrower];
        break;
      case "marriage":
        data = [state.LOANNormal.storage.full.data?.form.legal_info_form.data.marriage];
        break;
      case "co-brw":
        data = state.LOANNormal.storage.full.data?.form.legal_info_form.data.co_brw ?? []
        break;
      case "co-payer":
        data = state.LOANNormal.storage.full.data?.form.legal_info_form.data.co_payer  ?? []
        break;
      case "law-rlt":
        data = state.LOANNormal.storage.full.data?.form.legal_info_form.data.law_rlt ?? []
        break;
      case "other":
        data = state.LOANNormal.storage.full.data?.form.legal_info_form.data.others ?? []
        break;
    }
    result = data?.map(x => {
    let identityChange = Array.isArray(x?.identity_info) ? x?.identity_info : [x?.identity_info]
        return {
          uuid: x?.basic_info?.uuid,
          full_name: x?.basic_info?.full_name,
          identity_info: identityChange?.map((i: ILOANNormalStorageLegalIdentityData) => {
            return {
              type: i?.identity_type.code,
              num: i?.uuid,
              issuedDate: i?.issued_date,
              expiredDate: i?.expired_date ,
              placeOfIssue: i?.place_of_issue ,
              primaryFlag: i?.primary_flag,
              uuid: i?.uuid,
              uuidRemote: i?.uuid,
            }
          }) as ICICNormalStorageLegalIdentityCustom[]
        }
      }) as ICICNormalStorageLegalCustomDetail[];

    return result;
  };

export const getLOANNormalUserListFromGetFull = (organ: string, declare: string) => (state: Draft<RootState>) => {
  let value = "";
  switch (declare) {
    case "borrower":
      value = "borrower";
      break;
    case "marriage":
      value = "marriage";
      break;
    case "co-brw":
      value = "co_brw";
      break;
    case "co-payer":
      value = "co_payer";
      break;
    case "law-rlt":
      value = "law_rlt";
      break;
    case "other":
      value = "others";
      break;
  }
  let data: ICICDeclareDataAPI[] = [];
  switch (organ) {
    case "scb":{
      const currentData = state.LOANNormal.storage.full.data?.form.cic_form.current_credit_institution[value as keyof ICICOrganAPI]?.data;
      data = currentData?(_.isArray(currentData)?currentData:[currentData]) : [];
      break;
    }
    case "other":{
      const currentData = state.LOANNormal.storage.full.data?.form.cic_form.other_credit_institution[value as keyof ICICOrganAPI]?.data;
      data =  currentData?(_.isArray(currentData)?currentData:[currentData]) : [];
      break;
    }
    default:{
      const currentData = state.LOANNormal.storage.full.data?.form.cic_form.other_credit_institution[value as keyof ICICOrganAPI]?.data;
      data =  currentData?(_.isArray(currentData)?currentData:[currentData]) : [];
      break;
    }
  }
  return data;
};

export const getLOANNormalStorageCICPosition = (
  organActive: keyof ILOANNormalStorageCICOther,
  declareActive: keyof ILOANNormalStorageCICOrganData,
) => (state: Draft<RootState>) => {
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? '';
};

// get declare active
export const getLOANNormalStorageCurrentDeclare = () => (state: RootState) => {
  const organ = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  return state.LOANNormal.storage.cic[organ]?.declareActive;
}

export const getLOANNormalCredit = () => (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
  // const creditUUID = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data?.find(x => x.identity_num === identityActive)?.activeCredit;
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
    .find(x => x.uuid === identityActive)
}

// get list customer segment
export const getListCustomerSegment =
  (declare: string) => (state: Draft<RootState>) => {

    let organ = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
    let declareActive = state.LOANNormal.storage.cic[organ]?.declareActive as keyof ILOANNormalStorageCICOrgan;
    let positionActive = state.LOANNormal.storage.cic[organ]?.data[declareActive]?.position ?? 0;
    if (organ === 'rating-review' as keyof ILOANNormalStorageCICOther) {
      state.LOANNormal.storage.cic.other.data[declare]?.data.find(x=>x.person_uuid === positionActive)?.data.map(x => {
        if (x.credit.length > 0) {
          organ = 'other';
          declareActive = declare as keyof ILOANNormalStorageCICOrgan;
        } else {
          organ = 'scb';
          declareActive = declare as keyof ILOANNormalStorageCICOrgan;
        }
      })
    }
    const identityActive =
      state.LOANNormal.storage.cic[organ]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
    return state.LOANNormal.storage.cic[organ]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data?.find(
      (d) => d.uuid === identityActive
    )?.credit_score_info?.risk_info ?? {} as unknown as IRiskInfo;
  };

export const getLOANNormalStorageCICSave = (state: RootState) => {

  return [
    state.LOANNormal.storage.cic,
    getLegalExistData(state),
    state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string,
    state.masterData,
    state.LOANNormal.configs
]};

export const getActiveCardUUID = () => (state: Draft<RootState>) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
  const creditUUID = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data?.find(x => x.uuid === identityActive)?.activeCredit;
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
    .find(x => x.uuid === identityActive)?.credit
    .find((c) => c.uuid === creditUUID)?.detail.card.active;
}

export const getActiveLOANTerm = (state: Draft<RootState>) => {
    const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
    const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
    const creditUUID = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data.find(x => x.uuid === identityActive)?.activeCredit;
    return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
      .find(x => x.uuid === identityActive)?.credit
      .find((c) => c.uuid === creditUUID)?.detail.loan.active;
  }

export const getActiveCollateral =
  () => (state: Draft<RootState>) => {
    const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
    const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
    const creditUUID = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data?.find(x => x.uuid === identityActive)?.activeCredit;
    return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
      .find(x => x.uuid === identityActive)?.credit
      .find((c) => c.uuid === creditUUID)?.detail.collateral.active;
  }

export interface IExistCICInfo {
  [name: string]: ILOANNormalStorageCICDeclareData[]
}

export const getCICInfo = () => (state: Draft<RootState>) => state.LOANNormal.storage.cic.summary

// const getCicDetailInfo = (data1: ILOANNormalStorageCICDeclareData[], data2: ILOANNormalStorageCICDeclareData[]) => {
//   let listCic: ILOANNormalStorageCICDeclareData[] = []
//   data1.forEach((user, uIdx) => {
//     listCic = [
//       ...listCic,
//       {
//         identityActive: user.identityActive,
//         person_uuid: user.person_uuid,
//         full_name: user.full_name,
//         data: [],
//         document_info_list: user.document_info_list,
//       }
//     ]
//     const cicData = data2.find(x => x.person_uuid === user.person_uuid);
//     user.data?.forEach((i, idx) => {
//       const userData = cicData?.data.find(c => c.uuid === i.uuid)
//       if (Number(i.credit_score_info?.risk_info?.score_value) > 0) {
//         listCic = listCic.map(item => {
//           if (item.person_uuid === user.person_uuid) {
//             return {
//               ...item,
//               data: [
//                 ...item.data,
//                 {
//                   ...i,
//                   totalLoan: (i.totalLoan ?? 0) + (userData?.totalLoan ?? 0),
//                   totalCollateral: (i.totalCollateral ?? 0) + (userData?.totalCollateral ?? 0),
//                   credit: userData ? i.credit.concat(userData.credit) : i.credit
//                 }
//               ] as ILOANNormalStorageCICDeclareDataDetail[]
//             }
//           }
//           return {
//             ...item
//           }
//         }) as ILOANNormalStorageCICDeclareData[]
//       }
//     })
//   })
//   return listCic;
// }

export const getLOANNormalStorageLegalData = () => (state: Draft<RootState>) => {
  return state.LOANNormal.storage.legal.data;
};

export const getCreditLoanData = (organ: keyof ILOANNormalStorageCICOther, declare: string) => (state: Draft<RootState>) => {
  const positionActive = state.LOANNormal.storage.cic[organ]?.data[declare]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organ]?.data[declare]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;

  return state.LOANNormal.storage.cic[organ]?.data[declare]?.data.find(x=>x.person_uuid === positionActive)?.data
    ?.find(x => x.uuid === identityActive)?.credit;
}

// export const getDisabledCreditScoreInfo = (state: Draft<RootState>) => {
//   const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
//   const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
//   const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
//   const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
//   const creditActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
//     ?.find(x => x.identity_num === identityActive)?.activeCredit

//   const listCredit = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data.find(e => e.uuid === identityActive)
// }

export const getActiveOrgan = () => (state: Draft<RootState>) => {
  return state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
}

export const getDeclareActive = () => (state: Draft<RootState>) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  return state.LOANNormal.storage.cic[organActive]?.declareActive;
}

export const getListGrpFileByUser = () => (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.document_info_list;
}

export const getDataConfigDocument = () => (state: RootState) => {
  return state.LOANNormal.configs.documentType?.LICH_SU_QUAN_HE_TIN_DUNG_LOAN?.data;
}


export const getDataConfigChildDocument = (code: string) => (state: RootState) => {
  return state.LOANNormal.configs.documentType?.LICH_SU_QUAN_HE_TIN_DUNG_LOAN?.data?.find(x => x.code === code)?.child_list;
}

export const getListDocumentTypeGroup = (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.document_info_list ?? [];
}

export const getListDocumentCICWithUuid =(uuid:string)=> (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === uuid)?.document_info_list ?? [];
}

export const getListDocumentType = (indexGroup: number) => (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;

  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.document_info_list[indexGroup]?.document_list ?? [];
}

export const getListDucomentChildFiles = (indexGroup: number, indexType: number) => (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;

  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]
    ?.data.find(x=>x.person_uuid === positionActive)
    ?.document_info_list[indexGroup]
    ?.document_list[indexType]
    ?.document_child_files ?? [];
}

export const getListExistData = (key: string) => (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
  const creditActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
    ?.find(x => x.uuid === identityActive)?.activeCredit
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
    ?.find(x => x.uuid === identityActive)?.credit?.find(c => c.uuid === creditActive)?.detail[key as keyof ILOANNormalStorageCICCreditDetailGroup]?.list;
}

export const getCurrentActiveIdentityData = (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;
  
  return state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data
    ?.find(x => x.uuid === identityActive)
}

export const getDeclareData = (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const data : ILOANNormalStorageCICDeclare = _.get(state.LOANNormal.storage,['cic',organActive,'data',declareActive]);
    return data ?? null;
}

export const getCheckHasNonCreditFile = (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const positionActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
  const identityActive = state.LOANNormal.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.identityActive;

  return state.LOANNormal.storage.cic.other?.data[declareActive]?.data?.find(x=>x.person_uuid === positionActive)?.document_info_list?.some(doc => 
    doc.document_list?.some(list => list.document_child_files?.some(file => 
      file.custom_keys?.identity === identityActive)))
  
}

export const getListDeclareData = (state: RootState) => {
  const organActive = state.LOANNormal.storage.cic.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = state.LOANNormal.storage.cic[organActive]?.declareActive as keyof ILOANNormalStorageCICOrganData;
  const data:ILOANNormalStorageCICDeclareData[] = _.get(state.LOANNormal.storage,['cic',organActive,'data',declareActive,'data'],[]);
    return data ?? [];
}

export const validateLOANNormalStorageCIC = (state: RootState) => {
  const { other, scb, activeOrgan } = state.LOANNormal.storage.cic;
  if(activeOrgan === 'other'){
    const declareActive = other.declareActive;

    if (other.data[declareActive].data.length > 0) {
      const activeUser = other.data[declareActive].position;
      const validOther = ValidateCIC.other(other.data[declareActive].data.find(x=>x.person_uuid === activeUser) as ILOANNormalStorageCICDeclareData );
      if (!validOther.valid) return { ...validOther, organ: activeOrgan, position: activeUser, declare: declareActive };
    }

  }
  if (activeOrgan === 'scb') {
    const declareActive = scb.declareActive;
    if (scb.data[declareActive].data.length > 0) {
      const activeUser = scb.data[declareActive].position;
      const validOther = ValidateCIC.scb(scb.data[declareActive].data.find(x=>x.person_uuid === activeUser) as ILOANNormalStorageCICDeclareData );
      if (!validOther.valid) return { ...validOther, organ: activeOrgan, position: activeUser, declare: declareActive };
    }
  }

  return { valid: true };
}

export const getValidateLOANNormalStorageCIC = (state: RootState) => {
  return state.LOANNormal.storage.cic.validate;
}
export const getFullCICData = () => (state: RootState) => state.LOANNormal.storage.cic
export const getCICFull = () => (state: RootState) => {
  const data = state.LOANNormal.storage.cic;
  return data;
}

export const getCompleteCICStep = (state: RootState) => {

  const checkListComplete = (data?: ICICDeclareDataAPI[]) => {
    if(data){
      return data.some(person => person.cic_identity_info.some(iden => iden.cic_identity_credit_institution_info.length > 0))
    }
    return false
  }
  const checkComplete = (data?: ICICDeclareDataAPI) => {
    if(data){
      return data.cic_identity_info.some(iden => iden.cic_identity_credit_institution_info.length > 0)
    }
    return false
  }

  return {
    other: {
      borrower: checkComplete(state.LOANNormal.storage.full.data?.form.cic_form.other_credit_institution.borrower.data),
      marriage: checkComplete(state.LOANNormal.storage.full.data?.form.cic_form.other_credit_institution.marriage.data),
      co_brw:  checkListComplete(state.LOANNormal.storage.full.data?.form?.cic_form?.other_credit_institution?.co_brw?.data),
      co_payer: checkListComplete(state.LOANNormal.storage.full.data?.form?.cic_form?.other_credit_institution?.co_payer?.data),
      law_rlt: checkListComplete(state.LOANNormal.storage.full.data?.form?.cic_form?.other_credit_institution?.law_rlt?.data),
      others: checkListComplete(state.LOANNormal.storage.full.data?.form?.cic_form?.other_credit_institution?.others?.data),
    },
    scb: {
      borrower: checkComplete(state.LOANNormal.storage.full.data?.form.cic_form.current_credit_institution.borrower.data),
      marriage: checkComplete(state.LOANNormal.storage.full.data?.form.cic_form.current_credit_institution.marriage.data),
      co_brw:  checkListComplete(state.LOANNormal.storage.full.data?.form?.cic_form?.current_credit_institution?.co_brw?.data),
      co_payer: checkListComplete(state.LOANNormal.storage.full.data?.form?.cic_form?.current_credit_institution?.co_payer?.data),
      law_rlt: checkListComplete(state.LOANNormal.storage.full.data?.form?.cic_form?.current_credit_institution?.law_rlt?.data),
      others: checkListComplete(state.LOANNormal.storage.full.data?.form?.cic_form?.current_credit_institution?.others?.data),
    }
  }
}

export const getAttachmentCountCIC = (organ : string) => (state: RootState) => {

  
  const countAttachFiles = (data:ILOANNormalStorageCICDocumentList[], identity: string)=>{
    let count = 0;
    data.forEach(parentDoc =>{
      parentDoc.document_list.forEach(doc=>{
        count += doc?.document_child_files?.filter(file => file.custom_keys?.identity === identity)?.length ?? 0;
      })
    })
    return count;
  }

  const newData : ICICDeclareAttachmentCount= {
    borrower : [],
    marriage : [],
    co_brw : [],
    co_payer: [],
    law_rlt: [],
    other: [], 
  };
  if(organ === "scb"){
    ['borrower', 'marriage', 'co-brw', 'co-payer', 'law-rlt', 'other'].forEach(declare => {
      const convertDeclaretoKey = declare.replace("-","_")
      state.LOANNormal.storage.cic.scb.data[declare]?.data?.forEach(person => {
        newData[convertDeclaretoKey as keyof ICICDeclareAttachmentCount].push({
          uuid: person.person_uuid,
          count: countAttachFiles(person.document_info_list, person.identityActive)
        })
      })
    })
  }
  else if (organ === "other") {
    ['borrower', 'marriage', 'co-brw', 'co-payer', 'law-rlt', 'other'].forEach(declare => {
      const convertDeclaretoKey = declare.replace("-","_")
      state.LOANNormal.storage.cic.other.data[declare]?.data?.forEach(person => {
        newData[convertDeclaretoKey as keyof ICICDeclareAttachmentCount].push({
          uuid: person.person_uuid,
          count: countAttachFiles(person.document_info_list, person.identityActive)
        })
      })
    })
  }
  
  return newData
  //other 
 

}

export const checkHasSavedCreditCIC = (position: ILOANNormalAllCreditDeleteInfo) => (state: RootState) => {
  const { organ, declare,personUuid,identityNum} = position

  return state.LOANNormal.storage.cic[organ]?.data[declare]?.data?.find(per => per.person_uuid === personUuid)?.data?.find(iden => iden.uuid === identityNum)?.credit?.some(cre => !cre.uuid.includes(PREFIX_LOCAL)) ?? false

}

