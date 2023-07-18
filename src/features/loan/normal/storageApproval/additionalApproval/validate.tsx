import {
  IAAAfterDisbursementConditions, IAAApprovalNotice, IAALegal, IAANoticeProductsRegulations, IAAPhoneNumber, IAAPreDisbursementConditions, IAAProductRegulations,
  IAAResult, IAAStatement, IAAStatementInfo
} from 'types/models/loan/normal/storageApproval/AdditionalAppraisal';
import { PhoneMobileVN } from "views/pages/LOAN/utils/phoneVN";

export const ValidateAdditionalApproval = {
  info(value: string, field: string, pattern?: RegExp) {
    if (value === '' || value === null) {
      return { valid: false, field: field, role: 'empty' };
    }
    else if(pattern){
      if(!pattern.test(value)){
        return { valid: false, field: field, role: 'pattern' };
      }
    }
    return { valid: true };
  },
  
  number(value: number | null, field?: string) {
    if (value === null || value === 0) {
      return { valid: false, field: field, role: 'empty' };
    }
    return { valid: true };
  },
  date(value: number | null, field: string) {
    const today = Date.now();
    if (!value ) {
      return { valid: false, field: field, role: 'empty' };
    }
    return { valid: true };
  },
  mobile(value: string,arrMobile: string[]){

    if (!value){
      return { valid: false, field: 'phone_number', role : 'empty' };
    }

    if (!value.match(/^0\d{9}$/g)){
      return { valid: false, field: 'phone_number', role: 'invalid_format' };
    }

    if (!~PhoneMobileVN.indexOf(value.substring(0, 3))){
      return { valid: false, field: 'phone_number', role: 'invalid_phone_vn' };
    }

    const isExist = arrMobile?.indexOf(value) >= 0 ? true : false;
    if (isExist){
      return { valid: false, field: 'phone_number', role: 'is_exist' };
    }
   
    return { valid: true };
  },
  statementInfo(data: IAAStatementInfo) {
    if (data) {
      // const pattern = /^([0-9]+\/P\.PDTDKHCN\.[0-9]{2}\.[0-9]{2})$/g;

      const vNumberCreditApproval = ValidateAdditionalApproval.info(
        data.number_credit_approval,
        'number_credit_approval'
      );
      if (!vNumberCreditApproval.valid) return { ...vNumberCreditApproval };
      // console.log({vNumberCreditApproval});

      // const vNoticeExportTime = ValidateAdditionalApproval.date( data.basic_info.notice_export_time, 'notice_export_time')
      // if(!vNoticeExportTime.valid) return {...vNoticeExportTime}

      const vStatementExportTime = ValidateAdditionalApproval?.date( data.statement_export_time, 'statement_export_time');
      if ( !vStatementExportTime.valid) return { ...vStatementExportTime };
      // console.log({vStatementExportTime});
      

      const vNumberBusinessUnit = ValidateAdditionalApproval.info(
        data.number_business_unit,
        'number_business_unit'
      );
      if (!vNumberBusinessUnit.valid) return { ...vNumberBusinessUnit };

      const vBusinessUnitExportTime = ValidateAdditionalApproval.date(
        data.business_unit_export_time,
        'business_unit_export_time'
      );
      if (!vBusinessUnitExportTime.valid) return { ...vBusinessUnitExportTime };
    }
    return { valid: true };
  },
  legal(data: IAALegal) {
    if (data) {
      const vLegalFileReview = ValidateAdditionalApproval.info(
        data.legal_file_review,
        'legal_file_review'
      );
      if (!vLegalFileReview.valid) return { ...vLegalFileReview };
    }
    return { valid: true };
  },
  listPhoneNumber(data: IAAPhoneNumber[]) {
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const vDetail = ValidateAdditionalApproval.mobile(
          data[index].phone_number, []
          // data.filter((e, i) => i !== index)?.map((e) => e.phone_number),
          // data[index].uuid
        );
        if (!vDetail.valid) {
          return { ...vDetail, index };
        }
        const vPhoneResult = ValidateAdditionalApproval.info(data[index].result, 'result');
        if (!vPhoneResult.valid) return { ...vPhoneResult, index  };

        const vPhoneNote = ValidateAdditionalApproval.info(data[index].note, 'note');
        if (!vPhoneNote.valid) return { ...vPhoneNote, index  };
      }
    }
    return { valid: true };
  },
  beforeConditions(data: IAAPreDisbursementConditions[]) {
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const vDetail = ValidateAdditionalApproval.info(data[index].disbursement_conditions_detail, 'disbursement_conditions_detail');
        if (!vDetail.valid) {
          return { ...vDetail, index };
        }
      }
    }
    return { valid: true }
  },
  afterConditions(data: IAAAfterDisbursementConditions[]) {
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const vDetail = ValidateAdditionalApproval.info(data[index].conditions_after_disbursement_detail, 'conditions_after_disbursement_detail');
        if (!vDetail.valid) {
          return { ...vDetail, index };
        }
      }
    }
    return { valid: true }
  },
  productsRegulation(data: IAAProductRegulations) {
    if (data) {
      const vNotification = ValidateAdditionalApproval.info( data.notification, 'notification');
      if (!vNotification.valid) {
        return { ...vNotification, regulations: 'notification' };
      }

      const vBeforeConditions = ValidateAdditionalApproval.beforeConditions(data.disbursement_conditions);
      if (!vBeforeConditions.valid) {
        return { ...vBeforeConditions, regulations: 'disbursement_conditions' };
      }
      
      const vAfterConditions = ValidateAdditionalApproval.afterConditions(data.conditions_after_disbursements);
      if (!vAfterConditions.valid) {
        return { ...vAfterConditions, regulations: 'conditions_after_disbursements' };
      }
    }
    return { valid: true };
  },
  result(data: IAAResult) {
    if(data){
      if(data.appraisal_staff_proposal.credit_grant_status === 'Y'){
        const vProductRegulation = ValidateAdditionalApproval.productsRegulation(data.product_regulations)
        if (!vProductRegulation.valid) {
          return { ...vProductRegulation, result: 'product_regulations' };
        }
      }
      else {
        const vRefuseCode = ValidateAdditionalApproval.info(data.appraisal_staff_proposal.reason_for_refusal_code, 'reason_for_refusal_code')
        if (!vRefuseCode.valid) {
          return { ...vRefuseCode, result: 'appraisal_staff_proposal'};
        }

        const vReason = ValidateAdditionalApproval.info(data.appraisal_staff_proposal.reason, 'reason')
        if (!vReason.valid) {
          return { ...vReason, result: 'appraisal_staff_proposal'};
        }
      }
    }
    return { valid: true };
  },
  statement(data: IAAStatement) { 
    if(data){
      const vStatementInfo = ValidateAdditionalApproval.statementInfo(data.statement_info)
      if (!vStatementInfo.valid) {
        return { ...vStatementInfo, statement: 'statement_info'};
      }

      const vLegal = ValidateAdditionalApproval.legal(data.legal_due_diligence)
      if (!vLegal.valid) {
        return { ...vLegal, statement: 'legal_due_diligence'};
      }
      const vPhoneNumber = ValidateAdditionalApproval.listPhoneNumber(data.phone_number_appraisals)
      if (!vPhoneNumber.valid) {
        return { ...vPhoneNumber, statement: 'phone_number_appraisals'};
      }
      const vResult = ValidateAdditionalApproval.result(data.appraisal_result)
      if (!vResult.valid) {
        return { ...vResult, statement: 'appraisal_result'};
      }
    }
    return { valid: true };
  },
  noticeProductsRegulation(data: IAANoticeProductsRegulations) {
    if (data) {
      
      const vBeforeConditions = ValidateAdditionalApproval.beforeConditions(data.disbursement_conditions);
      if (!vBeforeConditions.valid) {
        return { ...vBeforeConditions, regulations: 'disbursement_conditions' };
      }
      
      const vAfterConditions = ValidateAdditionalApproval.afterConditions(data.conditions_after_disbursements);
      if (!vAfterConditions.valid) {
        return { ...vAfterConditions, regulations: 'conditions_after_disbursements' };
      }
    }
    return { valid: true };
  },
  notice(data: IAAApprovalNotice){
    if(data){
      // const pattern = /^([0-9]+\/P\.PDTDKHCN\.[0-9]{2}\.[0-9]{2})$/g;
      const vNumberApprovalNotice = ValidateAdditionalApproval.info( data.basic_info.number_approval_notice, 'number_approval_notice')
      if(!vNumberApprovalNotice.valid) return {...vNumberApprovalNotice}
      
      const vNoticeExportTime = ValidateAdditionalApproval.date( data.basic_info.notice_export_time, 'notice_export_time')
      if(!vNoticeExportTime.valid) return {...vNoticeExportTime}

      const vAnnouncementTitle = ValidateAdditionalApproval.info( data.basic_info.announcement_title, 'announcement_title')
      if(!vAnnouncementTitle.valid) return {...vAnnouncementTitle}

      const vLoanAmountInWords = ValidateAdditionalApproval.info( data.credit_grant_information.loan_amount_in_words, 'loan_amount_in_words')
      if(!vLoanAmountInWords.valid) return {...vLoanAmountInWords}

      const vTotal = ValidateAdditionalApproval.number( data.credit_grant_information.total, 'total')
      if(!vTotal.valid) return {...vTotal}

      const vProductRegulation = ValidateAdditionalApproval.noticeProductsRegulation(data.product_regulations)
      if(!vProductRegulation.valid) return {...vProductRegulation}

      // const vApprovalLevel = ValidateAdditionalApproval.info( data.opinion.approval_level.name, 'approval_level')
      // if(!vApprovalLevel.valid) return {...vApprovalLevel}

      if(data.basic_info.announcement_title === 'REFUSING_TO_GRANT_CREDIT_TO_CUSTOMERS'){
        const vOffer = ValidateAdditionalApproval.info( data.opinion.offer, 'offer')
      if(!vOffer.valid) return {...vOffer}
      }

    }
    return { valid: true };

  }
};
