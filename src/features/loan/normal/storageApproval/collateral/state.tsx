import { ILOANNormalApprovalCollateralV2State } from "types/models/loan/normal/storageApproval/Collateral";
import { generateLOCALUUID } from "utils";
import { ETypeCollateral } from "./case";

export const collateralApprovalState: ILOANNormalApprovalCollateralV2State = {
  activeType: ETypeCollateral.ALL,
  uuidActiveData:'',
  carousel: [],
  data: [],
  fetched :false,
  fetching:false,
  spreadSheet:{
    title: '',
    rows: [],
    is_activated: false,
    updated_by: '',
    updated_at: null,
    updated_by_fullname:   null,
    uuid: generateLOCALUUID() ,
  },
  lvt_log:[],
  validate: { valid: true },
  uuidLegalAttachmentModal:'',
};