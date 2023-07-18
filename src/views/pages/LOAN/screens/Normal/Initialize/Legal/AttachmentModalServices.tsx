import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import { updatedOldDataLOANNormalLegalDocument, uploadLegalFileMulti } from "features/loan/normal/storage/legal/actions";
import {
  dataDocumentLegal,
  getDeclareTypeWithUuid,
  getListFile
} from "features/loan/normal/storage/legal/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  ILOANNormalChildFile,
  ILOANNormalStorageLegalFile,
  ILOANNormalUpload
} from "types/models/loan/normal/storage/Legal";
import AttachmentDynamic, {
  ChooseFileAction,
  IActionsDynamicModal
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";

import useNotify from "app/hooks/useNotify";
import { generateEmptyChildFile, generateEmptyFile } from "features/loan/normal/storage/legal/generateEmptyLegal";
import * as _ from "lodash";
import {
  ILOANModalDynamicDocument,
  ILOANModalDynamicFile
} from "types/models/loan/normal/configs/Document";
import { generateLOCALUUID, PREFIX_LOCAL } from "utils";
import { IDocDynamicOption } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import useMasterData from "app/hooks/useMasterData";
interface Props {
  open?: boolean;
  uuidActive?: string;
  onClose?(): void;
  viewOnly?: boolean;
}
const AttachmentModalServices = ({
  onClose = () => undefined,
  open = false,
  uuidActive = "",
  viewOnly = false,
}: Props) => {
  const dispatch = useDispatch();
  const notify = useNotify()
  const  { EnvGlobal, register } = useMasterData()
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const declareType = useSelector(getDeclareTypeWithUuid(uuidActive));
  //options doc
  const dataSelectFile = useSelector(dataDocumentLegal);
  const options: IDocDynamicOption[] =
    dataSelectFile?.map((item) => ({
      value: item.code,
      label: item.name,
      type:_.get(item,'type',''),
      subDocs: [],
    })) ?? [];

  // list data
  const dataFileList = useSelector(
    getListFile(declareType ?? "", uuidActive ?? "")
  );
  
  const [dataFileLocal, setdataFileLocal] = useState<ILOANNormalStorageLegalFile[] | undefined>(dataFileList)
  
  useEffect(() => {
    setdataFileLocal(dataFileList)
  },[dataFileList])

  const mappingData: ILOANModalDynamicDocument[] = useMemo(() => {
    if (!dataFileLocal) return [];
    return dataFileLocal.map((data) => {
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
  }, [dataFileLocal]);

  const onSaveFileLegal = () => {
    if (dataFileLocal && dataFileLocal?.length > 0) {
      const dataUpload: ILOANNormalUpload = {
        dataFile: (dataFileLocal ?? []) as ILOANNormalStorageLegalFile[],
        declare: declareType ?? "",
        uuidUser: uuidActive ?? "",
        type: 'save'
      };
      dispatch(uploadLegalFileMulti(dataUpload));
    }
  };

  const mapFileAfterUpload = (payload : ILOANNormalChildFile[], current: ILOANNormalChildFile[]) => {
    const newCurrentDocs = [...current]
    payload.forEach(filePayload => {
      const currentIndexFile = newCurrentDocs.findIndex(file=>file.uuid === filePayload.uuid);
      if(currentIndexFile === -1){
        newCurrentDocs.push(filePayload);
        return;
      }
      newCurrentDocs[currentIndexFile] = {...filePayload};
    });
    return newCurrentDocs
  }
  const onAddttacmentFile = (payload : ILOANNormalChildFile[], doc_uuid : string) => {
    const newDataFileLocal = dataFileLocal?.map(doc => {
      if(doc_uuid.includes(PREFIX_LOCAL)){
        if(doc.uuidActiveFile === doc_uuid){
          return {
            ...doc,
            child_files: [...mapFileAfterUpload(payload, doc.child_files)]
          }
        }
        else return {...doc}
      }
      else {
        if(doc.document_id.toString() === doc_uuid){
          return {
            ...doc,
            child_files: [...mapFileAfterUpload(payload, doc.child_files)]
          }
        }
        else return {...doc}
      }
      
    })
    setdataFileLocal(newDataFileLocal)
  }

  const onAddDataFile = () => {
    const newItem = {
      ...generateEmptyFile(),
      uuidActiveFile: generateLOCALUUID()
    }
    const newDataFileLocal = dataFileLocal !== undefined ? [...dataFileLocal, newItem] : [newItem]
    setdataFileLocal(newDataFileLocal)
  }

  const onAddDataChildFile = (doc_uuid: string) => {
    const newItem = {
      ...generateEmptyChildFile(),
       uuid: generateLOCALUUID()
    }
    const newDataFileLocal = dataFileLocal?.map(doc => {
      if(doc_uuid.includes(PREFIX_LOCAL)){
        if(doc.uuidActiveFile === doc_uuid){
          return {
            ...doc,
            child_files: [...doc.child_files, newItem]
          }
        }
        else return {...doc}
      }
      else {
        if(doc.document_id.toString() === doc_uuid){
          return {
            ...doc,
            child_files: [...doc.child_files, newItem]
          }
        }
        else return {...doc}
      }
    })
    setdataFileLocal(newDataFileLocal)
  }

  const onHanldeChangeSelectFileList = (value : string, doc_uuid : string, label : string) => {
    const newDataFileLocal = dataFileLocal?.map(doc => {
      if(doc_uuid.includes(PREFIX_LOCAL)){
        if(doc.uuidActiveFile === doc_uuid){
          doc.document_id = value;
          doc.document_name = label;
        }
        return {...doc}
      }
      else {
        if(doc.document_id.toString() === doc_uuid){
          doc.document_id = value;
          doc.document_name = label;
        }
        return {...doc}
      }
    })

    setdataFileLocal(newDataFileLocal)
  }
  const onSetAddttacmentContent = (value : string, doc_uuid : string, file_uuid : string) => {
    const newDataFileLocal = dataFileLocal?.map(doc => {
      if(doc_uuid.includes(PREFIX_LOCAL)){
        if(doc.uuidActiveFile === doc_uuid){
          return {
            ...doc,
            child_files: doc.child_files.map(child => {
              if(child.uuid === file_uuid) {
                return {
                  ...child,
                  description: value
                }
              }
              else return {...child}
            })
          }
        }
        return {...doc}
      }
      else {
        if(doc.document_id.toString() === doc_uuid){
          return {
            ...doc,
            child_files: doc.child_files.map(child => {
              if(child.uuid === file_uuid) {
                return {
                  ...child,
                  description: value
                }
              }
              else return {...child}
            })
          }
        }
        return {...doc}
      }
      
    })

    setdataFileLocal(newDataFileLocal)
  }

  const onDeleteDataLegalAllFile = () => {
    const dataUpload: ILOANNormalUpload = {
      dataFile: [],
      declare: declareType ?? "",
      uuidUser: uuidActive ?? "",
      type: 'delete'
    };
    dispatch(uploadLegalFileMulti(dataUpload));
  }

  const onDeleteDataFile = (doc_uuid : string) => {
    const newDataFile = doc_uuid.includes(PREFIX_LOCAL) ? dataFileLocal?.filter(doc => doc.uuidActiveFile !== doc_uuid) ?? [] : dataFileLocal?.filter(doc => doc.document_id.toString() !== doc_uuid) ?? []
    const dataUpload: ILOANNormalUpload = {
      dataFile: newDataFile,
      declare: declareType ?? "",
      uuidUser: uuidActive ?? "",
      type: 'delete'
    };
    dispatch(uploadLegalFileMulti(dataUpload));
  }

  const onDeleteDataChildFile = (file_uuid: string, doc_uuid: string) => {
    const dataUpload: ILOANNormalUpload = {
      dataFile: dataFileLocal?.map(doc => {
        if(doc_uuid.includes(PREFIX_LOCAL)){
          if(doc.uuidActiveFile === doc_uuid){
            return {
              ...doc,
              child_files: doc.child_files.filter(child => child.uuid !== file_uuid)
            }
          }
          else return {...doc}
        }
        else {
          if(doc.document_id.toString() === doc_uuid){
            return {
              ...doc,
              child_files: doc.child_files.filter(child => child.uuid !== file_uuid)
            }
          }
          else return {...doc}
        }
        
      }) ?? [],
      declare: declareType ?? "",
      uuidUser: uuidActive ?? "",
      type: 'delete'
    };
    dispatch(uploadLegalFileMulti(dataUpload));
  }

  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "PHAP_LY",
        type_loan: "Loan",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chooseFile: ChooseFileAction = (uuidData, dataFiles) => {
    const [allPre, doc_uuid] = uuidData.uuids;
    const size  = Number(EnvGlobal.find(i => i.code === 'FILE_MAX_SIZE')?.value ?? 0)
    const isOverSize = dataFiles.every(i=> i.size && i.size > size/1024)
    const payload: ILOANNormalChildFile[] = dataFiles.map((file, i) => {
      const result: ILOANNormalChildFile = {
        ...file,
        content_type: file.type,
        file_id: i,
        display_order: i,
        custom_keys: {
          idDoc: file.custom_keys?.doc_id ?? "",
          local_id: file.custom_keys?.local_id ?? "",
          description: file.custom_keys?.description ?? "",
        },
      };
      return result;
    });
    if(isOverSize){
      notify(`Dung lượng file không được lớn hơn ${size/1024/1024}MB`,'error')
    }else{
      onAddttacmentFile(payload, doc_uuid)
    }
   
  };
  const actions: IActionsDynamicModal = {
    add: {
      doc: () => onAddDataFile(),
      file: ({ action_uuid, uuids }) => {
        const [allPre, doc_uuid] = uuids;
        if (action_uuid === doc_uuid) {
          onAddDataChildFile(doc_uuid)
        }
      },
    },
    remove: {
      all: () => {
        onDeleteDataLegalAllFile()
      },
      doc: ({ uuids }) => {
        const [allPre, doc_uuid] = uuids;
        onDeleteDataFile(doc_uuid)
      },
      file: ({ action_uuid, uuids }) => {
        const [allPre, doc_uuid, file_uuid] = uuids;
        onDeleteDataChildFile(file_uuid, doc_uuid)
      },
    },
    update: {
      doc: ({ action_uuid, uuids }, value) => {
        const [allPre, doc_uuid] = uuids;
        const label = _.get(
          options.find((it) => it?.value?.toString() === value.toString()),
          "label",
          ""
        );
        onHanldeChangeSelectFileList(value, doc_uuid, label)
      },
      fileDesc: ({ action_uuid, uuids }, value) => {
        const [allPre, doc_uuid, file_uuid] = uuids;
        onSetAddttacmentContent(value, doc_uuid, file_uuid)
      },
    },
    chooseFile,
    onClose:()=>{
      onClose();
    },
    onSave: onSaveFileLegal,
  };

  return (
    <AttachmentDynamic
      dataDocs={mappingData}
      docOptions={options ?? []}
      open={open}
      actions={actions}
      viewOnly={viewOnly}
    />
  );
};

export default AttachmentModalServices;
