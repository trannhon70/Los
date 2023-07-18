import { ILOANNormalStorageOtherState } from "types/models/loan/normal/storage/Other";
import { generateUUID } from "utils";

export const otherState: ILOANNormalStorageOtherState = {
  report: null,
  exception: [],
  analysis: {
    uuid: generateUUID(),
    uuidRemote: generateUUID(),
    acceptCreditInfo: "Y",
    risksGroup: [],
    reasonCredit: "",
    approveCredit:{
      acceptCreditInfo:"Y",
      reasonCredit:"",
    },
    controlCredit:{
      acceptCreditInfo:"Y",
      reasonCredit:""
    }
  },
  validate: {
    declare: '',
    field: '',
    message: '',
    position: 0,
    role: '',
    valid: false,
  },
};