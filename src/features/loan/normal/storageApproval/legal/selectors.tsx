import { IFinanceMetadataItemInfo, IFinancialAnalysisInfo } from "types/models/loan/normal/storageApproval/LOAN";
import { ILOANNormalState } from "types/models/loan/normal";
import * as _ from 'lodash';

export const getFinanceAnalysis = (state: ILOANNormalState) =>{
    // state.storage.full.data.form.loan_info_form.operation_business.financial_analysis_info
    const financial_analysis:IFinancialAnalysisInfo | undefined = _.get(state,'storage.full.data.form.loan_info_form.operation_business.financial_analysis_info');
    const net_revenue_id = 7;
    const total_cost_id = 8;
    const net_profit_id = 13;
    const result:{
      net_revenue:IFinanceMetadataItemInfo[]|null,
      total_cost:IFinanceMetadataItemInfo[]|null,
      net_profit:IFinanceMetadataItemInfo[]|null,
    } = {
      net_revenue:null,
      total_cost:null,
      net_profit:null,
    };
    if(financial_analysis){
      financial_analysis.business_result_list.forEach((it: any)=>{
        if(it.finance_metadata_id === net_revenue_id){
          _.set(result,'net_revenue',it.finance_metadata_item_info);
        }
        if(it.finance_metadata_id === total_cost_id){
          _.set(result,'total_cost',it.finance_metadata_item_info);
        }
        if(it.finance_metadata_id === net_profit_id){
          _.set(result,'net_profit',it.finance_metadata_item_info);
        }
      });
    }
    return result;
  }