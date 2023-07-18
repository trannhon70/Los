import { Paper } from "@mui/material";
import { FC, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { updateDocumentTitle } from "utils";
import Loading from "views/components/base/Loading";
import TabPanel from "views/components/layout/TabPanel";
import Tabs from "views/components/layout/Tabs";
import { stageName, tabContractURL } from "views/pages/LOAN/utils";
import DraftContract from "./DraftContract";
import InitializeEditor from "./InitializeEditor";
import QualityEvalution from "./QualityEvalution";

const ContractManagement: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const current = tabContractURL.indexOf(params["*"].split("/")[0]);
  //['initialize-editor', 'drafting-contract', 'quality-evalution'];
  const currentStage = stageName.indexOf(params.stage);
 

  useEffect(() => {
    currentStage === 2 && updateDocumentTitle("Quản lý hợp đồng");
  });


  const beforeChange = (_: number, next: number) => {
    let tabNext = tabContractURL[next];

    switch (tabNext) {
      case "initialize-editor":
        navigate(
          `/loan/normal/${stageName[2]}/${params.id}/${tabNext}/legal/borrower`
        );
        break;
      case "drafting-contract":
        navigate(
          `/loan/normal/${stageName[2]}/${params.id}/${tabNext}/file-grp`
        );
        break;
      case "quality-evalution":
        navigate(`/loan/normal/${stageName[2]}/${params.id}/${tabNext}`);
        break;
      default:
        navigate(
          `/loan/normal/${stageName[2]}/${params.id}/${tabNext}/legal/borrower`
        );
        break;
    }
    return true;
  };

  console.log({params});
  
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
      {(()=>{
           if (params.id === "-") {
            return <Loading sx={{height:500}}/>;
          }
          return (
            <Tabs
            current={!!~current ? current : 0}
            beforeChange={beforeChange}
            tabs={[
              "Khởi tạo soạn thảo",
              "Soạn thảo hợp đồng",
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
                <Route path="initialize-editor/*" element={<InitializeEditor />} />
              </Routes>
            </TabPanel>
            <Routes>
              <Route path="drafting-contract/*" element={<DraftContract />} />
            </Routes>
            <Routes>
              <Route path="quality-evalution" element={<QualityEvalution />} />
            </Routes>
          </Tabs>
          )
      })()}
      
    </Paper>
  );
};
export default ContractManagement;
