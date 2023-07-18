import { RootState } from "types";
import {
  ILOANContinueRuleIncome,
  ILOANNormalStorageIncomeAbility,
  ILOANNormalStorageIncomeAssetRentActive,
  ILOANNormalStorageIncomeBalance,
  ILOANNormalStorageIncomeCompanyActive,
  ILOANNormalStorageIncomeType,
  ISumToalIncome,
} from "types/models/loan/normal/storage/Income";
import {
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomePension,
  ILOANNormalStorageIncomeStockActive,
  ILOANNormalStorageIncomeUserList,
  ILOANNormalStorageIncomeDepositActive,
  ILOANNormalStorageIncomeBusinessActive,
  ILOANNormalStorageIncomeOtherActive,
  ILOANNormalStorageIncomeSalaryActive,
} from "types/models/loan/normal/storage/Income";
import { checkIncludePrefix, PREFIX_LOCAL, removeAccents } from "utils";
import { ValidateIncome } from "./validate";
import * as _ from 'lodash';
import moment from 'moment';

export const getLOANNormalStorageINCOMESave = (state: RootState) => [
  state.LOANNormal.storage.income,
  state.LOANNormal.storage.loan,
  state.LOANNormal.storage.legal,
  state.LOANNormal.storage?.full,
  state.LOANNormal.configs,
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string,
  state.masterData,
];
export const getLOANNormalStorageIncomeDelete = (state: RootState) => [
  state.LOANNormal.storage.income,
  state.LOANNormal.storage?.full,
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string,
]

export const getValidateLOANNormalStorageIncome = (state: RootState) => {
  return state.LOANNormal.storage.income.validate;
}
export const getValidateLOANNormalStorageIncomeFullUX = (state: RootState) => {
  return state.LOANNormal.storage.income
}
export const getValidateLOANNormalStorageIncomeFullAPI = (state: RootState) => {
  return state.LOANNormal.storage.full.data?.form.source_income_form
}

export const getActivePosition = (state: RootState) => {
  const declareActive = state.LOANNormal.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  return state.LOANNormal.storage.income.income[declareActive]?.activePosition;
}

export const getActiveOther = (activePos: string) => (state: RootState) => {
  const declareActive = state.LOANNormal.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;
  return state.LOANNormal.storage.income?.income[declareActive]?.dataPosition?.find((item) => item.uuidDeclare === activePos)?.other
    .activeOther;
}

export const getlistPersonUUID = (state: RootState) => {
  const dataDeclare = ["borrower","marriage","coborrower","copayer"]
  let list_person:string[] = [];
  for (let i = 0 ;i < dataDeclare.length ; i++){
    const data = state.LOANNormal.storage.income?.income[dataDeclare[i] as keyof ILOANNormalStorageIncomeDeclare]?.dataPosition
    for(let j =0;j<data.length;j++){
      list_person.push(data[j].uuidDeclare as string)
    }
    
  }
  return list_person
}


export const validateLOANNormalStorageIncome = (state: RootState) => {
  const declareActive = state.LOANNormal.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;

  // Get data active declare
  const dataPosition = state.LOANNormal.storage.income.income[declareActive];

  const uuidValidate = dataPosition?.activePosition;

  const position = dataPosition?.dataPosition.find(d => d.uuidDeclare === uuidValidate);

  const activeIncomeSource = (position?.activeIncomeSource ?? "") as keyof ILOANNormalStorageIncomeDeclareSalary;

  const dataValidate = position && position[activeIncomeSource];

  const active = state.LOANNormal.storage.income.activeINCOME;

  const {
    balance,
    ability
  } = state.LOANNormal.storage.income;

  if(active === 'balance'){
    const incomeBalance = ValidateIncome.balance(balance as ILOANNormalStorageIncomeBalance);
    if (!incomeBalance?.valid) return { ...incomeBalance, declare: active, declarePosition: "balance" };
  }

  if(active === 'ability-repay'){
    const incomeAbility = ValidateIncome.ability(ability as ILOANNormalStorageIncomeAbility);
    if (!incomeAbility?.valid) return { ...incomeAbility, declare: active, declarePosition: "ability" };
  }

  switch (activeIncomeSource) {
    case "salary":
      const salaryInfo = ValidateIncome.salary(dataValidate as ILOANNormalStorageIncomeSalaryActive);
      if (!salaryInfo?.valid) return { ...salaryInfo, declare: declareActive, declarePosition: "salary" };
      break;

    case "business":
      const businessInfo = ValidateIncome.business(dataValidate as ILOANNormalStorageIncomeBusinessActive);
      if (!businessInfo?.valid) return { ...businessInfo, declare: declareActive, declarePosition: "business" };
      break;

    case "pension":
      const persionInfo = ValidateIncome.persion(dataValidate as ILOANNormalStorageIncomePension);
      if (!persionInfo?.valid) return { ...persionInfo, declare: declareActive, declarePosition: "pension" };
      break;

    case "stock":
      const stockInfo = ValidateIncome.stock(dataValidate as ILOANNormalStorageIncomeStockActive);
      if (!stockInfo?.valid) return { ...stockInfo, declare: declareActive, declarePosition: "stock" };
      break;

    case "company":
      const companyInfo = ValidateIncome.company(dataValidate as ILOANNormalStorageIncomeCompanyActive);
      if (!companyInfo?.valid) return { ...companyInfo, declare: declareActive, declarePosition: "company" };
      break;

    case "assetRent":
      const assetRentInfo = ValidateIncome.assetRent(dataValidate as ILOANNormalStorageIncomeAssetRentActive);
      if (!assetRentInfo?.valid) return { ...assetRentInfo, declare: declareActive, declarePosition: "assetRent" };
      break;


    case "deposit":
      const depositInfo = ValidateIncome.deposit(dataValidate as ILOANNormalStorageIncomeDepositActive);
      if (!depositInfo?.valid) return { ...depositInfo, declare: declareActive, declarePosition: "deposit" };
      break;

    case "other":
      const otherInfo = ValidateIncome.other(dataValidate as ILOANNormalStorageIncomeOtherActive);
      if (!otherInfo?.valid) return { ...otherInfo, declare: declareActive, declarePosition: "other" };
      break;
    
    default:
      break;
  }
}

export const validateBtnNextLOANNormalStorageIncome = (state: RootState) => {
  const declareActive = state.LOANNormal.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;

  // Get data active declare
  const dataPosition = state.LOANNormal.storage.income.income[declareActive];

  const uuidValidate = dataPosition?.activePosition;

  const position = dataPosition?.dataPosition.find(d => d.uuidDeclare === uuidValidate);

  const activeIncomeSource = (position?.activeIncomeSource ?? "") as keyof ILOANNormalStorageIncomeDeclareSalary;

  const dataValidate = position && position[activeIncomeSource];
  let isValid: { valid: boolean, field: string, role: string, position?: string, positionHorizontal?: string } = { valid: true, field: 'empty', role: '', position: '', positionHorizontal: '' };
  switch (activeIncomeSource) {
    case "salary": {
      const data = (dataValidate as ILOANNormalStorageIncomeSalaryActive).data;
      if (data.length === 0) return isValid;
      if (!data.some(item => checkIncludePrefix(item.uuid))) return isValid;
      const salaryInfo = ValidateIncome.salary(dataValidate as ILOANNormalStorageIncomeSalaryActive);
      if (!salaryInfo?.valid) return { ...salaryInfo, declare: declareActive, declarePosition: "salary" };
      break;
    }
    case "assetRent": {
      const data = (dataValidate as ILOANNormalStorageIncomeAssetRentActive).data;
      if (data.length === 0) return isValid;
      if (!data.some(item => checkIncludePrefix(item.uuid))) return isValid;
      const assetRentInfo = ValidateIncome.assetRent(dataValidate as ILOANNormalStorageIncomeAssetRentActive);
      if (!assetRentInfo?.valid) return { ...assetRentInfo, declare: declareActive, declarePosition: "assetRent" };
      break;
    }
    case "business": {
      const data = (dataValidate as ILOANNormalStorageIncomeBusinessActive).data;
      if (data.length === 0) return isValid;
      if (!data.some(item => checkIncludePrefix(item.uuid))) return isValid;
      const businessInfo = ValidateIncome.business(dataValidate as ILOANNormalStorageIncomeBusinessActive);
      if (!businessInfo?.valid) return { ...businessInfo, declare: declareActive, declarePosition: "business" };
      break;
    }
    case "pension": {
      const data = (dataValidate as ILOANNormalStorageIncomePension);
      if (!data.uuid) return isValid;
      if (!checkIncludePrefix(data.uuid)) return isValid;
      const persionInfo = ValidateIncome.persion(dataValidate as ILOANNormalStorageIncomePension);
      if (!persionInfo?.valid) return { ...persionInfo, declare: declareActive, declarePosition: "pension" };
      break;
    }
    case "stock": {
      const data = (dataValidate as ILOANNormalStorageIncomeStockActive).data;
      if (data.length === 0) return isValid;
      if (!data.some(item => checkIncludePrefix(item.uuid))) return isValid;
      const stockInfo = ValidateIncome.stock(dataValidate as ILOANNormalStorageIncomeStockActive);
      if (!stockInfo?.valid) return { ...stockInfo, declare: declareActive, declarePosition: "stock" };
      break;
    }
    case "company": {
      const data = (dataValidate as ILOANNormalStorageIncomeCompanyActive).data;
      if (data.length === 0) return isValid;
      if (!data.some(item => checkIncludePrefix(item.uuid))) return isValid;
      const companyInfo = ValidateIncome.company(dataValidate as ILOANNormalStorageIncomeCompanyActive);
      if (!companyInfo?.valid) return { ...companyInfo, declare: declareActive, declarePosition: "company" };
      break;
    }
    case "deposit": {
      const data = (dataValidate as ILOANNormalStorageIncomeDepositActive).data;
      if (data.length === 0) return isValid;
      if (!data.some(item => checkIncludePrefix(item.uuid))) return isValid;
      const depositInfo = ValidateIncome.deposit(dataValidate as ILOANNormalStorageIncomeDepositActive);
      if (!depositInfo?.valid) return { ...depositInfo, declare: declareActive, declarePosition: "deposit" };
      break;
    }
    case "other": {
      const data = (dataValidate as ILOANNormalStorageIncomeOtherActive).data;
      if (data.length === 0) return isValid;
      if (!data.some(item => checkIncludePrefix(item.uuid))) return isValid;
      const otherInfo = ValidateIncome.other(dataValidate as ILOANNormalStorageIncomeOtherActive);
      if (!otherInfo?.valid) return { ...otherInfo, declare: declareActive, declarePosition: "other" };
      break;
    }
    default:
      break;
  }
}
///////////////////////////////////////
/////////////SALARY///////////////////
//////////////////////////////////////

export const getLOANNormalStorageCurrentIncomeBorrower = () =>
  (state: RootState) => state.LOANNormal.storage.income.income.borrower

export const getLOANNormalStorageCurrentIncomeMarriage = () =>
  (state: RootState) => state.LOANNormal.storage.income.income.marriage

export const getLOANNormalStorageCurrentIncomeCoborrower = () =>
  (state: RootState) => state.LOANNormal.storage.income.income.coborrower

export const getLOANNormalStorageCurrentIncomeCopayer = () =>
  (state: RootState) => state.LOANNormal.storage.income.income.copayer

export const getLOANNormalStorageCurrentDeclare = () =>
  (state: RootState) => state.LOANNormal.storage.income?.declareActive ?? "";

export const getLOANNormalStorageCurrentActiveIncomeType = (declare: keyof ILOANNormalStorageIncomeDeclare) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare].dataPosition[0]?.activeIncomeSource

export const getLOANNormalStorageIncomeSourceList = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)

export const getLOANNormalStorageIncomeDocumentSourceList = (
  declare: keyof ILOANNormalStorageIncomeDeclare,
  activePosUUID: string,
  activeIncomeSource: keyof ILOANNormalStorageIncomeDeclareSalary
) =>
  (state: RootState) => {

    const dataPosition = state.LOANNormal.storage.income.income[declare]?.dataPosition
      ?.find(item => item.uuidDeclare === activePosUUID);

    switch (activeIncomeSource as keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">) {
      case "salary":
        const activeSalary = dataPosition?.salary?.activeSalary;
        const dataPos = dataPosition?.salary?.data?.find(sd => sd.uuid === activeSalary);
        return dataPos?.documents;

      case "assetRent":
        const activeAssetRent = dataPosition?.assetRent?.activeAssetRent;
        const assetType = dataPosition?.assetRent?.data?.find(sd => sd.uuid === activeAssetRent)?.assetType;
        if (assetType === "REAL_ESTATE") {
          const activeRealEstate = dataPosition?.assetRent?.data?.find(sd => sd.uuid === activeAssetRent)?.assetDetailRealEstate?.activeRealEstate;
          return dataPosition?.assetRent?.data?.find(sd => sd.uuid === activeAssetRent)?.assetDetailRealEstate?.data?.find(d => d.uuid === activeRealEstate)?.documents;
        }

        if (assetType === "TRANSPORT") {
          const activeTransport = dataPosition?.assetRent?.data?.find(sd => sd.uuid === activeAssetRent)?.assetDetailTransport?.activeTransport;
          return dataPosition?.assetRent?.data?.find(sd => sd.uuid === activeAssetRent)?.assetDetailTransport?.data?.find(d => d.uuid === activeTransport)?.documents;
        }

        if (assetType === "OTHER") {
          const activeOther = dataPosition?.assetRent?.data?.find(sd => sd.uuid === activeAssetRent)?.assetDetailOther?.activeOther;
          return dataPosition?.assetRent?.data?.find(sd => sd.uuid === activeAssetRent)?.assetDetailOther?.data?.find(d => d.uuid === activeOther)?.documents;
        }
        break;

      case "business":
        const activeBusiness = dataPosition?.business?.activeBusiness;
        return dataPosition?.business?.data?.find(sd => sd.uuid === activeBusiness)?.documents;

      case "company":
        const activeCompany = dataPosition?.company?.activeCompany;
        return dataPosition?.company?.data?.find(sd => sd.uuid === activeCompany)?.documents;

      case "stock":
        const activeStock = dataPosition?.stock?.activeStock;
        return dataPosition?.stock?.data?.find(sd => sd.uuid === activeStock)?.documents;

      case "deposit":
        const activeDeposit = dataPosition?.deposit?.activeDeposit;
        return dataPosition?.deposit?.data?.find(sd => sd.uuid === activeDeposit)?.documents;

      case "other":
        const activeOther = dataPosition?.other?.activeOther;
        return dataPosition?.other?.data?.find(sd => sd.uuid === activeOther)?.documents;

      case "pension":
        return dataPosition?.pension?.documents;
    }
  }

// export const getLOANNormalStorageIncomeSourceListSalaryActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeSalary: string) =>
//   (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
//     ?.find(item => item?.uuidDeclare === activePosUUID)?.salary.data
//     ?.find(item => item.uuid === activeSalary) || state.LOANNormal.storage.income.income[declare]?.dataPosition
//     ?.find(item => item?.uuidDeclare === activePosUUID)?.salary.data[0]
export const getLOANNormalStorageIncomeSourceListSalaryActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeSalary: string) =>
  (state: RootState) => {
    const data = state.LOANNormal.storage.income.income[declare]?.dataPosition?.find(item => item?.uuidDeclare === activePosUUID)?.salary?.data;
    const activeItem = data?.find(item => item.uuid === activeSalary);
    // if(activeItem) return activeItem;
    // return data && data.length > 0 && data[0];
    return activeItem ? activeItem : (data && data[0])
  }
export const getLOANNormalIncome = (declare: keyof ILOANNormalStorageIncomeDeclare) => (state: RootState) => console.log("tesst state", state.LOANNormal)

const checkCompletedDataIncomeDeclare = (activePosition: ILOANNormalStorageIncomeDeclareSalary) => {
  const data: ILOANNormalStorageIncomeType = {
    salary: false,
    assetRent: false,
    business: false,
    company: false,
    stock: false,
    deposit: false,
    pension: false,
    other: false,
  };
  data.salary = activePosition?.salary?.data?.length > 0 && activePosition?.salary?.data.some(item => !item.uuid.includes('LOCAL_'));
  data.assetRent = activePosition?.assetRent?.data?.length > 0 && activePosition?.assetRent?.data.some(item => !item.uuid.includes('LOCAL_'));
  data.business = activePosition?.business?.data?.length > 0 && activePosition?.business?.data.some(item => !item.uuid.includes('LOCAL_'));
  data.company = activePosition?.company?.data?.length > 0 && activePosition?.company?.data.some(item => !item.uuid.includes('LOCAL_'));
  data.deposit = activePosition?.deposit?.data?.length > 0 && activePosition?.deposit?.data.some(item => !item.uuid.includes('LOCAL_'));
  data.other = activePosition?.other?.data?.length > 0 && activePosition?.other?.data.some(item => !item.uuid.includes('LOCAL_'));
  data.pension = !!(activePosition?.pension?.uuid) && !activePosition?.pension?.uuid.includes(PREFIX_LOCAL);
  data.stock = activePosition?.stock.data?.length > 0 && activePosition?.stock?.data.some(item => !item.uuid.includes('LOCAL_'));

  return data;
}
export const getLOANNormalIncomeCompletedByDeclare = (declare: string) => (state: RootState) => {
  const data = {
    salary: false,
    assetRent: false,
    business: false,
    company: false,
    deposit: false,
    other: false,
    pension: false,
    stock: false,
  }
  if (declare === 'borrower') {
    const borrower = state.LOANNormal.storage.income?.income?.borrower;
    const activePosition = borrower?.dataPosition?.find(item => item.uuidDeclare === borrower.activePosition);
    if (activePosition) {
      return checkCompletedDataIncomeDeclare(activePosition);
    }
  }

  if (declare === 'marriage') {
    const marriage = state.LOANNormal.storage.income.income.marriage;
    const activePosition = marriage.dataPosition.find(item => item.uuidDeclare === marriage.activePosition);
    if (activePosition) {
      return checkCompletedDataIncomeDeclare(activePosition);
    }
  }

  if (declare.includes('co-borrower')) {
    const dataDeclare = declare.split('/');
    if (dataDeclare && dataDeclare.length > 1) {
      const uuid = dataDeclare[1];
      const coborrower = state.LOANNormal.storage.income.income.coborrower;
      const activePosition = coborrower.dataPosition.find(item => item.uuidDeclare === uuid);
      if (activePosition) {
        return checkCompletedDataIncomeDeclare(activePosition);
      }
    }
  }

  if (declare.includes('co-payer')) {
    const dataDeclare = declare.split('/');
    if (dataDeclare && dataDeclare.length > 1) {
      const uuid = dataDeclare[1];
      const copayer = state.LOANNormal.storage.income.income.copayer;
      const activePosition = copayer.dataPosition.find(item => item.uuidDeclare === uuid);
      if (activePosition) {
        return checkCompletedDataIncomeDeclare(activePosition);
      }
    }
  }
  return data;
}

export const getLoanDataIncomeTypeContinue = (state:RootState) =>{
  const borrower = state.LOANNormal.storage.income?.income?.borrower;
  const marriage = state.LOANNormal.storage.income?.income?.marriage;
  const coBorrower = state.LOANNormal.storage.income?.income?.coborrower;
  const coPayer = state.LOANNormal.storage.income?.income?.copayer;
  let data:ILOANContinueRuleIncome[] = [];
  
  borrower.dataPosition.map((item,idx)=>{
    const activePosition = borrower?.dataPosition?.find(item => item.uuidDeclare === borrower.activePosition);
    const hasIncomeSource =_.pickBy(checkCompletedDataIncomeDeclare(activePosition as ILOANNormalStorageIncomeDeclareSalary), (val, key) => val === true)
    data.push({
      person_uuid:item.uuidDeclare ?? "",
      typeDeclare:"BORROWER",
      typeParams:"borrower",
      incomeSource:Object.keys(hasIncomeSource).map(item => {
        if (item === "assetRent") {
          item = "asset-rent"
          return item
        }
        return item
      })
    })
  })
  

  marriage.dataPosition.map((item,idx)=>{
    const activePosition = marriage?.dataPosition?.find(item => item.uuidDeclare === marriage.activePosition);
    const hasIncomeSource =_.pickBy(checkCompletedDataIncomeDeclare(activePosition as ILOANNormalStorageIncomeDeclareSalary), (val, key) => val === true)
    data.push({
      person_uuid:item.uuidDeclare ?? "",
      typeDeclare:"MARRIAGE",
      typeParams:"marriage",
      incomeSource:Object.keys(hasIncomeSource).map(item => {
        if (item === "assetRent") {
          item = "asset-rent"
          return item
        }
        return item
      })
    })
  })

  coBorrower.dataPosition.map((item,idx)=>{
    const activePosition = coBorrower?.dataPosition?.find(item => item.uuidDeclare === coBorrower.activePosition);
    const hasIncomeSource =_.pickBy(checkCompletedDataIncomeDeclare(item as ILOANNormalStorageIncomeDeclareSalary), (val, key) => val === true)
    data.push({
      typeDeclare:"COBORROWER",
      person_uuid:item.uuidDeclare ?? "",
      typeParams:"co-borrower",
      incomeSource:Object.keys(hasIncomeSource).map(item => {
        if (item === "assetRent") {
          item = "asset-rent"
          return item
        }
        return item
      })
    })
  })

  coPayer.dataPosition.map((item,idx)=>{
    const activePosition = coPayer?.dataPosition?.find(item => item.uuidDeclare === coBorrower.activePosition);
    const hasIncomeSource =_.pickBy(checkCompletedDataIncomeDeclare(item as ILOANNormalStorageIncomeDeclareSalary), (val, key) => val === true)
    data.push({
      person_uuid:item.uuidDeclare ?? "",
      typeDeclare:"COPAYER",
      typeParams:"co-payer",
      incomeSource:Object.keys(hasIncomeSource).map(item => {
        if (item === "assetRent") {
          item = "asset-rent"
          return item
        }
        return item
      })
    })
  })

  const filterDataIncomeSource = data.filter(item=>item.incomeSource.length)
  // console.log("person_uuid_coPayer",filterDataIncomeSource)

  return {
    data:filterDataIncomeSource,
    dataBorrower:filterDataIncomeSource.filter(item=>item.typeDeclare=== "BORROWER"),
    dataMarriage:filterDataIncomeSource.filter(item=>item.typeDeclare=== "MARRIAGE"),
    dataCoBorrower:filterDataIncomeSource.filter(item=>item.typeDeclare=== "COBORROWER"),
    dataCoPayer:filterDataIncomeSource.filter(item=>item.typeDeclare=== "COPAYER"),
    dataBorrowerIncomeSource:filterDataIncomeSource.find(item=>item.typeDeclare=== "BORROWER")?.incomeSource ?? [],
    dataMarriageIncomeSource:filterDataIncomeSource.find(item=>item.typeDeclare=== "MARRIAGE")?.incomeSource ?? [],
    dataCoBorrowerIncomeSource:filterDataIncomeSource.find(item=>item.typeDeclare=== "COBORROWER")?.incomeSource ?? [],
    dataCoPayerIncomeSource:filterDataIncomeSource.find(item=>item.typeDeclare=== "COPAYER")?.incomeSource ?? [],
    routerIncomeDeclare:_.uniqBy(filterDataIncomeSource,'typeParams').map(item=>item.typeParams),
    listPerson_uuid:filterDataIncomeSource.map(item=>item.person_uuid),
  };
}

const checkSingleDeclare = (type: string, state: RootState) => {
  const data = getLOANNormalIncomeCompletedByDeclare(type)(state);
  return Object.values(data).some(item => item);
}

const checkMultipleDeclare = (type: string, legalLabel: 'co_brw' | 'co_payer', state: RootState) => {
  const list = state.LOANNormal.storage.full.data?.form.legal_info_form.data[legalLabel];
  return list?.some((item) => {
    const data = getLOANNormalIncomeCompletedByDeclare(`${type}/${item.basic_info.uuid}`)(state);
    return Object.values(data).some(item => item);
  }) ?? false;
}

export const getLOANNormalIncomeDeclareCompleted = (state: RootState) => {
  const result = {
    borrower: checkSingleDeclare('borrower', state),
    marriage: checkSingleDeclare('marriage', state),
    coBorrower: checkMultipleDeclare('co-borrower', 'co_brw', state),
    coPayer: checkMultipleDeclare('co-payer', 'co_payer', state),
  };
  return result;
}
export const getLOANNormalIncomeTabsCompleted = (state: RootState) => {
  const getIncomeTabIncomes = () => {
    for (const [key, value] of Object.entries(getLOANNormalIncomeDeclareCompleted(state))) {
      if (value) return true;
    }

    return false
  }
  return {
    incomes: getIncomeTabIncomes(),
    balance: state.LOANNormal.storage.full.data?.form?.source_income_form?.data?.tabs?.balance !== null,
    ability: state.LOANNormal.storage.full.data?.form?.source_income_form?.data?.tabs?.ability_to_repay !== null,
  }
}
///////////////////////////////////////
/////////////ASSET-RENT////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListAssetRentActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeAssetRent: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.assetRent?.data
    ?.find(item => item.uuid === activeAssetRent)

export const getLOANNormalStorageIncomeSourceListAssetRentDetailsRealEstate = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeAssetRent: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.assetRent.data
    ?.find(item => item.uuid === activeAssetRent)?.assetDetailRealEstate.data

export const getLOANNormalStorageIncomeSourceListAssetRentDetailsRealEstateData = (
  declare: keyof ILOANNormalStorageIncomeDeclare,
  activePosUUID: string,
  activeAssetRent: string,
  activeReal: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.assetRent.data
    ?.find(item => item.uuid === activeAssetRent)?.assetDetailRealEstate.data
    ?.find(ass => ass.uuid === activeReal)

export const getLOANNormalStorageIncomeSourceListAssetRentDetailsTransportData = (
  declare: keyof ILOANNormalStorageIncomeDeclare,
  activePosUUID: string,
  activeAssetRent: string,
  activeTrans: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.assetRent.data
    ?.find(item => item.uuid === activeAssetRent)?.assetDetailTransport.data
    ?.find(ass => ass.uuid === activeTrans)

export const getLOANNormalStorageIncomeSourceListAssetRentDetailsOtherData = (
  declare: keyof ILOANNormalStorageIncomeDeclare,
  activePosUUID: string,
  activeAssetRent: string,
  activeOther: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.assetRent.data
    ?.find(item => item.uuid === activeAssetRent)?.assetDetailOther.data
    ?.find(ass => ass.uuid === activeOther)

export const checkCurrentExistDataBeforeSave = (state: RootState) => {
  const activeIncome = state.LOANNormal.storage.income.activeINCOME;
  if(activeIncome === 'balance' || activeIncome === "ability-repay"){
    return true
  }
  else {
    const activeDeclare = state.LOANNormal.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;
    const activePerson = state.LOANNormal.storage.income.income[activeDeclare]?.activePosition
    const activeIncomeSource = state.LOANNormal.storage.income.income[activeDeclare]?.dataPosition?.find(person => person.uuidDeclare === activePerson)?.activeIncomeSource as keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">;
    const currentPerson = state.LOANNormal.storage.income.income[activeDeclare]?.dataPosition?.find(person => person.uuidDeclare === activePerson)
    if(currentPerson){
      switch (activeIncomeSource) {
        case 'salary':
          return currentPerson.salary.data.length > 0
        case 'assetRent':
          return currentPerson.assetRent.data.length > 0
        case 'business':
          return currentPerson.business.data.length > 0
        case 'company':
          return currentPerson.company.data.length > 0
        case 'stock':
          return currentPerson.stock.data.length > 0
        case 'deposit':
          return currentPerson.deposit.data.length > 0
        case 'pension':
          return currentPerson.pension.uuid !== ""
        case 'other':
          return currentPerson.other.data.length > 0
        default:
          return false
      }
    }
    // return state.LOANNormal.storage.income.income[activeDeclare]?.dataPosition.find(person => person.uuidDeclare === activePerson).
  }
  return false
}
///////////////////////////////////////
/////////////BUSSNIESS////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListBussniessActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeBuss: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.business.data
    ?.find(item => item.uuid === activeBuss)

///////////////////////////////////////
/////////////COMPANY//////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListCompanyActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeCompany: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.company.data
    ?.find(item => item.uuid === activeCompany)

///////////////////////////////////////
/////////////STOCK////////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListStockActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeStock: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.stock.data
    ?.find(item => item.uuid === activeStock)

///////////////////////////////////////
/////////////DEPOSIT////////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListDepositActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeDeposit: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.deposit.data
    ?.find(item => item.uuid === activeDeposit)

///////////////////////////////////////
/////////////Pension////////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourcePensionData = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.pension

///////////////////////////////////////
/////////////Other////////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeSourceListOtherActive = (declare: keyof ILOANNormalStorageIncomeDeclare, activePosUUID: string, activeOther: string) =>
  (state: RootState) => state.LOANNormal.storage.income.income[declare]?.dataPosition
    ?.find(item => item?.uuidDeclare === activePosUUID)?.other.data
    ?.find(item => item.uuid === activeOther)

///////////////////////////////////////
/////////////TotalData/////////////////
//////////////////////////////////////

export const getLOANNormalStorageIncomeTotalData = () =>
  (state: RootState) => state.LOANNormal.storage.income.income

///////////////////////////////////////
/////////BALANCE//////////
/////////////
export const getLOANNormalStorageIncomeSourceBalance = () =>
  (state: RootState) => state.LOANNormal.storage.income.balance
// export const getLOANNormalStorageIncomeSourceBalanceDesc = () =>
//   (state: RootState) => state.LOANNormal.storage.income.balanceDesc
/////////////////////////////
/////////Ability////////////
////////////////////////////
export const getLOANNormalStorageIncomeSourceAbility = () =>
  (state: RootState) => state.LOANNormal.storage.income.ability

/////////////////totalstep //////////
export const getCustomerTotal = () => (state: RootState) => {
  let borrowerTotal: number = 0;
  let spouseTotal: number = 0;
  let coBorrowerTotal: number = 0;
  let coPayerTotal: number = 0;

  // eslint-disable-next-line
  borrowerTotal = state.LOANNormal.storage.income.income.borrower.total_income ?? 0
  spouseTotal = state.LOANNormal.storage.income.income.marriage.total_income ?? 0
  coBorrowerTotal = state.LOANNormal.storage.income.income.coborrower.total_income ?? 0
  coPayerTotal = state.LOANNormal.storage.income.income.copayer.total_income ?? 0

  return [
    borrowerTotal,
    spouseTotal,
    coBorrowerTotal,
    coPayerTotal,
  ]
}

// Người vay
export const getLOANNormalLegalBorrowerUuid = (state: RootState) => {
  return state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data?.borrower?.basic_info?.uuid ?? ""
}

// Người vay
export const getLOANNormalLegalBorrowerFullName = (state: RootState) => {
  return state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data?.borrower?.basic_info?.full_name ?? ""
}

// Người hôn phối
export const getLOANNormalLegalMarriageUuid = (state: RootState) => {
  return state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data?.marriage?.basic_info?.uuid ?? ""
}
// Người hôn phối
export const getLOANNormalLegalMarriageFullName = (state: RootState) => {
  return state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data?.marriage?.basic_info?.full_name ?? ""
}

// Người đồng vay
export const getLOANNormalLegalCoBorrower = (state: RootState) => {
  const useList: ILOANNormalStorageIncomeUserList[] = state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data?.co_brw?.map((cb: any) => ({
    uuid: cb?.basic_info?.uuid,
    full_name: cb?.basic_info?.full_name,
  })) ?? [];

  return useList;
}

export const getLOANNormalLegalData = (state: RootState) => {
  // const borrower =  state.LOANNormal.storage.legal.data['BORROWER'].info;
  const borrower = state.LOANNormal.storage.full.data?.form.legal_info_form.data.borrower;
  // const marriage =  state.LOANNormal.storage.legal.data['MARRIAGE'].info;
  const marriage = state.LOANNormal.storage.full.data?.form.legal_info_form.data.marriage;
  // const coBorrower =  state.LOANNormal.storage.legal.data['CO_BRW'].info;
  const coBorrower = state.LOANNormal.storage.full.data?.form.legal_info_form.data.co_brw;
  // const coPayer =  state.LOANNormal.storage.legal.data['CO_PAYER'].info;
  const coPayer = state.LOANNormal.storage.full.data?.form.legal_info_form.data.co_payer;
  return ({
    borrower, marriage, coBorrower, coPayer
  });
}

// Người đồng trả nợ
export const getLOANNormalLegalCoPayer = (state: RootState) => {
  const useList: ILOANNormalStorageIncomeUserList[] = state.LOANNormal.storage.full?.data?.form?.legal_info_form?.data?.co_payer?.map((cp: any) => ({
    uuid: cp?.basic_info?.uuid,
    full_name: cp?.basic_info?.full_name,
  })) ?? [];

  return useList;
}

export const getLOANNormalToalIncome = (state: RootState) => {
  const declareActive = state.LOANNormal.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;

  // Get data active declare
  const dataPosition = state.LOANNormal?.storage?.income?.income[declareActive];
  return dataPosition?.total_income ?? 0
}

export const getLOANNormalSumToalIncome = (state: RootState): ISumToalIncome => {
  const declareActive = state.LOANNormal.storage.income.declareActive as keyof ILOANNormalStorageIncomeDeclare;

  // Get data active declare
  const dataPosition = state.LOANNormal?.storage?.income?.income[declareActive];
  const activePosition = dataPosition?.activePosition;
  const position = dataPosition?.dataPosition?.find(d => d.uuidDeclare === activePosition);

  const totalIncome = (
    Number(position?.assetRent.total_income_from_property_rental ?? 0) +
    Number(position?.business.permanent_income_amount ?? 0) +
    Number(position?.company.total_income_from_company ?? 0) +
    Number(position?.deposit.total_income_from_deposits ?? 0) +
    Number(position?.other.total_income_from_other_sources ?? 0) +
    Number(position?.salary.total_income_from_salary_source ?? 0) +
    Number(position?.stock.total_income_from_stocks ?? 0)
  )
  const totalPermanentIncomeAmount = (
    Number(position?.assetRent.permanent_income_amount ?? 0) +
    Number(position?.business.permanent_income_amount ?? 0) +
    Number(position?.company.permanent_income_amount ?? 0) +
    Number(position?.deposit.permanent_income_amount ?? 0) +
    Number(position?.other.permanent_income_amount ?? 0) +
    Number(position?.salary.permanent_income_amount ?? 0) +
    Number(position?.stock.permanent_income_amount ?? 0)
  )

  const totalOccasionalIncomeAmount = (
    Number(position?.assetRent.occasional_income_amount ?? 0) +
    Number(position?.business.occasional_income_amount ?? 0) +
    Number(position?.company.occasional_income_amount ?? 0) +
    Number(position?.deposit.occasional_income_amount ?? 0) +
    Number(position?.other.occasional_income_amount ?? 0) +
    Number(position?.salary.occasional_income_amount ?? 0) +
    Number(position?.stock.occasional_income_amount ?? 0)
  )

  return {
    totalIncome: totalIncome ?? 0,
    totalPermanentIncomeAmount: totalPermanentIncomeAmount ?? 0,
    totalOccasionalIncomeAmount: totalOccasionalIncomeAmount ?? 0
  } as ISumToalIncome;
}

export const getIncomeZipName = (state: RootState): string => {
  const activeDeclare = state.LOANNormal.storage.income.declareActive;
  const activeINCOME = state.LOANNormal.storage.income.activeINCOME;
  const activePos = state.LOANNormal.storage.income.income[activeDeclare as keyof ILOANNormalStorageIncomeDeclare];
  const activePosition = activePos.activePosition;
  const currentDate = moment().format('YYYYMMDD');
  switch (activeDeclare) {
    case 'borrower': {
      const name: string = _.get(state, 'LOANNormal.storage.full.data.form.legal_info_form.data.borrower.basic_info.full_name', '');
      const nameZip = `${removeAccents(name)}_${(activeINCOME ?? '')?.toUpperCase()}_${currentDate}`;
      return nameZip.replace(/\s/g, '_');
    }
    case 'marriage': {
      const name: string = _.get(state, 'LOANNormal.storage.full.data.form.legal_info_form.data.marriage.basic_info.full_name', '');
      const nameZip = `${removeAccents(name)}_${(activeINCOME ?? '')?.toUpperCase()}_${currentDate}`;
      return nameZip.replace(/\s/g, '_');
    }
    case 'coborrower': {
      const cobor = state.LOANNormal.storage.full.data?.form.legal_info_form.data.co_brw.find((item) => item.basic_info.uuid === activePosition);
      const name: string = _.get(cobor, 'basic_info.full_name', '');
      const nameZip = `${removeAccents(name)}_${(activeINCOME ?? '')?.toUpperCase()}_${currentDate}`;
      return nameZip.replace(/\s/g, '_');
    }
    case 'copayer': {
      const cobor = state.LOANNormal.storage.full.data?.form.legal_info_form.data.co_payer.find((item) => item.basic_info.uuid === activePosition);
      const name: string = _.get(cobor, 'basic_info.full_name', '');
      const nameZip = `${removeAccents(name)}_${(activeINCOME ?? '')?.toUpperCase()}_${currentDate}`;
      return nameZip.replace(/\s/g, '_');
    }
    default: return '';
  };
}
export const getLOANNormalStorageCheckDataIncomeSteps = (declare: keyof ILOANNormalStorageIncomeDeclare) =>
  (state: RootState) => {
    return state.LOANNormal.storage.income.income[declare].dataPosition[0]?.activeIncomeSource
  }

export const checkDataUserList = (declare: keyof ILOANNormalStorageIncomeDeclare) => (state: RootState) => {
  let checkTrue: boolean[] = [];
  state.LOANNormal.storage.income.income[declare]?.dataPosition?.forEach((item, index) => {
    if (item.salary.total_income_from_salary_source
      || item.assetRent.total_income_from_property_rental
      || item.business.total_income_from_business_activities
      || item.company.total_income_from_company
      || item.deposit.total_income_from_deposits
      || item.other.total_income_from_other_sources
      || item.pension.income_from_pension
      || item.stock.total_income_from_stocks) {
      checkTrue[index] = false
      return
    }
    checkTrue[index] = true
  })
  return checkTrue;
}


