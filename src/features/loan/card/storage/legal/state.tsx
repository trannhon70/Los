import { ILOANCardStorageLegalState } from "types/models/loan/card/storage";
import { ILOANCardStorageLegalMarriageDeclareState } from "types/models/loan/card/storage/Legal";
import { generateEmptyDeclareCardHolder, generateEmptyReference} from "views/pages/LOAN/utils";

export const legalCardState: ILOANCardStorageLegalState = {
    legalCardHolder: {
        data: generateEmptyDeclareCardHolder(),
        validate: {
            valid: true
        }
    },
    legalMarriage: {
        data: {} as ILOANCardStorageLegalMarriageDeclareState,
    },
    legalSuppCard: {
        data: {
            active: null,
            info: []
        }
    },
    legalRelated: {
        data: {
            active: null,
            info: [],
        },
    },
    legalReference: { data: generateEmptyReference() },
    legalOther: {
        data: {
            active: null,
            info: [],
        },
    },
}