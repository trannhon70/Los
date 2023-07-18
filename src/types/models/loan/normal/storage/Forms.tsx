export interface ILOANNormalStorageFormsState {
  fileUrl: string;
  // currentKeyword: {
  //   id?: number;
  //   key: string;
  // };
  currentKeyword: ICurrentValue;
  templateFields: ({
    currentCodeContract?: string | string[];
  } & ITemplateFieldsData)[];
  isLoadDonePdf: boolean;
  categoryProfile: {
    data: ICategoryProfile | null;
    fetching: boolean;
    fetched: boolean;
  };
  templateFile:{
    data: ITemplateFile ;
    fetching: boolean;
    fetched: boolean;
  },
  activeTemplate: string | null,
  creditTerm : ICreditTerm
}


export interface ITemplateFile{
  los_uuid: string;
  folder:ITemplateFileFolder[]
}
export interface ITemplateFileFolder{
  name: string;
  // template_code: string;
  children: ITemplateFileFolderChildren[]
}
export interface ITemplateFileFolderChildren{
  id: string,
  template_code: string
  actived_flag: boolean,
  approved_flag: boolean,
  fill_data_history_id: number | null,
  is_primary: boolean,
}
/////////////////////////////////////////////

export interface IFormsData {
  fill_data_history_id: number | null;
  preview_file_url: string;
  template_fields: ITemplateFieldsData[];
}

export interface ITemplateFieldsData {
  id: number | null;
  label: string;
  key: string;
  input_type_id: number | null;
  default_data: string;
  extend_data: {
    value: string;
    text: string;
  }[];
  date_logs: IDateLogData[];
}

export interface IDateLogData {
  date: string;
  logs: ILogData[];
}

export interface ILogData {
  id: number;
  content: string;
  user_id: string;
  user_avatar_url: string;
  user_fullname: string;
  created_at: string;
  updated_at: string;
}

export interface IProfileListCategoryProfile {
  profile_type_id: number;
  profile_type_list: {
    profile_id: string;
    profile_name: string;
    activated_flag: boolean;
  }[];
  profile_type_name: string;
  template_code: string;
}

export interface IDateLogsCategoryProfile {
  date: string;
  logs: {
    content: string;
    created_at: string;
    department_code: string;
    id: number;
    updated_at: string;
    user_avatar_url: string;
    user_fullname: string;
    user_id: string | number;
  }[];
}

export interface ICategoryProfile {
  profile_list: IProfileListCategoryProfile[];
  total_approval: number | null;
  date_logs: IDateLogsCategoryProfile[];
}

export interface IPostRequestForms {
  los_uuid: string;
  template_type: string,
  fill_data_history_id?: number | null,
  template_uuid?: string,
  actived_flag?: boolean,
  approved_flag?: boolean, 
  data_fill: {
    [key: string]: string | string[] | {[key: string]: string}[];
  };
}

export interface ICurrentValue {
  [key: string]: number;
}

export interface ICreditTerm {
  idea_controller : IConditions,
  idea_approver: IConditions, 
}

export interface IConditions {
  pre_disbursement_conditions : IConditionDetail[],
  conditions_after_disbursement: IConditionDetail[],
}

export interface IConditionDetail {
  uuid: string,
  disb_def_type: string,
  prog_rule_type: string,
  note: string,
  display_order: number | null
}

export interface IValidateCreditTerm {
  valid: boolean;
  roleTerm?: string;
  conType?: string;
  uuid?: string;
  role?: string;
}