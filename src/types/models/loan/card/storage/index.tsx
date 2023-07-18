import { IIdCodeName } from "types/base";
import { ILOSInfo } from "types/models/LOS";
import { ILOANCardProductForm } from "../configs/Product";
import { 
  ILOANCardStorageLegalCardHolderState,
  ILOANCardStorageLegalMarriageState,
  ILOANCardStorageLegalOtherState,
  ILOANCardStorageLegalReferenceState,
  ILOANCardStorageLegalRelatedState,
  ILOANCardStorageLegalSuppCardState,
  ILOANCardStorageLegalValidate
} from "./Legal";
import { ILOANCardStorageProduct } from "./Product";

export interface ILOANCardForm{
  loan_type: IIdCodeName;
  los_info: ILOSInfo;
  product_group_form: ILOANCardProductForm;
}

export interface ILOANCardData{
  form: ILOANCardForm;
  modified_by: number;
  modified_at: number;
}

export interface ILOANCardFullState{
  fetched: boolean;
  fetching: boolean;
  starting: boolean;
  data: ILOANCardData | null;
  los_uuid:string;
}

export interface ILOANCardStorageLegalState{
  legalCardHolder: ILOANCardStorageLegalCardHolderState;
  legalMarriage: ILOANCardStorageLegalMarriageState;
  legalSuppCard: ILOANCardStorageLegalSuppCardState;
  legalRelated: ILOANCardStorageLegalRelatedState;
  legalReference: ILOANCardStorageLegalReferenceState;
  legalOther: ILOANCardStorageLegalOtherState;
}

export interface ILOANCardStorageState{
  full: ILOANCardFullState;
  product: ILOANCardStorageProduct;
  legal: ILOANCardStorageLegalState;
}
