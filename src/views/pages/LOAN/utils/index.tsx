import { ETypeCollateral, ETypeCollateralChildRestAppa, ETypeCollateralChildRestLand, ETypeCollateralChildRestMark, ETypeLandName } from "features/loan/normal/storage/collateralV2/case";
import { ICode, IDefaultFlag, IIdCodeName, IValidate, IValue } from "types/base";
import {
  ICICIdentity,
  ICreditScoreInfo,
  ILOANNormalStorageCICCreditBasicCard,
  ILOANNormalStorageCICCreditBasicLOAN,
  ILOANNormalStorageIdentityData
} from "types/models/loan/normal/storage/CIC";
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import { ILOANNormalStorageLegalDeclareState, ILOANNormalStorageLegalInfo } from "types/models/loan/normal/storage/Legal";
import { generateLOCALUUID, generateUUID } from "utils";
import { timestampToDate } from "utils/date";

export const stageName = ['init', 'appraisal-approval', 'contract-management','reg-security-measures', 'disbursement'];

export const tabName = ['product', 'legal', 'cic', 'loan', 'income', 'collateral', 'other', 'internal-credit-rating', 'forms'];
export const tabNameCard = ['product-card', 'legal-card', 'cic-card', 'loan-card', 'income-card', 'collateral-card', 'other-card', 'internal-credit-rating-card', 'forms-card'];
export const tabAppraisalURL = ['cic-app', 'loan', 'income', 'collatera-app', 'other', 'icr', 'dedupe-blacklist', 'appraisal-add'];
export const tabContractURL = ['initialize-editor', 'drafting-contract', 'quality-evalution'];
export const tabDisbursementURL = ['initialize-disbursement','quality-evalution'];
export const draftContractURL = ['file-grp', 'legal-draft', 'detail', 'draft-info','sum-files'];
export const legalDraft = ['borrower', 'marriage', 'co-brw'];
export const detailsDraft = ['contract', 'register-form', 'receipt','commitment'];
export const contractDraft = ['real-estate', 'market', 'future-asset','addendum'];
export const registerDraft = ['real-estate', 'real-estate-edit', 'movables','movables-edit','movables-fix-problem'];
export const regSecurityMeasures = ['collateral-info', 'notarized-info', 'notarized-request-form','service-assess'];
export const createDisbursementStep = ['base-info', 'legal-info', 'collateral-info','disbursement-info','disbursement-condition-evaluate','report-doc'];
export const disbursementInfoURL= ['info','credit-relations','credit-ranking','business-performance','customer-grp-relate','condition-info']
export const TabUIName = [
  'Nhóm sản phẩm',
  'Thông tin pháp lý',
  'Thông tin CIC',
  'Thông tin khoản vay',
  'Nguồn thu nhập',
  'Tài sản đảm bảo',
  'Hồ sơ khác',
  'XHTDNB',
  'Biểu mẫu',
  // 'collateral-v3',
  //  'collateral-new'
  // 'Tài sản đảm bảo v3',
];

export const TabAppraisalName = [
  'Thông tin CIC',
  'Thông tin khoản vay',
  'Nguồn thu nhập',
  'Tài sản đảm bảo',
  'Hồ sơ khác',
  'XHTDNB',
  'Dedupe/Blacklist',
  'Thẩm định bổ sung'
];

export const DeclareMapURL = {
  borrower: 'borrower',
  marriage: 'marriage',
  coborrower: 'co-borrower',
  copayer: 'co-payer',
  legalRelated: 'legal-related',
  contact: 'contact',
  other: 'other'
}
export const DeclareMapURLCard = {
  cardHolder: 'card-holder',
  spouse: 'spouse',
  subCard: 'sub-card',
  contact: 'contact',
  refPerson: 'ref-person',
  other: 'other'
}

export const declareMapType = {
  borrower: 'BORROWER',
  marriage: 'MARRIAGE',
  coborrower: 'CO_BRW',
  copayer: 'CO_PAYER',
  legalRelated: 'LAW_RLT',
  contact: 'RELATED',
  other: 'OTHER',
}

export const declareMapSteptStoredToUrl = {
  BORROWER: "borrower",
  MARRIAGE: "marriage",
  CO_BRW: "co-borrower",
  CO_PAYER: "co-payer",
  LAW_RLT: "legal-related",
  RELATED: "contact",
  OTHER: "other"
}

export const declareMapTypeUrl = {
  borrower: 'BORROWER',
  marriage: 'MARRIAGE',
  co_borrower: 'CO_BRW',
  co_payer: 'CO_PAYER',
  legal_related: 'LAW_RLT',
  contact: 'RELATED',
  other: 'OTHER',
}

export const incomeSourceMapURL = {
  salary: 'salary',
  assetRent: 'asset-rent',
  company: 'company',
  business: 'business',
  stock: 'stock',
  deposit: 'deposit',
  pension: 'pension',
  other: 'other'
}

export const DeclareMapURLCIC = {
  borrower: 'borrower',
  marriage: 'marriage',
  coborrower: 'co-brw',
  copayer: 'co-payer',
  legalRelated: 'law-rlt',
  related: 'related',
  other: 'other'
}


export enum DeclareCIC {
  borrower = 'Người vay',
  marriage = 'Người hôn phối',
  'co-brw' = 'Người đồng vay',
  'co-payer' = 'Người đồng trả nợ',
  'law-rlt' = 'Người liên quan theo QDPL',
  other = 'Đối tượng khác'
}
export const DeclareFileDetailMapURL = {
  content: '',
  identity: 'identity',
  version:"version",
  history:'history'
}
export const urlToIncomeSource = (u: string) => {
  const pos = Object.values(incomeSourceMapURL).indexOf(u);
  if (!~pos) return '';
  return Object.keys(incomeSourceMapURL)[pos];
}

export const DeclareName = Object.values(DeclareMapURL);

export const DeclareNameCard = Object.values(DeclareMapURLCard);

//[ 'borrower', 'marriage', 'co-borrower', 'co-payer', 'legal-related', 'contact', 'other' ];
// config router
//// Khoi tao ho so
export const incomeMain = ['income', 'balance', 'ability-repay'];
export const incomeCard = ['income/salary', 'balance', 'ability-repay'];
export const cicRouter = ['card-holder', 'ref', 'other'];
export const legalEditorRouter = ['borrower', 'marriage', 'co-payer'];
export const draftingEditorRouter = ['loan', 'disbursement', 'collaterall', 'contact'];
// export const cicRouterNormal = ['borrower', 'marriage', 'co-borrower', 'co-payer', 'legal-related', 'other'];
export const cicRouterNormal = ['borrower', 'marriage', 'co-brw', 'co-payer', 'law-rlt', 'other'];
export const cicRouterNormal2 = ['borrower', 'marriage', 'co-borrower', 'co-payer',];
export const cicOrganRouter = ['other', 'rating-review'];
export const initEditorOrganRouter = ['legal', 'drafting', 'profile'];
// Tham dinh phe duyet
export const CICNormalAA = ['main', 'additional', 'total-ranking-grade']
export const DedupeBlacklistUrl = ['dedupe', 'blacklist']
export const AppraisalNormalAA = ['report', 'notice', 'form']
export const declareCICName = [
  'Chủ thẻ chính',
  'Người hôn phối',
  'Người đồng vay',
  'Người đồng trả nợ',
  'Người liên quan theo quy định của pháp luật',
  'Đối tượng khác']
export const declareCICURL = ['borrower', 'marriage', 'co-borrower', 'co-payer'];
export const declareCICTabBURL = ['legal-related', 'other'];
export const incomeSource = [
  'salary',
  'asset-rent',
  'business',
  'company',
  'stock',
  'deposit',
  'pension',
  'other'
];

export const urlToDeclare = (u: string) => {
  const pos = Object.values(DeclareMapURL).indexOf(u);
  if (!~pos) return '';
  return Object.keys(DeclareMapURL)[pos];
}

export const urlToDeclareLegal = (u: string) => {
  const pos = Object.values(declareMapType).indexOf(u);
  if (!~pos) return '';
  return Object.keys(declareMapType)[pos];
}

export const pathUrlToDeclareLegalStored = (u: string) => {
  const pos = Object.keys(declareMapTypeUrl).indexOf(u);
  if (!~pos) return '';
  return Object.values(declareMapTypeUrl)[pos];
}

export const pathNameLegalStoredToUrl = (u: string) => {
  const pos = Object.keys(declareMapSteptStoredToUrl).indexOf(u);
  if (!~pos) return '';
  return Object.values(declareMapSteptStoredToUrl)[pos];
}

export const urlToDeclareCIC = (u: string) => {
  const pos = Object.values(DeclareMapURLCIC).indexOf(u);
  if (!~pos) return '';
  return Object.keys(DeclareMapURLCIC)[pos];
}

export const stepsLOAN = ['product', 'need-and-plan', 'business/household-legal', 'business/finance-analysis'];
export const stepsLOANCard = ['product', 'limit', 'plans/release-new/card-holder', 'plans/release-new/sub-card', 'plans/update-credit-limit'];

export const stepsLOANAppraisalApproval = ['product', 'need-and-plan', 'pro-and-bus', 'loan-method'];

export enum AddressType {
  PERMANENT = 'PERMANENT',
  TEMP = 'TEMP'
}

export enum IdentityType {
  CIF_ID = 'CIF_ID_TYPE',
  PASSPORT = 'PASSPORT'
}
export const generateLabel =(id:string)=>{
  switch(id){
    case 'TAX':
      return 'Mã số thuế'
    case 'REGI':
      return 'Giấy CN DKKD'
    case 'CERT':
      return 'Giấy xác nhận CQDT'
    default :
      return 'Mã số thuế'
  }
}

export const generateEmptyIndenty = () => {
  return {
    isModified: true,
    type: '',
    num: '',
    issuedDate: 0,
    expiredDate: 0,
    placeOfIssue: '',
    primaryFlag: false,
    uuid: "",
    uuidRemote: ''
  }
}

export const generateEmptyAddress = () => {
  return {
    type: '',
    apartment: '',
    province: '',
    district: '',
    ward: '',
    primaryFlag: false,
    uuid: "",
    uuidRemote: ''
  }
}

export const generateEmptyDeclare = () => {
  return {
    uuidActiveLocal: generateUUID(),
    basic: {
      person_uuuid: "",
      fullname: '',
      customerType: '',
      birthday: null,
      placeOfBirth: "Việt Nam",
      gender: '',
      national: 'VN',
      marriageStatus: '',
      ownerProperty: '',
      under18: null,
      over18: null,
      mobile: '',
      telephone: '',
      email: '',
      education: '',
      ecomonic: '',
      relationship: '',
      tax: '',
      cif: '',
    },
    other: {
      fatca: '',
      career: '',
      income3Month: '',
      note: ''
    },
    identity: [],
    address: {
      resident: 'R',
      location: '',
      address: []
    }
  }
}

export const generateEmptyCoBorrowDeclare = () => {
  return ({
    co_borrowers: [
      { generateEmtyCoRelationPersonDeclare }
    ]
  });
}
export const generateEmptyCoPayersDeclare = () => {
  return ({
    co_payers: [
      { generateEmtyCoRelationPersonDeclare }
    ]
  });
}

export const generateEmtyCoRelationPersonDeclare = () => {
  return (
    {
      basic_info: {
        uuid: '',
        uuidRemote: '',
        id: '',
        avatar: '',
        full_name: '',
        date_of_birth: '1628678276',
        gender_info: {
          'id': 'SEX',
          'code': 'F',
          'name': 'NỮ'
        },
        country_info: {
          country_code: 'VN',
          country_name: 'VIET NAM'
        },
        telephone_num: '0867589627',
        mobile_num: '0867589628',
        email: 'anhdao@gmail.com',
        customer_family_relationship_info: {
          id: '',
          code: 'SBILING',
          name: '',
          is_default: 'N'
        }
      },
      identity_info: [
        {
          id: '',
          identity_type: {
            id: 'CIF_ID_TYPE',
            code: 'CIF_ID_TYPE',
            name: 'BUSINESS LICENCE'
          },
          identity_num: '079190254799',
          issued_date: 867517200,
          expired_date: 867517201,
          place_of_issue: 'Công An TP. Hồ Chí Minh',
          primary_flag: true
        }
      ],
      address_info: [
        {
          id: '',
          address_type: {
            id: 'ADDRESS_TYPE',
            code: 'PERMANENT',
            name: 'Thường trú'
          },
          address: '123 HCM',
          province_info: {
            province_code: '02',
            province_name: 'T HÀ GIANG'
          },
          district_info: {
            district_code: '034',
            district_name: 'H BẮC QUANG'
          },
          ward_info: {
            ward_code: '01189',
            ward_name: 'XÃ QUANG MINH'
          },
          primary_flag: false
        }
      ],
      total_document_file: 0,
      document_info_list: [
        {
          document_id: '1',
          document_name: '',
          child_files: [
            {
              file_id: 0,
              uuid: 'cd19bb740afb45f990cbaab6f4d5be62',
              type: '',
              display_order: 0,
              description: '',
              content_type: '',
              create_by: '',
              create_at: 867589623
            }
          ]
        }
      ]
    }
  )
}

export const checkEmptyDeclare = (data: ILOANNormalStorageLegalDeclareState) => {
  return (
    data.basic.fullname === ''
    && data.basic.customerType === ''
    && data.basic.birthday === null
    && data.basic.gender === ''
    && (data.basic.national === '' || data.basic.national === 'VN')
    && data.basic.marriageStatus === ''
    && data.basic.ownerProperty === ''
    && data.basic.under18 === 0
    && data.basic.over18 === 0
    && data.basic.mobile === ''
    && data.basic.telephone === ''
    && data.basic.email === ''
    && data.basic.education === ''
    && data.basic.ecomonic === ''
    && data.basic.relationship === ''
    && data.basic.tax === ''
    && data.basic.cif === ''
    && data.other.fatca === ''
    && data.other.career === ''
    && data.other.income3Month === ''
    && !data.identity.length
    && data.address.resident === 'R'
    && data.address.location === ''
    && (!data.address.address.length || !data.address.address.filter(a => !(
      a.apartment === ''
      && a.province === ''
      && a.district === ''
      && a.ward === ''
    )).length)
  );
}

export const generateLOANNormalCICCreditGroup = () => ({
  identity_num: '',
  identity_type: '',
  uuidRemote: '',
  uuid: '',
  debtGroup: '',
  activeCredit: '',
  credit: [],
  totalLoan: null,
  totalCollateral: null,
  credit_score_info: {
    risk_info: {
      score_value: '',
      score_rank: '',
      publish_date: null,
      evaluation: '',
      customer_segment: []
    }
  }
});

export const generateLOANNormalCICCredit = () => ({
  uuid: generateLOCALUUID(),
  uuidRemote: '',
  code: '',
  detail: {
    loan: {
      date: null,
      active: '',
      list: []
    },
    card: {
      date: null,
      active: '',
      list: []
    },
    collateral: {
      date: null,
      active: '',
      list: []
    }
  }
});

export const generateLOANNormalCICCreditSCB = () => ({
  uuid: generateLOCALUUID(),
  uuidRemote: '',
  code: '79334001',
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
        },
        {
          code: 'MEDIUM',
          amount: null,
          expired: null,
          balance: null,
        },
        {
          code: 'LONG',
          amount: null,
          expired: null,
          balance: null,
        },
        {
          code: 'OTHER',
          amount: null,
          expired: null,
          balance: null,
        }

      ],
      last_update:null,
      total_amount:null,
    },
    card: {
      date: null,
      active: '',
      list: [],
      last_update: null,
      total_amount: null,
    },
    collateral: {
      date: null,
      active: '',
      list: [],
      last_update: null,
      total_amount: null,
    }
  }
});

export const getEmptyLOANNormalCICLOAN = () => ({
  expired: null,
  amount: null,
  balance: null,
  code: '',
  amountCIC: null,
  balanceCIC: null, 
  note: null   
});

export const getEmptyLOANNormalCICCard = () => ({
  uuid: generateLOCALUUID(),
  uuidRemote: '',
  limited: null,
  balance: null,
  limitedCIC: null,
  balanceCIC: null,
  note: null   
});

export const getEmptyLOANNormalCICCollateral = () => ({
  code: '',
  uuid: generateLOCALUUID(),
  value: null
});

export const checkEmptyCICCredit = (data: ILOANNormalStorageIdentityData) => {
  return (
    !data.code
    || (
      !data.detail.card.list.length
      && !data.detail.loan.list.length
      && !data.detail.collateral.list.length
    )
    || (
      checkEmptyCICCreditLOANList(data.detail.loan.list)
      && checkEmptyCICCreditCardList(data.detail.card.list)
      && checkEmptyCICCreditCollateralList(data.detail.collateral.list)
    )
  )
}

export const checkEmptyCICCreditCIC = (data: ILOANNormalStorageIdentityData) => {
  return (
    // !data.code
    (
      !data.detail.card.list.length
      && !data.detail.loan.list.length
      && !data.detail.collateral.list.length
    )
    || (
      checkEmptyCICCreditLOANList(data.detail.loan.list)
      && checkEmptyCICCreditCardList(data.detail.card.list)
      && checkEmptyCICCreditCollateralList(data.detail.collateral.list)
    )
  )
}

export const checkEmptyCICCreditScoreValue = (data: ICreditScoreInfo) => {
  return (
    !data.risk_info.score_value || !data.risk_info.score_rank || !data.risk_info.publish_date || !data.risk_info.evaluation
  )
}

export const checkEmptyCICCreditLOAN = (data: ILOANNormalStorageCICCreditBasicLOAN) => {
  return data.amount === null
    && data.balance === null
    && data.expired === null;
}

export const checkEmptyCICCreditLOANList = (data: ILOANNormalStorageCICCreditBasicLOAN[]) => {
  return !data.find(l => !checkEmptyCICCreditLOAN(l));
}

export const checkEmptyCICIdentityList = (data: ICICIdentity[]) => {
  return !data.find(l => !checkEmptyCICIdentity(l));
}

export const checkEmptyCICIdentity = (data: ICICIdentity) => {
  return data === null;
}

export const checkEmptyCICCreditCard = (data: ILOANNormalStorageCICCreditBasicCard) => {
  return data.balance === null && data.limited === null;
}

export const checkEmptyCICCreditCardList = (data: ILOANNormalStorageCICCreditBasicCard[]) => {
  return !data.find(c => !checkEmptyCICCreditCard(c));
}

export const checkEmptyCICCreditCollateral = (data: ICode & IValue<number | null> & { uuid: string; }) => {
  return data.code === '' && data.value === null;
}

export const checkEmptyCICCreditCollateralList = (data: (ICode & IValue<number | null> & { uuid: string; })[]) => {
  return !data.find(c => !checkEmptyCICCreditCollateral(c));
}

// export const checkEmptyCICCredit = (data: ILOANNormalStorageCICCredit) => {
//   return (
//     !data.basic.code
//     || (
//       !data.detail.card.list.length
//       && !data.detail.loan.list.length
//       && !data.detail.collateral.list.length
//     )
//     || (
//       checkEmptyCICCreditLOANList(data.detail.loan.list)
//       && checkEmptyCICCreditCardList(data.detail.card.list)
//       && checkEmptyCICCreditCollateralList(data.detail.collateral.list)
//     )
//   )
// }

// export const checkEmptyCICIdentityData = (data: ILOANNormalStorageCIC) => {
//   if (!data.identity || !data.credit.length) return true;
//   return !data.credit.find(c => !checkEmptyCICCredit(c));
// }

type TIdCodeName = IIdCodeName & IDefaultFlag;

export const removeFlag = (obj: TIdCodeName | null | undefined): IIdCodeName | null => {
  if (obj === undefined || obj === null) return null;
  const { is_default, ...remain } = obj;
  return { ...remain };
}

export const findCode = (arr: TIdCodeName[], code: string) => arr?.find(a => a.code === code);

export const generateEmptyWarehouse = () => ({
  area: null,
  apartment: '',
  province: '',
  district: '',
  ward: '',
  primary: false,
  uuid: generateUUID(),
})
export const generateEmptyWarehouseApproval = () => ({
  area: null,
  address: '',
  province: null,
  district: null,
  ward: null,
  uuid: generateUUID(),
  primary_flag: false,
})
export const generateEmptyInOutInfo = () => ({
  info: '',
  payment: 'FAST',
  method: 'TRANS',
  primary: false,
  uuid: generateUUID()
});

export const generateEmptyLoanInOutInfo = () => ({
  info: '',
  payment: 'FAST',
  method: 'TRANS',
  primary: false,
  uuid:""
});

export const findAllLocationCodeFromLegalData = (data: ILOANNormalStorageLegalInfo) => {
  const rs = {
    country: [] as string[],
    province: [] as string[],
    district: [] as string[],
    ward: [] as string[],
  }

  // data.data.forEach(d => {
  //   rs.country.push(d.basic_info.country_info?.country_code);
  //   d.address_info.data.forEach(a => {
  //     rs.province.push(a.province_info.province_code);
  //     rs.district.push(a.district_info.district_code);
  //     rs.ward.push(a.ward_info.ward_code);
  //   })
  // })

  return {
    country: rs.country.filter((c, i, s) => s.indexOf(c) === i),
    province: rs.province.filter((c, i, s) => s.indexOf(c) === i),
    district: rs.district.filter((c, i, s) => s.indexOf(c) === i),
    ward: rs.ward.filter((c, i, s) => s.indexOf(c) === i),
  };
}

export const generateEmtyCollateral = () => ({
  collateral_type: {
    collateral_type: "REST",
    collateral_type_desc: "Bất động sản"
  },
  items: []
})

export const generateEmtyCollateralItems = () => ({
  item_order: 0,
  item_name: "",
  code: "",
  basic_info: {
    address: "",
    certificate_number: "",
    province_info: "",
    district_info: "",
    ward_info: "",
    collateral_status: "",
    collateral_sub_type: ""
  },
  details_info: {
    description: "",
    market_name: "",
    block: "",
    floor: "",
    brand_name: "",
    start_date: null,
    end_date: null,
    used_rest: null,
    area: null,
    price: null,
    loan_rate: null,
    collateral_land: {
      address: "",
      province_code: "",
      district_code: "",
      ward_code: "",
      land_number: "",
      map_number: "",
      area: null,
      real_area: null,
      expiry_date: null,
      land_source: "",
      price: null,
    },
    collateral_land_asset: {
      address: "",
      province_code: "",
      district_code: "",
      ward_code: "",
      building_area: null,
      certificate_area: null,
      real_area: null,
      expiry_date: null,
      owner_type: "",
      price: null,
    }
  },
  used_other_contract_flag: false,
  owner_wrapper: {
    code: "",
    name: "",
    owner_item: []
  }
})

export const generateCollateralLand = () => ({
  address: "",
  province_info: "",
  district_info: "",
  ward_info: "",
  land_number: "",
  map_number: "",
  area: null,
  real_area: null,
  expiry_date: null,
  land_source: "",
  price: ""
})

export const generateCollateralLandAsset = () => ({
  address: "",
  province_info: "",
  district_info: "",
  ward_info: "",
  building_area: null,
  certificate_area: null,
  real_area: null,
  expiry_date: null,
  owner_type: "",
  price: null,
})

export const generateEmty = () => (
  {
    id: "REST",
    name: "Bất động sản",
    quantity: 0
  }
)


/// income
export const generateEmtyIncomeSource = () => (
  {
    uuid: generateUUID(),
    income_type: {
      id: "",
      name: ""
    },
    salaries: [],
  }
)

export const generateEmptyIncomeSalaryDeclare = () => ({
  uuidDeclare: generateUUID(),
  salary: [],
  assetRent: [],
  business: [],
  company: [],
  stock: [],
  deposit: [],
  pension: [],
  other: [],
})


export const generaterNameCollateral = (type: string) => {
  switch (type) {
    case ETypeCollateral.REST:
      return "Bất động sản";
    case ETypeCollateral.MEST:
      return "Phương tiện vận tải";
    case ETypeCollateral.DEVI:
      return "Máy móc thiết bị";
    case ETypeCollateral.GODS:
      return "Vật tư hàng hóa";
    case ETypeCollateral.RPRO:
      return "Quyền tài sản";
    case ETypeCollateral.STOC:
      return "Chứng khoán";
    case ETypeCollateral.BALC:
      return "Số dư tiền gửi";
    default:
      return "Tài sản khác"
  }
}

export const TypeCollateralChildRestLand: String[] = [
  ETypeCollateralChildRestLand.LANS,
  ETypeCollateralChildRestLand.BRIN,
  ETypeCollateralChildRestLand.HIRI,
  ETypeCollateralChildRestLand.INDU,
  ETypeCollateralChildRestLand.OTHL,
  ETypeCollateralChildRestLand.PROJ,
  ETypeCollateralChildRestLand.REIN
]

export const TypeCollateralChildRestAppa: String[] = [
  ETypeCollateralChildRestAppa.FURO,
  ETypeCollateralChildRestAppa.NARO,
  ETypeCollateralChildRestAppa.URRO
]

export const TTypeCollateralChildRestMark: String[] = [
  ETypeCollateralChildRestMark.MRMA
]

export const generaterNameSubTypeCollateral = (subtype: string) => {
  switch (subtype) {
    case ETypeLandName.LAND:
      return "QSH là đất và/hoặc nhà riêng lẻ";
    case "APPA":
      return "Quyền sở hữu căn hộ chung cư";
    case "MARK":
      return "Sạp chợ/Ô trung tâm thương mại";
    case "TRVE":
      return "Phương tiện vận tải";
    case "SPVE":
      return "Xe máy chuyên dụng";
    case "NRVE":
      return "PTVT không phải đường bộ";
    case "DEVI":
      return "MMTB/Dây chuyền sản xuất";
    case "GODS":
      return "Vật tư hoàng hóa";
    case "RPRO":
      return "Quyền tài sản";
    case "STOC":
      return "Chứng khoán";
    case "BALC":
      return "Số dư tiền gửi";
    case "OTHE":
      return "Tài sản khác";
    default : 
      return "-"
  }
}

//// LegalCard
export const generateEmptyDeclareCardHolder = () => {
  return {
    uuidRemote: '',
    uuid: generateUUID(),
    declare: [],
    basic_info: {
      uuid: "",
      avatar: "",
      full_name: "",
      date_of_birth: null,
      place_of_birth: "",
      customer_type_info: "",
      gender_info: "",
      country_info: '',
      marital_status_info: "",
      current_house_owner_status_info: "",
      dependent_person_over_18: 0,
      dependent_person_under_18: 0,
      telephone_num: "",
      mobile_num: "",
      email: "",
      educational_status_info: "",
      economic_profession_info: "",
    },
    other_info: {
      average_income_3m_amount: '',
      authentication_question_info: []
    },
    identity_info: [],
    address_info: [],
  }
}

export const generateEmptyDeclareMarriage = () => {
  return {
    uuidRemote: '',
    uuid: generateUUID(),
    sup_card_info: '',
    basic_info: {
      uuid: "",
      avatar: "",
      full_name: "",
      date_of_birth: null,
      place_of_birth: "",
      gender_info: "",
      country_info: '',
      telephone_num: "",
      mobile_num: "",
      email: "",
    },
    identity_info: [],
    address_info: [],
  }
}

export const generateEmptyReference = () => {
  return {
    uuidRemote: '',
    uuid: generateUUID(),
    basic_info: {
      uuid: '',
      avatar: '',
      full_name: '',
      cif_info: '',
    },
    identity_info: [],
  }
}

export const generateEmptyDeclareCommon = () => {
  return {
    info: []
  }
}

// Related
export const generateEmptyDeclareRelated = () => {
  return {
    uuidRemote: '',
    uuid: generateUUID(),
    basic_info: {
      uuid: "",
      avatar: '',
      full_name: '',
      gender_info: '',
      mobile_num: '',
      email: '',
      customer_family_relationship_info: '',
    },
    address_info: {
      id: '',
      uuid: '',
      address_type: '',
      address: '',
      province_info: '',
      district_info: '',
      ward_info: '',
      primary_flag: false,
    }
  }
}
export const _calculateAge = (date: string) => { // birthday is a
  var dob = new Date(date);
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();


  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date
  var year = age_dt.getFullYear();

  //now calculate the age of the user
  return  Math.abs(year - 1970);
}
export const getValidate = (message = '', params = {}): IValidate => {
  return { message, params };
};
// export const AgeCalculateDeviant = (dateString: string,deviant: number = 30  ) =>{
//   var today = new Date();

//   var birthDate = new Date(dateString);

//   var age = today.getFullYear() - birthDate.getFullYear();

//   var birthdayMonth  = birthDate.getMonth()

//   var todayMonth = today.getMonth()

//   var m = todayMonth - birthdayMonth;

//   var lastDateOfMonth = deviant > 0 
//   ?  new Date(today.getFullYear(), todayMonth +  2, 0).getDate() - deviant 
//     : today.getDate();
//   // if (m < -1 && ( today.getDate() < birthDate.getDate())) {
//   //   age--;
//   // }

//   if((birthDate.getDate() > lastDateOfMonth && m === -1) || m <- 1){
//     age--;
//   }

//   return age;
// }
// tính tuổi với chênh lệch ngày cho phép

export const AgeCalculate = (dateString: string, deviant: number = 0) =>{
  var today = new Date();
  
  var birthDate = new Date(dateString);

  var birthDateWithDeviant = subtractDays(deviant,birthDate)

  var age = today.getFullYear() - birthDate.getFullYear();

  var m = today.getMonth() - birthDateWithDeviant.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDateWithDeviant.getDate())) {
    age--
  }
  return age;
}
// validate age legal
export const getValidateAge = (value: number, declare: string, position?:string, deviant: number = 0) =>{
  const Age =  AgeCalculate(timestampToDate(value / 1000,'MM/DD/YYYY'),deviant) ?? 0
  let validate = {
    declare: declare,
    field: "birthday",
    position: position,
    role: "",
    valid: true
  }

  if(Age < 18 || Age > 75){
    validate = {...validate,valid: false,role:'birthday'}
  }
  return validate
}
export function cleanData(data: any, deleteKeys: string[]) {
  // There is nothing to be done if `data` is not an object,
  // but for example "user01" or "MALE".
  if (typeof data != "object") return;
  if (!data) return; // null object
  
  for (const key in data) {
    if (deleteKeys.includes(key)) {
      delete data[key];
    } else {
      // If the key is not deleted from the current `data` object,
      // the value should be check for black-listed keys.
      cleanData(data[key], deleteKeys);
    }
  }
  return data
}
export const mappingToCheckChangedJSON = (data: ILOANNormalCollateralData[]):ILOANNormalCollateralData[] =>{
  return data.map((item,itemIndex)=>({
    ...item,
    uuidActiveData:"",
    uuidActiveSubtype:"",
    is_collapse_type: true,
    sub_type: item.sub_type.map((sub,subIndex)=>({
      ...sub,
      is_collapse_sub_type: true,
      uuidItemsActive: "",
      uuidActiveSubtype: "",
      items: item.sub_type[subIndex].items.map((subItem,subItemIndex)=>({
        ...subItem,
        activeUUID: "",
        departmentActiveUUID: "",
        maketActiveUuid: "",
        departmentInfoActiveUUID: "",
        activeUUIDCertificateUsePurposes: "",
        type_land:"",
        ctxd_gcn_qsh:{
          ...subItem.ctxd_gcn_qsh,
          activeUuIdCtxdGcnQsh: "",
          ctxd_gcn_qsh_data: subItem.ctxd_gcn_qsh.ctxd_gcn_qsh_data.map((ctxdGcnData,ctxdGcnDataIndex)=>({
            ...ctxdGcnData,
            uuIdCtxdGcnQsh:'',
            certificate_legal_info:{
              ...ctxdGcnData.certificate_legal_info,
              activeUUIDCertificate: ''
            },
            ctxd_gcn_qsh_land_info:{
              ...ctxdGcnData.ctxd_gcn_qsh_land_info,
              activeCTXDLand:"",
              dataCTXDLand:{
                ...ctxdGcnData.ctxd_gcn_qsh_land_info.dataCTXDLand,
                activeUUIDtypeCTXD:""
              }
            }
          }))
        },
        ctxd_land:{
          ...subItem.ctxd_land,
          activeCTXDLand:"",
          dataCTXDLand: subItem.ctxd_land.dataCTXDLand.map((dataCTXD,dataCtxdIndex)=>({
            ...dataCTXD,
            activeUUIDtypeCTXD:""
          }))
        },
        land:{
          ...subItem.land,
          certificate_legal_info:{
            ...subItem.land.certificate_legal_info,
            activeUUIDCertificate:""
          },
          land_legal_infomation_asset:{
            ...subItem.land.land_legal_infomation_asset,
            activeUUIDCertificateUsePurposes:""
          }
        }
      }))
    }))
  }))

}
export const subtractDays = (numOfDays: number, date = new Date()) => {
  date.setDate(1 + numOfDays);
  return date;
}
export const DeclareNameDetailFile = Object.values(DeclareFileDetailMapURL);