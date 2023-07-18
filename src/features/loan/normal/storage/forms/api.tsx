import {
  ICategoryProfile,
  IConditions,
  ICreditTerm,
  IFormsData,
  IPostRequestForms,
  ITemplateFile
} from "types/models/loan/normal/storage/Forms";
import { formatPath, getQueryString, PREFIX_LOCAL } from "utils";
import { apiDelete, apiGet, apiPost } from "utils/api";
import {
  API_LOAN_NORMAL_FORMS_CATEGORY_PROFILE,
  API_LOAN_NORMAL_FORMS_DATA,
  API_LOAN_NORMAL_FORMS_DELETE_CREDIT_TERM,
  API_LOAN_NORMAL_FORMS_GET_CREDIT_TERM,
  API_LOAN_NORMAL_FORMS_POST_CREDIT_TERM,
  API_LOAN_NORMAL_FORMS_SAVE,
  API_LOAN_NORMAL_FORMS_SAVE_TO_DATABASE,
  API_LOAN_NORMAL_FORMS_TEMPLATE
} from "../../APIPaths";
export interface IQueryParamsFormData{
  los_uuid: string
  // id?: string;
  template_type?: string;
  fill_data_history_id?: number | null,
  template_uuid?: string,
  actived_flag?: boolean,
  approved_flag?: boolean 
}

export const fetchFormsData = (qr: IQueryParamsFormData) => {
  const query = qr.fill_data_history_id ? {
    template_type: qr.template_type,
    fill_data_history_id: qr.fill_data_history_id
  } : {
    template_type: qr.template_type,
  }
  const queryParams = getQueryString(query as unknown as Record<string, string | number | null | undefined>);
  return apiGet<IFormsData>(formatPath(API_LOAN_NORMAL_FORMS_DATA, qr.los_uuid , queryParams))
} 


export const saveFormtoDatabase = (qr: IQueryParamsFormData, fill_data_history_id: number | null) => {
  
  const los_uuid = qr.los_uuid;
  const query = { template_type : qr.template_type }
  const queryParams = getQueryString(query as unknown as Record<string, string | number | null | undefined>);
  
  const body = {
    template_uuid: qr.template_uuid,
    template_fill_data_history_id: fill_data_history_id,
    actived_flag: qr.actived_flag,
    approved_flag: qr.approved_flag,
  }

  return apiPost<any>(formatPath(API_LOAN_NORMAL_FORMS_SAVE_TO_DATABASE, los_uuid, queryParams), body);
}

export const getFormCategoryProfile = () => {
  return apiGet<ICategoryProfile[]>(API_LOAN_NORMAL_FORMS_CATEGORY_PROFILE);
}

export const postFormsData = (request: IPostRequestForms) => {
  const { los_uuid, data_fill, template_type } = request;
  return apiPost<any>(formatPath(API_LOAN_NORMAL_FORMS_SAVE, los_uuid, template_type), {data_fill});
}

export const getTemplate = (los_uuid: string) => {
  return apiGet<ITemplateFile>(formatPath(API_LOAN_NORMAL_FORMS_TEMPLATE,los_uuid));
}


export const fetchCreditTerm = (los_id: string) => {
  return apiGet<ICreditTerm>(formatPath(API_LOAN_NORMAL_FORMS_GET_CREDIT_TERM, los_id))
} 

export const postCreditTerm = (data: IConditions, role: string, los_id: string) => {

  const levelType = role === "idea_controller" ? "S1_CTRL" : "S1_APPR";
  
  const body = {
    ...data,
    pre_disbursement_conditions: data.pre_disbursement_conditions.map((con, index) => ({
      ...con,
      uuid: con.uuid.includes(PREFIX_LOCAL) ? null : con.uuid,
      display_order: index
    })),
    conditions_after_disbursement: data.conditions_after_disbursement.map((con, index) => ({
      ...con,
      uuid: con.uuid.includes(PREFIX_LOCAL) ? null : con.uuid,
      display_order: index
    })),
  }

  return apiPost<IConditions>(formatPath(API_LOAN_NORMAL_FORMS_POST_CREDIT_TERM, los_id, levelType), body);
}


export const deleteCreditTerm = (uuid: string, los_id: string) => {

  return apiDelete<IConditions>(formatPath(API_LOAN_NORMAL_FORMS_DELETE_CREDIT_TERM, los_id, uuid));
}