import { FC } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { legalDraft, stageName } from "views/pages/LOAN/utils";
import MainForm from "../MainForm";

const LegalForm: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const organ = params.organ;
  const current = legalDraft.indexOf(params['*'].split('/')[0]);
  console.log('currentCHILD',organ, current);

  const beforeChange = (_: number, next: number) => {
    let tabNext = legalDraft[next];

    navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/legal-draft/${organ}/${tabNext}`);

    return true;
  }
  return <>
    <Steps
      className="step-child"
      onChange={beforeChange}
      current={!!~current ? current : 0}
      sx={{
        '&.step-child': {
          '& .MuiTabs-flexContainer': {
            justifyContent: "flex-start",
            transform: "translateX(5.4%)",
          },
        }
      }}
      alternative
      attachLabel="tập tin"
      steps={
        [
          {
            node: '1',
            label: 'Người vay',
            hasSub: false,
            attachment: 15,
          },
          {
            node: '2',
            label: 'Người hôn phối',
            hasSub: false,
            attachment: 15,
          },
          {
            node: '3',
            label: 'Người đồng vay',
            hasSub: false
          }
        ]
      }
    >

      <Routes>
        <Route path="borrower" element={<MainForm/>} />
      </Routes>
      <Routes>
        <Route path="marriage" element={< MainForm/>} />
      </Routes>
      <Routes>
        <Route path="co-brw" element={< MainForm/>} />
      </Routes>


    </Steps>
  </>;
}
export default LegalForm;