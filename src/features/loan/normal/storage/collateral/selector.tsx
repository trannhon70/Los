import { RootState } from "types/reducer";
import { CollateralValidate } from "views/pages/LOAN/utils/validate";

export const getCollateral =
  (state: RootState) => state.LOANNormal.storage.collateral.collaterals;

export const getDashboard =
  (state: RootState) => state.LOANNormal.storage.collateral.dashboard;

export const getLOANNormal =
  (state: RootState) => state.LOANNormal.storage.collateral;


export const getLOANNormalStorageCollateralSave = (state: RootState) => [
  state.LOANNormal.storage.collateral,
  state.LOANNormal.storage.full.data?.form.los_info.los_uuid as string,
  state.masterData,
];

export const getLOANNormalStorageModalOwner = (state: RootState) =>
  state.LOANNormal.storage.legal.data['marriage'].info[0];

export const getLOANNormalStorageBorrower = (state: RootState) =>
  state.LOANNormal.storage.legal.data.BORROWER.info[0];

export const getLOANNormalStorageModalCoOwner = (state: RootState) => [{
  coborrower: state.LOANNormal.storage.legal.data['coborrower'].info,
  copayer: state.LOANNormal.storage.legal.data['copayer'].info,
  legalRelated: state.LOANNormal.storage.legal.data['legalRelated'].info,
  contact: state.LOANNormal.storage.legal.data['contact'].info,
}
];

export const getLOANNormalStorageModalByUUID = (uuid: string, declare: string) =>
 (state: RootState) => {
  if (declare === "borrower") {
    return state.LOANNormal.storage.legal.data.BORROWER.info[0];
  } else {
    return state.LOANNormal.storage.legal.data[declare].info;
  }
}

export const getLOANNormalStorageCollateralRelationshipType = () =>
 (state: RootState) =>
  state.LOANNormal.storage.collateral.collaterals[0].items;

export const validateLOANNormalStorageCollateral = (index: number) => (state: RootState) => {
  const {
   items,
  } = state.LOANNormal.storage.collateral.collaterals[0]

  const national = 'VN';
  const BorrowerBasic = CollateralValidate.basic(items, national);

  if (!BorrowerBasic.valid) return { ...BorrowerBasic, declare: 'basic_info' };

  const infoDetail = CollateralValidate.infoDetail(items);
  if (!infoDetail.valid) return { ...infoDetail, declare: 'detail_info' };

  // if(_detailsInfo['collateral_apartment'] === undefined){
  //   return { valid: false, field: 'compare', role: 'apartment'};
  // }

  return { valid: true };

}

export const getValidateLOANNormalStorageCollateral = (state: RootState) => state.LOANNormal.storage.collateral.validate;

