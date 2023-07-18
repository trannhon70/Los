
import { apiPost } from 'utils/api';
import { formatPath, formatRoundNumber } from 'utils';
import { API_SAVE_APPROVAL_LOAN_BUSSINESS, API_SAVE_APPROVAL_LOAN_CAPITAL, API_SAVE_APPROVAL_LOAN_METHOD, API_SAVE_APPROVAL_LOAN_PRODUCT } from '../../APIPathsS2';
import { IApprovalLOANState, ILoanProduct, ILoanProgram } from 'types/models/loan/normal/storageApproval/LoanInfoForm';
import { TableApprovalLOANOptions } from 'types/models/loan/normal/storageApproval/LOAN';


export const fetchSaveApprovalLOAN = (approvalStorage: IApprovalLOANState,product:ILoanProduct,program: ILoanProgram,los_id: string, stepName: string) => {
    const loan_product = {
        loan_product: product,
        loan_program: program
    } 
  // const needAndPlan = approvalStorage?.capital_need_loan_plan_info
    
      // vốn vay SCB
  const getPeriodicPrincipalByType = () =>{
    switch(program.evaluation_analysis_table){
      case TableApprovalLOANOptions.option_1:
        return approvalStorage.capital_need_loan_plan_info?.loan_limit?.loan_demand_at_scb?.evaluation_staff_t ?? 0
      case TableApprovalLOANOptions.option_2:
        return approvalStorage.capital_need_loan_plan_info?.loan_limit?.loan_scb?.evaluation_staff_t ?? 0
      case TableApprovalLOANOptions.option_3:
        return approvalStorage.capital_need_loan_plan_info?.loan_need_scb?.evaluation_staff ?? 0
      default:
        return 0
    }
  }

// 11. Tiền lãi + phí kỳ cao nhất (VND)
  // const interest_and_fees = formatRoundNumber((getPeriodicPrincipalByType() * (approvalStorage?.loan_method?.maximum_loan_interest_rate_scb ?? 0)/12/100) ?? 0, 0)

  // 13. tien goc dinh ky (Von vay SCB / thoi han vay)
  // const periodic_principal =  formatRoundNumber((getPeriodicPrincipalByType() / (approvalStorage?.loan_method?.credit_period ?? 0)) ?? 0, 0)

  // 14. Tiền gốc kỳ cuối cùng (VND)
  // const last_period_principal = (getPeriodicPrincipalByType() - formatRoundNumber(periodic_principal) * ((approvalStorage?.loan_method?.credit_period ?? 0) - 1)) ?? 0
  // console.log(last_period_principal,'last_period_principal');
  
  const bodyLoanMethod ={
      ...approvalStorage.loan_method,
      // periodic_principal:periodic_principal,
      // last_period_principal: last_period_principal,
      // interest_and_fees: interest_and_fees
  }
  const business = approvalStorage.business_activities
  
  
  switch (stepName) {
    case 'product':
      return apiPost<unknown>(formatPath(API_SAVE_APPROVAL_LOAN_PRODUCT, los_id), loan_product)
    case 'need-and-plan':
      // console.log(JSON.stringify(approvalStorage.capital_need_loan_plan_info),'reduxxxxx');
      
      const needAndPlan = approvalStorage.capital_need_loan_plan_info
      // // OPTION_1

      // const profift_t = (needAndPlan?.plan_effect?.turn_over?.evaluation_staff_t ?? 0) - (needAndPlan?.plan_effect?.total_cost?.evaluation_staff_t ?? 0) //  (3)t = (1) - (2)
      // const profift_t1 = (needAndPlan?.plan_effect?.turn_over?.evaluation_staff_t1 ?? 0) - (needAndPlan?.plan_effect?.total_cost?.evaluation_staff_t1 ?? 0)//  (3)t1 = (1) - (2)
    
      // const dataCapitalNeed_t = (!needAndPlan?.plan_effect?.total_cost?.evaluation_staff_t || !needAndPlan?.loan_limit?.working_capital?.evaluation_staff_t) ? 0 : ((needAndPlan?.plan_effect?.total_cost?.evaluation_staff_t) / (needAndPlan?.loan_limit?.working_capital?.evaluation_staff_t)) //(5)t = (2)/(4)
      // const dataCapitalNeed_t1 = (!needAndPlan?.plan_effect?.total_cost?.evaluation_staff_t1 || !needAndPlan?.loan_limit?.working_capital?.evaluation_staff_t1) ? 0 : ((needAndPlan?.plan_effect?.total_cost?.evaluation_staff_t1 ?? 0) / (needAndPlan?.loan_limit?.working_capital?.evaluation_staff_t1 ?? 0)) ?? 0//(5)t1 = (2)/(4)
    
      // const dataLoanDemanScb_t = (dataCapitalNeed_t ?? 0) -
      //                           (needAndPlan?.loan_limit?.own_working_capital?.evaluation_staff_t ?? 0) -
      //                           (needAndPlan?.loan_limit?.payable_to_other_sellers?.evaluation_staff_t ?? 0) -
      //                           (needAndPlan?.loan_limit?.other_credit_institutions?.evaluation_staff_t ?? 0) //(9)t = (5) - (6) - (7) - (8)
      // const dataLoanDemanScb_t1 = (dataCapitalNeed_t1 ?? 0) -
      //                           (needAndPlan?.loan_limit?.own_working_capital?.evaluation_staff_t1 ?? 0) -
      //                           (needAndPlan?.loan_limit?.payable_to_other_sellers?.evaluation_staff_t1 ?? 0) -
      //                           (needAndPlan?.loan_limit?.other_credit_institutions?.evaluation_staff_t1 ?? 0) //(9)t1 = (5) - (6) - (7) - (8)
    
      // const dataLoanRatioScb_t = (dataCapitalNeed_t === 0 || dataLoanDemanScb_t === 0) ? 0 : ((dataLoanDemanScb_t) / (dataCapitalNeed_t) )     //(10)t = (9)/(5)
      // const dataLoanRatioScb_t1 = (dataCapitalNeed_t1 === 0 || dataLoanDemanScb_t1 === 0) ? 0 :((dataLoanDemanScb_t1) / (dataCapitalNeed_t1))  //(10)t1 = (9)/(5)

      // OPTION_2
      
      // const totalCost_t = (needAndPlan?.plan_effect?.total_cost?.price_product?.evaluation_staff_t ?? 0) +
      //   (needAndPlan?.plan_effect?.total_cost?.management_cost?.evaluation_staff_t ?? 0) +
      //   (needAndPlan?.plan_effect?.total_cost?.other_cost?.evaluation_staff_t ?? 0) +
      //   (needAndPlan?.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t ?? 0)  // (2)t = (2.1) + (2.2) + (2.3) + (2.4)
      // const totalCost_t1 = (needAndPlan?.plan_effect?.total_cost?.price_product?.evaluation_staff_t1 ?? 0) +
      //   (needAndPlan?.plan_effect?.total_cost?.management_cost?.evaluation_staff_t1 ?? 0) +
      //   (needAndPlan?.plan_effect?.total_cost?.other_cost?.evaluation_staff_t1 ?? 0) +
      //   (needAndPlan?.plan_effect?.total_cost?.loan_cost?.evaluation_staff_t1 ?? 0) // (2)t1 = (2.1) + (2.2) + (2.3) + (2.4)

      // const profit_t_option_2 = (needAndPlan?.plan_effect?.turn_over?.evaluation_staff_t ?? 0) - (totalCost_t ?? 0)//  (3)t = (1) - (2)
      // const profit_t1_option_2 = (needAndPlan?.plan_effect?.turn_over?.evaluation_staff_t1 ?? 0) - (totalCost_t1 ?? 0) // (3)t1 = (1) - (2)

      // const loan_scb_t = totalCost_t -
      //   (needAndPlan?.loan_limit?.equity_capital?.evaluation_staff_t ?? 0) -
      //   (needAndPlan?.loan_limit?.credit_capital?.evaluation_staff_t ?? 0)  //(7)t = (4) - (5) - (6)
      // const loan_scb_t1 = totalCost_t1 -
      //   (needAndPlan?.loan_limit?.equity_capital?.evaluation_staff_t1 ?? 0) -
      //   (needAndPlan?.loan_limit?.credit_capital?.evaluation_staff_t1 ?? 0)  //(7)t1 = (4) - (5) - (6)

      // const scb_ratio_t = ((loan_scb_t) / (totalCost_t)) // (8)t = (7)/(4)
      // const scb_ratio_t1 = ((loan_scb_t1) / (totalCost_t1))// (8)t1 = (7)/(4)


      // OPTION_3

      const bodyNeedAndPlan = () => {
        switch (approvalStorage.loan_program.evaluation_analysis_table) {
          
          case TableApprovalLOANOptions.option_1:
            const bodyNeedAndPlanOption1 = {
              sequence_uuid: needAndPlan.sequence_uuid,
              plan_effect: {
                turn_over: needAndPlan.plan_effect.turn_over,
                total_cost: needAndPlan.plan_effect.total_cost,
                profit: {
                  business_unit_period_t: needAndPlan.plan_effect.profit.business_unit_period_t,
                  business_unit_period_t1: needAndPlan.plan_effect.profit.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan.plan_effect.profit.evaluation_staff_t,
                  evaluation_staff_t1: needAndPlan.plan_effect.profit.evaluation_staff_t1
                }
              },
              loan_limit: {
                working_capital: needAndPlan.loan_limit.working_capital,
                capital_needs: {
                  business_unit_period_t: needAndPlan.loan_limit.capital_needs.business_unit_period_t,
                  business_unit_period_t1: needAndPlan.loan_limit.capital_needs.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan.loan_limit.capital_needs.evaluation_staff_t,
                  evaluation_staff_t1: needAndPlan.loan_limit.capital_needs.evaluation_staff_t1
                },
                own_working_capital: needAndPlan.loan_limit.own_working_capital,
                payable_to_other_sellers: needAndPlan.loan_limit.payable_to_other_sellers,
                other_credit_institutions: needAndPlan.loan_limit.other_credit_institutions,
                loan_demand_at_scb: {
                  business_unit_period_t: needAndPlan.loan_limit.loan_demand_at_scb.business_unit_period_t,
                  business_unit_period_t1: needAndPlan.loan_limit.loan_demand_at_scb.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan.loan_limit.loan_demand_at_scb.evaluation_staff_t,
                  evaluation_staff_t1: needAndPlan.loan_limit.loan_demand_at_scb.evaluation_staff_t1
                },
                scb_sponsor_ratio: {
                  business_unit_period_t: needAndPlan.loan_limit.scb_sponsor_ratio.business_unit_period_t,
                  business_unit_period_t1: needAndPlan.loan_limit.scb_sponsor_ratio.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan?.loan_limit?.scb_sponsor_ratio?.evaluation_staff_t ?? 0,
                  evaluation_staff_t1: needAndPlan?.loan_limit?.scb_sponsor_ratio?.evaluation_staff_t1 ?? 0
                }
              },
              document_info_list: needAndPlan?.document_info_list ?? [],
              note: needAndPlan.note
            }
            return bodyNeedAndPlanOption1
          
          case TableApprovalLOANOptions.option_2:
            const bodyOption2 = {
              sequence_uuid: needAndPlan?.sequence_uuid,
              plan_effect: {
                turn_over: needAndPlan?.plan_effect?.turn_over,
                total_cost: {
                  business_unit_period_t: needAndPlan?.plan_effect?.total_cost?.business_unit_period_t,
                  business_unit_period_t1: needAndPlan?.plan_effect?.total_cost?.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan?.plan_effect?.total_cost.evaluation_staff_t,
                  evaluation_staff_t1: needAndPlan?.plan_effect?.total_cost.evaluation_staff_t1,
                  price_product: needAndPlan?.plan_effect?.total_cost?.price_product,
                  management_cost: needAndPlan?.plan_effect?.total_cost?.management_cost,
                  other_cost: needAndPlan?.plan_effect?.total_cost?.other_cost,
                  loan_cost: needAndPlan?.plan_effect?.total_cost?.loan_cost
                },
                profit: {
                  business_unit_period_t: needAndPlan?.plan_effect?.profit?.business_unit_period_t,
                  business_unit_period_t1: needAndPlan?.plan_effect?.profit?.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan?.plan_effect?.profit?.evaluation_staff_t,
                  evaluation_staff_t1: needAndPlan?.plan_effect?.profit?.evaluation_staff_t1
                }
              },
              loan_limit: {
                total_capital_need: {
                  business_unit_period_t: needAndPlan?.loan_limit?.total_capital_need?.business_unit_period_t,
                  business_unit_period_t1: needAndPlan?.loan_limit?.total_capital_need?.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan?.loan_limit?.total_capital_need?.evaluation_staff_t,
                  evaluation_staff_t1: needAndPlan?.loan_limit?.total_capital_need?.evaluation_staff_t1
                },
                equity_capital: needAndPlan?.loan_limit?.equity_capital,
                credit_capital: needAndPlan?.loan_limit?.credit_capital,
                loan_scb: {
                  business_unit_period_t: needAndPlan?.loan_limit?.loan_scb?.business_unit_period_t,
                  business_unit_period_t1: needAndPlan?.loan_limit?.loan_scb?.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan?.loan_limit?.loan_scb?.evaluation_staff_t,
                  evaluation_staff_t1: needAndPlan?.loan_limit?.loan_scb?.evaluation_staff_t1
                },
                scb_sponsor_ratio: {
                  business_unit_period_t: needAndPlan?.loan_limit?.scb_sponsor_ratio?.business_unit_period_t,
                  business_unit_period_t1: needAndPlan?.loan_limit?.scb_sponsor_ratio?.business_unit_period_t1,
                  evaluation_staff_t: needAndPlan?.loan_limit?.scb_sponsor_ratio?.evaluation_staff_t ?? 0 ,
                  evaluation_staff_t1:  needAndPlan?.loan_limit?.scb_sponsor_ratio?.evaluation_staff_t1 ?? 0
                }
              },
              document_info_list: needAndPlan?.document_info_list ?? [],
              note: needAndPlan.note
            }
            return bodyOption2
          
          case TableApprovalLOANOptions.option_3:
            const bodyOption3 = {
              sequence_uuid: needAndPlan?.sequence_uuid,
              total_capital_need: needAndPlan?.total_capital_need,
              equity_capital: needAndPlan?.equity_capital,
              loan_need_scb:{
                  business_unit: needAndPlan?.loan_need_scb?.business_unit,
                  evaluation_staff: needAndPlan?.loan_need_scb?.evaluation_staff
              },
              ratio_scb:{
                  business_unit: needAndPlan?.ratio_scb?.business_unit,
                  evaluation_staff: needAndPlan?.ratio_scb?.evaluation_staff
              },
              note: needAndPlan?.note,
              document_info_list: needAndPlan?.document_info_list ?? [],
            }
            return bodyOption3
          default:
            return {}
        }
      }
      return apiPost<unknown>(formatPath(API_SAVE_APPROVAL_LOAN_CAPITAL, los_id), bodyNeedAndPlan())
    case 'pro-and-bus':
      return apiPost<unknown>(formatPath(API_SAVE_APPROVAL_LOAN_BUSSINESS, los_id), business)
    case 'loan-method':
      return apiPost<unknown>(formatPath(API_SAVE_APPROVAL_LOAN_METHOD, los_id), bodyLoanMethod)
  }

    
}