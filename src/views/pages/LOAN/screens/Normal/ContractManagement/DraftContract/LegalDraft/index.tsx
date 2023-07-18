import { FC, Fragment } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { legalDraft, stageName } from "views/pages/LOAN/utils";
import LegalForm from "./LegalForm";
import LegalSCBForm from "./LegalSCBForm";

const LegalDraft: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const current = params['*'].split('/')[0];

  const beforeChange = (_: number, next: number) => {
    let tabNext = next === 0 ? 'legal' : 'legal-scb';
    switch (next) {
      case 0:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/legal-draft/${tabNext}/borrower`);
        break;
      case 1:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/legal-draft/${tabNext}`);
        break;
      default:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/legal-draft/${tabNext}/borrower`);
        break;
    }


    return true;
  }
  return <Fragment>
    <Steps
      className="step-child"
      current={current === 'legal' ? 0 : 1}
      onChange={beforeChange}
      alternative
      steps={[
        {
          node: "I",
          label: "Thông tin pháp lý",
          hasSub: true,
        },
        {
          node: "II",
          label: "Thông tin pháp lý SCB",
          hasSub: false,
        },
      ]}
      sx={{
        '&.step-child': {
          '& .MuiTabs-flexContainer': {
            justifyContent: "center",
            transform: "translateX(-13%)",
          },
        }
      }}
    >

      <Routes>
        <Route path=":organ/*" element={<LegalForm />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<LegalSCBForm />} />
      </Routes>
    </Steps>
  </Fragment>
}
export default LegalDraft;