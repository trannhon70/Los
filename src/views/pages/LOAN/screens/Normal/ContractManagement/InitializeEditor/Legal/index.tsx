import { FC } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { legalEditorRouter } from "views/pages/LOAN/utils";
import MainPage from "./MainPage";

const Legal: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const declare = params["*"].split("/")[0];
  const current = legalEditorRouter.indexOf(declare);

  const beforeChange = (_: number, next: number) => {
    const name = legalEditorRouter[next];
    navigate(
      `/loan/normal/contract-management/${params.id}/initialize-editor/${params.organ}/${name}`
    );
    return true;
  };

  return (
    <>
      <Steps
        className="step-child"
        onChange={beforeChange}
        current={!!~current ? current : 0}
        alternative
        sx={{
          "&.step-child": {
            "& .MuiTabs-flexContainer": {
              width: "50%",
              transform: "translateX(34.85%)",
              "& .mscb-step-attach": {
                marginTop: 0,
              },
            },
          },
        }}
        attachLabel="tập tin"
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
          <Route path=":declare/*" element={<MainPage enableList={true} />} />
        </Routes>
        <Routes>
          <Route path=":declare/*" element={<MainPage enableList={true} />} />
        </Routes>
        <Routes>
          <Route path=":declare/*" element={<MainPage />} />
        </Routes>
      </Steps>
    </>
  );
};
export default Legal;
