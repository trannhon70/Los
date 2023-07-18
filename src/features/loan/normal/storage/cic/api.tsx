import * as _ from 'lodash';
import { ILOANNormalConfigState } from 'types/models/loan/normal/configs';
import {
  ICICDocumentAPI,
  ICICDocumentChildFileAPI, ICICDocumentInfoAPI, ILOANNormalStorageCICDocumentList,
  ILOANNormalStorageCICOther,
  ILOANNormalStorageCICState
} from 'types/models/loan/normal/storage/CIC';
import { IMasterData } from 'types/models/master-data';
import { checkIncludePrefix, checkIsLocalUUID, formatPath } from 'utils';
import { apiDelete, apiGet, apiPatch, apiPost } from 'utils/api';
import { API_BASE_URL_S1 } from 'utils/constants';
import {
  checkEmptyCICCredit,
  checkEmptyCICCreditCard,
  checkEmptyCICCreditCardList,
  checkEmptyCICCreditCollateral,
  checkEmptyCICCreditCollateralList,
  checkEmptyCICCreditLOAN,
  checkEmptyCICCreditLOANList, findCode,
  removeFlag
} from 'views/pages/LOAN/utils';

export const saveCICAPI = (
  cicState: ILOANNormalStorageCICState,
  declaceExist: string[],
  los_uuid: string,
  master: IMasterData,
  configs: ILOANNormalConfigState,
  position: string
) => {
  const organActive = cicState.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = cicState[organActive]?.declareActive;
  const positionActive = cicState[organActive]?.data[declareActive]?.position;
  const identityActive = cicState[organActive]?.data[declareActive]?.data.find(
    (x) => x.person_uuid === positionActive
  )?.identityActive;

  let value = '';
  switch (declareActive) {
    case 'borrower':
      value = 'BORROWER';
      break;
    case 'marriage':
      value = 'MARRIAGE';
      break;
    case 'co-brw':
      value = 'CO_BRW';
      break;
    case 'co-payer':
      value = 'CO_PAYER';
      break;
    case 'law-rlt':
      value = 'LAW_RLT';
      break;
    case 'other':
      value = 'OTHER';
      break;
  }

  let credit_institution = '';
  switch (organActive) {
    case 'other':
      credit_institution = 'quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac';
      break;
    case 'scb':
      credit_institution = 'khoan-vay-hien-huu-tai-scb';
      break;
  }

  const {
    debtClassification: { data: debt },
    creditInstitution: { data: credit },
    typeTermLoan: { data: term },
    collateralType: { data: coll },
    customerSegment: { data: segment },
  } = master;

  const { documentType } = configs;

  const personUUID = positionActive;
  const getDocument = (listDoc: ILOANNormalStorageCICDocumentList[]) => {
    return listDoc?.filter(parentDoc=>!parentDoc.document_list?.every(doc=>(doc?.document_child_files?.filter(el=>!checkIncludePrefix(el.uuid))?.length ?? 0) === 0)).map((doc, index) => {
      const detailParentDoc = documentType[
        'LICH_SU_QUAN_HE_TIN_DUNG_LOAN'
      ]?.data?.find((a) => a.code === doc.document_type_code);
      return {
        display_order: doc.display_order,
        document_type_id:
          _.get(detailParentDoc, 'id', null) ?? doc.document_type_code,
        document_type_code:
          _.get(detailParentDoc, 'code') ?? doc.document_type_code,
        document_type_name: _.get(detailParentDoc, 'name', ''),
        document_list: doc.document_list?.filter(d=>d?.document_child_files?.filter(el=>!checkIncludePrefix(el.uuid))?.length > 0)?.map((d) => {
          const detailChildDoc = (detailParentDoc?.child_list ?? []).find((c) => Number(c.code) === Number(d.document_code));
          const documentFiles = d?.document_child_files?.filter(el=>!checkIncludePrefix(el.uuid)) ?? [];
          return {
            display_order: d.display_order,
            document_id: _.get(detailChildDoc, 'id', null) ?? +d.document_code,
            document_name: _.get(detailChildDoc, 'name', ''),
            document_child_files:documentFiles.map((c) => {
                return {
                  uuid: c.uuid,
                  content_type: c.content_type,
                  display_order: c.display_order,
                  name: c.name,
                  created_by: c.created_by,
                  created_by_name: c.created_by_name,
                  updated_by: c.updated_by,
                  updated_by_name: c.updated_by_name,
                  created_at: c.created_at,
                  updated_at: c.updated_at,
                  description: c.description ?? '',
                  custom_keys: c.custom_keys,
                } as ICICDocumentChildFileAPI;
              }),
            document_child_list:[],
          } as ICICDocumentAPI;
        }) as [] as ICICDocumentAPI[],
      } as ICICDocumentInfoAPI;
    }) as [] as ICICDocumentInfoAPI[];
  };

  const body = {
    full_name: cicState[organActive]?.data[declareActive]?.data?.find(
      (x) => x.person_uuid === positionActive
    )?.full_name,
    person_uuid: personUUID,
    cic_identity_info: cicState[organActive]?.data[declareActive]?.data?.find((x) => x.person_uuid === positionActive)
      ?.data?.map((iden) => {
        if((iden.credit && iden.credit.length > 0) || iden?.credit_score_info?.risk_info?.score_value !== null){
          return {
            cic_institution_flag: iden.hasCredit,
            identity_type: iden.identity_type,
            identity_num: iden.identity_num,
            uuid: checkIsLocalUUID(iden.uuid) ? null : iden.uuid,
            cic_identity_total_loan_amount: {
              value: iden?.credit
                ?.map((cr) => {
                  const loan =
                    cr.detail.loan.list
                      .map((l) => l.balance)
                      .reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0) ?? 0;
                  const card =
                    cr.detail.card.list
                      .map((c) => c.balance)
                      .reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0) ?? 0;
                  return loan + card;
                })
                .reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0),
            },
            cic_identity_total_collateral_amount: {
              value: iden?.credit
                ?.map((cr) => {
                  return (
                    cr.detail.collateral.list
                      .map((l) => l.value)
                      .reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0) ?? 0
                  );
                })
                .reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0),
            },
            cic_identity_debt_group: {
              id: removeFlag(findCode(debt, iden?.debtGroup))?.id,
              code: removeFlag(findCode(debt, iden?.debtGroup))?.code,
              name: removeFlag(findCode(debt, iden?.debtGroup))?.name,
            },
            cic_identity_credit_institution_info: iden?.credit
              ?.map((cr) => {
                if (checkEmptyCICCredit(cr)) return null;
                return {
                  uuid: checkIsLocalUUID(cr.uuid) ? null : cr.uuid,
                  credit_institution_avatar: 'avatar',
                  credit_institution_id: credit.find((_c) => _c.code === cr.code)
                    ?.id,
                  credit_institution_code: credit.find(
                    (_c) => _c.code === cr.code
                  )?.code,
                  credit_institution_name: credit.find(
                    (_c) => _c.code === cr.code
                  )?.name,
                  credit_institution_short_name: credit.find(
                    (_c) => _c.code === cr.code
                  )?.short_name,
                  cic_identity_detail_info: {
                    cic_credit_loan_info: {
                      cic_credit_loan_total_amount: {
                        id: null,
                        name: null,
                        // value: Number(cr.detail.loan.total_amount),
                        value: cr.detail.loan.list
                          .map((t) => t.balance)
                          .reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0),
                      },
                      cic_credit_loan_updated_date: checkEmptyCICCreditLOANList(
                        cr.detail.loan.list
                      )
                        ? null
                        : cr.detail.loan.date
                        ? (cr.detail.loan.date as number) / 1000
                        : (Date.now() / 1000) | 0,
                      cic_credit_loan_last_updated_date: new Date(),
                      cic_credit_loan_term_info: checkEmptyCICCreditLOANList(
                        cr.detail.loan.list
                      )
                        ? []
                        : cr.detail.loan.list
                            .filter((t) => !checkEmptyCICCreditLOAN(t))
                            .map((t) => {
                              // const cate = esta.find((p) => p.type_real_estate_code === t.code);
                              return {
                                uuid:
                                  t.uuid && checkIsLocalUUID(t.uuid)
                                    ? null
                                    : t.uuid,
                                cic_loan_term_item_code: removeFlag(
                                  findCode(term, t.code)
                                )?.code,
                                cic_loan_term_item_name: removeFlag(
                                  findCode(term, t.code)
                                )?.name,
                                cic_loan_term_credit_monthly_duration:
                                  t.expired === null
                                    ? null
                                    : {
                                        id: null,
                                        name: null,
                                        value: t.expired,
                                      },
                                cic_loan_term_credit_grant_amount:
                                  t.amount === null
                                    ? null
                                    : {
                                        id: null,
                                        name: null,
                                        value: t.amount,
                                      },
                                cic_loan_term_credit_balance:
                                  t.balance === null
                                    ? null
                                    : {
                                        id: null,
                                        name: null,
                                        value: t.balance,
                                      },
                                cic_loan_term_debit: t.balanceCIC,
                                cic_loan_term_credit_limit: t.amountCIC,
                                note: t.note
                              };
                            }),
                    },
                    cic_credit_card_info: {
                      cic_credit_card_total_amount: {
                        id: null,
                        name: null,
                        // value: Number(cr.detail.card.total_amount)
                        value: cr.detail.card.list
                          .map((t) => t.balance)
                          .reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0),
                      },
                      cic_credit_card_updated_date: checkEmptyCICCreditCardList(
                        cr.detail.card.list
                      )
                        ? null
                        : cr.detail.card.date
                        ? (cr.detail.card.date as number) / 1000
                        : (Date.now() / 1000) | 0,
                      cic_credit_card_last_updated_date: new Date(),
                      cic_credit_card_detail_info: checkEmptyCICCreditCardList(
                        cr.detail.card.list
                      )
                        ? []
                        : cr.detail.card.list
                            .filter((c) => !checkEmptyCICCreditCard(c))
                            .map((c, i) => ({
                              uuid: checkIsLocalUUID(c.uuid) ? null : c.uuid,
                              cic_credit_card_detail_item_code: `TD_${i + 1}`,
                              cic_credit_card_detail_item_name: `Thẻ TD ${i + 1}`,
                              cic_credit_card_detail_limit:
                                c.limited === null
                                  ? null
                                  : {
                                      id: null,
                                      name: null,
                                      value: c.limited,
                                    },
                              cic_credit_card_detail_balance:
                                c.balance === null
                                  ? null
                                  : {
                                      id: null,
                                      name: null,
                                      value: c.balance,
                                    },

                              cic_credit_card_limit: c.limitedCIC,
                              cic_credit_card_debit: c.balanceCIC,
                              note: c.note
                            })),
                    },
                    cic_credit_collateral_info: {
                      cic_credit_collateral_total_amount: {
                        id: null,
                        name: null,
                        // value: Number(cr.detail.collateral.total_amount)
                        value: cr.detail.collateral.list
                          .map((t) => t.value)
                          .reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0),
                      },
                      cic_credit_collateral_updated_date:
                        checkEmptyCICCreditCollateralList(
                          cr.detail.collateral.list
                        )
                          ? null
                          : cr.detail.collateral.date
                          ? (cr.detail.collateral.date as number) / 1000
                          : (Date.now() / 1000) | 0,
                      cic_credit_collateral_last_updated_date: new Date(),
                      cic_credit_collateral_detail_info:
                        checkEmptyCICCreditCollateralList(
                          cr.detail.collateral.list
                        )
                          ? []
                          : cr.detail.collateral.list
                              .filter((c) => !checkEmptyCICCreditCollateral(c))
                              .map((c, i) => {
                                const col = coll.find((r) => r.code === c.code);
                                return {
                                  uuid: checkIsLocalUUID(c.uuid) ? null : c.uuid,
                                  cic_credit_collateral_detail_item_code:
                                    col?.code,
                                  cic_credit_collateral_detail_item_name:
                                    col?.name,
                                  cic_credit_collateral_detail_category_info: col
                                    ? {
                                        id: col.id,
                                        code: col.code,
                                        name: col.name,
                                      }
                                    : null,
                                  cic_credit_collateral_detail_value: {
                                    value: c.value,
                                  },
                                };
                              }),
                    },
                  },
                };
              }).filter((x) => x !== null),
            credit_score_info:
              {
                risk_info: {
                  score_value: iden?.credit_score_info?.risk_info.score_value,
                  score_rank: iden?.credit_score_info?.risk_info.score_rank,
                  publish_date:
                    (iden?.credit_score_info?.risk_info.publish_date ?? 0) /1000,
                  evaluation: iden?.credit_score_info?.risk_info.evaluation,
                  customer_segment:
                    iden?.credit_score_info?.risk_info.customer_segment.map(
                      (seg) => {
                        return {
                          id: removeFlag(findCode(segment, seg))?.id,
                          name: removeFlag(findCode(segment, seg))?.name,
                        };
                      }
                    ),
                },
              }
          };
        }
        else return null 
      }).filter(e => e !== null),
    // .filter(x=>x.cic_identity_credit_institution_info.find(x=>x?.credit_institution_code?.length)),
    document_info_list: getDocument(
      cicState[organActive]?.data[declareActive]?.data?.find(
        (x) => x.person_uuid === positionActive
      )?.document_info_list ?? []
    ),
    total_document_file: 0,
  };

  return apiPost<unknown>(
    formatPath(API_BASE_URL_S1 + `/normal-loan/${los_uuid}/cic/${credit_institution}/${value}/${personUUID}?position=${position}`),
    body
  );
};

// const checkExistScoreInOtherOrgan = (
//   cicState: ILOANNormalStorageCICState,
//   identity: string,
//   organ: string,
//   declare: string,
//   posUUID: string,
//   segment: (IIdCodeName<string, string, string> & IDefaultFlag)[]
// ) => {
//   const restOrgan = organ === 'other' ? 'scb' : 'other';
//   const existCredit = cicState[restOrgan].data[declare].data
//     .find((x) => x.person_uuid === posUUID)
//     ?.data.find((id) => id.identity_num === identity)?.credit;
//   const scoreVal =
//     cicState[restOrgan].data[declare].data
//       .find((x) => x.person_uuid === posUUID)
//       ?.data.find((id) => id.identity_num === identity)?.credit_score_info ??
//     ({} as ICreditScoreInfo);
//   if (existCredit?.length && !checkEmptyCICCreditScoreValue(scoreVal)) {
//     return {
//       risk_info: {
//         score_value: scoreVal?.risk_info.score_value,
//         score_rank: scoreVal?.risk_info.score_rank,
//         publish_date: (scoreVal?.risk_info.publish_date ?? 0) / 1000,
//         evaluation: {
//           value: scoreVal?.risk_info.evaluation,
//         },
//         customer_segment: scoreVal?.risk_info.customer_segment.map((seg) => {
//           return {
//             id: removeFlag(findCode(segment, seg))?.id,
//             name: removeFlag(findCode(segment, seg))?.name,
//           };
//         }),
//       },
//     };
//   } else {
//     return null;
//   }
// };

export const saveCICFile = (action: FormData) => {
  return apiPost<unknown>(
    formatPath(API_BASE_URL_S1 + '/configs/multi-upload/'),
    action,
    {
      // change step 2
      'Content-Type': 'multipart/form-data',
    }
  );
};

export const getFullCICAfterSaveAPI = (los_uuid: string) => {
  if (typeof los_uuid === 'string') {
    return apiGet<any>(
      formatPath(API_BASE_URL_S1 + '/normal-loan/:id/cic/', los_uuid)
    ); // change step 2
  }
};

export const deleteCreditCICAPI = (
  los_uuid: string,
  organ: string,
  declare: string,
  person_uuid: string,
  identityNum : string,
  credit_uuid: string,
  position: string
) => {
  const organAPI =
    organ === 'scb'
      ? 'khoan-vay-hien-huu-tai-scb'
      : 'quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac';
  const getDeclareAPI = (declare: string) => {
    return declare.toLocaleUpperCase().replaceAll('-', '_');
  };
  return apiDelete<any>(
    formatPath(API_BASE_URL_S1 +`/normal-loan/${los_uuid}/cic/${organAPI}/${getDeclareAPI(declare)}/${person_uuid}/${identityNum}/${credit_uuid ?? ''}?position=${position}`)
  );
};

export const deleteAllCreditCICAPI = (
  los_uuid: string,
  organ: string,
  declare: string,
  person_uuid: string,
  identityNum : string,
) => {
  const organAPI =
    organ === 'scb'
      ? 'other-credit-institution'
      : 'other-credit-institution';
  const getDeclareAPI = (declare: string) => {
    return declare.toLocaleUpperCase().replaceAll('-', '_');
  };
  const body = {
    "cic_identity_credit_institution_info": []
  }
  return apiPatch<any>(
    formatPath(API_BASE_URL_S1 +`/normal-loan/${los_uuid}/cic/institution/${organAPI}/person/${getDeclareAPI(declare)}/${person_uuid}/identity/${identityNum}`),
    body
  );
};

export const deleteCreditDetailCICAPI = (
  los_uuid: string,
  type: string,
  organ: string,
  declare: string,
  person_uuid: string,
  identity_uuid: string,
  credit_id: number | null,
  detailUuid: string,
  position: string
) => {
  const organAPI =
    organ === 'scb'
      ? 'khoan-vay-hien-huu-tai-scb'
      : 'quan-he-tin-dung-tai-cac-to-chuc-tin-dung-khac';
  const getDeclareAPI = (declare: string) => {
    return declare.toLocaleUpperCase().replaceAll('-', '_');
  };
  return apiDelete<any>(
    formatPath(
      API_BASE_URL_S1 +
        `/normal-loan/${los_uuid}/cic/${type}/${organAPI}/${getDeclareAPI(declare)}/${person_uuid}/${identity_uuid}/${credit_id ?? ''}/${detailUuid}?position=${position}`
        )
  );
};
