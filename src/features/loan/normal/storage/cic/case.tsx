import { Draft, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { ILOANNormalState } from 'types/models/loan/normal';
import {
  CustomKeyType,
  ICICDataAPI,
  ICICDeclareDataAPI,
  ICICDeclareMultiAPI,
  ICICDocumentInfoAPI,
  ICICNormalStorageCICValidate,
  ICICOrganAPI,
  ICreditScoreInfo,
  ILOANNormalAllCreditDeleteInfo,
  ILOANNormalCICUpload,
  ILOANNormalCreditDeleteInfo,
  ILOANNormalCreditDetailDeleteInfo,
  ILOANNormalStorageCICCreditDetailGroup,
  ILOANNormalStorageCICDeclareData,
  ILOANNormalStorageCICDeclareDataDetail,
  ILOANNormalStorageCICDocumentChildFile,
  ILOANNormalStorageCICDocumentChildList,
  ILOANNormalStorageCICDocumentList,
  ILOANNormalStorageCICOrgan,
  ILOANNormalStorageCICOrganData,
  ILOANNormalStorageCICOther,
  IRiskInfo,
} from 'types/models/loan/normal/storage/CIC';
import {
  ILoanNormalLegalAPI,
  ILOANNormalLegalBor,
  ILOANNormalLegalBorrower,
  ILOANNormalLegalReLrt,
} from 'types/models/loan/normal/storage/Legal';
import { generateLOCALUUID, generateUUID } from 'utils';
import {
  getEmptyLOANNormalCICCard,
  getEmptyLOANNormalCICCollateral,
} from 'views/pages/LOAN/utils';
import {
  generateEmptyDocumentChildFile,
  generateEmptyDocumentGroup,
  generateEmptyDocumentType,
  generateLOANNormalCICCredit,
  generateLOANNormalCICIdentity,
  generateLoanNormalCICIdentityAPI,
  generateLOANNormalCICPerson,
  generateLoanNormalCICPersonAPI,
} from './generateEmptyData';

export const CICCase = {
  setCICDeclarePosition: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { organActive: keyof ILOANNormalStorageCICOther; declareActive: string }
      >
    ) {
      const positionActive =
        state.storage.cic[action.meta.organActive]?.data[
          action.meta.declareActive
        ]?.position ?? 0;
      // const identityActive = state.storage.cic[action.meta.organActive]?.data[action.meta.declareActive]?.data.find(x => x.person_uuid === positionActive)?.identityActive;

      const checkExistData =
        state.storage.cic[action.meta.organActive]?.data[
          action.meta.declareActive
        ]?.data;
      state.storage.cic[action.meta.organActive].data[
        action.meta.declareActive
      ] = {
        ...state.storage.cic[action.meta.organActive]?.data[
          action.meta.declareActive
        ],
        position: action.payload,
      };
      const existed =
        !!checkExistData &&
        checkExistData
          .find((x) => x.person_uuid === positionActive)
          ?.data?.find((d, i) => d.uuid === action.payload);
      if (!existed) {
        state.storage.cic[action.meta.organActive].data[
          action.meta.declareActive
        ] = {
          ...state.storage.cic[action.meta.organActive]?.data[
            action.meta.declareActive
          ],
          position: action.payload,
          data: !!checkExistData
            ? [
                ...state.storage.cic[action.meta.organActive]?.data[
                  action.meta.declareActive
                ]?.data,
              ]
            : [],
        };
      }
    },
    prepare(
      payload: string,
      meta: {
        organActive: keyof ILOANNormalStorageCICOther;
        declareActive: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setCICOrgan(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.cic.activeOrgan = action.payload;
  },

  setCICDeclareActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, keyof ILOANNormalStorageCICOther>
    ) {
      state.storage.cic[action.meta].declareActive = action.payload;
    },
    prepare(payload: string, meta: keyof ILOANNormalStorageCICOther) {
      return { payload, meta };
    },
  },
  focusInvalidIdentity(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ICICNormalStorageCICValidate>
  ) {
    const { identity, credit, loan, card, collateral } = action.payload;

    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrganData;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;

    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((person) => {
      if (person.person_uuid === positionActive) {
        return {
          ...person,
          identityActive: identity ? identity : person.identityActive,
          data: person.data.map((iden) => {
            if (iden.uuid === identity) {
              return {
                ...iden,
                activeCredit: credit ? credit : iden.activeCredit,
                credit: iden.credit.map((cre) => {
                  if (cre.uuid === credit) {
                    return {
                      ...cre,
                      detail: {
                        ...cre.detail,
                        card: {
                          ...cre.detail.card,
                          active: card ? card : cre.detail.card.active,
                        },
                        loan: {
                          ...cre.detail.loan,
                          active: loan ? loan : cre.detail.loan.active,
                        },
                        collateral: {
                          ...cre.detail.collateral,
                          active: collateral
                            ? collateral
                            : cre.detail.collateral.active,
                        },
                      },
                    };
                  } else return { ...cre };
                }),
              };
            } else return { ...iden };
          }),
        };
      } else return { ...person };
    });
  },

  setCICIdentityActive(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string, string>
  ) {
    const organActive = state.storage.cic.activeOrgan;
    if (organActive === 'other' || organActive === 'scb') {
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrganData;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position;
      const positionActiveIndex = state.storage.cic[organActive]?.data[
        declareActive
      ]?.data?.findIndex((person) => person.person_uuid === positionActive);

      if (
        positionActiveIndex !== -1 &&
        state.storage.cic[organActive]?.data[declareActive]?.data[
          positionActiveIndex
        ]
      ) {
        state.storage.cic[organActive].data[declareActive].data[
          positionActiveIndex
        ].identityActive = action.payload;
      }
    }
  },

  setCICDebtGroup: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, keyof ILOANNormalStorageCICOther>
    ) {
      const declareActive = state.storage.cic[action.meta]
        ?.declareActive as keyof ILOANNormalStorageCICOrganData;
      const positionActive =
        state.storage.cic[action.meta]?.data[declareActive]?.position;
      const identityActive = state.storage.cic[action.meta]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

      state.storage.cic[action.meta].data[declareActive].data =
        state.storage.cic[action.meta].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              data: x.data.map((d) => {
                if (d.uuid === identityActive) {
                  return {
                    ...d,
                    debtGroup: action.payload,
                  };
                }
                return {
                  ...d,
                };
              }),
            };
          }
          return {
            ...x,
          };
        });
    },
    prepare(payload: string, meta: keyof ILOANNormalStorageCICOther) {
      return { payload, meta };
    },
  },
  setHasCreditCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<boolean, string, keyof ILOANNormalStorageCICOther>
    ) {
      const declareActive = state.storage.cic[action.meta]
        ?.declareActive as keyof ILOANNormalStorageCICOrganData;
      const positionActive =
        state.storage.cic[action.meta]?.data[declareActive]?.position;
      const identityActive = state.storage.cic[action.meta]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

      state.storage.cic[action.meta].data[declareActive].data =
        state.storage.cic[action.meta].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              data: x.data.map((d) => {
                if (d.uuid === identityActive) {
                  return {
                    ...d,
                    hasCredit: action.payload,
                  };
                }
                return {
                  ...d,
                };
              }),
            };
          }
          return {
            ...x,
          };
        });
    },
    prepare(payload: boolean, meta: keyof ILOANNormalStorageCICOther) {
      return { payload, meta };
    },
  },
  addCICCreditOrgan(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<keyof ILOANNormalStorageCICOther>
  ) {
    const declareActive = state.storage.cic[action.payload]
      ?.declareActive as keyof ILOANNormalStorageCICOrganData;
    const positionActive =
      state.storage.cic[action.payload]?.data[declareActive]?.position;
    const identityActive = state.storage.cic[action.payload]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

    state.storage.cic[action.payload].data[declareActive].data =
      state.storage.cic[action.payload].data[declareActive].data.map((x) => {
        if (x.person_uuid === positionActive) {
          return {
            ...x,
            data:
              x.data.map((d) => {
                if (d.uuid === identityActive) {
                  if (action.payload === 'scb') {
                    if (!d.credit.length) {
                      return {
                        ...d,
                        credit: [],
                      };
                    }
                  } else {
                    const newCredit = generateLOANNormalCICCredit();
                    return {
                      ...d,
                      activeCredit: newCredit.uuid,
                      credit: [...d.credit, { ...newCredit }],
                    };
                  }
                }
                return { ...d };
              }) ?? [],
          };
        }
        return { ...x };
      });
  },

  setCICCreditActive: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, keyof ILOANNormalStorageCICOther>
    ) {
      const declareActive = state.storage.cic[action.meta]
        ?.declareActive as keyof ILOANNormalStorageCICOrganData;
      const positionActive =
        state.storage.cic[action.meta]?.data[declareActive]?.position ?? 0;
      const identityActive = state.storage.cic[action.meta]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

      state.storage.cic[action.meta].data[declareActive] = {
        ...state.storage.cic[action.meta].data[declareActive],
        data:
          state.storage.cic[action.meta]?.data[declareActive]?.data?.map(
            (d1) => {
              return {
                ...d1,
                data: d1?.data?.map((d2) => {
                  if (d2.uuid === identityActive) {
                    return {
                      ...d2,
                      activeCredit: action.payload,
                    };
                  }
                  return { ...d2 };
                }),
              };
            }
          ) ?? [],
      };
    },
    prepare(payload: string, meta: keyof ILOANNormalStorageCICOther) {
      return { payload, meta };
    },
  },

  setCICCreditOrgan: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, keyof ILOANNormalStorageCICOther>
    ) {
      const declareActive = state.storage.cic[action.meta]?.declareActive;
      const positionActive =
        state.storage.cic[action.meta]?.data[declareActive]?.position;
      const identityActive = state.storage.cic[action.meta]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
      const uuid =
        state.storage.cic[action.meta]?.data[declareActive]?.data
          .find((x) => x.person_uuid === positionActive)
          ?.data?.find((i) => i.uuid === identityActive)?.activeCredit ?? '';
      state.storage.cic[action.meta].data[declareActive].data =
        state.storage.cic[action.meta].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              data:
                x.data.map((d) => {
                  if (d.uuid === identityActive) {
                    return {
                      ...d,
                      credit: d.credit.map((c) => {
                        if (c.uuid === uuid) {
                          return { ...c, code: action.payload };
                        }
                        return { ...c };
                      }),
                    };
                  }
                  return { ...d };
                }) ?? [],
            };
          }
          return { ...x };
        });
    },
    prepare(payload: string, meta: keyof ILOANNormalStorageCICOther) {
      return { payload, meta };
    },
  },

  deleteCreditDetailCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, ILOANNormalCreditDetailDeleteInfo>
    ) {},
    prepare(payload: string, meta: ILOANNormalCreditDetailDeleteInfo) {
      return { payload, meta };
    },
  },

  deleteCreditDetailCICStoreFull(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalCreditDetailDeleteInfo>
  ) {
    const { organ, declare, personUuid, creditUuid, type, detailUuid } =
      action.payload;
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

    const convertDeclare = (declare: string) => {
      return declare === 'other' ? 'others' : declare.replace('-', '_');
    };
    if (state.storage.full.data) {
      if (organ === 'scb') {
        if (declare === 'borrower' || declare === 'marriage') {
          (
            state.storage.full.data.form.cic_form.current_credit_institution[
              declare as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI
          ).cic_identity_info = (
            state.storage.full.data.form.cic_form.current_credit_institution[
              declare as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI
          ).cic_identity_info.map((iden) =>
            iden.uuid === identityActive
              ? {
                  ...iden,

                  // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                  cic_identity_credit_institution_info:
                    iden.cic_identity_credit_institution_info.map((credit) => {
                      return credit.uuid === creditUuid
                        ? {
                            ...credit,
                            cic_identity_detail_info: {
                              ...credit.cic_identity_detail_info,
                              cic_credit_loan_info:
                                type === 'loan'
                                  ? {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_loan_info,
                                      cic_credit_loan_total_amount: {
                                        ...credit.cic_identity_detail_info
                                          .cic_credit_loan_info
                                          .cic_credit_loan_total_amount,
                                        value:
                                          credit.cic_identity_detail_info
                                            .cic_credit_loan_info
                                            .cic_credit_loan_total_amount
                                            .value -
                                          (credit?.cic_identity_detail_info?.cic_credit_loan_info?.cic_credit_loan_term_info?.find(
                                            (e) => e.uuid === detailUuid
                                          )?.cic_loan_term_credit_balance
                                            ?.value ?? 0),
                                      },
                                      cic_credit_loan_term_info:
                                        credit.cic_identity_detail_info.cic_credit_loan_info.cic_credit_loan_term_info.filter(
                                          (e) => e.uuid !== detailUuid
                                        ),
                                    }
                                  : {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_loan_info,
                                    },
                              cic_credit_card_info:
                                type === 'card'
                                  ? {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_card_info,
                                      cic_credit_card_total_amount: {
                                        ...credit.cic_identity_detail_info
                                          .cic_credit_card_info
                                          .cic_credit_card_total_amount,
                                        value:
                                          credit.cic_identity_detail_info
                                            .cic_credit_card_info
                                            .cic_credit_card_total_amount
                                            .value -
                                          (credit?.cic_identity_detail_info?.cic_credit_card_info?.cic_credit_card_detail_info?.find(
                                            (e) => e.uuid === detailUuid
                                          )?.cic_credit_card_detail_balance
                                            ?.value ?? 0),
                                      },
                                      cic_credit_card_detail_info:
                                        credit.cic_identity_detail_info.cic_credit_card_info.cic_credit_card_detail_info.filter(
                                          (e) => e.uuid !== detailUuid
                                        ),
                                    }
                                  : {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_card_info,
                                    },
                              cic_credit_collateral_info:
                                type === 'collateral'
                                  ? {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_collateral_info,
                                      cic_credit_collateral_total_amount: {
                                        ...credit.cic_identity_detail_info
                                          .cic_credit_collateral_info
                                          .cic_credit_collateral_total_amount,
                                        value:
                                          credit.cic_identity_detail_info
                                            .cic_credit_collateral_info
                                            .cic_credit_collateral_total_amount
                                            .value -
                                          (credit?.cic_identity_detail_info?.cic_credit_collateral_info?.cic_credit_collateral_detail_info?.find(
                                            (e) => e.uuid === detailUuid
                                          )?.cic_credit_collateral_detail_value
                                            ?.value ?? 0),
                                      },
                                      cic_credit_collateral_detail_info:
                                        credit.cic_identity_detail_info.cic_credit_collateral_info.cic_credit_collateral_detail_info.filter(
                                          (e) => e.uuid !== detailUuid
                                        ),
                                    }
                                  : {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_collateral_info,
                                    },
                            },
                          }
                        : { ...credit };
                    }),
                }
              : { ...iden }
          );
        } else if (
          declare === 'co-brw' ||
          declare === 'co-payer' ||
          declare === 'law-rlt' ||
          declare === 'other'
        ) {
          (state.storage.full.data.form.cic_form.current_credit_institution[
            convertDeclare(declare) as keyof ICICOrganAPI
          ].data as ICICDeclareDataAPI[]) = (
            state.storage.full.data.form.cic_form.current_credit_institution[
              convertDeclare(declare) as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI[]
          ).map((person) =>
            person.person_uuid === personUuid
              ? {
                  ...person,
                  cic_identity_info: person.cic_identity_info.map((iden) =>
                    iden.uuid === identityActive
                      ? {
                          ...iden,
                          // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                          // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                          cic_identity_credit_institution_info:
                            iden.cic_identity_credit_institution_info.map(
                              (credit) => {
                                return credit.uuid === creditUuid
                                  ? {
                                      ...credit,
                                      cic_identity_detail_info: {
                                        ...credit.cic_identity_detail_info,
                                        cic_credit_loan_info:
                                          type === 'loan'
                                            ? {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_loan_info,
                                                cic_credit_loan_total_amount: {
                                                  ...credit
                                                    .cic_identity_detail_info
                                                    .cic_credit_loan_info
                                                    .cic_credit_loan_total_amount,
                                                  value:
                                                    credit
                                                      .cic_identity_detail_info
                                                      .cic_credit_loan_info
                                                      .cic_credit_loan_total_amount
                                                      .value -
                                                    (credit?.cic_identity_detail_info?.cic_credit_loan_info?.cic_credit_loan_term_info?.find(
                                                      (e) =>
                                                        e.uuid === detailUuid
                                                    )
                                                      ?.cic_loan_term_credit_balance
                                                      ?.value ?? 0),
                                                },
                                                cic_credit_loan_term_info:
                                                  credit.cic_identity_detail_info.cic_credit_loan_info.cic_credit_loan_term_info.filter(
                                                    (e) => e.uuid !== detailUuid
                                                  ),
                                              }
                                            : {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_loan_info,
                                              },
                                        cic_credit_card_info:
                                          type === 'card'
                                            ? {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_card_info,
                                                cic_credit_card_total_amount: {
                                                  ...credit
                                                    .cic_identity_detail_info
                                                    .cic_credit_card_info
                                                    .cic_credit_card_total_amount,
                                                  value:
                                                    credit
                                                      .cic_identity_detail_info
                                                      .cic_credit_card_info
                                                      .cic_credit_card_total_amount
                                                      .value -
                                                    (credit?.cic_identity_detail_info?.cic_credit_card_info?.cic_credit_card_detail_info?.find(
                                                      (e) =>
                                                        e.uuid === detailUuid
                                                    )
                                                      ?.cic_credit_card_detail_balance
                                                      ?.value ?? 0),
                                                },
                                                cic_credit_card_detail_info:
                                                  credit.cic_identity_detail_info.cic_credit_card_info.cic_credit_card_detail_info.filter(
                                                    (e) => e.uuid !== detailUuid
                                                  ),
                                              }
                                            : {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_card_info,
                                              },
                                        cic_credit_collateral_info:
                                          type === 'collateral'
                                            ? {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_collateral_info,
                                                cic_credit_collateral_total_amount:
                                                  {
                                                    ...credit
                                                      .cic_identity_detail_info
                                                      .cic_credit_collateral_info
                                                      .cic_credit_collateral_total_amount,
                                                    value:
                                                      credit
                                                        .cic_identity_detail_info
                                                        .cic_credit_collateral_info
                                                        .cic_credit_collateral_total_amount
                                                        .value -
                                                      (credit?.cic_identity_detail_info?.cic_credit_collateral_info?.cic_credit_collateral_detail_info?.find(
                                                        (e) =>
                                                          e.uuid === detailUuid
                                                      )
                                                        ?.cic_credit_collateral_detail_value
                                                        ?.value ?? 0),
                                                  },
                                                cic_credit_collateral_detail_info:
                                                  credit.cic_identity_detail_info.cic_credit_collateral_info.cic_credit_collateral_detail_info.filter(
                                                    (e) => e.uuid !== detailUuid
                                                  ),
                                              }
                                            : {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_collateral_info,
                                              },
                                      },
                                    }
                                  : { ...credit };
                              }
                            ),
                        }
                      : { ...iden }
                  ),
                }
              : { ...person }
          );
        }
      } else {
        if (declare === 'borrower' || declare === 'marriage') {
          (
            state.storage.full.data.form.cic_form.other_credit_institution[
              declare as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI
          ).cic_identity_info = (
            state.storage.full.data.form.cic_form.other_credit_institution[
              declare as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI
          ).cic_identity_info.map((iden) =>
            iden.uuid === identityActive
              ? {
                  ...iden,
                  // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                  // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                  cic_identity_credit_institution_info:
                    iden.cic_identity_credit_institution_info.map((credit) => {
                      return credit.uuid === creditUuid
                        ? {
                            ...credit,
                            cic_identity_detail_info: {
                              ...credit.cic_identity_detail_info,
                              cic_credit_loan_info:
                                type === 'loan'
                                  ? {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_loan_info,
                                      cic_credit_loan_total_amount: {
                                        ...credit.cic_identity_detail_info
                                          .cic_credit_loan_info
                                          .cic_credit_loan_total_amount,
                                        value:
                                          credit.cic_identity_detail_info
                                            .cic_credit_loan_info
                                            .cic_credit_loan_total_amount
                                            .value -
                                          (credit?.cic_identity_detail_info?.cic_credit_loan_info?.cic_credit_loan_term_info?.find(
                                            (e) => e.uuid === detailUuid
                                          )?.cic_loan_term_credit_balance
                                            ?.value ?? 0),
                                      },
                                      cic_credit_loan_term_info:
                                        credit.cic_identity_detail_info.cic_credit_loan_info.cic_credit_loan_term_info.filter(
                                          (e) => e.uuid !== detailUuid
                                        ),
                                    }
                                  : {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_loan_info,
                                    },
                              cic_credit_card_info:
                                type === 'card'
                                  ? {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_card_info,
                                      cic_credit_card_total_amount: {
                                        ...credit.cic_identity_detail_info
                                          .cic_credit_card_info
                                          .cic_credit_card_total_amount,
                                        value:
                                          credit.cic_identity_detail_info
                                            .cic_credit_card_info
                                            .cic_credit_card_total_amount
                                            .value -
                                          (credit?.cic_identity_detail_info?.cic_credit_card_info?.cic_credit_card_detail_info?.find(
                                            (e) => e.uuid === detailUuid
                                          )?.cic_credit_card_detail_balance
                                            ?.value ?? 0),
                                      },
                                      cic_credit_card_detail_info:
                                        credit.cic_identity_detail_info.cic_credit_card_info.cic_credit_card_detail_info.filter(
                                          (e) => e.uuid !== detailUuid
                                        ),
                                    }
                                  : {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_card_info,
                                    },
                              cic_credit_collateral_info:
                                type === 'collateral'
                                  ? {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_collateral_info,
                                      cic_credit_collateral_total_amount: {
                                        ...credit.cic_identity_detail_info
                                          .cic_credit_collateral_info
                                          .cic_credit_collateral_total_amount,
                                        value:
                                          credit.cic_identity_detail_info
                                            .cic_credit_collateral_info
                                            .cic_credit_collateral_total_amount
                                            .value -
                                          (credit?.cic_identity_detail_info?.cic_credit_collateral_info?.cic_credit_collateral_detail_info?.find(
                                            (e) => e.uuid === detailUuid
                                          )?.cic_credit_collateral_detail_value
                                            ?.value ?? 0),
                                      },
                                      cic_credit_collateral_detail_info:
                                        credit.cic_identity_detail_info.cic_credit_collateral_info.cic_credit_collateral_detail_info.filter(
                                          (e) => e.uuid !== detailUuid
                                        ),
                                    }
                                  : {
                                      ...credit.cic_identity_detail_info
                                        .cic_credit_collateral_info,
                                    },
                            },
                          }
                        : { ...credit };
                    }),
                }
              : { ...iden }
          );
        } else if (
          declare === 'co-brw' ||
          declare === 'co-payer' ||
          declare === 'law-rlt' ||
          declare === 'other'
        ) {
          (state.storage.full.data.form.cic_form.other_credit_institution[
            convertDeclare(declare) as keyof ICICOrganAPI
          ].data as ICICDeclareDataAPI[]) = (
            state.storage.full.data.form.cic_form.other_credit_institution[
              convertDeclare(declare) as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI[]
          ).map((person) =>
            person.person_uuid === personUuid
              ? {
                  ...person,
                  cic_identity_info: person.cic_identity_info.map((iden) =>
                    iden.uuid === identityActive
                      ? {
                          ...iden,
                          // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                          // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                          cic_identity_credit_institution_info:
                            iden.cic_identity_credit_institution_info.map(
                              (credit) => {
                                return credit.uuid === creditUuid
                                  ? {
                                      ...credit,
                                      cic_identity_detail_info: {
                                        ...credit.cic_identity_detail_info,
                                        cic_credit_loan_info:
                                          type === 'loan'
                                            ? {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_loan_info,
                                                cic_credit_loan_total_amount: {
                                                  ...credit
                                                    .cic_identity_detail_info
                                                    .cic_credit_loan_info
                                                    .cic_credit_loan_total_amount,
                                                  value:
                                                    credit
                                                      .cic_identity_detail_info
                                                      .cic_credit_loan_info
                                                      .cic_credit_loan_total_amount
                                                      .value -
                                                    (credit?.cic_identity_detail_info?.cic_credit_loan_info?.cic_credit_loan_term_info?.find(
                                                      (e) =>
                                                        e.uuid === detailUuid
                                                    )
                                                      ?.cic_loan_term_credit_balance
                                                      ?.value ?? 0),
                                                },
                                                cic_credit_loan_term_info:
                                                  credit.cic_identity_detail_info.cic_credit_loan_info.cic_credit_loan_term_info.filter(
                                                    (e) => e.uuid !== detailUuid
                                                  ),
                                              }
                                            : {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_loan_info,
                                              },
                                        cic_credit_card_info:
                                          type === 'card'
                                            ? {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_card_info,
                                                cic_credit_card_total_amount: {
                                                  ...credit
                                                    .cic_identity_detail_info
                                                    .cic_credit_card_info
                                                    .cic_credit_card_total_amount,
                                                  value:
                                                    credit
                                                      .cic_identity_detail_info
                                                      .cic_credit_card_info
                                                      .cic_credit_card_total_amount
                                                      .value -
                                                    (credit?.cic_identity_detail_info?.cic_credit_card_info?.cic_credit_card_detail_info?.find(
                                                      (e) =>
                                                        e.uuid === detailUuid
                                                    )
                                                      ?.cic_credit_card_detail_balance
                                                      ?.value ?? 0),
                                                },
                                                cic_credit_card_detail_info:
                                                  credit.cic_identity_detail_info.cic_credit_card_info.cic_credit_card_detail_info.filter(
                                                    (e) => e.uuid !== detailUuid
                                                  ),
                                              }
                                            : {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_card_info,
                                              },
                                        cic_credit_collateral_info:
                                          type === 'collateral'
                                            ? {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_collateral_info,
                                                cic_credit_collateral_total_amount:
                                                  {
                                                    ...credit
                                                      .cic_identity_detail_info
                                                      .cic_credit_collateral_info
                                                      .cic_credit_collateral_total_amount,
                                                    value:
                                                      credit
                                                        .cic_identity_detail_info
                                                        .cic_credit_collateral_info
                                                        .cic_credit_collateral_total_amount
                                                        .value -
                                                      (credit?.cic_identity_detail_info?.cic_credit_collateral_info?.cic_credit_collateral_detail_info?.find(
                                                        (e) =>
                                                          e.uuid === detailUuid
                                                      )
                                                        ?.cic_credit_collateral_detail_value
                                                        ?.value ?? 0),
                                                  },
                                                cic_credit_collateral_detail_info:
                                                  credit.cic_identity_detail_info.cic_credit_collateral_info.cic_credit_collateral_detail_info.filter(
                                                    (e) => e.uuid !== detailUuid
                                                  ),
                                              }
                                            : {
                                                ...credit
                                                  .cic_identity_detail_info
                                                  .cic_credit_collateral_info,
                                              },
                                      },
                                    }
                                  : { ...credit };
                              }
                            ),
                        }
                      : { ...iden }
                  ),
                }
              : { ...person }
          );
        }
      }
    }
  },

  deleteCreditDetailCICLocal(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalCreditDetailDeleteInfo>
  ) {
    const { type, index } = action.payload;
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position;

    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              const activeCredit = d.credit.find(
                (cre) => cre.uuid === d.activeCredit
              );
              return {
                ...d,
                totalLoan:
                  d.totalLoan !== null
                    ? d.totalLoan -
                      (type === 'loan'
                        ? activeCredit?.detail.loan.list.find(
                            (loan) =>
                              loan.code === activeCredit?.detail.loan.active
                          )?.balance ?? 0
                        : type === 'card'
                        ? activeCredit?.detail.card.list.find(
                            (card) =>
                              card.uuid === activeCredit?.detail.card.active
                          )?.balance ?? 0
                        : 0)
                    : null,
                totalCollateral:
                  d.totalCollateral !== null
                    ? d.totalCollateral -
                      (type === 'collateral'
                        ? activeCredit?.detail.collateral.list.find(
                            (coll) =>
                              coll.uuid ===
                              activeCredit?.detail.collateral.active
                          )?.value ?? 0
                        : 0)
                    : null,

                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    if (type === 'loan') {
                      return {
                        ...c,
                        detail: {
                          ...c.detail,
                          loan: {
                            ...c.detail.loan,
                            total_amount:
                              (c?.detail?.loan?.total_amount ?? 0) -
                              (c.detail.loan.list.find(
                                (de) => de.code === c.detail.loan.active
                              )?.balance ?? 0),
                            list: c.detail.loan.list.map((loan) => {
                              return loan.code === c.detail.loan.active
                                ? {
                                    ...loan,
                                    expired: null,
                                    amount: null,
                                    balance: null,
                                    uuid: null,
                                    amountCIC: null,
                                    balanceCIC: null,
                                  }
                                : { ...loan };
                            }),
                          },
                        },
                      };
                    } else {
                      if (c.detail[type].list.length === 1) {
                        return {
                          ...c,
                          detail: {
                            ...c.detail,
                            [type]: {
                              ...c.detail[type],
                              active: '',
                              total_amount: null,
                              list: [],
                            },
                          },
                        };
                      } else {
                        const deleteAmount =
                          type === 'card'
                            ? c.detail.card.list.find(
                                (de) => de.uuid === c.detail.card.active
                              )?.balance ?? 0
                            : c.detail.collateral.list.find(
                                (de) => de.uuid === c.detail.collateral.active
                              )?.value ?? 0;
                        const list = c.detail[type].list.splice(index, 1);
                        if (list[0]?.uuid !== c.detail[type].active) {
                          return {
                            ...c,
                            detail: {
                              ...c.detail,
                              [type]: {
                                ...c.detail[type],
                                total_amount:
                                  (c?.detail[type]?.total_amount ?? 0) -
                                  deleteAmount,
                                list: [...c.detail[type].list],
                              },
                            },
                          };
                        } else {
                          return {
                            ...c,
                            detail: {
                              ...c.detail,
                              [type]: {
                                ...c.detail[type],
                                active:
                                  c.detail[type]?.list[
                                    c.detail[type]?.list?.length - 1
                                  ]?.uuid,
                                total_amount:
                                  (c?.detail[type]?.total_amount ?? 0) -
                                  deleteAmount,
                                list: [...c.detail[type].list],
                              },
                            },
                          };
                        }
                      }
                    }
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },

  deleteCreditCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, ILOANNormalCreditDeleteInfo>
    ) {},
    prepare(payload: string, meta: ILOANNormalCreditDeleteInfo) {
      return { payload, meta };
    },
  },

  deleteAllCreditCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string, string, ILOANNormalAllCreditDeleteInfo>
    ) {},
    prepare(payload: string, meta: ILOANNormalAllCreditDeleteInfo) {
      return { payload, meta };
    },
  },

  deleteAllCreditCICStoreFull(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalAllCreditDeleteInfo>
  ) {
    const { organ, declare, personUuid } = action.payload;
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

    const convertDeclare = (declare: string) => {
      return declare === 'other' ? 'others' : declare.replace('-', '_');
    };
    if (state.storage.full.data) {
      if (organ === 'scb') {
        if (declare === 'borrower' || declare === 'marriage') {
          if (
            (
              state.storage.full.data.form.cic_form.current_credit_institution[
                declare as keyof ICICOrganAPI
              ].data as ICICDeclareDataAPI
            )?.cic_identity_info
          ) {
            (
              state.storage.full.data.form.cic_form.current_credit_institution[
                declare as keyof ICICOrganAPI
              ].data as ICICDeclareDataAPI
            ).cic_identity_info = (
              state.storage.full.data.form.cic_form.current_credit_institution[
                declare as keyof ICICOrganAPI
              ].data as ICICDeclareDataAPI
            )?.cic_identity_info?.map((iden) =>
              iden.uuid === identityActive
                ? {
                    ...iden,
                    // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                    credit_score_info: { ...iden.credit_score_info },
                    cic_identity_total_loan_amount: {
                      ...iden.cic_identity_total_loan_amount,
                      value: 0,
                    },
                    cic_identity_total_collateral_amount: {
                      ...iden.cic_identity_total_collateral_amount,
                      value: 0,
                    },
                    // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                    cic_identity_credit_institution_info: [],
                  }
                : { ...iden }
            );
          }
        } else if (
          declare === 'co-brw' ||
          declare === 'co-payer' ||
          declare === 'law-rlt' ||
          declare === 'other'
        ) {
          (state.storage.full.data.form.cic_form.current_credit_institution[
            convertDeclare(declare) as keyof ICICOrganAPI
          ].data as ICICDeclareDataAPI[]) = (
            state.storage.full.data.form.cic_form.current_credit_institution[
              convertDeclare(declare) as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI[]
          )?.map((person) =>
            person.person_uuid === personUuid
              ? {
                  ...person,
                  cic_identity_info: person.cic_identity_info.map((iden) =>
                    iden.uuid === identityActive
                      ? {
                          ...iden,
                          credit_score_info: { ...iden.credit_score_info },
                          cic_identity_total_loan_amount: {
                            ...iden.cic_identity_total_loan_amount,
                            value: 0,
                          },
                          cic_identity_total_collateral_amount: {
                            ...iden.cic_identity_total_collateral_amount,
                            value: 0,
                          },
                          // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                          cic_identity_credit_institution_info: [],
                        }
                      : { ...iden }
                  ),
                }
              : { ...person }
          );
        }
      } else {
        if (declare === 'borrower' || declare === 'marriage') {
          if (
            (
              state.storage.full.data.form.cic_form.other_credit_institution[
                declare as keyof ICICOrganAPI
              ].data as ICICDeclareDataAPI
            )?.cic_identity_info
          ) {
            (
              state.storage.full.data.form.cic_form.other_credit_institution[
                declare as keyof ICICOrganAPI
              ].data as ICICDeclareDataAPI
            ).cic_identity_info = (
              state.storage.full.data.form.cic_form.other_credit_institution[
                declare as keyof ICICOrganAPI
              ].data as ICICDeclareDataAPI
            )?.cic_identity_info?.map((iden) =>
              iden.uuid === identityActive
                ? {
                    ...iden,
                    // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                    credit_score_info: { ...iden.credit_score_info },
                    cic_identity_total_loan_amount: {
                      ...iden.cic_identity_total_loan_amount,
                      value: 0,
                    },
                    cic_identity_total_collateral_amount: {
                      ...iden.cic_identity_total_collateral_amount,
                      value: 0,
                    },
                    // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                    cic_identity_credit_institution_info: [],
                  }
                : { ...iden }
            );
          }
        } else if (
          declare === 'co-brw' ||
          declare === 'co-payer' ||
          declare === 'law-rlt' ||
          declare === 'other'
        ) {
          (state.storage.full.data.form.cic_form.other_credit_institution[
            convertDeclare(declare) as keyof ICICOrganAPI
          ].data as ICICDeclareDataAPI[]) = (
            state.storage.full.data.form.cic_form.other_credit_institution[
              convertDeclare(declare) as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI[]
          )?.map((person) =>
            person.person_uuid === personUuid
              ? {
                  ...person,
                  cic_identity_info: person.cic_identity_info.map((iden) =>
                    iden.uuid === identityActive
                      ? {
                          ...iden,
                          // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                          credit_score_info: { ...iden.credit_score_info },
                          cic_identity_total_loan_amount: {
                            ...iden.cic_identity_total_loan_amount,
                            value: 0,
                          },
                          cic_identity_total_collateral_amount: {
                            ...iden.cic_identity_total_collateral_amount,
                            value: 0,
                          },
                          // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                          cic_identity_credit_institution_info: [],
                        }
                      : { ...iden }
                  ),
                }
              : { ...person }
          );
        }
      }
    }
  },

  deleteAllCreditCICLocal(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalAllCreditDeleteInfo>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data:
            x.data.map((d) => {
              if (d.uuid === identityActive) {
                // remove document of current Credit identity
                const idx = x.document_info_list.findIndex(
                  (doc) => _.get(doc, 'customKey.identity') === identityActive
                );
                if (idx !== -1) {
                  x.document_info_list.splice(idx, 1);
                }
                return {
                  ...d,
                  // credit_score_info:  countCredit === 1 ?  {...generateEmptyCreditScoreInfoLocal()} : {...d.credit_score_info},
                  credit_score_info: { ...d.credit_score_info },
                  debtGroup: '',
                  activeCredit: '',
                  totalLoan: 0,
                  totalCollateral: 0,
                  credit: [],
                };
              }
              return { ...d };
            }) ?? [],
        };
      }
      return { ...x };
    });

    // state.storage.cic[organActive === 'other'? 'scb': 'other'].data[declareActive].data
    //   = state.storage.cic[organActive === 'other'? 'scb': 'other'].data[declareActive].data.map(x => {
    //     if (x.person_uuid === positionActive) {
    //       return {
    //         ...x,
    //         data: x.data.map(d => {
    //           if (d.uuid === identityActive) {
    //             return {
    //               ...d,
    //               credit_score_info:  countCredit === 1 ?  {...generateEmptyCreditScoreInfoLocal()} : {...d.credit_score_info},
    //             }
    //           } else return {...d}
    //         }),
    //       }} else return {...x}
    //     })
  },

  deleteCreditCICStoreFull(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalCreditDeleteInfo>
  ) {
    const { organ, declare, personUuid, creditUuid } = action.payload;
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

    const convertDeclare = (declare: string) => {
      return declare === 'other' ? 'others' : declare.replace('-', '_');
    };
    if (state.storage.full.data) {
      if (organ === 'scb') {
        if (declare === 'borrower' || declare === 'marriage') {
          (
            state.storage.full.data.form.cic_form.current_credit_institution[
              declare as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI
          ).cic_identity_info = (
            state.storage.full.data.form.cic_form.current_credit_institution[
              declare as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI
          ).cic_identity_info.map((iden) =>
            iden.uuid === identityActive
              ? {
                  ...iden,
                  // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                  credit_score_info: { ...iden.credit_score_info },
                  cic_identity_total_loan_amount: {
                    ...iden.cic_identity_total_loan_amount,
                    value:
                      iden.cic_identity_total_loan_amount.value -
                      (iden.cic_identity_credit_institution_info.find(
                        (credit) => credit.uuid === creditUuid
                      )?.cic_identity_detail_info.cic_credit_loan_info
                        .cic_credit_loan_total_amount.value ?? 0) -
                      (iden.cic_identity_credit_institution_info.find(
                        (credit) => credit.uuid === creditUuid
                      )?.cic_identity_detail_info.cic_credit_card_info
                        .cic_credit_card_total_amount.value ?? 0),
                  },
                  cic_identity_total_collateral_amount: {
                    ...iden.cic_identity_total_collateral_amount,
                    value:
                      iden.cic_identity_total_collateral_amount.value -
                      (iden.cic_identity_credit_institution_info.find(
                        (credit) => credit.uuid === creditUuid
                      )?.cic_identity_detail_info.cic_credit_collateral_info
                        .cic_credit_collateral_total_amount.value ?? 0),
                  },
                  // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                  cic_identity_credit_institution_info: [
                    ...iden.cic_identity_credit_institution_info.filter(
                      (credit) => credit.uuid !== creditUuid
                    ),
                  ],
                }
              : { ...iden }
          );

          // if(countCredit === 1){
          //   (state.storage.full.data.form.cic_form.other_credit_institution[declare as keyof ICICOrganAPI].data as ICICDeclareDataAPI).cic_identity_info =
          //   (state.storage.full.data.form.cic_form.other_credit_institution[declare as keyof ICICOrganAPI].data as ICICDeclareDataAPI).cic_identity_info
          //     .map(iden => (iden.uuid === identityActive ? {
          //       ...iden,
          //       credit_score_info: {...generateEmptyCreditScoreInfoApi()}
          //     } : {...iden}
          //   ))
          // }
        } else if (
          declare === 'co-brw' ||
          declare === 'co-payer' ||
          declare === 'law-rlt' ||
          declare === 'other'
        ) {
          (state.storage.full.data.form.cic_form.current_credit_institution[
            convertDeclare(declare) as keyof ICICOrganAPI
          ].data as ICICDeclareDataAPI[]) = (
            state.storage.full.data.form.cic_form.current_credit_institution[
              convertDeclare(declare) as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI[]
          ).map((person) =>
            person.person_uuid === personUuid
              ? {
                  ...person,
                  cic_identity_info: person.cic_identity_info.map((iden) =>
                    iden.uuid === identityActive
                      ? {
                          ...iden,
                          credit_score_info: { ...iden.credit_score_info },
                          cic_identity_total_loan_amount: {
                            ...iden.cic_identity_total_loan_amount,
                            value:
                              iden.cic_identity_total_loan_amount.value -
                              (iden.cic_identity_credit_institution_info.find(
                                (credit) => credit.uuid === creditUuid
                              )?.cic_identity_detail_info.cic_credit_loan_info
                                .cic_credit_loan_total_amount.value ?? 0) -
                              (iden.cic_identity_credit_institution_info.find(
                                (credit) => credit.uuid === creditUuid
                              )?.cic_identity_detail_info.cic_credit_card_info
                                .cic_credit_card_total_amount.value ?? 0),
                          },
                          cic_identity_total_collateral_amount: {
                            ...iden.cic_identity_total_collateral_amount,
                            value:
                              iden.cic_identity_total_collateral_amount.value -
                              (iden.cic_identity_credit_institution_info.find(
                                (credit) => credit.uuid === creditUuid
                              )?.cic_identity_detail_info
                                .cic_credit_collateral_info
                                .cic_credit_collateral_total_amount.value ?? 0),
                          },
                          // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                          cic_identity_credit_institution_info: [
                            ...iden.cic_identity_credit_institution_info.filter(
                              (credit) => credit.uuid !== creditUuid
                            ),
                          ],
                        }
                      : { ...iden }
                  ),
                }
              : { ...person }
          );

          // if(countCredit === 1){
          //   (state.storage.full.data.form.cic_form.other_credit_institution[convertDeclare(declare) as keyof ICICOrganAPI].data as ICICDeclareDataAPI[]) =
          //   (state.storage.full.data.form.cic_form.other_credit_institution[convertDeclare(declare) as keyof ICICOrganAPI].data as ICICDeclareDataAPI[]).map(person => (
          //     person.person_uuid === personUuid ? {
          //         ...person,
          //         cic_identity_info: person.cic_identity_info.map(iden => (iden.uuid === identityActive ?
          //           {
          //             ...iden,
          //             credit_score_info: {...generateEmptyCreditScoreInfoApi()}
          //           } : {...iden}
          //       ))
          //     } : {...person}
          //   ))
          // }
        }
      } else {
        if (declare === 'borrower' || declare === 'marriage') {
          (
            state.storage.full.data.form.cic_form.other_credit_institution[
              declare as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI
          ).cic_identity_info = (
            state.storage.full.data.form.cic_form.other_credit_institution[
              declare as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI
          ).cic_identity_info.map((iden) =>
            iden.uuid === identityActive
              ? {
                  ...iden,
                  // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                  credit_score_info: { ...iden.credit_score_info },
                  cic_identity_total_loan_amount: {
                    ...iden.cic_identity_total_loan_amount,
                    value:
                      iden.cic_identity_total_loan_amount.value -
                      (iden.cic_identity_credit_institution_info.find(
                        (credit) => credit.uuid === creditUuid
                      )?.cic_identity_detail_info.cic_credit_loan_info
                        .cic_credit_loan_total_amount.value ?? 0) -
                      (iden.cic_identity_credit_institution_info.find(
                        (credit) => credit.uuid === creditUuid
                      )?.cic_identity_detail_info.cic_credit_card_info
                        .cic_credit_card_total_amount.value ?? 0),
                  },
                  cic_identity_total_collateral_amount: {
                    ...iden.cic_identity_total_collateral_amount,
                    value:
                      iden.cic_identity_total_collateral_amount.value -
                      (iden.cic_identity_credit_institution_info.find(
                        (credit) => credit.uuid === creditUuid
                      )?.cic_identity_detail_info.cic_credit_collateral_info
                        .cic_credit_collateral_total_amount.value ?? 0),
                  },
                  // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                  cic_identity_credit_institution_info: [
                    ...iden.cic_identity_credit_institution_info.filter(
                      (credit) => credit.uuid !== creditUuid
                    ),
                  ],
                }
              : { ...iden }
          );

          // if(countCredit === 1){
          //   (state.storage.full.data.form.cic_form.current_credit_institution[declare as keyof ICICOrganAPI].data as ICICDeclareDataAPI).cic_identity_info =
          //   (state.storage.full.data.form.cic_form.current_credit_institution[declare as keyof ICICOrganAPI].data as ICICDeclareDataAPI).cic_identity_info
          //     .map(iden => (iden.uuid === identityActive ? {
          //       ...iden,
          //       credit_score_info: {...generateEmptyCreditScoreInfoApi()}
          //     } : {...iden}
          //   ))
          // }
        } else if (
          declare === 'co-brw' ||
          declare === 'co-payer' ||
          declare === 'law-rlt' ||
          declare === 'other'
        ) {
          (state.storage.full.data.form.cic_form.other_credit_institution[
            convertDeclare(declare) as keyof ICICOrganAPI
          ].data as ICICDeclareDataAPI[]) = (
            state.storage.full.data.form.cic_form.other_credit_institution[
              convertDeclare(declare) as keyof ICICOrganAPI
            ].data as ICICDeclareDataAPI[]
          ).map((person) =>
            person.person_uuid === personUuid
              ? {
                  ...person,
                  cic_identity_info: person.cic_identity_info.map((iden) =>
                    iden.uuid === identityActive
                      ? {
                          ...iden,
                          // credit_score_info: countCredit === 1 ? {...generateEmptyCreditScoreInfoApi()} : {...iden.credit_score_info},
                          credit_score_info: { ...iden.credit_score_info },
                          cic_identity_total_loan_amount: {
                            ...iden.cic_identity_total_loan_amount,
                            value:
                              iden.cic_identity_total_loan_amount.value -
                              (iden.cic_identity_credit_institution_info.find(
                                (credit) => credit.uuid === creditUuid
                              )?.cic_identity_detail_info.cic_credit_loan_info
                                .cic_credit_loan_total_amount.value ?? 0) -
                              (iden.cic_identity_credit_institution_info.find(
                                (credit) => credit.uuid === creditUuid
                              )?.cic_identity_detail_info.cic_credit_card_info
                                .cic_credit_card_total_amount.value ?? 0),
                          },
                          cic_identity_total_collateral_amount: {
                            ...iden.cic_identity_total_collateral_amount,
                            value:
                              iden.cic_identity_total_collateral_amount.value -
                              (iden.cic_identity_credit_institution_info.find(
                                (credit) => credit.uuid === creditUuid
                              )?.cic_identity_detail_info
                                .cic_credit_collateral_info
                                .cic_credit_collateral_total_amount.value ?? 0),
                          },
                          // cic_identity_debt_group: iden.cic_identity_credit_institution_info.length === 1 ? {id: '', code: '', name: ''} : {...iden.cic_identity_debt_group},
                          cic_identity_credit_institution_info: [
                            ...iden.cic_identity_credit_institution_info.filter(
                              (credit) => credit.uuid !== creditUuid
                            ),
                          ],
                        }
                      : { ...iden }
                  ),
                }
              : { ...person }
          );

          // if(countCredit === 1){
          //   (state.storage.full.data.form.cic_form.current_credit_institution[convertDeclare(declare) as keyof ICICOrganAPI].data as ICICDeclareDataAPI[]) =
          //   (state.storage.full.data.form.cic_form.current_credit_institution[convertDeclare(declare) as keyof ICICOrganAPI].data as ICICDeclareDataAPI[]).map(person => (
          //     person.person_uuid === personUuid ? {
          //         ...person,
          //         cic_identity_info: person.cic_identity_info.map(iden => (iden.uuid === identityActive ?
          //           {
          //             ...iden,
          //             credit_score_info: {...generateEmptyCreditScoreInfoApi()}
          //           } : {...iden}
          //       ))
          //     } : {...person}
          //   ))
          // }
        }
      }
    }
  },
  deleteCreditCICLocal(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    // const countCredit = (state.storage.cic[organActive]?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data?.find(iden => iden.uuid === identityActive)?.credit?.length ?? 0)
    //                      + (state.storage.cic[organActive === 'scb' ? "other" : 'scb']?.data[declareActive]?.data.find(x=>x.person_uuid === positionActive)?.data?.find(iden => iden.uuid === identityActive)?.credit?.length ?? 0)

    // const uuid = state.storage.cic[organActive]?.data[declareActive]?.data.find(x => x.person_uuid === positionActive)?.data
    //   ?.find(i => i.identity_num === identityActive)?.activeCredit ?? '';
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data:
            x.data.map((d) => {
              if (d.uuid === identityActive) {
                // remove document of current Credit identity
                const currentCreditUUID = _.get(
                  d.credit,
                  [action.payload, 'uuid'],
                  ''
                );
                const idx = x.document_info_list.findIndex(
                  (doc) =>
                    _.get(doc, 'customKey.identity') === identityActive &&
                    _.get(doc, 'customKey.credit') === currentCreditUUID
                );
                if (idx !== -1) {
                  x.document_info_list.splice(idx, 1);
                }

                if (d?.credit?.length === 1) {
                  return {
                    ...d,
                    // credit_score_info:  countCredit === 1 ?  {...generateEmptyCreditScoreInfoLocal()} : {...d.credit_score_info},
                    credit_score_info: { ...d.credit_score_info },
                    debtGroup: '',
                    activeCredit: '',
                    totalLoan: 0,
                    totalCollateral: 0,
                    credit: [],
                  };
                } else {
                  const listCredit = d.credit?.splice(action.payload, 1);
                  if (listCredit[0]?.uuid !== d.activeCredit) {
                    return {
                      ...d,
                      totalLoan:
                        d.totalLoan !== null
                          ? d.totalLoan -
                            (listCredit[0]?.detail?.loan?.total_amount ?? 0) -
                            (listCredit[0]?.detail?.card?.total_amount ?? 0)
                          : 0,
                      totalCollateral:
                        d.totalCollateral !== null
                          ? d.totalCollateral -
                            (listCredit[0]?.detail?.collateral?.total_amount ??
                              0)
                          : 0,
                      credit: [...d.credit],
                    };
                  } else {
                    return {
                      ...d,
                      activeCredit: d?.credit[d.credit.length - 1]?.uuid,
                      totalLoan:
                        d.totalLoan !== null
                          ? d.totalLoan -
                            (listCredit[0]?.detail?.loan?.total_amount ?? 0) -
                            (listCredit[0]?.detail?.card?.total_amount ?? 0)
                          : 0,
                      totalCollateral:
                        d.totalCollateral !== null
                          ? d.totalCollateral -
                            (listCredit[0]?.detail?.collateral?.total_amount ??
                              0)
                          : 0,
                      credit: [...d.credit],
                    };
                  }
                }
              }
              return { ...d };
            }) ?? [],
        };
      }
      return { ...x };
    });

    // state.storage.cic[organActive === 'other'? 'scb': 'other'].data[declareActive].data
    //   = state.storage.cic[organActive === 'other'? 'scb': 'other'].data[declareActive].data.map(x => {
    //     if (x.person_uuid === positionActive) {
    //       return {
    //         ...x,
    //         data: x.data.map(d => {
    //           if (d.uuid === identityActive) {
    //             return {
    //               ...d,
    //               credit_score_info:  countCredit === 1 ?  {...generateEmptyCreditScoreInfoLocal()} : {...d.credit_score_info},
    //             }
    //           } else return {...d}
    //         }),
    //       }} else return {...x}
    //     })
  },

  generateEmptyCreditSCB(state: Draft<ILOANNormalState>) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    // const uuid = state.storage.cic[organActive]?.data[declareActive]?.data.find(x => x.person_uuid === positionActive)?.data
    //   ?.find(i => i.identity_num === identityActive)?.activeCredit ?? '';
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data:
            x.data.map((d) => {
              if (d.uuid === identityActive) {
                const uuidAc = generateLOCALUUID();
                return {
                  ...d,
                  activeCredit: uuidAc,
                  credit: [
                    {
                      uuid: uuidAc,
                      uuidRemote: '',
                      code: '79334001',
                      id: 106,
                      detail: {
                        loan: {
                          date: null,
                          active: 'SHORT',
                          list: [
                            {
                              code: 'SHORT',
                              amount: null,
                              expired: null,
                              balance: null,
                              uuid: null,
                              amountCIC: null,
                              balanceCIC: null,
                              note: null,
                            },
                            {
                              code: 'MEDIUM',
                              amount: null,
                              expired: null,
                              balance: null,
                              uuid: null,
                              amountCIC: null,
                              balanceCIC: null,
                              note: null,
                            },
                            {
                              code: 'LONG',
                              amount: null,
                              expired: null,
                              balance: null,
                              uuid: null,
                              amountCIC: null,
                              balanceCIC: null,
                              note: null,
                            },
                            {
                              code: 'NOT_DISBURSED',
                              amount: null,
                              expired: null,
                              balance: null,
                              uuid: null,
                              amountCIC: null,
                              balanceCIC: null,
                              note: null,
                            },
                            {
                              code: 'OTHER',
                              amount: null,
                              expired: null,
                              balance: null,
                              uuid: null,
                              amountCIC: null,
                              balanceCIC: null,
                              note: null,
                            },
                          ],
                          last_update: null,
                          total_amount: null,
                        },
                        card: {
                          date: null,
                          active: '',
                          list: [],
                          last_update: null,
                          total_amount: null,
                        },
                        collateral: {
                          date: null,
                          active: '',
                          list: [],
                          last_update: null,
                          total_amount: null,
                        },
                      },
                    },
                  ],
                };
              }
              return { ...d };
            }) ?? [],
        };
      }
      return { ...x };
    });
  },

  setCICScore: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null,
        string,
        {
          key: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position;
      const identityActive = state.storage.cic[organActive]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

      // const isExist = state.storage.cic[organActive]?.data[declareActive]?.data
      //   ?.find(x => x.person_uuid === positionActive)?.data
      //   ?.find(a => a.identity_num === identityActive)?.credit_score_info;

      let value = '';
      if (action.meta.key === 'score_value') {
        const data = Number(action.payload);
        if (data >= 0 && data < 430) {
          value = '10';
        } else if (data >= 430 && data < 455) {
          value = '09';
        } else if (data >= 455 && data < 480) {
          value = '08';
        } else if (data >= 480 && data < 545) {
          value = '07';
        } else if (data >= 545 && data < 572) {
          value = '06';
        } else if (data >= 572 && data < 588) {
          value = '05';
        } else if (data >= 588 && data < 606) {
          value = '04';
        } else if (data >= 606 && data < 622) {
          value = '03';
        } else if (data >= 622 && data < 645) {
          value = '02';
        } else {
          value = '01';
        }
      }

      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive]?.data[declareActive]?.data?.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              data:
                x.data.map((d) => {
                  if (action.meta.key === 'score_value') {
                    return d.uuid === identityActive
                      ? {
                          ...d,
                          credit_score_info: {
                            ...d?.credit_score_info,
                            risk_info: {
                              ...d?.credit_score_info?.risk_info,
                              score_rank: value,
                              [action.meta.key]: Number(action.payload),
                            },
                          },
                        }
                      : { ...d };
                  } else {
                    return d.uuid === identityActive
                      ? {
                          ...d,
                          credit_score_info: {
                            ...d?.credit_score_info,
                            risk_info: {
                              ...d?.credit_score_info?.risk_info,
                              [action.meta.key]: action.payload,
                            },
                          },
                        }
                      : { ...d };
                  }
                }) ?? [],
            };
          }
          return { ...x };
        });

      state.storage.cic[organActive === 'other' ? 'scb' : 'other'].data[
        declareActive
      ].data = state.storage.cic[
        organActive === 'other' ? 'scb' : 'other'
      ].data[declareActive].data.map((x) => {
        if (x.person_uuid === positionActive) {
          return {
            ...x,
            data:
              x.data.map((d) => {
                if (action.meta.key === 'score_value') {
                  return d.uuid === identityActive
                    ? {
                        ...d,
                        credit_score_info: {
                          ...d?.credit_score_info,
                          risk_info: {
                            ...d?.credit_score_info?.risk_info,
                            score_rank: value,
                            [action.meta.key]: Number(action.payload),
                          },
                        },
                      }
                    : { ...d };
                } else {
                  return d.uuid === identityActive
                    ? {
                        ...d,
                        credit_score_info: {
                          ...d?.credit_score_info,
                          risk_info: {
                            ...d?.credit_score_info?.risk_info,
                            [action.meta.key]: action.payload,
                          },
                        },
                      }
                    : { ...d };
                }
              }) ?? [],
          };
        }
        return { ...x };
      });
    },
    prepare(
      payload: string | number | null,
      meta: {
        key: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setCustomerSegment: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<string[], string, keyof ILOANNormalStorageCICOther>
    ) {
      const declareActive = state.storage.cic[action.meta]
        ?.declareActive as keyof ILOANNormalStorageCICOrganData;
      const positionActive =
        state.storage.cic[action.meta]?.data[declareActive]?.position ?? 0;
      const identityActive = state.storage.cic[action.meta]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;

      state.storage.cic[action.meta].data[declareActive].data =
        state.storage.cic[action.meta].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              data: x.data.map((d) => {
                if (d.uuid === identityActive) {
                  return {
                    ...d,
                    credit_score_info: {
                      ...d?.credit_score_info,
                      risk_info: {
                        ...d?.credit_score_info?.risk_info,
                        customer_segment: [...action.payload],
                      },
                    },
                  };
                }
                return { ...d };
              }),
            };
          }
          return { ...x };
        });

      state.storage.cic[action.meta === 'other' ? 'scb' : 'other'].data[
        declareActive
      ].data = state.storage.cic[
        action.meta === 'other' ? 'scb' : 'other'
      ].data[declareActive].data.map((x) => {
        if (x.person_uuid === positionActive) {
          return {
            ...x,
            data: x.data.map((d) => {
              if (d.uuid === identityActive) {
                return {
                  ...d,
                  credit_score_info: {
                    ...d?.credit_score_info,
                    risk_info: {
                      ...d?.credit_score_info?.risk_info,
                      customer_segment: [...action.payload],
                    },
                  },
                };
              }
              return { ...d };
            }),
          };
        }
        return { ...x };
      });
    },
    prepare(payload: string[], meta: keyof ILOANNormalStorageCICOther) {
      return { payload, meta };
    },
  },

  setAmountDateInfo: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null | string,
        string,
        {
          key: string;
          typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      const identityActive = state.storage.cic[organActive]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
      if (state.storage?.cic[organActive]?.data[declareActive]?.data) {
        state.storage.cic[organActive].data[declareActive].data =
          state.storage.cic[organActive]?.data[declareActive]?.data?.map(
            (x) => {
              if (x.person_uuid === positionActive) {
                return {
                  ...x,
                  data: x.data.map((d) => {
                    if (d.uuid === identityActive) {
                      return {
                        ...d,
                        credit: d.credit.map((c) => {
                          if (c.uuid === d.activeCredit) {
                            switch (action.meta.typeLoan) {
                              case 'loan':
                                return {
                                  ...c,
                                  detail: {
                                    ...c.detail,
                                    loan: {
                                      ...c.detail.loan,
                                      [action.meta.key]: action.payload,
                                    },
                                  },
                                };
                              case 'card':
                                return {
                                  ...c,
                                  detail: {
                                    ...c.detail,
                                    card: {
                                      ...c.detail.card,
                                      [action.meta.key]: action.payload,
                                    },
                                  },
                                };
                              case 'collateral':
                                return {
                                  ...c,
                                  detail: {
                                    ...c.detail,
                                    collateral: {
                                      ...c.detail.collateral,
                                      [action.meta.key]: action.payload,
                                    },
                                  },
                                };
                              default:
                                break;
                            }
                          }
                          return { ...c };
                        }),
                      };
                    }
                    return { ...d };
                  }),
                };
              }
              return { ...x };
            }
          );

        state.storage.cic[organActive].data[declareActive].data =
          state.storage.cic[organActive]?.data[declareActive]?.data?.map(
            (x) => {
              if (x.person_uuid === positionActive) {
                return {
                  ...x,
                  data: x.data.map((d) => {
                    if (d.uuid === identityActive) {
                      return {
                        ...d,
                        totalLoan: d.credit.reduce((preCre, curCre) => {
                          return (
                            preCre +
                            (curCre?.detail?.card?.total_amount ?? 0) +
                            (curCre?.detail?.loan?.total_amount ?? 0)
                          );
                        }, 0),
                        totalCollateral: d.credit.reduce((preCre, curCre) => {
                          return (
                            preCre +
                            (curCre?.detail?.collateral?.total_amount ?? 0)
                          );
                        }, 0),
                      };
                    }
                    return { ...d };
                  }),
                };
              }
              return { ...x };
            }
          );
      }
    },

    prepare(
      payload: number | null | string,
      meta: {
        key: string;
        typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup;
      }
    ) {
      return { payload, meta };
    },
  },
  setCICCollateralCode: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          key: string;
          typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      const identityActive = state.storage.cic[organActive]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              data: x.data.map((d) => {
                if (d.uuid === identityActive) {
                  return {
                    ...d,
                    credit: d.credit.map((c) => {
                      if (c.uuid === d.activeCredit) {
                        return {
                          ...c,
                          detail: {
                            ...c.detail,
                            collateral: {
                              ...c.detail.collateral,
                              list: c.detail?.collateral?.list?.map((l) => {
                                if (l.uuid === c.detail.collateral.active) {
                                  return {
                                    ...l,
                                    [action.meta.key]: action.payload,
                                  };
                                }
                                return { ...l };
                              }),
                            },
                          },
                        };
                      }
                      return { ...c };
                    }),
                  };
                }
                return { ...d };
              }),
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: string,
      meta: {
        key: string;
        typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup;
      }
    ) {
      return { payload, meta };
    },
  },
  setCICDetailLoanInfo: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | string | null,
        string,
        {
          key: string;
          typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup;
          organ: keyof ILOANNormalStorageCICOther;
          declare: keyof ILOANNormalStorageCICOrgan;
          personUuid: string;
          identityUuid: string;
          creditUuid: string;
          loanActive?: string;
          cardActive?: string;
          collateralActive?: string;
        }
      >
    ) {
      const {
        key,
        typeLoan,
        organ,
        declare,
        personUuid,
        identityUuid,
        creditUuid,
        loanActive,
        cardActive,
        collateralActive,
      } = action.meta;

      state.storage.cic[organ].data[declare].data = state.storage.cic[
        organ
      ].data[declare].data.map((x) => {
        if (x.person_uuid === personUuid) {
          return {
            ...x,
            data: x.data.map((d) => {
              if (d.uuid === identityUuid) {
                return {
                  ...d,
                  credit: d.credit.map((c) => {
                    if (c.uuid === creditUuid) {
                      switch (typeLoan) {
                        case 'loan':
                          return {
                            ...c,
                            detail: {
                              ...c.detail,
                              loan: {
                                ...c.detail.loan,
                                list: c.detail.loan.list.map((l) => {
                                  if (l.code === loanActive) {
                                    return {
                                      ...l,
                                      [key]: action.payload,
                                    };
                                  }
                                  return { ...l };
                                }),
                              },
                            },
                          };
                        case 'card':
                          return {
                            ...c,
                            detail: {
                              ...c.detail,
                              card: {
                                ...c.detail?.card,
                                list: c.detail?.card?.list?.map((l) => {
                                  if (l.uuid === cardActive) {
                                    return {
                                      ...l,
                                      [key]: action.payload,
                                    };
                                  }
                                  return { ...l };
                                }),
                              },
                            },
                          };
                        case 'collateral':
                          return {
                            ...c,
                            detail: {
                              ...c.detail,
                              collateral: {
                                ...c.detail.collateral,
                                list: c.detail?.collateral?.list?.map((l) => {
                                  if (l.uuid === collateralActive) {
                                    return {
                                      ...l,
                                      [key]: action.payload,
                                    };
                                  }
                                  return { ...l };
                                }),
                              },
                            },
                          };
                        default:
                          break;
                      }
                    }
                    return { ...c };
                  }),
                };
              }
              return { ...d };
            }),
          };
        }
        return { ...x };
      });

      if (key === 'balance' || key === 'value') {
        state.storage.cic[organ].data[declare].data = state.storage.cic[
          organ
        ]?.data[declare]?.data?.map((x) => {
          if (x.person_uuid === personUuid) {
            return {
              ...x,
              data: x.data?.map((d) => {
                if (d.uuid === identityUuid) {
                  return {
                    ...d,
                    credit: d?.credit?.map((cre) => ({
                      ...cre,
                      detail: {
                        ...cre.detail,
                        card: {
                          ...cre.detail.card,
                          total_amount: cre.detail?.card?.list?.reduce(
                            (pre, cur) => {
                              return pre + (cur.balance ?? 0);
                            },
                            0
                          ),
                        },
                        loan: {
                          ...cre.detail.loan,
                          total_amount: cre.detail?.loan?.list?.reduce(
                            (pre, cur) => {
                              return pre + (cur.balance ?? 0);
                            },
                            0
                          ),
                        },
                        collateral: {
                          ...cre.detail.collateral,
                          total_amount: cre.detail?.collateral?.list?.reduce(
                            (pre, cur) => {
                              return pre + (cur.value ?? 0);
                            },
                            0
                          ),
                        },
                      },
                    })),
                  };
                }
                return { ...d };
              }),
            };
          }
          return { ...x };
        });

        state.storage.cic[organ].data[declare].data = state.storage.cic[
          organ
        ]?.data[declare]?.data?.map((x) => {
          if (x.person_uuid === personUuid) {
            return {
              ...x,
              data: x.data?.map((d) => {
                if (d.uuid === identityUuid) {
                  return {
                    ...d,
                    totalLoan: d.credit.reduce((preCre, curCre) => {
                      return (
                        preCre +
                        (curCre?.detail?.card?.total_amount ?? 0) +
                        (curCre?.detail?.loan?.total_amount ?? 0)
                      );
                    }, 0),
                    totalCollateral: d.credit.reduce((preCre, curCre) => {
                      return (
                        preCre + (curCre?.detail?.collateral?.total_amount ?? 0)
                      );
                    }, 0),
                  };
                }
                return { ...d };
              }),
            };
          }
          return { ...x };
        });
      }
    },
    prepare(
      payload: number | string | null,
      meta: {
        key: string;
        typeLoan: keyof ILOANNormalStorageCICCreditDetailGroup;
        organ: keyof ILOANNormalStorageCICOther;
        declare: keyof ILOANNormalStorageCICOrgan;
        personUuid: string;
        identityUuid: string;
        creditUuid: string;
        loanActive?: string;
        cardActive?: string;
        collateralActive?: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setActiveTerm: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        keyof ILOANNormalStorageCICCreditDetailGroup
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      const identityActive = state.storage.cic[organActive]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              data: x.data.map((d) => {
                if (d.uuid === identityActive) {
                  return {
                    ...d,
                    credit: d.credit?.map((c) => {
                      if (c.uuid === d.activeCredit) {
                        return {
                          ...c,
                          detail: {
                            ...c.detail,
                            [action.meta]: {
                              ...c.detail[action.meta],
                              active: action.payload,
                            },
                          },
                        };
                      }
                      return { ...c };
                    }),
                  };
                }
                return { ...d };
              }),
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: string,
      meta: keyof ILOANNormalStorageCICCreditDetailGroup
    ) {
      return { payload, meta };
    },
  },

  setTotalLoanAmountById: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        number | null,
        string,
        {
          key: string;
          organ: keyof ILOANNormalStorageCICOther;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrganData;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      const identityActive = state.storage.cic[organActive]?.data[
        declareActive
      ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
      ///set total balance Loan, Card, Collateral per Credit

      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              data:
                x.data.map((d) => {
                  if (d.uuid === identityActive) {
                    return {
                      ...d,
                      [action.meta.key]: action.payload,
                    };
                  }
                  return { ...d };
                }) ?? [],
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: number | null,
      meta: {
        key: string;
        organ: keyof ILOANNormalStorageCICOther;
      }
    ) {
      return { payload, meta };
    },
  },

  saveCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        boolean,
        string,
        {
          organ: string;
          position: string;
        }
      >
    ) {},
    prepare(
      payload: boolean,
      meta: {
        organ: string;
        position: string;
      }
    ) {
      return { payload, meta };
    },
  },

  handleContinueCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<number, string, { organ: string; position: string }>
    ) {},
    prepare(
      payload: number,
      meta: {
        organ: string;
        position: string;
      }
    ) {
      return { payload, meta };
    },
  },

  fetchDataCICAfterSave(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<boolean>
  ) {},

  addCICCreditCard(state: Draft<ILOANNormalState>) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    const card = getEmptyLOANNormalCICCard();
                    return {
                      ...c,
                      detail: {
                        ...c.detail,
                        card: {
                          ...c.detail.card,
                          active: card.uuid,
                          list: [...c.detail.card.list, { ...card }],
                        },
                      },
                    };
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },

  addCICCreditCollateral(state: Draft<ILOANNormalState>) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    const collateral = getEmptyLOANNormalCICCollateral();
                    return {
                      ...c,
                      detail: {
                        ...c.detail,
                        collateral: {
                          ...c.detail.collateral,
                          active: collateral.uuid,
                          list: [
                            ...c.detail.collateral.list,
                            { ...collateral },
                          ],
                        },
                      },
                    };
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },
  updateLegalToCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        | ILOANNormalLegalBorrower
        | ILOANNormalLegalBorrower[]
        | ILOANNormalLegalReLrt[],
        string,
        string
      >
    ) {
      switch (action.meta) {
        case 'BORROWER':
          {
            const currentOtherData = state.storage.cic.other.data['borrower'];
            const newData = [action.payload as ILOANNormalLegalBorrower];

            state.storage.cic.other.data['borrower'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentOtherData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
            const currentScbData = state.storage.cic.scb.data['borrower'];

            state.storage.cic.scb.data['borrower'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentScbData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
          }
          break;
        case 'MARRIAGE':
          {
            const currentOtherData = state.storage.cic.other.data['marriage'];
            const newData = [action.payload as ILOANNormalLegalBorrower];

            state.storage.cic.other.data['marriage'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentOtherData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
            const currentScbData = state.storage.cic.scb.data['marriage'];

            state.storage.cic.scb.data['marriage'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentScbData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
          }
          break;
        case 'CO_BRW':
          {
            const currentOtherData = state.storage.cic.other.data['co-brw'];
            const newData = action.payload as ILOANNormalLegalBorrower[];

            state.storage.cic.other.data['co-brw'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentOtherData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
            const currentScbData = state.storage.cic.scb.data['co-brw'];

            state.storage.cic.scb.data['co-brw'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentScbData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
          }
          break;
        case 'CO_PAYER':
          {
            const currentOtherData = state.storage.cic.other.data['co-payer'];
            const newData = action.payload as ILOANNormalLegalBorrower[];

            state.storage.cic.other.data['co-payer'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentOtherData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
            const currentScbData = state.storage.cic.scb.data['co-payer'];

            state.storage.cic.scb.data['co-payer'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentScbData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
          }
          break;
        case 'LAW_RLT':
          {
            const currentOtherData = state.storage.cic.other.data['law-rlt'];
            const newData = action.payload as ILOANNormalLegalReLrt[];

            state.storage.cic.other.data['law-rlt'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentOtherData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.uuid ?? '',
                      data: [newPerson?.identity_info]?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        [newPerson.identity_info]
                      ),
                    };
                }) ?? [],
            };
            const currentScbData = state.storage.cic.scb.data['law-rlt'];

            state.storage.cic.scb.data['law-rlt'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentScbData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.uuid ?? '',
                      data: [newPerson?.identity_info]?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        [newPerson.identity_info]
                      ),
                    };
                }) ?? [],
            };
          }
          break;
        case 'OTHER':
          {
            const currentOtherData = state.storage.cic.other.data['other'];
            const newData = action.payload as ILOANNormalLegalBorrower[];

            state.storage.cic.other.data['other'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentOtherData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
            const currentScbData = state.storage.cic.scb.data['other'];

            state.storage.cic.scb.data['other'] = {
              position: newData[0]?.basic_info?.uuid ?? '',
              data:
                newData?.map((newPerson) => {
                  const currentPerson = currentScbData?.data?.find(
                    (curPerson) =>
                      curPerson.person_uuid === newPerson.basic_info.uuid
                  );
                  if (currentPerson) {
                    return {
                      ...currentPerson,
                      full_name: newPerson?.basic_info?.full_name,
                      identityActive: currentPerson?.identityActive
                        ? currentPerson?.identityActive
                        : newPerson?.identity_info?.find(
                            (iden) => iden.primary_flag
                          )?.uuid ?? '',
                      data: newPerson?.identity_info?.map((newIden) => {
                        const currentIden = currentPerson?.data?.find(
                          (iden) => iden.uuid === newIden.uuid
                        );
                        if (currentIden) {
                          return {
                            ...currentIden,
                            identity_num: newIden.identity_num,
                            identity_type: newIden.identity_type.id,
                            is_primary: newIden.primary_flag,
                          };
                        } else
                          return {
                            ...generateLOANNormalCICIdentity(
                              newIden.identity_num,
                              newIden.identity_type.id,
                              newIden.uuid,
                              newIden.primary_flag
                            ),
                          };
                      }),
                    };
                  } else
                    return {
                      ...generateLOANNormalCICPerson(
                        newPerson.basic_info.uuid,
                        newPerson.basic_info.full_name,
                        newPerson.identity_info
                      ),
                    };
                }) ?? [],
            };
          }
          break;
        default:
          break;
      }
    },
    prepare(
      payload:
        | ILOANNormalLegalBorrower
        | ILOANNormalLegalBorrower[]
        | ILOANNormalLegalReLrt[],
      meta: string
    ) {
      return { payload, meta };
    },
  },

  mapIdentityToCIC(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILoanNormalLegalAPI>
  ) {
    let newData: ILOANNormalStorageCICOrganData = {};

    ['borrower', 'marriage', 'co-brw', 'co-payer', 'law-rlt', 'other'].forEach(
      (key) => {
        switch (key) {
          case 'borrower':
            if (!!action.payload.data[key]) {
              newData[key] = {
                position:
                  (action.payload.data[key] as ILOANNormalLegalBor)?.basic_info
                    ?.uuid ?? '',
                data: [
                  {
                    identityActive:
                      (
                        action.payload.data[key] as ILOANNormalLegalBor
                      )?.identity_info?.find((iden) => iden.primary_flag)
                        ?.uuid ?? '',
                    person_uuid: (
                      action.payload.data[key] as ILOANNormalLegalBor
                    )?.basic_info?.uuid,
                    full_name: (action.payload.data[key] as ILOANNormalLegalBor)
                      ?.basic_info?.full_name,
                    document_info_list: [],
                    data: [
                      ...(
                        action.payload?.data[key] as ILOANNormalLegalBor
                      )?.identity_info?.map((iden) => ({
                        ...generateLOANNormalCICIdentity(
                          iden?.identity_num ?? '',
                          iden?.identity_type.code ?? '',
                          iden?.uuid ?? '',
                          iden?.primary_flag
                        ),
                      })),
                    ],
                  },
                ],
              };
            }
            break;
          case 'marriage':
            if (!!action.payload.data[key]) {
              newData[key] = {
                position:
                  (action.payload.data[key] as ILOANNormalLegalBorrower)
                    ?.basic_info?.uuid ?? '',
                data: (action.payload.data[key] as ILOANNormalLegalBorrower)
                  ?.basic_info?.uuid
                  ? [
                      {
                        identityActive:
                          (
                            action.payload.data[key] as ILOANNormalLegalBorrower
                          )?.identity_info?.find((iden) => iden.primary_flag)
                            ?.uuid ?? '',
                        person_uuid: (
                          action.payload.data[key] as ILOANNormalLegalBorrower
                        )?.basic_info?.uuid,
                        full_name: (
                          action.payload.data[key] as ILOANNormalLegalBorrower
                        )?.basic_info?.full_name,
                        document_info_list: [],
                        data: (
                          action.payload.data[key] as ILOANNormalLegalBorrower
                        )?.identity_info?.map((iden) => ({
                          ...generateLOANNormalCICIdentity(
                            iden?.identity_num ?? '',
                            iden?.identity_type?.code ?? '',
                            iden?.uuid ?? '',
                            iden?.primary_flag
                          ),
                        })),
                      },
                    ]
                  : [],
              };
            }
            break;
          case 'co-brw':
            if (!!action.payload.data['co_brw']) {
              newData[key] = {
                position:
                  (
                    action.payload.data['co_brw'] as ILOANNormalLegalBorrower[]
                  )[0]?.basic_info?.uuid ?? '',
                data: [
                  ...(
                    action.payload.data['co_brw'] as ILOANNormalLegalBorrower[]
                  )?.map((person) => ({
                    identityActive:
                      person?.identity_info?.find((iden) => iden.primary_flag)
                        ?.uuid ?? '',
                    person_uuid: person?.basic_info?.uuid,
                    full_name: person?.basic_info?.full_name,
                    document_info_list: [],
                    data: [
                      ...person?.identity_info?.map((iden) => ({
                        ...generateLOANNormalCICIdentity(
                          iden?.identity_num ?? '',
                          iden?.identity_type?.code ?? '',
                          iden?.uuid ?? '',
                          iden?.primary_flag
                        ),
                      })),
                    ],
                  })),
                ],
              };
            }
            break;
          case 'co-payer':
            if (!!action.payload.data['co_payer']) {
              newData[key] = {
                position:
                  (
                    action.payload.data[
                      'co_payer'
                    ] as ILOANNormalLegalBorrower[]
                  )[0]?.basic_info?.uuid ?? '',
                data: [
                  ...(
                    action.payload.data[
                      'co_payer'
                    ] as ILOANNormalLegalBorrower[]
                  )?.map((person) => ({
                    identityActive:
                      person?.identity_info?.find((iden) => iden.primary_flag)
                        ?.uuid ?? '',
                    person_uuid: person?.basic_info?.uuid,
                    full_name: person?.basic_info?.full_name,
                    document_info_list: [],
                    data: [
                      ...person?.identity_info?.map((iden) => ({
                        ...generateLOANNormalCICIdentity(
                          iden?.identity_num ?? '',
                          iden?.identity_type?.code ?? '',
                          iden?.uuid ?? '',
                          iden?.primary_flag
                        ),
                      })),
                    ],
                  })),
                ],
              };
            }
            break;
          case 'law-rlt':
            if (!!action.payload.data['law_rlt']) {
              newData[key] = {
                position:
                  (action.payload.data['law_rlt'] as ILOANNormalLegalReLrt[])[0]
                    ?.basic_info?.uuid ?? '',
                data: [
                  ...(
                    action.payload.data['law_rlt'] as ILOANNormalLegalReLrt[]
                  )?.map((person) => ({
                    identityActive: person?.identity_info?.uuid ?? '',
                    person_uuid: person?.basic_info?.uuid,
                    full_name: person?.basic_info?.full_name,
                    document_info_list: [],
                    data: [
                      {
                        ...generateLOANNormalCICIdentity(
                          person?.identity_info?.identity_num ?? '',
                          person?.identity_info?.identity_type?.code ?? '',
                          person?.identity_info?.uuid ?? '',
                          person?.identity_info?.primary_flag
                        ),
                      },
                    ],
                  })),
                ],
              };
            }
            break;
          case 'other':
            if (!!action.payload.data['others']) {
              newData[key] = {
                position:
                  (
                    action.payload.data['others'] as ILOANNormalLegalBorrower[]
                  )[0]?.basic_info?.uuid ?? '',
                data: [
                  ...(
                    action.payload.data['others'] as ILOANNormalLegalBorrower[]
                  )?.map((person) => ({
                    identityActive:
                      person?.identity_info?.find((iden) => iden.primary_flag)
                        ?.uuid ?? '',
                    person_uuid: person?.basic_info.uuid,
                    full_name: person?.basic_info.full_name,
                    document_info_list: [],
                    data: [
                      ...person?.identity_info?.map((iden) => ({
                        ...generateLOANNormalCICIdentity(
                          iden?.identity_num,
                          iden?.identity_type?.code,
                          iden?.uuid,
                          iden?.primary_flag
                        ),
                      })),
                    ],
                  })),
                ],
              };
            }
            break;
          default:
            break;
        }
      }
    );

    state.storage.cic = {
      ...state.storage.cic,
      other: {
        ...state.storage.cic.other,
        data: { ...newData },
      },
      scb: {
        ...state.storage.cic.scb,
        data: { ...newData },
      },
      summary: {
        ...state.storage.cic.summary,
        data: { ...newData },
      },
    };
  },

  updateAPIStorageCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<ICICDataAPI, string, string>
    ) {
      const organ = {
        other: 'other_credit_institution',
        scb: 'current_credit_institution',
      };

      const data: typeof state.storage.cic = {
        ...state.storage.cic,
      };
      const mappingDocument = (docs: ICICDocumentInfoAPI[]) => {
        return docs?.map((doc) => {
          let credit = '';
          let identity = '';
          const documentList = doc.document_list?.map((docl) => {
            return {
              // not use prefix local here currently data is server return so that i generate new uuid to handle logic on client
              // uuid:generateLOCALUUID(),
              uuid: generateUUID(),
              document_name: docl.document_name,
              document_code: docl.document_id,
              display_order: docl.display_order,
              document_child_files: docl?.document_child_files?.map(
                (docc, index) => {
                  credit = docc?.custom_keys?.credit ?? '';
                  identity = docc?.custom_keys?.identity ?? '';
                  return {
                    uuid: docc.uuid,
                    name: docc.name,
                    content_type: docc.content_type,
                    display_order: docc.display_order,
                    created_by: docc.created_by,
                    created_by_name: docc.created_by_name,
                    updated_by: docc.updated_by,
                    updated_by_name: docc.updated_by_name,
                    created_at: docc.created_at,
                    updated_at: docc.updated_at,
                    description: docc.description ?? '',
                    file_id: index,
                    file_upload: '',
                    custom_keys: docc.custom_keys,
                  };
                }
              ) as ILOANNormalStorageCICDocumentChildFile[],
              document_id: docl.document_id.toString() ?? '',
              document_child_list:
                [] as ILOANNormalStorageCICDocumentChildList[],
            };
          });
          return {
            // not use prefix local here currently data is server return so that i generate new uuid to handle logic on client
            // uuid:generateLOCALUUID(),
            uuid: generateUUID(),
            document_type_code: doc.document_type_code,
            display_order: doc.display_order,
            document_list: documentList ?? [],
            customKey: { credit, identity },
          };
        }) as [] as ILOANNormalStorageCICDocumentList[];
      };
      const dataO = (o: keyof typeof organ, oAPI: keyof ICICDataAPI) => {
        let dataDEC: ILOANNormalStorageCICOrganData = {};
        [
          'borrower',
          'marriage',
          'co-brw',
          'co-payer',
          'law-rlt',
          'other',
        ].forEach((item) => {
          let value = '';
          switch (item) {
            case 'borrower':
              value = 'borrower';
              break;

            case 'marriage':
              value = 'marriage';
              break;

            case 'co-brw':
              value = 'co_brw';
              break;

            case 'co-payer':
              value = 'co_payer';
              break;

            case 'law-rlt':
              value = 'law_rlt';
              break;

            case 'other':
              value = 'others';
              break;
          }
          // const decAPI = item as keyof ICICOrganAPI;
          const dataDec =
            action.payload[oAPI][value as keyof ICICOrganAPI]?.data;
          const dataChange = Array.isArray(dataDec) ? dataDec : [dataDec];
          // if (!dataChange || dataChange[0] === null || dataChange[0] === undefined) return;
          dataDEC[item] = {
            ...state.storage.cic[o].data[item],
            data: state.storage.cic[o].data[item]?.data?.map((person) => {
              // const positionActiveCIC = state.storage.cic[o].data[item]?.position;
              // const idenActiveStorage = state.storage.cic[o].data[item]?.data.find(x=>x.person_uuid===positionActiveCIC)?.identityActive;
              // const idenActiveAPI = d.cic_identity_info.find(x => x.identity_num === idenActiveStorage)?.identity_num;
              const newPersonData = dataChange?.find(
                (e) => e?.person_uuid === person?.person_uuid
              );
              if (newPersonData) {
                return {
                  ...person,
                  data: person.data?.map((iden, i) => {
                    const newIden = newPersonData?.cic_identity_info.find(
                      (e) => e.uuid === iden.uuid
                    );
                    if (newIden) {
                      return {
                        ...iden,
                        uuidRemote: '',
                        hasCredit: newIden.cic_institution_flag,
                        debtGroup: newIden?.cic_identity_debt_group?.code ?? '',
                        identity_num:
                          !!newIden?.identity_num?.length &&
                          newIden?.identity_num?.length > 0
                            ? iden.identity_num
                            : state.storage.cic[o].data[item]?.data[i]
                                ?.identityActive,
                        identity_type: newIden?.identity_type,
                        activeCredit:
                          newIden?.cic_identity_credit_institution_info[0]
                            ?.uuid ?? '',
                        uuid: newIden?.uuid,
                        credit:
                          newIden?.cic_identity_credit_institution_info.map(
                            (cre) => ({
                              id: cre.credit_institution_id,
                              uuid: cre?.uuid ?? '',
                              uuidRemote: '',
                              code: cre.credit_institution_code,
                              detail: {
                                card: {
                                  date:
                                    Number(
                                      cre.cic_identity_detail_info
                                        .cic_credit_card_info
                                        .cic_credit_card_updated_date
                                    ) * 1000,
                                  active:
                                    cre.cic_identity_detail_info
                                      .cic_credit_card_info
                                      .cic_credit_card_detail_info[0]?.uuid ??
                                    '',
                                  list: cre.cic_identity_detail_info.cic_credit_card_info.cic_credit_card_detail_info?.map(
                                    (a) => ({
                                      uuid: a?.uuid ?? generateLOCALUUID(),
                                      uuidRemote: '',
                                      limited:
                                        a.cic_credit_card_detail_limit.value,
                                      balance:
                                        a.cic_credit_card_detail_balance.value,
                                      limitedCIC: a.cic_credit_card_limit,
                                      balanceCIC: a.cic_credit_card_debit,
                                      note: a.note,
                                    })
                                  ),
                                  total_amount:
                                    cre?.cic_identity_detail_info
                                      ?.cic_credit_card_info
                                      ?.cic_credit_card_total_amount?.value ??
                                    0,
                                },
                                loan: {
                                  date:
                                    (cre.cic_identity_detail_info
                                      .cic_credit_loan_info
                                      .cic_credit_loan_updated_date ?? 0) *
                                    1000,
                                  active: 'SHORT',
                                  list: [
                                    'SHORT',
                                    'MEDIUM',
                                    'LONG',
                                    'NOT_DISBURSED',
                                    'OTHER',
                                  ].map((t) => {
                                    const exist =
                                      cre.cic_identity_detail_info.cic_credit_loan_info.cic_credit_loan_term_info?.find(
                                        (b) => b.cic_loan_term_item_code === t
                                      );
                                    if (exist) {
                                      return {
                                        expired:
                                          exist
                                            .cic_loan_term_credit_monthly_duration
                                            ?.value,
                                        amount:
                                          exist
                                            .cic_loan_term_credit_grant_amount
                                            ?.value,
                                        balance:
                                          exist.cic_loan_term_credit_balance
                                            ?.value,
                                        amountCIC:
                                          exist.cic_loan_term_credit_limit,
                                        balanceCIC: exist.cic_loan_term_debit,
                                        code: t,
                                        uuid: exist.uuid,
                                        note: exist.note,
                                      };
                                    } else {
                                      return {
                                        expired: null,
                                        amount: null,
                                        balance: null,
                                        code: t,
                                        uuid: null,
                                        amountCIC: null,
                                        balanceCIC: null,
                                        note: null,
                                      };
                                    }
                                  }),
                                  total_amount:
                                    cre?.cic_identity_detail_info
                                      ?.cic_credit_loan_info
                                      ?.cic_credit_loan_total_amount?.value ??
                                    0,
                                },
                                collateral: {
                                  date:
                                    Number(
                                      cre.cic_identity_detail_info
                                        .cic_credit_collateral_info
                                        .cic_credit_collateral_updated_date
                                    ) * 1000,
                                  active:
                                    cre.cic_identity_detail_info
                                      .cic_credit_collateral_info
                                      .cic_credit_collateral_detail_info[0]
                                      ?.uuid ?? '',
                                  list: cre.cic_identity_detail_info.cic_credit_collateral_info.cic_credit_collateral_detail_info.map(
                                    (c) => ({
                                      code: c
                                        .cic_credit_collateral_detail_category_info
                                        .code,
                                      uuid: c?.uuid ?? '',
                                      value:
                                        c.cic_credit_collateral_detail_value
                                          .value,
                                    })
                                  ),
                                  total_amount:
                                    cre?.cic_identity_detail_info
                                      ?.cic_credit_collateral_info
                                      ?.cic_credit_collateral_total_amount
                                      ?.value ?? 0,
                                },
                              },
                            })
                          ) ?? [],
                        totalLoan:
                          newIden?.cic_identity_total_loan_amount.value ?? 0,
                        totalCollateral:
                          newIden?.cic_identity_total_collateral_amount.value ??
                          0,
                        credit_score_info:
                          newIden?.credit_score_info !== null
                            ? ({
                                risk_info: {
                                  score_value:
                                    newIden?.credit_score_info?.risk_info
                                      ?.score_value,
                                  score_rank:
                                    newIden?.credit_score_info?.risk_info
                                      ?.score_rank,
                                  publish_date:
                                    (newIden?.credit_score_info?.risk_info
                                      ?.publish_date ?? 0) * 1000,
                                  evaluation:
                                    newIden?.credit_score_info?.risk_info
                                      ?.evaluation,
                                  customer_segment:
                                    newIden?.credit_score_info?.risk_info?.customer_segment?.map(
                                      (c) => c.id
                                    ),
                                } as IRiskInfo,
                              } as ICreditScoreInfo)
                            : ({
                                risk_info: {
                                  score_value: null,
                                  score_rank: '',
                                  publish_date: null,
                                  evaluation: null,
                                  customer_segment: [],
                                } as IRiskInfo,
                              } as ICreditScoreInfo),
                      };
                    } else return { ...iden };
                  }),
                  document_info_list: mappingDocument(
                    newPersonData?.document_info_list ?? []
                  ),
                } as unknown as ILOANNormalStorageCICDeclareData;
              } else return { ...person };
            }),
          };
        });
        return dataDEC;
      };

      ['other', 'scb'].forEach((org) => {
        const o = org as keyof typeof organ;
        const dataORG: ILOANNormalStorageCICOrganData = dataO(
          o,
          organ[o] as keyof ICICDataAPI
        );
        data[o] = {
          ...state.storage.cic[o],
          data: { ...dataORG },
        };
      });

      if (state.storage.full.data?.form.cic_form) {
        state.storage.full.data.form.cic_form = action.payload;
      }

      const dataSummary = (
        dataOther: ILOANNormalStorageCICOrganData,
        dataScb: ILOANNormalStorageCICOrganData
      ) => {
        let dataTotal: ILOANNormalStorageCICOrganData = { ...dataOther };
        [
          'borrower',
          'marriage',
          'co-brw',
          'co-payer',
          'law-rlt',
          'other',
        ].forEach((key) => {
          dataTotal[key] = {
            ...dataOther[key],
            data: dataOther[key]?.data?.map((person) => {
              return {
                ...person,
                data: person?.data?.map((iden) => {
                  const scbIden = dataScb[key]?.data
                    ?.find(
                      (scbPerson) =>
                        scbPerson.person_uuid === person.person_uuid
                    )
                    ?.data?.find((scbIden) => scbIden.uuid === iden.uuid);

                  if (scbIden?.credit[0]) {
                    return {
                      ...iden,
                      credit: [...iden.credit, scbIden.credit[0]],
                      totalLoan:
                        (iden?.totalLoan ?? 0) + (scbIden?.totalLoan ?? 0),
                      totalCollateral:
                        (iden?.totalCollateral ?? 0) +
                        (scbIden?.totalCollateral ?? 0),
                    };
                  } else return { ...iden };
                }),
              };
            }),
          };
        });

        return dataTotal;
      };

      state.storage.cic = {
        ...state.storage.cic,
        other: {
          ...state.storage.cic.other,
          data: {
            ...data?.other.data,
          },
        },
        scb: {
          ...state.storage.cic.scb,
          data: {
            ...data?.scb.data,
          },
        },
        summary: {
          ...state.storage.cic.summary,
          data: {
            ...data?.other.data,
          },
        },
      };
    },
    prepare(payload: ICICDataAPI, meta: string) {
      return { payload, meta };
    },
  },
  clearLOANNormalStorageCIC(state: Draft<ILOANNormalState>) {
    state.storage.cic = {
      validate: {
        valid: true,
      },
      activeOrgan: 'other',
      rating: '',
      other: {
        declareActive: 'borrower',
        data: {
          borrower: {
            position: '',
            data: [],
          },
          'co-brw': {
            position: '',
            data: [],
          },
          'co-payer': {
            position: '',
            data: [],
          },
          'law-rlt': {
            position: '',
            data: [],
          },
          marriage: {
            position: '',
            data: [],
          },
          other: {
            position: '',
            data: [],
          },
        },
      },
      scb: {
        declareActive: 'borrower',
        data: {
          borrower: {
            position: '',
            data: [],
          },
          'co-brw': {
            position: '',
            data: [],
          },
          'co-payer': {
            position: '',
            data: [],
          },
          'law-rlt': {
            position: '',
            data: [],
          },
          marriage: {
            position: '',
            data: [],
          },
          other: {
            position: '',
            data: [],
          },
        },
      },
      summary: {
        declareActive: 'borrower',
        data: {
          borrower: {
            position: '',
            data: [],
          },
          'co-brw': {
            position: '',
            data: [],
          },
          'co-payer': {
            position: '',
            data: [],
          },
          'law-rlt': {
            position: '',
            data: [],
          },
          marriage: {
            position: '',
            data: [],
          },
          other: {
            position: '',
            data: [],
          },
        },
      },
    };
  },
  deleteDataCreditActiveBtnBar(state: Draft<ILOANNormalState>) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    const creditActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data
      .find((x) => x.person_uuid === positionActive)
      ?.data.find((i) => i.uuid === identityActive)?.activeCredit;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === creditActive) {
                    return {
                      ...c,
                      ...generateLOANNormalCICCredit(creditActive),
                    };
                  }
                  return { ...c };
                }),
                credit_score_info:
                  d.credit.length === 1
                    ? {
                        risk_info: {
                          score_value: '',
                          score_rank: '',
                          publish_date: null,
                          evaluation: '',
                          customer_segment: [],
                        },
                      }
                    : { ...d.credit_score_info },
              };
            }
            return { ...d };
          }) as ILOANNormalStorageCICDeclareDataDetail[],
        };
      }
      return { ...x };
    });
  },

  deleteCreditCard(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number, string>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    if (c.detail.card.list.length === 1) {
                      return {
                        ...c,
                        detail: {
                          ...c.detail,
                          card: {
                            ...c.detail.card,
                            active: '',
                            total_amount: null,
                            list: [],
                          },
                        },
                      };
                    } else {
                      const listCard = c.detail.card.list.splice(
                        action.payload,
                        1
                      );
                      if (listCard[0]?.uuid !== c.detail.card.active) {
                        return {
                          ...c,
                          detail: {
                            ...c.detail,
                            card: {
                              ...c.detail.card,
                              list: [...c.detail.card.list],
                            },
                          },
                        };
                      } else {
                        return {
                          ...c,
                          detail: {
                            ...c.detail,
                            card: {
                              ...c.detail.card,
                              active:
                                c.detail?.card?.list[
                                  c.detail?.card?.list?.length - 1
                                ]?.uuid,
                              list: [...c.detail.card.list],
                            },
                          },
                        };
                      }
                    }
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },

  deleteCreditLoan(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string, string>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    return {
                      ...c,
                      detail: {
                        ...c.detail,
                        loan: {
                          ...c.detail.loan,
                          list: c.detail.loan.list.map((a) => {
                            if (a.code === action.payload) {
                              return {
                                ...a,
                                amount: null,
                                expired: null,
                                balance: null,
                                amountCIC: null,
                                balanceCIC: null,
                                note: null,
                                uuid: '',
                              };
                            }
                            return { ...a };
                          }),
                        },
                      },
                    };
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },

  deleteCreditCollateral(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number, string>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    if (c.detail.collateral.list.length === 1) {
                      return {
                        ...c,
                        detail: {
                          ...c.detail,
                          collateral: {
                            ...c.detail.collateral,
                            active: '',
                            total_amount: null,
                            list: [],
                          },
                        },
                      };
                    } else {
                      const listCollateral = c.detail.collateral.list.splice(
                        action.payload,
                        1
                      );
                      if (
                        listCollateral[0]?.uuid !== c.detail.collateral.active
                      ) {
                        return {
                          ...c,
                          detail: {
                            ...c.detail,
                            collateral: {
                              ...c.detail.collateral,
                              list: [...c.detail.collateral.list],
                            },
                          },
                        };
                      } else {
                        return {
                          ...c,
                          detail: {
                            ...c.detail,
                            collateral: {
                              ...c.detail.collateral,
                              active:
                                c.detail?.collateral?.list[
                                  c.detail?.collateral?.list?.length - 1
                                ]?.uuid,
                              list: [...c.detail.collateral.list],
                            },
                          },
                        };
                      }
                    }
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },
  setLOANNormalDate(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number | null, string>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    return {
                      ...c,
                      detail: {
                        ...c.detail,
                        loan: {
                          ...c.detail.loan,
                          date: action.payload,
                        },
                      },
                    };
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },

  setLOANCardDate(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number | null, string>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    return {
                      ...c,
                      detail: {
                        ...c.detail,
                        card: {
                          ...c.detail.card,
                          date: action.payload,
                        },
                      },
                    };
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },

  setLOANCollateralDate(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number | null, string>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data: x.data.map((d) => {
            if (d.uuid === identityActive) {
              return {
                ...d,
                credit: d.credit.map((c) => {
                  if (c.uuid === d.activeCredit) {
                    return {
                      ...c,
                      detail: {
                        ...c.detail,
                        collateral: {
                          ...c.detail.collateral,
                          date: action.payload,
                        },
                      },
                    };
                  }
                  return { ...c };
                }),
              };
            }
            return { ...d };
          }),
        };
      }
      return { ...x };
    });
  },
  setLOANScoreDate(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number, string>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const identityActive = state.storage.cic[organActive]?.data[
      declareActive
    ]?.data.find((x) => x.person_uuid === positionActive)?.identityActive;
    state.storage.cic[organActive].data[declareActive].data = state.storage.cic[
      organActive
    ].data[declareActive].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data:
            x.data.map((d) => {
              return d.uuid === identityActive
                ? {
                    ...d,
                    credit_score_info: {
                      ...d.credit_score_info,
                      risk_info: {
                        ...d.credit_score_info?.risk_info,
                        publish_date: action.payload,
                      },
                    },
                  }
                : { ...d };
            }) ?? [],
        };
      }
      return { ...x };
    });

    state.storage.cic[organActive === 'other' ? 'scb' : 'other'].data[
      declareActive
    ].data = state.storage.cic[organActive === 'other' ? 'scb' : 'other'].data[
      declareActive
    ].data.map((x) => {
      if (x.person_uuid === positionActive) {
        return {
          ...x,
          data:
            x.data.map((d) => {
              return d.uuid === identityActive
                ? {
                    ...d,
                    credit_score_info: {
                      ...d.credit_score_info,
                      risk_info: {
                        ...d.credit_score_info?.risk_info,
                        publish_date: action.payload,
                      },
                    },
                  }
                : { ...d };
            }) ?? [],
        };
      }
      return { ...x };
    });
  },

  addNewDocumentTypeGroup(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<CustomKeyType>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    state.storage.cic[organActive].data[declareActive].data
      .find((x) => x.person_uuid === positionActive)
      ?.document_info_list?.push({
        ...generateEmptyDocumentGroup(action.payload),
      });
  },

  deleteDocumentInfoList: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        { customKeys: CustomKeyType; position: string }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              document_info_list: x.document_info_list.filter(
                (doc) =>
                  !_.isEqual(
                    {
                      identity: doc.customKey?.identity,
                      credit: doc.customKey?.credit,
                    },
                    {
                      identity: action?.meta?.customKeys?.identity,
                      credit: action?.meta?.customKeys?.credit,
                    }
                  )
              ),
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: string,
      meta: { customKeys: CustomKeyType; position: string }
    ) {
      return { payload, meta };
    },
  },

  addNewdocumentType(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const docs =
      state.storage.cic[organActive].data[declareActive].data.find(
        (x) => x.person_uuid === positionActive
      )?.document_info_list ?? [];
    const currentParentDoc = docs.find((doc) => doc.uuid === action.payload);
    if (!currentParentDoc) return;
    if (!currentParentDoc.document_type_code) return;
    currentParentDoc.document_list.push({
      ...generateEmptyDocumentType(),
    });
  },
  deleteDocumentGroup: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
          position: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              document_info_list: x.document_info_list.filter(
                (doc) => doc.uuid !== action.meta.parentDoc_uuid
              ),
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
        position: string;
      }
    ) {
      return { payload, meta };
    },
  },
  deleteDocument: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
          position: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              document_info_list: x.document_info_list.map((parentDoc) => {
                if (parentDoc.uuid === action.meta.parentDoc_uuid) {
                  return {
                    ...parentDoc,
                    document_list:
                      parentDoc?.document_list?.filter(
                        (doc) => doc.uuid !== action.payload
                      ) ?? [],
                  };
                }
                return parentDoc;
              }),
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
        position: string;
      }
    ) {
      return { payload, meta };
    },
  },
  addNewChildFiles(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<{ parentDoc: string; childDoc: string }>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
    const docs =
      state.storage.cic[organActive].data[declareActive].data.find(
        (x) => x.person_uuid === positionActive
      )?.document_info_list ?? [];
    const currentParentDoc = docs.find(
      (doc) => doc.uuid === action.payload.parentDoc
    );
    if (!currentParentDoc) return;
    const currentDoc = currentParentDoc.document_list.find(
      (doc) => doc.uuid === action.payload.childDoc
    );
    if (!currentDoc) return;
    if (!currentDoc.document_code) return;
    currentDoc.document_child_files.push({
      ...generateEmptyDocumentChildFile('', ''),
      uuid: generateLOCALUUID(),
    });
  },

  setPositionUpload(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<{ indexGroup: number; indexType: number }>
  ) {
    const organActive = state.storage.cic
      .activeOrgan as keyof ILOANNormalStorageCICOther;
    const declareActive = state.storage.cic[organActive]
      ?.declareActive as keyof ILOANNormalStorageCICOrgan;
    const positionActive =
      state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;

    state.storage.cic[organActive].data[declareActive]?.data
      .find((x) => x.person_uuid === positionActive)
      ?.document_info_list[action.payload.indexGroup]?.document_list[
        action.payload.indexType
      ]?.document_child_files?.push(
        generateEmptyDocumentChildFile(
          action.payload.indexGroup,
          action.payload.indexType
        )
      );
  },
  deleteChildFile: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
          file_uuid: string;
          position: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      const document_info_list =
        state.storage.cic[organActive].data[declareActive]?.data.find(
          (x) => x.person_uuid === positionActive
        )?.document_info_list ?? [];
      if (!document_info_list) return;
      const currentParentDoc = document_info_list.find(
        (parent) => parent.uuid === action.meta.parentDoc_uuid
      );
      if (!currentParentDoc) return;
      const currentDoc = currentParentDoc.document_list.find(
        (doc) => doc.uuid === action.meta.doc_uuid
      );
      if (!currentDoc) return;
      currentDoc.document_child_files = currentDoc.document_child_files.filter(
        (file) => file.uuid !== action.meta.file_uuid
      );
    },
    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
        file_uuid: string;
        position: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setDocumentGroupType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              document_info_list: x.document_info_list?.map((d, i) => {
                if (d.uuid === action.meta.parentDoc_uuid) {
                  return {
                    ...d,
                    document_type_code: action.payload,
                  };
                }
                return { ...d };
              }),
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setDocumentType: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              document_info_list: x.document_info_list?.map((d, i) => {
                if (d.uuid === action.meta.parentDoc_uuid) {
                  return {
                    ...d,
                    document_list: d.document_list.map((doc) => {
                      if (doc.uuid === action.meta.doc_uuid) {
                        return { ...doc, document_code: action.payload };
                      }
                      return { ...doc };
                    }),
                  };
                }
                return { ...d };
              }),
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: string | number,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setAddttacmentFileCIC: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalStorageCICDocumentChildFile[],
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
          file_uuid: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;

      const document_info_list =
        state.storage.cic[organActive].data[declareActive].data.find(
          (x) => x.person_uuid === positionActive
        )?.document_info_list ?? [];
      if (!document_info_list) return;
      const parentDoc = document_info_list.find(
        (doc) => doc.uuid === action.meta.parentDoc_uuid
      );
      if (!parentDoc) return;
      const currentDoc = parentDoc.document_list.find(
        (doc) => doc.uuid === action.meta.doc_uuid
      );
      if (!currentDoc) return;
      const idxFile = currentDoc.document_child_files.findIndex(
        (file) => file.uuid === action.meta.file_uuid
      );
      currentDoc.document_child_files[idxFile] = {
        ...currentDoc.document_child_files[idxFile],
        name: action.payload[0].name,
        file_id: action.payload[0].file_id,
        display_order: action.payload[0].display_order,
        file_upload: action.payload[0].file_upload,
        content_type: action.payload[0].content_type,
        created_at: action.payload[0].created_at,
        created_by: action.payload[0].created_by,
        description: action.payload[0].description,
      };
    },
    prepare(
      payload: ILOANNormalStorageCICDocumentChildFile[],
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
        file_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },

  setFileDescription: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
          file_uuid: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              document_info_list: (x?.document_info_list ?? []).map(
                (d, idx) => {
                  if (d?.uuid === action?.meta?.parentDoc_uuid) {
                    return {
                      ...d,
                      document_list: d.document_list.map((l, typeIdx) => {
                        if (l?.uuid === action?.meta?.doc_uuid) {
                          return {
                            ...l,
                            document_child_files: l.document_child_files.map(
                              (a, i) => {
                                if (a?.uuid === action?.meta?.file_uuid) {
                                  return {
                                    ...a,
                                    description: action.payload,
                                  };
                                }
                                return { ...a };
                              }
                            ),
                          };
                        }
                        return { ...l };
                      }),
                    };
                  }
                  return {
                    ...d,
                  };
                }
              ),
            };
          }
          return { ...x };
        });
    },
    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
        file_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },

  mapUploadDataCICStored: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalStorageCICDocumentChildFile[],
        string,
        {
          index_group: number;
          index_type: number;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;

      state.storage.cic[organActive].data[declareActive].data =
        state.storage.cic[organActive].data[declareActive].data.map((x) => {
          if (x.person_uuid === positionActive) {
            return {
              ...x,
              document_info_list: x.document_info_list.map((d, idx) => {
                if (action.meta.index_group === idx) {
                  return {
                    ...d,
                    document_list: d.document_list.map((l, typeIdx) => {
                      if (typeIdx === action.meta.index_type) {
                        return {
                          ...l,
                          document_child_files: action.payload.map((a) => {
                            return {
                              ...a,
                            };
                          }),
                        };
                      }
                      return { ...l };
                    }),
                  };
                }
                return {
                  ...d,
                };
              }),
            };
          }
          return { ...x };
        });
    },

    prepare(
      payload: ILOANNormalStorageCICDocumentChildFile[],
      meta: {
        index_group: number;
        index_type: number;
      }
    ) {
      return { payload, meta };
    },
  },

  mappingCICDataFileAlterUpload: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalStorageCICDocumentList[],
        string,
        {
          declare: string;
          uuid: string;
        }
      >
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      state.storage.cic[organActive].data[action.meta.declare].data =
        state.storage.cic[organActive].data[action.meta.declare].data.map(
          (x) => {
            if (x.person_uuid === action.meta.uuid) {
              return {
                ...x,
                document_info_list: [...action.payload],
              };
            }
            return { ...x };
          }
        );
    },
    prepare(
      payload: ILOANNormalStorageCICDocumentList[],
      meta: {
        declare: string;
        uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },

  updateCICresponseSave: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<ICICDeclareDataAPI, string>
    ) {
      const organActive = state.storage.cic
        .activeOrgan as keyof ILOANNormalStorageCICOther;
      const declareActive = state.storage.cic[organActive]
        ?.declareActive as keyof ILOANNormalStorageCICOrgan;
      const positionActive =
        state.storage.cic[organActive]?.data[declareActive]?.position ?? 0;
      const personActiveIndex = state.storage.cic[organActive]?.data[
        declareActive
      ]?.data.findIndex((x) => x.person_uuid === positionActive);

      const organ: { [key: string]: keyof ICICDataAPI } = {
        other: 'other_credit_institution',
        scb: 'current_credit_institution',
      };
      const declareFormCic: { [key: string]: keyof ICICOrganAPI } = {
        borrower: 'borrower',
        'co-brw': 'co_brw',
        'co-payer': 'co_payer',
        'law-rlt': 'law_rlt',
        marriage: 'marriage',
        other: 'others',
      };
      //update data storage full
      const currentCICInstitution = _.get(state.storage.full.data?.form, [
        'cic_form',
        organ[organActive],
      ]) as ICICOrganAPI;
      const anotherCICInstitution = _.get(state.storage.full.data?.form, [
        'cic_form',
        organ[organActive === 'other' ? 'scb' : organActive],
      ]) as ICICOrganAPI;

      if (currentCICInstitution) {
        const de = declareFormCic[declareActive];
        if (de === 'borrower' || de === 'marriage') {
          const declareCICFullForm = currentCICInstitution[
            declareFormCic[declareActive]
          ] as ICICDeclareMultiAPI<ICICDeclareDataAPI>;
          if (declareCICFullForm) {
            declareCICFullForm.data = action.payload;
          }

          const anotherDeclareCICFullForm = anotherCICInstitution[
            declareFormCic[declareActive]
          ] as ICICDeclareMultiAPI<ICICDeclareDataAPI>;
          if (anotherDeclareCICFullForm?.data?.cic_identity_info) {
            anotherDeclareCICFullForm.data.cic_identity_info =
              action.payload?.cic_identity_info?.map((iden) => {
                const currentIden =
                  anotherDeclareCICFullForm?.data?.cic_identity_info?.find(
                    (e) => e.uuid === iden.uuid
                  );
                if (currentIden) {
                  return {
                    ...currentIden,
                    credit_score_info: {
                      ...iden?.credit_score_info,
                    },
                  };
                } else {
                  return {
                    ...generateLoanNormalCICIdentityAPI(
                      iden.identity_num,
                      iden.identity_type,
                      iden.uuid,
                      iden.credit_score_info
                    ),
                  };
                }
              });
          } else {
            anotherDeclareCICFullForm.data = generateLoanNormalCICPersonAPI(
              action.payload
            );
          }
        } else {
          const declareCICFullForm = currentCICInstitution[
            declareFormCic[declareActive]
          ] as ICICDeclareMultiAPI<ICICDeclareDataAPI[]>;
          if (declareCICFullForm) {
            const activeIndexPerson = (
              declareCICFullForm?.data ?? []
            ).findIndex(
              (item) => item.person_uuid === action.payload.person_uuid
            );
            if (activeIndexPerson !== -1) {
              declareCICFullForm.data[activeIndexPerson] = action.payload;
            } else {
              declareCICFullForm.data.push(action.payload);
            }
          }

          const anotherDeclareCICFullForm = anotherCICInstitution[
            declareFormCic[declareActive]
          ] as ICICDeclareMultiAPI<ICICDeclareDataAPI[]>;
          if (anotherDeclareCICFullForm) {
            const activeIndexPerson = (
              anotherDeclareCICFullForm?.data ?? []
            ).findIndex(
              (item) => item.person_uuid === action.payload.person_uuid
            );

            if (activeIndexPerson !== -1) {
              anotherDeclareCICFullForm.data[
                activeIndexPerson
              ].cic_identity_info = action.payload.cic_identity_info.map(
                (iden) => {
                  const currentIden = anotherDeclareCICFullForm.data[
                    activeIndexPerson
                  ].cic_identity_info.find((e) => e.uuid === iden.uuid);
                  if (currentIden) {
                    return {
                      ...currentIden,
                      credit_score_info: { ...iden.credit_score_info },
                    };
                  } else {
                    return {
                      ...generateLoanNormalCICIdentityAPI(
                        iden.identity_num,
                        iden.identity_type,
                        iden.uuid,
                        iden.credit_score_info
                      ),
                    };
                  }
                }
              );
            } else {
              anotherDeclareCICFullForm.data.push(
                generateLoanNormalCICPersonAPI(action.payload)
              );
            }

            // if(anotherDeclareCICFullForm?.data[activeIndexPerson]?.cic_identity_info){
            //   anotherDeclareCICFullForm.data[activeIndexPerson].cic_identity_info = anotherDeclareCICFullForm.data[activeIndexPerson]?.cic_identity_info?.map(iden => {
            //     return {
            //       ...iden,
            //       credit_score_info: {
            //         ...iden?.credit_score_info,
            //         ...action?.payload.cic_identity_info?.find(e => e.uuid === iden.uuid)?.credit_score_info
            //       }
            //     }
            //   })
            // }
          }
        }
      }
      //update data storage local
      const localState =
        state.storage.cic[organActive].data[declareActive].data[
          personActiveIndex
        ];
      const updateData = action.payload;
      state.storage.cic[organActive].data[declareActive].data[
        personActiveIndex
      ] = {
        ...localState,
        data: localState?.data?.map((identity) => {
          const activeCreditIndex = identity?.credit?.findIndex(
            (e) => e.uuid === identity.activeCredit
          );
          const updateIden = updateData.cic_identity_info.find(
            (e) => e.uuid === identity.uuid
          );
          if (updateIden) {
            return {
              ...identity,
              activeCredit:
                updateIden?.cic_identity_credit_institution_info[
                  activeCreditIndex
                ]?.uuid ?? identity.activeCredit,
              credit: identity?.credit?.map((credit, creIndex) => {
                const activeCardIndex = credit?.detail?.card?.list.findIndex(
                  (e) => e.uuid === credit?.detail?.card?.active
                );
                const activeCollateralIndex =
                  credit?.detail?.collateral?.list.findIndex(
                    (e) => e.uuid === credit?.detail?.collateral?.active
                  );
                return {
                  ...credit,
                  uuid:
                    updateIden?.cic_identity_credit_institution_info[creIndex]
                      ?.uuid ?? credit.uuid,
                  id: updateIden?.cic_identity_credit_institution_info[creIndex]
                    ?.credit_institution_id,
                  detail: {
                    ...credit?.detail,
                    loan: {
                      ...credit?.detail?.loan,
                      // date: (updateIden?.cic_identity_credit_institution_info[creIndex]?.cic_identity_detail_info?.cic_credit_loan_info?.cic_credit_loan_updated_date ?? 0)*1000,
                      list: credit?.detail?.loan?.list?.map((loan) => {
                        return {
                          ...loan,
                          uuid:
                            updateIden?.cic_identity_credit_institution_info[
                              creIndex
                            ]?.cic_identity_detail_info?.cic_credit_loan_info?.cic_credit_loan_term_info.find(
                              (e) => e.cic_loan_term_item_code === loan.code
                            )?.uuid ?? null,
                        };
                      }),
                    },
                    card: {
                      ...credit?.detail?.card,
                      // date: (updateIden?.cic_identity_credit_institution_info[creIndex]?.cic_identity_detail_info?.cic_credit_card_info?.cic_credit_card_updated_date ?? 0)*1000,
                      active:
                        updateIden?.cic_identity_credit_institution_info[
                          creIndex
                        ]?.cic_identity_detail_info?.cic_credit_card_info
                          ?.cic_credit_card_detail_info[activeCardIndex]
                          ?.uuid ?? credit?.detail?.card.active,
                      list: credit.detail.card.list.map((card, cardIndex) => {
                        return {
                          ...card,
                          uuid:
                            updateIden?.cic_identity_credit_institution_info[
                              creIndex
                            ]?.cic_identity_detail_info?.cic_credit_card_info
                              ?.cic_credit_card_detail_info[cardIndex]?.uuid ??
                            card.uuid,
                        };
                      }),
                    },
                    collateral: {
                      ...credit?.detail?.collateral,
                      // date: (updateIden?.cic_identity_credit_institution_info[creIndex]?.cic_identity_detail_info?.cic_credit_collateral_info?.cic_credit_collateral_updated_date ?? 0)*1000,
                      active:
                        updateIden?.cic_identity_credit_institution_info[
                          creIndex
                        ]?.cic_identity_detail_info?.cic_credit_collateral_info
                          ?.cic_credit_collateral_detail_info[
                          activeCollateralIndex
                        ]?.uuid ?? credit?.detail?.collateral.active,
                      list: credit.detail.collateral.list.map(
                        (collateral, collateralIndex) => {
                          return {
                            ...collateral,
                            uuid:
                              updateIden?.cic_identity_credit_institution_info[
                                creIndex
                              ].cic_identity_detail_info
                                ?.cic_credit_collateral_info
                                ?.cic_credit_collateral_detail_info[
                                collateralIndex
                              ]?.uuid ?? collateral.uuid,
                          };
                        }
                      ),
                    },
                  },
                };
              }),
            };
          } else return { ...identity };
        }),
      };
    },
    prepare(payload: ICICDeclareDataAPI) {
      return { payload };
    },
  },

  uploadCICFileMulti(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalCICUpload>
  ) {},

  setCICValidate(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ICICNormalStorageCICValidate>
  ) {
    state.storage.cic.validate = action.payload;
  },
};
