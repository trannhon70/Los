import React, { useLayoutEffect, useMemo } from "react";

import AttachmentDynamic, {
  IActionsDynamicModal,
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { IDocDynamicOption } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import {
  ILOANModalDynamicDocument,
  ILOANModalDynamicFile,
} from "types/models/loan/normal/configs/Document";
import * as _ from 'lodash';
import { getDataConfigDocumentICR, getLOANNormalStorageListDocumentInfosICR } from "features/loan/normal/storage/icr/selector";
import {
  addNewLOANNormalStorageICRDoc,
  addNewLOANNormalStorageICRFile,
  addNewLOANNormalStorageICRParentDoc,
  removeAllLOANNormalStorageICRParentDoc,
  removeLOANNormalStorageICRDoc,
  removeLOANNormalStorageICRFile,
  removeLOANNormalStorageICRParentDoc,
  saveLOANNormalStorageICRModalAttachFile,
  setDataLOANNormalStorageICRDoc,
  setDataLOANNormalStorageICRFile,
  setDataLOANNormalStorageICRParentDoc,
  setDescriptionLOANNormalStorageICRFile
} from "features/loan/normal/storage/icr/actions";
import { ILOANNormalChildfile, ILOANNormalLOANUpload } from "types/models/loan/normal/storage/ICR";
import { getLOANApprovalICRoDocument } from "features/loan/normal/storageApproval/icr/selector";
interface Props {
  open?: boolean;
  onClose?(): void;
  viewOnly?: boolean;
}
const AttachmentModalServices = ({
  onClose = () => undefined,
  open = false,
  viewOnly = false,
}: Props) => {
  const dispatch = useDispatch();
  const dataFileList = useSelector(getLOANApprovalICRoDocument);
  const documentGrpConfigs = useSelector(getDataConfigDocumentICR());
  const options: IDocDynamicOption[] = useMemo(() => {
    return documentGrpConfigs.map((opt) => {
      const result: IDocDynamicOption = {
        label: opt?.name ?? "",
        value: opt?.code?.toString() ?? "",
        type:_.get(opt,'type',''),
        subDocs:
          opt?.child_list?.map((subOpt) => {
            const result: IDocDynamicOption = {
              label: subOpt?.name ?? "",
              value: subOpt?.code?.toString() ?? "",
              type:_.get(subOpt,'type',''),
            };
            return result;
          }) ?? [],
      };
      return result;
    });
  }, [documentGrpConfigs]);
  const mappingData: ILOANModalDynamicDocument[] = useMemo(() => {
    if (!dataFileList.docs) return [];
    return dataFileList.docs.map((data) => {
      const result: ILOANModalDynamicDocument = {
        uuid: data?.uuid ?? "",
        document_id: data?.document_id ?? "",
        document_name: data?.document_name ?? "",
        hasSubDoc: true,
        childs: data.document_group.map((childDoc) => {
          const result: ILOANModalDynamicDocument = {
            uuid: childDoc?.uuid ?? "",
            document_id: childDoc?.document_id ?? "",
            document_name: childDoc?.document_name ?? "",
            // hasSubDoc:false,
            childs:
              childDoc?.child_files?.map((file, index) => {
                const result: ILOANModalDynamicFile = {
                  ...file,
                  file_id: index,
                  display_order: index,
                  description: file.description ?? "",
                  custom_keys: undefined,
                };
                return result;
              }) ?? [],
          };
          return result;
        }),
      };
      return result;
    });
  }, [dataFileList]);

  const onSave = () => {
    const dataUpload: ILOANNormalLOANUpload = {
      declare: "",
      uuid: "",
      dataFile: dataFileList.docs ?? [],
    };
    dispatch(saveLOANNormalStorageICRModalAttachFile(dataUpload));
  };

  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "XHTDNB",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions: IActionsDynamicModal = {
    add: {
      doc: ({ uuids, action_uuid }) => {
        if (uuids.length < 2) {
          dispatch(addNewLOANNormalStorageICRParentDoc());
        } else {
          const [AllPre, parentDoc_uuid] = uuids;
          console.log("AllPre", AllPre);
          dispatch(
            addNewLOANNormalStorageICRDoc({
              parentDoc_uuid,
            })
          );
        }
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, parentDoc_uuid, doc_uuid] = uuids;
        console.log("AllPre", AllPre);
        dispatch(
          addNewLOANNormalStorageICRFile({
            parentDoc_uuid,
            doc_uuid,
          })
        );
      },
    },
    remove: {
      all: () => {
        dispatch(removeAllLOANNormalStorageICRParentDoc());
      },
      doc: ({ uuids, action_uuid }) => {
        if (uuids.length < 3) {
          // PARENT_DOC
          const [AllPre, parentDoc_uuid] = uuids;
          console.log("AllPre", { AllPre, parentDoc_uuid });
          dispatch(
            removeLOANNormalStorageICRParentDoc(parentDoc_uuid)
          );
        } else {
          // DOC
          const [AllPre = "", parentDoc_uuid = "", doc_uuid = ""] = uuids;
          console.log("AllPre", { AllPre, parentDoc_uuid, doc_uuid });
          dispatch(
            removeLOANNormalStorageICRDoc(doc_uuid, {
              parentDoc_uuid,
            })
          );
        }
      },
      file: ({ uuids, action_uuid }) => {
        // DOC
        const [
          AllPre = "",
          parentDoc_uuid = "",
          doc_uuid = "",
          file_uuid = "",
        ] = uuids;
        console.log("AllPre", { AllPre, parentDoc_uuid, doc_uuid, file_uuid });
        dispatch(
          removeLOANNormalStorageICRFile(file_uuid, {
            parentDoc_uuid,
            doc_uuid,
          })
        );
      },
    },
    update: {
      doc: ({ uuids, action_uuid }, value, option) => {
        if (uuids.length < 3) {
          // PARENT_DOC
          const [AllPre, parentDoc_uuid] = uuids;
          console.log("AllPre", AllPre);
          dispatch(
            setDataLOANNormalStorageICRParentDoc(value, {
              parentDoc_uuid,
              currentData: {
                label: option?.label ?? "",
                value: option?.value ?? "",
              },
            })
          );
        } else {
          // DOC
          const [AllPre = "", parentDoc_uuid = "", doc_uuid = ""] = uuids;
          console.log("AllPre", AllPre);
          dispatch(
            setDataLOANNormalStorageICRDoc(value, {
              parentDoc_uuid,
              doc_uuid,
              currentData: {
                label: option?.label ?? "",
                value: option?.value ?? "",
              },
            })
          );
        }
      },
      fileDesc: ({ uuids, action_uuid }, value) => {
        // DOC
        const [
          AllPre = "",
          parentDoc_uuid = "",
          doc_uuid = "",
          file_uuid = "",
        ] = uuids;
        console.log("AllPre", AllPre);
        dispatch(
          setDescriptionLOANNormalStorageICRFile(value ?? "", {
            parentDoc_uuid,
            doc_uuid,
            file_uuid,
          })
        );
      },
    },
    chooseFile: ({ uuids, action_uuid }, dataFiles) => {
      const [AllPre = "", parentDoc_uuid = "", doc_uuid = "", file_uuid = ""] =
        uuids;
      console.log("AllPre", AllPre);
      // ILOANNormalChildfile
      dataFiles.forEach((file) => {
        const result: ILOANNormalChildfile = {
          uuid: file.uuid,
          content_type: file.type,
          created_at: file.created_at,
          file_upload: file.file_upload,
          name: file.name,
          size: null,
          type: null,
          updated_at: null,
          created_by: "",
          created_by_name: "",
          updated_by: "",
          updated_by_name: "",
          version: null,
          custom_keys: undefined,
          description: file.description,
        };
        dispatch(
          setDataLOANNormalStorageICRFile(result, {
            parentDoc_uuid,
            doc_uuid,
            file_uuid,
          })
        );
      });
    },
    onClose,
    onSave,
  };

  return (
    <AttachmentDynamic
      dataDocs={mappingData}
      docOptions={options}
      open={open}
      actions={actions}
      viewOnly={viewOnly}
      levelsColor={["blue", "red"]}
    />
  );
};

export default AttachmentModalServices;
