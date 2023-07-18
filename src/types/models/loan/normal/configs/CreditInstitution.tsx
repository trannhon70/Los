export interface ICreditInstitution{
  credit_institution_id: string;
  credit_institution_code: string;
  credit_institution_name: string;
  credit_institution_short_name: string;
}

export interface ICreditInstitutionState{
  fetched: boolean;
  fetching: boolean;
  data: ICreditInstitution[];
}