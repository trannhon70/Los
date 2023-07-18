import { FC, Fragment } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { contractDraft, detailsDraft, registerDraft, stageName } from "views/pages/LOAN/utils";
import LegalForm from "../LegalDraft/LegalForm";
import LegalSCBForm from "../LegalDraft/LegalSCBForm";
import Commitment from "./Commitment";
import MortgageContract from "./MortgageContract";
import ReceiptRecord from "./ReceiptRecord";
import RegisterForm from "./RegisterForm";

const Details: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const current = detailsDraft.indexOf(params['*'].split('/')[0]);

  const beforeChange = (_: number, next: number) => {
    let tabNext = detailsDraft[next];
    switch (next) {
      case 0:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${tabNext}/${contractDraft[0]}`);
        break;
      case 1:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${tabNext}/${registerDraft[0]}`);
        break;
      case 2:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${tabNext}`);
        break;
      case 3:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${tabNext}`);
        break;
      default:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/${tabNext}/${registerDraft[0]}`);
        break;
    }


    return true;
  }
  return <Fragment>
    <Steps
      className="step-child"
      current={!!~current ? current : 0}
      onChange={beforeChange}
      alternative
      steps={[
        {
          node: "I",
          label: "Hợp đồng thế chấp",
          hasSub: true,
        },
        {
          node: "II",
          label: "Đơn đăng ký",
          hasSub: true,
        },
        {
          node: "II",
          label: "Biên bản giao nhận",
          hasSub: false,
        },
        {
          node: "IV",
          label: "Cam kết CTXD",
          hasSub: false,
        },
      ]}
      sx={{
        '&.step-child': {
          '& .MuiTabs-flexContainer': {
            justifyContent: "center",
          },
        }
      }}
    >

      <Routes>
        <Route path=":organ/*" element={<MortgageContract />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<RegisterForm />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<ReceiptRecord />} />
      </Routes>
      <Routes>
        <Route path=":organ/*" element={<Commitment />} />
      </Routes>
    </Steps>
  </Fragment>
};
export default Details