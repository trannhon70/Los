import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { downloadAllDynamicAttachFile } from "features/loan/normal/configs/actions";
import {
  checkRuleInit,
  getRuleDisbled
} from "features/loan/normal/storageGuide/selector";
import { FC } from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { HiDownload } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  ILOANNormalDynamicDocument,
  ILOANNormalFile
} from "types/models/loan/normal/configs/Document";
import { PREFIX_LOCAL } from "utils";
import Empty from "views/components/layout/Empty";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { MyAttachModal } from "../CustomModal";
import { IAttachModalDocument, IAttachModalFile } from "../type";
import DocumentRow from "./DocumentRow";
import {
  AttachmentModalContext,
  ATTACHMODAL, TYPE_MODAL_ADD, useAttachmentController
} from "./hook";

const EmptyLayout = () => (
  <Empty
    sx={{
      height: '400px',
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
export type IActionsModal = {
  add: {
    doc: () => void;
    file: (doc_uuid: string) => void;
  };
  remove: {
    all: () => void;
    doc: (uuids: { doc_uuid: string }) => void;
    file: (uuids: { doc_uuid: string; file_uuid: string }) => void;
  };
  update: {
    doc: (uuids: { doc_uuid: string }, value: any) => void;
    fileDesc: (
      uuids: { doc_uuid: string; file_uuid: string },
      value: string
    ) => void;
  };
  chooseFile: (
    uuids: { doc_uuid: string },
    dataFiles: IAttachModalFile[]
  ) => void;
  onSave: () => void;
  onClose: () => void;
};
export interface ModalAttachmentModalProps {
  open?: boolean;
  dataDocs: IAttachModalDocument[];
  docOptions?: { value: string | number; label: string }[];
  actions: IActionsModal;
  viewOnly?: boolean;
}
const AttachmentModal: FC<ModalAttachmentModalProps> = (props) => {
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
    viewOnly = false,
  } = props;
  const checkUserAccess = useSelector(checkRuleInit);
  const ruleDisabled = useSelector(getRuleDisbled);

  const enableViewOnly = checkUserAccess || viewOnly;
  const disabled = ruleDisabled || enableViewOnly;
  const dispatch = useDispatch();
  const {
    docsOpen,
    modalDelete,
    handleAdd,
    handleRemove,
    handleUpdate,
    chooseFile,
  } = useAttachmentController(actions);

  const handleDownloadAll = () => {
    const myData: ILOANNormalDynamicDocument[] = dataDocs.map((doc) => {
      const result: ILOANNormalDynamicDocument = {
        document_id: doc.document_id,
        document_name: doc.document_name,
        childs: doc.child_files.map((file, index) => {
          const result: ILOANNormalFile = {
            ...file,
            file_id: index,
            display_order: index,
            content_type: file.type,
            custom_keys: undefined,
          };
          return result;
        }),
        hasSubDoc: false,
      };
      return result;
    });

    dispatch(downloadAllDynamicAttachFile(myData));
  };

  const RightElement = (
    <>
      {dataDocs && dataDocs?.length > 0 && (
        <Box
          sx={{
            fontSize: "12px",
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

      {!enableViewOnly ? (
        <>
          <IconButton
            disabled={disabled}
            onClick={() =>
              handleAdd(
                ("DOCUMENT" as TYPE_MODAL_ADD) + ATTACHMODAL.PREFIX_ADD + ""
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
      disabledActions={enableViewOnly ? ["save"] : []}
    >
      <AttachmentModalContext.Provider
        value={{
          add: handleAdd,
          remove: handleRemove,
          update: handleUpdate,
          chooseFile,
        }}
      >
        <Box>
          {dataDocs && dataDocs?.length > 0 ? (
            dataDocs?.map((data, idx) => {
              return (
                <DocumentRow
                  key={data.uuid}
                  openCollapsed={docsOpen.includes(
                    data.uuid.replace(PREFIX_LOCAL, "")
                  )}
                  ruleDisabled={disabled}
                  data={data as IAttachModalDocument}
                  allData={dataDocs as IAttachModalDocument[]}
                  index={idx}
                  viewOnly={enableViewOnly}
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
export default AttachmentModal;
