import * as _ from 'lodash';
import {
  ICICDocumentInfoAPI,
  // ICICDocumentAPI,
  // ICICDocumentChildFileAPI,
  // ICICDocumentChildListAPI,
  // ICICDocumentInfoAPI,
  // ILOANNormalApprovalStorageCICDocumentList,
  ILOANNormalApprovalStorageCICState,
  IObjectCICState,
  IObjectCICStateData,
} from 'types/models/loan/normal/storageApproval/CIC';
import { checkIsLocalUUID, formatPath } from 'utils';
import { apiDelete, apiGet, apiPost } from 'utils/api';
import { API_BASE_URL_S2 } from 'utils/constants';

export const saveCICAPI = (
  cicState: ILOANNormalApprovalStorageCICState,
  los_id: string,
  documentListStoreFull: ICICDocumentInfoAPI[],
  dataPosition: string
) => {
  // const { documentType } = configs;
  // const getDocument = (listDoc :ILOANNormalApprovalStorageCICDocumentList[])=>{
  //   return listDoc.map((doc, index) => {
  //     const detailParentDoc = documentType['LICH_SU_QUAN_HE_TIN_DUNG_LOAN'].data.find(a => a.code === doc.document_type_code);

  //     return {
  //       display_order: doc.display_order,
  //       document_type_id: 0,
  //       document_type_code: '',
  //       document_type_name: ,
  //       document_list: doc.document_list?.map(d => {
  //         const detailChildDoc = (detailParentDoc?.child_list ?? []).find(c => Number(c.code) === Number(d.document_code));
  //         return {
  //           display_order: d.display_order,
  //           document_id:_.get(detailChildDoc,'id',null) ?? + d.document_code,
  //           document_name: _.get(detailChildDoc,'name',''),
  //           document_child_files: d.document_child_files && d.document_child_files?.map(c => {
  //             return {
  //               uuid: c.uuid,
  //               content_type: c.content_type,
  //               display_order: c.display_order,
  //               name: c.name,
  //               create_by: c.created_by,
  //               create_at: Number(c.created_at) / 1000,
  //               update_by: c.created_by,
  //               update_at: Number(c.created_at) / 1000,
  //               description:c.description??'',
  //               custom_keys:c.custom_keys,
  //             } as ICICDocumentChildFileAPI
  //           }) as [] as ICICDocumentChildFileAPI[],
  //           document_child_list: d.document_child_list && d.document_child_list?.map(l => {
  //             return {
  //               display_order: l.display_order,
  //               document_child_id: l.document_child_id,
  //               document_child_name: l.document_child_name,
  //               document_child_files: l.document_child_files && l.document_child_files?.map(cf => {
  //                 return {
  //                   uuid: cf.uuid,
  //                   content_type: cf.content_type,
  //                   display_order: cf.display_order,
  //                   name: cf.name,
  //                   create_by: cf.created_by,
  //                   create_at: Number(cf.created_at) / 1000,
  //                   update_by: cf.created_by,
  //                   update_at: Number(cf.created_at) / 1000,
  //                   custom_keys:cf.custom_keys
  //                 } as ICICDocumentChildFileAPI
  //               }) as [] as ICICDocumentChildFileAPI[]
  //             } as ICICDocumentChildListAPI
  //           }) as [] as ICICDocumentChildListAPI[]
  //         } as ICICDocumentAPI
  //       }) as [] as ICICDocumentAPI[]
  //     } as ICICDocumentInfoAPI
  //   }) as [] as ICICDocumentInfoAPI[]
  // }
  const activeObjectKey =
    cicState.activeObject as keyof ILOANNormalApprovalStorageCICState;
  const activeGroup = cicState[activeObjectKey] as IObjectCICState;
  const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData;
  const activePerson = (cicState[activeObjectKey] as IObjectCICState).data[
    groupActiveKey
  ].position;
  const activePersonIndex = (cicState[activeObjectKey] as IObjectCICState).data[
    groupActiveKey
  ].data.findIndex((per) => per.detail.person_uuid === activePerson);

  const personUUID = (cicState[activeObjectKey] as IObjectCICState).data[
    groupActiveKey
  ].data[activePersonIndex].detail.person_uuid;
  const object =
    activeObjectKey === 'main'
      ? 'main-search-objects'
      : activeObjectKey === 'additional'
      ? 'additional-lookup-objects'
      : 'summary-of-rating';

  const localPersonDetail = (cicState[activeObjectKey] as IObjectCICState).data[
    groupActiveKey
  ].data[activePersonIndex].detail;

  const body = {
    person_total_amount: (cicState[activeObjectKey] as IObjectCICState).data[
      groupActiveKey
    ].totalAmount,
    document_info_list: documentListStoreFull,
    person_detail: {
      ...localPersonDetail,
      flexcube_day:
        localPersonDetail.flexcube_day === null
          ? localPersonDetail.flexcube_day
          : localPersonDetail.flexcube_day / 1000,
      cic_information: localPersonDetail.cic_information.map((cic) => ({
        ...cic,
        cic_information_detail:
          (!cic?.cic_information_detail?.cic_normal_loan?.institution &&
            !cic?.cic_information_detail?.cic_credit?.institution) ||
          (cic?.cic_information_detail?.cic_normal_loan?.institution.length ===
            0 &&
            cic?.cic_information_detail?.cic_credit?.institution.length === 0)
            ? null
            : {
                ...cic?.cic_information_detail,
                cic_normal_loan: {
                  ...cic?.cic_information_detail?.cic_normal_loan,
                  institution:
                    cic?.cic_information_detail?.cic_normal_loan?.institution?.map(
                      (inst) => ({
                        ...inst,
                        institution_detail: inst?.institution_detail?.map(
                          (child) => ({
                            ...child,
                            credit_agreement: child?.credit_agreement?.map(
                              (agree) => ({
                                ..._.omit(agree, 'isEdit'),
                                uuid: checkIsLocalUUID(agree.uuid)
                                  ? null
                                  : agree.uuid,
                              })
                            ),
                          })
                        ),
                      })
                    ),
                },
              },
      })),
    },
  };

  return apiPost<unknown>(
    formatPath(
      API_BASE_URL_S2 +
        `/approval/documents/${los_id}/cic/${personUUID}/${object}?position=${dataPosition}`
    ),
    body
  );
};
//
export const deleteAgreementCICAPI = (
  cicState: ILOANNormalApprovalStorageCICState,
  los_id: string,
  agree_uuid: string,
  dataPosition: string
) => {
  const activeObjectKey =
    cicState.activeObject as keyof ILOANNormalApprovalStorageCICState;
  const activeGroup = cicState[activeObjectKey] as IObjectCICState;
  const groupActiveKey = activeGroup.groupActive as keyof IObjectCICStateData;
  const activePerson = (cicState[activeObjectKey] as IObjectCICState).data[
    groupActiveKey
  ].position;
  const activePersonIndex = (cicState[activeObjectKey] as IObjectCICState).data[
    groupActiveKey
  ].data.findIndex((per) => per.detail.person_uuid === activePerson);

  const personUUID = (cicState[activeObjectKey] as IObjectCICState).data[
    groupActiveKey
  ].data[activePersonIndex].detail.person_uuid;
  const object =
    activeObjectKey === 'main'
      ? 'main-search-objects'
      : 'additional-lookup-objects';

  return apiDelete<unknown>(
    formatPath(
      API_BASE_URL_S2 +
        `/approval/documents/${los_id}/cic/${personUUID}/${object}/${agree_uuid}?position=${dataPosition}`
    )
  );
};

export const saveSummaryCICAPI = (los_id: string) => {
  return apiPost<unknown>(
    formatPath(
      API_BASE_URL_S2 + '/approval/documents/:los_id/cic/summary-of-rating',
      los_id
    )
  );
};

export const getSummaryCICAPI = (los_id: string, dataPosition: string) => {
  return apiGet<unknown>(
    formatPath(
      API_BASE_URL_S2 +
        `/approval/documents/${los_id}/cic/summary-of-rating?position=${dataPosition}`,
      los_id
    )
  );
};
