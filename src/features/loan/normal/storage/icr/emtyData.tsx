import { generateLOCALUUID } from "utils"

export const generateEmtyICR = () => {
  return {
    score: 0,
    ranking: "",
    approval_date: "",
    description: "",
    uuid: "",
  }
}
export const generateEmptyICRInfo = () =>{
  return {
    year_of_birth: '',
    education: '',
    num_people_depend: 0,
    marriage_status: '',
    owner_property: '',
    address_current: '',
    position: '',
    card_scb_use: '',
    receive_salary: '',
    qhtd_scb_other_bank: '',
    reputation: '',
    after_tax_income: 0,
    spending: 0,
  }
}

export const EmptyFileICR = () => ({
  uuid: generateLOCALUUID(),
  content_type: null,
  created_at: null,
  created_by: "",
  created_by_name: "",
  updated_by: "",
  updated_by_name: "",
  file_upload: null,
  name: null,
  size: null,
  type: null,
  updated_at: null,
  version: null,
  description: null,
})