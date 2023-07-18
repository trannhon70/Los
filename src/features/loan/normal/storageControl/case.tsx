import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from 'types/models/loan/normal';
import { IParamControl,
  IParamControlApply,
  IParamsApprovedDecision,
  IParamsApprovedDecisionIgnore,
  IParamsControlApply,
  IParamsControlApply1
}
from "types/models/loan/normal/storageControl";

export enum ETypeButtonBarRole{
  PRODUCT_GROUP = "U1",
  LEGAL_ALL = "U2",
  LEGAL_BORROWER = "U2_BO",
  LEGAL_MARRIAGE = "U2_MA",
  LEGAL_COBORROWER = "U2_CB",
  LEGAL_COPAYER = "U2_CP",
  LEGAL_RELATED = "U2_RE",
  LEGAL_OTHER = "U2_OT",
  LEGAL_CONTACT = "U2_CE",

  CIC_ALL = "U3",
  CIC_OTHER = "U3_OI",
  CIC_OTHER_BORROWER = "U3_OI_BO",
  CIC_OTHER_MARRIAGE = "U3_OI_MA",
  CIC_OTHER_COBORROWER = "U3_OI_CB",
  CIC_OTHER_COPAYER = "U3_OI_CP",
  CIC_OTHER_OTHER = "U3_OI_OT",
  CIC_OTHER_RELATED = "U3_OI_RE",
  CIC_SCB = "U3_SC",
  CIC_SCB_BORROWER = "U3_SC_BO",
  CIC_SCB_MARRIAGE = "U3_SC_MA",
  CIC_SCB_COBORROWER = "U3_SC_CB",
  CIC_SCB_COPAYER = "U3_SC_CP",
  CIC_SCB_OTHER = "U3_SC_OT",
  CIC_SCB_RELATED = "U3_SC_RE",
  
  CIC_U3_SR = "U3_SR",


  LOAN = "U4",
  LOAN_CAPITAL_NEED_LOAN_PLAN_INFO = "U4_CP", // Nhu cầu vốn và phương án vay vốn
  LOAN_OPERATION_BUSSINESS = "U4_OB", // Hoạt động sản xuất kinh doanh
  LOAN_BUSSINESS_HOUSEHOLD_INFO = "U4_OB_BH", // Pháp lý hộ kinh doanh
  LOAN_FINANCIAL_ANALYSIS_INFO = "U4_OB_FA", // Phân tích tài chính
  LOAN_PRODUCT_LOAN_INFO_PROGRAM= "U4_PR", // Thông tin sản phẩm chương trình vay

  INCOME = "U5",
  INCOME_BORROWER = "U5_BO",
  INCOME_BORROWER_SALARY = "U5_BO_SL",
  INCOME_BORROWER_ASSRENT = "U5_BO_AS",
  INCOME_BORROWER_BUSSINESS = "U5_BO_BU",
  INCOME_BORROWER_COMPANY = "U5_BO_CO",
  INCOME_BORROWER_DEPOSIT = "U5_BO_DE",
  INCOME_BORROWER_OTHER = "U5_BO_OT",
  INCOME_BORROWER_PENSION = "U5_BO_PE",
  INCOME_BORROWER_STOCK = "U5_BO_ST",

  INCOME_COBORROWER = "U5_CB",
  INCOME_COBORROWER_SALARY = "U5_CB_SL",
  INCOME_COBORROWER_ASSRENT = "U5_CB_AS",
  INCOME_COBORROWER_BUSSINESS = "U5_CB_BU",
  INCOME_COBORROWER_COMPANY = "U5_CB_CO",
  INCOME_COBORROWER_DEPOSIT = "U5_CB_DE",
  INCOME_COBORROWER_OTHER = "U5_CB_OT",
  INCOME_COBORROWER_PENSION = "U5_CB_PE",
  INCOME_COBORROWER_STOCK = "U5_CB_ST",
  
  INCOME_COPAYER = "U5_CP",
  INCOME_COPAYER_SALARY = "U5_CP_SL",
  INCOME_COPAYER_ASSRENT = "U5_CP_AS",
  INCOME_COPAYER_BUSSINESS = "U5_CP_BU",
  INCOME_COPAYER_COMPANY = "U5_CP_CO",
  INCOME_COPAYER_DEPOSIT = "U5_CP_DE",
  INCOME_COPAYER_OTHER = "U5_CP_OT",
  INCOME_COPAYER_PENSION = "U5_CP_PE",
  INCOME_COPAYER_STOCK = "U5_CP_ST",

  INCOME_MARRIAGE = "U5_MA",
  INCOME_MARRIAGE_SALARY = "U5_MA_SL",
  INCOME_MARRIAGE_ASSRENT = "U5_MA_AS",
  INCOME_MARRIAGE_BUSSINESS = "U5_MA_BU",
  INCOME_MARRIAGE_COMPANY = "U5_MA_CO",
  INCOME_MARRIAGE_DEPOSIT = "U5_MA_DE",
  INCOME_MARRIAGE_OTHER = "U5_MA_OT",
  INCOME_MARRIAGE_PENSION = "U5_MA_PE",
  INCOME_MARRIAGE_STOCK = "U5_MA_ST",

  INCOME_BALANCE = "U5_BA",
  INCOME_ABILITY = "U5_PA",


  COLLATERAL = "U6",
  
  OTHER = "U7",
  OTHER_EXCEPTION = "U7_EX", // Thông tin ngoại lệ
  OTHER_PROFILE = "U7_AM", // Phân tích và biện pháp hạn chế rủi ro

  ICR = "U8",

  FORM = "U9",
  // s2
  LOAN_S2_CIC = "HQ1",
  LOAN_S2_CIC_MAIN = "HQ1_MO",
  LOAN_S2_CIC_BORROWER = "HQ1_MO_BO",
  LOAN_S2_CIC_MARRIAGE = "HQ1_MO_MA",
  LOAN_S2_CIC_COBORROWER = "HQ1_MO_CB",
  LOAN_S2_CIC_COPAYER = "HQ1_MO_CP",
  LOAN_S2_CIC_ADDITION = "HQ1_AO", 
  LOAN_S2_CIC_RELATED = "HQ1_AO_RE", 
  LOAN_S2_CIC_OTHER = "HQ1_AO_OT", 
  LOAN_S2_CIC_RANK = "HQ1_SR", 

  LOAN_S2_LOAN = "HQ2",
  LOAN_S2_LOAN_PRODUCT_LOAN_PROGRAM = "HQ2_PR",
  LOAN_S2_LOAN_PRODUCT_CAPITAL_NEED = "HQ2_CP",
  LOAN_S2_LOAN_PRODUCT_BUSS_ACTIVITY = "HQ2_OB",
  LOAN_S2_LOAN_PRODUCT_LOAN_METHOD = "HQ2_LM",

  LOAN_S2_INCOME = "HQ3",
  LOAN_S2_INCOME_INCOME = "HQ3_IC",
  LOAN_S2_INCOME_INCOME_BORROWER = "HQ3_IC_BO",
  LOAN_S2_INCOME_INCOME_BORROWER_SALARY = "HQ3_IC_BO_SL",
  LOAN_S2_INCOME_INCOME_BORROWER_ASSRENT = "HQ3_IC_BO_AS",
  LOAN_S2_INCOME_INCOME_BORROWER_BUSSINESS = "HQ3_IC_BO_BU",
  LOAN_S2_INCOME_INCOME_BORROWER_COMPANY = "HQ3_IC_BO_CO",
  LOAN_S2_INCOME_INCOME_BORROWER_STOCK = "HQ3_IC_BO_ST",
  LOAN_S2_INCOME_INCOME_BORROWER_DEPOSIT = "HQ3_IC_BO_DE",
  LOAN_S2_INCOME_INCOME_BORROWER_PENSION = "HQ3_IC_BO_PE",
  LOAN_S2_INCOME_INCOME_BORROWER_OTHER = "HQ3_IC_BO_OT",

  LOAN_S2_INCOME_INCOME_MARRIAGE = "HQ3_IC_MA",
  LOAN_S2_INCOME_INCOME_MARRIAGE_SALARY = "HQ3_IC_MA_SL",
  LOAN_S2_INCOME_INCOME_MARRIAGE_ASSRENT = "HQ3_IC_MA_AS",
  LOAN_S2_INCOME_INCOME_MARRIAGE_BUSSINESS = "HQ3_IC_MA_BU",
  LOAN_S2_INCOME_INCOME_MARRIAGE_COMPANY = "HQ3_IC_MA_CO",
  LOAN_S2_INCOME_INCOME_MARRIAGE_STOCK = "HQ3_IC_MA_ST",
  LOAN_S2_INCOME_INCOME_MARRIAGE_DEPOSIT = "HQ3_IC_MA_DE",
  LOAN_S2_INCOME_INCOME_MARRIAGE_PENSION = "HQ3_IC_MA_PE",
  LOAN_S2_INCOME_INCOME_MARRIAGE_OTHER = "HQ3_IC_MA_OT",

  LOAN_S2_INCOME_INCOME_COBORROWER = "HQ3_IC_CB",
  LOAN_S2_INCOME_INCOME_COBORROWER_SALARY = "HQ3_IC_CB_SL",
  LOAN_S2_INCOME_INCOME_COBORROWER_ASSRENT = "HQ3_IC_CB_AS",
  LOAN_S2_INCOME_INCOME_COBORROWER_BUSSINESS = "HQ3_IC_CB_BU",
  LOAN_S2_INCOME_INCOME_COBORROWER_COMPANY = "HQ3_IC_CB_CO",
  LOAN_S2_INCOME_INCOME_COBORROWER_STOCK = "HQ3_IC_CB_ST",
  LOAN_S2_INCOME_INCOME_COBORROWER_DEPOSIT = "HQ3_IC_CB_DE",
  LOAN_S2_INCOME_INCOME_COBORROWER_PENSION = "HQ3_IC_CB_PE",
  LOAN_S2_INCOME_INCOME_COBORROWER_OTHER = "HQ3_IC_CB_OT",

  LOAN_S2_INCOME_INCOME_COPAYER = "HQ3_IC_CP",
  LOAN_S2_INCOME_INCOME_COPAYER_SALARY = "HQ3_IC_CP_SL",
  LOAN_S2_INCOME_INCOME_COPAYER_ASSRENT = "HQ3_IC_CP_AS",
  LOAN_S2_INCOME_INCOME_COPAYER_BUSSINESS = "HQ3_IC_CP_BU",
  LOAN_S2_INCOME_INCOME_COPAYER_COMPANY = "HQ3_IC_CP_CO",
  LOAN_S2_INCOME_INCOME_COPAYER_STOCK = "HQ3_IC_CP_ST",
  LOAN_S2_INCOME_INCOME_COPAYER_DEPOSIT = "HQ3_IC_CP_DE",
  LOAN_S2_INCOME_INCOME_COPAYER_PENSION = "HQ3_IC_CP_PE",
  LOAN_S2_INCOME_INCOME_COPAYER_OTHER = "HQ3_IC_CP_OT",

  LOAN_S2_INCOME_BALANCE = "HQ3_BA",
  LOAN_S2_INCOME_ABILITY = "HQ3_PA",

  LOAN_S2_COLLATERAL = "HQ4",

  LOAN_S2_OTHER = "HQ5",
  LOAN_S2_OTHER_EX = "HQ5_EX",
  LOAN_S2_OTHER_OTHER_PROFILE = "HQ5_AM",
  LOAN_S2_ICR = "HQ6",
  LOAN_S2_DEDUPE_BLACKLIST = "HQ7",
  LOAN_S2_DEDUPE_INFOMATION = "HQ7_DD",
  LOAN_S2_BLACKLIST_INFOMATION = "HQ7_BL",

  LOAN_S2_ADDITION = "HQ8",
  LOAN_S2_ADDITION_STATEMENT = "HQ8_SM",
  LOAN_S2_ADDITION_APPROVAL_NOTIFY = "HQ8_AN",
  LOAN_S2_ADDITION_TEMPLATE = "HQ8_TP",

}

  export enum ETypeButton {
    apply = "apply",
    apply_control_hq = "apply_control_hq",
    apply_control = "apply_control",
    apply_control1 = "apply_control1",
    apply_control2 = "apply_control2",
    behalf_return = "behalf_return",
    apply_approve = "apply_approve",
    accept_official = "accept_official",
    accept_unofficial = "accept_unofficial",
    apply_headquarter_unofficial = "apply_headquarter_unofficial",
    apply_headquarter_official = "apply_headquarter_official",
    official = "official",
    unofficial = "unofficial",
    approve = "approve",
    close = "close",
    complaint = "complaint",
    confirm = "confirm",
    deny_official = "deny_official",
    deny_unofficial = "deny_unofficial",
    freeze = "freeze",
    modify_credit_info = "modify_credit_info",
    modify_notification = "modify_notification",
    reject = "reject",
    return_init = "return_init",
    return_pre_control = "return_pre_control",
    return_pre_control2 = "return_pre_control2",
    return_reappraise = "return_reappraise",
    save = "save",
    disconfirm = "disconfirm",
    disapprove = "disapprove",
    appraise = "appraise",
    return_moderator = "return_moderator",
    apply_approve_hq = "apply_approve_hq",
    return_control_hq = "return_control_hq",
  }

export const StorteStateControlCase = {

  // =============================  Apply ============================= //
  callInitApply(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsControlApply>){},

  // =============================  Close ============================= //
  callColtrolClose(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){
    state.storageControl.close.fetched = false;
    state.storageControl.close.fetching = true;
  },

  // =============================  Complaint ============================= //
  callColtrolComplaint(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){
    state.storageControl.complaint.fetched = false;
    state.storageControl.complaint.fetching = true;
  },

  // =============================  Save ============================= //
  callColtrolSave(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){
    state.storageControl.save.fetched = false;
    state.storageControl.save.fetching = true;
  },

  // =============================  modify notification ============================= //
  callColtrolModifyNoti(state: Draft<ILOANNormalState>, action: PayloadAction<IParamControl>) {
    state.storageControl.modifyNoti.fetched = false;
    state.storageControl.modifyNoti.fetching = true;
  },

  // =============================  modify credit ============================= //
  callColtrolModifyCredit(state: Draft<ILOANNormalState>, action: PayloadAction<IParamControl>) {
    state.storageControl.modifyCredit.fetched = false;
    state.storageControl.modifyCredit.fetching = true;
  },

  // control 
  callColtrolApply(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsControlApply>){ },

  // kiểm soát
  callColtrolComfirm(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){ },

  callControlApply(state: Draft<ILOANNormalState>, action:PayloadAction<string>){ }, 

  // phê duyệt
  callColtrolApprove(state: Draft<ILOANNormalState>, action:PayloadAction<string>){ },

  callControlApprove(state: Draft<ILOANNormalState>, action:PayloadAction<string>){ },

  callControlReject(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){ },
  
  callControlReturnInit(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsControlApply>){ },

  // s1 to s2
  callColtrolApprovedOfficial(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsApprovedDecision>){ },
  // APPROVAL
  callApprovalAcceptOfficial(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsApprovedDecisionIgnore>){ },

  callApprovalAcceptUnOfficial(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsApprovedDecisionIgnore>){ },

  callApprovalDenyOfficial(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsApprovedDecisionIgnore>){ },

  callApprovalDenyUnOfficial(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsApprovedDecisionIgnore>){ },

  callApprovalComfirm(state: Draft<ILOANNormalState>, action:PayloadAction<string>){ },

  callApprovalApprove(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){ },

  callApprovalReject(state: Draft<ILOANNormalState>, action:PayloadAction<string>){ },
  
  callApprovalReturnInit(state: Draft<ILOANNormalState>, action:PayloadAction<string>){ },
  
  callApprovalReturnControl(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsControlApply>){ },

  callDisConfirm(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){ },

  callDisApproved(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){ },

  callICRApprove(state: Draft<ILOANNormalState>, action:PayloadAction<{position: string, type: string}>){ },

  callApprovalApplyControl1(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsControlApply1>){ },

  callApprovalReturnControl2(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){ },

  callApprovalBeHalfReturn(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControl>){ },

  callApprovalControl1ApplyControl2(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControlApply>){ },

  callApprovalControl1ApplyApproveHQ(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControlApply>){ },
  
  callApprovalControlToHQ(state: Draft<ILOANNormalState>, action:PayloadAction<IParamControlApply>){ },

  callApprovalReturnReAppraise(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsControlApply>){ },

  callApprovalReturnControlHQ(state: Draft<ILOANNormalState>, action:PayloadAction<IParamsControlApply>){ },


}


