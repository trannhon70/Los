import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import AttachmentDynamic, {
  ChooseFileAction,
  IActionsDynamicModal,
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import {
  addNewCollaretalCertificateDocument,
  updateCollaretalCertificateDocument,
  removeCollaretalCertificateDocument,
  removeAllCollaretalCertificateDocument,
  removeCollaretalCertificateFile,
  addNewCollaretalCertificateFile,
  updateCollaretalCertificateFile,
  saveCollaretalCertificateDocument,
  updateDescriptionCollaretalCertificateFile,
} from "features/loan/normal/storage/collateralV2/actions";
import {
  getDocumentLOANormalStoreLegalCertifiCateLand,
  getDocumentLOANormalStoreLegalCertifiCateLandApproval,
  getLoanNormalSubTypeItemsActive,
} from "features/loan/normal/storage/collateralV2/selector";
import * as _ from "lodash";
import {
  ILOANModalDynamicDocument,
  ILOANModalDynamicFile,
  ILOANNormalFile,
} from "types/models/loan/normal/configs/Document";
import { getDataDocumentWithKey } from "features/loan/normal/storage/selectors";
import { ETypeLandName } from "features/loan/normal/storage/collateralV2/case";

interface Props {
  open?: boolean;
  onClose?(): void;
  type_loan?: string;
  activeSubType?: string;
  uuIdData?: string;
  activeUuid?: string;
  typeLand?: string;
  itemType?: "department" | "land" | "market";
  viewOnly?: boolean;
}
const AttachmentModalDocs = ({
  onClose = () => undefined,
  open = false,
  activeSubType = "",
  uuIdData = "",
  type_loan = "Loan",
  activeUuid = "",
  typeLand = "",
  itemType = "land",
  viewOnly = false,
}: Props) => {
  const dispatch = useDispatch();
  const [openDocs, setOpenDocs] = useState<string[]>([]);
  const [saveFlat, setOnSaveFlat] = useState<number>(0);
  const typeDocData = useMemo(() => {
    if (itemType === "land") {
      switch (typeLand) {
        case ETypeLandName.CTXD_GCN:
          return "TAI_SAN_BAO_DAM_PHAP_LY_CTXD_GCN_RIENG";
        case ETypeLandName.LAND:
          return "TAI_SAN_BAO_DAM_PHAP_LY_GCN_DAT";
        default:
          return "TAI_SAN_BAO_DAM_PHAP_LY_GCN_DAT";
      }
    } else if (itemType === "department") {
      return "TAI_SAN_BAO_DAM_PHAP_LY_GCN_CHCC";
    } else if (itemType === "market") {
      return "TAI_SAN_BAO_DAM_PHAP_LY_GCN_TTTM";
    }
    return "";
  }, [typeLand, itemType]);

  const dataSelectFile = useSelector(
    getDataDocumentWithKey(typeDocData + "_" + type_loan)
  );
  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActive(uuIdData, activeSubType)
  );
  const uuidActiveCertificate = activeUuid;


  const options: {
    value: string | number;
    label: string;
    type?: string;
  }[] =
    dataSelectFile?.map((item) => ({
      value: item.code?.toString(),
      label: item.name,
      type: _.get(item, "type", ""),
    })) ?? [];
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: typeDocData,
        type_loan: type_loan,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uuidActiveData: string = uuIdData ?? "";
  const uuidActiveSubtype: string = activeSubType ?? "";
  const uuidActiveitems: string = SubTypeItemsActive ?? "";

  const masterObject = {
    uuidActiveData,
    uuidActiveSubtype,
    uuidActiveitems,
    uuidActiveCertificate,
    itemDocType: itemType,
  };
  const documents = useSelector(
    getDocumentLOANormalStoreLegalCertifiCateLandApproval(
      uuidActiveData,
      uuidActiveSubtype,
      uuidActiveCertificate,
      itemType as string
    )
  );
  const mappingData: ILOANModalDynamicDocument[] = useMemo(() => {
    
    if (!documents) return [];
    return documents.map((doc) => {
      const result: ILOANModalDynamicDocument = {
        uuid: doc.uuid,
        document_id: doc.document_id,
        document_name: doc.document_name,
        childs:
          doc?.child_files?.map((file) => {
            const result: ILOANModalDynamicFile = {
              ...file,
            };
            return result;
          }) ?? [],
      };
      return result;
    });
  }, [documents]);

  const onSaveFileLegal = () => {
    dispatch(saveCollaretalCertificateDocument(documents, masterObject));
    setOnSaveFlat(saveFlat + 1);
  };

  useEffect(() => {
    // mappingData
    let uuidFirstDoc = _.get(
      _.first(_.filter(mappingData, (o) => o?.childs?.length > 0)),
      "uuid"
    );
    if(!uuidFirstDoc) return;

    let temp = [...openDocs, uuidFirstDoc];
    setOpenDocs(temp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveFlat]);

  const chooseFile: ChooseFileAction = ({ uuids }, dataFiles) => {
    const [AllPre = "", doc_uuid = ""] = uuids;
    console.log("AllPre", AllPre);
    const payload: ILOANNormalFile[] = dataFiles.map((file, index) => {
      const result: ILOANNormalFile = {
        content_type: file.type,
        created_at: file.created_at,
        created_by: file.created_by,
        created_by_name: file.created_by_name,
        updated_at: file.updated_at,
        updated_by: file.updated_by,
        updated_by_name: file.updated_by_name,
        description: file.description,
        display_order: index + 1,
        file_id: index,
        name: file.name,
        uuid: file.uuid,
        file_upload: file.file_upload,
      };
      return result;
    });
    dispatch(
      updateCollaretalCertificateFile(payload, {
        ...masterObject,
        uuidDoc: doc_uuid,
      })
    );
  };
  const actions: IActionsDynamicModal = {
    add: {
      doc: ({ action_uuid, uuids }) => {
        dispatch(addNewCollaretalCertificateDocument("", masterObject));
      },
      file: ({ action_uuid, uuids }) => {
        if (!uuids) return;
        const [AllPre = "", doc_uuid = ""] = uuids;

        console.log("AllPre", AllPre);
        dispatch(
          addNewCollaretalCertificateFile("", {
            ...masterObject,
            uuidDoc: doc_uuid,
          })
        );
      },
    },
    remove: {
      all: () => {
        dispatch(removeAllCollaretalCertificateDocument("", masterObject));
      },
      doc: ({ action_uuid, uuids }) => {
        if (!uuids) return;
        const [AllPre = "", doc_uuid = ""] = uuids;
        console.log("AllPre", AllPre);
        dispatch(removeCollaretalCertificateDocument(doc_uuid, masterObject));
      },
      file: ({ action_uuid, uuids }) => {
        if (!uuids) return;
        const [AllPre = "", doc_uuid = "", file_uuid = ""] = uuids;
        console.log("AllPre", AllPre);
        dispatch(
          removeCollaretalCertificateFile(file_uuid, {
            ...masterObject,
            uuidDoc: doc_uuid,
          })
        );
      },
    },
    update: {
      doc: ({ action_uuid, uuids }, value) => {
        if (!uuids) return;
        const [AllPre = "", doc_uuid = ""] = uuids;
        console.log("AllPre", AllPre);

        const label = _.get(
          options.find((it) => it.value.toString() === value.toString()),
          "label",
          ""
        );
        dispatch(
          updateCollaretalCertificateDocument(value, {
            ...masterObject,
            uuidDoc: doc_uuid,
            optionData: { value, label },
          })
        );
      },
      fileDesc: ({ action_uuid, uuids }, value) => {
        const [AllPre = "", doc_uuid = "", file_uuid = ""] = uuids;
        console.log("AllPre", AllPre);
        dispatch(
          updateDescriptionCollaretalCertificateFile(value, {
            ...masterObject,
            uuidDoc: doc_uuid,
            uuidFile: file_uuid,
          })
        );
      },
    },
    chooseFile,
    onClose,
    onSave: onSaveFileLegal,
  };

  return (
    <AttachmentDynamic
      dataDocs={mappingData}
      docOptions={options ?? []}
      open={open}
      actions={actions}
      defaultOpenDocs={openDocs}
      viewOnly={viewOnly}
    />
  );
};

export default AttachmentModalDocs;
