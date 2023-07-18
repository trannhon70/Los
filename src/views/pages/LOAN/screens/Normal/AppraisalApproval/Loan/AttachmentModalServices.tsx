import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import { getDataConfigDocument } from "features/loan/normal/storage/loan/selectors";
import React, { useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILOANModalDynamicDocument, ILOANModalDynamicFile, IResDocument } from "types/models/loan/normal/configs/Document";
import { IResLOANNormalDocumentInfo } from "types/models/loan/normal/storage/LOAN";
import { generateUUID } from "utils";
import AttachmentDynamic, { IActionsDynamicModal } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { IDocDynamicOption } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import * as _ from 'lodash';
export default function AttachmentDynamicModal({ open, onClose = () => undefined, dataDocs = [] }: { open: boolean, onClose: () => void, dataDocs: IResLOANNormalDocumentInfo[] }) {
  const dispatch = useDispatch();
  const documentGrpConfigs = useSelector(getDataConfigDocument());
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "PHUONG_AN_&_NHU_CAU_CTD",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const options: IDocDynamicOption[] = useMemo(() => {
    return documentGrpConfigs.map((opt) => {
      const result: IDocDynamicOption = {
        label: opt?.name ?? "",
        value: opt?.code?.toString() ?? "",
        type: _.get(opt, 'type', ''),
        subDocs:
          opt?.child_list?.map((subOpt) => {
            const result: IDocDynamicOption = {
              label: subOpt?.name ?? "",
              value: subOpt?.code?.toString() ?? "",
              type: _.get(subOpt, 'type', ''),
            };
            return result;
          }) ?? [],
      };
      return result;
    });
  }, [documentGrpConfigs]);
  const action: IActionsDynamicModal = {
    add: {
      doc: ({ uuids, action_uuid }) => undefined,
      file: ({ uuids, action_uuid }) => undefined,
    },
    remove: {
      all: () => undefined,
      doc: ({ uuids, action_uuid }) => undefined,
      file: ({ uuids, action_uuid }) => undefined,
    },
    update: {
      doc: ({ uuids, action_uuid }, value) => undefined,
      fileDesc: ({ uuids, action_uuid }, value) => undefined,
    },
    chooseFile: ({ uuids, action_uuid }, dataFiles) => undefined,
    onClose,
    onSave: () => undefined,
  };
  const mappingData = useMemo(() => {
    return dataDocs.map(doc => {
      const result: ILOANModalDynamicDocument = {
        uuid: generateUUID(),
        document_id: doc.document_id,
        document_name: doc.document_name,
        hasSubDoc: true,
        childs: doc?.document_group?.map(grdoc => {
          const result: ILOANModalDynamicDocument = {
            uuid: generateUUID(),
            document_id: grdoc.document_id,
            document_name: grdoc.document_name,
            childs: grdoc?.child_files?.map((file, index) => {
              const result: ILOANModalDynamicFile = {
                ...file,
                file_id: index,
                display_order: index,
                description: file.description ?? '',
                custom_keys: undefined,
              };
              return result;
            }) ?? []
          }
          return result;
        }) ?? []
      };
      return result;
    })
  }, [dataDocs]);
  return (
    <>
      <AttachmentDynamic
        open={open}
        dataDocs={mappingData}
        actions={action}
        docOptions={options}
        levelsColor={['red', 'blue']}
        viewOnly
      />
    </>
  );
}
