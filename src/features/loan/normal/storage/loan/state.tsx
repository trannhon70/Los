import { ILOANNormalStorageLOANState } from "types/models/loan/normal/storage/LOAN";
import { EmptyMetadataValue, EmptyTableA, EmptyTableB, EmptyTableD } from "./emptyData";

export const loanState: ILOANNormalStorageLOANState = {
  validate: {
    valid: true
  },
  product: {
    loanType: '',
    productPurpose: '',
    corePurpose: '',
    realPurpose: '',
  },
  needAndPlan: {
    currency: 'VND',
    need: null,
    ownCaptital: null,
    method: '',
    expiredCredit: null,
    expiredWithdraw: null,
    graceOrigin: null,
    interestRate: null,
    periodAdjust: '',
    marginAdjust: null,
    disbursementMethod: '',
    repayOriginMethod: '',
    repayinterestMethod: '',
    amountPaidEachPeriod: null,
    document_info_list:[],
    loanAmount: null,
    scb_percentage: null
  },
  legalBusiness: {
    name: '',
    type: 'TAX',
    num: '',
    issuedDate: null,
    placeOfIssued: '',
    numOfYear: null,
    code: '',
    career: '',
    area: null,
    ownership: '',
    remainLease: null,
    rentPrice: null,
    apartment: '',
    province: '',
    district: '',
    ward: '',
    stores: []
  },
  finance: {
    A: EmptyTableA(),
    B: EmptyTableB(),
    C: {
      suppliers:[
        // {
        //   ...generateEmptyInOutInfo(),
        //   primary: true
        // }
      ],
      supplyData: EmptyMetadataValue(),
      purchasingData: EmptyMetadataValue(),
      purchasingPartner: [
        // {
        //   ...generateEmptyInOutInfo(),
        //   primary: true
        // }
      ],
      note: '',
      suggest: ''
    },
    D: EmptyTableD(),
    E: {
      loan_appraised_analysis_info: 'N',
      loan_evaluate_info: "",
      loan_comment: ""
    }
  }
}