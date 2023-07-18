import { getBranchCodeUser } from "features/loan/normal/storage/legal/selectors";
import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { PREFIX_LOCAL } from "utils";
import * as _ from 'lodash';
import { IActionsModal } from ".";
import { IAttachModalFile } from "../type";

type IAttachmentModalContext = {
  add: (template: string) => void;
  remove: (template: string) => void;
  update: (data: { template: string; value: any }) => void;
  chooseFile: (
    _event: any,
    doc_uuid: string,
    uuidChildFile: string
  ) => Promise<void>;
};

export const AttachmentModalContext =
  createContext<IAttachmentModalContext | null>(null);

export const useAttachContext = () => useContext(AttachmentModalContext);

export type TYPE_MODAL_DELETE = "DOCUMENT" | "FILE" | "ALL";

export const ATTACHMODAL = {
  PREFIX_ADD: "<PrefixAdd>",
  PREFIX_UPDATE: "<PrefixUpdate>",
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

export const useAttachmentController = (actions: IActionsModal) => {
  const dataName = useSelector(getBranchCodeUser);
  const [modalDelete, setModalDelete] = useState<string | null>(null);
  const [docsOpen, setDocsOpen] = useState<string[]>([]);
  const openDoc = (doc_uuid: string) => {
    const idx = docsOpen.indexOf(doc_uuid);
    if (idx === -1) {
      const temp = [...docsOpen];
      temp.push(doc_uuid.replace(PREFIX_LOCAL,''));
      setDocsOpen(temp);
    }
  };
  const onCancelDelete = () => setModalDelete(null);

  const onConfirmDelete = () => {
    if (!modalDelete) return;
    if (modalDelete.length === 0) return;
    const data = modalDelete.split("<PREFIX>");
    if (data.length === 0) return;
    const [typeDelete = "", doc_uuid = "", file_uuid = ""] = data;
    switch (typeDelete as TYPE_MODAL_DELETE) {
      case "FILE": {
        actions.remove.file({ doc_uuid, file_uuid });
        break;
      }
      case "DOCUMENT": {
        actions.remove.doc({ doc_uuid });
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

  const chooseFile = async (
    _event: any,
    doc_uuid: string,
    uuidChildFile: string
  ) => {
    const fileList = await _event.target.files;
    let dataFile: IAttachModalFile[] = [];
    if (fileList && fileList?.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const date = Number(new Date());
        await encodeBase64File(fileList[i] as File).then((data) => {
          dataFile.push({
            uuid: uuidChildFile,
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
          });
        });
      }
      actions.chooseFile({ doc_uuid }, dataFile);
    }
  };

  const handleAdd = (template: string) => {
    const [type, docID = ""] = template.split(ATTACHMODAL.PREFIX_ADD);
    switch (type as TYPE_MODAL_ADD) {
      case "DOCUMENT": {
        actions.add.doc();
        break;
      }
      case "FILE": {
        actions.add.file(docID);
        openDoc(docID);
        break;
      }
      default: {
        break;
      }
    }
  };
  const handleRemove = setModalDelete;
  const handleUpdate = (data: { template: string; value: any }) => {
    const { template = "", value = null } = data;
    const [type] = template.split(ATTACHMODAL.PREFIX_UPDATE);
    switch (type as TYPE_MODAL_ADD) {
      case "DOCUMENT": {
        const [type, doc_uuid = ""] = template.split(ATTACHMODAL.PREFIX_UPDATE);
        actions.update.doc({ doc_uuid }, value);
        break;
      }
      case "FILE": {
        const [type, doc_uuid = "", file_uuid = "", key = ""] = template.split(
          ATTACHMODAL.PREFIX_UPDATE
        );
        if (key === "description") {
          actions.update.fileDesc({ doc_uuid, file_uuid }, value as string);
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
  };
};
