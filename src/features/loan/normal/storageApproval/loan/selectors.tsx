import * as _ from 'lodash';
import { RootState } from 'types';
import { IResLOANNormalDocumentInfo } from 'types/models/loan/normal/storage/LOAN';
import { TableApprovalLOANOptions } from 'types/models/loan/normal/storageApproval/LOAN';
import { LOANApprovalValidate } from './validate';
export const getApprovalStorage = (state: RootState) => state.LOANNormal.storageApproval.loan
export const getApprovalLOANProgram = (state: RootState) => state.LOANNormal.storageApproval.loan.loan_program
export const getApprovalLOANMethod = (state: RootState) => state.LOANNormal.storageApproval.loan.loan_method
export const getLOANApprovalLOANProgram = (state: RootState) => state.LOANNormal.storageApproval.loan.loan_program
export const getLOANApprovalLOANProgramTableType = (state: RootState) => state.LOANNormal.storageApproval.loan.loan_program.evaluation_analysis_table
export const getLOANApprovalLoanProgramFull = (state: RootState) => state.LOANNormal.storageApproval.full.data?.form.loan_info_form.product_loan_program.loan_program
export const getLOANApprovalLOANCaptitalOption1 = (state: RootState) => state.LOANNormal.storageApproval.loan.capital_need_loan_plan_info


export const getApprovalLOANCapitalNeedOption = (state: RootState) => state.LOANNormal.storageApproval.loan.capital_need_loan_plan_info

export const getApprovalLOANCapitalNeed = (state: RootState) => state.LOANNormal.storageApproval.loan.capital_need_loan_plan_info
export const getApprovalLOANBusinessActivitiesBasicInfo = (state: RootState) => state.LOANNormal.storageApproval.loan.business_activities?.basic_info
export const getApprovalLOANBusinessActivitiesBusinessInfo = (state: RootState) => state.LOANNormal.storageApproval.loan.business_activities?.business_info
export const getApprovalLOANBusinessActivitiesEvaluation = (state: RootState) => state.LOANNormal.storageApproval.loan.business_activities?.evaluation_assessment
export const getApprovalLOANBusinessActivitiesWareHouses = (state: RootState) => state.LOANNormal.storageApproval.loan.business_activities?.warehouses

export const getApprovalLOANDemandAtScb = (state: RootState) => {
    const option = state.LOANNormal.storageApproval.full.data?.form.loan_info_form.product_loan_program.loan_program.evaluation_analysis_table
    const tableData = state.LOANNormal.storageApproval.loan.capital_need_loan_plan_info
    switch (option) {
        case TableApprovalLOANOptions.option_1:
            return tableData?.loan_limit?.loan_demand_at_scb?.evaluation_staff_t1 ?? 0
        case TableApprovalLOANOptions.option_2:
            return tableData?.loan_limit?.loan_scb?.evaluation_staff_t1 ?? 0
        case TableApprovalLOANOptions.option_3:
            return tableData?.loan_need_scb?.evaluation_staff ?? 0
        default:
            return 0;
    }
}

// VALIDATE
export const validateLOANApproval = (type: string) => (state: RootState) => {
    const validate = LOANApprovalValidate
    const loan = state.LOANNormal.storageApproval.loan;
    if (type === 'product') {
        const valid = validate.actual_purpose_using_loan(loan.loan_program.actual_purpose_using_loan as string );
        if(!valid.valid) return {...valid};
    }
    if (type === 'product') {
        const valid = validate.program(loan.loan_program.evaluation_analysis_table);
        if(!valid.valid) return {...valid};
    }
   
    // validate step 2
    if (type === 'need-and-plan') {
        switch (loan.loan_program.evaluation_analysis_table) {
            case TableApprovalLOANOptions.option_1:
                const validTableA = validate.tableA(loan.capital_need_loan_plan_info);
                if(!validTableA.valid) return {...validTableA};
                break;
            case TableApprovalLOANOptions.option_2:
                const validTableB = validate.tableB(loan.capital_need_loan_plan_info);
                if(!validTableB.valid) return {...validTableB};
                break;
            case TableApprovalLOANOptions.option_3:
                const validTableC = validate.tableC(loan.capital_need_loan_plan_info);
                if(!validTableC.valid) return {...validTableC};
                break;
        }
    }
    if (type === 'loan-method') {
        const valid = validate.loan_method(loan.loan_method);
        if(!valid.valid) return {...valid};
    }
    // validate step 3
    if (type === 'pro-and-bus') {
        const valid = validate.pro_and_bus(loan.business_activities);
        if(!valid.valid) return {...valid};
    }

    return { valid: true };

}
export const getLOANApprovalValidate = (state: RootState) => state.LOANNormal.storageApproval.loan.validate;
export const getLOANApprovalNeedForPlanInfoDocument = (state: RootState): { docs: IResLOANNormalDocumentInfo[], count: number } => {
    const data: IResLOANNormalDocumentInfo[] = _.get(state.LOANNormal, 'storageApproval.loan.capital_need_loan_plan_info.document_info_list', []) ?? [];
    let count = 0;
    data.forEach(doc => {
        doc?.document_group?.forEach(grdoc => {
            grdoc?.child_files?.forEach((file) => {
                if (file.content_type) {
                    count++;
                }
            })
        });
    })
    return { docs: data, count }
};
export const getLOANApprovalProductionAndBusiness = (state: RootState) => state.LOANNormal.storageApproval.full.data?.form?.loan_info_form?.production_and_business_activities
export const getApprovalLoanTableOptionSaved = (state: RootState) => state.LOANNormal.storageApproval.full.data?.form.loan_info_form.product_loan_program.loan_program.evaluation_analysis_table
