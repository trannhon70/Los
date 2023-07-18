import { FC } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { legalDraft, stageName } from "views/pages/LOAN/utils";
import Borrower from "./Borrower";
import CoBorrower from "./CoBorrower";
import Marriage from "./Marriage";

const LegalInfo: FC = () => {
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;
  const organName = params["*"].split("/")[0];


  const current = legalDraft.indexOf(organName);
  const beforeChange = (_: number, next: number) => {
    const nextDeclare = legalDraft[next];
    navigate(
      `/loan/normal/${stageName[4]}/${params.id}/initialize-disbursement/legal-info/${nextDeclare}`
    );
    return true;
  }
  return <>
    <Steps
      className="legal-disubursement"
      current={!!~current ? current : 0}
      onChange={beforeChange}
      attachLabel="tập tin"
      alternative
      sx={{
        "&.legal-disubursement": {
          "& .MuiTabs-flexContainer": {
            width: "50%",
            transform: "translateX(20.5%)",
            "& .mscb-step-attach": {
              marginTop: 0,
            },
          },
        },
      }}
      steps={[
        {
          node: "I",
          label: "Người vay",
          hasSub: false,
          attachment: 15,
        },
        {
          node: "II",
          label: "Người hôn phối",
          hasSub: false,
          attachment: 15,
        },
        {
          node: "III",
          label: "Người đồng vay",
          hasSub: false,
        },
      ]}
    >
      <Routes>
        <Route path=":declare/*" element={<Borrower />} />
      </Routes>
      <Routes>
        <Route path=":declare/*" element={<Marriage />} />
      </Routes>
      <Routes>
        <Route path=":declare/*" element={<CoBorrower />} />
      </Routes>

    </Steps>
  </>
}
export default LegalInfo