import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { downloadAllDynamicAttachFile } from "features/loan/normal/configs/actions";
import * as _ from "lodash";
import { FC, useEffect } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { MyAttachModal } from "../CustomModal";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { IoTrashOutline } from "react-icons/io5";
import {
  ILOANModalDynamicDocument,
  ILOANNormalDynamicDocument,
  ILOANNormalFile,
} from "types/models/loan/normal/configs/Document";
import { PREFIX_LOCAL } from "utils";
import Empty from "views/components/layout/Empty";
import { IAttachModalFile } from "../type";
import DocumentRow from "./DocumentRow";
import {
  AttachmentModalContext,
  ATTACHMODAL,
  IDocDynamicOption,
  TYPE_MODAL_ADD,
  useAttachmentDynamicController,
} from "./hook";
import {
  checkRuleInit,
  getRuleDisbled,
} from "features/loan/normal/storageGuide/selector";
const EmptyLayout = () => (
  <Empty
    sx={{
      minHeight: "300px",
      "& img": {
        width: "15%",
      },
      fontSize: "22px",
      fontWeight: 300,
      // fontStyle: "italic",
    }}
  >
    Không có dữ liệu
  </Empty>
);
type IUuidData = { uuids: string[]; action_uuid: string };
export type ChooseFileAction = (
  uuidData: IUuidData,
  dataFiles: IAttachModalFile[]
) => void;
export type IActionsDynamicModal = {
  add: {
    doc: (uuidData: IUuidData) => void;
    file: (uuidData: IUuidData) => void;
  };
  remove: {
    all: () => void;
    doc: (uuidData: IUuidData) => void;
    file: (uuidData: IUuidData) => void;
  };
  update: {
    doc: (
      uuidData: IUuidData,
      value: any,
      optionData?: IDocDynamicOption
    ) => void;
    fileDesc: (uuidData: IUuidData, value: string) => void;
  };
  chooseFile: ChooseFileAction;
  onSave: () => void;
  onClose: () => void;
};

export interface ModalAttachmentModalProps {
  open?: boolean;
  dataDocs?: ILOANModalDynamicDocument[];
  defaultOpenDocs?: string[];
  docOptions?: IDocDynamicOption[];
  actions?: IActionsDynamicModal;
  viewOnly?: boolean;
  levelsColor?: string[];
}
const AttachmentDynamic: FC<ModalAttachmentModalProps> = (props) => {
  const {
    open = false,
    dataDocs = [],
    docOptions = [],
    actions = {
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
      onClose: () => undefined,
      onSave: () => undefined,
    },
    levelsColor = [],
    viewOnly = false,
    defaultOpenDocs = [],
  } = props;
  const checkUserAccess = useSelector(checkRuleInit);
  const ruleDisabled = useSelector(getRuleDisbled);

  const enableViewOnly = checkUserAccess || viewOnly;
  const disabled = ruleDisabled || enableViewOnly;
  const dispatch = useDispatch();
  const {
    setDocsOpen,
    docsOpen,
    modalDelete,
    handleAdd,
    handleRemove,
    handleUpdate,
    chooseFile,
    handleOpenDocs,
    handleCloseDocs
  } = useAttachmentDynamicController(actions);

  useEffect(() => {
    let firstPrefix = "";
    const checkDefaultOpen =
      (doc_uuid: string) => (doc: ILOANModalDynamicDocument) => {
        const currentDoc_uuid = doc_uuid + "/" + doc.document_id;
        if (doc.hasSubDoc) {
          (doc.childs as ILOANModalDynamicDocument[]).forEach(
            checkDefaultOpen(currentDoc_uuid)
          );
          return;
        }
        if (doc.childs.length > 0 && !firstPrefix) {
          firstPrefix = currentDoc_uuid;
        }
      };
    dataDocs.forEach(checkDefaultOpen(""));

    const defaultOpen = (firstPrefix.split("/") ?? []).filter((it) => !!it);
    const newOpen = [...docsOpen, ...defaultOpen];
    setDocsOpen(newOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (defaultOpenDocs.length === 0) return;
    const newOpen = [...docsOpen, ...defaultOpenDocs];
    setDocsOpen(newOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpenDocs]);

  const handleDownloadAll = () => {
    const mappingFile = (file: ILOANNormalFile, index: number) => {
      const result: ILOANNormalFile = {
        ...file,
        file_id: index,
        display_order: index,
        custom_keys: undefined,
      };
      return result;
    };

    const mappingDoc = (doc: ILOANNormalDynamicDocument) => {
      const result: ILOANNormalDynamicDocument = {
        document_id: doc.document_id,
        document_name: doc.document_name,
        hasSubDoc: doc.hasSubDoc,
        childs: doc.hasSubDoc
          ? (doc?.childs as ILOANNormalDynamicDocument[]).map(mappingDoc) ?? []
          : (doc?.childs as ILOANNormalFile[]).map(mappingFile) ?? [],
      };
      return result;
    };
    const myData: ILOANNormalDynamicDocument[] = dataDocs.map(mappingDoc);
    dispatch(downloadAllDynamicAttachFile(myData));
  };

  const RightElement = (
    <>
      {dataDocs && dataDocs?.length > 0 && (
        <Box
          sx={{
            fontSize: "13px",
            fontWeight: "500",
            color: "red",
            whiteSpace: "nowrap",
            display: "flex",
            alignSelf: "center",
            textDecoration: "underline",
            marginRight: "0.7rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleDownloadAll}
        >
          <HiDownload
            color="red"
            style={{ fontSize: "1rem", marginRight: "5px" }}
          />
          Tải xuống tất cả
        </Box>
      )}

      {!disabled ? (
        <>
          <IconButton
            disabled={disabled}
            onClick={() =>
              handleAdd(
                ("DOCUMENT" as TYPE_MODAL_ADD) + ATTACHMODAL.PREFIX_ADD + "ALL",
              )
            }
          >
            <AiOutlinePlusSquare color="red" style={{ fontSize: "1.5rem" }} />
          </IconButton>
          <IconButton onClick={() => handleRemove("ALL")} disabled={disabled}>
            <IoTrashOutline style={{ fontSize: "1.5rem" }} color="red" />
          </IconButton>
        </>
      ) : null}
    </>
  );

  return (
    <MyAttachModal
      open={open}
      onClose={actions.onClose}
      onSave={actions.onSave}
      rightElement={RightElement}
      viewOnly={viewOnly}
      disabledActions={disabled ? ["save"] : []}
    >
      <AttachmentModalContext.Provider
        value={{
          add: handleAdd,
          remove: handleRemove,
          update: handleUpdate,
          chooseFile,
          openDocs: handleOpenDocs ,
          closeDocs: handleCloseDocs
        }}
      >
        <Box>
          {dataDocs && dataDocs?.length > 0 ? (
            (dataDocs as ILOANModalDynamicDocument[])?.map((data, idx) => {
              return (
                <DocumentRow
                  node={(idx + 1).toString()}
                  key={data.uuid ?? data.document_id}
                  openCollapsed={docsOpen.includes(data.uuid) || (!!data.document_id && docsOpen.includes(data.document_id.toString()))}
                  levelsColor={levelsColor.slice(1)}
                  colorBorder={_.first(levelsColor) ?? "#1825aa"}
                  docsOpen={docsOpen}
                  doc_uuids={"ALL"}
                  doc_id={data.document_id?.toString() ?? ""}
                  data={data}
                  allData={dataDocs}
                  index={idx}
                  disabled={disabled}
                  options={docOptions}
                />
              );
            })
          ) : (
            <EmptyLayout />
          )}
          <ModalConfirm
            open={Boolean(modalDelete.visible)}
            onClose={modalDelete.onCancel}
            onConfirm={modalDelete.onConfirm}
          >
            <Box className="text-18 font-medium text-primary text-center">
              Bạn có chắc muốn xoá thông tin này
            </Box>
          </ModalConfirm>
        </Box>
      </AttachmentModalContext.Provider>
    </MyAttachModal>
  );
};
export default AttachmentDynamic;
