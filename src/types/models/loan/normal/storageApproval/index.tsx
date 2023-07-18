import { IAdditionalDataAPI, ILoanNormalApprovalAdditionalAppraisal } from "./AdditionalAppraisal";
import { ICICDataAPI, ILOANNormalApprovalStorageCICState } from "./CIC";
import { ILOANNormalApprovalCollateralV2State, ILoanNormalApproveCollateral } from "./Collateral";
import { IDedupeBlacklist } from "./DedupeBlackList";
import { IInternalCreditRating } from "./InternalCreditRating";
import { IApprovalLOANState, IloanInfoForm } from "./LoanInfoForm";
import { ILOANNormalApprovalAPIOther, ILOANNormalApprovalStorageOther } from "./OtherProFile";
import { ILOANNormalStorageIncomeState, ISourceIncomeForm } from "./SourceIncomeForm";

// import { IOtherProfile } from "./Other";
export interface ILOANApprovalStorageState{
    full:ILOANApprovalFullState,
    income: ILOANNormalStorageIncomeState;
    icr: IInternalCreditRating
    cic: ILOANNormalApprovalStorageCICState
    loan: IApprovalLOANState
    collateral:ILOANNormalApprovalCollateralV2State
    additional: ILoanNormalApprovalAdditionalAppraisal
    other: ILOANNormalApprovalStorageOther
}
export interface ILOANApprovalFullState{
    fetched: boolean;
    fetching: boolean;
    starting: boolean;
    data: ILOANApprovalData | null;
}
export interface ILOANApprovalData{
    form: ILOANApprovalForm;
    modified_at: number | null;
    modified_by: string | null;
}
export interface ILOANApprovalForm{
    loan_type: string;
    los_info: any;
    cic_form: ICICDataAPI;
    loan_info_form: IloanInfoForm;
    source_income_form: ISourceIncomeForm;
    other_profile: ILOANNormalApprovalAPIOther;
    internal_credit_rating: IInternalCreditRating;
    dedupe_blacklist: IDedupeBlacklist;
    additional_appraisal: IAdditionalDataAPI;
    collateral_form:ILoanNormalApproveCollateral;
}



