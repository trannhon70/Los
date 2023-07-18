import { ILOANNormalConfigState } from 'types/models/loan/normal/configs';
import {
  ILOANNormalStorageCICOther,
  ILOANNormalStorageCICState
} from 'types/models/loan/normal/storage/CIC';
import { IMasterData } from 'types/models/master-data';
import { checkIsLocalUUID, formatPath } from 'utils';
import { apiPost } from 'utils/api';
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

export const saveCICAPIAuto = (
  cicState: ILOANNormalStorageCICState,
  declaceExist: string[],
  los_uuid: string,
  master: IMasterData,
  configs: ILOANNormalConfigState,
  position: string,
  uuid_person_post:string,
  declareType:string,
  id_num:string,
  uuid_num:string,
  creditActive:string,
  type:string
) => {
  const organActive = cicState.activeOrgan as keyof ILOANNormalStorageCICOther;
  const declareActive = cicState[organActive]?.declareActive;
  const positionActive = cicState[organActive]?.data[declareActive]?.position;
  console.log("positionActive",positionActive)

  const {
    debtClassification: { data: debt },
    creditInstitution: { data: credit },
    typeTermLoan: { data: term },
    collateralType: { data: coll },
    customerSegment: { data: segment },
  } = master;

  const body = {
    full_name: cicState[type as keyof ILOANNormalStorageCICOther]?.data[declareType]?.data?.find((x) => x.person_uuid === type)?.full_name,
    person_uuid: uuid_person_post,
    cic_identity_info: cicState[organActive]?.data[declareActive]?.data?.find((x) => x.person_uuid === uuid_person_post)
      ?.data?.map((iden) => {
        if((iden.credit && iden.credit.length > 0) || iden?.credit_score_info?.risk_info?.score_value !== null){
          return {
            identity_type: iden.identity_type,
            identity_num: id_num,
            uuid: uuid_num,
            cic_identity_total_loan_amount: {
              value: iden?.credit
                ?.map((cr) => {
                  const loan = cr.detail.loan.list.map((l) => l.balance).reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0) ?? 0;
                  const card = cr.detail.card.list.map((c) => c.balance).reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0) ?? 0;
                  return loan + card;
                }).reduce((a, b) => Number(a ?? 0) + Number(b ?? 0), 0),
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
                  evaluation: {
                    value: iden?.credit_score_info?.risk_info.evaluation,
                  },
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
    document_info_list: [],
    total_document_file: 0,
  };

  console.log("body",body)

  return apiPost<unknown>(
    formatPath(API_BASE_URL_S1 + `/normal-loan/${los_uuid}/cic/${creditActive}/${declareType}/${uuid_person_post}`),
    body
  );
};