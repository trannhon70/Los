import { ILOANNormalCollateralV2State } from "types/models/loan/normal/storage/CollaretalV2";
import { ETypeCollateral } from "./case";

export const collaretalState_v2: ILOANNormalCollateralV2State = {
  activeType: ETypeCollateral.ALL,
  uuidActiveData:'',
  carousel: [],
  data: [],
  validate: {
    valid: true
  },
  fetched :false,
  fetching:false,
  ignore:"N",
  originData: []
};