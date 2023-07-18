import { ILOANNormalStorageICR } from "types/models/loan/normal/storage/ICR";

export const icrState: ILOANNormalStorageICR = {
    data:{
      id: "XHTDNB",
      name: "XẾP HẠNG TÍN DỤNG NỘI BỘ",
      data:{
        business_employee:{
          score: 0,
          ranking: "",
          approval_date: "",
          description: "",
          uuid: null,
        },
        approval_level:{
          score: 0,
          ranking: "",
          approval_date: "", 
          description: "",
          uuid: null,
        },
        risk_management:{
          score: 0,
          ranking: "",
          approval_date: "",
          description: "",
          uuid: null,
        },
        info:{
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
        },
        document_info_list:[],
      },
      errors:[],
    },
    validate:{
      valid: false,
      bussines_core:"",
      bussines_rank:"",
      bussines_date:"",
      level_of_approval_core:"",
      level_of_approval_rank:"",
      level_of_approval_date:"",
      risk_management_core:"",
      risk_management_rank:"",
      risk_management_note: "",
      risk_management_date:"",
    }
    
  };