import { Avatar, Button, Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useMemo, useState, useLayoutEffect } from "react";
import Modal from "views/components/layout/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import GroupType from "./GroupType";
import Select from "views/components/base/Select";
import Label from "views/components/base/Label";
import ObjectList, {
  ObjectListOption,
} from "views/components/layout/ObjectList";
import { RiBankFill } from "react-icons/ri";
import useMasterData from "app/hooks/useMasterData";
import basicInfoStyle from "../../screens/Normal/Initialize/CIC/Form/Main/style";
import { getLegalBasicInfoWithUuid } from "features/loan/normal/storage/legal/selectors";
import * as _ from "lodash";
import Empty from "views/components/layout/Empty";
import {
  downloadAllDynamicAttachFile,
  fetchDataDocumentType,
} from "features/loan/normal/configs/actions";
import { CreditType, IUserCICAttachModal, IUserCICIdentity, IUserCredits } from "./hook";
import { HiDownload } from "react-icons/hi";
import {
  ILOANNormalDynamicDocument,
  ILOANNormalFile,
} from "types/models/loan/normal/configs/Document";
import { getDataConfigDocumentWithKey } from "features/loan/normal/storage/loan/selectors";

export interface ModalAttachmentModalCICProps {
  open?: boolean;
  uuidActive?: string;
  onClose?(): void;
  listUsers: IUserCICAttachModal[];
}
const AttachmentModalCIC: FC<ModalAttachmentModalCICProps> = ({
  open = false,
  onClose,
  uuidActive = "",
  listUsers = [],
}) => {
  const classes = basicInfoStyle();
  const dispatch = useDispatch();
  const [openDocs,setOpenDocs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const { CifIfType, CreditInstitution, register } = useMasterData();
    
  useEffect(() => {
    register('cifIfType')
    register('creditInstitution')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const basicInfo = useSelector(getLegalBasicInfoWithUuid(uuidActive));
  const identities: IUserCICIdentity[] = useMemo(
    () =>
      _.get(
        listUsers.find((user) => user.person_uuid === uuidActive),
        "identities",
        []
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uuidActive]
  );

  const [activeIdentity, setActiveIdentity] = useState<string>(
    _.get(_.first(identities), "identity_uuid", "")
  );

  const [currentCredit, setCurrentCredit] = useState<number>(0);
  const documentGrpConfigs = useSelector(
    getDataConfigDocumentWithKey("LICH_SU_QUAN_HE_TIN_DUNG_LOAN")
  );
  const onChangeActiveIdentity = (value: string | number) => {
    const identity = value?.toString();
    setActiveIdentity(identity);
    const currentIdentity = _.get(
      identities.find((it) => it.identity_uuid === identity),
      "credits",
      []
    );
    if (currentIdentity?.length > 0) {
      setCurrentCredit(0);
    }
  };
  // const currentCreditUuid = 
  useLayoutEffect(() => {
    dispatch(
      fetchDataDocumentType({
        document_group_type: "LICH_SU_QUAN_HE_TIN_DUNG",
        type_loan: "LOAN",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLabelCredit = (creditCode: string) => {
    return _.get(
      CreditInstitution?.find((ci) => ci.code === creditCode),
      "short_name",
      <em className="text-secondary text-lower pr-1 font-normal">
        [Chưa chọn <em className="text-upper">TCTD</em>]
      </em>
    );
  };
  
  const credits: { options: ObjectListOption[]; currentlist: IUserCredits[] } =
    useMemo(() => {
      const currentCredits = _.get(
        identities.find((iden) => iden.identity_uuid === activeIdentity),
        "credits",
        []
      ); 
      return {
        options: currentCredits.filter(cre => cre.code?.code !== 'NON_CREDIT').map((credit: IUserCredits) => {
          return {
            label: getLabelCredit(credit.code?.code ?? ""),
            circle: <RiBankFill />,
          };
        }),
        currentlist: currentCredits,
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [identities, activeIdentity, CreditInstitution]);
 
  
  // const currentCreditsUUIDList = identities.find((iden) => iden.identity_num === activeIdentity)?.credits.map(e =>)

  const listDocs = _.get(credits.currentlist, [currentCredit, "documents"], []) ;

  const currentListDoc = listDocs.filter(list => list.customKey?.credit === credits.currentlist[currentCredit].code?.uuid ?? "")

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const getIndetityLabelWithCode = (code: string, num: string) => {
    const name = _.get(
      CifIfType.find((it) => it.id === code),
      "name",
      ""
    );
    let label = `${name} - ${num}`;
    return label;
  };
  // useEffect(()=>{
  //   let tempString = '';
  //   listDocs.forEach(pa=>{
  //     if(pa?.document_list?.length === 0) return;
  //     pa.document_list.forEach(d=>{
  //       if(d.document_child_files.length === 0) return;
  //       if(tempString) return;
  //       tempString = (pa?.uuid ?? '') + '/' + (d?.uuid ?? '');
  //     });
  //   });
  //   if(!tempString) return;
  //   let doc_uuids = (tempString.split('/') ?? []).filter(i=>!!i);
  //   let temp = [...openDocs,...doc_uuids];
  //   setOpenDocs(temp);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[open,currentCredit])
  useEffect(() => {
    let docOpenTemp = "";
    listDocs.forEach((pa) => {
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
  }, [open,currentCredit]);

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
    const myData: ILOANNormalDynamicDocument[] = listDocs.map((parentDoc) => {
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
          height: '80%',
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
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: "unset", width: "99px" }}
            onClick={onClose}
          >
            Hủy
          </Button>
        </Box>
      }
      header ={
        <Box>
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
            {basicInfo.fullname.substr(0, 1).toUpperCase() ?? ""}
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
              <i className="tio-email"  style={{fontSize:'0.75rem'}} />
              <span className="ml-2 text-14" style={{color: '#5c5c5c'}} >
                {basicInfo.email ? basicInfo.email : "-"}
              </span>
            </div>
            <div>
              <i className="fas fa-phone-alt" style={{fontSize:'0.75rem'}}  />
              <span className="ml-2 text-14" style={{color: '#5c5c5c'}}  >
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
                value={activeIdentity}
                options={identities.map((iden) => ({
                  label: getIndetityLabelWithCode(
                    iden.identity_type,
                    iden.identity_code,
                  ),
                  value: iden.identity_uuid,
                }))}
                onChange={onChangeActiveIdentity}
              />
            </div>
          </Grid>
          <Grid item md={8}>
            <ObjectList
              labelLength="Số lượng TCTD khác :"
              options={credits.options}
              current={currentCredit}
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
                width: "10%",
                fontWeight: "500",
                fontSize: "18px",
                color: "#353535",
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              {listDocs?.length > 0 && (
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
            </Box>
          </Box>
        </div>
      </Box>
      }
    >
      {currentListDoc?.length > 0 ? currentListDoc?.map((doc, index) => {
        return (
          <GroupType
            key={doc.uuid}
            indexGroup={index}
            data={doc}
            openDocs={openDocs}                    
          />
        );
      }) : emptyUi()}
    </Modal>
  );
};
export default AttachmentModalCIC;
