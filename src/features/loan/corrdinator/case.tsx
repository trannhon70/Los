import { CorrdinatorUserLOANStoredCase } from "./corrdinatorUser/case";
import { CorrdinatorProfileStoredCase } from "./document/case";

export const StorageCorrdinatorLOANCase = {
  ...CorrdinatorProfileStoredCase,
  ...CorrdinatorUserLOANStoredCase
}
