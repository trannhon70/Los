import { RootState } from "types";

export const shouldFetchLOANApprovalData = (state: RootState) => {
  return fetchingLOANApprovalData(state) && !state.LOANNormal.storageApproval.full.starting;
}
export const fetchingLOANApprovalData =
  (state: RootState) => state.LOANNormal.storageApproval.full.fetching;
  export const fetchedLOANApprovalData =
  (state: RootState) => state.LOANNormal.storageApproval.full.fetched;
export const existLOANApprovalData =
  (state: RootState) => state.LOANNormal.storageApproval.full.data// && !!state.LOANNormal.storage.full.data;

export const  getLOANApprovalSourceBorrowerUuid = (state: RootState) => state.LOANNormal.storageApproval.full?.data?.form?.source_income_form?.income?.borrower?.customer_uuid ?? "-"
export const getLOANApprovalFullData = (state: RootState) => state.LOANNormal.storageApproval.full.data

export const getLOANApprovalFullOtherData = (state: RootState) => state.LOANNormal.storageApproval.full.data?.form.other_profile

export const getLOANApprovalFullICRData= (state: RootState) => state.LOANNormal.storageApproval.full.data?.form.internal_credit_rating

export const getLOANApprovalFullICRTarget= (state: RootState) => state.LOANNormal.storageApproval.full.data?.form?.internal_credit_rating?.targets?.general_information


export const getLOANApprovalFullICRResult = (state: RootState) => state.LOANNormal.storageApproval.full.data?.form.internal_credit_rating.result_internal_credit_rating


// LOAN
export const getLOANApprovalProduct= (state: RootState) => state.LOANNormal.storageApproval.full.data?.form.loan_info_form.product_loan_program.loan_product

export const getLOANApprovalUserFullName = (state: RootState) => state.auth.user?.full_name ?? ""

export const getNotCompletedLoanApproval =  (state: RootState) => {

  const fullData = state.LOANNormal.storageApproval.full.data?.form.loan_info_form
  // console.log("1",fullData?.product_loan_program?.loan_program?.evaluation_analysis_table === null);
  // console.log("2",fullData?.capital_need_loan_plan_info === null );
  // console.log("3",fullData?.capital_need_loan_plan_info?.plan_effect?.turn_over?.evaluation_staff_t ===  0);
  // console.log("4",fullData?.capital_need_loan_plan_info?.total_capital_need?.evaluation_staff === 0);
  // console.log("5",(fullData?.production_and_business_activities !== null 
  //   && state.LOANNormal.storage.full.data?.form?.loan_info_form?.product_loan_program_info?.loan_program_info?.loan_purpose_info?.code !== "COMSUMPTION" 
  //   && fullData?.production_and_business_activities?.evaluation_assessment === null));
  // console.log("6",fullData?.loan_method?.fee_interest === null);
  
  return fullData?.product_loan_program?.loan_program?.evaluation_analysis_table === null 
  || fullData?.capital_need_loan_plan_info === null 
  || fullData?.capital_need_loan_plan_info?.plan_effect?.turn_over?.evaluation_staff_t ===  0
  || fullData?.capital_need_loan_plan_info?.total_capital_need?.evaluation_staff === 0
  || (fullData?.production_and_business_activities !== null 
    && state.LOANNormal.storage.full.data?.form?.loan_info_form?.product_loan_program_info?.loan_program_info?.loan_purpose_info?.code !== "COMSUMPTION" 
    && fullData?.production_and_business_activities?.evaluation_assessment === null)
  || fullData?.loan_method?.fee_interest === null

}