import { ILOANApprovalStorageState } from "types/models/loan/normal/storageApproval";
import { incomeState } from "./income/state";
import { icrApprovalState } from "./icr/state";

import { cicState } from "./cic/state";
import { loanApprovalState } from "./loan/state";
import { collateralApprovalState } from "./collateral/state";
import { additionalApprovalState } from "./additionalApproval/state";
import { otherProfileState } from "./Other/state";

export const storageApprovalState: ILOANApprovalStorageState = {
  full: {
    fetched: false,
    fetching: false,
    starting: false,
    data: null
  },
  income: incomeState,
  icr: icrApprovalState,
  cic: cicState,
  loan: loanApprovalState,
  collateral:collateralApprovalState,
  additional: additionalApprovalState,
  other: otherProfileState
}