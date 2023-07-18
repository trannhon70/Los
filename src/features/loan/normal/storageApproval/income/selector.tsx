import { RootState } from 'types';

import {
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomePension,
  ILOANNormalStorageIncomeStockActive,
  ILOANNormalStorageIncomeAssetRentActive,
  ILOANNormalStorageIncomeCompanyActive,
  ILOANNormalStorageIncomeDepositActive,
  ILOANNormalStorageIncomeBusinessActive,
  ILOANNormalStorageIncomeOtherActive,
  ILOANNormalStorageIncomeSalaryActive,
  ISumToalIncome,
  ILOANNormalStorageIncomeUserList,
  IncomeDeclareRes,
  IIncomeDetails,
} from 'types/models/loan/normal/storageApproval/SourceIncomeForm';

import { checkIncludePrefix, removeAccents } from 'utils';
import { ValidateIncome } from './validate';
import * as _ from 'lodash';
import moment from 'moment';

export const getLOANNormalStorageApprovalINCOMESave = (state: RootState) => [
  state.LOANNormal.storageApproval.income,
  // state.LOANNormal.storageApproval.loan,
  // state.LOANNormal.storageApproval.legal,
  state.LOANNormal.storageApproval?.full,
  state.LOANNormal.configs,
  state.LOANNormal.storageApproval.full.data?.form.los_info.los_id as string,
  state.masterData,
];

export const getValidateLOANNormalStorageApprovalIncome = (
  state: RootState
) => {
  return state.LOANNormal.storageApproval.income.validate;
};
export const getValidateLOANNormalStorageIncomeFullUX = (state: RootState) => {
  return state.LOANNormal.storageApproval.income;
};
export const getValidateLOANNormalStorageIncomeFullAPI = (state: RootState) => {
  return state.LOANNormal.storageApproval.full.data?.form.source_income_form;
};

export const getActivePosition = (state: RootState) => {
  const declareActive = state.LOANNormal.storageApproval.income
    .declareActive as keyof ILOANNormalStorageIncomeDeclare;
  return state.LOANNormal.storageApproval.income.income[declareActive]
    ?.activePosition;
};

export const getActiveOther = (activePos: string) => (state: RootState) => {
  const declareActive = state.LOANNormal.storageApproval.income
    .declareActive as keyof ILOANNormalStorageIncomeDeclare;
  return state.LOANNormal.storageApproval.income?.income[
    declareActive
  ]?.dataPosition?.find((item) => item.uuidDeclare === activePos)?.other
    .activeOther;
};

export const validateLOANNormalStorageApprovalIncome = (state: RootState) => {
  const declareActive = state.LOANNormal.storageApproval.income
    .declareActive as keyof ILOANNormalStorageIncomeDeclare;

  // Get data active declare
  const dataPosition =
    state.LOANNormal.storageApproval.income.income[declareActive];

  const uuidValidate = dataPosition?.activePosition;

  const position = dataPosition?.dataPosition.find(
    (d) => d.uuidDeclare === uuidValidate
  );

  const activeIncomeSource = (position?.activeIncomeSource ??
    '') as keyof ILOANNormalStorageIncomeDeclareSalary;

  const dataValidate = position && position[activeIncomeSource];

  // const active = state.LOANNormal.storageApproval.income.activeINCOME;

  // const {
  //   balance,
  //   ability
  // } = state.LOANNormal.storageApproval.income;

  // if(active === 'balance'){
  //   const incomeBalance = ValidateIncome.balance(balance as ILOANNormalStorageIncomeBalance);
  //   if (!incomeBalance?.valid) return { ...incomeBalance, declare: active, declarePosition: "balance" };
  // }

  switch (activeIncomeSource) {
    case 'salary':
      const salaryInfo = ValidateIncome.salary(
        dataValidate as ILOANNormalStorageIncomeSalaryActive
      );
      if (!salaryInfo?.valid)
        return {
          ...salaryInfo,
          declare: declareActive,
          declarePosition: 'salary',
        };
      break;

    case 'business':
      const businessInfo = ValidateIncome.business(
        dataValidate as ILOANNormalStorageIncomeBusinessActive
      );
      if (!businessInfo?.valid)
        return {
          ...businessInfo,
          declare: declareActive,
          declarePosition: 'business',
        };
      break;

    case 'pension':
      const persionInfo = ValidateIncome.persion(
        dataValidate as ILOANNormalStorageIncomePension
      );
      if (!persionInfo?.valid)
        return {
          ...persionInfo,
          declare: declareActive,
          declarePosition: 'pension',
        };
      break;

    case 'stock':
      const stockInfo = ValidateIncome.stock(
        dataValidate as ILOANNormalStorageIncomeStockActive
      );
      if (!stockInfo?.valid)
        return {
          ...stockInfo,
          declare: declareActive,
          declarePosition: 'stock',
        };
      break;

    case 'company':
      const companyInfo = ValidateIncome.company(
        dataValidate as ILOANNormalStorageIncomeCompanyActive
      );
      if (!companyInfo?.valid)
        return {
          ...companyInfo,
          declare: declareActive,
          declarePosition: 'company',
        };
      break;

    case 'assetRent':
      const assetRentInfo = ValidateIncome.assetRent(
        dataValidate as ILOANNormalStorageIncomeAssetRentActive
      );
      if (!assetRentInfo?.valid)
        return {
          ...assetRentInfo,
          declare: declareActive,
          declarePosition: 'assetRent',
        };
      break;

    case 'deposit':
      const depositInfo = ValidateIncome.deposit(
        dataValidate as ILOANNormalStorageIncomeDepositActive
      );
      if (!depositInfo?.valid)
        return {
          ...depositInfo,
          declare: declareActive,
          declarePosition: 'deposit',
        };
      break;

    case 'other':
      const otherInfo = ValidateIncome.other(
        dataValidate as ILOANNormalStorageIncomeOtherActive
      );
      if (!otherInfo?.valid)
        return {
          ...otherInfo,
          declare: declareActive,
          declarePosition: 'other',
        };
      break;

    default:
      break;
  }
};

export const validateBtnNextLOANNormalStorageIncome = (state: RootState) => {
  const declareActive = state.LOANNormal.storageApproval.income
    .declareActive as keyof ILOANNormalStorageIncomeDeclare;

  // Get data active declare
  const dataPosition =
    state.LOANNormal.storageApproval.income.income[declareActive];

  const uuidValidate = dataPosition?.activePosition;

  const position = dataPosition?.dataPosition.find(
    (d) => d.uuidDeclare === uuidValidate
  );

  const activeIncomeSource = (position?.activeIncomeSource ??
    '') as keyof ILOANNormalStorageIncomeDeclareSalary;

  const dataValidate = position && position[activeIncomeSource];
  let isValid: {
    valid: boolean;
    field: string;
    role: string;
    position?: string;
    positionHorizontal?: string;
  } = {
    valid: true,
    field: 'empty',
    role: '',
    position: '',
    positionHorizontal: '',
  };
  switch (activeIncomeSource) {
    case 'salary': {
      const data = (dataValidate as ILOANNormalStorageIncomeSalaryActive).data;
      if (data.length === 0) return isValid;
      if (!data.some((item) => checkIncludePrefix(item.uuid))) return isValid;
      const salaryInfo = ValidateIncome.salary(
        dataValidate as ILOANNormalStorageIncomeSalaryActive
      );
      if (!salaryInfo?.valid)
        return {
          ...salaryInfo,
          declare: declareActive,
          declarePosition: 'salary',
        };
      break;
    }
    case 'assetRent': {
      const data = (dataValidate as ILOANNormalStorageIncomeAssetRentActive)
        .data;
      if (data.length === 0) return isValid;
      if (!data.some((item) => checkIncludePrefix(item.uuid))) return isValid;
      const assetRentInfo = ValidateIncome.assetRent(
        dataValidate as ILOANNormalStorageIncomeAssetRentActive
      );
      if (!assetRentInfo?.valid)
        return {
          ...assetRentInfo,
          declare: declareActive,
          declarePosition: 'assetRent',
        };
      break;
    }
    case 'business': {
      const data = (dataValidate as ILOANNormalStorageIncomeBusinessActive)
        .data;
      if (data.length === 0) return isValid;
      if (!data.some((item) => checkIncludePrefix(item.uuid))) return isValid;
      const businessInfo = ValidateIncome.business(
        dataValidate as ILOANNormalStorageIncomeBusinessActive
      );
      if (!businessInfo?.valid)
        return {
          ...businessInfo,
          declare: declareActive,
          declarePosition: 'business',
        };
      break;
    }
    case 'pension': {
      const data = dataValidate as ILOANNormalStorageIncomePension;
      if (!data.uuid) return isValid;
      if (!checkIncludePrefix(data.uuid)) return isValid;
      const persionInfo = ValidateIncome.persion(
        dataValidate as ILOANNormalStorageIncomePension
      );
      if (!persionInfo?.valid)
        return {
          ...persionInfo,
          declare: declareActive,
          declarePosition: 'pension',
        };
      break;
    }
    case 'stock': {
      const data = (dataValidate as ILOANNormalStorageIncomeStockActive).data;
      if (data.length === 0) return isValid;
      if (!data.some((item) => checkIncludePrefix(item.uuid))) return isValid;
      const stockInfo = ValidateIncome.stock(
        dataValidate as ILOANNormalStorageIncomeStockActive
      );
      if (!stockInfo?.valid)
        return {
          ...stockInfo,
          declare: declareActive,
          declarePosition: 'stock',
        };
      break;
    }
    case 'company': {
      const data = (dataValidate as ILOANNormalStorageIncomeCompanyActive).data;
      if (data.length === 0) return isValid;
      if (!data.some((item) => checkIncludePrefix(item.uuid))) return isValid;
      const companyInfo = ValidateIncome.company(
        dataValidate as ILOANNormalStorageIncomeCompanyActive
      );
      if (!companyInfo?.valid)
        return {
          ...companyInfo,
          declare: declareActive,
          declarePosition: 'company',
        };
      break;
    }
    case 'deposit': {
      const data = (dataValidate as ILOANNormalStorageIncomeDepositActive).data;
      if (data.length === 0) return isValid;
      if (!data.some((item) => checkIncludePrefix(item.uuid))) return isValid;
      const depositInfo = ValidateIncome.deposit(
        dataValidate as ILOANNormalStorageIncomeDepositActive
      );
      if (!depositInfo?.valid)
        return {
          ...depositInfo,
          declare: declareActive,
          declarePosition: 'deposit',
        };
      break;
    }
    case 'other': {
      const data = (dataValidate as ILOANNormalStorageIncomeOtherActive).data;
      if (data.length === 0) return isValid;
      if (!data.some((item) => checkIncludePrefix(item.uuid))) return isValid;
      const otherInfo = ValidateIncome.other(
        dataValidate as ILOANNormalStorageIncomeOtherActive
      );
      if (!otherInfo?.valid)
        return {
          ...otherInfo,
          declare: declareActive,
          declarePosition: 'other',
        };
      break;
    }
    default:
      break;
  }
};
///////////////////////////////////////
/////////////SALARY///////////////////
//////////////////////////////////////

export const getLOANNormalStorageCurrentIncomeBorrower =
  () => (state: RootState) =>
    state.LOANNormal.storageApproval.income.income.borrower;

export const getLOANNormalStorageCurrentIncomeMarriage =
  () => (state: RootState) =>
    state.LOANNormal.storageApproval.income.income.marriage;

export const getLOANNormalStorageCurrentIncomeCoborrower =
  () => (state: RootState) =>
    state.LOANNormal.storageApproval.income.income.coborrower;

export const getLOANNormalStorageCurrentIncomeCopayer =
  () => (state: RootState) =>
    state.LOANNormal.storageApproval.income.income.copayer;

export const getLOANNormalStorageCurrentDeclare = () => (state: RootState) =>
  state.LOANNormal.storageApproval.income?.declareActive ?? '';

export const getLOANNormalStorageCurrentActiveIncomeType =
  (declare: keyof ILOANNormalStorageIncomeDeclare) => (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare].dataPosition[0]
      ?.activeIncomeSource;

export const getLOANNormalStorageIncomeSourceList =
  (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string) =>
  (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare]?.dataPosition?.find(
      (item) => item?.uuidDeclare === activePosUUID
    );

export const getLOANNormalStorageIncomeDocumentSourceList =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeIncomeSource: keyof ILOANNormalStorageIncomeDeclareSalary
  ) =>
  (state: RootState) => {
    const dataPosition = state.LOANNormal.storageApproval.income.income[
      declare
    ]?.dataPosition?.find((item) => item.uuidDeclare === activePosUUID);

    switch (
      activeIncomeSource as keyof Omit<
        ILOANNormalStorageIncomeDeclareSalary,
        'uuidDeclare' | 'activeIncomeSource'
      >
    ) {
      case 'salary':
        const activeSalary = dataPosition?.salary?.activeSalary;
        const dataPos = dataPosition?.salary?.data?.find(
          (sd) => sd.uuid === activeSalary
        );
        return dataPos?.documents;

      case 'assetRent':
        const activeAssetRent = dataPosition?.assetRent?.activeAssetRent;
        const assetType = dataPosition?.assetRent.data?.find(
          (sd) => sd.uuid === activeAssetRent
        )?.assetType;
        if (assetType === 'REAL_ESTATE') {
          const activeRealEstate = dataPosition?.assetRent?.data?.find(
            (sd) => sd.uuid === activeAssetRent
          )?.assetDetailRealEstate?.activeRealEstate;
          return dataPosition?.assetRent?.data
            ?.find((sd) => sd.uuid === activeAssetRent)
            ?.assetDetailRealEstate?.data?.find(
              (d) => d.uuid === activeRealEstate
            )?.documents;
        }

        if (assetType === 'TRANSPORT') {
          const activeTransport = dataPosition?.assetRent.data?.find(
            (sd) => sd.uuid === activeAssetRent
          )?.assetDetailTransport?.activeTransport;
          return dataPosition?.assetRent?.data
            ?.find((sd) => sd.uuid === activeAssetRent)
            ?.assetDetailTransport?.data?.find(
              (d) => d.uuid === activeTransport
            )?.documents;
        }

        if (assetType === 'OTHER') {
          const activeOther = dataPosition?.assetRent?.data?.find(
            (sd) => sd.uuid === activeAssetRent
          )?.assetDetailOther?.activeOther;
          return dataPosition?.assetRent?.data
            ?.find((sd) => sd.uuid === activeAssetRent)
            ?.assetDetailOther?.data?.find((d) => d.uuid === activeOther)
            ?.documents;
        }
        break;

      case 'business':
        const activeBusiness = dataPosition?.business?.activeBusiness;
        return dataPosition?.business?.data?.find(
          (sd) => sd.uuid === activeBusiness
        )?.documents;

      case 'company':
        const activeCompany = dataPosition?.company?.activeCompany;
        return dataPosition?.company?.data?.find(
          (sd) => sd.uuid === activeCompany
        )?.documents;

      case 'stock':
        const activeStock = dataPosition?.stock?.activeStock;
        return dataPosition?.stock?.data?.find((sd) => sd.uuid === activeStock)
          ?.documents;

      case 'deposit':
        const activeDeposit = dataPosition?.deposit?.activeDeposit;
        return dataPosition?.deposit?.data?.find(
          (sd) => sd.uuid === activeDeposit
        )?.documents;

      case 'other':
        const activeOther = dataPosition?.other?.activeOther;
        return dataPosition?.other?.data?.find((sd) => sd.uuid === activeOther)
          ?.documents;

      case 'pension':
        return dataPosition?.pension?.documents;
    }
  };

// export const getLOANNormalStorageIncomeSourceListSalaryActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeSalary: string) =>
//   (state: RootState) => state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
//     ?.find(item => item?.uuidDeclare === activePosUUID)?.salary.data
//     ?.find(item => item.uuid === activeSalary) || state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
//     ?.find(item => item?.uuidDeclare === activePosUUID)?.salary.data[0]

export const getLOANNormalStorageIncomeSourceListSalaryActive =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeSalary: string
  ) =>
  (state: RootState) => {
    // const data = state.LOANNormal.storageApproval.income.income[
    //   declare
    // ]?.dataPosition?.find((item) => item?.uuidDeclare === activePosUUID)?.salary
    //   ?.data;
    // const activeItem = data?.find((item) => item.uuid === activeSalary);
    // // if(activeItem) return activeItem;
    // // return data && data.length > 0 && data[0];
    // return activeItem ? activeItem : data && data[0];

    return state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.salary.data?.find((item) => item.uuid === activeSalary);
  };

export const getLOANNormalIncome =
  (declare: keyof ILOANNormalStorageIncomeDeclare) => (state: RootState) =>
    console.log('tesst state', state.LOANNormal);

const checkDisabledDataIncomeDeclare = (
  activeIncome: IIncomeDetails | undefined
) => {
  const data = {
    salary: false,
    assetRent: false,
    business: false,
    company: false,
    deposit: false,
    other: false,
    pension: false,
    stock: false,
  };
  data.salary = !!activeIncome?.salaries;
  data.assetRent = !!activeIncome?.asset_rent;
  data.business = !!activeIncome?.business_household;
  data.company = !!activeIncome?.companies;
  data.deposit = !!activeIncome?.deposit;
  data.other = !!activeIncome?.other_income;
  data.pension = !!activeIncome?.pension;
  data.stock = !!activeIncome?.stocks;
  return data;
};
export const getLOANNormalIncomeDisbledByDeclare =
  (declare: string, person_uuid: string) => (state: RootState) => {
    const data : {[key: string] : boolean} = {
      salary: false,
      assetRent: false,
      business: false,
      company: false,
      deposit: false,
      other: false,
      pension: false,
      stock: false,
    };
    if (declare === 'borrower') {
      const activeIncome =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form
          ?.income?.borrower?.income;
      return checkDisabledDataIncomeDeclare(activeIncome);
    }

    if (declare === 'marriage') {
      const activeIncome =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form
          ?.income?.marriage?.income;
      return checkDisabledDataIncomeDeclare(activeIncome);
    }

    if (declare.includes('co-borrower')) {
      const activeIncome =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form?.income?.co_borrower?.customer_info?.find(
          (per) => per.customer_uuid === person_uuid
        )?.income;
      return checkDisabledDataIncomeDeclare(activeIncome);
    }

    if (declare.includes('co-payer')) {
      const activeIncome =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form?.income?.co_payer?.customer_info?.find(
          (per) => per.customer_uuid === person_uuid
        )?.income;
      return checkDisabledDataIncomeDeclare(activeIncome);
    }
    return data;
  };

export const checkIncomeApprovalExistData =
  (declare: string, person_uuid: string, source: string) =>
  (state: RootState) => {
    let data = {
      salary: false,
      assetRent: false,
      business: false,
      company: false,
      deposit: false,
      other: false,
      pension: false,
      stock: false,
    };
    if (declare === 'borrower') {
      const activeIncome =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form
          ?.income?.borrower?.income;
      data = checkDisabledDataIncomeDeclare(activeIncome);
    }

    if (declare === 'marriage') {
      const activeIncome =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form
          ?.income?.marriage?.income;
      data = checkDisabledDataIncomeDeclare(activeIncome);
    }

    if (declare.includes('co-borrower')) {
      const activeIncome =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form?.income?.co_borrower?.customer_info?.find(
          (per) => per.customer_uuid === person_uuid
        )?.income;
      data = checkDisabledDataIncomeDeclare(activeIncome);
    }

    if (declare.includes('co-payer')) {
      const activeIncome =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form?.income?.co_payer?.customer_info?.find(
          (per) => per.customer_uuid === person_uuid
        )?.income;
      data = checkDisabledDataIncomeDeclare(activeIncome);
    }

    switch (source) {
      case 'salary':
        return data.salary;
      case 'asset-rent':
        return data.assetRent;
      case 'company':
        return data.company;
      case 'business':
        return data.business;
      case 'stock':
        return data.stock;
      case 'deposit':
        return data.deposit;
      case 'pension':
        return data.pension;
      case 'other':
        return data.other;
      default:
        return false;
    }
  };

const checkCompletedDataIncomeDeclare = (
  activePosition: ILOANNormalStorageIncomeDeclareSalary
) => {
  const data = {
    salary: false,
    assetRent: false,
    business: false,
    company: false,
    deposit: false,
    other: false,
    pension: false,
    stock: false,
  };
  data.salary =
    activePosition.salary.data?.length > 0 &&
    activePosition.salary.data.some((item) => !item.uuid.includes('LOCAL_'));
  data.assetRent =
    activePosition.assetRent.data?.length > 0 &&
    activePosition.assetRent.data.some((item) => !item.uuid.includes('LOCAL_'));
  data.business =
    activePosition.business.data?.length > 0 &&
    activePosition.business.data.some((item) => !item.uuid.includes('LOCAL_'));
  data.company =
    activePosition.company.data?.length > 0 &&
    activePosition.company.data.some((item) => !item.uuid.includes('LOCAL_'));
  data.deposit =
    activePosition.deposit.data?.length > 0 &&
    activePosition.deposit.data.some((item) => !item.uuid.includes('LOCAL_'));
  data.other =
    activePosition.other.data?.length > 0 &&
    activePosition.other.data.some((item) => !item.uuid.includes('LOCAL_'));
  data.pension = !activePosition.pension?.uuid || !!activePosition.pension.uuid;
  data.stock =
    activePosition.stock.data?.length > 0 &&
    activePosition.stock.data.some((item) => !item.uuid.includes('LOCAL_'));
  return data;
};
export const getLOANNormalIncomeCompletedByDeclare =
  (declare: string) => (state: RootState) => {
    const data = {
      salary: false,
      assetRent: false,
      business: false,
      company: false,
      deposit: false,
      other: false,
      pension: false,
      stock: false,
    };
    if (declare === 'borrower') {
      const borrower = state.LOANNormal.storageApproval.income.income.borrower;
      const activePosition = borrower.dataPosition.find(
        (item) => item.uuidDeclare === borrower.activePosition
      );
      if (activePosition) {
        return checkCompletedDataIncomeDeclare(activePosition);
      }
    }

    if (declare === 'marriage') {
      const marriage = state.LOANNormal.storageApproval.income.income.marriage;
      const activePosition = marriage.dataPosition.find(
        (item) => item.uuidDeclare === marriage.activePosition
      );
      if (activePosition) {
        return checkCompletedDataIncomeDeclare(activePosition);
      }
    }

    if (declare.includes('co-borrower')) {
      const dataDeclare = declare.split('/');
      if (dataDeclare && dataDeclare.length > 1) {
        const uuid = dataDeclare[1];
        const coborrower =
          state.LOANNormal.storageApproval.income.income.coborrower;
        const activePosition = coborrower.dataPosition.find(
          (item) => item.uuidDeclare === uuid
        );
        if (activePosition) {
          return checkCompletedDataIncomeDeclare(activePosition);
        }
      }
    }

    if (declare.includes('co-payer')) {
      const dataDeclare = declare.split('/');
      if (dataDeclare && dataDeclare.length > 1) {
        const uuid = dataDeclare[1];
        const copayer = state.LOANNormal.storageApproval.income.income.copayer;
        const activePosition = copayer.dataPosition.find(
          (item) => item.uuidDeclare === uuid
        );
        if (activePosition) {
          return checkCompletedDataIncomeDeclare(activePosition);
        }
      }
    }
    return data;
  };

const checkSingleDeclare = (type: string, state: RootState) => {
  const data = getLOANNormalIncomeCompletedByDeclare(type)(state);
  return Object.values(data).every((item) => item);
};

const checkMultipleDeclare = (
  type: string,
  legalLabel: 'co_brw' | 'co_payer',
  state: RootState
) => {
  // const list = state.LOANNormal.storageApproval.full.data?.form.source_income_form?.income[legalLabel ==='co_brw'?'co_borrower':'co_payer'].customer_info;
  const list: IncomeDeclareRes[] = _.get(
    state.LOANNormal.storageApproval,
    [
      'full',
      'data',
      'form',
      'source_income_form',
      'income',
      legalLabel === 'co_brw' ? 'co_borrower' : 'co_payer',
      'customer_info',
    ],
    []
  );

  return (
    list?.every((item) => {
      const data = getLOANNormalIncomeCompletedByDeclare(
        `${type}/${item.uuid}`
      )(state);
      return Object.values(data).every((item) => item);
    }) ?? false
  );
};

export const getLOANNormalIncomeDeclareCompleted = (state: RootState) => {
  const result = {
    borrower: checkSingleDeclare('borrower', state),
    marriage: checkSingleDeclare('marriage', state),
    coBorrower: checkMultipleDeclare('co-borrower', 'co_brw', state),
    coPayer: checkMultipleDeclare('co-payer', 'co_payer', state),
  };
  return result;
};

///////////////////////////////////////
/////////////ASSET-RENT////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListAssetRentActive =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeAssetRent: string
  ) =>
  (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.assetRent?.data?.find((item) => item.uuid === activeAssetRent);

export const getLOANNormalStorageIncomeSourceListAssetRentDetailsRealEstate =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeAssetRent: string
  ) =>
  (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.assetRent.data?.find((item) => item.uuid === activeAssetRent)
      ?.assetDetailRealEstate.data;

export const getLOANNormalStorageIncomeSourceListAssetRentDetailsRealEstateData =

    (
      declare: keyof ILOANNormalStorageIncomeDeclare,
      activePosUUID: string,
      activeAssetRent: string,
      activeReal: string
    ) =>
    (state: RootState) =>
      state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
        ?.find((item) => item?.uuidDeclare === activePosUUID)
        ?.assetRent.data?.find((item) => item.uuid === activeAssetRent)
        ?.assetDetailRealEstate.data?.find((ass) => ass.uuid === activeReal);

export const getLOANNormalStorageIncomeSourceListAssetRentDetailsTransportData =

    (
      declare: keyof ILOANNormalStorageIncomeDeclare,
      activePosUUID: string,
      activeAssetRent: string,
      activeTrans: string
    ) =>
    (state: RootState) =>
      state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
        ?.find((item) => item?.uuidDeclare === activePosUUID)
        ?.assetRent.data?.find((item) => item.uuid === activeAssetRent)
        ?.assetDetailTransport.data?.find((ass) => ass.uuid === activeTrans);

export const getLOANNormalStorageIncomeSourceListAssetRentDetailsOtherData =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeAssetRent: string,
    activeOther: string
  ) =>
  (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.assetRent.data?.find((item) => item.uuid === activeAssetRent)
      ?.assetDetailOther.data?.find((ass) => ass.uuid === activeOther);

///////////////////////////////////////
/////////////BUSSNIESS////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListBussniessActive =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeBuss: string
  ) =>
  (state: RootState) => {
    return state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.business.data?.find((item) => item.uuid === activeBuss);
  };

///////////////////////////////////////
/////////////COMPANY//////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListCompanyActive =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeCompany: string
  ) =>
  (state: RootState) => {
    return state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.company.data?.find((item) => item.uuid === activeCompany);
  };

///////////////////////////////////////
/////////////STOCK////////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListStockActive =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeStock: string
  ) =>
  (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.stock.data?.find((item) => item.uuid === activeStock);

///////////////////////////////////////
/////////////DEPOSIT////////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListDepositActive =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeDeposit: string
  ) =>
  (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.deposit.data?.find((item) => item.uuid === activeDeposit);

///////////////////////////////////////
/////////////Pension////////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourcePensionData =
  (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string) =>
  (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare]?.dataPosition?.find(
      (item) => item?.uuidDeclare === activePosUUID
    )?.pension;

///////////////////////////////////////
/////////////Other////////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListOtherActive =
  (
    declare: keyof ILOANNormalStorageIncomeDeclare,
    activePosUUID: string,
    activeOther: string
  ) =>
  (state: RootState) =>
    state.LOANNormal.storageApproval.income.income[declare]?.dataPosition
      ?.find((item) => item?.uuidDeclare === activePosUUID)
      ?.other.data?.find((item) => item.uuid === activeOther);

      // export const getLOANNormalStorageIncomeSourceListOtherActiveFull =
      // (
      //   declare: keyof ILOANNormalStorageIncomeDeclare,
      //   activePosUUID: string,
      //   activeOther: string
      // ) =>
      // (state: RootState) =>
      //   state.LOANNormal.storageApproval.full.data?.form.source_income_form.income.marriage.income.other_income.income_other.find((item)=>item.uuid === activeOther)

///////////////////////////////////////
/////////////TotalData/////////////////
//////////////////////////////////////

export const getLOANNormalStorageApprovalIncomeTotalData =
  () => (state: RootState) =>
    state.LOANNormal.storageApproval.income.income;

///////////////////////////////////////
/////////BALANCE//////////
/////////////
export const getLOANNormalStorageIncomeSourceBalance =
  () => (state: RootState) =>
    state.LOANNormal.storageApproval.income.balance;

/////////////////////////////
/////////Ability////////////
////////////////////////////
export const getLOANNormalStorageIncomeSourceAbility =
  () => (state: RootState) =>
    state.LOANNormal.storageApproval.income.ability;

/////////////////totalstep //////////
export const getCustomerTotal = () => (state: RootState) => {
  let borrowerTotal: number = 0;
  let spouseTotal: number = 0;
  let coBorrowerTotal: number = 0;
  let coPayerTotal: number = 0;

  // eslint-disable-next-line
  borrowerTotal =
    state.LOANNormal.storageApproval.income.income.borrower
      .total_income_NVTTD ?? 0;
  spouseTotal =
    state.LOANNormal.storageApproval.income.income.marriage
      .total_income_NVTTD ?? 0;
  coBorrowerTotal =
    state.LOANNormal.storageApproval.income.income.coborrower
      .total_income_NVTTD ?? 0;
  coPayerTotal =
    state.LOANNormal.storageApproval.income.income.copayer.total_income_NVTTD ??
    0;

  return [borrowerTotal, spouseTotal, coBorrowerTotal, coPayerTotal];
};

// export const getLOANNormalLegalBorrowerUuid = (state: RootState) => {
//   return state.LOANNormal.storageApproval.full?.data?.form?.legal_info_form?.data?.borrower?.basic_info?.uuid ?? ""
// }

// Người vay
export const getLOANApprovalSourceBorrowerUuid = (state: RootState) =>
  state.LOANNormal.storageApproval.full?.data?.form?.source_income_form?.income
    ?.borrower?.customer_uuid ?? '';

// Người vay
export const getLOANNormalLegalBorrowerFullName = (state: RootState) => {
  return state.LOANNormal.storageApproval.full?.data?.form?.source_income_form
    .income.borrower.customer_name;
};

// Người hôn phối
// export const getLOANNormalLegalMarriageUuid = (state: RootState) => {
//   return state.LOANNormal.storageApproval.full?.data?.form?.legal_info_form?.data?.marriage?.basic_info?.uuid ?? ""
// }

export const getLOANApprovalSourceMarriageUuid = (state: RootState) =>
  state.LOANNormal.storageApproval?.full?.data?.form?.source_income_form?.income
    ?.marriage?.customer_uuid ?? '';

// Người hôn phối
export const getLOANNormalLegalMarriageFullName = (state: RootState) => {
  return state.LOANNormal.storageApproval.full?.data?.form?.source_income_form
    .income.marriage.customer_name;
};

// Người đồng vay
// export const getLOANNormalLegalCoBorrower = (state: RootState) => {
//   const useList: ILOANNormalStorageIncomeUserList[] = state.LOANNormal.storageApproval.full?.data?.form?.legal_info_form?.data?.co_brw?.map((cb: any) => ({
//     uuid: cb?.basic_info?.uuid,
//     full_name: cb?.basic_info?.full_name,
//   })) ?? [];

//   return useList;
// }

export const getLOANApprovalSourceCoBorrowerUuid = (state: RootState) => {
  const useList: ILOANNormalStorageIncomeUserList[] =
    state.LOANNormal.storageApproval?.full?.data?.form.source_income_form?.income?.co_borrower?.customer_info?.map(
      (cb: any) => ({
        uuid: cb?.customer_uuid,
        full_name: cb?.customer_name,
      })
    ) ?? [];
  return useList;
};

// Người đồng trả nợ
// export const getLOANNormalLegalCoPayer = (state: RootState) => {
//   const useList: ILOANNormalStorageIncomeUserList[] = state.LOANNormal.storageApproval.full?.data?.form?.legal_info_form?.data?.co_payer?.map((cp: any) => ({
//     uuid: cp?.basic_info?.uuid,
//     full_name: cp?.basic_info?.full_name,
//   })) ?? [];

//   return useList;
// }

export const getLOANApprovalSourceCoPayerUuid = (state: RootState) => {
  const useList: ILOANNormalStorageIncomeUserList[] =
    state.LOANNormal.storageApproval?.full?.data?.form?.source_income_form?.income?.co_payer?.customer_info?.map(
      (cb: any) => ({
        uuid: cb?.customer_uuid,
        full_name: cb?.customer_name,
      })
    ) ?? [];
  return useList;
};

export const getLOANNormalLegalData = (state: RootState) => {
  // const borrower =  state.LOANNormal.storageApproval.legal.data['BORROWER'].info;
  const borrower =
    state.LOANNormal.storageApproval.full.data?.form.source_income_form?.income
      ?.borrower;
  // const marriage =  state.LOANNormal.storageApproval.legal.data['MARRIAGE'].info;
  const marriage =
    state.LOANNormal.storageApproval.full.data?.form.source_income_form?.income
      ?.marriage;
  // const coBorrower =  state.LOANNormal.storageApproval.legal.data['CO_BRW'].info;
  const coBorrower =
    state.LOANNormal.storageApproval.full.data?.form.source_income_form?.income
      ?.co_borrower?.customer_info;
  // const coPayer =  state.LOANNormal.storageApproval.legal.data['CO_PAYER'].info;
  const coPayer =
    state.LOANNormal.storageApproval.full.data?.form.source_income_form?.income
      ?.co_payer?.customer_info;
  return {
    borrower,
    marriage,
    coBorrower,
    coPayer,
  };
};

export const getLOANNormalToalIncome = (state: RootState) => {
  const declareActive = state.LOANNormal.storageApproval.income
    .declareActive as keyof ILOANNormalStorageIncomeDeclare;

  // Get data active declare
  const dataPosition =
    state.LOANNormal?.storageApproval?.income?.income[declareActive];
  return dataPosition?.total_income ?? 0;
};

export const getLOANNormalSumToalIncome = (
  state: RootState
): ISumToalIncome => {
  const declareActive = state.LOANNormal.storageApproval.income
    .declareActive as keyof ILOANNormalStorageIncomeDeclare;

  // Get data active declare
  const dataPosition =
    state.LOANNormal?.storageApproval?.income?.income[declareActive];
  const activePosition = dataPosition?.activePosition;
  const position = dataPosition?.dataPosition?.find(
    (d) => d.uuidDeclare === activePosition
  );

  const totalIncome =
    Number(position?.assetRent.total_income_from_property_rental ?? 0) +
    Number(position?.business.permanent_income_amount ?? 0) +
    Number(position?.company.total_income_from_company ?? 0) +
    Number(position?.deposit.total_income_from_deposits ?? 0) +
    Number(position?.other.total_income_from_other_sources ?? 0) +
    Number(position?.salary.total_income_from_salary_source ?? 0) +
    Number(position?.stock.total_income_from_stocks ?? 0);
  const totalPermanentIncomeAmount =
    Number(position?.assetRent.permanent_income_amount ?? 0) +
    Number(position?.business.permanent_income_amount ?? 0) +
    Number(position?.company.permanent_income_amount ?? 0) +
    Number(position?.deposit.permanent_income_amount ?? 0) +
    Number(position?.other.permanent_income_amount ?? 0) +
    Number(position?.salary.permanent_income_amount ?? 0) +
    Number(position?.stock.permanent_income_amount ?? 0);

  const totalOccasionalIncomeAmount =
    Number(position?.assetRent.occasional_income_amount ?? 0) +
    Number(position?.business.occasional_income_amount ?? 0) +
    Number(position?.company.occasional_income_amount ?? 0) +
    Number(position?.deposit.occasional_income_amount ?? 0) +
    Number(position?.other.occasional_income_amount ?? 0) +
    Number(position?.salary.occasional_income_amount ?? 0) +
    Number(position?.stock.occasional_income_amount ?? 0);

  return {
    totalIncome: totalIncome ?? 0,
    totalPermanentIncomeAmount: totalPermanentIncomeAmount ?? 0,
    totalOccasionalIncomeAmount: totalOccasionalIncomeAmount ?? 0,
  } as ISumToalIncome;
};

export const getIncomeZipName = (state: RootState): string => {
  const activeDeclare = state.LOANNormal.storageApproval.income.declareActive;
  const activeINCOME = state.LOANNormal.storageApproval.income.activeINCOME;
  const activePos =
    state.LOANNormal.storageApproval.income.income[
      activeDeclare as keyof ILOANNormalStorageIncomeDeclare
    ];

  const activePosition = activePos.activePosition;
  const currentDate = moment().format('YYYYMMDD');
  switch (activeDeclare) {
    case 'borrower': {
      const name: string = _.get(
        state,
        'LOANNormal.storageApproval.full.data.form.source_income_form.income.borrower.customer_name',
        ''
      );
      const nameZip = `${removeAccents(name)}_${(
        activeINCOME ?? ''
      )?.toUpperCase()}_${currentDate}`;
      return nameZip.replace(/\s/g, '_');
    }
    case 'marriage': {
      const name: string = _.get(
        state,
        'LOANNormal.storageApproval.full.data.form.source_income_form.income.marriage.customer_name',
        ''
      );
      const nameZip = `${removeAccents(name)}_${(
        activeINCOME ?? ''
      )?.toUpperCase()}_${currentDate}`;
      return nameZip.replace(/\s/g, '_');
    }
    case 'coborrower': {
      const cobor =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form.income?.co_borrower?.customer_info.find(
          (item) => item.uuid === activePosition
        );
      const name: string = _.get(cobor, 'basic_info.full_name', '');
      const nameZip = `${removeAccents(name)}_${(
        activeINCOME ?? ''
      )?.toUpperCase()}_${currentDate}`;
      return nameZip.replace(/\s/g, '_');
    }
    case 'copayer': {
      const cobor =
        state.LOANNormal.storageApproval.full.data?.form?.source_income_form.income?.co_payer?.customer_info.find(
          (item) => item.uuid === activePosition
        );
      const name: string = _.get(cobor, 'basic_info.full_name', '');
      const nameZip = `${removeAccents(name)}_${(
        activeINCOME ?? ''
      )?.toUpperCase()}_${currentDate}`;
      return nameZip.replace(/\s/g, '_');
    }
    default:
      return '';
  }
};

export const getSourceApprovalIncomeBalanceData = (state: RootState) =>
  state.LOANNormal.storageApproval.income.balance;
export const getSourceApprovalIncomeAbilityData = (state: RootState) =>
  state.LOANNormal.storageApproval.income.ability;
