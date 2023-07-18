import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Divider, Grid, Input } from '@mui/material';
import useMasterData from 'app/hooks/useMasterData';
import { getCICFull, getCICInfo } from 'features/loan/normal/storage/cic/selectors';
import { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ILOANNormalStorageCICOrgan } from "types/models/loan/normal/storage/CIC";
import { intToRoman } from 'utils';
import Empty from 'views/components/layout/Empty';
import ObjectList from 'views/components/layout/ObjectList';
import { DeclareCIC } from 'views/pages/LOAN/utils';
import AttachmentFullCIC from "views/pages/LOAN/widgets/AttachmentCICAll";
import { useS1ConvertCICAttachFile } from 'views/pages/LOAN/widgets/AttachmentCICAll/hook';
import CreditScoreInfo from '../CreditScoreInfo';
import ReviewDetailsInfo from '../ReviewDetailInfo';
import ratingsReviewStyles from './style';


const RatingsReview: FC = () => {

  const classes = ratingsReviewStyles();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { CifIfType, register } = useMasterData();
    
  useEffect(() => {
    register('cifIfType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const [activeObject, setActiveObject] = useState<number>(-1);
  const [activeDeclare, setActiveDeclare] = useState<string>("");
  const [openAttachFile,setOpenAttachFile] = useState<{uuid:string,open:boolean}>({open:false,uuid:''});

  const handleOpenModal = (index: number, declare: string) => {
    setActiveObject(index);
    setActiveDeclare(declare);
    setOpenModal(!isOpenModal);
  }
  const handleCloseModal = () => {
    setOpenModal(!isOpenModal);
  }
  const existData = useSelector(getCICInfo());
  
  const dataFUllCIC = useSelector(getCICFull());

  const { listUsers } = useS1ConvertCICAttachFile(dataFUllCIC);
  const countAttachFile = (uuid:string)=>{
    const currentUser = listUsers.find(it=>it.person_uuid === uuid);
    
    if(!currentUser) return 0;
    let count = 0;
    currentUser?.identities.forEach((indetity)=>{
      indetity?.credits?.forEach(credit=>{
        credit.documents.forEach(parentDoc=>{
          parentDoc?.document_list?.forEach(doc=>{
            count += (doc?.document_child_files?.length ?? 0);
          })
        })
      })
    });
    return count;
  }
  
  const getTitle = (key: string) => {
    return DeclareCIC[key as keyof typeof DeclareCIC]
  }

  // useEffect(() => {
  //   dispatch(fetchDataCICAfterSave(true));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <Fragment>
    {
      Object.keys(existData?.data).length ?
        (<div className={`${classes.root} pt-5`}>
          <Grid xl={12} className="css-control">
            <span className="control-number">STT</span>
            <span className="control-label">THÔNG TIN ĐIỂM TÍN DỤNG</span>
            <span className="control-count"></span>
            <Divider />
          </Grid>
          {existData?.data && Object.keys(existData.data)?.filter(key => existData.data[key]?.data?.length > 0).map((key, index) => {
            return <Fragment key={index}>
              <Grid container columnSpacing="20px" rowSpacing="20px" >
                <Grid item xl={12} className="type-person pl-8 pt-9">
                  <span>{intToRoman(index + 1)}</span>
                  <Input className={`colorWhite`} disabled value={getTitle(key)} />
                </Grid>
                <Grid item xl={12} md={12} xs={12}>
                  <Divider />
                </Grid>
                {
                  existData?.data && existData?.data[key as keyof ILOANNormalStorageCICOrgan]?.data?.map((x, idx) => {
                    // if (!x.data.find(c => c.credit.length > 0)) return;
                    return <Fragment key={idx}>
                      <Grid item xl={12} md={12} xs={12} >
                        <Grid
                          container
                          columnSpacing="20px"
                          rowSpacing="20px"
                          className="info-cic flex-row"
                        >
                          <div className="pl-7 pt-5 ">
                            <span className="cic-stt">{idx + 1}</span>
                            <span className="cic-title">THÔNG TIN CIC</span>
                            <div className="cic-customer">
                              <ObjectList
                                current={0}
                                enableMenu={false}
                                options={[
                                  { label: `${x.full_name}`,attachment:countAttachFile(x.person_uuid), circle: <AccountCircleIcon />,},
                                ]}
                                className={`${classes.userListClass} `}
                                onAttach={()=>setOpenAttachFile({uuid:x.person_uuid, open:true})}
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
                              (x.data.some(c => c.credit.length > 0)) && <Button
                              className="buttonReview"
                              variant="outlined"
                              onClick={() => handleOpenModal(idx, key)}
                            >
                              Xem lại thông tin CIC
                            </Button>
                            }
                            

                          </div>
                          <Grid item xl={12} md={12} xs={12} className="pl-9" rowSpacing="20px">
                            {
                              x.data?.map((id, index) => {
                                return <CreditScoreInfo
                                  key={index}
                                  titleCard={`Rủi ro tín dụng - ${CifIfType?.find(c => c.code === id.identity_type)?.name} - ${id.identity_num}`} data={id}
                                  disabled={true} declare={key}
                                />
                              })
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                      <ReviewDetailsInfo 
                        data={existData.data} 
                        declare={activeDeclare} 
                        pos={activeObject} 
                        open={idx === activeObject && key === activeDeclare && isOpenModal} 
                        onClose={handleCloseModal} 
                      />
                    </Fragment>
                  })
                }
                <Grid item xl={12} md={12} xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            </Fragment>
          })}
        </div>) : <Empty 
          sx={{
            minHeight: 400,
            "& img": {
              width: "23%"
            },
            fontSize: '20px',
            fontWeight: 300,
            // fontStyle: 'italic',
          }}
        >Không có dữ liệu CIC</Empty>
    }
    {openAttachFile.open && 
      <AttachmentFullCIC
        open={openAttachFile.open}
        uuidActive={openAttachFile.uuid}
        onClose={()=>setOpenAttachFile({uuid:'', open:false})}
        listUsers={listUsers}
      />
    }
  </Fragment>
}

export default RatingsReview;