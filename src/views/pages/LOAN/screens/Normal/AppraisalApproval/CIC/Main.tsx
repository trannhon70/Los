// import { useS2ConvertCICAttach } from 'features/loan/normal/storageApproval/cic/handleData';
import { getAttachFileData, getGroupActive, getListMainDeclareCICDocumentData, getLOANNormalApprovalStorageCICMain, getMainTotalAmount } from 'features/loan/normal/storageApproval/cic/selectors';
import { FC, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { formatNumber } from 'utils';
import Steps, { StepItem } from "views/components/layout/StepsApproval";
import { declareCICURL, stageName } from "views/pages/LOAN/utils";
import AttachmentFullCIC from 'views/pages/LOAN/widgets/AttachmentCICAll';
import CardHolder from "./Form/BorrowerCICApp";
import CoBorrower from "./Form/CoBorrower";
import CoPayer from "./Form/CoPayer";
import Marriage from "./Form/Marriage";
export interface CICMainProps {
  organ?: string;
  dataPosition: string
}
const MainCIC: FC<CICMainProps> = (props) => {
  const { organ, dataPosition } = props;
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const [attachDataOpen, setOpenAttach] = useState<{open:boolean,uuid:string}>({open:false,uuid:''});
  const mainData = useSelector(getLOANNormalApprovalStorageCICMain)
  const groupActive = useSelector(getGroupActive)
  const attachFileData = useSelector(getAttachFileData)
  const listUsersMain = useSelector(getListMainDeclareCICDocumentData);
      
  // const dataFUllCIC = useSelector(getCICFull());
  // const { listUsers } = useS2ConvertCICAttach(dataFUllCIC);

  const getGroup = (groupActive: string) => {
    switch (groupActive) {
      case 'marriage':
        return 'marriage'
      case 'co_brw':
        return 'co-borrower'
      case 'co_payer':
        return 'co-payer'
      case 'borrower':
        return 'borrower'
      default:
        return ''
    }
  }
  const current = declareCICURL.indexOf(getGroup(groupActive));
  const beforeChange = (_: number, next: number) => {
    const name = declareCICURL[next]
    navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${organ}/${name}`);
    return true;
  }
    
  const handleOpenAttach = (step: StepItem) => {  
    const value = String(step.value ?? '');
    if (value.includes('BORROWER')) {
      setOpenAttach({uuid:attachFileData?.borrower[0]?.uuid ?? '',open:true})
    }
    else if(value.includes('MARRIAGE')) {
      setOpenAttach({uuid:attachFileData?.marriage[0]?.uuid ??'',open:true})
    } 
  }

  const mainObjectTotalAmount = useSelector(getMainTotalAmount)

  return <Fragment>
    <Steps
      className="mb-5 step-child"
      current={!!~current ? current : 0}
      onChange={beforeChange}
      attachLabel="tập tin"
      sx={{
        '&.step-child': {
          '& .MuiTabs-flexContainer': {
            justifyContent: "center",
            transform: `translateX(-10%)`,
          },
          '& .ObjectListContent': {
            '& .MuiTabs-flexContainer': {
              justifyContent: "flex-end",
              transform: `translateX(0)`,
            },
          }
        }
      }}
      alternative
      onAttach={handleOpenAttach}
      incomeStepsTotal
      steps={
        [{
          node: 'I',
          label: 'Người vay',
          attachment: attachFileData?.borrower[0]?.total ?? 0,
          hasSub: false,
          extra: formatNumber(mainObjectTotalAmount.borrower.toString()),
          value: 'BORROWER',
          completed: (mainData['borrower'].data.length > 0)
        },
        {
          node: 'II',
          label: 'Người hôn phối',
          attachment: attachFileData?.marriage[0]?.total ?? 0,
          hasSub: false,
          extra: formatNumber(mainObjectTotalAmount.marriage.toString()),
          value: 'MARRIAGE',
          disabled: !(mainData['marriage'].data.length > 0),
          completed: (mainData['marriage'].data.length > 0),
        },
        {
          node: 'III',
          label: 'Người đồng vay',
          hasSub: false,
          extra: formatNumber(mainObjectTotalAmount.co_brw.toString()),
          value: 'CO-BRW',
          disabled: !(mainData['co_brw'].data.length > 0),
          completed: (mainData['co_brw'].data.length > 0),

        },
        {
          node: 'IV',
          label: 'Người đồng trả nợ',
          hasSub: false,
          extra: formatNumber(mainObjectTotalAmount.co_payer.toString()),
          value: 'CO-PAYER',
          disabled: !(mainData['co_payer'].data.length > 0),
          completed: (mainData['co_payer'].data.length > 0),
        }]
      }
    >
      <Routes>
        <Route path="borrower/*" element={<CardHolder dataPosition={dataPosition}/>} />
      </Routes>
      <Routes>
        <Route path="marriage/*" element={<Marriage dataPosition={dataPosition}/>} />
      </Routes>
      <Routes>
        <Route path="co-borrower/*" element={<CoBorrower dataPosition={dataPosition}/>} />
      </Routes>
      <Routes>
        <Route path="co-payer/*" element={<CoPayer dataPosition={dataPosition}/>} />
      </Routes>
    </Steps>
    {/* <AttachmentModalApprovalCIC 
      open={isOpen} 
      onClose={() => setOpenAttach(false)} 
      attachData={attachData}
    /> */}
    {attachDataOpen.open && 
      <AttachmentFullCIC
        open={attachDataOpen.open}
        uuidActive={attachDataOpen.uuid}
        onClose={()=>setOpenAttach({uuid:'', open:false})}
        listUsers={listUsersMain}
      />
    }
  </Fragment>
}
export default MainCIC;