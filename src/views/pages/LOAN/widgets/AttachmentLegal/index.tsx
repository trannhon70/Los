import { FileUpload } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Collapse, Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useNotify from "app/hooks/useNotify";
import { fetchDataDocumentType } from "features/loan/normal/configs/actions";
import {
  addDataChildFile,
  addDataFile,
  deleteDataChildFile,
  deleteDataFile,
  deleteDataLegalAllFile,
  downloadLegalFileMulti,
  onChangeSelectFileList,
  setAddttacmentContent,
  setAddttacmentFile,
  uploadLegalFileMulti
} from "features/loan/normal/storage/legal/actions";
import {
  dataDocumentLegal,
  getBranchCodeUser,
  getDeclareTypeWithUuid,
  getListFile
} from "features/loan/normal/storage/legal/selectors";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import * as _ from 'lodash';
import {
  FC,
  Fragment,
  useEffect,
  useLayoutEffect, useRef, useState
} from "react";
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronDownCircle } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  ILOANNormalChildFile,
  ILOANNormalUpload
} from "types/models/loan/normal/storage/Legal";
import { PREFIX_LOCAL } from "utils";
import { APP_DATE_FORMAT } from "utils/constants";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import Select from "views/components/base/Select";
import Empty from "views/components/layout/Empty";
import Modal from "views/components/layout/Modal";
import ModalConfirm from "views/components/layout/ModalConfirm";
import useStorage from "../../screens/Normal/Initialize/Legal/useStorage";
export interface ModalAttachmentModalProps {
  add?: boolean;
  open?: boolean;
  uuidActive?: string;
  declereType?: string;
  onClose?(): void;
  onSave?(uuid: string): void;
  onDelete?(): void;
  onAdd?(): void;
  onUpdate?(): void;
}
type TYPE_MODAL_DELETE = "DOCUMENT" | "FILE" | "ALL" ;
const AttachmentModal: FC<ModalAttachmentModalProps> = (props) => {
  const { open = false, onClose, uuidActive } = props;
  const declereType = useSelector(getDeclareTypeWithUuid(uuidActive));
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const ruleDisabled = useSelector(getRuleDisbled);

  const inputChooseFileElement = useRef<HTMLInputElement>(null);
  const [openDetailChildFile, setOpenDetailChildFile] = useState<
    (string | number)[]
  >([]);
  const dataSelectFile = useSelector(dataDocumentLegal);
  const dataFileList = useSelector(
    getListFile(declereType ?? "", uuidActive ?? "")
  );
  
  const [modalDelete,setModalDelete] = useState<string|null>(null);

  const clickCollapse = (id: string | number) => () => {
    let temp = [...openDetailChildFile];
    let idx = temp.indexOf(id);
    if (idx === -1) {
      temp.push(id);
    } else {
      temp.splice(idx, 1);
    }
    setOpenDetailChildFile(temp);
  };
  // const getName
  const dataName = useSelector(getBranchCodeUser);
  const { valueModify } = useStorage("BORROWER");

  const dispatch = useDispatch();
  const notify = useNotify();

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

 
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "PHAP_LY",
        type_loan: "Loan",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddFile = () => {
    dispatch(addDataFile("", { declare: declereType ?? "" }));
  };
  const openCollapseDoc=(id:string|number)=>{
    let temp = [...openDetailChildFile];
    let idx = temp.indexOf(id);
    if(idx !== -1) return;
    temp.push(id);
    setOpenDetailChildFile(temp);
  }
  useEffect(()=>{
    const id = _.get(_.first(dataFileList),'document_id','');
    if(!id) return;
    openCollapseDoc(id);
  },[open]);


  const onChangeSelect = (value: string | number, uuidActive: string|number) => {
    dispatch(
      onChangeSelectFileList(value, {
        declare: declereType ?? "",
        uuidFileActive: String(uuidActive) ?? '',
      })
    );
  };
  const handleAddFileChild = (uuidDoc: string | number) =>{
    openCollapseDoc(uuidDoc);
    dispatch(
      addDataChildFile("", {
        declare: declereType ?? "",
        uuidFileActive: String(uuidDoc),
      })
    )
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

  const changeChooseFile = async (
    _event: any,
    document_id: string | number,
    uuidChildFile: string
  ) => {
    const fileList = await _event.target.files;
    let dataFile: ILOANNormalChildFile[] = [];
    if (fileList && fileList?.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const date = Number(new Date());
        await encodeBase64File(fileList[i] as File).then((data) => {
          dataFile.push({
            file_id: i,
            uuid: uuidChildFile,
            name: fileList[i]?.name.toString() ?? "",
            display_order: i,
            description: "",
            content_type: fileList[i]?.type,
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
      dispatch(
        setAddttacmentFile(dataFile, {
          declare: declereType ?? "",
          uuidUserActive: uuidActive ?? "",
          uuidFileActive: document_id ?? "",
        })
      );
    }
  };

  const onSaveFileLegal = () => {
    if (dataFileList && dataFileList?.length > 0) {
      const dataUpload: ILOANNormalUpload = {
        dataFile: dataFileList ?? [],
        declare: declereType ?? "",
        uuidUser: uuidActive ?? "",
        type: 'save'
      };
      dispatch(uploadLegalFileMulti(dataUpload));
    }
  };

  const handleOnchangeDescriptionFile =(docId: string | number,uuidFile:string)=>(value:string)=>{
    if(!value) return;
    dispatch(setAddttacmentContent(value,{
      declare: declereType ?? "",
      uuidDoc:docId,
      uuidFile
    }));
  }
  const onCancelDelete = ()=>setModalDelete(null);
  const onConfirmDelete =()=>{
    if(!modalDelete) return;
    if(modalDelete.length === 0) return;
    const data = modalDelete.split('<PREFIX>');
    if(data.length === 0) return;
    const [typeDelete = '' , docId ='', fileId='' ] = data;
    switch (typeDelete as TYPE_MODAL_DELETE) {
      case 'FILE':{
        dispatch(
          deleteDataChildFile(fileId, {
            declare: declereType ?? "",
            uuidFileActive: docId,
            uuidChildFile: fileId,
          })
        );
        break;
      }
      case 'DOCUMENT':{
        const [document_id = '',uuidActiveFile ='']= docId.split('<UUID>');
        dispatch(
          deleteDataFile(uuidActiveFile, {
            declare: declereType ?? "",
            uuidFileActive: document_id,
          })
        );
        break;
      }
      case 'ALL':{
        const isLocal = dataFileList?.every(doc=>doc.child_files.every(file=>file.uuid.includes(PREFIX_LOCAL)));
        dispatch(
          deleteDataLegalAllFile(isLocal?PREFIX_LOCAL:"", {
            declare: declereType ?? "",
            uuidFileActive: docId,
          })
        );
        break;
      }
      default:
        break;
    }
    onCancelDelete();
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      isStatic
      sx={{
        "& .MuiPaper-root": {
          minWidth: "80%",
          position: "relative",
          borderRadius: 0,
          minHeight: '60%',
        },

        "& .MuiDialogContent-root": {
          padding: "16px 24px",
          borderBottom: "unset !important",
        },

        "& .MuiDialogActions-root": {
          padding: "0px 24px 30px 24px",
        },
      }}
      footer={
        <Box>
          <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: "unset", width: "99px" }}
            onClick={onClose}
            disabled={ruleDisabled}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "unset", width: "99px" }}
            disabled={ruleDisabled}
            onClick={onSaveFileLegal}
          >
            Lưu
          </Button>
        </Box>
      }
    >
      <Box>
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
          sx={{ position: "absolute", right: "0.8rem", top: "0.5rem" }}
        >
          <CloseIcon />
        </IconButton>
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
            <IconButton
              disabled={ruleDisabled}
              onClick={handleAddFile}
            >
              <AiOutlinePlusSquare color="red" style={{ fontSize: "1.5rem" }} />
            </IconButton>
            <IconButton
              onClick={() => setModalDelete('ALL')}
              disabled={ruleDisabled}
            >
              <IoTrashOutline style={{ fontSize: "1.5rem" }} color="red" />
            </IconButton>
          </Box>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: "2px",
            margin: "10px 0px",
            borderColor: "#353535",
          }}
        />

        {dataFileList && dataFileList?.length > 0 ? (dataFileList?.map((data, idx) => {
          let isOpen = openDetailChildFile.includes(data.document_id);
          return (
            <Fragment key={idx}>
              <Box className="flex-center" key={idx + 1}>
                <Box
                  sx={{
                    width: "3%",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#353535",
                  }}
                  className="flex justify-center"
                >
                  {idx + 1}
                </Box>
                <Box sx={{ width: "22%", marginRight: "3%" }}>
                  <Select
                    sx={{
                      "& .MuiFormControl-root": {
                        "& .MuiInputBase-formControl": {
                          "& .MuiInputBase-input": {
                            backgroundColor: "white !important",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#1825aa !important",
                            border: "1px solid #1825aa",
                          },
                        },
                      },
                    }}
                    handleValidValueBeforeOnChange={(value)=>{
                      const currentDoc = dataFileList?.find(item=>item.document_id === value);
                      if(!currentDoc) return true;
                      notify("Danh mục này đã tồn tại", "warning");
                      return false;
                    }}
                    onChange={(val) => onChangeSelect(val, data.uuidActiveFile??'')}
                    options={
                      dataSelectFile?.map((item) => ({
                        value: item.code,
                        label: item.name,
                      })) ?? []
                    }
                    disabled={data.child_files?.length > 0}
                    value={data.document_id ?? ""}
                    required
                  />
                </Box>
                <Box sx={{ width: "40%" }}></Box>
                <Box sx={{ width: "25%" }}></Box>
                <Box
                  sx={{
                    width: "10%",
                    justifyContent: "flex-end",
                    display: "flex",
                  }}
                >
                  <IconButton
                    disabled={!Boolean(data.document_id??'')}
                    onClick={() => handleAddFileChild(data.document_id ?? '')}
                  >
                    <AiOutlinePlusSquare
                      style={{ fontSize: "1.5rem" }}
                      color="#1825aa"
                    />
                  </IconButton>
                  <IconButton
                    // onClick={() => onHandleDeleteListFile(data.document_id ?? '')}
                    disabled={ruleDisabled}
                    onClick={()=>setModalDelete(`${ "DOCUMENT" as TYPE_MODAL_DELETE}<PREFIX>${data.document_id ?? ''}<UUID>${data.uuidActiveFile??''}`)}
                  >
                    <IoTrashOutline style={{ fontSize: "1.5rem" }} color="#1825aa" />
                  </IconButton>
                  <IconButton
                    sx={{
                      "& svg": {
                        transition: "all ease 0.3s",
                        ...(!isOpen ? {} : { transform: "rotate(-90deg)" }),
                        fontSize: "24px",
                        "&:hover": {
                          color: "var(--mscb-primary)",
                        },
                      },
                    }}
                    onClick={clickCollapse(data.document_id??'')}
                  >
                    <BiChevronDownCircle
                      style={{ fontSize: "1.5rem" }}
                      color="#1825aa"
                    />
                  </IconButton>
                </Box>
              </Box>
              <Divider
                sx={{
                  borderBottomWidth: "2px",
                  margin: "10px 0px",
                  borderColor: "#c6c5d1",
                }}
              />
              <Collapse unmountOnExit in={isOpen}>
                {data.child_files?.map((chi, idx) => {
                  const isLocal = !chi.content_type;
                  return (
                    <Fragment key={idx}>
                      <Box className="flex-center">
                        <Box
                          sx={{
                            width: "3%",
                            fontSize: "14px",
                            color: "#353535",
                          }}
                          className="flex justify-center"
                        >
                          {idx + 1}
                        </Box>
                        <Box
                          sx={{
                            width: "22%",
                            marginRight: "3%",
                            wordBreak: "break-all",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "25px",
                            }}
                            sx={{
                              textAlign: "left",
                              color: "var(--mscb-primary)",
                            }}
                          >
                            {isLocal ? (
                              <>
                                <FileUpload className="mr-1" />
                                <label className="flex items-center">
                                  <span
                                    style={{
                                      textDecoration: "underline",
                                      fontSize: "14px",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    Tải lên tập tin
                                  </span>
                                  <input
                                    ref={inputChooseFileElement}
                                    type="file"
                                    className="hidden"
                                    onChange={(event) => {
                                      changeChooseFile(
                                        event,
                                        data.document_id,
                                        chi.uuid
                                      );
                                      setTimeout(() => {
                                        event.target.value = "";
                                      }, 1000);
                                    }}
                                  />
                                </label>
                              </>
                            ) : (
                              <span
                                style={{
                                  textDecoration: "underline",
                                  fontSize: "14px",
                                  fontStyle: "italic",
                                  cursor: "pointer"
                                }}
                                onClick={()=>{
                                  dispatch(downloadLegalFileMulti([chi?.uuid]));
                                }}
                              >
                                {chi?.name ?? ""}
                              </span>
                            )}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: "40%",
                            textAlign: "center",
                            "& .mscb-input": {
                              "& .MuiFormControl-root": {
                                "& .MuiInputBase-root": {
                                  backgroundColor:
                                    "rgba(94, 191, 255, 0.14)!important",
                                },
                              },
                            },
                          }}
                        >
                          <Input
                            placeholder="Nhập nội dung"
                            sx={{ width: "60%" }}
                            value={chi.description ?? ''}
                            onDebounce={handleOnchangeDescriptionFile(data.document_id,chi.uuid)}
                          />
                        </Box>
                        <Box sx={{ width: "25%" }}>
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {isLocal ? (
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#353535",
                                  fontWeight: "500",
                                }}
                              >
                                {" "}
                                -{" "}
                              </span>
                            ) : (
                              <>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "#353535",
                                    fontWeight: "500",
                                  }}
                                >
                                  {chi.created_by}
                                </span>
                                <span
                                  style={{ color: "#808080", fontSize: "12px" }}
                                >
                                  {timestampToDate(
                                    valueModify ?? 0,
                                    "HH:mm " + APP_DATE_FORMAT
                                  )}
                                </span>
                              </>
                            )}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: "10%",
                            justifyContent: "flex-end",
                            display: "flex",
                          }}
                        >
                          <IconButton>
                            <BsPencil
                              style={{ fontSize: "1.3rem" }}
                              color="#1825aa"
                            />
                          </IconButton>
                          <IconButton
                            onClick={()=>setModalDelete(`${ "FILE" as TYPE_MODAL_DELETE}<PREFIX>${data.document_id ?? ''}<PREFIX>${chi.uuid?? ''}`)}
                            // onClick={() =>
                              
                            //   onHandleDeleteListChildFile(
                            //     String(data.document_id) ?? '',
                            //     chi.uuid
                            //   )
                            // }
                          >
                            <IoTrashOutline
                              style={{ fontSize: "1.5rem" }}
                              color="#1825aa"
                            />
                          </IconButton>
                        </Box>
                      </Box>
                      <Divider
                        sx={{
                          borderBottomWidth: "2px",
                          margin: "10px 0px",
                          borderColor: "#c6c5d1",
                        }}
                      />
                    </Fragment>
                  );
                })}
              </Collapse>
            </Fragment>
          );
        })) : (
          <Empty sx={{
            minHeight: '300px',
            "& img": {
              width: "15%"
            },
            fontSize: '22px',
            fontWeight: 300,
            // fontStyle: 'italic',
          }}>Không có dữ liệu
          </Empty>
        )}
        <ModalConfirm
          open={Boolean(modalDelete)}
          onClose={onCancelDelete}
          onConfirm={onConfirmDelete}
        >
          <Box className="text-18 font-medium text-primary text-center">
            Bạn có chắc muốn xoá thông tin này
          </Box>
        </ModalConfirm>
      </Box>
    </Modal>
  );
};
export default AttachmentModal;
