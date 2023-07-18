import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import useMasterData from "app/hooks/useMasterData";
import { setSummaryActivePerson } from "features/loan/normal/storageApproval/cic/actions";
import { getListAllDeclareCICDocumentData, getListPersonDetailInfo } from "features/loan/normal/storageApproval/cic/selectors";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPersonCICInfo } from "types/models/loan/normal/storageApproval/CIC";
import { generateUUID, intToRoman } from "utils";
import Empty from "views/components/layout/Empty";
import ObjectList from "views/components/layout/ObjectList";
import AttachmentFullCIC from "views/pages/LOAN/widgets/AttachmentCICAll";
import CreditScoreInfo from "./Form/CreditScoreInfo";
import ReviewDetailsInfo from "./Form/ReviewDetailInfo";
import ratingsReviewStyles from "./style";
export interface CICMainProps {
  organ?: string;
  dataPosition: string
}

const TotalRankingGrade: FC<CICMainProps> = (props) => {
  const classes = ratingsReviewStyles();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch()
  const listUsersMain = useSelector(getListAllDeclareCICDocumentData);
  const [attachDataOpen, setOpenAttach] = useState<{
    open: boolean;
    uuid: string;
  }>({ open: false, uuid: "" });
  const { CifIfType, register} = useMasterData()
  
  useEffect(() => {
    register('cifIfType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getCifIfTypeName = (id: string) => {
    return CifIfType.find(e => e.id === id)?.name ?? id
  }

  const handleOpenModal = (key: string, position: string) => () => {
    if (!isOpenModal) {
      dispatch(setSummaryActivePerson({ key: key, position: position }));
    }
    setOpenModal(!isOpenModal);
  };
  const handleCloseModal = () => {
    setOpenModal(!isOpenModal);
  };
  const countAttachFile =(person_uuid:string)=>{
      if(!person_uuid) return 0;
      const currentUser = listUsersMain.find(us=> us.person_uuid === person_uuid);
      
      if(!currentUser) return 0;
      let count = 0;
      currentUser?.identities?.forEach(iden=>{
        iden?.credits?.forEach(cre=>{
          cre?.documents?.forEach(doc=>{
            doc?.document_list?.forEach(ch=>{
              count += (ch?.document_child_files?.length ?? 0);
            })
          })
        })
      })
      return count;
  }
  // console.log(listUsersMain.find(us=> us.person_uuid === person_uuid));
  
  const getObjectName = (key: string) => {
    switch (key) {
      case "borrower":
        return "Người vay";
      case "marriage":
        return "Người hôn phối";
      case "co_brw":
        return "Người đồng vay";
      case "co_payer":
        return "Người đồng trả nợ";
      case "law_rlt":
        return "Người liên quan theo quy định của pháp luật";
      case "others":
        return "Đối tượng khác";
      default:
        return "";
    }
  };

  const listObject = useSelector(getListPersonDetailInfo);

  if (Object.keys(listObject).length === 0)
    return (
      <Empty
        sx={{
          "& img": {
            width: "23%",
          },
          fontSize: "20px",
          fontWeight: 300,
          // fontStyle: 'italic',
        }}
      >
        Chưa có dữ liệu
      </Empty>
    );

    const checkHasCICInstitutions = (data : IPersonCICInfo[]) => {
      return data?.some(cic => cic.cic_information_detail?.cic_credit?.institution?.length > 0 || cic.cic_information_detail?.cic_normal_loan?.institution?.length > 0)
    }

  return (
    <div className={`${classes.root} pt-5`}>
      <Grid xl={12} className="css-control">
        <span className="control-number">STT</span>
        <span className="control-label">THÔNG TIN ĐIỂM TÍN DỤNG</span>
        <span className="control-count"></span>
      </Grid>
      <hr className="hr-style" />
      {Object.keys(listObject).filter(key => listObject[key].data.length > 0).map((key, index) => (
        <Grid key={index} container columnSpacing="20px" rowSpacing="20px">
          <Grid item xl={12} className="type-person pl-8 pt-9 flex items-center">
            <div style={{ width: 40 }}>
              <span>{intToRoman(index + 1)}</span>
            </div>
            <Input
              className={classes.colorWhite}
              disabled
              value={getObjectName(key).toLocaleUpperCase()}
            />
          </Grid>
          <Grid item xl={12} md={12} xs={12}>
            <Divider />
          </Grid>
          {listObject[key].data?.map((person, perIndex) => {
            return (
              <Grid item xl={12} md={12} xs={12} key={person.detail.person_uuid} >
                <Grid
                  container
                  columnSpacing="20px"
                  rowSpacing="20px"
                  className="info-cic flex-row"
                >
                  <div className="pl-7 pt-5">
                    <span className="cic-stt">{perIndex + 1}</span>
                    <span className="cic-title">THÔNG TIN CIC</span>
                    <div className="cic-customer">
                      <ObjectList
                        current={0}
                        enableMenu={false}
                        options={[
                          {
                            label: `${person.detail.full_name}`,
                            circle: <AccountCircleIcon />,
                            attachment:countAttachFile(person?.detail?.person_uuid ?? ''),
                          },
                        ]}
                        className={`${classes.userListClass} `}
                        onAttach={(index) => {
                          setOpenAttach({uuid:person?.detail?.person_uuid ?? '',open:true})
                        }}
                        sx={{
                          '& .object-list-label-container': {
                            display: 'none',
                          },
                          '& .object-list-box': {
                            marginLeft: 0,
                            flexDirection: 'row',
                            width: '215px',
                            justifyContent: 'flex-start',
                            border: '1px solid #707070',
                            pt: 0,
                            px: 2,
                            '& div:last-child':{
                              marginLeft:"57px",
                              marginBottom:"13px"
                            },
                            '& .object-list-box-name': {
                              '& div:last-child':{
                                marginLeft:"0px !important",
                                marginBottom:"0px !important"
                              },
                            },
                            
                          },
                          '& .object-list-box-name': {
                            ml: 2,
                            marginBottom:"18px",
                            textTransform: 'uppercase!important',
                          },
                          '& .Mui-selected': {
                            '& .object-list-box': {
                              borderColor: 'var(--mscb-danger)'
                            }
                          },
              
                          '& .object-list-add': {
                            maxWidth: '230px',
                            minWidth: '230px',
                            justifyContent: 'center',
                            '& .object-list-box': {
                              width: '100%',
                              justifyContent: 'center',
                              borderColor: 'var(--mscb-primary)',
                            },
                            '& .object-list-box-name': {
                              display: 'none'
                            },
                            '& .object-list-circle': {
                              backgroundColor: 'transparent!important',
                              borderColor: 'transparent!important',
                              '& svg': {
                                color: 'var(--mscb-primary)'
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    {
                      checkHasCICInstitutions(person.detail.cic_information) && <Button
                      className="buttonReview"
                      variant="outlined"
                      onClick={handleOpenModal(key, person.detail.person_uuid)}
                    >
                      Xem lại thông tin CIC
                    </Button>
                    }
                  </div>
                  <Grid
                    item
                    xl={12}
                    md={12}
                    xs={12}
                    className="pl-9"
                    rowSpacing="20px"
                  >
                    {person.detail.cic_information.map(cic => (
                      <CreditScoreInfo
                        key={cic.uuid ?? generateUUID()}
                        data={cic.credit_score_infor.risk_info}
                        titleCard={`Rủi ro tín dụng - ${getCifIfTypeName(cic.cic_information_name)} - ${cic.cic_information_code}`}
                        disabled={true}
                      />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
          {index < Object.keys(listObject).length - 1 && (
            <Grid item xl={12} md={12} xs={12}>
              <Divider />
            </Grid>
          )}
        </Grid>
      ))}
      <ReviewDetailsInfo
        open={isOpenModal}
        onClose={handleCloseModal}
        labelName="Người vay"
      />
      {attachDataOpen.open && (
        <AttachmentFullCIC
          open={attachDataOpen.open}
          uuidActive={attachDataOpen.uuid}
          onClose={() => setOpenAttach({ uuid: "", open: false })}
          listUsers={listUsersMain}
        />
      )}
    </div>
  );
};
export default TotalRankingGrade;
