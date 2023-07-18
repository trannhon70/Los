import { CustomKeyType, ICICDeclareDataAPI, ICreditScoreInfoAPI } from "types/models/loan/normal/storage/CIC";
import { ILOANNormalStorageLegalIdentityData } from "types/models/loan/normal/storage/Legal";
import { generateLOCALUUID, generateUUID } from "utils";

export const generateLOANNormalCICCredit = (uuid?:string) => ({
  uuid: uuid ?? generateLOCALUUID(),
  uuidRemote: '',
  code: '',
  id: null,
  detail: {
    loan: {
      date: null,
      active: 'SHORT',
      list: [
        {
          code: 'SHORT',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   

        },
        {
          code: 'MEDIUM',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        },
        {
          code: 'LONG',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        },
        {
          code: 'NOT_DISBURSED',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        },
        {
          code: 'OTHER',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        }

      ],
      last_update:null,
      total_amount:null,
    },
    card: {
      date: null,
      active: '',
      list: [],
      last_update:null,
      total_amount:null,
    },
    collateral: {
      date: null,
      active: '',
      list: [],
      last_update:null,
      total_amount:null,
    }
  }
});
export const generateLOANNormalCICSCBCredit = (uuid?:string) => ({
  uuid: uuid ?? generateLOCALUUID(),
  uuidRemote: '',
  code: '79334001',
  id: 106,
  detail: {
    loan: {
      date: null,
      active: 'SHORT',
      list: [
        {
          code: 'SHORT',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        },
        {
          code: 'MEDIUM',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        },
        {
          code: 'LONG',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        },
        {
          code: 'NOT_DISBURSED',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        },
        {
          code: 'OTHER',
          amount: null,
          expired: null,
          balance: null,
          uuid: null,
          amountCIC: null,
          balanceCIC: null,
          note: null   
        }

      ],
      last_update:null,
      total_amount:null,
    },
    card: {
      date: null,
      active: '',
      list: [],
      last_update:null,
      total_amount:null,
    },
    collateral: {
      date: null,
      active: '',
      list: [],
      last_update:null,
      total_amount:null,
    }
  }
});
export const generateLoanNormalCICIdentity = () =>({
  identity_type:"",
  identity_num:"",
  activeIdentity:"",
  cic_identity_debt_group:"",
  activeCreditInstitution:"",
  cic_identity_credit_institution_info:[]
})

export const generateLoanNormalCICCreditInstitution = () =>({
  activeCreditInstitution:"",
  credit_institution_id: "",
  credit_institution_code: "",
  credit_institution_short_name: "",
  credit_institution_name: "",
  credit_institution_avatar: "",
})

export const generateLOANNormalCICUserGroup = (identity: string, name: string, uuidPerson: string, type: string, idUUID: string) => ({
  identityActive: identity,
  person_uuid: uuidPerson ?? '',
  full_name: name ?? '',
  document_info_list: [],
  data: [
    {
      identity_num: identity,
      identity_type: type??'',
      uuidRemote: '',
      uuid: idUUID,
      debtGroup: '',
      activeCredit: '',
      credit: [],
      totalLoan: null,
      totalCollateral: null,
      credit_score_info: {
        risk_info: {
          score_value: null,
          score_rank: '',
          publish_date: null,
          evaluation: null,
          customer_segment: []
        }
      }
    }
  ]
})
export const generateLOANNormalCICPerson = (uuid: string, fullName: string, identities: ILOANNormalStorageLegalIdentityData[]) => ({
  identityActive: identities[0]?.uuid ?? "",
  person_uuid: uuid ?? '',
  full_name: fullName ?? '',
  document_info_list: [],
  data: identities?.map(iden => ({
    hasCredit: false,
    identity_num: iden.identity_num,
    identity_type: iden.identity_type.id,
    uuidRemote: '',
    uuid: iden.uuid,
    debtGroup: '',
    activeCredit: '',
    credit: [],
    totalLoan: null,
    totalCollateral: null,
    is_primary: iden.primary_flag,
    credit_score_info: {
      risk_info: {
        score_value: null,
        score_rank: '',
        publish_date: null,
        evaluation: null,
        customer_segment: []
      }
    }
  }))
})

export const generateLOANNormalCICIdentity = (identity: string, type: string, idUUID: string, is_primary: boolean) => ({
  hasCredit: false,
  identity_num: identity,
  identity_type: type,
  uuidRemote: '',
  uuid: idUUID,
  debtGroup: '',
  activeCredit: '',
  credit: [],
  totalLoan: null,
  totalCollateral: null,
  is_primary: is_primary,
  credit_score_info: {
    risk_info: {
      score_value: null,
      score_rank: '',
      publish_date: null,
      evaluation: null,
      customer_segment: []
    }
  }
})

export const generateEmptyDocumentGroup = (customKey: CustomKeyType) => {
  return {
    uuid: generateLOCALUUID(),
    display_order: 0,
    document_type_id: 0,
    document_type_code: '',
    document_type_name: '',
    document_list: [],
    isLocal:true,
    customKey: {
      credit: customKey.credit,
      identity: customKey.identity,
      identity_type:customKey.identity_type,
    }
  }
}

export const generateEmptyDocumentType = () => {
  return {
    uuid: generateLOCALUUID(),
    document_id: 0,
    document_name: '',
    document_code: '',
    display_order: 0,
    document_child_files: [],
    document_child_list: [],
    isLocal:true,
  }
}

export const generateEmptyDocumentChildFile = (indexGroup: number|string, indexType: number|string) => {
  return {
    file_id: 0,
    uuid: generateLOCALUUID(),
    name: '',
    display_order: 0,
    description: '',
    content_type: '',
    created_by: "",
    created_by_name: "",
    updated_by: "",
    updated_by_name: "",
    created_at: null,
    updated_at: null,
    file_upload: '',
    isLocal:true,
  }
}

export const generateEmptyCreditScoreInfoApi = () => ({
  risk_info: {
    score_value: null,
    score_rank: '',
    publish_date: null,
    evaluation: null,
    customer_segment: [],
  }
})

export const generateEmptyCreditScoreInfoLocal = () => ({
  risk_info: {
    score_value: null,
    score_rank: '',
    publish_date: null,
    evaluation: null,
    customer_segment: [],
  }
})

export const generateLoanNormalCICPersonAPI = (person: ICICDeclareDataAPI) =>({
  full_name: person.full_name,
  person_uuid: person.person_uuid,
  document_info_list: [],
  cic_identity_info: person.cic_identity_info.map(iden => generateLoanNormalCICIdentityAPI(iden.identity_num, iden.identity_type, iden.uuid, iden.credit_score_info))
})

export const generateLoanNormalCICIdentityAPI = (identityNum: string, identityType: string, uuid: string, scoreInfo: ICreditScoreInfoAPI) =>({
  cic_institution_flag: false,
  identity_type: identityType,
  identity_num: identityNum,
  uuid: uuid,
  cic_identity_debt_group:{
    id: "",
    code: "",
    name: ""
  },
  cic_identity_total_loan_amount: {
    id: null,
    value: 0,
  },
  cic_identity_total_collateral_amount: {
    id: null,
    value: 0,
  },
  cic_identity_credit_institution_info:[],
  credit_score_info: {...scoreInfo}
})