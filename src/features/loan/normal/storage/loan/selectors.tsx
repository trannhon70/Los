import { RootState } from "types/reducer";
import { diffArray, PREFIX_LOCAL } from "utils";
import { LOANValidate } from "views/pages/LOAN/utils/validate";
import { timestampToDate } from 'utils/date';
import * as _ from 'lodash';
export const getLOANNormalStorageLOANProduct = (state: RootState) => state.LOANNormal.storage.loan.product;

export const getLOANNormalStorageLOANNeedAndPlan = (state: RootState) => state.LOANNormal.storage.loan.needAndPlan;

export const getLOANNormalStorageLOANBusiness = (state: RootState) => state.LOANNormal.storage.loan.legalBusiness;

export const getLOANNormalStorageLOANWarehouses =
  (state: RootState) => state.LOANNormal.storage.loan.legalBusiness.stores;

export const getLOANNormalStorageLOANFinance = (state: RootState) => state.LOANNormal.storage.loan.finance;

export const getLOANNormalStorageLOANInOut = (state: RootState) => state.LOANNormal.storage.loan.finance.C;
export const getLOANNormalStorageLOAN = (state: RootState) => state.LOANNormal.storage.loan
export const getLOANNormalStorageProduct = (state: RootState) => state.LOANNormal.storage.full.data?.form.product_group_form.data.loan_product_info
export const getLOANNormalStorageUuid = (state: RootState) => state.LOANNormal.storage.full.data?.form.los_info.los_uuid
export const getLOANNormalStorageFullLoan = (state: RootState) => state.LOANNormal.storage.full.data?.form.loan_info_form

export const getLOANNormalStorageListDocumentInfos = (state: RootState) => state?.LOANNormal?.storage?.loan?.needAndPlan?.document_info_list ?? [];
export const getLOANNormalStorageCountFile  = (state: RootState) => {
  const docs = getLOANNormalStorageListDocumentInfos(state);
  if(docs.length === 0) return 0;
  let count = 0;
  docs.forEach(doc=>{
    (doc.document_group??[]).forEach(docG=>{
      count += docG.child_files?.filter(file=>!file?.uuid?.includes(PREFIX_LOCAL))?.length ?? 0;
    })
  })
  return count;
}
export const validateLOANNormalStorageLoan = (state: RootState) => {
  const {
    product,
    needAndPlan,
    legalBusiness,
    finance,

  } = state.LOANNormal.storage.loan;
  const borrowerDate = state.LOANNormal.storage.full.data?.form.legal_info_form.data.borrower.basic_info.date_of_birth ?? 0
  console.log(borrowerDate,'borrowerDate');
  
  const productInfo = LOANValidate.Product.product(product);
  if (!productInfo.valid) return { ...productInfo, declare: 'product' };

  const needPlan = LOANValidate.LoanNeedAndPlan.loanNeed(needAndPlan, product.loanType,timestampToDate(borrowerDate));
  if (!needPlan.valid) return { ...needPlan, declare: 'need-and-plan' };

  const businessHousehold = LOANValidate.Business.businessHouse(legalBusiness);
  if (!businessHousehold.valid) return { ...businessHousehold, declare: 'business/household-legal' };

  const Finance = LOANValidate.Finance.finance(finance);
  if (!Finance.valid) return { ...Finance, declare: 'business/finance-analysis' };
  // tổng tài sản 
  //  const totalAssets = finance.B?.find(item=>item.id === 14)
  // Tiền mặt / Tiền gửi ngân hàng
  const cash_bankDeposits = finance.B?.find(item => item.id === 15)
  // Hàng tồn kho
  const inventory = finance.B?.find(item => item.id === 16)
  // Phải thu khách hàng
  const recievableCustomer = finance.B?.find(item => item.id === 17)
  // Tài sản cố định
  const fixedAssets = finance.B?.find(item => item.id === 18)
  const countTotalAssets = {
    t2: (cash_bankDeposits?.data.T2 ?? 0) + (inventory?.data.T2 ?? 0)
      + (recievableCustomer?.data.T2 ?? 0) + (fixedAssets?.data.T2 ?? 0),
    t1: (cash_bankDeposits?.data.T1 ?? 0) + (inventory?.data.T1 ?? 0)
      + (recievableCustomer?.data.T1 ?? 0) + (fixedAssets?.data.T1 ?? 0),
    t: (cash_bankDeposits?.data.T ?? 0) + (inventory?.data.T ?? 0)
      + (recievableCustomer?.data.T ?? 0) + (fixedAssets?.data.T ?? 0),
    kh: (cash_bankDeposits?.data.KH ?? 0) + (inventory?.data.KH ?? 0)
      + (recievableCustomer?.data.KH ?? 0) + (fixedAssets?.data.KH ?? 0),
    nvkd: (cash_bankDeposits?.data.NVKD ?? 0) + (inventory?.data.NVKD ?? 0)
      + (recievableCustomer?.data.NVKD ?? 0) + (fixedAssets?.data.NVKD ?? 0),
  }
  // Nguồn vốn
  //  const capital =finance.B?.find(item=>item.id === 19)
  // Phải trả khách hàng
  const payableCustomer = finance.B?.find(item => item.id === 20)
  // Vay ngân hàng
  const bankLoan = finance.B?.find(item => item.id === 21)
  // Vay khác
  const otherLoan = finance.B?.find(item => item.id === 22)
  // Vốn chủ sở hữu
  const quity = finance.B?.find(item => item.id === 23)
  const countCapital = {
    t2: (payableCustomer?.data.T2 ?? 0) + (bankLoan?.data.T2 ?? 0)
      + (otherLoan?.data.T2 ?? 0) + (quity?.data.T2 ?? 0),
    t1: (payableCustomer?.data.T1 ?? 0) + (bankLoan?.data.T1 ?? 0)
      + (otherLoan?.data.T1 ?? 0) + (quity?.data.T1 ?? 0),
    t: (payableCustomer?.data.T ?? 0) + (bankLoan?.data.T ?? 0)
      + (otherLoan?.data.T ?? 0) + (quity?.data.T ?? 0),
    kh: (payableCustomer?.data.KH ?? 0) + (bankLoan?.data.KH ?? 0)
      + (otherLoan?.data.KH ?? 0) + (quity?.data.KH ?? 0),
    nvkd: (payableCustomer?.data.NVKD ?? 0) + (bankLoan?.data.NVKD ?? 0)
      + (otherLoan?.data.NVKD ?? 0) + (quity?.data.NVKD ?? 0),
  }
  const capitalTotal = Object.values(countCapital);
  const assets = Object.values(countTotalAssets);

  if (diffArray(capitalTotal, assets)) {
    return { valid: false, field: 'compare', role: 'compare', declare: 'business/finance-analysis' };
  }


  return { valid: true };
}

export const validateLOANNormalStorageLoanProduct = (state: RootState) => {
  const {
    product
  } = state.LOANNormal.storage.loan;
  const productInfo = LOANValidate.Product.product(product);
  if (!productInfo.valid) return { ...productInfo, declare: 'product' };

  return { valid: true };
}
export const validateLOANNormalStorageLoanNeededPlan = (state: RootState) => {
  const {
    needAndPlan,
    product
  } = state.LOANNormal.storage.loan;
  const borrowerDate = state.LOANNormal.storage.full.data?.form.legal_info_form.data.borrower.basic_info.date_of_birth ?? 0
  
  const needPlan = LOANValidate.LoanNeedAndPlan.loanNeed(needAndPlan, product.loanType, timestampToDate(borrowerDate) );
  if (!needPlan.valid) return { ...needPlan, declare: 'need-and-plan' };

  return { valid: true };
}

export const validateLOANNormalStorageLoanLegalBussiness = (state: RootState) => {
  const {
    legalBusiness
  } = state.LOANNormal.storage.loan;
  const businessHousehold = LOANValidate.Business.businessHouse(legalBusiness);
  if (!businessHousehold.valid) return { ...businessHousehold, declare: 'business/household-legal' };

  return { valid: true };
}

export const validateLOANNormalStorageLoanFinance = (state: RootState) => {
  const {
    finance
  } = state.LOANNormal.storage.loan;

  const Finance = LOANValidate.Finance.finance(finance);
  if (!Finance.valid) return { ...Finance, declare: 'business/finance-analysis' };
  // tổng tài sản 
  //  const totalAssets = finance.B?.find(item=>item.id === 14)
  // Tiền mặt / Tiền gửi ngân hàng
  // const cash_bankDeposits = finance.B?.find(item => item.id === 15)
  // // Hàng tồn kho
  // const inventory = finance.B?.find(item => item.id === 16)
  // // Phải thu khách hàng
  // const recievableCustomer = finance.B?.find(item => item.id === 17)
  // // Tài sản cố định
  // const fixedAssets = finance.B?.find(item => item.id === 18)
  // const countTotalAssets = {
  //   t2: (cash_bankDeposits?.data.T2 ?? 0) + (inventory?.data.T2 ?? 0)
  //     + (recievableCustomer?.data.T2 ?? 0) + (fixedAssets?.data.T2 ?? 0),
  //   t1: (cash_bankDeposits?.data.T1 ?? 0) + (inventory?.data.T1 ?? 0)
  //     + (recievableCustomer?.data.T1 ?? 0) + (fixedAssets?.data.T1 ?? 0),
  //   t: (cash_bankDeposits?.data.T ?? 0) + (inventory?.data.T ?? 0)
  //     + (recievableCustomer?.data.T ?? 0) + (fixedAssets?.data.T ?? 0),
  //   kh: (cash_bankDeposits?.data.KH ?? 0) + (inventory?.data.KH ?? 0)
  //     + (recievableCustomer?.data.KH ?? 0) + (fixedAssets?.data.KH ?? 0),
  //   nvkd: (cash_bankDeposits?.data.NVKD ?? 0) + (inventory?.data.NVKD ?? 0)
  //     + (recievableCustomer?.data.NVKD ?? 0) + (fixedAssets?.data.NVKD ?? 0),
  // }
  // // Nguồn vốn
  // //  const capital =finance.B?.find(item=>item.id === 19)
  // // Phải trả khách hàng
  // const payableCustomer = finance.B?.find(item => item.id === 20)
  // // Vay ngân hàng
  // const bankLoan = finance.B?.find(item => item.id === 21)
  // // Vay khác
  // const otherLoan = finance.B?.find(item => item.id === 22)
  // // Vốn chủ sở hữu
  // const quity = finance.B?.find(item => item.id === 23)
  // const countCapital = {
  //   t2: (payableCustomer?.data.T2 ?? 0) + (bankLoan?.data.T2 ?? 0)
  //     + (otherLoan?.data.T2 ?? 0) + (quity?.data.T2 ?? 0),
  //   t1: (payableCustomer?.data.T1 ?? 0) + (bankLoan?.data.T1 ?? 0)
  //     + (otherLoan?.data.T1 ?? 0) + (quity?.data.T1 ?? 0),
  //   t: (payableCustomer?.data.T ?? 0) + (bankLoan?.data.T ?? 0)
  //     + (otherLoan?.data.T ?? 0) + (quity?.data.T ?? 0),
  //   kh: (payableCustomer?.data.KH ?? 0) + (bankLoan?.data.KH ?? 0)
  //     + (otherLoan?.data.KH ?? 0) + (quity?.data.KH ?? 0),
  //   nvkd: (payableCustomer?.data.NVKD ?? 0) + (bankLoan?.data.NVKD ?? 0)
  //     + (otherLoan?.data.NVKD ?? 0) + (quity?.data.NVKD ?? 0),
  // }
  // const capitalTotal = Object.values(countCapital);
  // const assets = Object.values(countTotalAssets);

  // if (diffArray(capitalTotal, assets)) {
  //   return { valid: false, field: 'compare', role: 'compare', declare: 'business/finance-analysis' };
  // }


  return { valid: true };
}
export const getValidateLOANNormalStorageLoan = (state: RootState) => {
  return state.LOANNormal.storage.loan.validate;
}
export const getValidateLOANNormalStorageLoanTest = (state: RootState) => {
  return state.LOANNormal.storage.loan.finance;
}
export const getDataConfigDocument = () => (state: RootState) => {
  return _.get(state.LOANNormal,['configs','documentType','PHUONG_AN_&_NHU_CAU_CTD_LOAN','data'],[]);
}
export const getDataConfigDocumentWithKey = (key:string) => (state: RootState) => {
  return _.get(state.LOANNormal,['configs','documentType',key,'data'],[]);
}
export const getCodeDocumentTypeChildList = (key: string , cicType: string | number) => (state: RootState) => {

  return state.LOANNormal.configs.documentType[key]?.data?.find(d => d.id === +cicType)?.child_list ?? []
}