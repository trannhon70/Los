import { RootState } from "types";

//////////////////////////////////////////////////
export const legalGetLOANCard = (state: RootState) => state.LOANCard

//////////////////////////////////////////////////
export const getLOANCardStorageLegalCardHolderDeclare =
  (state: RootState) => state.LOANCard.storage.legal.legalCardHolder.data;

export const getLOANCardStorageLegalCardHolderBasic =
(state: RootState) => state.LOANCard.storage.legal.legalCardHolder.data.basic_info;

export const getLOANCardStorageLegalCardHolderOther =
(state: RootState) => state.LOANCard.storage.legal.legalCardHolder.data.other_info;

export const getLOANCardStorageLegalCardHolderAddress =
(state: RootState) => state.LOANCard.storage.legal.legalCardHolder.data.address_info;

export const getLOANCardStorageLegalCardHolderBasicNation =
(state: RootState) => state.LOANCard.storage.legal.legalCardHolder.data.basic_info.country_info;

export const getLOANCardStorageLegalCardHolderIdentifies =
(state: RootState) => state.LOANCard.storage.legal.legalCardHolder.data.identity_info;

//////// Related///////////

export const getLOANCardStorageLegalDeclareRelatedBasic = (position: number) =>
(state: RootState) => state.LOANCard.storage.legal.legalRelated.data.info[position]?.basic_info;

export const getLOANCardStorageLegalDeclareRelatedList = () =>
  (state: RootState) => state.LOANCard.storage.legal.legalRelated.data.info;

export const getLOANCardStorageLegalDeclareRelated = () =>
(state: RootState) => state.LOANCard.storage.legal.legalRelated;

export const getLOANCardStorageLegalDeclareActiveRelated= () =>
(state: RootState) => state.LOANCard.storage.legal.legalRelated.data.active;