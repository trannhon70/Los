import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  downloadAllDynamicAttachFile,
  fetchDataDocumentType
} from "features/loan/normal/configs/actions";
import * as LOANActions from "features/loan/normal/storage/loan/actions";
import {
  getLOANNormalStorageFullLoan, getLOANNormalStorageListDocumentInfos
} from "features/loan/normal/storage/loan/selectors";
import {
  checkRuleInit,
  getRuleDisbled
} from "features/loan/normal/storageGuide/selector";
import {
  createContext,
  FC,
  useContext,
  useEffect, useLayoutEffect, useState
} from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { HiDownload } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  ILOANNormalDynamicDocument,
  ILOANNormalFile
} from "types/models/loan/normal/configs/Document";
import { ILOANNormalLOANUpload } from "types/models/loan/normal/storage/LOAN";
import Empty from "views/components/layout/Empty";
import Modal from "views/components/layout/Modal";
import ModalConfirm from "views/components/layout/ModalConfirm";
import GroupType from "./GroupType";
export interface AttachmentModalLOANProps {
  add?: boolean;
  open?: boolean;
  uuidActive?: string;
  declareType?: string;
  onClose?(): void;
  onSave?(uuid: string): void;
  onDelete?(): void;
  onAdd?(): void;
  onUpdate?(): void;
}
const AttachLOANContext = createContext<{
  add: (template: string) => () => void;
  remove: (template: string) => void;
} | null>(null);
export const useAttachContext = () => useContext(AttachLOANContext);
export enum TYPE_DOC_LOAN {
  PARENT_DOC = "PARENT_DOC",
  DOC = "DOC",
  FILE = "FILE",
}
export const PREFIX_LOAN_ATTACH_FILE = "<LOAN>";
export enum TYPE_REMOVE_DOC_LOAN {
  FILE = "FILE",
  PARENT_DOC = "PARENT_DOC",
  DOC = "DOC",
  ALL = "ALL",
}

const AttachmentModalLOAN: FC<AttachmentModalLOANProps> = ({
  open = false,
  onClose = () => undefined,
  uuidActive = "",
  declareType = "",
}) => {
  const dispatch = useDispatch();
  const checkUserAccess = useSelector(checkRuleInit);
  const ruleDisabled = useSelector(getRuleDisbled);

  const enableViewOnly = checkUserAccess;
  const disabled = ruleDisabled || enableViewOnly;

  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const listData = useSelector(getLOANNormalStorageListDocumentInfos);
  const dataFull = useSelector(getLOANNormalStorageFullLoan);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onConfirmDelete = () => {
    handleRemove(`${TYPE_REMOVE_DOC_LOAN.ALL}${PREFIX_LOAN_ATTACH_FILE}`);
    setModalDelete(false);
  };
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "PHUONG_AN_&_NHU_CAU_CTD",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onCancelDelete = () => setModalDelete(!modalDelete);

  const handleAdd = (template: string) => () => {
    if (!template) return;
    const [type, PARENT_DOC = "", DOC = ""] = template.split(
      PREFIX_LOAN_ATTACH_FILE
    );
    switch (type as TYPE_DOC_LOAN) {
      case TYPE_DOC_LOAN.PARENT_DOC: {
        dispatch(LOANActions.addNewLOANNormalStorageLOANParentDoc());
        break;
      }
      case TYPE_DOC_LOAN.DOC: {
        dispatch(
          LOANActions.addNewLOANNormalStorageLOANDoc({
            parentDoc_uuid: PARENT_DOC,
          })
        );
        break;
      }
      case TYPE_DOC_LOAN.FILE: {
        dispatch(
          LOANActions.addNewLOANNormalStorageLOANFile({
            parentDoc_uuid: PARENT_DOC,
            doc_uuid: DOC,
          })
        );
        break;
      }
      default:
        break;
    }
  };

  const handleRemove = (template: string) => {
    const [type, PARENT_DOC = "", DOC = "", FILE = ""] = template.split(
      PREFIX_LOAN_ATTACH_FILE
    );
    switch (type as TYPE_REMOVE_DOC_LOAN) {
      case TYPE_REMOVE_DOC_LOAN.ALL: {
        dispatch(LOANActions.removeAllLOANNormalStorageLOANParentDoc());
        break;
      }
      case TYPE_REMOVE_DOC_LOAN.PARENT_DOC: {
        // PARENT_DOC
        dispatch(LOANActions.removeLOANNormalStorageLOANParentDoc(PARENT_DOC));
        break;
      }
      case TYPE_REMOVE_DOC_LOAN.DOC: {
        // PARENT_DOC
        dispatch(
          LOANActions.removeLOANNormalStorageLOANDoc(DOC, {
            parentDoc_uuid: PARENT_DOC,
          })
        );
        break;
      }
      case TYPE_REMOVE_DOC_LOAN.FILE: {
        // PARENT_DOC DOC FILE
        dispatch(
          LOANActions.removeLOANNormalStorageLOANFile(FILE, {
            parentDoc_uuid: PARENT_DOC,
            doc_uuid: DOC,
          })
        );

        break;
      }
      default:
        break;
    }
  };

  const onSave = () => {
    if (listData && listData?.length > 0) {
      const dataUpload: ILOANNormalLOANUpload = {
        declare: declareType,
        uuid: uuidActive,
        dataFile: listData ?? [],
      };
      dispatch(
        LOANActions.saveLOANNormalStorageLOANModalAttachFile(dataUpload)
      );
    }
  };

  const emptyUi = () => {
    return (
      <Empty
        sx={{
          minHeight: "400px",
          "& img": {
            width: "15%",
          },
          fontSize: "22px",
          fontWeight: 300,
          // fontStyle: "italic",
        }}
      >
        Chưa có dữ liệu
      </Empty>
    );
  };
  const Footer = () => (
    <Box>
      <Button
        variant="contained"
        color="error"
        className={`mr-3`}
        style={{ borderRadius: "unset", width: "99px" }}
        onClick={onClose}
      >
        Hủy
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ borderRadius: "unset", width: "99px" }}
        onClick={onSave}
        disabled={disabled || !Boolean(dataFull?.capital_need_loan_plan_info)}
      >
        Lưu
      </Button>
    </Box>
  );
  const handleDownloadAll = () => {
    const myData: ILOANNormalDynamicDocument[] = listData.map((parentDoc) => {
      const result: ILOANNormalDynamicDocument = {
        document_id: parentDoc.document_id,
        document_name: parentDoc.document_name,
        hasSubDoc: true,
        childs: parentDoc.document_group.map((doc) => {
          const result: ILOANNormalDynamicDocument = {
            document_id: doc.document_id,
            document_name: doc.document_name,
            childs: doc.child_files?.map((file, index) => {
              const result: ILOANNormalFile = {
                ...file,
                custom_keys: undefined,
                display_order: index,
                file_id: index,
                content_type: file.content_type,
                description: "",
              };
              return result;
            }),
          };
          return result;
        }),
      };
      return result;
    });
    dispatch(downloadAllDynamicAttachFile(myData));
  };

  return (
    <AttachLOANContext.Provider
      value={{
        add: handleAdd,
        remove: handleRemove,
      }}
    >
      <Modal
        open={isOpen}
        onClose={onClose}
        isStatic
        sx={{
          "& .MuiPaper-root": {
            minWidth: "80%",
            position: "relative",
            borderRadius: 0,
            height: "60%",
            "& .MuiDialogContent-root": {
              padding: "16px 24px",
              borderBottom: "unset !important",
            },

            "& .MuiDialogActions-root": {
              padding: "0px 24px 30px 24px",
            },
          },
        }}
        footer={<Footer />}
        header={
          <Box sx={{ top: 0, position: "sticky" }}>
            <Typography
              variant="h5"
              component="div"
              className="text-upper text-primary font-medium text-18 pb-3"
            >
              TÀI LIỆU ĐÍNH KÈM
            </Typography>
            <IconButton
              onClick={onClose}
              color="error"
              sx={{
                position: "absolute",
                right: "0.8rem",
                top: "0.5rem",
                marginTop: "-12px",
              }}
            >
              <CloseIcon />
            </IconButton>
            <>
              <Box className="flex-center">
                <Box
                  sx={{
                    width: "3%",
                    justifyContent: "flex-start",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#353535",
                  }}
                >
                  STT
                </Box>
                <Box
                  sx={{
                    width: "22%",
                    marginRight: "3%",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#353535",
                    paddingLeft: "25px",
                  }}
                >
                  TÊN FILE
                </Box>
                <Box
                  sx={{
                    width: "40%",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#353535",
                  }}
                >
                  NỘI DUNG TÀI LIỆU
                </Box>
                <Box
                  sx={{
                    width: "25%",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#353535",
                  }}
                >
                  CẬP NHẬT BỞI
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#353535",
                    justifyContent: "flex-end",
                    display: "flex",
                  }}
                >
                  {listData?.length > 0 && (
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
                  {!disabled ? (
                    <>
                      {Boolean(dataFull?.capital_need_loan_plan_info) && (
                        <>
                          <IconButton
                            onClick={handleAdd(
                              `${TYPE_DOC_LOAN.PARENT_DOC}${PREFIX_LOAN_ATTACH_FILE}`
                            )}
                          >
                            <AiOutlinePlusSquare
                              color="red"
                              style={{ fontSize: "1.5rem" }}
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setModalDelete(true);
                            }}
                          >
                            <IoTrashOutline style={{ fontSize: "1.5rem" }} color="red" />
                          </IconButton>
                        </>
                      )}
                    </>
                  ) : null}
                </Box>
              </Box>
              {/* <Divider
            sx={{
              borderBottomWidth: "2px",
              margin: "10px 0px",
              borderColor: "#353535",
            }}
          /> */}
            </>
          </Box>
        }
      >
        {listData?.length > 0
          ? listData?.map((doc, index) => {
              return (
                <GroupType
                  key={index}
                  indexGroup={index}
                  data={doc}
                  allData={listData}
                  disabled={disabled}
                />
              );
            })
          : emptyUi()}

        <ModalConfirm
          open={Boolean(modalDelete)}
          onClose={onCancelDelete}
          onConfirm={onConfirmDelete}
        >
          <Box className="text-18 font-medium text-primary text-center">
            Bạn có chắc muốn xoá thông tin này
          </Box>
        </ModalConfirm>
      </Modal>
    </AttachLOANContext.Provider>
  );
};
export default AttachmentModalLOAN;
