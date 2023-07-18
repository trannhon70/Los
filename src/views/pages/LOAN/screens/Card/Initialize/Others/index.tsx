import { FC, Fragment } from "react";
import Steps from "views/components/layout/Steps";
import clsx from "clsx";
import othersStyle from "./style";
import ExceptionInfo from "./ExceptionInfo";
import LimitRisk from "./LimitRisk";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { Divider } from "@mui/material";
import ButtonBar from "views/components/layout/ButtonBar";

const Others: FC = () => {
  const classes = othersStyle();
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const current = ["exception", "limit-risk"].indexOf(params["*"]);

  const beforeChange = (_: number, next: number) => {
    const step = next === 1 ? "limit-risk" : "exception";
    navigate(`/loan/card/init/${params.id}/other-card/` + step);
    return true;
  };

  return (
    <Fragment>
      <Steps
        className={clsx(classes.root, "steps othersStep")}
        current={!!~current ? current : 0}
        onChange={beforeChange}
        steps={[
          {
            node: "A",
            label: "Thông tin về ngoại lệ",
            hasSub: false,
          },
          {
            node: "B",
            label: "Phân tích và biện pháp hạn chế rủi ro",
            hasSub: false,
          },
        ]}
      >
        <Routes>
          <Route path="exception" element={<ExceptionInfo />} />
        </Routes>
        <Routes>
          <Route path="limit-risk" element={<LimitRisk />} />
        </Routes>
      </Steps>
      <Divider className="my-6" />
      <ButtonBar
        className="pb-6"
        // onSave={ onSave }
        // onContinue={ onContinue }
        // onBack={ onBack }
        // onExit={ onExit }
      />
    </Fragment>
  );
};

export default Others;
