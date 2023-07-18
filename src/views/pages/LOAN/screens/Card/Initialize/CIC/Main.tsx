import { FC } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { cicRouter } from "views/pages/LOAN/utils";
import CardHolder from "./Declare/CardHolder";
import Other from "./Declare/Other";
import ReferencePerson from "./Declare/ReferencePerson";


export interface CICMainProps{
  isSCB: boolean;
  organ: string;
}

const CICMain: FC<CICMainProps> = (props) => {
  const { isSCB, organ } = props;
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const declare = params['*'].split('/')[0]; /// declare
  const current = cicRouter.indexOf(declare);

  const beforeChange = (_: number, next: number) => {
    const name = cicRouter[next]
    navigate(`/loan/card/init/${params.id}/cic-card/${params.organ}/${name}`);
    return true;
  }
  return <>
    <Steps
      className="step-child"
      onChange={beforeChange}
      current={!!~current ? current : 0}
      sx={{
        '&.step-child':{
          '& .MuiTabs-flexContainer':{
            justifyContent:`${isSCB ? "flex-end" : "center"}`,
            transform: `${isSCB ? "translateX(-22%)" : "translateX(-12.8%)"}`,
          },
        }
      }}
      alternative
      attachLabel="tập tin"
      steps={
        [
          {
            node: 'I',
            label: 'Chủ thẻ chính',
            hasSub: false,
            attachment: 15,
          },
          {
            node: 'II',
            label: 'Người giới thiệu',
            hasSub: false
          },
          {
            node: 'III',
            label: 'Đối tượng khác',
            hasSub: false
          }
        ]
      }
    >

      <Routes>
        <Route path="card-holder/*" element={<CardHolder isSCB={params.organ === 'scb'} />} />
      </Routes>
      <Routes>
        <Route path="ref/*" element={<ReferencePerson isSCB={params.organ === 'scb'} />} />
      </Routes>
      <Routes>
        <Route path="other/*" element={<Other isSCB={params.organ === 'scb'} />} />
      </Routes>


    </Steps>



  </>;
}
export default CICMain;