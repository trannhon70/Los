import { Paper } from "@mui/material";
import { FC, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { updateDocumentTitle } from "utils";
import TabPanel from "views/components/layout/TabPanel";
import Tabs from "views/components/layout/Tabs";
import { stageName, tabDisbursementURL } from "views/pages/LOAN/utils";
import InitializeDisbursement from "./InitializeDisbursement";
import QualityEvalution from "./QualityEvalution";

const CreateDisbursement: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const current = tabDisbursementURL.indexOf(params["*"].split("/")[0]);
  //['initialize-disbursement','quality-evalution'];
  const currentStage = stageName.indexOf(params.stage);

  useEffect(() => {
    currentStage === 2 && updateDocumentTitle("Giải ngân khoản vay");
  });


  const beforeChange = (_: number, next: number) => {
    let tabNext = tabDisbursementURL[next];

    switch (tabNext) {
      case "initialize-disbursement":
        navigate(
          `/loan/normal/${stageName[4]}/${params.id}/${tabNext}/base-info`
        );
        break;
      case "quality-evalution":
        navigate(`/loan/normal/${stageName[4]}/${params.id}/${tabNext}`);
        break;
      default:
        navigate(
          `/loan/normal/${stageName[4]}/${params.id}/${tabNext}`
        );
        break;
    }
    return true;
  };

  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: 0,
        "& > .mscb-tabs": {
          "& > .MuiTabs-root": {
            "& > .MuiTabs-scroller": {
              "& > .MuiTabs-flexContainer": {
                borderBottom: "2px solid #d5d5d5",
              },
            },
          },
        },
      }}
      className="px-6"
    >
      <Tabs
        current={!!~current ? current : 0}
        beforeChange={beforeChange}
        tabs={[
          "KHỞI TẠO GIẢI NGÂN",
          "Đánh giá chất lượng dịch vụ",
        ]}
        sx={{
          "& .MuiTabs-flexContainer": {
            "& .MuiButtonBase-root": {
              fontSize: 15,
              lineHeight: "22px",
              minHeight: 41,
              color: "var(--mscb-secondary)",
              fontWeight: 400,
            },
            "& .Mui-selected": {
              color: "#1825aa",
              fontWeight: 500,
            },
          },
        }}
      >
        <TabPanel
          index={0}
          value={current}
          sx={{
            alignItems: "center",
            "& > .MuiBox-root": {
              height: "100%",
            },
          }}
        >
          <Routes>
            <Route path="initialize-disbursement/*" element={<InitializeDisbursement />} />
          </Routes>
        </TabPanel>
        <Routes>
          <Route path="quality-evalution" element={<QualityEvalution />} />
        </Routes>
      </Tabs>
    </Paper>
  );
};
export default CreateDisbursement;
