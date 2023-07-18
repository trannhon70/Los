import * as _ from 'lodash';
import {
  IAAApprovalNotice,
  IAAStatement,
  IAdditionalDataAPI
} from 'types/models/loan/normal/storageApproval/AdditionalAppraisal';
import { formatPath, getQueryString } from 'utils';
import { apiDelete, apiGet, apiPost } from 'utils/api';
import { API_BASE_URL_S2 } from 'utils/constants';

export const saveAAStatementAPI = (
  statement: IAAStatement,
  los_id: string,
) => {
  const data = {..._.omit(statement,'validate')}
  const acceptCreditGrant = data.appraisal_result.appraisal_staff_proposal.credit_grant_status === 'Y'
  const body = {...data,
                  appraisal_result : acceptCreditGrant ? {
                    ...data.appraisal_result,
                    option:  data.appraisal_result.option,
                    appraisal_staff_proposal: {..._.omit(data.appraisal_result.appraisal_staff_proposal,'reason_for_refusal_code','reason','proposal')}
                  } : {
                    option:  data.appraisal_result.option,
                    appraisal_staff_proposal: {..._.omit(data.appraisal_result.appraisal_staff_proposal,'loan_amount','loan_term','another_idea')}
                  }
                };

  return apiPost<unknown>(
    formatPath(
      API_BASE_URL_S2 + '/approval/documents/:los_id/additional-appraisal/statement',
      los_id,
    ),
    body
  );
};
export const saveAANoticeAPI = (
  notice: IAAApprovalNotice,
  los_id: string,
) => {
  const body = notice.basic_info.announcement_title === 'REFUSING_TO_GRANT_CREDIT_TO_CUSTOMERS' ? 
        {...notice} 
        :{
          ...notice,
          opinion: {
            ..._.omit(notice.opinion, 'offer', 'reason')
          }
        }

  return apiPost<unknown>(
    formatPath(
      API_BASE_URL_S2 + '/approval/documents/:los_id/additional-appraisal/approval-notice',
      los_id,
    ),
    body
  );
};
export const saveAATemplateAPI = (los_id: string) => {
  return apiPost<unknown>(formatPath( API_BASE_URL_S2 + '/approval/documents/:los_id/template/',los_id),);
};


export const deleteConditionAPI = (
  los_id: string,
  tab: string,
  uuid: string
) => {
  const object = tab === 'statement' ? 'product-regulations-statement' : 'product-regulations';
  const query = getQueryString({uuid : uuid})
  return apiDelete<unknown>(
    formatPath(
      API_BASE_URL_S2 + `/approval/documents/${los_id}/additional-appraisal/${object}?${query}`
    ),
  );
};

export const deletePhoneNumberAPI = (
  los_id: string,
  uuid: string
) => {
  const query = getQueryString({uuid : uuid})
  return apiDelete<unknown>(
    formatPath(
      API_BASE_URL_S2 + `/approval/documents/${los_id}/additional-appraisal/telephone-statement?${query}`
    ),
  );
};

export const getAdditionalApproval = (
  los_id: string,
) => {
  return apiGet<IAdditionalDataAPI>(
    formatPath(
      API_BASE_URL_S2 + `/approval/documents/${los_id}/additional-appraisal`
    ),
  );
};

//
