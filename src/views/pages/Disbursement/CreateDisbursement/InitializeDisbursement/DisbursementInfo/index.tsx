import { FC, useState } from "react"
import { useNavigate, useParams, Routes, Route } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { disbursementInfoURL, stageName } from "views/pages/LOAN/utils";
import BusinessPerformance from "./BusinessPerformance";
import ConditionInfo from "./ConditionInfo";
import CreditRanking from "./CreditRanking";
import CreditRelations from "./CreditRelations";
import CusGroupRelate from "./CusGroupRelate";
import InfoDisbursement from "./InfoDisbursement";

const DisbursementInfo: FC = () => {
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;

  const organName = params["*"].split("/")[0];

  const current = disbursementInfoURL.indexOf(organName);
  // disbursementInfoURL= ['info','credit-relations','credit-ranking','business-performance','customer-grp-relate','condition-info']

  const beforeChange = (_: number, next: number) => {
    const nextDeclare = disbursementInfoURL[next];
    navigate(
      `/loan/normal/${stageName[4]}/${params.id}/initialize-disbursement/disbursement-info/${nextDeclare}`
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
            transform: "translateX(-0.3%)",
            width: "100%",
          },
        },
      }}
      steps={[
        {
          node: "I",
          attachment: 15,
          label: "Thông tin hồ sơ giải ngân",
        },
        {
          node: "II",
          label: "Quan hệ tín dụng",
          attachment: 15
        },
        {
          node: "III",
          label: "Xếp hạng tín dụng",
          hasSub: false,
          attachment: 15

        },
        {
          node: "IV",
          label: "Tình hình hoạt động kinh doanh",
          hasSub: false,
          attachment: 15

        },
        {
          node: "V",
          label: "Nhóm khách hàng liên quan",
          hasSub: false,
          attachment: 15

        },
        {
          node: "VI",
          label: "Thông tin điều kiện GN",
          hasSub: false,
          attachment: 15

        },

      ]}
    >
      <Routes>
        <Route path=":declare/*" element={<InfoDisbursement />} />
      </Routes>
      <Routes>
        <Route path=":declare/*" element={<CreditRelations />} />
      </Routes>
      <Routes>
        <Route path=":declare/*" element={<CreditRanking />} />
      </Routes>
      <Routes>
        <Route path=":declare/*" element={<BusinessPerformance />} />
      </Routes>
      <Routes>
        <Route path=":declare/*" element={<CusGroupRelate />} />
      </Routes>
      <Routes>
        <Route path=":declare/*" element={<ConditionInfo />} />
      </Routes>

    </Steps>
  </>
}
export default DisbursementInfo