import { ICorrdinatorState } from "types/models/corrdinator";
import { corrdinatorUserState } from "./corrdinatorUser/state";
import { corrdinatorProfileState } from "./profile/state";

export const corrdinatorState: ICorrdinatorState = {
  full: {
    data: {
      profile: {
        CREDIT: [],
        LOAN: []
      }
    }
  },
  profile: corrdinatorProfileState,
  users: corrdinatorUserState
}