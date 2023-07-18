import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";
import * as TYPE_LOAN from "types/models/loan/normal/storage/LOAN";
import {
  IBusinessHouseholdInfo, ICapitalNeedLoanPlanInfo, IFinanceMetadataItemInfo, IFinancialAnalysisInfo, ILOANNormalDocumentInfoList, ILOANNormalStorageLOANFinanceMetadata, ILOANNormalStorageLOANFinanceMetadataRow, ILOANNormalStorageLOANFinanceMetadataValue,
  ILOANNormalStorageLOANInOut,
  ILOANNormalStorageLOANInOutInfo,
  ILOANNormalStorageLOANLegalBusiness,
  ILOANNormalStorageLOANLegalBusinessStore,
  ILOANNormalStorageLOANNeedAndPlan,
  ILOANNormalStorageLOANProduct,
  ILOANNormalStorageLoanValidate,
  IProductLoanProgramInfo
} from "types/models/loan/normal/storage/LOAN";
import { formatFloorNumber, formatRoundNumber, generateUUID, PREFIX_LOCAL } from "utils";
import { autoFillBussiness, autoFillFinance, autoFillStepA, autoFillStepB } from "./autofill";
import { updateFinanceAfterChangeInput } from "./handleData";
import { loanState } from "./state";

export type TFinanceMetaGroup = {
  obj: keyof Pick<ILOANNormalStorageLOANFinanceMetadata, 'A' | 'B' | 'D'>,
  group: number,
  field: keyof ILOANNormalStorageLOANFinanceMetadataValue
}

export type TFinanceMetaType = TFinanceMetaGroup & { type: number };

export const NormalLOANCase = {
  setLOANProduct: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalStorageLOANProduct[keyof ILOANNormalStorageLOANProduct],
        string,
        keyof ILOANNormalStorageLOANProduct
      >
    ) {
      state.storage.loan.product = {
        ...state.storage.loan.product,
        [action.meta]: action.payload,
      };
    },
    prepare(
      payload: ILOANNormalStorageLOANProduct[keyof ILOANNormalStorageLOANProduct],
      meta: keyof ILOANNormalStorageLOANProduct
    ) {
      return { payload, meta };
    },
  },
  setLOANNeedAndPlan: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalStorageLOANNeedAndPlan[keyof ILOANNormalStorageLOANNeedAndPlan],
        string,
        keyof ILOANNormalStorageLOANNeedAndPlan
      >
    ) {
      state.storage.loan.needAndPlan = {
        ...state.storage.loan.needAndPlan,
        [action.meta]: action.payload,
      };
    },
    prepare(
      payload: ILOANNormalStorageLOANNeedAndPlan[keyof ILOANNormalStorageLOANNeedAndPlan],
      meta: keyof ILOANNormalStorageLOANNeedAndPlan
    ) {
      return { payload, meta };
    },
  },

  setLOANNeedAndPlanNeed(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number | null>
  ) {
    state.storage.loan.needAndPlan.need = action.payload;

    state.storage.loan.needAndPlan.loanAmount = (action.payload ?? 0) - (state.storage.loan.needAndPlan.ownCaptital ?? 0)
    state.storage.loan.needAndPlan.scb_percentage = !!action.payload ? formatRoundNumber(state.storage.loan.needAndPlan.loanAmount * 100 / action.payload) : null;
   
    if(!!state.storage.loan.needAndPlan.expiredCredit) {
      state.storage.loan.needAndPlan.amountPaidEachPeriod = formatRoundNumber((state.storage.loan.needAndPlan.loanAmount ?? 0) / (state.storage.loan.needAndPlan.expiredCredit),0)
    }

  },

  setLOANNeedAndPlanOwnCaptital(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number | null>
  ) {
    state.storage.loan.needAndPlan.ownCaptital = action.payload;
    
    state.storage.loan.needAndPlan.loanAmount = (state.storage.loan.needAndPlan.need ?? 0) - (action.payload ?? 0)
    state.storage.loan.needAndPlan.scb_percentage = !!state.storage.loan.needAndPlan.need ? formatRoundNumber(state.storage.loan.needAndPlan.loanAmount * 100 / state.storage.loan.needAndPlan.need) : null;
   
    if(!!state.storage.loan.needAndPlan.expiredCredit) {
      state.storage.loan.needAndPlan.amountPaidEachPeriod = formatRoundNumber((state.storage.loan.needAndPlan.loanAmount ?? 0) / (state.storage.loan.needAndPlan.expiredCredit),0)
    }

  },

  setLOANNeedAndPlanExpiredCredit(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<number | null>
  ) {
    state.storage.loan.needAndPlan.expiredCredit = action.payload;
   
    if(!!state.storage.loan.needAndPlan.expiredCredit) {
      state.storage.loan.needAndPlan.amountPaidEachPeriod = formatRoundNumber((state.storage.loan.needAndPlan.loanAmount ?? 0) / (state.storage.loan.needAndPlan.expiredCredit),0)
    }

  },

  setLOANLegalBusiness: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalStorageLOANLegalBusiness[keyof ILOANNormalStorageLOANLegalBusiness],
        string,
        keyof ILOANNormalStorageLOANLegalBusiness
      >
    ) {
      state.storage.loan.legalBusiness = {
        ...state.storage.loan.legalBusiness,
        [action.meta]: action.payload,
      };
    },
    prepare(
      payload: ILOANNormalStorageLOANLegalBusiness[keyof ILOANNormalStorageLOANLegalBusiness],
      meta: keyof ILOANNormalStorageLOANLegalBusiness
    ) {
      return { payload, meta };
    },
  },
  setWarehouse: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | boolean | null,
        string,
        keyof ILOANNormalStorageLOANLegalBusinessStore
      >
    ) {
      const es = state.storage.loan.legalBusiness.stores?.find(
        (s) => s.primary
      );
      // let valid = true
      // for(let i of state.storage.loan.legalBusiness.stores){
      //   if(i.apartment === "") return valid = false
      //   if(i.area === null) return valid = false
      //   if(i.province === "") return valid = false
      //   if(i.district === "") return valid = false
      //   if(i.ward === "") return valid = false
      // }
      if (es) {
        state.storage.loan.legalBusiness.stores =
          state.storage.loan.legalBusiness.stores.map((s) =>
            s.primary ? { ...s, [action.meta]: action.payload } : { ...s }
          );
      } else {
        state.storage.loan.legalBusiness.stores = [
          ...state.storage.loan.legalBusiness.stores,
          {
            area: null,
            apartment: "",
            province: "",
            district: "",
            ward: "",
            primary: true,
            uuid: generateUUID(),
            [action.meta]: action.payload,
          },
        ];
      }
    },
    prepare(
      payload: string | number | boolean | null,
      meta: keyof ILOANNormalStorageLOANLegalBusinessStore
    ) {
      return { payload, meta };
    },
  },
  addWarehouse(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalStorageLOANLegalBusinessStore>
  ) {
    state.storage.loan.legalBusiness.stores = [
      ...state.storage.loan.legalBusiness.stores,
      { ...action.payload },
    ];
  },
  updatePrimaryWarehouse(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.loan.legalBusiness.stores =
      state.storage.loan.legalBusiness.stores.map((s) => ({
        ...s,
        primary: s.uuid === action.payload,
      }));
  },
  updateWarehouse(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalStorageLOANLegalBusinessStore>
  ) {
    state.storage.loan.legalBusiness.stores =
      state.storage.loan.legalBusiness.stores.map((s) => {
        if (s.uuid === action.payload.uuid) {
          return { ...action.payload };
        }

        return { ...s };
      });
  },
  deleteWarehouse(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.loan.legalBusiness.stores =
      state.storage.loan.legalBusiness.stores.filter(
        (s) => s.uuid !== action.payload
      );
  },
  setFinanceGroupValue: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<number | null, string, TFinanceMetaGroup>
    ) {
      const exist = state.storage.loan.finance[action.meta.obj]?.find(
        (g) => g.id === action.meta.group
      );
      if (!exist) {
        state.storage.loan.finance[action.meta.obj] = [
          ...state.storage.loan.finance[action.meta.obj],
          {
            id: action.meta.group,
            data: {
              T2: null,
              T1: null,
              T: null,
              KH: null,
              NVKD: null,
              [action.meta.field]: action.payload,
            },
            child: [],
          },
        ];
      } else {
        state.storage.loan.finance[action.meta.obj] =
          state.storage.loan.finance[action.meta.obj].map((o) => {
            if (o.id === action.meta.group) {
              return {
                ...o,
                data: { ...o.data, [action.meta.field]: action.payload },
              };
            }

            return { ...o };
          });
      }

      updateFinanceAfterChangeInput(state, action.meta);

    },
    prepare(payload: number | null, meta: TFinanceMetaGroup) {
      return { payload, meta };
    },
  },
  setFinanceTypeValue: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<number | null, string, TFinanceMetaType>
    ) {
      const exist = state.storage.loan.finance[action.meta.obj]?.find(
        (g) => g.id === action.meta.group
      );
      if (!exist) {
        state.storage.loan.finance[action.meta.obj] = [
          ...state.storage.loan.finance[action.meta.obj],
          {
            id: action.meta.group,
            data: { T2: null, T1: null, T: null, KH: null, NVKD: null },
            child: [
              {
                id: action.meta.type,
                data: {
                  T2: null,
                  T1: null,
                  T: null,
                  KH: null,
                  NVKD: null,
                  [action.meta.field]: action.payload,
                },
                child: [],
              },
            ],
          },
        ];
      } else {
        const existType = exist.child?.find((c) => c.id === action.meta.type);

        if (existType) {
          state.storage.loan.finance[action.meta.obj] =
            state.storage.loan.finance[action.meta.obj].map((o) => {
              if (o.id === action.meta.group) {
                return {
                  ...o,
                  child: o.child.map((g) => {
                    if (g.id === action.meta.type) {
                      return {
                        ...g,
                        data: {
                          ...g.data,
                          [action.meta.field]: action.payload,
                        },
                      };
                    }

                    return { ...g };
                  }),
                };
              }

              return { ...o };
            });
        } else {
          state.storage.loan.finance[action.meta.obj] =
            state.storage.loan.finance[action.meta.obj].map((o) => {
              if (o.id === action.meta.group) {
                return {
                  ...o,
                  child: [
                    ...o.child,
                    {
                      id: action.meta.type,
                      data: {
                        T2: null,
                        T1: null,
                        T: null,
                        KH: null,
                        NVKD: null,
                        [action.meta.field]: action.payload,
                      },
                      child: [],
                    },
                  ],
                };
              }

              return { ...o };
            });
        }
      }
    },
    prepare(payload: number | null, meta: TFinanceMetaType) {
      return { payload, meta };
    },
  },
  addLOANInOutInfo: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalStorageLOANInOutInfo,
        string,
        keyof Pick<
          ILOANNormalStorageLOANInOut,
          "suppliers" | "purchasingPartner"
        >
      >
    ) {
      if (state.storage.loan.finance.C[action.meta].length < 1) {
        state.storage.loan.finance.C[action.meta] = [
          ...state.storage.loan.finance.C[action.meta],
          { ...action.payload, primary: true },
        ];
      } else {
        state.storage.loan.finance.C[action.meta] = [
          ...state.storage.loan.finance.C[action.meta],
          { ...action.payload },
        ];
      }
    },
    prepare(
      payload: ILOANNormalStorageLOANInOutInfo,
      meta: keyof Pick<
        ILOANNormalStorageLOANInOut,
        "suppliers" | "purchasingPartner"
      >
    ) {
      return { payload, meta };
    },
  },
  setLOANInOutPrimary: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        keyof Pick<
          ILOANNormalStorageLOANInOut,
          "suppliers" | "purchasingPartner"
        >
      >
    ) {
      state.storage.loan.finance.C[action.meta] = state.storage.loan.finance.C[
        action.meta
      ].map((s) => ({ ...s, primary: s.uuid === action.payload }));
    },
    prepare(
      payload: string,
      meta: keyof Pick<
        ILOANNormalStorageLOANInOut,
        "suppliers" | "purchasingPartner"
      >
    ) {
      return { payload, meta };
    },
  },
  updateLOANInOutInfo: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        ILOANNormalStorageLOANInOutInfo,
        string,
        keyof Pick<
          ILOANNormalStorageLOANInOut,
          "suppliers" | "purchasingPartner"
        >
      >
    ) {
      state.storage.loan.finance.C[action.meta] = state.storage.loan.finance.C[
        action.meta
      ].map((s) => {
        if (s.uuid === action.payload.uuid) {
          return { ...action.payload };
        }

        return { ...s };
      });
    },
    prepare(
      payload: ILOANNormalStorageLOANInOutInfo,
      meta: keyof Pick<
        ILOANNormalStorageLOANInOut,
        "suppliers" | "purchasingPartner"
      >
    ) {
      return { payload, meta };
    },
  },
  setLOANInOutNote: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        keyof Pick<ILOANNormalStorageLOANInOut, "note" | "suggest">
      >
    ) {
      state.storage.loan.finance.C[action.meta] = action.payload;
    },
    prepare(
      payload: string,
      meta: keyof Pick<ILOANNormalStorageLOANInOut, "note" | "suggest">
    ) {
      return { payload, meta };
    },
  },
  setSupplierInfo(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    const index = state.storage.loan.finance.C.suppliers?.findIndex(
      (i) => i.primary === true
    );
    if (index >= 0) {
      state.storage.loan.finance.C.suppliers[index].info = action.payload;
    }
  },
  setPrimarySupplier: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | boolean,
        string,
        keyof ILOANNormalStorageLOANInOutInfo
      >
    ) {
      const primary = state.storage.loan.finance.C.suppliers?.find(
        (s) => s.primary
      );

      if (primary) {
        state.storage.loan.finance.C.suppliers =
          state.storage.loan.finance.C.suppliers.map((s) =>
            s.primary ? { ...s, [action.meta]: action.payload } : { ...s }
          );
      } else {
        state.storage.loan.finance.C.suppliers = [
          ...state.storage.loan.finance.C.suppliers,
          {
            info: "",
            method: "TRANS",
            payment: "CASH",
            primary: true,
            uuid: generateUUID(),
            [action.meta]: action.payload,
          },
        ];
      }
    },

    prepare(
      payload: string | number | null | boolean,
      meta: keyof ILOANNormalStorageLOANInOutInfo
    ) {
      return { payload, meta };
    },
  },
  setPrimaryPurchasingPartner: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | boolean,
        string,
        keyof ILOANNormalStorageLOANInOutInfo
      >
    ) {
      const primary = state.storage.loan.finance.C.purchasingPartner?.find(
        (s) => s.primary
      );

      if (primary) {
        state.storage.loan.finance.C.purchasingPartner =
          state.storage.loan.finance.C.purchasingPartner.map((s) =>
            s.primary ? { ...s, [action.meta]: action.payload } : { ...s }
          );
      } else {
        state.storage.loan.finance.C.purchasingPartner = [
          ...state.storage.loan.finance.C.purchasingPartner,
          {
            info: "",
            method: "TRANS",
            payment: "CASH",
            primary: true,
            uuid: generateUUID(),
            [action.meta]: action.payload,
          },
        ];
      }
    },

    prepare(
      payload: string | number | null | boolean,
      meta: keyof ILOANNormalStorageLOANInOutInfo
    ) {
      return { payload, meta };
    },
  },

  setAnalysisEvaluateInfo: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | number | null | boolean,
        string,
        { key: string }
      >
    ) {
      state.storage.loan.finance.E = {
        ...state.storage.loan.finance.E,
        [action.meta.key]: action.payload,
      };
    },

    prepare(payload: string | number | null | boolean, meta: { key: string }) {
      return { payload, meta };
    },
  },
  saveLoanProduct(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {},
  saveLoanCapitalNeed(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<boolean>
  ) {},
  saveLoanBussinessHouseHold(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<boolean>
  ) {},
  saveLoanFinance(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<boolean>
  ) {},

  setLoanValidate(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalStorageLoanValidate>
  ) {
    state.storage.loan.validate = action.payload;
  },
  // update storage khi load lại trang hoặc lưu
  updateAPIStorageLOANProduct: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<IProductLoanProgramInfo, string, string>
    ) {
      const data: typeof state.storage.loan = {
        ...state.storage.loan,
      };

      if (state.storage.full.data) {
        state.storage.full.data.form.loan_info_form.product_loan_program_info =
          action.payload;
      }
      data.product = {
        loanType: action.payload.loan_program_info.loan_term_info.code,
        productPurpose: action.payload.loan_program_info.loan_purpose_info.code,
        corePurpose:
          action.payload.loan_program_info.fcc_loan_purpose_info.code,
        realPurpose: action.payload.loan_program_info.actual_purpose_using_loan,
      };

      state.storage.loan = {
        ...state.storage.loan,
        product: {
          ...state.storage.loan.product,
          loanType: data.product.loanType,
          productPurpose: data.product.productPurpose,
          corePurpose: data.product.corePurpose,
          realPurpose: data.product.realPurpose,
        },
      };
    },

    prepare(payload: IProductLoanProgramInfo, meta: string) {
      return { payload, meta };
    },
  },
  updateAPIStorageLOANNeededPlan: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<ICapitalNeedLoanPlanInfo, string, string>
    ) {
      const data: typeof state.storage.loan = {
        ...state.storage.loan,
      };
      if (state.storage.full.data) {
        state.storage.full.data.form.loan_info_form.capital_need_loan_plan_info =
          action.payload;
      }

      data.needAndPlan = {
        currency: action.payload.currency_info.currency_code,
        need: action.payload.total_capital_requirements,
        ownCaptital: action.payload.owner_capital,
        method: action.payload.credit_granting_method_info.code,
        expiredCredit: action.payload.credit_request_period,
        expiredWithdraw: action.payload.withdraw_month_term,
        graceOrigin: action.payload.principal_grace_period,
        interestRate: action.payload.interest_rate,
        periodAdjust: action.payload.interest_rate_adapt_period_info.code,
        marginAdjust: action.payload.interest_rate_amplitude,
        disbursementMethod: action.payload.disbursement_method_info.code,
        repayOriginMethod: action.payload.principal_payment_method_info.code,
        repayinterestMethod: action.payload.interest_payment_method_info.code,
        amountPaidEachPeriod: action.payload.principal_payment_period_amount,
        loanAmount: action.payload.loan_amount,
        scb_percentage: action.payload.scb_finance_percentage,
        document_info_list: 
        action?.payload?.document_info_list?.map((docInfo) => {
          const currentList = data?.needAndPlan?.document_info_list?.find(e => e.document_id == docInfo.document_id)
          return {
            ...docInfo,
            uuid: currentList?.uuid ?? generateUUID(),
            document_group:
              docInfo?.document_group?.map((docG) => {
                const currentGroup = currentList?.document_group?.find(e => e.document_id == docG.document_id)
                return {
                ...docG,
                uuid: currentGroup?.uuid ?? generateUUID(),
                child_files: docG.child_files?.map((file)=>({
                  ...file,
                  file_upload:null
                })) ?? [],
              }}) ?? [],
          }}) ?? ([] as ILOANNormalDocumentInfoList[]),
      };
      state.storage.loan = {
        ...state.storage.loan,
        needAndPlan: {
          ...state.storage.loan.needAndPlan,
          currency: data.needAndPlan.currency ?? "",
          need: data.needAndPlan.need,
          ownCaptital: data.needAndPlan.ownCaptital,
          method: data.needAndPlan.method ?? "",
          expiredCredit: data.needAndPlan.expiredCredit,
          expiredWithdraw: data.needAndPlan.expiredWithdraw,
          graceOrigin: data.needAndPlan.graceOrigin,
          interestRate: data.needAndPlan.interestRate,
          periodAdjust: data.needAndPlan.periodAdjust ?? "",
          marginAdjust: data.needAndPlan.marginAdjust,
          disbursementMethod: data.needAndPlan.disbursementMethod ?? "",
          repayOriginMethod: data.needAndPlan.repayOriginMethod ?? "",
          repayinterestMethod: data.needAndPlan.repayinterestMethod ?? "",
          amountPaidEachPeriod: data.needAndPlan.amountPaidEachPeriod,
          document_info_list: data.needAndPlan.document_info_list ?? [],
          loanAmount: data.needAndPlan.loanAmount,
          scb_percentage: data.needAndPlan.scb_percentage,
        },
      };
    },
    prepare(payload: ICapitalNeedLoanPlanInfo, meta: string) {
      return { payload, meta };
    },
  },
  updateAPIStorageLOANBusinessLegal: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<IBusinessHouseholdInfo, string, string>
    ) {
      const data: typeof state.storage.loan = {
        ...state.storage.loan,
      };
      if (state.storage.full.data) {
        state.storage.full.data.form.loan_info_form.operation_business.business_household_info =
          action.payload;
      }
      data.legalBusiness = {
        name: action.payload.basic_info.business_household_name,
        type: action.payload.basic_info.business_license_type_info.code,
        num: action.payload.basic_info.business_card_num,
        issuedDate:
          parseInt(action.payload.basic_info.business_card_issue_date) * 1000,
        placeOfIssued: action.payload.basic_info.business_card_place_of_issue,
        numOfYear: action.payload.basic_info.business_working_year_num,
        code: action.payload.basic_info.business_main_info.code,
        career: action.payload.basic_info.business_actual,
        area: action.payload.business_info.business_premises_area,
        ownership: action.payload.business_info.owner_property_info.code,
        remainLease: action.payload.business_info.remaining_rental_period,
        rentPrice: action.payload.business_info.rental_cost,
        apartment: action.payload.business_info.address_info.address,
        province:
          action.payload.business_info.address_info.province_info.province_code,
        district:
          action.payload.business_info.address_info.district_info.district_code,
        ward: action.payload.business_info.address_info.ward_info.ward_code,
        stores: action.payload.warehouse_info.map((st, id) => ({
          area: st.warehouse_area,
          apartment: st.address_info.address,
          province: st.address_info.province_info.province_code,
          district: st.address_info.district_info.district_code,
          ward: st.address_info.ward_info.ward_code,
          primary: st.primary_flag,
          uuid: generateUUID(),
        })),
      };

      state.storage.loan = {
        ...state.storage.loan,
        legalBusiness: {
          name: data.legalBusiness.name,
          type: data.legalBusiness.type,
          num: data.legalBusiness.num,
          issuedDate: data.legalBusiness.issuedDate,
          placeOfIssued: data.legalBusiness.placeOfIssued,
          numOfYear: data.legalBusiness.numOfYear,
          code: data.legalBusiness.code,
          career: data.legalBusiness.career,
          area: data.legalBusiness.area,
          ownership: data.legalBusiness.ownership,
          remainLease: data.legalBusiness.remainLease,
          rentPrice: data.legalBusiness.rentPrice,
          apartment: data.legalBusiness.apartment,
          province: data.legalBusiness.province,
          district: data.legalBusiness.district,
          ward: data.legalBusiness.ward,
          stores: [
            ...(data.legalBusiness.stores.map((st, i) => ({
              area: st.area,
              apartment: st.apartment,
              province: st.province,
              district: st.district,
              ward: st.ward,
              primary: st.primary,
              uuid: st.uuid,
            })) ?? []),
          ],
        },
      };
    },
    prepare(payload: IBusinessHouseholdInfo, meta: string) {
      return { payload, meta };
    },
  },
  updateAPIStorageLOANFinance: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<IFinancialAnalysisInfo, string, string>
    ) {
      const Finance = action.payload;
      if (state.storage.full.data) {
        state.storage.full.data.form.loan_info_form.operation_business.financial_analysis_info =
          action.payload;
      }
      const financeItemData = (itemInfo: IFinanceMetadataItemInfo[]) => {
        const timelineName = ["T2", "T1", "T", "KH", "NVKD"];

        let data: ILOANNormalStorageLOANFinanceMetadataValue = {
          T2: null,
          T1: null,
          T: null,
          KH: null,
          NVKD: null,
        };

        itemInfo.forEach((item) => {
          const key = timelineName[
            item.timeline_assign_info.id - 1
          ] as keyof ILOANNormalStorageLOANFinanceMetadataValue;
          data[key] = item.timeline_assign_value;
        });
        return data;
      };

      const tableA = () => {
        let resultA: ILOANNormalStorageLOANFinanceMetadataRow[] = [];
        Finance?.business_result_list.forEach((result) => {
          // if (
          //   result.finance_metadata_id !== 8 &&
          //   result.finance_metadata_id !== 13
          // ) {
            resultA.push({
              id: result.finance_metadata_id,
              data: financeItemData(result.finance_metadata_item_info),
              child: [],
            });
          // }
        });
        return resultA;
      };

      const tableB = () => {
        let resultA: ILOANNormalStorageLOANFinanceMetadataRow[] = [];
        Finance?.asset_balance_capital_list.forEach((result) => {
          // if (
          //   result.finance_metadata_id !== 14 &&
          //   result.finance_metadata_id !== 19
          // ) {
            resultA.push({
              id: result.finance_metadata_id,
              data: financeItemData(result.finance_metadata_item_info),
              child: [],
            });
          // }
        });
        return resultA;
      };

      const tableC = {
        suppliers:
          Finance?.business_finance_cash_flow_info.cash_flow_info.input_info.vendor_info.map(
            (sp) => {
              return {
                info: sp.name ?? "",
                payment: sp.exchange_method_info.code ?? 'FAST',
                method: sp.payment_method_info.code ?? 'TRANS',
                primary: sp.primary_flag,
                uuid: generateUUID(),
              };
            }
          ) ?? [],
        supplyData: financeItemData(Finance?.business_finance_cash_flow_info.cash_flow_info.input_info.timeline_info),
        purchasingData: financeItemData(Finance?.business_finance_cash_flow_info.cash_flow_info.output_info.timeline_info),
        purchasingPartner:
          Finance?.business_finance_cash_flow_info.cash_flow_info.output_info.vendor_info.map(
            (sp) => {
              return {
                info: sp.name ?? "",
                payment: sp.exchange_method_info.code ?? 'FAST',
                method: sp.payment_method_info.code ?? 'TRANS',
                primary: sp.primary_flag,
                uuid: generateUUID(),
              };
            }
          ) ?? [],
        note: Finance?.business_finance_cash_flow_info?.general_comment ?? "",
        suggest: Finance?.business_finance_cash_flow_info?.general_offer ?? "",
      };

      const tableD = () => {
        let resultA: ILOANNormalStorageLOANFinanceMetadataRow[] = [];
        Finance?.credit_limit_info.forEach((result) => {
          // if (
          //   result.finance_metadata_id === 25 ||
          //   result.finance_metadata_id === 26 ||
          //   result.finance_metadata_id === 30 ||
          //   result.finance_metadata_id === 36 ||
          //   result.finance_metadata_id === 37
          // ) {
            resultA.push({
              id: result.finance_metadata_id,
              data: financeItemData(result.finance_metadata_item_info),
              child: [],
            });
          // }
        });
        return resultA;
      };

      const tableE = {
        loan_appraised_analysis_info:
          Finance?.analysis_evaluate_info.appraised_analysis_info.code ?? "N",
        loan_evaluate_info: Finance?.analysis_evaluate_info.evaluate_info.code,
        loan_comment: Finance?.analysis_evaluate_info.comment,
      };

      state.storage.loan = {
        ...state.storage.loan,
        finance: {
          A: tableA(),
          B: tableB(),
          C: tableC,
          D: tableD(),
          E: tableE,
        },
      };
    },
    prepare(payload: IFinancialAnalysisInfo, meta: string) {
      return { payload, meta };
    },
  },
  // updateAPIStorageLOAN: {
  //   reducer(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalLOANForm, string, string>) {

  //     const data: typeof state.storage.loan = {
  //       ...state.storage.loan
  //     };
  //     console.log(action.payload,'1223=========');

  //     data.product = {
  //       loanType: action.payload.data.product_loan_program_info.loan_program_info.loan_term_info.code,
  //       productPurpose: action.payload.data.product_loan_program_info.loan_program_info.loan_purpose_info.code,
  //       corePurpose: action.payload.data.product_loan_program_info.loan_program_info.fcc_loan_purpose_info.code,
  //       realPurpose: action.payload.data.product_loan_program_info.loan_program_info.actual_purpose_using_loan,
  //     };
  //     data.needAndPlan = {
  //       currency: action.payload.data.capital_need_loan_plan_info.currency_info.currency_code,
  //       need: action.payload.data.capital_need_loan_plan_info.total_capital_requirements.value,
  //       ownCaptital: action.payload.data.capital_need_loan_plan_info.owner_capital.value,
  //       method: action.payload.data.capital_need_loan_plan_info.credit_granting_method_info.code,
  //       expiredCredit: action.payload.data.capital_need_loan_plan_info.credit_request_period.value,
  //       expiredWithdraw: action.payload.data.capital_need_loan_plan_info.withdraw_month_term.value,
  //       graceOrigin: action.payload.data.capital_need_loan_plan_info.principal_grace_period.value,
  //       interestRate: action.payload.data.capital_need_loan_plan_info.interest_rate.value,
  //       periodAdjust: action.payload.data.capital_need_loan_plan_info.interest_rate_adapt_period_info.code,
  //       marginAdjust: action.payload.data.capital_need_loan_plan_info.interest_rate_amplitude.value,
  //       disbursementMethod: action.payload.data.capital_need_loan_plan_info.disbursement_method_info.code,
  //       repayOriginMethod: action.payload.data.capital_need_loan_plan_info.principal_payment_method_info.code,
  //       repayinterestMethod: action.payload.data.capital_need_loan_plan_info.interest_payment_method_info.code,
  //       amountPaidEachPeriod: action.payload.data.capital_need_loan_plan_info.principal_payment_period_amount.value,
  //     };

  //     data.legalBusiness = {
  //       name: action.payload.data.operation_business.business_household_info.basic_info.business_household_name,
  //       type: action.payload.data.operation_business.business_household_info.basic_info.business_license_type_info.code,
  //       num: action.payload.data.operation_business.business_household_info.basic_info.business_card_num,
  //       issuedDate: parseInt(action.payload.data.operation_business.business_household_info.basic_info.business_card_issue_date) * 1000,
  //       placeOfIssued: action.payload.data.operation_business.business_household_info.basic_info.business_card_place_of_issue,
  //       numOfYear: action.payload.data.operation_business.business_household_info.basic_info.business_working_year_num,
  //       code: action.payload.data.operation_business.business_household_info.basic_info.business_main_info.code,
  //       career: action.payload.data.operation_business.business_household_info.basic_info.business_actual,
  //       area: action.payload.data.operation_business.business_household_info.business_info.business_premises_area,
  //       ownership: action.payload.data.operation_business.business_household_info.business_info.owner_property_info.code,
  //       remainLease: action.payload.data.operation_business.business_household_info.business_info.remaining_rental_period.value,
  //       rentPrice: action.payload.data.operation_business.business_household_info.business_info.rental_cost.value,
  //       apartment: action.payload.data.operation_business.business_household_info.business_info.address_info.address,
  //       province: action.payload.data.operation_business.business_household_info.business_info.address_info.province_info.province_code,
  //       district: action.payload.data.operation_business.business_household_info.business_info.address_info.district_info.district_code,
  //       ward: action.payload.data.operation_business.business_household_info.business_info.address_info.ward_info.ward_code,
  //       stores: action.payload.data.operation_business.business_household_info.warehouse_info.map((st, id) => ({
  //         area: st.warehouse_area.value,
  //         apartment: st.address_info.address,
  //         province: st.address_info.province_info.province_code,
  //         district: st.address_info.district_info.district_code,
  //         ward: st.address_info.ward_info.ward_code,
  //         primary: st.primary_flag,
  //         uuid: ''
  //       }))
  //     };

  //     const Finance = action.payload.data.operation_business.financial_analysis_info;

  //     const financeItemData = (itemInfo: IFinanceMetadataItemInfo[]) => {
  //       const timelineName = ['T2', 'T1', 'T', 'KH', 'NVKD'];

  //       let data: ILOANNormalStorageLOANFinanceMetadataValue = {
  //         T2: null,
  //         T1: null,
  //         T: null,
  //         KH: null,
  //         NVKD: null,
  //       };

  //       itemInfo.forEach(item => {
  //         const key = timelineName[item.timeline_assign_info.timeline_assign_id - 1] as keyof ILOANNormalStorageLOANFinanceMetadataValue
  //         data[key] = item.timeline_assign_value.value;
  //       })
  //       return data;
  //     }

  //     const tableA = () => {
  //       let resultA: ILOANNormalStorageLOANFinanceMetadataRow[] = [];
  //       Finance?.business_result_list.forEach(result => {
  //         if (result.finance_metadata_id !== 8 && result.finance_metadata_id !== 13) {
  //           resultA.push({
  //             id: result.finance_metadata_id,
  //             data: financeItemData(result.finance_metadata_item_info),
  //             child: [],
  //           })
  //         }

  //       })
  //       return resultA;
  //     }

  //     const tableB = () => {
  //       let resultA: ILOANNormalStorageLOANFinanceMetadataRow[] = [];
  //       Finance?.asset_balance_capital_list.forEach(result => {
  //         if (result.finance_metadata_id !== 14 && result.finance_metadata_id !== 19) {
  //           resultA.push({
  //             id: result.finance_metadata_id,
  //             data: financeItemData(result.finance_metadata_item_info),
  //             child: [],
  //           })
  //         }
  //       })
  //       return resultA;
  //     }

  //     const tableC = {
  //       suppliers: Finance?.business_finance_cash_flow_info?.loan_cash_flow_info.input_info.loan_cash_flow_vendor_info.map(sp => {
  //         return {
  //           info: sp.loan_cash_flow_vendor_name ?? "",
  //           payment: sp.exchange_method_info.code ?? "",
  //           method: sp.payment_method_info.code ?? "",
  //           primary: sp.primary_flag,
  //           uuid: ""
  //         }
  //       }) ?? [],
  //       purchasingPartner: Finance?.business_finance_cash_flow_info?.loan_cash_flow_info.output_info.loan_cash_flow_vendor_info.map(sp => {
  //         return {
  //           info: sp.loan_cash_flow_vendor_name ?? "",
  //           payment: sp.exchange_method_info.code ?? "",
  //           method: sp.payment_method_info.code ?? "",
  //           primary: sp.primary_flag,
  //           uuid: ""
  //         }
  //       }) ?? [],
  //       note: Finance?.business_finance_cash_flow_info?.loan_cash_flow_general_comment,
  //       suggest: Finance?.business_finance_cash_flow_info?.loan_cash_flow_general_offer,
  //     }

  //     const tableD = () => {
  //       let resultA: ILOANNormalStorageLOANFinanceMetadataRow[] = [];
  //       Finance?.credit_limit_info.forEach(result => {
  //         if (result.finance_metadata_id === 25 ||
  //           result.finance_metadata_id === 26 || result.finance_metadata_id === 30
  //           || result.finance_metadata_id === 36 || result.finance_metadata_id === 37
  //         ) {
  //           resultA.push({
  //             id: result.finance_metadata_id,
  //             data: financeItemData(result.finance_metadata_item_info),
  //             child: [],
  //           })
  //         }

  //       })
  //       return resultA;
  //     }

  //     const tableE = {
  //       loan_appraised_analysis_info: Finance?.analysis_evaluate_info.loan_appraised_analysis_info.code ?? "N",
  //       loan_evaluate_info: Finance?.analysis_evaluate_info.loan_evaluate_info.code,
  //       loan_comment: Finance?.analysis_evaluate_info.loan_comment
  //     }

  //     state.storage.loan = {
  //       ...state.storage.loan,
  //       product: {
  //         ...state.storage.loan.product,
  //         loanType: data.product.loanType,
  //         productPurpose: data.product.productPurpose ,
  //         corePurpose: data.product.corePurpose ,
  //         realPurpose: data.product.realPurpose,
  //       },
  //       needAndPlan: {
  //         ...state.storage.loan.needAndPlan,
  //         currency: data.needAndPlan.currency ?? "",
  //         need: data.needAndPlan.need,
  //         ownCaptital: data.needAndPlan.ownCaptital,
  //         method: data.needAndPlan.method ?? "",
  //         expiredCredit: data.needAndPlan.expiredCredit,
  //         expiredWithdraw: data.needAndPlan.expiredWithdraw,
  //         graceOrigin: data.needAndPlan.graceOrigin,
  //         interestRate: data.needAndPlan.interestRate,
  //         periodAdjust: data.needAndPlan.periodAdjust ?? "",
  //         marginAdjust: data.needAndPlan.marginAdjust,
  //         disbursementMethod: data.needAndPlan.disbursementMethod ?? "",
  //         repayOriginMethod: data.needAndPlan.repayOriginMethod ?? "",
  //         repayinterestMethod: data.needAndPlan.repayinterestMethod ?? "",
  //         amountPaidEachPeriod: data.needAndPlan.amountPaidEachPeriod,
  //       },

  //       legalBusiness: {
  //         name: data.legalBusiness.name ?? "",
  //         type: data.legalBusiness.type ?? "",
  //         num: data.legalBusiness.num ?? "",
  //         issuedDate: data.legalBusiness.issuedDate,
  //         placeOfIssued: data.legalBusiness.placeOfIssued ?? "",
  //         numOfYear: data.legalBusiness.numOfYear,
  //         code: data.legalBusiness.code ?? "",
  //         career: data.legalBusiness.career ?? "",
  //         area: data.legalBusiness.area,
  //         ownership: data.legalBusiness.ownership ?? "",
  //         remainLease: data.legalBusiness.remainLease,
  //         rentPrice: data.legalBusiness.rentPrice,
  //         apartment: data.legalBusiness.apartment ?? "",
  //         province: data.legalBusiness.province ?? "",
  //         district: data.legalBusiness.district ?? "",
  //         ward: data.legalBusiness.ward ?? "",
  //         stores: [
  //           ...data.legalBusiness.stores.map((st, i) => ({
  //             area: st.area,
  //             apartment: st.apartment,
  //             province: st.province,
  //             district: st.district,
  //             ward: st.ward,
  //             primary: st.primary,
  //             uuid: st.uuid
  //           })) ?? []
  //         ]

  //       },
  //       finance: {
  //         A: tableA(),
  //         B: tableB(),
  //         C: tableC,
  //         D: tableD(),
  //         E: tableE,
  //       }
  //     }

  //   },
  //   prepare(payload: ILOANNormalLOANForm, meta: string) {
  //     return { payload, meta };
  //   }
  // },

  clearNormalLOAN(state: Draft<ILOANNormalState>) {
    state.storage.loan.product = loanState.product;
    state.storage.loan.needAndPlan = loanState.needAndPlan;
    state.storage.loan.legalBusiness = loanState.legalBusiness;
    state.storage.loan.finance.A = loanState.finance.A;
    state.storage.loan.finance.B = loanState.finance.B;
    state.storage.loan.finance.C = loanState.finance.C;
    state.storage.loan.finance.D = loanState.finance.D;
    state.storage.loan.finance.E = loanState.finance.E;
  },

  autoFillNeedAndPlan(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.loan.needAndPlan = {
      ...autoFillStepB,
    };
  },
  autoFillBussiness(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.loan.legalBusiness = {
      ...autoFillBussiness,
    };
  },
  autoFillFinance(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.loan.finance = {
      ...autoFillFinance,
    };
  },
  autoFillStepA(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.loan.product = {
      ...autoFillStepA,
    };
  },
  deleteLOAN(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {},
  deleteInOut(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.loan.finance.C.suppliers =
      state.storage.loan.finance.C.suppliers.filter(
        (i) => i.uuid !== action.payload
      );
    state.storage.loan.finance.C.purchasingPartner =
      state.storage.loan.finance.C.purchasingPartner.filter(
        (i) => i.uuid !== action.payload
      );
  },
  clearStorageDelete(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    switch (action.payload) {
      case "product":
        state.storage.loan.product = loanState.product;
        break;
      case "need-and-plan":
        state.storage.loan.needAndPlan = loanState.needAndPlan;
        break;
      case "business/household-legal":
        state.storage.loan.legalBusiness = loanState.legalBusiness;
        break;
      case "business/finance-analysis":
        state.storage.loan.finance.A = loanState.finance.A;
        state.storage.loan.finance.B = loanState.finance.B;
        state.storage.loan.finance.C = loanState.finance.C;
        state.storage.loan.finance.D = loanState.finance.D;
        state.storage.loan.finance.E = loanState.finance.E;
        break;
    }
  },

  /**
   * handle FILE LOAN
   */

  // **********MASTER DOCUMENT ACTIONS******************
  // Add new
  addNewLOANNormalStorageLOANParentDoc(state: Draft<ILOANNormalState>) {
    const empty: TYPE_LOAN.ILOANNormalDocumentInfoList = {
      uuid: `${PREFIX_LOCAL}${generateUUID()}`,
      document_group: [],
      document_id: "",
      document_name: "",
    };
    const doc = state.storage.loan.needAndPlan.document_info_list
      ? [...state.storage.loan.needAndPlan.document_info_list]
      : [];
    doc.push(empty);
    state.storage.loan.needAndPlan.document_info_list = doc;
  },
  setDataLOANNormalStorageLOANParentDoc: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | null | number | undefined,
        string,
        {
          parentDoc_uuid: string;
          currentData: {
            label: string;
            value: string | null | number | undefined;
          };
        }
      >
    ) {
      const doc = state.storage.loan.needAndPlan.document_info_list;
      if (!doc) return;
      state.storage.loan.needAndPlan.document_info_list = doc.map(
        (parentDoc) => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            const document_id = action.payload ?? "";
            const document_name = action?.meta?.currentData?.label ?? "";
            if (document_id && document_name) {
              return {
                ...parentDoc,
                document_id,
                document_name,
              };
            }
          }
          return parentDoc;
        }
      );
    },

    prepare(
      payload: string | null | number | undefined,
      meta: {
        parentDoc_uuid: string;
        currentData: {
          label: string;
          value: string | null | number | undefined;
        };
      }
    ) {
      return { payload, meta };
    },
  },
  // **********DOCUMENT GROUP ACTIONS******************
  mappingLOANDataFileAlterUpload(state: Draft<ILOANNormalState>,action: PayloadAction<ILOANNormalDocumentInfoList[]>){
    state.storage.loan.needAndPlan.document_info_list = action.payload
  },
  
  addNewLOANNormalStorageLOANDoc(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<{
      parentDoc_uuid: string;
    }>
  ) {
    const docInfos = state.storage.loan.needAndPlan.document_info_list;

    state.storage.loan.needAndPlan.document_info_list = docInfos.map(
      (docInfo) => {
        if (docInfo.uuid === action.payload.parentDoc_uuid) {
          const docGroups = docInfo.document_group
            ? [...docInfo.document_group]
            : [];
          const empty: TYPE_LOAN.ILOANNormalDocumentGroup = {
            uuid: `${PREFIX_LOCAL}${generateUUID()}`,
            child_files: [],
            document_id: "",
            document_name: "",
          };
          docGroups.push(empty);

          return { ...docInfo, document_group: docGroups };
        }
        return docInfo;
      }
    );
  },
  setDataLOANNormalStorageLOANDoc: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string | null | number | undefined,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
          currentData: {
            label: string;
            value: string | null | number | undefined;
          };
        }
      >
    ) {
      const doc = state.storage.loan.needAndPlan.document_info_list;
      if (!doc) return;
      state.storage.loan.needAndPlan.document_info_list = doc.map(
        (parentDoc) => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            return {
              ...parentDoc,
              document_group: parentDoc.document_group.map((docG) => {
                if (docG.uuid === action.meta.doc_uuid) {
                  const document_id = action.payload ?? "";
                  const document_name = action?.meta?.currentData?.label ?? "";
                  return {
                    ...docG,
                    document_id,
                    document_name,
                  };
                }
                return docG;
              }),
            };
          }
          return parentDoc;
        }
      );
    },

    prepare(
      payload: string | null | number | undefined,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
        currentData: {
          label: string;
          value: string | null | number | undefined;
        };
      }
    ) {
      return { payload, meta };
    },
  },
  // **********FILE ACTIONS******************
  addNewLOANNormalStorageLOANFile(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<{
      parentDoc_uuid: string;
      doc_uuid: string;
    }>
  ) {
    const docInfos = state.storage.loan.needAndPlan.document_info_list;

    state.storage.loan.needAndPlan.document_info_list = docInfos.map(
      (docInfo) => {
        if (docInfo.uuid === action.payload.parentDoc_uuid) {
          return {
            ...docInfo,
            document_group: docInfo.document_group.map((docGr) => {
              if (docGr.uuid === action.payload.doc_uuid) {
                const childs = docGr.child_files ? [...docGr.child_files] : [];
                const empty: TYPE_LOAN.ILOANNormalChildfile = {
                  uuid: `${PREFIX_LOCAL}${generateUUID()}`,
                  content_type: null,
                  created_at: null,
                  created_by: "",
                  created_by_name: "",
                  updated_by: "",
                  updated_by_name: "",
                  file_upload: null,
                  name: null,
                  size: null,
                  type: null,
                  updated_at: null,
                  version: null,
                  description: null,
                };
                childs.push(empty);
                return { ...docGr, child_files: childs };
              }

              return docGr;
            }),
          };
        }
        return docInfo;
      }
    );
  },
  setDataLOANNormalStorageLOANFile: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        TYPE_LOAN.ILOANNormalChildfile,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
          file_uuid: string;
        }
      >
    ) {
      const doc = state.storage.loan.needAndPlan.document_info_list;
      if (!doc) return;
      state.storage.loan.needAndPlan.document_info_list = doc.map(
        (parentDoc) => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            return {
              ...parentDoc,
              document_group: parentDoc.document_group.map((docG) => {
                if (docG.uuid === action.meta.doc_uuid) {
                  return {
                    ...docG,
                    child_files:
                      docG?.child_files?.map((file) => {
                        if (file.uuid === action.meta.file_uuid) {
                          return {
                            ...file,
                            ...action.payload,
                            uuid: file.uuid,
                          };
                        }
                        return file;
                      }) ?? [],
                  };
                }
                return docG;
              }),
            };
          }
          return parentDoc;
        }
      );
    },

    prepare(
      payload: TYPE_LOAN.ILOANNormalChildfile,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
        file_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },
  setDescriptionLOANNormalStorageLOANFile: {
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
      const doc = state.storage.loan.needAndPlan.document_info_list;
      if (!doc) return;
      state.storage.loan.needAndPlan.document_info_list = doc.map(
        (parentDoc) => {
          if (parentDoc.uuid === action.meta.parentDoc_uuid) {
            return {
              ...parentDoc,
              document_group: parentDoc.document_group.map((docG) => {
                if (docG.uuid === action.meta.doc_uuid) {
                  return {
                    ...docG,
                    child_files:
                      docG?.child_files?.map((file) => {
                        if (file.uuid === action.meta.file_uuid) {
                          return {
                            ...file,
                            description:action.payload,
                            uuid: file.uuid,
                          };
                        }
                        return file;
                      }) ?? [],
                  };
                }
                return docG;
              }),
            };
          }
          return parentDoc;
        }
      );
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
  // ********** REMOVE ACTIONS **********
  // ALL
  removeAllLOANNormalStorageLOANParentDoc(state: Draft<ILOANNormalState>) {
    state.storage.loan.needAndPlan.document_info_list = [];
  },

  // PARENT_DOC
  removeLOANNormalStorageLOANParentDoc(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    const docs = state.storage.loan.needAndPlan.document_info_list;
    if (docs)
      state.storage.loan.needAndPlan.document_info_list = docs.filter(
        (doc) => doc.uuid !== action.payload
      );
  },
  removeLOANNormalStorageLOANDoc:{
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
      const docs = state.storage.loan.needAndPlan.document_info_list;
      if (docs)
        state.storage.loan.needAndPlan.document_info_list = docs.map(parentDoc=>{
          if(parentDoc.uuid === action.meta.parentDoc_uuid){
            return {...parentDoc, document_group:parentDoc.document_group.filter(doc=>doc.uuid !==action.payload)};
          }
          return parentDoc;
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
  // FILE
  removeLOANNormalStorageLOANFile:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {
          parentDoc_uuid: string;
          doc_uuid: string;
        }
      >
    ) {
      const docs = state.storage.loan.needAndPlan.document_info_list;
      if (docs){
        state.storage.loan.needAndPlan.document_info_list = docs.map(
          (parentDoc) => {
            if (parentDoc.uuid === action.meta.parentDoc_uuid) {
              return {
                ...parentDoc,
                document_group:
                  parentDoc.document_group.map((doc) => {
                    if (doc.uuid === action.meta.doc_uuid) {
                      return {
                        ...doc,
                        child_files: (doc?.child_files ?? [])?.filter(
                          (file) => file.uuid !== action.payload
                        ),
                      };
                    }
                    return doc;
                  }) ?? [],
              };
            }
  
            return parentDoc;
          }
        );
      }
    },

    prepare(
      payload: string,
      meta: {
        parentDoc_uuid: string;
        doc_uuid: string;
      }
    ) {
      return { payload, meta };
    },
  },

  saveLOANNormalStorageLOANModalAttachFile(state: Draft<ILOANNormalState>, action: PayloadAction<TYPE_LOAN.ILOANNormalLOANUpload>) {},
  mappingDataLOANNormalStorageLOANModalAttachFile(state: Draft<ILOANNormalState>, action: PayloadAction<TYPE_LOAN.ILOANNormalChildfile[]>) {
    const docs = state.storage.loan.needAndPlan.document_info_list;
    if (docs){
      action.payload.forEach((fileRes)=>{
        if(!fileRes.custom_keys) return;
        const {parent_id = '', doc_id = '', local_id = '', description =''} = fileRes.custom_keys;
        const currentDoc = docs.find(it=>it.document_id === parent_id);
        if(!currentDoc) return;
        const currentDocGroup = currentDoc.document_group.find(it=>it.document_id === doc_id);
        if(!currentDocGroup) return;
        if(!currentDocGroup.child_files) return;
        const idx = currentDocGroup.child_files?.findIndex(it=>it.uuid === local_id);
        if(idx !== -1)  {
          const result:TYPE_LOAN.ILOANNormalChildfile = {
            ...currentDocGroup.child_files[idx],
            ...fileRes,
            description,
          }
          currentDocGroup.child_files[idx] = result;
        }
      })
    }
  },

  handleContinueLoan:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<number, string, { stepName: string, uuid: string }>) {
    },
    prepare(payload: number, meta:{
      stepName: string,
      uuid: string
    }){
      return { payload, meta };
    }
  },
};
