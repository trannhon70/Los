import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import { financeMetadataState } from "./finance-metadata/state";
import { genderState } from "./gender/state";
import { productState } from "./product";
import { policyDetailState } from './policy-detail/state';
import { documentTypeState } from "features/master-data/state";
import { vehicleDetailState } from './vehicle-detail/state';
import { validateDateTypeState } from "./validate-date-type/state";
import { metadataConstantState } from "./metadata/state";

export const configState: ILOANNormalConfigState = {
  product: productState,
  gender: genderState,
  financeMetadata: financeMetadataState,
  policyDetail: policyDetailState,
  documentType: documentTypeState,
  vehicleDetail: vehicleDetailState,
  validateDateType: validateDateTypeState,
  metadataConstant:  metadataConstantState
}