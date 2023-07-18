import { ICorrdinatorLOANState } from "types/models/loan/corrdinator";
import { corrdinatorLOANUserState } from "./corrdinatorUser/state";
import { corrdinatorLOANDocumentState } from "./document/state";

export const corrdinatorLOANState: ICorrdinatorLOANState = {
  full: {
    data: {
      document: {
        CREDIT: [],
        LOAN: []
      }
    }
  },
  document: corrdinatorLOANDocumentState,
  users: corrdinatorLOANUserState
}