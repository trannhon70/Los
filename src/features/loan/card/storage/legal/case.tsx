import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANCardState } from "types/models/loan/card";
import { ILOANCardStorageLegalDeclareCardHolder, ILOANCardStorageLegalValidate } from "types/models/loan/card/storage/Legal";
import { generateEmptyDeclareRelated } from "views/pages/LOAN/utils";

const LOANCardLegalStorageCase = {
  saveLegalCardHolder(state: Draft<ILOANCardState>, action: PayloadAction<boolean>) { },
  setLegalValidateCardHolder(state: Draft<ILOANCardState>, action: PayloadAction<ILOANCardStorageLegalValidate>){
    state.storage.legal.legalCardHolder.validate = action.payload;
  },

  setLegalCardHolderDeclareCheck(state: Draft<ILOANCardState>, action: PayloadAction<string[]>){
    state.storage.legal.legalCardHolder.data.declare = [ ...action.payload ];
  },

  setLegalCardHolderBasicInfo: {
    reducer(
      state: Draft<ILOANCardState>,
      action: PayloadAction<
        ILOANCardStorageLegalDeclareCardHolder[keyof ILOANCardStorageLegalDeclareCardHolder],
        string,
        keyof ILOANCardStorageLegalDeclareCardHolder
      >
    ) {
      state.storage.legal.legalCardHolder.data.basic_info = {
        ...state.storage.legal.legalCardHolder.data.basic_info,
        [action.meta]: action.payload
      }
    },
    prepare(
      payload: ILOANCardStorageLegalDeclareCardHolder[keyof ILOANCardStorageLegalDeclareCardHolder],
      meta: keyof ILOANCardStorageLegalDeclareCardHolder
    ) { return { payload, meta } }
  },
  /////// RELATED////////
  
  addLegalDeclareRelated(state: Draft<ILOANCardState>){
    state.storage.legal.legalRelated.data = {
      ...state.storage.legal.legalRelated.data,
      info: [
        ...state.storage.legal.legalRelated.data.info,
        generateEmptyDeclareRelated(),
      ]
    }
  },

  setLegalDeclareActiveRelated(state: Draft<ILOANCardState>, action: PayloadAction<number, string>) {
    state.storage.legal.legalRelated.data.active = action.payload;
  },
    //delete user legal Contact objectList
  deleteLegalDeclareRelated(state: Draft<ILOANCardState>, action: PayloadAction<string, string>) {
    let active = state.storage.legal.legalRelated.data.active;
    if (state.storage.legal.legalRelated.data.info.length - 1 === active && active > 0) {
      active -= 1;
    }
    state.storage.legal.legalRelated.data = {
      ...state.storage.legal.legalRelated.data,
      info: state.storage.legal.legalRelated.data.info.filter(info => info.uuid !== action.payload)
    }
  },

}
export default LOANCardLegalStorageCase;
