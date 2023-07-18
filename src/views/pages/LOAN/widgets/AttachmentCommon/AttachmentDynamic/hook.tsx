import { getBranchCodeUser } from "features/loan/normal/storage/legal/selectors";
import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { generateLOCALUUID, PREFIX_LOCAL } from "utils";
import * as _ from "lodash";
import { IActionsDynamicModal } from ".";
import { IAttachModalFile } from "../type";
import {
  ILOANModalDynamicDocument,
  ILOANModalDynamicFile,
  ILOANNormalDocument,
  ILOANNormalFile,
} from "types/models/loan/normal/configs/Document";
import { IDocumentType } from "types/models/master-data/state";
type IAttachmentModalContext = {
  add: (template: string, doc_id?: string) => void;
  remove: (template: string) => void;
  update: (data: {
    template: string;
    value: any;
    option?: IDocDynamicOption;
  }) => void;
  chooseFile: (_event: any, template: string) => Promise<void>;
  openDocs : (id: string) => void;
  closeDocs: (id: string) => void;
};

export const AttachmentModalContext =
  createContext<IAttachmentModalContext | null>(null);

export const useAttachContext = () => useContext(AttachmentModalContext);

export type TYPE_MODAL_DELETE = "DOCUMENT" | "FILE" | "ALL";

export const ATTACHMODAL = {
  PREFIX_ADD: "<PrefixAdd>",
  PREFIX_UPDATE: "<PrefixUpdate>",
  PREFIX_UUIDS: "<PrefixUuids>",
};
export type TYPE_MODAL_ADD = "DOCUMENT" | "FILE";

export type TYPE_MODAL_UPDATE = "DOCUMENT" | "FILE";

export const getTemplatePrefix = (Prefix: string, arr: string[]) => {
  let aData = "";
  arr.forEach((str, index) => {
    aData += str + (index !== arr.length - 1 ? Prefix : "");
  });

  return aData;
};

const encodeBase64File = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result?.toString());
    };
    reader.onerror = reject;
  });
};
const fetchUuidsTemplateAction = (template: string, masterPrefix: string) => {
  const [type = "", templateUuids = ""] = template.split(masterPrefix);
  const uuids = templateUuids.split(ATTACHMODAL.PREFIX_UUIDS);
  return { type, uuids };
};

export interface IDocDynamicOption {
  value: string | number;
  label: string;
  type?: string;
  subDocs?: IDocDynamicOption[];
}
export const findDocumentOptions = (
  data: IDocDynamicOption[],
  key: string | number
) => {
  return _.get(
    data.find((item) => item.value.toString() === key.toString()),
    "subDocs",
    []
  ) as IDocDynamicOption[];
};
export const useAttachmentDynamicController = (
  actions: IActionsDynamicModal
) => {
  const dataName = useSelector(getBranchCodeUser);
  const [modalDelete, setModalDelete] = useState<string | null>(null);
  const [docsOpen, setDocsOpen] = useState<string[]>([]);

  const onCancelDelete = () => setModalDelete(null);

  const onConfirmDelete = () => {
    if (!modalDelete) return;
    if (modalDelete.length === 0) return;
    const { type = "", uuids = [] } = fetchUuidsTemplateAction(
      modalDelete,
      "<PREFIX>"
    );
    const uuidData = { uuids, action_uuid: _.last(uuids) ?? "" };
    // console.log("typeDelete", { type, uuids });

    // const [typeDelete = "", doc_uuid = "", file_uuid = ""] = data;
    switch (type as TYPE_MODAL_DELETE) {
      case "FILE": {
        actions.remove.file(uuidData);
        break;
      }
      case "DOCUMENT": {
        actions.remove.doc(uuidData);
        break;
      }
      case "ALL": {
        actions.remove.all();
        break;
      }
      default:
        break;
    }
    onCancelDelete();
  };

  const chooseFile = async (_event: any, templateUuids: string) => {
    const fileList = await _event.target.files;
    const uuids = templateUuids.split(ATTACHMODAL.PREFIX_UUIDS);
    const file_uuid = _.last(uuids) ?? "";
    const uuidData = { uuids, action_uuid: file_uuid };
    let dataFile: IAttachModalFile[] = [];
    if (fileList && fileList?.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const date = Number(new Date())/1000;
        await encodeBase64File(fileList[i] as File).then((data) => {
          dataFile.push({
            uuid: file_uuid,
            name: fileList[i]?.name.toString() ?? "",
            description: "",
            type: fileList[i]?.type,
            created_by: "",
            created_by_name: "",
            updated_at: date,
            updated_by: "",
            updated_by_name: "",
            created_at: date,
            file_upload: String(data as string),
            size:fileList[i].size / 1024 as number
          });
        });
      }
      actions.chooseFile(uuidData, dataFile);
    }
  };
  const handleOpenDocs = (id: string)  => {
      if(!id) return;
      const idx = docsOpen.indexOf(id);
      if (idx === -1) {
        const temp = [...docsOpen, id];
        setDocsOpen(temp);
      }
  }

  const handleCloseDocs = (id: string) => {
    const temp = docsOpen.filter(e => e !== id)
    setDocsOpen(temp);
  }

  const handleAdd = (template: string) => {
    
    const { type = "", uuids = [] } = fetchUuidsTemplateAction(
      template,
      ATTACHMODAL.PREFIX_ADD
    );
    const uuidData = { uuids, action_uuid: _.last(uuids) ?? "" };
   
    switch (type as TYPE_MODAL_ADD) {
      case "DOCUMENT": {
        actions.add.doc(uuidData);
        break;
      }
      case "FILE": {
        actions.add.file(uuidData);
        break;
      }
      default: {
        break;
      }
    }
  };
  const handleRemove = setModalDelete;
  const handleUpdate = (data: {
    template: string;
    value: any;
    option?: IDocDynamicOption;
  }) => {
    const { template = "", value = null, option } = data;
    const [type] = template.split(ATTACHMODAL.PREFIX_UPDATE);
    const { uuids = [] } = fetchUuidsTemplateAction(
      template,
      ATTACHMODAL.PREFIX_UPDATE
    );
    const uuidData = { uuids, action_uuid: _.last(uuids) ?? "" };
    switch (type as TYPE_MODAL_ADD) {
      case "DOCUMENT": {
        actions.update.doc(uuidData, value, option);
        break;
      }
      case "FILE": {
        const [type, uuidTemp, key = ""] = template.split(
          ATTACHMODAL.PREFIX_UPDATE
        );
        console.log("type", type, uuidTemp);

        if (key === "description") {
          actions.update.fileDesc(uuidData, value as string);
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  return {
    handleAdd,
    handleRemove,
    handleUpdate,
    modalDelete: {
      visible: modalDelete,
      onConfirm: onConfirmDelete,
      onCancel: onCancelDelete,
    },
    chooseFile,
    docsOpen,
    setDocsOpen,
    handleOpenDocs,
    handleCloseDocs
  };
};

export const getCountAttachment =(data:ILOANNormalDocument[])=>{
  if(!data) return 0;
  let count = 0;
  data.forEach(d=>{
    count += (d.child_files?.filter(f=>!f.uuid?.includes(PREFIX_LOCAL))?.length ?? 0);
  });
  return count;
}

export const useDocumentCollateral = () => {
  const mappingDocumentCollateral = (
    data: ILOANNormalDocument[]
  ): ILOANModalDynamicDocument[] => {
    return data.map((doc) => {
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
  };

  const mappingOptions = (
    options: IDocumentType[]
  ): {
    value: string | number;
    label: string;
    type?: string;
  }[] =>
    options?.map((item) => ({
      value: item.code?.toString(),
      label: item.name,
      type: _.get(item, "type", ""),
    })) ?? [];

  const useActionHelpers = (data: ILOANNormalDocument[]) => {
    return {
      add: {
        doc: () => {
          const result: ILOANNormalDocument = {
            document_id: "",
            document_name: "",
            uuid: generateLOCALUUID(),
            child_files: [],
          };
          const temp = [...data];
          temp.push(result);
          return temp;
        },
        file: (doc_uuid:string) => {
          return data.map((d) => {
            if(doc_uuid.includes(PREFIX_LOCAL)){
              if (d.uuid === doc_uuid) {
                const child_files = [...(d?.child_files ?? [])];
                const empty: ILOANNormalFile = {
                  uuid: generateLOCALUUID(),
                  content_type: null,
                  created_at: null,
                  created_by: "",
                  created_by_name: "",
                  updated_at: null,
                  updated_by: "",
                  updated_by_name: "",
                  description: null,
                  display_order: null,
                  file_id: null,
                  name: null,
                  file_upload: null,
                };
                child_files.push(empty);
                return { ...d, child_files };
              }
            }
            else {
              if (d.document_id?.toString() === doc_uuid) {
                const child_files = [...(d?.child_files ?? [])];
                const empty: ILOANNormalFile = {
                  uuid: generateLOCALUUID(),
                  content_type: null,
                  created_at: null,
                  created_by: "",
                  created_by_name: "",
                  updated_at: null,
                  updated_by: "",
                  updated_by_name: "",
                  description: null,
                  display_order: null,
                  file_id: null,
                  name: null,
                  file_upload: null,
                };
                child_files.push(empty);
                return { ...d, child_files };
              }
            }
            
            return { ...d };
          });
        },
      },
      remove:{
        all:()=>{
          return [];
        },
        doc:(doc_uuid:string)=>{
          if(doc_uuid.includes(PREFIX_LOCAL)){
            return [...data].filter((d) => d.uuid !== doc_uuid);
          }
          else return [...data].filter((d) => d.document_id?.toString() !== doc_uuid);
        },
        file:(doc_uuid:string,file_uuid:string)=>{
          return data.map((d) => {
            if(doc_uuid.includes(PREFIX_LOCAL)){
              if (d.uuid === doc_uuid) {
                return {
                  ...d,
                  child_files:
                    d?.child_files?.filter((f) => f.uuid !== file_uuid) ?? [],
                };
              }
            }
            else {
              if (d.document_id?.toString() === doc_uuid) {
                return {
                  ...d,
                  child_files:
                    d?.child_files?.filter((f) => f.uuid !== file_uuid) ?? [],
                };
              }
            }

            return { ...d };
          });
        }
      },
      update:{
        doc:(doc_uuid:string, value:string,optionData:IDocDynamicOption |undefined )=>{
          return data.map((d) => {
            if(doc_uuid.includes(PREFIX_LOCAL)){
              if (d.uuid === doc_uuid) {
                return {
                  ...d,
                  document_id: value,
                  document_name: optionData?.label ?? "",
                };
              }
            }
            else {
              if (d.document_id?.toString() === doc_uuid) {
                return {
                  ...d,
                  document_id: value,
                  document_name: optionData?.label ?? "",
                };
              }
            }
            return { ...d };
          });
        },
        fileDesc:(doc_uuid:string,file_uuid:string,value:string)=>{
          return data.map((d) => {
            if(doc_uuid.includes(PREFIX_LOCAL)){
              if (d.uuid === doc_uuid) {
                return {
                  ...d,
                  child_files:
                    d?.child_files?.map((f) => {
                      if (f.uuid === file_uuid) {
                        return { ...f, description: value };
                      }
                      return { ...f };
                    }) ?? [],
                };
              }
            }
            else {
              if (d.document_id?.toString() === doc_uuid) {
                return {
                  ...d,
                  child_files:
                    d?.child_files?.map((f) => {
                      if (f.uuid === file_uuid) {
                        return { ...f, description: value };
                      }
                      return { ...f };
                    }) ?? [],
                };
              }
            }
            return { ...d };
          });
        }
      },
      chooseFile:(doc_uuid:string, file_uuid:string,dataFiles: IAttachModalFile[])=>{
        return data.map((d) => {
          if(doc_uuid.includes(PREFIX_LOCAL)){
            if (d.uuid === doc_uuid) {
              return {
                ...d,
                child_files:
                  d?.child_files?.map((f) => {
                    const file = dataFiles.find((fi) => fi.uuid === f.uuid);
                    if (f.uuid === file_uuid && file) {
                      return {
                        ...f,
                        content_type: file.type,
                        created_at: file.created_at,
                        created_by: file.created_by,
                        created_by_name: file.created_by_name,
                        updated_by_name: file.updated_by_name,
                        updated_at: file.updated_at,
                        file_upload: file.file_upload,
                        name: file.name,
                        
                      };
                    }
                    return { ...f };
                  }) ?? [],
              };
            }
          }
          else {
            if (d.document_id?.toString() === doc_uuid) {
              return {
                ...d,
                child_files:
                  d?.child_files?.map((f) => {
                    const file = dataFiles.find((fi) => fi.uuid === f.uuid);
                    if (f.uuid === file_uuid && file) {
                      return {
                        ...f,
                        content_type: file.type,
                        created_at: file.created_at,
                        created_by: file.created_by,
                        created_by_name: file.created_by_name,
                        updated_by_name: file.updated_by_name,
                        updated_at: file.updated_at,
                        file_upload: file.file_upload,
                        name: file.name,
                      };
                    }
                    return { ...f };
                  }) ?? [],
              };
            }
          }
          return { ...d };
        });
      }
    };
  };

  return {
    mappingDocumentCollateral,
    mappingOptions,
    useActionHelpers,
  };
};
