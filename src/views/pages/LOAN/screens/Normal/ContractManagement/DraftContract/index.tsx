import Divider from "@mui/material/Divider";
import { FC, Fragment } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import ButtonBarRole from "views/components/layout/ButtonBarRole";
import Steps from "views/components/layout/Steps";
import { draftContractURL, stageName } from "views/pages/LOAN/utils";
import Details from "./Details";
import DraftInfo from "./DraftInfo";
import { FileGroup } from "./FileGroup";
import LegalDraft from "./LegalDraft";
import { DraftContractStyle } from "./style";
import SumFiles from "./SumFiles";

const DraftContract: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const current = draftContractURL.indexOf(params['*'].split('/')[0]);

  const beforeChange = (_: number, next: number) => {
    let tabNext = draftContractURL[next];
    switch (next) {
      case 0:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/${tabNext}`);
        break;
      case 1:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/legal-draft/legal/borrower`);
        break;
      case 2:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/detail/contract/real-estate`);
        break;
      case 3:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/${tabNext}`);
        break;
      case 4:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/${tabNext}`);
        break;
      default:
        navigate(`/loan/normal/${stageName[2]}/${params.id}/drafting-contract/${tabNext}`);
        break;
    }

    return true;
  }

  return <Fragment>
    <Steps
      current={!!~current ? current : 0}
      onChange={beforeChange}
      className="my-6 draft-contract"
      steps={[
        {
          node: "A",
          label: "Nhóm hồ sơ",
          hasSub: false,
        },
        {
          node: "B",
          label: "Thông tin pháp lý",
          hasSub: true,
        },
        {
          node: "C",
          label: "Thông tin chi tiết hồ sơ",
          hasSub: true,
        },
        {
          node: "D",
          label: "Thông tin hồ sơ soạn thảo",
          hasSub: false,
        },
        {
          node: "E",
          label: "Tổng hợp hồ sơ",
          hasSub: false,
        },
      ]}
      sx={DraftContractStyle}
    >

      <Routes>
        <Route path="file-grp" element={<FileGroup />} />
      </Routes>
      <Routes>
        <Route path="legal-draft/*" element={<LegalDraft />} />
      </Routes>
      <Routes>
        <Route path="detail/*" element={<Details />} />
      </Routes>
      <Routes>
        <Route path="draft-info" element={<DraftInfo />} />
      </Routes>
      <Routes>
        <Route path="sum-files" element={<SumFiles/>} />
      </Routes>
    </Steps>
    <Divider className="my-6" />
    <ButtonBarRole
      className="mb-6"
      isApply={true}
      hideDelete={true}
      hideSave={false}
    />

  </Fragment>
}
export default DraftContract;