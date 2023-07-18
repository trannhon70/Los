import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import useMasterData from "app/hooks/useMasterData";
import useNotify from "app/hooks/useNotify";
import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import {
  saveLOANNormalStorageICRModalAttachFile
} from "features/loan/normal/storage/icr/actions";
import { EmptyFileICR } from "features/loan/normal/storage/icr/emtyData";
import { getDataConfigDocumentICR, getLOANNormalStorageListDocumentInfosICR } from "features/loan/normal/storage/icr/selector";
import * as _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import {
  ILOANModalDynamicDocument,
  ILOANModalDynamicFile
} from "types/models/loan/normal/configs/Document";
import { ILOANNormalChildfile, ILOANNormalDocumentInfoList, ILOANNormalLOANUpload } from "types/models/loan/normal/storage/ICR";
import { generateLOCALUUID, PREFIX_LOCAL } from "utils";
import AttachmentDynamic, {
  IActionsDynamicModal
} from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic";
import { IDocDynamicOption } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
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
  const notify = useNotify()
  const  { EnvGlobal, register } = useMasterData()
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const dataFilelist = useSelector(getLOANNormalStorageListDocumentInfosICR);
  const documentGrpConfigs = useSelector(getDataConfigDocumentICR());
  
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "XHTDNB",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [localData, setLocalData] = useState<ILOANNormalDocumentInfoList[]>(dataFilelist)

  useEffect(() => {
    if(localData !== dataFilelist){
      setLocalData(dataFilelist)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataFilelist])

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
    if (!localData) return [];
    return localData.map((data) => {
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
  }, [localData]);

  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "PHUONG_AN_&_NHU_CAU_CTD",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSaveFileICR = () => {
    if (localData && localData?.length > 0) {
      const dataUpload: ILOANNormalLOANUpload = {
        declare: "",
        uuid: "",
        dataFile: localData ?? [],
        isDelete: false
      };
      dispatch(saveLOANNormalStorageICRModalAttachFile(dataUpload));
    }
  };

  // const mapFileAfterUpload = (payload : ILOANNormalChildfile[], current: ILOANNormalChildfile[] | null) => {
  //   if(current){
  //     const newCurrentDocs = [...current]
  //     payload.forEach(filePayload => {
  //       const currentIndexFile = newCurrentDocs.findIndex(file=>file.uuid === filePayload.uuid);
  //       if(currentIndexFile === -1){
  //         newCurrentDocs.push(filePayload);
  //         return;
  //       }
  //       newCurrentDocs[currentIndexFile] = {...filePayload};
  //     });
  //     return newCurrentDocs
  //   }
  //   else return [...payload]
  // }

  const onAddttacmentFile = (payload : ILOANNormalChildfile, parent_doc: string, doc_uuid : string, file_uuid: string) => {
    const newlocalData = localData?.map(parentDoc => {
      if(doc_uuid.includes(PREFIX_LOCAL)){
        if(parentDoc.uuid === parent_doc){
          return {
            ...parentDoc,
            document_group: parentDoc.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid) {
                  return {
                    ...doc,
                    child_files: doc.child_files?.map(file => {
                      if(file.uuid === file_uuid){
                        return {...payload}
                      }
                      else return {...file}
                    }) ?? []
                  }
                }
                return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid) {
                  return {
                    ...doc,
                    child_files: doc.child_files?.map(file => {
                      if(file.uuid === file_uuid){
                        return {...payload}
                      }
                      else return {...file}
                    }) ?? []
                  }
                }
                return {...doc}
              }
            })
          }
        }
        else return {...parentDoc}
      }
      else {
        if(parentDoc.document_id?.toString() === parent_doc){
          return {
            ...parentDoc,
            document_group: parentDoc.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid) {
                  return {
                    ...doc,
                    child_files: doc.child_files?.map(file => {
                      if(file.uuid === file_uuid){
                        return {...payload}
                      }
                      else return {...file}
                    }) ?? []
                  }
                }
                return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid) {
                  return {
                    ...doc,
                    child_files: doc.child_files?.map(file => {
                      if(file.uuid === file_uuid){
                        return {...payload}
                      }
                      else return {...file}
                    }) ?? []
                  }
                }
                return {...doc}
              }
            })
          }
        }
        else return {...parentDoc}
      }
    })
    setLocalData(newlocalData)
  }
  const onAddParentDoc = () => {
    const newItem = {
      document_group: [],
      document_id:  "",
      document_name: "",
      uuid: generateLOCALUUID()
    }
    const newlocalData = localData !== undefined ? [...localData, newItem] : [newItem]
    setLocalData(newlocalData)
  }

  const onAddDoc = (parentDoc_uuid: string) => {
    if(parentDoc_uuid.includes(PREFIX_LOCAL)){
      const newLocalData = localData.map(parentDoc => {
        if(parentDoc.uuid === parentDoc_uuid){
          return {
            ...parentDoc,
            document_group : [
              ...parentDoc.document_group,
              {
                document_id: "",
                document_name: "",
                child_files: [],
                uuid: generateLOCALUUID()
              }
            ]
          }
        }
        else return {...parentDoc}
      })
      setLocalData(newLocalData)
    }
    else {
      const newLocalData = localData.map(parentDoc => {
        if(parentDoc.document_id?.toString() === parentDoc_uuid){
          return {
            ...parentDoc,
            document_group : [
              ...parentDoc.document_group,
              {
                document_id: "",
                document_name: "",
                child_files: [],
                uuid: generateLOCALUUID()
              }
            ]
          }
        }
        else return {...parentDoc}
      })
      setLocalData(newLocalData)
    }
  }

  const onAddFile = (parentDoc_uuid: string, doc_uuid: string) => {
    if(parentDoc_uuid.includes(PREFIX_LOCAL)){
      const newLocalData = localData.map(parentDoc => {
        if(parentDoc.uuid === parentDoc_uuid){
          return {
            ...parentDoc,
            document_group : parentDoc.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files ? [...doc.child_files, EmptyFileICR()] : [EmptyFileICR()]
                  }
                }
                else return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files ? [...doc.child_files, EmptyFileICR()] : [EmptyFileICR()]
                  }
                }
                else return {...doc}
              }
            })
          }
        }
        else return {...parentDoc}
      })
      setLocalData(newLocalData)
    }
    else {
      const newLocalData = localData.map(parentDoc => {
        if(parentDoc.document_id?.toString() === parentDoc_uuid){
          return {
            ...parentDoc,
            document_group : parentDoc.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files ? [...doc.child_files, EmptyFileICR()] : [EmptyFileICR()]
                  }
                }
                else return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files ? [...doc.child_files, EmptyFileICR()] : [EmptyFileICR()]
                  }
                }
                else return {...doc}
              }
            })
          }
        }
        else return {...parentDoc}
      })
      setLocalData(newLocalData)
    }
  }

  const onRemoveAll = () => {
    const dataUpload: ILOANNormalLOANUpload = {
      declare: "",
      uuid: "",
      dataFile: [],
      isDelete: true
    };
    dispatch(saveLOANNormalStorageICRModalAttachFile(dataUpload));
  }

  const onRemoveParentDoc = (parentDoc_uuid: string) => {
    const newData = parentDoc_uuid.includes(PREFIX_LOCAL) ? localData.filter(parentDoc => parentDoc.uuid !== parentDoc_uuid) 
                    : localData.filter(parentDoc => parentDoc.document_id?.toString() !== parentDoc_uuid)
    
    const dataUpload: ILOANNormalLOANUpload = {
      declare: "",
      uuid: "",
      dataFile: newData ?? [],
      isDelete: true
    };
    dispatch(saveLOANNormalStorageICRModalAttachFile(dataUpload));
  }

  const onRemoveDoc = (parentDoc_uuid: string, doc_uuid: string) => {
    
    
    let newData :ILOANNormalDocumentInfoList[] = []

    if(parentDoc_uuid.includes(PREFIX_LOCAL)){
      newData = localData.map(parent => {
        if(parent.uuid === parentDoc_uuid){
          return {
            ...parent,
            document_group: doc_uuid.includes(PREFIX_LOCAL) ? parent.document_group.filter(doc => doc.uuid !== doc_uuid) 
                            : parent.document_group.filter(doc => doc.document_id?.toString() !== doc_uuid)
          }
        }
        else return {...parent}
      })
    }
    else {
      newData = localData.map(parent => {
        if(parent.document_id?.toString() === parentDoc_uuid){
          
          return {
            ...parent,
            document_group: doc_uuid.includes(PREFIX_LOCAL) ? parent.document_group.filter(doc => doc.uuid !== doc_uuid) 
                            : parent.document_group.filter(doc => doc.document_id?.toString() !== doc_uuid)
          }
        }
        else return {...parent}
      })
    }

    const dataUpload: ILOANNormalLOANUpload = {
      declare: "",
      uuid: "",
      dataFile: newData ?? [],
      isDelete: true
    };
    dispatch(saveLOANNormalStorageICRModalAttachFile(dataUpload));
  }

  const onRemoveFile = (parentDoc_uuid: string, doc_uuid: string, file_uuid: string) => {
    let newData :ILOANNormalDocumentInfoList[] = []

    if(parentDoc_uuid.includes(PREFIX_LOCAL)){
      newData = localData.map(parent => {
        if(parent.uuid === parentDoc_uuid){
          return {
            ...parent,
            document_group: parent.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files?.filter(file => file.uuid !== file_uuid) ?? null
                  }
                }
                else return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files?.filter(file => file.uuid !== file_uuid) ?? null
                  }
                }
                else return {...doc}
              }
            })
          }
        }
        else return {...parent}
      })
    }
    else {
      newData = localData.map(parent => {
        if(parent.document_id?.toString() === parentDoc_uuid){
          return {
            ...parent,
            document_group: parent.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files?.filter(file => file.uuid !== file_uuid) ?? null
                  }
                }
                else return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files?.filter(file => file.uuid !== file_uuid) ?? null
                  }
                }
                else return {...doc}
              }
            })
          }
        }
        else return {...parent}
      })
    }
    
    const dataUpload: ILOANNormalLOANUpload = {
      declare: "",
      uuid: "",
      dataFile: newData ?? [],
      isDelete: true
    };
    dispatch(saveLOANNormalStorageICRModalAttachFile(dataUpload));
  }

  const onUpdateParentDoc = (parentDoc_uuid : string, value: string | number, label: string) => {
    const newLocalData = localData.map(parent => {
      if(parentDoc_uuid.includes(PREFIX_LOCAL)){
        if(parent.uuid === parentDoc_uuid){
          return {
            ...parent,
            document_id: value,
            document_name: label
          }
        }
        else return {...parent}
      }
      else {
        if(parent.document_id?.toString() === parentDoc_uuid){
          return {
            ...parent,
            document_id: value,
            document_name: label
          }
        }
        else return {...parent}
      }
    })
    setLocalData(newLocalData)
  }

  const onUpdateDoc = (parentDoc_uuid : string, doc_uuid: string, value: string | number, label: string) => {
    const newLocalData = localData.map(parent => {
      if(parentDoc_uuid.includes(PREFIX_LOCAL)){
        if(parent.uuid === parentDoc_uuid){
          return {
            ...parent,
            document_group: parent.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid){
                  return {
                    ...doc,
                    document_id: value,
                    document_name: label
                  }
                }
                else return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid){
                  return {
                    ...doc,
                    document_id: value,
                    document_name: label
                  }
                }
                else return {...doc}
              }
            })
          }
        }
        else return {...parent}
      }
      else {
        if(parent.document_id?.toString() === parentDoc_uuid){
          return {
            ...parent,
            document_group: parent.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid){
                  return {
                    ...doc,
                    document_id: value,
                    document_name: label
                  }
                }
                else return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid){
                  return {
                    ...doc,
                    document_id: value,
                    document_name: label
                  }
                }
                else return {...doc}
              }
            })
          }
        }
        else return {...parent}
      }
    })
    setLocalData(newLocalData)
  }
  
  const onUpdateFileDescription = (parentDoc_uuid: string, doc_uuid: string, file_uuid: string, value: string) => {
    const newLocalData = localData.map(parent => {
      if(parentDoc_uuid.includes(PREFIX_LOCAL)){
        if(parent.uuid === parentDoc_uuid){
          return {
            ...parent,
            document_group: parent.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files?.map(file => {
                      if(file.uuid === file_uuid) {
                        return {
                          ...file,
                          description: value
                        }
                      }
                      else return {...file}
                    }) ?? []
                  }
                }
                else return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files?.map(file => {
                      if(file.uuid === file_uuid) {
                        return {
                          ...file,
                          description: value
                        }
                      }
                      else return {...file}
                    }) ?? []
                  }
                }
                else return {...doc}
              }
            })
          }
        }
        else return {...parent}
      }
      else {
        if(parent.document_id?.toString() === parentDoc_uuid){
          return {
            ...parent,
            document_group: parent.document_group.map(doc => {
              if(doc_uuid.includes(PREFIX_LOCAL)){
                if(doc.uuid === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files?.map(file => {
                      if(file.uuid === file_uuid) {
                        return {
                          ...file,
                          description: value
                        }
                      }
                      else return {...file}
                    }) ?? []
                  }
                }
                else return {...doc}
              }
              else {
                if(doc.document_id?.toString() === doc_uuid){
                  return {
                    ...doc,
                    child_files: doc.child_files?.map(file => {
                      if(file.uuid === file_uuid) {
                        return {
                          ...file,
                          description: value
                        }
                      }
                      else return {...file}
                    }) ?? []
                  }
                }
                else return {...doc}
              }
            })
          }
        }
        else return {...parent}
      }
    })
    setLocalData(newLocalData)
  }

  const actions: IActionsDynamicModal = {
    add: {
      doc: ({ uuids, action_uuid }) => {
        if (uuids.length < 2) {
          onAddParentDoc()
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [AllPre, parentDoc_uuid] = uuids;
          onAddDoc(parentDoc_uuid)
        }
      },
      file: ({ uuids, action_uuid }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [AllPre, parentDoc_uuid, doc_uuid] = uuids;
        onAddFile(parentDoc_uuid, doc_uuid)
      },
    },
    remove: {
      all: () => {
        onRemoveAll()
      },
      doc: ({ uuids, action_uuid }) => {
        if (uuids.length < 3) {
          // PARENT_DOC
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [AllPre, parentDoc_uuid] = uuids;
          onRemoveParentDoc(parentDoc_uuid)
        } else {
          // DOC
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [AllPre = "", parentDoc_uuid = "", doc_uuid = ""] = uuids;
          onRemoveDoc(parentDoc_uuid, doc_uuid)
        }
      },
      file: ({ uuids, action_uuid }) => {
        // DOC
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ AllPre = "",
          parentDoc_uuid = "",
          doc_uuid = "",
          file_uuid = "",
        ] = uuids;
        onRemoveFile(parentDoc_uuid, doc_uuid,file_uuid)
      },
    },
    update: {
      doc: ({ uuids, action_uuid }, value, option) => {
        if (uuids.length < 3) {
          // PARENT_DOC
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [AllPre, parentDoc_uuid] = uuids;
          onUpdateParentDoc(parentDoc_uuid, value, option?.label ?? "")
        } else {
          // DOC
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [AllPre = "", parentDoc_uuid = "", doc_uuid = ""] = uuids;
          onUpdateDoc(parentDoc_uuid, doc_uuid, value, option?.label ?? "")
        }
      },
      fileDesc: ({ uuids, action_uuid }, value) => {
        // DOC
        const [
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          AllPre = "",
          parentDoc_uuid = "",
          doc_uuid = "",
          file_uuid = "",
        ] = uuids;

        onUpdateFileDescription(parentDoc_uuid, doc_uuid, file_uuid, value)
      },
    },
    chooseFile: ({ uuids, action_uuid }, dataFiles) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [AllPre = "", parentDoc_uuid = "", doc_uuid = "", file_uuid = ""] =
        uuids;
      // console.log("AllPre", AllPre);
      // ILOANNormalChildfile
      const size  = Number(EnvGlobal.find(i => i.code === 'FILE_MAX_SIZE')?.value ?? 0)
      dataFiles.forEach((file) => {
        if(file.size && file.size > size/1024){
          notify(`Dung lượng file không được lớn hơn ${size/1024/1024}MB`,'error')
        }else{
          const result: ILOANNormalChildfile = {
            uuid: file.uuid,
            content_type: file.type,
            created_at: file.created_at,
            created_by: "",
            created_by_name: "",
            updated_by: "",
            updated_by_name: "",
            file_upload: file.file_upload,
            name: file.name,
            size: null,
            type: null,
            updated_at: file.updated_at,
            version: null,
            custom_keys: undefined,
            description: file.description,
          };
          onAddttacmentFile(result, parentDoc_uuid, doc_uuid, file_uuid)
        }
      });
    },
    onClose:()=>{
      onClose();
    },
    onSave: onSaveFileICR,
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
