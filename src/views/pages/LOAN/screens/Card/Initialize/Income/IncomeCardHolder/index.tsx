import { FC } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { incomeCard } from "views/pages/LOAN/utils";
import OtherIncome from "./OtherIncome";
import SalarySource from "./SalarySource";

const IncomeCardHolder: FC = () => {
  const params = useParams() as ILOANURLParams;

  const sName = params["*"];
  const current = sName === "other" ? 1 : 0;

  const navigate = useNavigate();

  const beforeChange = (_: number, next: number) => {
    const s = next === 1 ? "other" : "salary";
    navigate(`/loan/card/init/${params.id}/income-card/income/${s}`);
    return true;
  };

  return (
    <div>
      <Steps
        current={!!~current ? current : 0}
        onChange={beforeChange}
        alternative
        sx={{
            '& .MuiTabs-flexContainer ':{
              justifyContent: 'center',
              width:'75%',
            },
            '& .mscb-step-label': {
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }
          
        }}
        steps={[
          {
            node: "1",
            label: "Nguồn lương",
            hasSub: false,
          },
          {
            node: "2",
            label: "Nguồn thu khác",
            hasSub: false,
          },
        ]}
      >
        <Routes>
          <Route path="salary" element={<SalarySource />} />
        </Routes>

        <Routes>
          <Route path="other" element={<OtherIncome />} />
        </Routes>
      </Steps>
    </div>
  );
};

export default IncomeCardHolder;
