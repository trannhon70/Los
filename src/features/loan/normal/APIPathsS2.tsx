import { API_BASE_URL_S2 } from "utils/constants";

export const API_LOAN_APPROVAL_FULL =  API_BASE_URL_S2  + '/approval/documents/:id/apply-document?los_uuid=:los_uuid';
export const API_LOAN_APPROVAL_FULL_DOCUMENT =  API_BASE_URL_S2  + '/approval/documents/:los_id/get-document';
export const API_LOAN_APPROVAL = API_BASE_URL_S2 + '/approval/documents/:los_id/source-income/get-source-income';

export const SAVE_API_LOAN_APPROVAL_OTHER_EXCEPTION =  API_BASE_URL_S2  + '/approval/documents/:los_id/other-profile/exception-info';
export const DELETE_API_LOAN_APPROVAL_OTHER_EXCEPTION =  API_BASE_URL_S2  + '/approval/documents/:los_id/other-profile/exception-list/:exception_type_id';
export const DELETE_API_LOAN_APPROVAL_OTHER_EXCEPTION_DETAIL =  API_BASE_URL_S2  + '/approval/documents/:los_id/other-profile/exception-list-detail/:exception_uuid';
export const SAVE_API_LOAN_APPROVAL_OTHER_RISK =  API_BASE_URL_S2  + '/approval/documents/:los_id/other-profile/analysis-mitigation-measures';
export const SAVE_API_LOAN_APPROVAL_ICR =  API_BASE_URL_S2  + '/approval/documents/:los_id/internal-credit-rating';
export const API_METADATA = API_BASE_URL_S2 + '/metadata'
// state guide
export const API_LOAN_STATE_GUIDE  = API_BASE_URL_S2 + '/:los_id/state-guide?position=:position';

// History Logs
export const API_LOAN_HISTORY_LOGS = API_BASE_URL_S2 + '/:los_uuid/logs?:query';


// init button bar
export const API_LOAN_APPLY = API_BASE_URL_S2 + "/:los_uuid/apply/control?position=:position"  // BE CHECK position
export const API_LOAN_CLOSE = API_BASE_URL_S2 + "/:los_uuid/close?position=:position"
export const API_LOAN_COMPLAINT = API_BASE_URL_S2 + "/:los_uuid/complaint?position=:position"
export const API_LOAN_SAVE = API_BASE_URL_S2 + "/:los_uuid/save?position=:position"
export const API_LOAN_MODIFY_APPROVAL_NOTIFICATION = API_BASE_URL_S2 + "/:los_uuid/modify/approval-notification-letter?position=:position"
export const API_LOAN_MODIFY_CREDIT = API_BASE_URL_S2 + "/:los_uuid/modify/credit?position=:position"


// control button bar
export const API_LOAN_COMFIRM = API_BASE_URL_S2 + "/:los_uuid/confirm?position=:position"  
export const API_LOAN_CONTROL_APPLY = API_BASE_URL_S2 + "/:los_uuid/apply/approve?position=:position"  
export const API_LOAN_CONTROL_APPROVE = API_BASE_URL_S2 + "/:los_uuid/approve?position=:position"  
export const API_LOAN_CONTROL_REJECT = API_BASE_URL_S2 + "/:los_uuid/reject?position=:position"  
export const API_LOAN_CONTROL_RETURN_INIT = API_BASE_URL_S2 + "/:los_uuid/return/init?position=:position"  

// approve button bar

export const API_LOAN_APPROVE_CONFIRM = API_BASE_URL_S2 + "/:los_uuid/approve?position=:position"  
export const API_LOAN_APPROVE = API_BASE_URL_S2 + "/:los_uuid/approve?position=:position"  
export const API_LOAN_RETURN_CONTROL = API_BASE_URL_S2 + "/:los_uuid/return/control?position=:position"  
export const API_LOAN_APPROVE_DECISION = API_BASE_URL_S2 + "/:los_uuid/decision/apply/official?position=:position"  
export const API_LOAN_APPROVE_DECISION_UNOFFICIAL = API_BASE_URL_S2 + "/:los_id/decision/apply/unofficial?position=:position"  

// decision and collateral Ignore 
export const API_LOAN_DECISION_ACCEPT_OFFICIAL = API_BASE_URL_S2 + "/:los_uuid/decision/accept/official?position=:position"  
export const API_LOAN_DECISION_ACCEPT_UN_OFFICIAL = API_BASE_URL_S2 + "/:los_uuid/decision/accept/unofficial?position=:position"  
export const API_LOAN_DECISION_DENY_OFFICIAL = API_BASE_URL_S2 + "/:los_uuid/decision/deny/official?position=:position"  
export const API_LOAN_DECISION_DENY_UN_OFFICIAL = API_BASE_URL_S2 + "/:los_uuid/decision/deny/unofficial?position=:position"  

// discomfirm and dis approved
export const API_LOAN_DISCONFIRM = API_BASE_URL_S2 + "/:los_uuid/disconfirm?position=:position"  
export const API_LOAN_DISAPPROVED = API_BASE_URL_S2 + "/:los_uuid/disapprove?position=:position"  


// LOANNNNNNNNNNNNNNNNNNNNNN
export const API_SAVE_APPROVAL_LOAN_PRODUCT = API_BASE_URL_S2 + "/approval/documents/product-loan-program?los_id=:los_id"
export const API_SAVE_APPROVAL_LOAN_METHOD = API_BASE_URL_S2 + "/approval/documents/loan-method?los_id=:los_id"
export const API_SAVE_APPROVAL_LOAN_CAPITAL = API_BASE_URL_S2 + "/approval/documents/capital-need-loan-plan?los_id=:los_id"
export const API_SAVE_APPROVAL_LOAN_BUSSINESS= API_BASE_URL_S2 + "/approval/documents/production-and-business-activities?los_id=:los_id"

// CollateralApproval
export const API_SAVE_APPROVAL_COLLATERAL_LTV = API_BASE_URL_S2 + "/approval/documents/:los_id/collateral/ltv?ignore_safely_debit_warning=true"
export const API_SAVE_APPROVAL_COLLATERAL = API_BASE_URL_S2 + "/approval/documents/:los_id/collateral/:price_cert_uuid"
export const API_DELETE_APPROVAL_COLLATERAL_LTV = API_BASE_URL_S2 + "/approval/documents/:los_id/collateral/ltv/:uuid"

// Dedupe Approval
export const API_SAVE_APPROVAL_DEDUPE = API_BASE_URL_S2 + "/approval/documents/:los_id/dedupe-black-list/dedupe"
export const API_SAVE_APPROVAL_BLACKLIST = API_BASE_URL_S2 + "/approval/documents/:los_id/dedupe-black-list/blacklist"
export const API_GET_APPROVAL_BLACKLIST = API_BASE_URL_S2 + "/approval/documents/:los_id/dedupe-black-list/blacklist"
export const API_GET_APPROVAL_DEDUPE = API_BASE_URL_S2 + "/approval/documents/:los_id/dedupe-black-list/dedupe"

//Customer
export const API_GET_CUSTOMER_DISCUSSION = API_BASE_URL_S2 + "/:los_id/discussion/activities?:query"
export const API_POST_CUSTOMER_DISCUSSION = API_BASE_URL_S2 + "/:los_id/discussion/activities"



// APPROVE ICR
export const API_APPROVE_ICR = API_BASE_URL_S2 + "/:los_id/internal-credit-rating/approve?position=:position"


//s2 headquater
export const API_APPLY_CONTROL_1 = API_BASE_URL_S2 + "/:los_id/apply/control/1?position=:position"  


// APPROVAL HEADQUARTER
export const API_LOAN_RETURN_CONTROL_2 = API_BASE_URL_S2 + "/:los_id/return/control/2?position=:position"  

// CONTROL 1 HEADQUARTER
export const API_LOAN_CONTROL_1_BEHALF_RETURN= API_BASE_URL_S2 + "/:los_id/behalf-return?position=:position" 
export const API_LOAN_CONTROL_1_APPLY_CONTROL_2= API_BASE_URL_S2 + "/:los_id/apply/control/2?position=:position"
export const API_LOAN_CONTROL_1_APPLY_APPROVE_HQ= API_BASE_URL_S2 + "/:los_id/apply/approve/hq?position=:position"  


// APPLY CONTROL HQ
export const API_LOAN_CONTROL_APPLY_HQ = API_BASE_URL_S2 + "/:los_id/apply/control/hq?position=:position"  
// return S2 
export const API_LOAN_S2_RETURN_CONTROL = API_BASE_URL_S2 + "/:los_id/return/control/hq?position=:position"  
export const API_LOAN_RETURN_REAPPRAISE = API_BASE_URL_S2 + "/:los_id/return/reappraise?position=:position"  

//getTotalfile los id
export const API_LOAN_NORMAL_GET_PROFILEDOCUMENT = API_BASE_URL_S2 + '/:los_id/file-dashboard';
export const API_LOAN_NORMAL_GET_PROFILEDOCUMENT_STRUCTURE = API_BASE_URL_S2 + '/:los_id/document-structure?loan_type=LOAN';
export const API_LOAN_NORMAL_GET_PROFILEDOCUMENT_GET_FILE = API_BASE_URL_S2 + '/:los_id/document-structure/:doc_id/files?:query';
export const API_LOAN_NORMAL_GET_CUSTOMER_INFO = API_BASE_URL_S2 + '/:los_id/customer-info';
