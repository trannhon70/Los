import { ILOANNormalStorageFormsState, ITemplateFile } from "types/models/loan/normal/storage/Forms";

export const formsState: ILOANNormalStorageFormsState = {
  fileUrl: '',
  templateFields: [],
  currentKeyword: {},
  isLoadDonePdf: false,
  categoryProfile: {
    data: {
      date_logs: [],
      profile_list: [],
      total_approval: null
    },
    fetching: false,
    fetched: false
  },
  templateFile:{
    data:  {} as ITemplateFile,
    fetching: false,
    fetched: false,
  },
  activeTemplate: null,
  creditTerm: {
    idea_approver : {
      pre_disbursement_conditions: [],
      conditions_after_disbursement: []
    },
    idea_controller: {
      pre_disbursement_conditions: [],
      conditions_after_disbursement: []
    },
  }
};