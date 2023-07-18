import { IFinanceMetadataState } from "./FinanceMetadata";
import { ILOANNormalGenderState } from "./Gender";
import { ILOANNormalProductState } from "./Product";
import { IStoreModel } from 'types/api';
import { IDocumentType, IPolicyDetail } from "types/models/master-data/state";
import { IVehicleDetailState } from 'types/models/loan/normal/configs/VehicleDetail';
import { IValidateDateTypeState } from "./ValidateDateType";
import { IMetadataConstantState } from "./metadata";

export interface ILOANNormalConfigState{
  product: ILOANNormalProductState;
  gender: ILOANNormalGenderState;
  financeMetadata: IFinanceMetadataState;
  policyDetail: Record<string, IStoreModel<IPolicyDetail[]>>;
  documentType: Record<string, IStoreModel<IDocumentType[]>>;
  vehicleDetail: IVehicleDetailState,
  validateDateType: IValidateDateTypeState,
  metadataConstant: IMetadataConstantState
}