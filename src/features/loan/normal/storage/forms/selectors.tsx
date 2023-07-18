import { RootState } from "types";
import { IConditions } from "types/models/loan/normal/storage/Forms";
import { ValidateCreditTerm } from "./validate";

export const getLOANNormalFormsData = 
  (state: RootState) => state.LOANNormal.storage.forms;

export const getLOANNormalFormsFileURL = 
  (state: RootState) => state.LOANNormal.storage.forms.fileUrl;

export const getLOANNormalFormsListMetadata = 
  (state: RootState) => state.LOANNormal.storage.forms.templateFields;

export const getLOANNormalFormsCurrentKeyword = 
  (state: RootState) => state.LOANNormal.storage.forms.currentKeyword;

export const isLoadDonePdfFileForms = 
  (state: RootState) => state.LOANNormal.storage.forms.isLoadDonePdf;
export const getLOANNormalFormCategoryProfile =
  (state: RootState) => state.LOANNormal.storage.forms.categoryProfile;

export const getLOANNormalFormCurrentCodeContract = (state: RootState) =>
  (state.LOANNormal.storage.forms.templateFields[0]
  // .find(t => t.id === state.LOANNormal.storage.forms.currentKeyword.id)
  ?.currentCodeContract);

export const getLOANNormalTemplateFile = (state: RootState) => state.LOANNormal.storage.forms.templateFile.data
export const getLOANNormalActiveTemplateFile = (state: RootState) => state.LOANNormal.storage.forms.activeTemplate


export const getLOANNormalTemplateFileActiveTemplate = (state: RootState) => {
  const active = state.LOANNormal.storage.forms.activeTemplate

  return state.LOANNormal.storage.forms.templateFile.data?.folder.find( i => i.children.find( j => j.id === active)?.id === active)?.children.find(x => x.id === active)
  
}
export const getLOANNormalTemplateFileByActiveTemplate = (state: RootState) => {
  const active = state.LOANNormal.storage.forms.activeTemplate

  return state.LOANNormal.storage.forms.templateFile.data?.folder.find( i => i.children.find( j => j.id === active)?.id === active)
  
}

export const getLOANNormalActiveTemplateCode = (state: RootState) => {
  const active = state.LOANNormal.storage.forms.activeTemplate

  return state.LOANNormal.storage.forms.templateFile.data?.folder?.find( i => i?.children?.find( j => j.id === active)?.id === active)?.children?.find(e => e.id === active)?.template_code ?? ""
  
}

export const getLOANNormalActiveFile = (state: RootState) => {
  const active = state.LOANNormal.storage.forms.activeTemplate

  return state.LOANNormal.storage.forms.templateFile.data?.folder?.find( i => i?.children?.find( j => j.id === active)?.id === active)?.children?.find(e => e.id === active)
  
}

export const getLOANNormalCreditTerm = (state: RootState) => {
  return state.LOANNormal.storage.forms.creditTerm
}

export const getRuleEditCreditTerm = (state: RootState) => {
  const userName = state.auth.user?.user_name
  return {
    control: state.LOANNormal.storageStateGuide.data?.current_state_group === "CONTROLLER_BRANCH" && state.LOANNormal.storageStateGuide?.data?.roles?.controller_branch?.username === userName,
    approval: state.LOANNormal.storageStateGuide.data?.current_state_group === "APPROVER_BRANCH" && state.LOANNormal.storageStateGuide?.data?.roles?.approver_branch?.username === userName,
  }


}
