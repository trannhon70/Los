import { Draft, PayloadAction } from "@reduxjs/toolkit"
import { ILOANNormalState } from "types/models/loan/normal";
import { ICategoryProfile, IConditionDetail, IConditions, ICreditTerm, ICurrentValue, IFormsData, IPostRequestForms, ITemplateFile, IValidateCreditTerm } from "types/models/loan/normal/storage/Forms";
import { IQueryParamsFormData } from "./api";
import _, { cloneDeep } from 'lodash';

export const FORMSCase = {

  // saveForms(state: Draft<ILOANNormalState>, action: PayloadAction<boolean>) { },
  updateStorageFormsData(state: Draft<ILOANNormalState>, action: PayloadAction<IFormsData>) {
    state.storage.forms.fileUrl = action.payload.preview_file_url;
    state.storage.forms.templateFields = action.payload.template_fields?.map(field => {
      const template_field: any = { ...field };
      if (template_field.default_data?.length !== 0) {
        template_field.currentCodeContract = template_field.default_data;
      }
      return template_field;
    })
  },
  fetchFormsData(state: Draft<ILOANNormalState>, _action: PayloadAction<IQueryParamsFormData>) {
    state.storage.forms.isLoadDonePdf = false;
  },
  setCurrentKeyword(state: Draft<ILOANNormalState>, action: PayloadAction<ICurrentValue>) {
    state.storage.forms.currentKeyword = action.payload;
  },
  setKeywordByClicking(state: Draft<ILOANNormalState>, action: PayloadAction<{key: string, id: number}>) {
    state.storage.forms.currentKeyword = {
      ...state.storage.forms.currentKeyword,
      [action.payload.key]: action.payload.id
    }
  },
  setLoadDonePdfFile(state: Draft<ILOANNormalState>) {
    state.storage.forms.isLoadDonePdf = true;
  },
  fetchCategoryProfile(state: Draft<ILOANNormalState>) {
    state.storage.forms.categoryProfile.fetching = true;
  },
  fetchCategoryProfileDone(state: Draft<ILOANNormalState>) {
    state.storage.forms.categoryProfile.fetching = false;
    state.storage.forms.categoryProfile.fetched = true;
  },
  setCategoryProfile(state: Draft<ILOANNormalState>, action: PayloadAction<ICategoryProfile | null>) {
    state.storage.forms.categoryProfile.data = action.payload;
  },
  setCurrentCodeContract(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<{id?: number; key: string; currentCodeContract: string | string[]}>
  ) {
    const { id, key, currentCodeContract } = action.payload;
    state.storage.forms.templateFields =
    state.storage.forms.templateFields.map(t => {
      if((id && t.id === id) || t.key === key) {
        t.currentCodeContract = currentCodeContract;
        return t;
      }
      return t;
    });
  },
  postForms(
    _state: Draft<ILOANNormalState>,
    _action: PayloadAction<IPostRequestForms>
  ) {},

  postFormsSuccess(state: Draft<ILOANNormalState>, action: PayloadAction<string | undefined>) {
    if (action.payload) {
      state.storage.forms.fileUrl = action.payload;
    }
  },
  getTemplate(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.storage.forms.templateFile.fetching = true
  },
  getTemplateDone(state: Draft<ILOANNormalState>){
    state.storage.forms.templateFile.fetching = false
    state.storage.forms.templateFile.fetched = true
  },
  setTemplateFile(state: Draft<ILOANNormalState>,action: PayloadAction<ITemplateFile>){
    state.storage.forms.templateFile.data = action.payload
    state.storage.forms.activeTemplate = action.payload?.folder[0]?.children[0]?.id ?? ""
  },
  setActiveTemplateFile(state: Draft<ILOANNormalState>,action: PayloadAction<string>){
    state.storage.forms.activeTemplate = action.payload
  },

  getInitialCreditTerm(state: Draft<ILOANNormalState>){},

  updateLOANNormalStorageCreditTerm(state: Draft<ILOANNormalState>,action: PayloadAction<ICreditTerm>){
    state.storage.forms.creditTerm = {
      ...state.storage.forms.creditTerm,
      ...action.payload
    }
  },

  saveLOANNormalStorageCreditTerm:{
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        string,
        string,
        {data: IConditions, role: string}
      >
    ) {},
    prepare(payload: string, meta: {data: IConditions, role: string}) {
      return { payload, meta };
    },
  
  },
  updateCreditTermAfterSave(state: Draft<ILOANNormalState>,action: PayloadAction<{conditions: IConditions, role: string}>){
    if(action.payload.role === "idea_controller") {
      state.storage.forms.creditTerm.idea_controller = action.payload.conditions
    }
    else state.storage.forms.creditTerm.idea_approver = action.payload.conditions
  },

  deleteLOANNormalCreditTerm(state: Draft<ILOANNormalState>,action: PayloadAction<{
    role: string,
    conType: string,
    index: number,
    uuid: string
  }>){},

  deleteLOANNormalStorageCreditTerm(state: Draft<ILOANNormalState>,action: PayloadAction<{
    role: string,
    conType: string,
    index: number,
    uuid: string
  }>){

    _.remove((_.get(state.storage.forms.creditTerm, [action.payload.role, action.payload.conType])), function(n: IConditionDetail) {
      return n.uuid === action.payload.uuid
    })

  },

}