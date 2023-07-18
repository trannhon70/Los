import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import {
  ILOANNormalLegalBor,
  ILOANNormalLegalBorrower,
  ILOANNormalLegalRelated,
  ILOANNormalLegalReLrt,
  ILOANNormalStorageAddress,
  ILOANNormalStorageIdentity,
  ILOANNormalStorageLegalDeclareAddress,
  ILOANNormalStorageLegalDeclareState,
  ILOANNormalStorageLegalFile,
  ILoanNormalLegalAPI,
  IParamDeleteLOANNormalStoredLegal,
} from 'types/models/loan/normal/storage/Legal';
import { ELegalTypeScreen } from './case';
import { ValidateLegal } from './validate';
import * as _ from 'lodash';
import {
  IFinanceMetadataItemInfo,
  IFinancialAnalysisInfo,
  ILOANData,
  ILoanProductInfo,
} from 'types/models/loan/normal/storage/LOAN';
import { ILOANNormalState } from 'types/models/loan/normal';
import { PREFIX_LOCAL } from 'utils';
const arrDeclare = [
  'BORROWER',
  'MARRIAGE',
  'CO_PAYER',
  'CO_BRW',
  'RELATED',
  'LAW_RLT',
  'OTHER',
];

export const checkExistIdentityDataInCIC =
  (screen: string, person_uuid: string, identity_num: string) =>
  (state: RootState) => {
    // console.log(screen, person_uuid, identity_num);

    const convertDeclare = (screen: string) => {
      switch (screen) {
        case 'BORROWER':
          return 'borrower';
        case 'MARRIAGE':
          return 'marriage';
        case 'CO_PAYER':
          return 'co-payer';
        case 'CO_BRW':
          return 'co-brw';
        case 'LAW_RLT':
          return 'law-rlt';
        case 'OTHER':
          return 'other';
        default:
          return '';
      }
    };
    const declare = convertDeclare(screen);
    if (declare === '') {
      return false;
    } else {
      return (
        (state.LOANNormal.storage.cic?.scb?.data[declare]?.data
          ?.find((person) => person.person_uuid === person_uuid)
          ?.data?.find((iden) => iden.identity_num === identity_num)?.credit
          ?.length ||
          state.LOANNormal.storage.cic?.other?.data[declare]?.data
            ?.find((person) => person.person_uuid === person_uuid)
            ?.data?.find((iden) => iden.identity_num === identity_num)?.credit
            ?.length) &&
        (state.LOANNormal.storage.cic?.scb?.data[declare]?.data
          ?.find((person) => person.person_uuid === person_uuid)
          ?.data?.find((iden) => iden.identity_num === identity_num)?.credit
          ?.length !== 0 ||
          state.LOANNormal.storage.cic?.other?.data[declare]?.data
            ?.find((person) => person.person_uuid === person_uuid)
            ?.data?.find((iden) => iden.identity_num === identity_num)?.credit
            ?.length !== 0)
      );
    }
    // console.log(state.LOANNormal.storage.cic?.scb?.data[declare]?.data?.find(
    //   person => person.person_uuid === person_uuid)?.data?.find(
    //     iden => iden.identity_num === identity_num)?.credit?.length);

    // console.log(state.LOANNormal.storage.cic?.other?.data[declare]?.data?.find(
    //   person => person.person_uuid === person_uuid)?.data?.find(
    //     iden => iden.identity_num === identity_num)?.credit?.length);
  };

export const getdataLegal = (declare: string) => (state: RootState) =>
  state.LOANNormal.storage.legal?.data[declare];

export const isCheckPersionUuid = (declare: string) => (state: RootState) =>
  state.LOANNormal.storage.legal?.data[declare]?.info[0]?.basic.person_uuid
    .length > 0;

export const isCheckCreateLegalBorrower = (state: RootState) =>
  state.LOANNormal.storage.full.data?.form.legal_info_form.data.borrower !==
    null &&
  ((state.LOANNormal.storage.full.data &&
    state.LOANNormal.storage.full.data.form.legal_info_form.data.related
      .person_los.length > 0) ||
    (state.LOANNormal.storage.full.data &&
      state.LOANNormal.storage.full.data.form.legal_info_form.data.related
        .other_person.length > 0));

export const dataBorrowerInfomation = (state: RootState) => {
  const Selectcategory = state.LOANNormal.configs.product.category.data?.find(
    (item) =>
      item.product_category_id === state.LOANNormal.storage.product.category
  );
  const { loan_product_type_info_list } = Selectcategory || {};
  const SelectedType = loan_product_type_info_list?.find(
    (t) => t.product_type_id === state.LOANNormal.storage.product.type
  );
  const { loan_product_detail_info_list } = SelectedType || {};
  const SelectedDetail = loan_product_detail_info_list?.find(
    (d) => d.product_detail_id === state.LOANNormal.storage.product.detail
  );
  return {
    cif: state.LOANNormal.storage.legal.data[ELegalTypeScreen.BORROWER].info[0]
      .cif,
    basicInfo:
      state.LOANNormal.storage.legal.data[ELegalTypeScreen.BORROWER].info[0]
        .basic,
    indetity:
      state.LOANNormal.storage.legal.data[ELegalTypeScreen.BORROWER].info[0]
        .identity[0],
    productInfo: {
      categoty: Selectcategory,
      type: SelectedType,
      detail: SelectedDetail,
    },
    los_uuid: state.LOANNormal.storage.full.data?.form?.los_info?.los_id,
    loanInfo: {
      totalMoneyLOAN:
        (state.LOANNormal.storage.loan.needAndPlan?.need ?? 0) -
        (state.LOANNormal.storage.loan.needAndPlan.ownCaptital ?? 0),
      expiredCredit: state.LOANNormal.storage.loan.needAndPlan.expiredCredit,
    },
    created_at: state.LOANNormal.storage.full.data?.created_at,
  };
};
export const getCICDeclareActiveInfo =
  (declare: string, activeUuid: string) => (state: RootState) => {
    if (state.LOANNormal.storage.full.data?.form.legal_info_form.data) {
      const { borrower, marriage, co_brw, co_payer, law_rlt, others, related } =
        state.LOANNormal.storage.full.data?.form.legal_info_form.data;
      const getBasic = (data: ILOANNormalLegalBorrower[]) => {
        const br = data.find((item) => item.basic_info.uuid === activeUuid);
        if (!br) return null;
        return br.basic_info;
      };
      switch (declare) {
        case 'other':
          return getBasic(others);
        case 'law-rlt': {
          const item = law_rlt.find(
            (item) => item.basic_info.uuid === activeUuid
          );
          if (!item) return null;
          return item.basic_info;
        }
        case 'co-payer':
          return getBasic(co_payer);
        case 'co-brw':
          return getBasic(co_brw);
        case 'marriage':
          return marriage && marriage.basic_info;
        case 'borrower':
          return borrower && borrower.basic_info;
        default:
          break;
      }
    }
    return null;
  };
export const isCheckExistLoanData = (state: RootState) => {
  const loan_info_form: ILOANData | undefined = _.get(
    state,
    'LOANNormal.storage.full.data.form.loan_info_form',
    {}
  );
  if (!loan_info_form) return false;
  if (!loan_info_form.capital_need_loan_plan_info) return false;
  if (!loan_info_form.product_loan_program_info) return false;
  // const operation_business = Object.values(loan_info_form.operation_business);
  // if(operation_business.some(it=>!!it)){
  //   return operation_business.every(it=>!!it);
  // };
  return true;
};
export const isCheckExistLoanDataProduct = (state: RootState) => {
 
  const loan_info_form: ILOANData | undefined = _.get(
    state,
    'LOANNormal.storage.full.data.form.loan_info_form',
    {}
  );
  const dataFull = _.get(state, 'LOANNormal.storage.full.data', {});

  if (!dataFull) return false;
  if (!loan_info_form) return false;
  if (loan_info_form.product_loan_program_info?.loan_program_info?.loan_purpose_info?.code === 'BUSINESS' &&
    !(loan_info_form?.operation_business?.business_household_info && loan_info_form?.operation_business?.financial_analysis_info)
  ){
    return false;
  }
  return true;
};

export const getFinanceAnalysis = (state: ILOANNormalState) => {
  // state.storage.full.data.form.loan_info_form.operation_business.financial_analysis_info
  const financial_analysis: IFinancialAnalysisInfo | undefined = _.get(
    state,
    'storage.full.data.form.loan_info_form.operation_business.financial_analysis_info'
  );
  const net_revenue_id = 7;
  const total_cost_id = 8;
  const net_profit_id = 13;
  const result: {
    net_revenue: IFinanceMetadataItemInfo[] | null;
    total_cost: IFinanceMetadataItemInfo[] | null;
    net_profit: IFinanceMetadataItemInfo[] | null;
  } = {
    net_revenue: null,
    total_cost: null,
    net_profit: null,
  };
  if (financial_analysis) {
    financial_analysis.business_result_list.forEach((it) => {
      if (it.finance_metadata_id === net_revenue_id) {
        _.set(result, 'net_revenue', it.finance_metadata_item_info);
      }
      if (it.finance_metadata_id === total_cost_id) {
        _.set(result, 'total_cost', it.finance_metadata_item_info);
      }
      if (it.finance_metadata_id === net_profit_id) {
        _.set(result, 'net_profit', it.finance_metadata_item_info);
      }
    });
  }
  return result;
};

export const getValidateLOANNormalStorageLegal = (state: RootState) => {
  return state.LOANNormal.storage.legal.validate;
};

export const getBranchCodeUser = (state: RootState) => {
  return state?.auth?.user;
};
export const getModifyDate = (state: RootState) => {
  return state?.LOANNormal?.storage?.full?.data?.modified_at;
};

export const getActivePerson = (declare: string) => (state: RootState) =>
  state.LOANNormal.storage.legal.data[declare]?.uuidActiveLocal;

export const validateLOANNormalStorageLegal =
  (declare: string) => (state: RootState) => {
    const declareListContact =
      state.LOANNormal.storage.legal.data[declare].listContactPersonUUID;
    const declareType = state.LOANNormal.storage.legal.data[declare].info;
    let isValid = { valid: true, field: '', role: '', declare: '' };

    switch (declare) {
      case ELegalTypeScreen.BORROWER:
        if (declareType.length > 0) {
          const borrowerInfoValidate = ValidateLegal.borrower(
            declareType[0] as ILOANNormalStorageLegalDeclareState
          );
          if (!borrowerInfoValidate.valid)
            return (isValid = { ...borrowerInfoValidate, declare: declare });
        }
        break;

      case ELegalTypeScreen.MARRIAGE:
        if (declareType.length > 0) {
          const marriageInfoValidate = ValidateLegal.marriage(
            declareType[0] as ILOANNormalStorageLegalDeclareState
          );
          if (!marriageInfoValidate.valid)
            return (isValid = { ...marriageInfoValidate, declare: declare });
        }
        break;

      case ELegalTypeScreen.CO_BRW:
        if (declareType.length > 0) {
          const coBorrowerInfoValidate = ValidateLegal.coBorrower(
            declareType as ILOANNormalStorageLegalDeclareState[]
          );
          if (!coBorrowerInfoValidate.valid)
            return (isValid = { ...coBorrowerInfoValidate, declare: declare });
        }
        break;

      case ELegalTypeScreen.CO_PAYER:
        if (declareType.length > 0) {
          const coPayerInfoValidate = ValidateLegal.coPayer(
            declareType as ILOANNormalStorageLegalDeclareState[]
          );
          if (!coPayerInfoValidate.valid)
            return (isValid = { ...coPayerInfoValidate, declare: declare });
        }
        break;

      case ELegalTypeScreen.LAW_RLT:
        if (declareType.length > 0) {
          const lawRltInfoValidate = ValidateLegal.legalRelated(
            declareType as ILOANNormalStorageLegalDeclareState[]
          );
          if (!lawRltInfoValidate.valid)
            return (isValid = { ...lawRltInfoValidate, declare: declare });
        }
        break;

      case ELegalTypeScreen.REALTED:
        if (declareType.length > 0 || declareListContact.length > 0) {
          const contactInfoValidate = ValidateLegal.contact(
            declareType as ILOANNormalStorageLegalDeclareState[]
          );
          if (!contactInfoValidate.valid)
            return (isValid = { ...contactInfoValidate, declare: declare });
        } else {
          return (isValid = {
            valid: false,
            field: 'contact',
            role: 'empty',
            declare: declare,
          });
        }
        break;

      case ELegalTypeScreen.OTHER:
        if (declareType.length > 0) {
          const otherValidate = ValidateLegal.other(
            declareType as ILOANNormalStorageLegalDeclareState[]
          );
          if (!otherValidate.valid)
            return (isValid = { ...otherValidate, declare: declare });
        }
        break;
    }

    return isValid;
  };

export const getLOANNormalStorageLegalBorrower = (state: RootState) =>
  state.LOANNormal.storage.legal.data.BORROWER.info[0]?.declare;

export const getDeclareLegalBorr = (declare: string) => (state: RootState) => {
  return !~state.LOANNormal.storage.legal.data.BORROWER?.info[0]?.declare?.indexOf(
    declare
  );
};

export const getLoanLegalBasic = (declare: string) => (state: RootState) => {
  return state.LOANNormal.storage.legal.data[declare]?.info;
};
export const checkMarriageStatus = (state: RootState) => {
  if (
    state.LOANNormal.storage.legal.data.BORROWER.info[0].basic
      .marriageStatus === 'STABILITY'
  ) {
    return true;
  }
  return false;
};

export const getLOANNormalStorageLegalSave = (state: RootState) => [
  state.LOANNormal.storage.legal,
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string,
  state.masterData,
];

export const getLOANNormalStorageLostUuid = (state: RootState) =>
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string;

export const isCheckMarriage = (state: RootState) =>
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string;

export const isCheckPerionUuid =
  (declare: string) =>
  (state: RootState): boolean => {
    const dataInfo = state.LOANNormal.storage.legal.data[declare]?.info;
    let persionUUid: string = '';

    if (
      declare === ELegalTypeScreen.BORROWER ||
      declare === ELegalTypeScreen.MARRIAGE
    ) {
      persionUUid = dataInfo[0]?.basic?.person_uuid ?? '';
    } else {
      for (let i = 0; i < dataInfo.length; i++) {
        const itemPersion = dataInfo[i]?.basic?.person_uuid ?? '';
        if (itemPersion.length > 0) {
          persionUUid = itemPersion;
          break;
        }
      }
    }

    return persionUUid.length > 0 ? true : false;
  };

export const getLOANNormalAllFullName = (state: RootState) => {
  const declare = state.LOANNormal.storage.legal.data.BORROWER.info[0].declare;
  const dataBORROWER = state.LOANNormal.storage.legal.data.BORROWER;
  const dataCOBORROWER = state.LOANNormal.storage.legal.data.CO_BRW;
  const dataCOPAYER = state.LOANNormal.storage.legal.data.CO_PAYER;
  const dataLAW_RLT = state.LOANNormal.storage.legal.data.LAW_RLT;
  const dataOTHER = state.LOANNormal.storage.legal.data.OTHER;
  const dataMARRIAGE = state.LOANNormal.storage.legal.data.MARRIAGE;
  let rs = [{ value: '', label: '' }];
  if (declare.indexOf('BORROWER') > -1) {
    rs = rs.concat(
      dataBORROWER.info.map((d) => ({
        value: d.basic.person_uuid,
        label: d.basic.fullname,
      }))
    );
  }
  if (declare.indexOf('MARRIAGE') > -1) {
    rs = rs.concat(
      dataMARRIAGE.info.map((d) => ({
        value: d.basic.person_uuid,
        label: d.basic.fullname,
      }))
    );
  }
  if (declare.indexOf('CO_BRW') > -1) {
    rs = rs.concat(
      dataCOBORROWER.info.map((d) => ({
        value: d.basic.person_uuid,
        label: d.basic.fullname,
      }))
    );
  }
  if (declare.indexOf('CO_PAYER') > -1) {
    rs = rs.concat(
      dataCOPAYER.info.map((d) => ({
        value: d.basic.person_uuid,
        label: d.basic.fullname,
      }))
    );
  }
  if (declare.indexOf('LAW_RLT') > -1) {
    rs = rs.concat(
      dataLAW_RLT.info.map((d) => ({
        value: d.basic.person_uuid,
        label: d.basic.fullname,
      }))
    );
  }
  if (declare.indexOf('OTHER') > -1) {
    rs = rs.concat(
      dataOTHER.info.map((d) => ({
        value: d.basic.person_uuid,
        label: d.basic.fullname,
      }))
    );
  }
  rs = rs.concat(
    dataBORROWER.info.map((d) => ({
      value: d.basic.person_uuid,
      label: d.basic.fullname,
    }))
  );
  return rs.filter((d) => d.label);
};

export const getLOANLegalOtherValue = (state: RootState) => {
  return state.LOANNormal.storage.legal.data.RELATED.listContactPersonUUID;
};

export const getLOANNormalIdenAll = (declare: string, uuidPersion?: string) =>
  createSelector(getLoanLegalBasic(declare), (state) => {
    if (declare === 'BORROWER' || declare === 'MARRIAGE') {
      return state[0].identity;
    } else {
      let defaultDataIden: ILOANNormalStorageIdentity[] = [];
      state.map((data) => {
        if (data.uuidActiveLocal === uuidPersion) {
          defaultDataIden = data.identity;
        }
        return { ...data };
      });

      return defaultDataIden;
    }
  });

export const getLOANNormalIdenForm = (declare: string, uuidPersion?: string) =>
  createSelector(getLoanLegalBasic(declare), (state) => {
    if (declare === 'BORROWER' || declare === 'MARRIAGE') {
      return state[0].identity?.find((d) => d.primaryFlag);
    } else {
      let defaultDataIden: ILOANNormalStorageIdentity | undefined =
        {} as ILOANNormalStorageIdentity;

      state.map((data) => {
        if (data.uuidActiveLocal === uuidPersion) {
          defaultDataIden = data.identity?.find((d) => d.primaryFlag);
        }
        return null;
      });

      return defaultDataIden;
    }
  });

export const getListPersonUUID = (state: RootState) => {
  let dataPer = [{ declare_type: '', los_uuid: '', id_num: '', uuid_num: '' }];

  const dataBORROWER = state.LOANNormal.storage.legal.data.BORROWER;
  const dataCOBORROWER = state.LOANNormal.storage.legal.data.CO_BRW;
  const dataCOPAYER = state.LOANNormal.storage.legal.data.CO_PAYER;
  const dataLAW_RLT = state.LOANNormal.storage.legal.data.LAW_RLT;
  const dataOTHER = state.LOANNormal.storage.legal.data.OTHER;
  const dataMARRIAGE = state.LOANNormal.storage.legal.data.MARRIAGE;

  dataPer = dataPer.concat(
    dataBORROWER.info.map((d) => ({
      declare_type: 'BORROWER',
      los_uuid: d.basic.person_uuid,
      id_num: d.identity[0].num,
      uuid_num: d.identity[0].uuid,
    }))
  );
  dataPer = dataPer.concat(
    dataMARRIAGE.info.map((d) => ({
      declare_type: 'MARRIAGE',
      los_uuid: d.basic.person_uuid,
      id_num: d.identity[0].num,
      uuid_num: d.identity[0].uuid,
    }))
  );
  dataPer = dataPer.concat(
    dataCOBORROWER.info.map((d) => ({
      declare_type: 'CO_BRW',
      los_uuid: d.basic.person_uuid,
      id_num: d.identity[0].num,
      uuid_num: d.identity[0].uuid,
    }))
  );
  dataPer = dataPer.concat(
    dataCOPAYER.info.map((d) => ({
      declare_type: 'CO_PAYER',
      los_uuid: d.basic.person_uuid,
      id_num: d.identity[0].num,
      uuid_num: d.identity[0].uuid,
    }))
  );
  dataPer = dataPer.concat(
    dataLAW_RLT.info.map((d) => ({
      declare_type: 'LAW_RLT',
      los_uuid: d.basic.person_uuid,
      id_num: d.identity[0].num,
      uuid_num: d.identity[0].uuid,
    }))
  );
  dataPer = dataPer.concat(
    dataOTHER.info.map((d) => ({
      declare_type: 'OTHER',
      los_uuid: d.basic.person_uuid,
      id_num: d.identity[0].num,
      uuid_num: d.identity[0].uuid,
    }))
  );

  dataPer = dataPer.filter((item) => item.declare_type !== '');
  // console.log("dataPer",dataPer)
  return dataPer;
};

export const getAddressLegal = (declare: string, uuidPersion?: string) =>
  createSelector(getLoanLegalBasic(declare), (state) => {
    if (declare === 'BORROWER' || declare === 'MARRIAGE') {
      return state[0]?.address;
    } else {
      let defaultDataAddress: ILOANNormalStorageLegalDeclareAddress =
        {} as ILOANNormalStorageLegalDeclareAddress;
      state.map((data) => {
        if (data.uuidActiveLocal === uuidPersion) {
          defaultDataAddress = data.address;
        }
        return null;
      });

      return defaultDataAddress ?? [];
    }
  });

export const getLoanLegalUseListActive =
  (declare: string) => (state: RootState) => {
    return state.LOANNormal.storage.legal.data[declare]?.uuidActiveLocal;
  };

export const getLOANNormalLegalAll = (state: RootState) =>
  state.LOANNormal.storage.legal;

export const getLoanLegalUseListData =
  (declare: string, uuid: string) => (state: RootState) => {
    return state.LOANNormal.storage.legal.data[declare]?.info?.find(
      (item) => item.uuidActiveLocal === uuid
    );
  };

export const getLoanLegalIdentity = (declare: string) => (state: RootState) => {
  const legalData = state.LOANNormal.storage.legal.data[declare]?.info;
  return (
    legalData
      ?.map((lgd) => lgd.identity?.find((id) => id.primaryFlag)?.num ?? '')
      .filter((dfill) => dfill.length > 0) ?? []
  );
};

export const getAllAddress = (declareType: string) => (state: RootState) => {
  let arrAddress: ILOANNormalStorageAddress[] = [];

  arrDeclare.forEach((declare) => {
    const legalData = state.LOANNormal.storage.legal.data[declare]?.info;

    legalData.forEach((lgd) => {
      lgd.address.address.map((d) => {
        if (declareType !== declare) {
          arrAddress.push({
            ...d,
            primaryFlag: false,
          });
        } else {
          arrAddress.push(d);
        }
      });
    });
  });

  return arrAddress;
};

// export const getIdentityAll = (declare: string) => (state: RootState) => {
//   const arrDeclare = ["BORROWER", "MARRIAGE", "CO_PAYER", "CO_BRW", "RELATED", "LAW_RLT", "OTHER"]
//     .filter(arrd => arrd !== declare);;
//   let identities: string[] = [];

//   for (let i = 0; i < arrDeclare.length; i++){
//     const legalData = state.LOANNormal.storage.legal.data[arrDeclare[i]]?.info;
//     const idenArr = legalData?.map(lgd => lgd.identity?.find( id => id.primaryFlag)?.num ?? "")
//       ?.filter(dfill => dfill.length > 0) ?? [];
//     identities.push(...idenArr)
//   }

//   return identities;
// }

export const getIdentityAll = (state: RootState) => {
  const arrDeclare = [
    'BORROWER',
    'MARRIAGE',
    'CO_PAYER',
    'CO_BRW',
    'RELATED',
    'LAW_RLT',
    'OTHER',
  ];
  let identities: string[] = [];
  for (let i = 0; i < arrDeclare.length; i++) {
    const legalData = state.LOANNormal.storage.legal.data[arrDeclare[i]]?.info;
    const idenArr =
      legalData
        ?.map((lgd) => lgd.identity?.find((id) => id.primaryFlag)?.num ?? '')
        ?.filter((dfill) => dfill.length > 0) ?? [];

    const dataIden = legalData.map((item) => {
      return { ...item.identity };
    });

    identities.push(...idenArr);
  }

  return identities;
};

export const getMobieAll = (declare: string) => (state: RootState) => {
  let arrDeclare = [
    'BORROWER',
    'MARRIAGE',
    'CO_PAYER',
    'CO_BRW',
    'RELATED',
    'LAW_RLT',
    'OTHER',
  ].filter((arrd) => arrd !== declare);
  let modbies: string[] = [];

  for (let i = 0; i < arrDeclare.length; i++) {
    const legalData = state.LOANNormal.storage.legal.data[arrDeclare[i]]?.info;
    const mobieArr =
      legalData
        ?.map((lgd) => lgd.basic.mobile)
        .filter((dfill) => dfill.length > 0) ?? [];
    modbies.push(...mobieArr);
  }

  return modbies;
};

export const getIdentityLOANNormalStoredFull = (state: RootState) => {
  return state.LOANNormal?.storage?.full.data?.form?.legal_info_form?.data;
};

export const legalGetLOANNormal = (state: RootState) => state.LOANNormal;
//file
export const getListFile =
  (declare: string, uuid: string) => (state: RootState) => {
    return state.LOANNormal.storage.legal.data[declare]?.info?.find(
      (item) => item?.basic?.person_uuid === uuid
    )?.document_info_list;
  };

export const dataDocumentLegal = (state: RootState) => {
  return state.LOANNormal.configs.documentType?.PHAP_LY_Loan?.data;
};
export const getListChildFile =
  (declare: string, uuid: string) => (state: RootState) => {
    return state.LOANNormal.storage.legal.data[declare]?.info?.find(
      (item) => item.uuidActiveLocal === uuid
    )?.document_info_list;
  };
export const getFullLegalData = (state: RootState) =>
  state.LOANNormal.storage.legal.data;

export const getListDeclareDataLegal = (state: RootState) => {
  const data: {
    [name: string]: {
      uuidActiveLocal: string;
      listContactPersonUUID: string[] | number[];
      info: ILOANNormalStorageLegalDeclareState[];
    };
  } = _.get(state.LOANNormal, 'storage.legal.data', {});

  const listDeclareLegal: {
    person_uuid: string;
    declareKey: string;
    documentList: ILOANNormalStorageLegalFile[];
  }[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value) {
      (value?.info as ILOANNormalStorageLegalDeclareState[]).forEach((de) => {
        listDeclareLegal.push({
          person_uuid: de.basic.person_uuid,
          declareKey: key,
          documentList: de?.document_info_list ?? [],
        });
      });
    }
  }
  return listDeclareLegal;
};

// this functions use for attach modal in collateral module
export const getDeclareTypeWithUuid =
  (activeUuid: string | null | undefined) => (state: RootState) => {
    if (!activeUuid) return '';
    const listDeclareLegal = getListDeclareDataLegal(state);
    return _.get(
      listDeclareLegal.find((it) => it.person_uuid === activeUuid),
      'declareKey',
      ''
    );
  };

export const getCountAttachFileDeclareTypeWithUuid =
  (activeUuid: string | null | undefined) => (state: RootState) => {
    if (!activeUuid) return 0;
    const listDeclareLegal = getListDeclareDataLegal(state);
    const documentList: ILOANNormalStorageLegalFile[] = _.get(
      listDeclareLegal.find((it) => it.person_uuid === activeUuid),
      'documentList',
      []
    );

    let count = 0;
    documentList.forEach((doc) => {
      const child_files = _.get(doc, 'child_files', []);
      count +=
        child_files.filter((f) => !f.uuid.includes(PREFIX_LOCAL)).length ?? 0;
    });
    return count;
  };

export const getListDeclareDataFullLegal = (state: RootState) => {
  const data =
    state?.LOANNormal?.storage?.full?.data?.form?.legal_info_form?.data;
  if (!data) return [];
  const list: (
    | ILOANNormalLegalBor
    | ILOANNormalLegalBorrower
    | ILOANNormalLegalReLrt
    | ILOANNormalLegalRelated
    | null
  )[] = [];
  Object.values(data).forEach((value) => {
    const declare = _.isArray(value) ? value : [value];
    declare.forEach((d) => {
      list.push(d);
    });
  });
  return list as ILOANNormalLegalBorrower[];
};

export const getLegalBasicInfoWithUuid =
  (uuid: string) => (state: RootState) => {
    const listDeclareLegal = getListDeclareDataFullLegal(state);
    const result = {
      fullname: '',
      gender: '',
      email: '',
      mobile: '',
    };

    const person = listDeclareLegal.find((it) => it?.basic_info?.uuid === uuid);
    if (!person) return result;
    const dataInfo = person?.basic_info;
    return {
      fullname: dataInfo?.full_name,
      gender: dataInfo?.gender_info?.code ?? '',
      email: dataInfo?.email,
      mobile: dataInfo?.mobile_num,
    };
  };
export const getLegalDataFullDeclare =
  (typeDeclare: string) => (state: RootState) => {
    const legalData: ILoanNormalLegalAPI['data'] | undefined = _.get(
      state.LOANNormal.storage,
      'full.data.form.legal_info_form.data'
    );
    if (!legalData) return null;
    switch (typeDeclare) {
      case 'BORROWER':
        return legalData.borrower;
      case 'MARRIAGE':
        return legalData.marriage;
      case 'CO_BRW':
        return legalData.co_brw;
      case 'CO_PAYER':
        return legalData.co_payer;
      case 'LAW_RLT':
        return legalData.law_rlt;
      case 'RELATED':
        return legalData.related;
      case 'OTHER':
        return legalData.others;
      default:
        return null;
    }
  };

export const getBlackListAlert = (state: RootState) =>
  state.LOANNormal.storage.legal.blacklist;
