import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button, Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMasterData from "app/hooks/useMasterData";
import {
  downloadAllDynamicAttachFile,
  fetchDataDocumentType
} from "features/loan/normal/configs/actions";
import {
  uploadCICFileMulti
} from "features/loan/normal/storage/cic/actions";
import { generateEmptyDocumentChildFile, generateEmptyDocumentGroup, generateEmptyDocumentType } from "features/loan/normal/storage/cic/generateEmptyData";
import {
  checkLOANNormalStorageCICIdentityEmptyCredit,
  getCurrentActiveIdentityData,
  getListDocumentCICWithUuid,
  getLOANNormalStorageCICCurrentCreditGroupWithUuid
} from "features/loan/normal/storage/cic/selectors";
import { getCICDeclareActiveInfo } from "features/loan/normal/storage/legal/selectors";
import { getDataConfigDocumentWithKey } from "features/loan/normal/storage/loan/selectors";
import {
  checkRuleInit,
  getRuleDisbled
} from "features/loan/normal/storageGuide/selector";
import * as _ from "lodash";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { RiBankFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import {
  ILOANNormalDynamicDocument,
  ILOANNormalFile
} from "types/models/loan/normal/configs/Document";
import {
  CustomKeyType,
  ILOANNormalCICUpload,
  ILOANNormalStorageCICDocumentChildFile,
  ILOANNormalStorageCICDocumentList
} from "types/models/loan/normal/storage/CIC";
import Label from "views/components/base/Label";
import Select from "views/components/base/Select";
import Empty from "views/components/layout/Empty";
import Modal from "views/components/layout/Modal";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, {
  ObjectListOption
} from "views/components/layout/ObjectList";
import basicInfoStyle from "../../screens/Normal/Initialize/CIC/Form/Main/style";
import GroupType from "./GroupType";

export interface ModalAttachmentModalCICProps {
  add?: boolean;
  open?: boolean;
  uuidActive?: string;
  declareType?: string;
  onClose?(): void;
  onSave?(uuid: string): void;
  onDelete?(): void;
  onAdd?(): void;
  onUpdate?(): void;
  position: string,
}
interface IIdentityData {
  CreditObjList: ObjectListOption[];
  creditPosition: number;
  currentCredit: string;
}
const AttachCICContext = createContext<{
  identityData: IIdentityData;
  add: (template: string) => () => void;
  remove: (template: string) => void;
  update: (template: string) => void;
  chooseFile : (fileData : ILOANNormalStorageCICDocumentChildFile[], template: string) => void
} | null>(null);
export const useAttachCICContext = () => useContext(AttachCICContext);
export enum TYPE_DOC_CIC {
  PARENT_DOC = "PARENT_DOC",
  DOC = "DOC",
  FILE = "FILE",
}
export const PREFIX_CIC_ATTACH_FILE = "<CIC>";
export enum TYPE_REMOVE_DOC_CIC {
  FILE = "FILE",
  PARENT_DOC = "PARENT_DOC",
  DOC = "DOC",
  ALL = "ALL",
}
export enum TYPE_UPDATE_DOC_CIC {
  GROUPTYPE = "GROUPTYPE",
  TYPEDETAIL = "TYPEDETAIL",
  DESCRIPTION = "DESCRIPTION"
}
const AttachmentModalCIC: FC<ModalAttachmentModalCICProps> = ({
  open = false,
  onClose,
  uuidActive = "",
  declareType = "",
  position
}) => {
  const classes = basicInfoStyle();
  const dispatch = useDispatch();
  const params = useParams() as unknown as ILOANURLParams;
  
  const [openDocs, setOpenDocs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [currentIndexCredit, setCurrentCredit] = useState<number>(0);

  const { CifIfType, CreditInstitution, register } = useMasterData();
    
  useEffect(() => {
    register('cifIfType')
    register('creditInstitution')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const dataInfo = useSelector(
    getCICDeclareActiveInfo(declareType, uuidActive)
  );
  
  const getListDocument = useSelector(getListDocumentCICWithUuid(uuidActive));

  const currentActiveIdentityData = useSelector(getCurrentActiveIdentityData)

  const [localListDocument, setLocalListDocument] = useState<ILOANNormalStorageCICDocumentList[]>(getListDocument)

  useEffect(() => {
    setLocalListDocument(getListDocument)
  },[getListDocument])

  const CurrentCreditGroupUuid = useSelector(
    getLOANNormalStorageCICCurrentCreditGroupWithUuid(uuidActive)
  )
  const documentGrpConfigs = useSelector(
    getDataConfigDocumentWithKey("LICH_SU_QUAN_HE_TIN_DUNG_LOAN")
  );
  const isEmptyCredit = useSelector(
    checkLOANNormalStorageCICIdentityEmptyCredit
  );

  const isNotEdit = (isEmptyCredit && params.organ === 'scb') || (isEmptyCredit && params.organ === 'other' && !!currentActiveIdentityData?.hasCredit)

  const checkUserAccess = useSelector(checkRuleInit);
  const ruleDisabled = useSelector(getRuleDisbled);

  const enableViewOnly = checkUserAccess;
  const disabled = ruleDisabled || enableViewOnly;

  const basicInfo = useMemo(() => {
    const result = {
      fullname: "",
      gender: "",
      email: "",
      mobile: "",
    };
    if (!dataInfo) return result;
    return {
      fullname: dataInfo.full_name,
      gender: dataInfo?.gender_info?.code ?? "",
      email: dataInfo.email,
      mobile: dataInfo.mobile_num,
    };
  }, [dataInfo]);
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "LICH_SU_QUAN_HE_TIN_DUNG",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const CurrentIdentityData = useMemo(() => {
    // list TCTD
    const CreditObjList: ObjectListOption[] =
      CurrentCreditGroupUuid?.credit?.map((c) => ({
        label: CreditInstitution?.find((ci) => ci.code === c.code)
          ?.short_name ?? (
          <em className="text-secondary text-lower pr-1 font-normal">
            [Chưa chọn <em className="text-upper">TCTD</em>]
          </em>
        ),
        circle: <RiBankFill />,
      })) ?? [];
    const creditPosition =
      CurrentCreditGroupUuid?.credit?.findIndex(
        (c) => c.uuid === CurrentCreditGroupUuid.activeCredit
      ) ?? 0;

    const currentCredit: string = _.get(
      CurrentCreditGroupUuid,
      ["credit", creditPosition, "code"],
      ""
    );
    return {
      CreditObjList,
      creditPosition,
      currentCredit,
    };
  }, [CurrentCreditGroupUuid, CreditInstitution]);

  useEffect(() => {
    const creditPosition =
      CurrentCreditGroupUuid?.credit?.findIndex(
        (c) => c.code === CurrentIdentityData.currentCredit
      ) ?? 0;
    setCurrentCredit(creditPosition !== -1 ?creditPosition : 0);
  }, [CurrentCreditGroupUuid, CurrentIdentityData.currentCredit]);

  const currentCreditCode =  useMemo(()=>{
    return _.get(CurrentCreditGroupUuid,['credit',currentIndexCredit,'uuid'],'NON_CREDIT');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentIndexCredit]);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    let docOpenTemp = "";
    listData.forEach((pa) => {
      if (pa?.document_list?.length === 0) return;
      pa?.document_list?.forEach((d) => {
        if (d?.document_child_files?.length === 0) return;
        if (docOpenTemp) return;
        docOpenTemp = (pa?.uuid ?? "") + "/" + (d?.uuid ?? "");
      });
    });
    let temp = (docOpenTemp?.split("/") ?? []).filter((d) => !!d);
    const newOpenDocs = [...temp];
    setOpenDocs(newOpenDocs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open,currentIndexCredit]);

  //
  const openDocWithDocUuids = (docUuids: string[]) => {
    if (!docUuids || docUuids.length === 0) return;
    const temp = [...openDocs];
    docUuids.forEach((docUuid) => {
      let idx = openDocs.findIndex((doc_uuid) => doc_uuid === docUuid);
      if (idx !== -1) return;
      temp.push(docUuid);
    });
    setOpenDocs(temp);
  };
  // const addNewGroup = () => {
  //   const customKey: CustomKeyType = {
  //     identity: CurrentCreditGroupUuid?.identity_num,
  //     credit: CurrentIdentityData.currentCredit,
  //   };
  //   dispatch(addNewDocumentTypeGroup(customKey));
  // };
  const customKeys: CustomKeyType = {
    identity: CurrentCreditGroupUuid?.uuid,
    credit: currentCreditCode,
    identity_type: CurrentCreditGroupUuid?.identity_type,
  };
  const onConfirmDelete = () => {
    handleRemove(`${TYPE_REMOVE_DOC_CIC.ALL}${PREFIX_CIC_ATTACH_FILE}`);
    setModalDelete(false);
  };

  const onCancelDelete = () => setModalDelete(!modalDelete);

  const getIndetityLabel = () => {
    let label = "";
    CifIfType.forEach((item: any) => {
      if (item?.id === CurrentCreditGroupUuid?.identity_type) {
        label = `${item?.name} - ${CurrentCreditGroupUuid?.identity_num}`;
      }
    });
    return label;
  };

  const handleAdd = (template: string) => () => {
    if (!template) return;
    const [type, PARENT_DOC = "", DOC = ""] = template.split(
      PREFIX_CIC_ATTACH_FILE
    );
    switch (type as TYPE_DOC_CIC) {
      case TYPE_DOC_CIC.PARENT_DOC: {
        onAddNewDocumentTypeGroup(customKeys)
        break;
      }
      case TYPE_DOC_CIC.DOC: {
        onAddNewdocumentType(PARENT_DOC)
        openDocWithDocUuids([PARENT_DOC]);
        break;
      }
      case TYPE_DOC_CIC.FILE: {
        onAddNewChildFiles(PARENT_DOC, DOC )
        openDocWithDocUuids([PARENT_DOC, DOC]);
        break;
      }
      default:
        break;
    }
  };
  
  const onAddNewDocumentTypeGroup = (customKeys: CustomKeyType) => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = [...localListDocument, generateEmptyDocumentGroup(customKeys)]
    setLocalListDocument(newLocalData)
  }

  const onAddNewdocumentType = (PARENT_DOC: string) => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument.map(doc => {
      if(doc.uuid === PARENT_DOC) {
        return {
          ...doc,
          document_list : [...doc.document_list, generateEmptyDocumentType()]
        }
      }
      else return {...doc}
    })

    setLocalListDocument(newLocalData)
  }

  const onAddNewChildFiles = (parentDoc: string, childDoc: string) => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument.map(doc => {
      if(doc.uuid === parentDoc) {
        return {
          ...doc,
          document_list : doc.document_list.map(child => {
            if(child.uuid === childDoc){
              return {
                ...child,
                document_child_files: [...child.document_child_files, generateEmptyDocumentChildFile('', '')]
              }
            }
            else return {...child}
          })
        }
      }
      else return {...doc}
    })

    setLocalListDocument(newLocalData)
  }

  const onUpdateGroupType = (value: string, parentDoc_uuid: string) => {

    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument.map(doc => {
      if(doc.uuid === parentDoc_uuid) {
        return {
          ...doc,
          document_type_code: value
        }
      }
      else return {...doc}
    })
    setLocalListDocument(newLocalData)
  }
  const onUpdateTypeDetail = (value: string, parentDoc_uuid: string, doc_uuid: string) => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument.map(doc => {
      if(doc.uuid === parentDoc_uuid) {
        return {
          ...doc,
          document_list: doc.document_list.map(childDoc => {
            if(childDoc.uuid === doc_uuid) {
              return {
                ...childDoc,
                document_code: value
              }
            }
            else return {...childDoc}
          })
        }
      }
      else return {...doc}
    })
    setLocalListDocument([...newLocalData])
  }

  const onUpdateDescription = (value: string, parentDoc_uuid: string, doc_uuid: string, file_uuid : string) => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument.map(doc => {
      if(doc.uuid === parentDoc_uuid) {
        return {
          ...doc,
          document_list: doc.document_list?.map(childDoc => {
            if(childDoc.uuid === doc_uuid) {
              return {
                ...childDoc,
                document_child_files: childDoc.document_child_files?.map(file => {
                  if(file.uuid === file_uuid) {
                    return {
                      ...file,
                      description: value
                    }
                  }
                  else return {...file}
                })
              }
            }
            else return {...childDoc}
          })
        }
      }
      else return {...doc}
    })

    setLocalListDocument(newLocalData)
  }

  const handleUpdate = (template: string) => {
    const [value, type, PARENT_DOC = "", DOC = "", FILE = ""] = template.split(
      PREFIX_CIC_ATTACH_FILE
    );
    switch (type as TYPE_UPDATE_DOC_CIC) {
      case TYPE_UPDATE_DOC_CIC.GROUPTYPE:
        {
          onUpdateGroupType( value, PARENT_DOC)
          break;
        }
      case TYPE_UPDATE_DOC_CIC.TYPEDETAIL:
        {
          onUpdateTypeDetail( value, PARENT_DOC, DOC)
          break;
        }
      case TYPE_UPDATE_DOC_CIC.DESCRIPTION:
        {
          onUpdateDescription( value, PARENT_DOC, DOC, FILE)
          break;
        }  
      default:
        break;
    }
  }
  const handleChooseFile = (fileData : ILOANNormalStorageCICDocumentChildFile[], template: string) => {
    const [PARENT_DOC = "", DOC = ""] = template.split(
      PREFIX_CIC_ATTACH_FILE
    );

    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument.map(doc => {
      if(doc.uuid === PARENT_DOC) {
        return {
          ...doc,
          document_list: doc.document_list?.map(childDoc => {
            if(childDoc.uuid === DOC) {
              return {
                ...childDoc,
                document_child_files: childDoc.document_child_files?.map(file => {
                  const newFileData = fileData?.find(newFile => newFile.uuid === file.uuid)
                  // const date = 
                  if(newFileData) {
                    return {
                      ...file,
                      name: newFileData.name,
                      content_type: newFileData.content_type,
                      created_by: newFileData.created_by,
                      updated_at: newFileData.updated_at,
                      created_at: newFileData.created_at,
                      file_upload: newFileData.file_upload,
                      size: newFileData.size
                    }
                  }
                  else return {...file}
                })
              }
            }
            else return {...childDoc}
          })
        }
      }
      else return {...doc}
    })

    setLocalListDocument(newLocalData)
  }

  const onDeleteDocumentInfoList = () => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument?.filter(e => e.customKey?.credit !== currentCreditCode) ?? []
    
    const dataUpload: ILOANNormalCICUpload = {
      declare: declareType,
      uuid: uuidActive,
      dataFile: newLocalData,
      position: position,
      type: 'delete'
    };
    dispatch(uploadCICFileMulti(dataUpload));
  }
  
  const onDeleteDocumentGroup = (parentDoc_uuid: string) => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument?.filter(e => e.uuid !== parentDoc_uuid) ?? []
    
    dispatch(uploadCICFileMulti({
      declare: declareType,
      uuid: uuidActive,
      dataFile: newLocalData,
      position: position,
      type: 'delete'
    }));

  }
  const onDeleteDocument= (parentDoc_uuid: string, doc_uuid : string) => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument.map(doc => {
      if(doc.uuid === parentDoc_uuid) {
        return {
          ...doc,
          document_list : doc.document_list?.filter(e => e.uuid !== doc_uuid) ?? []
        }
      }
      else return {...doc}
    })
    
    dispatch(uploadCICFileMulti({
      declare: declareType,
      uuid: uuidActive,
      dataFile: newLocalData,
      position: position,
      type: 'delete'
    }));
  }

  const onDeleteChildFile= (parentDoc_uuid: string, doc_uuid : string, file_uuid:string) => {
    const newLocalData: ILOANNormalStorageCICDocumentList[] = localListDocument.map(doc => {
      if(doc.uuid === parentDoc_uuid) {
        return {
          ...doc,
          document_list : doc.document_list.map(child => {
            if(child.uuid === doc_uuid){
              return {
                ...child,
                document_child_files: child.document_child_files?.filter(e=> e.uuid !== file_uuid) ?? []
              }
            }
            else return {...child}
          })
        }
      }
      else return {...doc}
    })

    dispatch(uploadCICFileMulti({
      declare: declareType,
      uuid: uuidActive,
      dataFile: newLocalData,
      position: position,
      type: 'delete'
    }));
  }

  const handleRemove = (template: string) => {
    const [type, PARENT_DOC = "", DOC = "", FILE = ""] = template.split(
      PREFIX_CIC_ATTACH_FILE
    );
    switch (type as TYPE_REMOVE_DOC_CIC) {
      case TYPE_REMOVE_DOC_CIC.ALL: {
        onDeleteDocumentInfoList();
        break;
      }
      case TYPE_REMOVE_DOC_CIC.PARENT_DOC: {
        // PARENT_DOC
        onDeleteDocumentGroup(PARENT_DOC)
        break;
      }
      case TYPE_REMOVE_DOC_CIC.DOC: {
        // DOC
        onDeleteDocument( PARENT_DOC , DOC);
        break;
      }
      case TYPE_REMOVE_DOC_CIC.FILE: {
        // PARENT_DOC DOC FILE
        onDeleteChildFile(PARENT_DOC,  DOC, FILE)
        break;
      }
      default:
        break;
    }
  };
  const onSaveFileCIC = () => {
    if (localListDocument && localListDocument?.length > 0) {
      const dataUpload: ILOANNormalCICUpload = {
        declare: declareType,
        uuid: uuidActive,
        dataFile: localListDocument ?? [],
        position: position,
        type: 'save'
      };
      dispatch(uploadCICFileMulti(dataUpload));
    }
  };

  const emptyUi = () => {
    return (
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
  };

  const handleDownloadAll = () => {
    const findParentDocName = (code: string) =>
      documentGrpConfigs.find((ite) => ite.code.toString() === code);
    const myData: ILOANNormalDynamicDocument[] = listData.map((parentDoc) => {
      const docDataConfig = findParentDocName(
        parentDoc?.document_type_code?.toString() ?? ""
      );
      const result: ILOANNormalDynamicDocument = {
        hasSubDoc: true,
        document_id: parentDoc.document_type_code,
        document_name: _.get(docDataConfig, "name", ""),
        childs: parentDoc.document_list.map((doc) => {
          const docDataConfigChild = _.get(
            docDataConfig,
            "child_list",
            []
          ).find(
            (child) => child?.code.toString() === doc?.document_code?.toString()
          );
          const result: ILOANNormalDynamicDocument = {
            document_id: doc.document_code,
            document_name: _.get(docDataConfigChild, "name", ""),
            childs: doc.document_child_files.map((file) => {
              const result: ILOANNormalFile = {
                ...file,
                custom_keys: undefined,
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

  const getList = () => {
    if (!localListDocument) return [];
    const listAfterFilter = localListDocument.filter((item) => { 
      if (item?.customKey?.identity === CurrentCreditGroupUuid?.uuid) {
        if (item?.customKey?.credit === currentCreditCode || item?.customKey?.credit === "NON_CREDIT") {
          return true;
        }
      }
      return false;
    });
    return listAfterFilter;;
  };
  const listData = getList();

  return (
    <AttachCICContext.Provider
      value={{
        identityData: CurrentIdentityData,
        add: handleAdd,
        remove: handleRemove,
        update: handleUpdate,
        chooseFile: handleChooseFile,
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
            height: "80%",
            "& .MuiDialogTitle-root": {
              lineHeight: 1,
            },
            "& .MuiDialogContent-root": {
              padding: "16px 24px",
              borderBottom: "unset !important",
            },

            "& .MuiDialogActions-root": {
              padding: "0px 24px 30px 24px",
            },
          },
        }}
        footer={
          <Box>
            <Button
              id="cicCancel"
              variant="contained"
              color="error"
              className={`mr-3`}
              style={{ borderRadius: "unset", width: "99px" }}
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button
              id="cicSave"
              variant="contained"
              color="primary"
              style={{ borderRadius: "unset", width: "99px" }}
              onClick={onSaveFileCIC}
              disabled={disabled || isNotEdit}
            >
              Lưu
            </Button>
          </Box>
        }
        header={
          <Box sx={{ top: 0, position: "sticky" }}>
            <Typography
              variant="h5"
              component="div"
              className="text-upper text-primary font-medium text-18 pb-3"
            >
              TÀI LIỆU ĐÍNH KÈM
            </Typography>
            <div className="flex">
              <Avatar
                sx={{
                  width: "4.25rem",
                  height: "4.25rem",
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                className="bd-warning"
              >
                {basicInfo.fullname.slice(0, 1).toUpperCase() ?? ""}
              </Avatar>
              <div className="ml-3">
                <div className="text-warning text-upper text-16 font-medium">
                  {basicInfo.fullname ? basicInfo.fullname : "-"}[{" "}
                  {basicInfo.gender === "F" ? (
                    <i className="fas fa-female" />
                  ) : basicInfo.gender === "M" ? (
                    <i className="fas fa-male" />
                  ) : null}{" "}
                  ]
                </div>
                <div>
                  <i className="tio-email" style={{ fontSize: "0.75rem" }} />
                  <span className="ml-2 text-14" style={{ color: "#5c5c5c" }}>
                    {basicInfo.email ? basicInfo.email : "-"}
                  </span>
                </div>
                <div>
                  <i
                    className="fas fa-phone-alt "
                    style={{ fontSize: "0.75rem" }}
                  />
                  <span className="ml-2 text-14" style={{ color: "#5c5c5c" }}>
                    {basicInfo.mobile ? basicInfo.mobile : "-"}
                  </span>
                </div>
              </div>
            </div>
            <Grid
              container
              spacing={5}
              sx={{ alignItems: "center", marginBottom: "20px" }}
            >
              <Grid item md={4}>
                <div className="flex" style={{ alignItems: "center" }}>
                  <Label sx={{ width: "180px" }} bold={true}>
                    Giấy tờ định danh
                  </Label>
                  <Select
                    label=""
                    value={String(CurrentCreditGroupUuid?.uuid ?? "")}
                    options={[
                      {
                        label: getIndetityLabel(),
                        value: String(CurrentCreditGroupUuid?.uuid ?? ""),
                      },
                    ]}
                    onChange={() => {}}
                    disabled={true}
                  />
                </div>
              </Grid>
              <Grid item md={8}>
                <ObjectList
                  labelLength="Số lượng TCTD khác :"
                  options={CurrentIdentityData.CreditObjList}
                  current={currentIndexCredit}
                  enableMenu={false}
                  enableDelete={false}
                  enableAdd={false}
                  className={classes.listCredit}
                  menuWidth="110px"
                  onChange={setCurrentCredit}
                />
              </Grid>
            </Grid>
            <IconButton
              onClick={onClose}
              color="error"
              sx={{ position: "absolute", right: "0.8rem", top: "0.5rem" }}
            >
              <CloseIcon />
            </IconButton>
              <div>
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
                  {
                    !isNotEdit && <Box
                    sx={{
                      fontWeight: "500",
                      fontSize: "18px",
                      color: "#353535",
                      justifyContent: "flex-end",
                      display: "flex",
                    }}
                  >
                    {!disabled && (
                      <>
                        <IconButton
                          onClick={handleAdd(
                            `${TYPE_DOC_CIC.PARENT_DOC}${PREFIX_CIC_ATTACH_FILE}`
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
                          <IoTrashOutline
                            style={{ fontSize: "1.5rem" }}
                            color="red"
                          />
                        </IconButton>
                      </>
                    )}
                  </Box>
                  }
                  
                </Box>
                {/* <Divider
                      sx={{
                        borderBottomWidth: "2px",
                        margin: "10px 0px",
                        borderColor: '#c6c5d1',
                        fontWeight: "500",
                      }}
                  /> */}
                {/* {listData?.length > 0 ?
                    listData?.map((doc, index) => {
                      return <GroupType key={index} indexGroup={index} data={doc} allData={listData} />;
                    }) : emptyUi()} */}
              </div>
            
          </Box>
        }
      >
        { listData.length > 0
            ? listData?.map((doc, index) => {
                return (
                  <GroupType
                    key={doc.uuid}
                    indexGroup={index}
                    data={doc}
                    allData={listData}
                    disabled={disabled}
                    opendocs={openDocs}
                    credit={customKeys?.credit}
                    // onChangeGroupType={onChangeGroupType}
                  />
                );
              })
            : emptyUi()
        }
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
    </AttachCICContext.Provider>
  );
};
export default AttachmentModalCIC;
