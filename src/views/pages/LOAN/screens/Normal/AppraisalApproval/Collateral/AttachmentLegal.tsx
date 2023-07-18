import {
  dataDocumentLegal,
  getListDeclareDataLegal,
} from "features/loan/normal/storage/legal/selectors";
import React, {
  Fragment,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import AttachmentDynamic, {
  IActionsDynamicModal,
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import * as _ from "lodash";
import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import {
  ILOANModalDynamicDocument,
  ILOANModalDynamicFile,
} from "types/models/loan/normal/configs/Document";
import { ILOANNormalStorageLegalFile } from "types/models/loan/normal/storage/Legal";
import { IDocDynamicOption } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import { getUuidLegalAttachmentApproval } from "features/loan/normal/storageApproval/collateral/selector";
import { setUuidAttachmentLegalApproval } from "features/loan/normal/storageApproval/collateral/actions";

export const useLegalAttachmentHook =()=>{
  const listDeclareLegal = useSelector(getListDeclareDataLegal);
  const getCountAttachFileWithLegal_uuid = (uuid:string)=>{
    const data: ILOANNormalStorageLegalFile[] = _.get(
      listDeclareLegal.find((de) => de.person_uuid === uuid),
      "documentList",
      []
    );
    let count = 0;
    data.forEach(d=>{
      if(!d?.child_files?.length) return;
      if(d.child_files.length ===0) return;
      count +=d.child_files.length;
    })
    return count;
  };
  const getMappingData = (data: ILOANNormalStorageLegalFile[])=>{
    return data.map((data) => {
      const result: ILOANModalDynamicDocument = {
        uuid: data.uuidActiveFile,
        document_id: data.document_id,
        document_name: data.document_name,
        hasSubDoc: false,
        childs: data.child_files.map((file) => {
          const result: ILOANModalDynamicFile = {
            ...file,
            custom_keys: undefined,
          };
          return result;
        }),
      };
      return result;
    });
  }
  const getMappingDataWithLegal_uuid = (uuid:string)=>{
    const data: ILOANNormalStorageLegalFile[] = _.get(
      listDeclareLegal.find((de) => de.person_uuid === uuid),
      "documentList",
      []
    );
    return getMappingData(data);
  }
   return ({
    getCountAttachFileWithLegal_uuid,
    getMappingData,
    getMappingDataWithLegal_uuid,
   })
}
export default function AttachmentLegal() {
  const dispatch = useDispatch();
  const uuid = useSelector(getUuidLegalAttachmentApproval);
  const dataSelectFile = useSelector(dataDocumentLegal);
  const {getMappingDataWithLegal_uuid} = useLegalAttachmentHook();
  const options: IDocDynamicOption[] =
    dataSelectFile?.map((item) => ({
      value: item.code,
      label: item.name,
      type: _.get(item, "type", ""),
      subDocs: [],
    })) ?? [];

  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "PHAP_LY",
        type_loan: "Loan",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const mappingData = getMappingDataWithLegal_uuid(uuid);
  const actions: IActionsDynamicModal = {
    add: {
      doc: () => undefined,
      file: (doc_uuid) => undefined,
    },
    remove: {
      all: () => undefined,
      doc: (uuids) => undefined,
      file: (uuids) => undefined,
    },
    update: {
      doc: (uuids, value) => undefined,
      fileDesc: (uuids, value) => undefined,
    },
    chooseFile: () => undefined,
    onClose: () => {
        dispatch(setUuidAttachmentLegalApproval(''));
    },
    onSave: () => undefined,
  };

  return (
    <Fragment>
      <AttachmentDynamic
        open={Boolean(uuid)}
        dataDocs={mappingData}
        docOptions={options}
        viewOnly={true}
        actions={actions}
      />
    </Fragment>
  );
}