import { getAdditionalTotalAmount, getGroupActive, getLOANNormalApprovalStorageCICAdditional } from 'features/loan/normal/storageApproval/cic/selectors';
import { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { formatNumber } from "utils";
import Steps from "views/components/layout/StepsApproval";
import { declareCICName, declareCICTabBURL, stageName } from "views/pages/LOAN/utils";
import LegalRelated from "./Form/LegalRelated";
import OtherPerson from "./Form/OtherPerson";
export interface CICMainProps {
  organ?: string;
  dataPosition: string
}

const Addition: FC<CICMainProps> = (props) => {
  const { organ, dataPosition } = props;
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const groupActive = useSelector(getGroupActive)

  const additionalObjectTotalAmount = useSelector(getAdditionalTotalAmount)
  const additionalData = useSelector(getLOANNormalApprovalStorageCICAdditional)

  const getGroup = (groupActive: string) => {
    switch (groupActive) {
      case 'others':
        return 'other'
      case 'law_rlt':
        return 'legal-related'
      default:
        return ''
    }
  }
  const current = declareCICTabBURL.indexOf(getGroup(groupActive));

  const beforeChange = (_: number, next: number) => {
    const name = declareCICTabBURL[next]

    navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${organ}/${name}`);
    return true;
  }

  return <Steps
    onChange={beforeChange}
    current={!!~current ? current : 0}
    alternative
    incomeStepsTotal
    attachLabel="tập tin"
    sx={{
      '& .MuiTabs-flexContainer': {
        justifyContent: "flex-end",
        transform: "translateX(-26%)",
      },
      '& .ObjectListContent': {
        '& .MuiTabs-flexContainer': {
          justifyContent: "flex-end",
          transform: `translateX(0)`,
        },
      }
    }}
    steps={
      [{
        node: 'I',
        label: declareCICName[4],
        hasSub: false,
        extra: formatNumber(additionalObjectTotalAmount.law_rlt.toString()) ,
        value: 'LAW-RLT',
        disabled: !(additionalData['law_rlt'].data.length > 0),
        completed: (additionalData['law_rlt'].data.length > 0),
      },
      {
        node: 'II',
        label: declareCICName[5],
        hasSub: false,
        extra: formatNumber(additionalObjectTotalAmount.others.toString())  ,
        value: 'OTHERS',
        disabled: !(additionalData['others'].data.length > 0),
        completed: (additionalData['others'].data.length > 0),
      },]
    }
  >
    <Routes>
      <Route path="legal-related/*" element={<LegalRelated  dataPosition={dataPosition}/>} />
    </Routes>
    <Routes>
      <Route path="other/*" element={<OtherPerson  dataPosition={dataPosition}/>} />
    </Routes>
  </Steps>

}
export default Addition;