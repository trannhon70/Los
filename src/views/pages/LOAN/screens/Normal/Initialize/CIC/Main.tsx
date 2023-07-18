import { getAttachmentCountCIC, getCICFull, getCompleteCICStep, getLegalExistData } from "features/loan/normal/storage/cic/selectors";
import { generateTypeParams } from "features/loan/normal/storageGuide/generateTypeStateGuide";
import * as _ from 'lodash';
import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { ILOANNormalStorageCICDeclareData, ILOANNormalStorageCICState } from "types/models/loan/normal/storage/CIC";
import { PREFIX_LOCAL } from "utils";
import Steps, { StepItem } from "views/components/layout/Steps";
import { cicRouterNormal } from "views/pages/LOAN/utils";
import AttachmentModalCIC from "views/pages/LOAN/widgets/AttachmentCIC";
import MainPage from "./Form/Main";
interface Props{
  organType?:string
}
const CICMain: FC<Props> = ({organType = ''}) => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const organ = params.organ ?? "other";
  const declare = params["*"].split("/")[0]; /// declare
  const getAttachmentCount = useSelector(getAttachmentCountCIC(organ))

  const declareLegalList = useSelector(getLegalExistData);

  const current = cicRouterNormal.indexOf(declare);
  const [isOpen, setOpenAttachment] = useState<boolean>(false);
  const dataCICFull = useSelector(getCICFull());
  const [userAttach, setUserAttachment] = useState<{declare:string,uuid:string}>({declare:'',uuid:''});
  const completeCICStep = useSelector(getCompleteCICStep)

  const getListDeclares = (organActive: keyof ILOANNormalStorageCICState)=>{
      const borrowers:ILOANNormalStorageCICDeclareData[] = _.get(dataCICFull,[organActive,'data','borrower','data',],[]);
      const marriages:ILOANNormalStorageCICDeclareData[] = _.get(dataCICFull,[organActive,'data','marriage','data'],[]);
      const coBrws:ILOANNormalStorageCICDeclareData[] = _.get(dataCICFull,[organActive,'data','co-brw','data'],[]);
      const coPayer:ILOANNormalStorageCICDeclareData[] = _.get(dataCICFull,[organActive,'data','co-payer','data'],[]);
      const lawRlt:ILOANNormalStorageCICDeclareData[] = _.get(dataCICFull,[organActive,'data','law-rlt','data'],[]);
      const other:ILOANNormalStorageCICDeclareData[] = _.get(dataCICFull,[organActive,'data','other','data'],[]);
      return ({
        borrowers,marriages,coBrws,coPayer,lawRlt,other
      })
  };
  const declareData = useMemo(()=>{
    const {borrowers,marriages} = getListDeclares(organType as keyof ILOANNormalStorageCICState);
    
    const countAttachFiles=(data:ILOANNormalStorageCICDeclareData[])=>{
      let count = 0;
      data.forEach(person =>{
        person?.document_info_list?.forEach(parentDoc=>{
          parentDoc.document_list.forEach(doc=>{
            count += doc?.document_child_files?.filter(file=>!file.uuid.includes(PREFIX_LOCAL))?.length ?? 0;
          })
        })
      })
      return count;
    }
    return ({
      borrower:{attachment: countAttachFiles(borrowers),uuid:_.get(borrowers,[0,'person_uuid'],'')},
      marriage:{attachment: countAttachFiles(marriages),uuid:_.get(marriages,[0,'person_uuid'],'')},
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataCICFull,organType]); 
  

  const beforeChange = (_: number, next: number) => {
    const name = cicRouterNormal[next];
    navigate(`/loan/normal/init/${params.id}/cic/${params.organ}/${name}`);
    return true;
  };

  const handleOpenModal = (step:StepItem) => {
    const value = String(step.value?? '');
    if(value.includes('borrower') || value.includes('marriage')){
      const [declareUser = '',uuid = ''] = value.split("<uuid>");
      if(declareUser !== declare) return;
      setUserAttachment({declare:declareUser,uuid});
      setOpenAttachment(true);
    }
  };
  const dataPosition = generateTypeParams(`cic/${params.organ}/${params['*']}`) ?? ""
  // console.log(params);
  
  return (
    <>
      <Steps
        className="step-child"
        onChange={beforeChange}
        current={!!~current ? current : 0}
        sx={{
          "&.step-child": {
            "& .MuiTabs-flexContainer": {
              justifyContent: `${organ === "scb" ? "flex-end" : "flex-start"}`,
              // transform: `${
              //   organ === "scb" ? "translateX(-2%)" : "translateX(1%)"
              // }`,
                "& .mscb-step-attach":{
                  marginTop:0,
                },
                "& .MuiTab-root": {
                  padding: '20px 0px 20px 0px'
                }
            },
            "& .mscb-steps-panes":{
              "& .MuiTabs-flexContainer": {
                  "& .MuiTab-root": {
                    padding: '0px'
                  }
            }
          },
            "& .MuiButtonBase-root":{
          
              "& .mscb-step-item":{
                paddingLeft:'30px',
                "& .mscb-step-label":{
                  width: "130px",
                  fontSize:'14px'
                }
              }
            },
            "& .MuiButtonBase-root:first-of-type":{
              marginLeft:"3px",
              "& .mscb-step-item":{
                "& .mscb-step-label":{
                  width: "110px",
                }
              }
            },
            "& .MuiButtonBase-root:last-child":{
              "& .mscb-step-item":{
                "& .mscb-step-label":{
                  width: "120px",
                }
              }
            },
            "& .MuiButtonBase-root:nth-of-type(5)":{
              "& .mscb-step-item":{
                "& .mscb-step-label":{
                  width: "150px",
                }
              }
            }
          },
        }}
        alternative
        onAttach={handleOpenModal}
        attachLabel="tập tin"
        steps={[
          {
            node: "I",
            label: "Người vay",
            hasSub: false,
            attachment: getAttachmentCount.borrower[0]?.count ?? 0 ,
            value:`borrower<uuid>${declareData.borrower.uuid}`,
            completed: completeCICStep[organ === 'scb' ? 'scb': 'other'].borrower
          },
          {
            node: "II",
            label: "Người hôn phối",
            attachment: getAttachmentCount.marriage[0]?.count ?? 0,
            hasSub: false,
            disabled: !declareLegalList.includes('MARRIAGE'),
            value:`marriage<uuid>${declareData.marriage.uuid}`,
            completed: completeCICStep[organ === 'scb' ? 'scb': 'other'].marriage
          },
          {
            node: "III",
            label: "Người đồng vay",
            hasSub: false,
            disabled: !declareLegalList.includes('CO_BRW'),
            completed: completeCICStep[organ === 'scb' ? 'scb': 'other'].co_brw
          },
          {
            node: "IV",
            label: "Người đồng trả nợ",
            hasSub: false,
            disabled: !declareLegalList.includes('CO_PAYER'),
            completed: completeCICStep[organ === 'scb' ? 'scb': 'other'].co_payer
          },
          {
            node: "V",
            label: "Người liên quan theo quy định của pháp luật",
            hasSub: false,
            disabled: !declareLegalList.includes('LAW_RLT'),
            completed: completeCICStep[organ === 'scb' ? 'scb': 'other'].law_rlt
          },
          {
            node: "VI",
            label: "Đối tượng khác",
            hasSub: false,
            disabled: !declareLegalList.includes('OTHER'),
            completed: completeCICStep[organ === 'scb' ? 'scb': 'other'].others
          },
        ]}
      >
        <Routes>
          <Route path=":declare/*" element={<MainPage enableList={true} />} />
        </Routes>
        <Routes>
          <Route path=":declare/*" element={<MainPage enableList={true} />} />
        </Routes>
        <Routes>
          <Route path=":declare/*" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path=":declare/*" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path=":declare/*" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path=":declare/*" element={<MainPage />} />
        </Routes>
      </Steps>
      {isOpen && <AttachmentModalCIC 
        open={Boolean(isOpen)} 
        onClose={()=>setOpenAttachment(false)}
        uuidActive={userAttach.uuid} 
        declareType={userAttach.declare}
        position={dataPosition}
      />}
    </>
  );
};
export default CICMain;
