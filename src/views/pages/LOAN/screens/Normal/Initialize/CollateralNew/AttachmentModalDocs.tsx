import useMasterData from 'app/hooks/useMasterData';
import useNotify from 'app/hooks/useNotify';
import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import {
  saveCollaretalFile
} from "features/loan/normal/storage/collateralV2/actions";
import { ETypeLandName } from "features/loan/normal/storage/collateralV2/case";
import {
  getDocumentLOANormalStoreLegalCertifiCateLand,
  getLoanNormalCertificateActive,
  getLoanNormalSubTypeItemsActive
} from "features/loan/normal/storage/collateralV2/selector";
import { getDataDocumentWithKey } from "features/loan/normal/storage/selectors";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ILOANNormalDocument
} from "types/models/loan/normal/configs/Document";
import { PREFIX_LOCAL } from "utils";
import AttachmentDynamic, {
  IActionsDynamicModal
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { useDocumentCollateral } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";

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
  const notify = useNotify()
  const { EnvGlobal, register } = useMasterData()
  
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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
  const uuidActiveCertificate = useSelector(getLoanNormalCertificateActive(uuIdData,activeSubType,SubTypeItemsActive, typeLand))
  // const uuidActiveCertificate = activeUuid;
  // console.log(typeLand,'typeLand')
  // const options: {
  //   value: string | number;
  //   label: string;
  //   type?: string;
  // }[] =
  //   dataSelectFile?.map((item) => ({
  //     value: item.code?.toString(),
  //     label: item.name,
  //     type: _.get(item, "type", ""),
  //   })) ?? [];

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

  const extraData = {
    uuidActiveData,
    uuidActiveSubtype,
    uuidActiveitems,
    uuidActiveCertificate,
    itemDocType: itemType,
  };
  const documents = useSelector(
    getDocumentLOANormalStoreLegalCertifiCateLand(
      uuidActiveData,
      uuidActiveSubtype,
      uuidActiveCertificate,
      itemType as string
    )
  );
  
  const [localData, setLocalData] = useState<ILOANNormalDocument[]>(documents)

  useEffect(() => {
    if(documents !== localData) {
      setLocalData(documents)
    }
  },[documents])
  
  const { mappingDocumentCollateral, mappingOptions, useActionHelpers } = useDocumentCollateral();
  
  const mappingData = useMemo(() => mappingDocumentCollateral(localData), [localData]);
  const actionHelpers = useActionHelpers(localData);
  const options = mappingOptions(dataSelectFile);
  
  // const mappingData: ILOANModalDynamicDocument[] = useMemo(() => {
  //   if (!documents) return [];
  //   return documents.map((doc) => {
  //     const result: ILOANModalDynamicDocument = {
  //       uuid: doc.uuid,
  //       document_id: doc.document_id,
  //       document_name: doc.document_name,
  //       childs:
  //         doc?.child_files?.map((file) => {
  //           const result: ILOANModalDynamicFile = {
  //             ...file,
  //           };
  //           return result;
  //         }) ?? [],
  //     };
  //     return result;
  //   });
  // }, [documents]);

  // const onSaveFileLegal = () => {
  //   dispatch(saveCollaretalCertificateDocument(documents, masterObject));
  //   // setOnSaveFlat(saveFlat + 1);
  // };

  // useEffect(() => {
  //   // mappingData
  //   let uuidFirstDoc = _.get(
  //     _.first(_.filter(mappingData, (o) => o?.childs?.length > 0)),
  //     "uuid"
  //   );
  //   if(!uuidFirstDoc) return;

  //   let temp = [...openDocs, uuidFirstDoc];
  //   setOpenDocs(temp);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [saveFlat]);

  // const chooseFile: ChooseFileAction = ({ uuids }, dataFiles) => {
  //   const [AllPre = "", doc_uuid = ""] = uuids;
  //   console.log("AllPre", AllPre);
  //   const isOverSize = dataFiles.every(i=>i.size && i.size > 5000)
  //   const payload: ILOANNormalFile[] = dataFiles.map((file, index) => {
  //     const result: ILOANNormalFile = {
  //       content_type: file.type,
  //       created_at: file.created_at,
  //       created_by: file.created_by,
  //       description: file.description,
  //       display_order: index + 1,
  //       file_id: index,
  //       name: file.name,
  //       uuid: file.uuid,
  //       file_upload: file.file_upload,
  //     };
  //     return result;
  //   });
  //  if(isOverSize){
  //   notify('Dung lượng file không được lớn hơn 5MB','error')
  //  }else{
  //   dispatch(
  //     updateCollaretalCertificateFile(payload, {
  //       ...masterObject,
  //       uuidDoc: doc_uuid,
  //     })
  //   );
  //  }
  // };

  const action: IActionsDynamicModal = {
    add: {
      doc: ({ uuids, action_uuid }) => {
        const newData = actionHelpers.add.doc();
        setLocalData(newData)
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.add.file(doc_uuid);
        setLocalData(newData)
      },
    },
    remove: {
      all: () => {
        const newData = actionHelpers.remove.all();
        dispatch(
          saveCollaretalFile("REST", {
            listFile: newData,
            type: "Certificate",
            extraData,
            isDelete: true
          })
        );
        // dispatch(
        //   removeActionCollaretalDocument("", {
        //     type: "LandCTXDGCN",
        //     extraData,
        //   })
        // );
      },
      doc: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.remove.doc(doc_uuid);
        dispatch(
          saveCollaretalFile("REST", {
            listFile: newData,
            type: "Certificate",
            extraData,
            isDelete: true
          })
        );
        // onChange(newData);
        // dispatch(
        //   removeActionCollaretalDocument(action_uuid, {
        //     type: "LandCTXDGCN",
        //     extraData,
        //   })
        // );
      },
      file: ({ uuids, action_uuid }) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.remove.file(doc_uuid, file_uuid);

        if(file_uuid.includes(PREFIX_LOCAL)){
          notify("Xóa thành công", "success")
          setLocalData(newData)
        }
        else{
          dispatch(
            saveCollaretalFile("REST", {
              listFile: newData,
              type: "Certificate",
              extraData,
              isDelete: true
            })
          );
        }
        
        // onChange(newData);
        // dispatch(
        //   removeActionCollaretalDocument(action_uuid, {
        //     type: "LandCTXDGCN",
        //     extraData,
        //   })
        // );
      },
    },
    update: {
      doc: ({ uuids, action_uuid }, value, optionData) => {
        const [AllPre, doc_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.update.doc(
          doc_uuid,
          value ?? "",
          optionData
        );
        setLocalData(newData)
      },
      fileDesc: ({ uuids, action_uuid }, value) => {
        const [AllPre, doc_uuid, file_uuid] = uuids;
        // console.log("AllPre", AllPre);
        const newData = actionHelpers.update.fileDesc(
          doc_uuid,
          file_uuid,
          value
        );
        setLocalData(newData)
      },
    },
    chooseFile: ({ uuids, action_uuid }, dataFiles) => {
      const [AllPre, doc_uuid, file_uuid] = uuids;
      // console.log("AllPre", AllPre);
      const newData = actionHelpers.chooseFile(doc_uuid, file_uuid, dataFiles);
      const size  = Number(EnvGlobal.find(i => i.code === 'FILE_MAX_SIZE')?.value ?? 0)
      const isOverSize = dataFiles.every((i)=> {
        return i.size && i.size > size/1024})
      if(isOverSize){
        notify(`Dung lượng file không được lớn hơn ${size/1024/1024}MB`,'error')
      }else{
        setLocalData(newData)
      }
    },
    onClose,
    onSave: () => {
      dispatch(
        saveCollaretalFile("REST", {
          listFile: localData,
          type: "Certificate",
          extraData,
          isDelete: false
        })
      );
      // dispatch(
      //   saveCollaretalDocument(data, {
      //     type: "LandCTXDGCN",
      //     extraData,
      //   })
      // );
    },
  };
  
  // const actions: IActionsDynamicModal = {
  //   add: {
  //     doc: ({ action_uuid, uuids }) => {
  //       dispatch(addNewCollaretalCertificateDocument("", masterObject));
  //     },
  //     file: ({ action_uuid, uuids }) => {
  //       if (!uuids) return;
  //       const [AllPre = "", doc_uuid = ""] = uuids;

  //       console.log("AllPre", AllPre);
  //       dispatch(
  //         addNewCollaretalCertificateFile("", {
  //           ...masterObject,
  //           uuidDoc: doc_uuid,
  //         })
  //       );
  //     },
  //   },
  //   remove: {
  //     all: () => {
  //       dispatch(removeAllCollaretalCertificateDocument("", masterObject));
  //     },
  //     doc: ({ action_uuid, uuids }) => {
  //       if (!uuids) return;
  //       const [AllPre = "", doc_uuid = ""] = uuids;
  //       console.log("AllPre", AllPre);
  //       dispatch(removeCollaretalCertificateDocument(doc_uuid, masterObject));
  //     },
  //     file: ({ action_uuid, uuids }) => {
  //       if (!uuids) return;
  //       const [AllPre = "", doc_uuid = "", file_uuid = ""] = uuids;
  //       console.log("AllPre", AllPre);
  //       dispatch(
  //         removeCollaretalCertificateFile(file_uuid, {
  //           ...masterObject,
  //           uuidDoc: doc_uuid,
  //         })
  //       );
  //     },
  //   },
  //   update: {
  //     doc: ({ action_uuid, uuids }, value) => {
  //       if (!uuids) return;
  //       const [AllPre = "", doc_uuid = ""] = uuids;
  //       console.log("AllPre", AllPre);

  //       const label = _.get(
  //         options.find((it) => it.value.toString() === value.toString()),
  //         "label",
  //         ""
  //       );
  //       dispatch(
  //         updateCollaretalCertificateDocument(value, {
  //           ...masterObject,
  //           uuidDoc: doc_uuid,
  //           optionData: { value, label },
  //         })
  //       );
  //     },
  //     fileDesc: ({ action_uuid, uuids }, value) => {
  //       const [AllPre = "", doc_uuid = "", file_uuid = ""] = uuids;
  //       console.log("AllPre", AllPre);
  //       dispatch(
  //         updateDescriptionCollaretalCertificateFile(value, {
  //           ...masterObject,
  //           uuidDoc: doc_uuid,
  //           uuidFile: file_uuid,
  //         })
  //       );
  //     },
  //   },
  //   chooseFile,
  //   onClose,
  //   onSave: onSaveFileLegal,
  // };


  return (
    <AttachmentDynamic
      dataDocs={mappingData}
      docOptions={options ?? []}
      open={open}
      actions={action}
      viewOnly={viewOnly}
    />
  );
};

export default AttachmentModalDocs;
