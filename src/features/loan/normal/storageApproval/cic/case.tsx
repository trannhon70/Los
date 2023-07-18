import { Draft, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { ILOANNormalState } from "types/models/loan/normal";
import {
  ICardAgreementPosition,
  ICardPosition,
  ICICAdditionalObjectAPI,
  ICICDataAPI,
  ICICMainObjectAPI,
  ICICMainObjectAPIMulti,
  ICICMainObjectAPISingle,
  ICICSummaryAPI,
  ILOANNormalApprovalStorageCICState,
  ILOANNormalApprovalStorageCICStateValidate,
  INormalAgreementDeletePosition,
  INormalAgreementPosition, INormalAgreementSwitchPosition, IObjectCICState,
  IObjectCICStateData, IPersonDetail
} from 'types/models/loan/normal/storageApproval/CIC';
import { exportEmptyCICInfoDetail, generateEmptyCreditScore, generateEmptyEvaluate, generateEmptyState, generateNewNormalAgreement } from "./generateEmptyCIC";
import { mappingDocumentCIC } from "./handleData";

const summaryKey = ['borrower', 'marriage' ,'co_brw', 'co_payer', 'law_rlt', 'others']
const mainGroupKey =  ['borrower', 'marriage' ,'co_brw', 'co_payer']
const additionalGroupKey = ['law_rlt', 'others']

const extractPersonDetail = (apiDetail: IPersonDetail) => ({
  ...apiDetail,
  flexcube_day: apiDetail.flexcube_day === null ? apiDetail.flexcube_day : (apiDetail.flexcube_day ?? 0)*1000,
  cic_information: apiDetail?.cic_information?.map(cic => ({
    ...cic,
    cic_information_detail: {
      ...cic?.cic_information_detail,
      cic_normal_loan: {
        ...cic?.cic_information_detail?.cic_normal_loan,
        institution: cic?.cic_information_detail?.cic_normal_loan?.institution?.map(inst => ({
          ...inst,
          institution_detail : inst?.institution_detail?.map(child => ({
            ...child,
            credit_agreement: child?.credit_agreement?.map(agree => ({
              ...agree,
              isEdit: false
            }))
          }))
        })),
        date_of_latest_CIC_results: cic?.cic_information_detail?.cic_normal_loan?.institution?.some(int => int.institution_detail.length > 0) ? cic?.cic_information_detail?.cic_normal_loan.date_of_latest_CIC_results : null,
      },
      cic_credit: {
        ...cic?.cic_information_detail?.cic_credit,
        credit_card_obligations: cic?.cic_information_detail?.cic_credit?.credit_card_obligations ?? 0,
        highest_outstanding_balance_last_12_months: {
          ...cic?.cic_information_detail?.cic_credit?.highest_outstanding_balance_last_12_months,
          credit_grant_amount: cic?.cic_information_detail?.cic_credit?.highest_outstanding_balance_last_12_months?.credit_grant_amount ?? 0,
        },
        institution: cic?.cic_information_detail?.cic_credit?.institution?.map(inst => ({
          ...inst,
          institution_detail: inst?.institution_detail?.map(child => ({
            ...child,
          }))
        })),
        date_of_latest_CIC_results: cic?.cic_information_detail?.cic_credit?.institution?.some(int => int.institution_detail.length > 0) ? cic?.cic_information_detail?.cic_credit?.date_of_latest_CIC_results : null,
      }
    }
  })),
});

export const CICCase = { 
  getInfoFromLegalToCIC(state: Draft<ILOANNormalState>) {
    const legal = state.storage.full.data?.form.legal_info_form.data
    summaryKey.forEach(key => {
      switch (key) {
        case 'borrower':
          if(legal?.borrower !== null){
            state.storageApproval.cic.main.data['borrower'] = {
              ...state.storageApproval.cic.main.data['borrower'],
              position: legal?.borrower?.basic_info?.uuid ?? "",
              data: [{
                documentList: [],
                detail: {
                  full_name: legal?.borrower?.basic_info?.full_name ?? "",
                  person_uuid: legal?.borrower?.basic_info?.uuid ?? "",
                  total_loan: 0,
                  total_collateral:0,
                  debit_group_highest: "",
                  flexcube_day: null,
                  cic_information: legal?.borrower?.identity_info.map(iden => ({
                    cic_information_id: iden?.id ?? "",
                    cic_information_name: iden?.identity_type?.code?? "",
                    cic_information_code: iden?.identity_num ?? "",
                    debit_group_highest:"",
                    uuid: iden?.uuid ?? "",
                    cic_information_detail: exportEmptyCICInfoDetail(),
                    credit_score_infor : generateEmptyCreditScore()
                  })) ?? [],
                  evaluate: generateEmptyEvaluate()
                }
              }]
            }

            state.storageApproval.cic.summary.info['borrower'] = {...state.storageApproval.cic.main.data['borrower']}
          }
          break;
        case 'marriage':
          if(legal?.marriage !== null){
            state.storageApproval.cic.main.data['marriage'] = {
              ...state.storageApproval.cic.main.data['marriage'],
              position: legal?.marriage?.basic_info?.uuid ?? "",
              data: [{
                documentList: [],
                detail: {
                  full_name: legal?.marriage?.basic_info?.full_name ?? "",
                  person_uuid: legal?.marriage?.basic_info?.uuid ?? "",
                  total_loan: 0,
                  total_collateral:0,
                  debit_group_highest: "",
                  flexcube_day: null,
                  cic_information: legal?.marriage?.identity_info.map(iden => ({
                    cic_information_id: iden?.id ?? "",
                    cic_information_name: iden?.identity_type?.code?? "",
                    cic_information_code: iden?.identity_num ?? "",
                    debit_group_highest:"",
                    uuid: iden?.uuid ?? "",
                    cic_information_detail: exportEmptyCICInfoDetail(),
                    credit_score_infor : generateEmptyCreditScore()
                  })) ?? [],
                  evaluate: generateEmptyEvaluate()
                }
              }]
            }
            state.storageApproval.cic.summary.info['marriage'] = {...state.storageApproval.cic.main.data['marriage']}
          }
          break;
        case 'co_brw':
          if(legal?.co_brw && legal.co_brw.length > 0){
            state.storageApproval.cic.main.data['co_brw'] = {
              ...state.storageApproval.cic.main.data['co_brw'],
              position: legal?.co_brw[0]?.basic_info?.uuid ?? "",
              data: legal?.co_brw?.map(person => (
                {
                  documentList: [],
                  detail: {
                    full_name: person?.basic_info?.full_name ?? "",
                    person_uuid: person?.basic_info?.uuid ?? "",
                    total_loan: 0,
                    total_collateral:0,
                    debit_group_highest: "",
                    flexcube_day: null,
                    cic_information: person?.identity_info?.map(iden => ({
                      cic_information_id: iden?.id ?? "",
                      cic_information_name: iden?.identity_type?.code?? "",
                      cic_information_code: iden?.identity_num ?? "",
                      debit_group_highest:"",
                      uuid: iden?.uuid ?? "",
                      cic_information_detail: exportEmptyCICInfoDetail(),
                      credit_score_infor : generateEmptyCreditScore()
                    })) ?? [],
                    evaluate: generateEmptyEvaluate()
                  }
                }
              )) ?? []
            }
            state.storageApproval.cic.summary.info['co_brw'] = {...state.storageApproval.cic.main.data['co_brw']}

          }
        break;
        case 'co_payer':
          if(legal?.co_payer && legal.co_payer.length > 0){
            state.storageApproval.cic.main.data['co_payer'] = {
              ...state.storageApproval.cic.main.data['co_payer'],
              position: legal?.co_payer[0]?.basic_info?.uuid ?? "",
              data: legal?.co_payer?.map(person => (
                {
                  documentList: [],
                  detail: {
                    full_name: person?.basic_info?.full_name ?? "",
                    person_uuid: person?.basic_info?.uuid ?? "",
                    total_loan: 0,
                    total_collateral:0,
                    debit_group_highest: "",
                    flexcube_day: null,
                    cic_information: person?.identity_info?.map(iden => ({
                      cic_information_id: iden?.id ?? "",
                      cic_information_name: iden?.identity_type?.code?? "",
                      cic_information_code: iden?.identity_num ?? "",
                      debit_group_highest:"",
                      uuid: iden?.uuid ?? "",
                      cic_information_detail: exportEmptyCICInfoDetail(),
                      credit_score_infor : generateEmptyCreditScore()
                    })) ?? [],
                    evaluate: generateEmptyEvaluate()
                  }
                }
              )) ?? []
            }
            state.storageApproval.cic.summary.info['co_payer'] = {...state.storageApproval.cic.main.data['co_payer']}

          }
        break;
        case 'law_rlt':
          if(legal?.law_rlt && legal.law_rlt.length > 0){
            state.storageApproval.cic.additional.data['law_rlt'] = {
              ...state.storageApproval.cic.additional.data['law_rlt'],
              position: legal?.law_rlt[0]?.basic_info?.uuid ?? "",
              data: legal?.law_rlt?.map(person => (
                {
                  documentList: [],
                  detail: {
                    full_name: person?.basic_info?.full_name ?? "",
                    person_uuid: person?.basic_info?.uuid ?? "",
                    total_loan: 0,
                    total_collateral:0,
                    debit_group_highest: "",
                    flexcube_day: null,
                    cic_information: [{
                      cic_information_id: person.identity_info.id ?? "",
                      cic_information_name: person.identity_info.identity_type?.code?? "",
                      cic_information_code: person.identity_info.identity_num ?? "",
                      debit_group_highest:"",
                      uuid: person.identity_info.uuid ?? "",
                      cic_information_detail: exportEmptyCICInfoDetail(),
                      credit_score_infor : generateEmptyCreditScore()
                    }],
                    evaluate: generateEmptyEvaluate()
                  }
                }
              )) ?? []
            }
            state.storageApproval.cic.summary.info['law_rlt'] = {...state.storageApproval.cic.additional.data['law_rlt']}

          }
        break;
        case 'others':
          if(legal?.others && legal.others.length > 0){
            state.storageApproval.cic.additional.data['others'] = {
              ...state.storageApproval.cic.additional.data['others'],
              position: legal?.others[0]?.basic_info?.uuid ?? "",
              data: legal?.others?.map(person => (
                {
                  documentList: [],
                  detail: {
                    full_name: person?.basic_info?.full_name ?? "",
                    person_uuid: person?.basic_info?.uuid ?? "",
                    total_loan: 0,
                    total_collateral:0,
                    debit_group_highest: "",
                    flexcube_day: null,
                    cic_information: person?.identity_info?.map(iden => ({
                      cic_information_id: iden?.id ?? "",
                      cic_information_name: iden?.identity_type?.code?? "",
                      cic_information_code: iden?.identity_num ?? "",
                      debit_group_highest:"",
                      uuid: iden?.uuid ?? "",
                      cic_information_detail: exportEmptyCICInfoDetail(),
                      credit_score_infor : generateEmptyCreditScore()
                    })) ?? [],
                    evaluate: generateEmptyEvaluate()
                  }
                }
              )) ?? []
            }
            state.storageApproval.cic.summary.info['others'] = {...state.storageApproval.cic.additional.data['others']}

          }
        break;
        default:
          break;
      }
    })
  },
  updateAPIStorageApprovalCIC : {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<ICICDataAPI, string, string>) {
      const ExtractPersonData = (Keys : string[], object: 'main' | 'additional' | 'summary') => {
        let newObjectData : IObjectCICStateData = {};

        if(object === 'summary') {
          Keys.forEach(key => {
            if (key === 'borrower' || key === 'marriage') {
              const groupAPI = action.payload.summary_of_ratings.credit_core_info[key] as unknown as ICICMainObjectAPISingle    
              if (!groupAPI) {
                return 
              }
              // newObjectData[key as keyof IObjectCICStateData] = {
              //   ...state.storageApproval.cic[object].info[key as keyof IObjectCICStateData],
              //   totalAmount : groupAPI?.person_total_amount ?? 0,
              //   position: groupAPI?.person_detail?.person_uuid ?? '',
              //   data: [{
              //     ...state.storageApproval.cic[object].info[key as keyof IObjectCICStateData]?.data,
              //     documentList: mappingDocumentCIC(groupAPI?.document_info_list),
              //     detail: extractPersonDetail(groupAPI?.person_detail)
              //   }]
              // }
              const currentData = state.storageApproval.cic[object].info[key as keyof IObjectCICStateData]?.data
              const newPersonData = extractPersonDetail(groupAPI?.person_detail)
              newObjectData[key as keyof IObjectCICStateData] = {
                ...state.storageApproval.cic[object].info[key as keyof IObjectCICStateData],
                totalAmount : groupAPI?.person_total_amount ?? 0,
                position: groupAPI?.person_detail?.person_uuid ?? '',
                data: currentData?.length > 0 ? [{
                  documentList: mappingDocumentCIC(groupAPI?.document_info_list) ,
                  detail: {
                    ...newPersonData,
                    cic_information: currentData[0]?.detail?.cic_information?.map(cic => {
                      const newCIC = newPersonData?.cic_information?.find(newCIC => newCIC.uuid === cic.uuid)
                      if(newCIC) return {...newCIC}
                      else return {...cic}
                    })
                  }
                }] : currentData
              }
            }
            else {
              const groupAPI = action.payload.summary_of_ratings.credit_core_info[key] as unknown as  ICICMainObjectAPIMulti 
                if (!groupAPI || groupAPI.person_data.length === 0) {
                  return 
                }
                //   newObjectData[key as keyof IObjectCICStateData] = {
                // ...state.storageApproval.cic[object].info[key as keyof IObjectCICStateData],
                // totalAmount : groupAPI?.person_total_amount ?? 0,
                // position: state.storageApproval.cic[object].info[key as keyof IObjectCICStateData]?.position !== '' 
                //   ? state.storageApproval.cic[object].info[key as keyof IObjectCICStateData]?.position :  groupAPI.person_data[0]?.person_detail?.person_uuid,
                // data: groupAPI?.person_data.map(person => ({
                //   documentList: mappingDocumentCIC(person?.document_info_list), 
                //   detail: extractPersonDetail(person?.person_detail)
                //   }))
                // } 
                newObjectData[key as keyof IObjectCICStateData] = {
                  ...state.storageApproval.cic[object].info[key as keyof IObjectCICStateData],
                  totalAmount : groupAPI?.person_total_amount ?? 0,
                  position: state.storageApproval.cic[object].info[key as keyof IObjectCICStateData]?.position !== '' 
                    ? state.storageApproval.cic[object].info[key as keyof IObjectCICStateData]?.position :  groupAPI.person_data[0]?.person_detail?.person_uuid,
                  data: state.storageApproval.cic[object].info[key as keyof IObjectCICStateData]?.data?.map(person => {
                    const newPerson = groupAPI.person_data?.find(newPerson => newPerson.person_detail.person_uuid === person.detail.person_uuid)
                    
                    if(newPerson) {
                      const currentDetail = person.detail
                      const newDetail = extractPersonDetail(newPerson?.person_detail)
                      return {
                        documentList: mappingDocumentCIC(newPerson?.document_info_list), 
                        detail: {
                          ...newDetail,
                          cic_information: currentDetail?.cic_information?.map(cic => {
                            const newCIC = newDetail?.cic_information?.find(newCIC => newCIC.uuid === cic.uuid)
                            if(newCIC) return {...newCIC}
                            else return {...cic}
                          })
                        }
                      }
                    }
                    else return {...person}
                   })
                  } 
              }
          })
        }
        else{
          Keys.forEach(key => {
            if (key === 'borrower' || key === 'marriage') {
              const groupAPI = action.payload.main_search_objects[key as keyof Omit<ICICMainObjectAPI, 'main_object_total_amount'>] as ICICMainObjectAPISingle    
              if (!groupAPI) {
                return 
              }
              const currentData = state.storageApproval.cic[object].data[key as keyof IObjectCICStateData]?.data
              const newPersonData = extractPersonDetail(groupAPI?.person_detail)
              newObjectData[key as keyof IObjectCICStateData] = {
                ...state.storageApproval.cic[object].data[key as keyof IObjectCICStateData],
                totalAmount : groupAPI?.person_total_amount ?? 0,
                position: groupAPI?.person_detail?.person_uuid ?? '',
                data: currentData?.length > 0 ? [{
                  documentList: mappingDocumentCIC(groupAPI?.document_info_list) ,
                  detail: {
                    ...newPersonData,
                    cic_information: currentData[0]?.detail?.cic_information?.map(cic => {
                      const newCIC = newPersonData?.cic_information?.find(newCIC => newCIC.uuid === cic.uuid)
                      if(newCIC) return {...newCIC}
                      else return {...cic}
                    })
                  }
                }] : currentData
              }
            }
            else {
              const groupAPI = object === 'main' ? action.payload.main_search_objects[key as keyof Omit<ICICMainObjectAPI, 'main_object_total_amount'>] as unknown as ICICMainObjectAPIMulti    
                  : action.payload.additional_lookup_objects[key as keyof Omit<ICICAdditionalObjectAPI,'additional_lookup_objects_total'>] as unknown as ICICMainObjectAPIMulti 
                  if (!groupAPI) {
                    return 
                  }
                  newObjectData[key as keyof IObjectCICStateData] = {
                ...state.storageApproval.cic[object].data[key as keyof IObjectCICStateData],
                totalAmount : groupAPI?.person_total_amount ?? 0,
                position: state.storageApproval.cic[object].data[key as keyof IObjectCICStateData].position !== '' 
                  ? state.storageApproval.cic[object].data[key as keyof IObjectCICStateData].position :  groupAPI.person_data[0]?.person_detail?.person_uuid,
                data: state.storageApproval.cic[object].data[key as keyof IObjectCICStateData].data?.map(person => {
                  const newPerson = groupAPI.person_data?.find(newPerson => newPerson.person_detail.person_uuid === person.detail.person_uuid)
                  
                  if(newPerson) {
                    const currentDetail = person.detail
                    const newDetail = extractPersonDetail(newPerson?.person_detail)
                    return {
                      documentList: mappingDocumentCIC(newPerson?.document_info_list), 
                      detail: {
                        ...newDetail,
                        cic_information: currentDetail?.cic_information?.map(cic => {
                          const newCIC = newDetail?.cic_information?.find(newCIC => newCIC.uuid === cic.uuid)
                          if(newCIC) return {...newCIC}
                          else return {...cic}
                        })
                      }
                    }
                  }
                  else return {...person}
                 })
                } 
              }
          })
        }
        return newObjectData
      }

      const newMainTotalAmount = action.payload.main_search_objects?.main_object_total_amount ?? 0
      
      const newMainObjectData : IObjectCICStateData = ExtractPersonData(mainGroupKey, 'main')
      const newAditionalTotalAmount = action.payload.additional_lookup_objects?.additional_lookup_objects_total ?? 0
      const newAdditionalObjectData: IObjectCICStateData = ExtractPersonData(additionalGroupKey, 'additional')
      const newSummary : IObjectCICStateData = ExtractPersonData(summaryKey, 'summary')
      state.storageApproval.cic = {
        ...state.storageApproval.cic,
        main: {
          ...state.storageApproval.cic.main,
          totalAmount: newMainTotalAmount,
          data: {
            ...state.storageApproval.cic.main.data,
            ...newMainObjectData
          }
          },
        additional: {
          ...state.storageApproval.cic.additional,
          totalAmount: newAditionalTotalAmount,
          data: {
            ...state.storageApproval.cic.additional.data,
            ...newAdditionalObjectData
          }
        },
        summary: {
          ...state.storageApproval.cic.summary,
          info : {
            ...state.storageApproval.cic.summary.info,
            ...newSummary
          },
          groupActive: Object.keys(newSummary)[0] ?? ''
        }
      }
    },
     
    prepare(payload: ICICDataAPI, meta: string) {
      return { payload, meta };
    }
  },
  clearStorageApprovalCIC(state: Draft<ILOANNormalState>){
    state.storageApproval.cic = {...generateEmptyState()}
  },
  updateApprovalCICSummaryResponseSave: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<ICICSummaryAPI>) {
      const ExtractPersonData = (Keys : string[]) => {
        let newObjectData : IObjectCICStateData = {};

          // Keys.forEach(key => {
          //   if (key === 'borrower' || key === 'marriage') {
          //     const groupAPI = action.payload.credit_core_info[key] as unknown as ICICMainObjectAPISingle    
          //     if (!groupAPI) {
          //       return 
          //     }
          //     newObjectData[key as keyof IObjectCICStateData] = {
          //       ...state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData],
          //       totalAmount : groupAPI?.person_total_amount ?? 0,
          //       position: groupAPI?.person_detail?.person_uuid ?? '',
          //       data: [{
          //         ...state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData]?.data,
          //         documentList: mappingDocumentCIC(groupAPI?.document_info_list),
          //         detail: extractPersonDetail(groupAPI?.person_detail)
          //       }]
          //     }
          //   }
          //   else {
          //     const groupAPI = action.payload.credit_core_info[key] as unknown as  ICICMainObjectAPIMulti 
          //       if (!groupAPI || groupAPI.person_data.length === 0) {
          //         return 
          //       }
          //         newObjectData[key as keyof IObjectCICStateData] = {
          //       ...state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData],
          //       totalAmount : groupAPI?.person_total_amount ?? 0,
          //       position: state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData]?.position !== '' 
          //         ? state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData]?.position :  groupAPI.person_data[0]?.person_detail?.person_uuid,
          //       data: groupAPI?.person_data.map(person => ({
          //         documentList: mappingDocumentCIC(person?.document_info_list), 
          //         detail: extractPersonDetail(person?.person_detail)
          //         }))
          //       } 
          //     }
          // })
          Keys.forEach(key => {
            if (key === 'borrower' || key === 'marriage') {
              const groupAPI = action.payload.credit_core_info[key] as unknown as ICICMainObjectAPISingle    
              if (!groupAPI) {
                return 
              }
              const currentData = state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData]?.data
              const newPersonData = extractPersonDetail(groupAPI?.person_detail)
              newObjectData[key as keyof IObjectCICStateData] = {
                ...state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData],
                totalAmount : groupAPI?.person_total_amount ?? 0,
                position: groupAPI?.person_detail?.person_uuid ?? '',
                data: currentData?.length > 0 ? [{
                  documentList: mappingDocumentCIC(groupAPI?.document_info_list) ,
                  detail: {
                    ...newPersonData,
                    cic_information: currentData[0]?.detail?.cic_information?.map(cic => {
                      const newCIC = newPersonData?.cic_information?.find(newCIC => newCIC.uuid === cic.uuid)
                      if(newCIC) return {...newCIC}
                      else return {...cic}
                    })
                  }
                }] : currentData
              }
            }
            else {
              const groupAPI = action.payload.credit_core_info[key] as unknown as  ICICMainObjectAPIMulti 
                if (!groupAPI || groupAPI.person_data.length === 0) {
                  return 
                }
                newObjectData[key as keyof IObjectCICStateData] = {
                  ...state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData],
                  totalAmount : groupAPI?.person_total_amount ?? 0,
                  position: state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData]?.position !== '' 
                    ? state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData]?.position :  groupAPI.person_data[0]?.person_detail?.person_uuid,
                  data: state.storageApproval.cic.summary.info[key as keyof IObjectCICStateData]?.data?.map(person => {
                    const newPerson = groupAPI.person_data?.find(newPerson => newPerson.person_detail.person_uuid === person.detail.person_uuid)
                    
                    if(newPerson) {
                      const currentDetail = person.detail
                      const newDetail = extractPersonDetail(newPerson?.person_detail)
                      return {
                        documentList: mappingDocumentCIC(newPerson?.document_info_list), 
                        detail: {
                          ...newDetail,
                          cic_information: currentDetail?.cic_information?.map(cic => {
                            const newCIC = newDetail?.cic_information?.find(newCIC => newCIC.uuid === cic.uuid)
                            if(newCIC) return {...newCIC}
                            else return {...cic}
                          })
                        }
                      }
                    }
                    else return {...person}
                   })
                  } 
              }
          })
        return newObjectData
      }
      const summaryKey = ['borrower', 'marriage' ,'co_brw', 'co_payer', 'law_rlt', 'others']
      const newSummary : IObjectCICStateData = ExtractPersonData(summaryKey)
      
      if(state.storageApproval.full.data){
        state.storageApproval.full.data.form.cic_form.summary_of_ratings = action.payload
      }
      state.storageApproval.cic = {
        ...state.storageApproval.cic,
        summary: {
          ...state.storageApproval.cic.summary,
          info : {
            ...state.storageApproval.cic.summary.info,
            ...newSummary
          },
          groupActive: Object.keys(newSummary)[0] ?? ''
        }
      }

    },
    prepare(payload: ICICSummaryAPI) {
      return { payload };
    }
  },

  updateApprovalCICresponseSave: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<ICICMainObjectAPISingle>) {
      const personUUID = action.payload.person_detail.person_uuid
      const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
      const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
      const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
      const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
      const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson);
      if(activeObjectKey === 'main') {
        switch (groupActiveKey) {
          case 'borrower':
            if(state.storageApproval.full.data){ 
              state.storageApproval.full.data.form.cic_form.main_search_objects.borrower = {...action.payload}
            }
            state.storageApproval.cic.main.data['borrower'].data[0].detail = extractPersonDetail(action.payload.person_detail)
            state.storageApproval.cic.main.data['borrower'].data[0].documentList = mappingDocumentCIC([...action.payload.document_info_list])
            break;
          case 'marriage':
            if(state.storageApproval.full.data){
              state.storageApproval.full.data.form.cic_form.main_search_objects.marriage = {...action.payload}
            }
            state.storageApproval.cic.main.data['marriage'].data[0].detail = extractPersonDetail(action.payload.person_detail)
            state.storageApproval.cic.main.data['marriage'].data[0].documentList = mappingDocumentCIC([...action.payload.document_info_list])
          break;
          case 'co_brw':
            if(state.storageApproval.full.data){
              const personIndex = state.storageApproval.full.data.form.cic_form.main_search_objects.co_brw.person_data.findIndex(e => e.person_detail.person_uuid === personUUID)
              if(personIndex !== -1){
                state.storageApproval.full.data.form.cic_form.main_search_objects.co_brw.person_data[personIndex] = {..._.omit(action.payload, 'person_total_amount')}
              }
            }
            state.storageApproval.cic.main.data['co_brw'].data[activePersonIndex].detail = extractPersonDetail(action.payload.person_detail)
            state.storageApproval.cic.main.data['co_brw'].data[activePersonIndex].documentList = mappingDocumentCIC([...action.payload.document_info_list])
          break;
          case 'co_payer':
            if(state.storageApproval.full.data){
              const personIndex = state.storageApproval.full.data.form.cic_form.main_search_objects.co_payer.person_data.findIndex(e => e.person_detail.person_uuid === personUUID)
              if(personIndex !== -1){
                state.storageApproval.full.data.form.cic_form.main_search_objects.co_payer.person_data[personIndex] = {..._.omit(action.payload, 'person_total_amount')}
              }
            }
            state.storageApproval.cic.main.data['co_payer'].data[activePersonIndex].detail = extractPersonDetail(action.payload.person_detail)
            state.storageApproval.cic.main.data['co_payer'].data[activePersonIndex].documentList = mappingDocumentCIC([...action.payload.document_info_list])
            
          break;

          default:
            break;
        }
     }
     else if(activeObjectKey === 'additional') {
      switch (groupActiveKey) {
        case 'law_rlt':
          if(state.storageApproval.full.data){
            const personIndex = state.storageApproval.full.data.form.cic_form.additional_lookup_objects.law_rlt.person_data.findIndex(e => e.person_detail.person_uuid === personUUID)
            if(personIndex !== -1){
              state.storageApproval.full.data.form.cic_form.additional_lookup_objects.law_rlt.person_data[personIndex] = {..._.omit(action.payload, 'person_total_amount')}
            }
          }
          state.storageApproval.cic.additional.data['law_rlt'].data[activePersonIndex].detail = extractPersonDetail(action.payload.person_detail)
            state.storageApproval.cic.additional.data['law_rlt'].data[activePersonIndex].documentList = mappingDocumentCIC([...action.payload.document_info_list])
          break;
        case 'others':
          if(state.storageApproval.full.data){
            const personIndex = state.storageApproval.full.data.form.cic_form.additional_lookup_objects.others.person_data.findIndex(e => e.person_detail.person_uuid === personUUID)
            if(personIndex !== -1){
              state.storageApproval.full.data.form.cic_form.additional_lookup_objects.others.person_data[personIndex] = {..._.omit(action.payload, 'person_total_amount')}
            }
          }
          state.storageApproval.cic.additional.data['others'].data[activePersonIndex].detail = extractPersonDetail(action.payload.person_detail)
          state.storageApproval.cic.additional.data['others'].data[activePersonIndex].documentList = mappingDocumentCIC([...action.payload.document_info_list])
          break;
        default:
          break;
      }
     }
    },
    prepare(payload: ICICMainObjectAPISingle) {
      return { payload };
    }
  },
  setObjectActive(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.storageApproval.cic.activeObject = action.payload
  },

  setGroupActive(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    (state.storageApproval.cic[activeObjectKey] as IObjectCICState).groupActive = action.payload
  },

  setPersonActivePosition(state: Draft<ILOANNormalState>, action: PayloadAction<number>) {
    if(action.payload < 0 ) return ;
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData

    (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position = 
      (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data[action.payload].detail.person_uuid
  },
  updateNormalAgreementSwitchContent(state: Draft<ILOANNormalState>, action: PayloadAction<INormalAgreementSwitchPosition>){
    const { cic, inst, child, agree, value} = action.payload
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson);
    
    const cicIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey]?.data[activePersonIndex]?.detail?.cic_information?.findIndex(curCic => curCic.uuid === cic);
    const instIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution?.findIndex(curInst => curInst.institution_id === inst);
    const childIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail
      ?.findIndex(curChild => curChild.institution_detail_id === child);
     const agreeIndex =  (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
     .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail[childIndex]?.credit_agreement?.findIndex(curAgree => curAgree.uuid === agree);

     if(cicIndex !== -1 && instIndex !== -1 && childIndex !== -1 && agreeIndex !== -1) {
      (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
        .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement[agreeIndex].settlement_before_disbursement = value
     }
    
  },
  updateNormalAgreementContent(state: Draft<ILOANNormalState>, action: PayloadAction<INormalAgreementPosition>) {
    const { cic, inst, child, agree, field, value, isEdit} = action.payload
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson)

    const cicIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey]?.data[activePersonIndex]?.detail?.cic_information?.findIndex(curCic => curCic.uuid === cic);
    const instIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution?.findIndex(curInst => curInst.institution_id === inst);
    const childIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail
      ?.findIndex(curChild => curChild.institution_detail_id === child);
     const agreeIndex =  (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
     .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail[childIndex]?.credit_agreement?.findIndex(curAgree => curAgree.uuid === agree);
     
     if(cicIndex !== -1 && instIndex !== -1 && childIndex !== -1 && agreeIndex !== -1) {
     if(field ===  'credit_grant_amount' || field === 'actual_balance_converted' || field === "collateral_value" || field === "monthly_debt_payment_obligation"){
      ((state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
        .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement[agreeIndex][field] as Number) = Number(value)
     }
     else if(field === "monthly_loan_term" || field === "group_debt" || field === "collateral_id"){
      ((state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
        .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement[agreeIndex][field] as String) = value ?? ''
     }
     else if (field === "isEdit" || field === "settlement_before_disbursement"){
      ((state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
        .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement[agreeIndex][field] as Boolean) = isEdit ?? false
     }
      
    }
  },

  updateCardAgreementContent(state: Draft<ILOANNormalState>, action: PayloadAction<ICardAgreementPosition>) {
    const { cic, inst, child, field, value} = action.payload
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)?.data[groupActiveKey]?.position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)?.data[groupActiveKey]?.data?.findIndex(per => per.detail.person_uuid === activePerson)
    
    const cicIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey]?.data[activePersonIndex]?.detail?.cic_information?.findIndex(curCic => curCic.uuid === cic);
    const instIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_credit?.institution?.findIndex(curInst => curInst.institution_id === inst);
    const childIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_credit?.institution[instIndex]?.institution_detail
      ?.findIndex(curChild => curChild.institution_detail_id === child);
      
    if(cicIndex !== -1 && instIndex !== -1 && childIndex !== -1) {
      // if (field === "credit_card_obligations") {
      //   (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      //   .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
      //     .cic_information_detail.cic_credit.institution[instIndex].institution_detail[childIndex].credit_card_obligations = Number(value ?? '')
      // }
      // else if (field === "note") {
      //   ((state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      //   .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
      //     .cic_information_detail.cic_credit.institution[instIndex].institution_detail[childIndex].note as String) = value ?? ''
      // }
      // else if (field === 'credit_grant_amount'){
      //   (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      //   .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
      //     .cic_information_detail.cic_credit.institution[instIndex].institution_detail[childIndex].highest_outstanding_balance_last_12_months.credit_grant_amount = Number(value ?? '')
      // }
      if(field === 'monthly_loan_term'){
        (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
        .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
          .cic_information_detail.cic_credit.institution[instIndex].institution_detail[childIndex].monthly_loan_term = value ?? ""
      }
      if(field === 'collateral_name'){
        (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
        .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
          .cic_information_detail.cic_credit.institution[instIndex].institution_detail[childIndex].collateral_name = value ?? ""
      }
    }
  },
  updateCardInstitutionContent(state: Draft<ILOANNormalState>, action: PayloadAction<ICardPosition>) {
    const { cic, field, value} = action.payload
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)?.data[groupActiveKey]?.position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey]?.data?.findIndex(per => per.detail.person_uuid === activePerson)
    
    const cicIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey]?.data[activePersonIndex]?.detail?.cic_information?.findIndex(curCic => curCic.uuid === cic);
      
    if(cicIndex !== -1) {
      if (field === "credit_card_obligations") {
        (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
        .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
          .cic_information_detail.cic_credit.credit_card_obligations = Number(value ?? '')
      }
      else if (field === "note") {
        ((state.storageApproval.cic[activeObjectKey] as IObjectCICState)
        .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
          .cic_information_detail.cic_credit.note as String) = value ?? ''
      }
      else if (field === 'credit_grant_amount'){
        (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
        .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
          .cic_information_detail.cic_credit.highest_outstanding_balance_last_12_months.credit_grant_amount = Number(value ?? '')
      }
      
    }
  },
  addNormalAgreement(state: Draft<ILOANNormalState>, action: PayloadAction<{cic: string, inst: string, child: string}>) {
    const { cic, inst, child } = action.payload
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson)

    const cicIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey]?.data[activePersonIndex]?.detail?.cic_information?.findIndex(curCic => curCic.uuid === cic);
    const instIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution?.findIndex(curInst => curInst.institution_id === inst);
    const childIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail
      ?.findIndex(curChild => curChild.institution_detail_id === child);
    if(cicIndex !== -1 && instIndex !== -1 && childIndex !== -1) {
      const agreementListLength = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
        .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement?.length ?? 0 ;
      if (agreementListLength === 0) {
        (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
        .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement = [generateNewNormalAgreement(agreementListLength+1)]
      }
      else{
        (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
        .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
          .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement.push(generateNewNormalAgreement(agreementListLength+1))
      }
    }
  },

  deleteNormalAgreement(state: Draft<ILOANNormalState>, action: PayloadAction<{cic: string,inst: string, child: string, agree: string}>) {
    const { cic, inst, child, agree } = action.payload
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson);

    const cicIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey]?.data[activePersonIndex]?.detail?.cic_information?.findIndex(curCic => curCic.uuid === cic);
    const instIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution?.findIndex(curInst => curInst.institution_id === inst);
    const childIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail
      ?.findIndex(curChild => curChild.institution_detail_id === child);
     const agreeIndex =  (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
     .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail[childIndex]?.credit_agreement?.findIndex(curAgree => curAgree.uuid === agree);
    
     if(cicIndex !== -1 && instIndex !== -1 && childIndex !== -1 && agreeIndex !== -1) {
      (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
      .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement.splice(agreeIndex,1);

      (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
      .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey].data[activePersonIndex].detail.cic_information[cicIndex]
        .cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex].credit_agreement.map((agree, index) => ({
          ...agree,
          credit_agreement_name: `Hợp đồng tín dụng ${index + 1}`
        }))
    }    
  },

  deleteNormalAgreementStoreFull: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<INormalAgreementDeletePosition>) {
      const { cic, inst, child, agree } = action.payload
      const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
      const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
      const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
      const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson);
     
      const cicIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey]?.data[activePersonIndex]?.detail?.cic_information?.findIndex(curCic => curCic.uuid === cic);
    const instIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution?.findIndex(curInst => curInst.institution_id === inst);
    const childIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail
      ?.findIndex(curChild => curChild.institution_detail_id === child);
     const agreeIndex =  (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
     .data[groupActiveKey].data[activePersonIndex]?.detail?.cic_information[cicIndex]?.cic_information_detail?.cic_normal_loan?.institution[instIndex]?.institution_detail[childIndex]?.credit_agreement?.findIndex(curAgree => curAgree.uuid === agree);
     
     if(cicIndex !== -1 && instIndex !== -1 && childIndex !== -1 && agreeIndex !== -1) {
      if(activeObjectKey === 'main') {
          switch (groupActiveKey) {
            case 'borrower':
              if(state.storageApproval.full.data){
                state.storageApproval.full.data.form.cic_form.main_search_objects.borrower.person_detail
                  .cic_information[cicIndex].cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex]
                  .credit_agreement.splice(agreeIndex,1)
              }
              break;
            case 'marriage':
              if(state.storageApproval.full.data){
                state.storageApproval.full.data.form.cic_form.main_search_objects.marriage.person_detail
                  .cic_information[cicIndex].cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex]
                  .credit_agreement.splice(agreeIndex,1)
              }
            break;
            case 'co_brw':
              if(state.storageApproval.full.data){
                const personIndex = state.storageApproval.full.data.form.cic_form.main_search_objects.co_brw.person_data.findIndex(e => e.person_detail.person_uuid === activePerson)
                if(personIndex !== -1){
                  state.storageApproval.full.data.form.cic_form.main_search_objects.co_brw.person_data[personIndex].person_detail
                  .cic_information[cicIndex].cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex]
                  .credit_agreement.splice(agreeIndex,1)
                }
              }
            break;
            case 'co_payer':
              if(state.storageApproval.full.data){
                const personIndex = state.storageApproval.full.data.form.cic_form.main_search_objects.co_payer.person_data.findIndex(e => e.person_detail.person_uuid === activePerson)
                if(personIndex !== -1){
                  state.storageApproval.full.data.form.cic_form.main_search_objects.co_payer.person_data[personIndex].person_detail
                  .cic_information[cicIndex].cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex]
                  .credit_agreement.splice(agreeIndex,1)
                }
              }
            break;
            default:
              break;
          }
      }
      else if(activeObjectKey === 'additional') {
        switch (groupActiveKey) {
          case 'law_rlt':
            if(state.storageApproval.full.data){
              const personIndex = state.storageApproval.full.data.form.cic_form.additional_lookup_objects.law_rlt.person_data.findIndex(e => e.person_detail.person_uuid === activePerson)
              if(personIndex !== -1){
                state.storageApproval.full.data.form.cic_form.additional_lookup_objects.law_rlt.person_data[personIndex].person_detail
                .cic_information[cicIndex].cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex]
                .credit_agreement.splice(agreeIndex,1)
              }
            }
            break;
          case 'others':
            if(state.storageApproval.full.data){
              const personIndex = state.storageApproval.full.data.form.cic_form.additional_lookup_objects.others.person_data.findIndex(e => e.person_detail.person_uuid === activePerson)
              if(personIndex !== -1){
                state.storageApproval.full.data.form.cic_form.additional_lookup_objects.others.person_data[personIndex].person_detail
                .cic_information[cicIndex].cic_information_detail.cic_normal_loan.institution[instIndex].institution_detail[childIndex]
                .credit_agreement.splice(agreeIndex,1)
              }
            }
            break;
          default:
            break;
        }
      }
      }
    },
    prepare(payload: INormalAgreementDeletePosition) {
      return { payload };
    }
  },

  toggleEvaluateHistory(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson)

    if(action.payload !== ''){(state.storageApproval.cic[activeObjectKey] as IObjectCICState)
      .data[groupActiveKey].data[activePersonIndex].detail.evaluate.history_credit_relation_satisfy_product_rules = action.payload 
    }
  },

  updateEvaluateNote(state: Draft<ILOANNormalState>, action: PayloadAction<string, string>) {
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson);

      (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey].data[activePersonIndex].detail.evaluate.note = action.payload
    
  },

  saveApprovalCIC:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<boolean, string,{
      type: string;
      position? : INormalAgreementDeletePosition,
      dataPosition: string
    }>) { },
    prepare(payload: boolean, meta:{
      type: string;
      position? : INormalAgreementDeletePosition;
      dataPosition: string
    }){
      return { payload, meta };
    }
  },

  setAprrovalCICValidate(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalApprovalStorageCICStateValidate>) {
    state.storageApproval.cic.validate = action.payload;
  },

  setSummaryActivePerson(state: Draft<ILOANNormalState>, action: PayloadAction<{key: string, position: string}>) {
    const { key , position } = action.payload
    state.storageApproval.cic.summary.groupActive = key
    state.storageApproval.cic.summary.info[key].position = position
  },

  updateLatestDateUpdateCIC(state: Draft<ILOANNormalState>, action: PayloadAction<{loanType: 'normal' | 'card',cic: string, val: number | null}>) {
    const { loanType , cic, val } = action.payload
    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson);
    const cicIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState)
    .data[groupActiveKey]?.data[activePersonIndex]?.detail?.cic_information?.findIndex(curCic => curCic.uuid === cic);
    
    if(loanType === 'normal'){
      (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data[activePersonIndex].detail
      .cic_information[cicIndex].cic_information_detail.cic_normal_loan.date_of_latest_CIC_results = (val ?? 0) /1000 
    }
    else{
      (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data[activePersonIndex].detail
      .cic_information[cicIndex].cic_information_detail.cic_credit.date_of_latest_CIC_results = (val ?? 0)/1000 
    }
  },
  updateFlexcubeDateCIC(state: Draft<ILOANNormalState>, action: PayloadAction<number | null>) {

    const activeObjectKey = state.storageApproval.cic.activeObject as keyof ILOANNormalApprovalStorageCICState
    const activeGroup =  state.storageApproval.cic[activeObjectKey] as IObjectCICState
    const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData
    const activePerson = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].position; 
    const activePersonIndex = (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data.findIndex(per => per.detail.person_uuid === activePerson);
    
    (state.storageApproval.cic[activeObjectKey] as IObjectCICState).data[groupActiveKey].data[activePersonIndex].detail.flexcube_day = action.payload
  },
  getSummaryCIC(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {}
}