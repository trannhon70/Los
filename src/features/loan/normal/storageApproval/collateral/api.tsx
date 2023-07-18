import { IDataPostCollateralS2, ILOANNormalApprovalCollateralV2State } from "types/models/loan/normal/storageApproval/Collateral";
import { IMasterData } from 'types/models/master-data';
import { formatPath, formatRoundNumber, PREFIX_LOCAL } from "utils";
import { apiDelete, apiPost } from "utils/api";
import { API_DELETE_APPROVAL_COLLATERAL_LTV, API_SAVE_APPROVAL_COLLATERAL, API_SAVE_APPROVAL_COLLATERAL_LTV } from "../../APIPathsS2";

export const saveCollateralApprovalLVT = (storage: ILOANNormalApprovalCollateralV2State,
  los_id: string,
  los_uuid: string,
  master: IMasterData,
  type: string
) => {
  const body = { 
      rows:storage.spreadSheet.rows?.map(item=>({
        coll_price_cert_uuid: item.coll_price_cert_uuid,
        coll_price_cert_asset_uuid: item.coll_price_cert_asset_uuid ?? "",
        loan_credit: item.loan_credit,
        temp_calc_value: item.temp_calc_value,
        max_ltv_value: item.max_ltv_value,
        max_loan_credit: item.max_loan_credit,
        safely_debit: item.safely_debit,
        ltv_value: item.ltv_value,
        uuid: item.uuid.includes(PREFIX_LOCAL) ? null : item.uuid
      })),
      uuid: !storage.spreadSheet.uuid.includes(PREFIX_LOCAL) ? storage.spreadSheet.uuid : null
  }
  return apiPost<unknown>(formatPath(API_SAVE_APPROVAL_COLLATERAL_LTV, los_id), body);
}
export const saveCollateralApproval = (los_id: string, data: IDataPostCollateralS2) => {

  const body = { 
    is_accept: data?.is_accept,
    reason: data?.reason
  }

  return apiPost<unknown>(formatPath(API_SAVE_APPROVAL_COLLATERAL, los_id, data?.price_cert_uuid ?? ""), body);
}
export const deleteSpreadSheetCollateralApprovalApi = (los_id: string, uuid: string) => {
  return apiDelete<unknown>(formatPath(API_DELETE_APPROVAL_COLLATERAL_LTV, los_id, uuid));
}


export interface IDeleteParams {
  cert_uuid?: string;
  uuid: string;
}