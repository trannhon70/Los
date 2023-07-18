import _ from "lodash";
import { ILOANNormalDocumentInfoList } from "types/models/loan/normal/storage/ICR";
import { RootState } from "types/reducer";

export const getFullApprovalICR = ( state: RootState) =>state.LOANNormal.storageApproval.full.data?.form.internal_credit_rating.result_internal_credit_rating

export const getStorageApprovalICR = ( state: RootState) =>state.LOANNormal.storageApproval.icr.result_internal_credit_rating
export const getLOANApprovalICRoDocument = (state: RootState): { docs: ILOANNormalDocumentInfoList[], count: number } => {
    const data: ILOANNormalDocumentInfoList[] = _.get(state.LOANNormal, 'storageApproval.icr.document_info_list', []) ?? [];
    let count = 0;
    data.forEach(doc => {
        doc?.document_group?.forEach(grdoc => {
            grdoc?.child_files?.forEach((file) => {
                if (file.content_type) {
                    count++;
                }
            })
        });
    })
    return { docs: data, count }
};