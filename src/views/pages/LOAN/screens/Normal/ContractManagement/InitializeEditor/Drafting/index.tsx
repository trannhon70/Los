import { FC } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import Steps from "views/components/layout/Steps";
import { draftingEditorRouter } from "views/pages/LOAN/utils";
import Collateral from "./Collateral";
import Contact from "./Contact";
import Disbursement from "./Disbursement";
import LoanInfo from "./LOAN";

const Drafting: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const declare = params['*'].split('/')[0];
  const current = draftingEditorRouter.indexOf(declare);

  // ['loan', 'disbursement', 'collaterall', 'contact']

  const beforeChange = (_: number, next: number) => {
    const name = draftingEditorRouter[next];
    navigate(`/loan/normal/contract-management/${params.id}/initialize-editor/${params.organ}/${name}`);
    return true;
  }

  return <>
    <Steps
      className="step-child"
      onChange={beforeChange}
      current={!!~current ? current : 0}
      alternative
      sx={{
        "&.step-child": {
          "& .MuiTabs-flexContainer": {
            width: '65%',
            transform: 'translateX(34%)',
            "& .mscb-step-attach":{
              marginTop:0,
            },
          },
        },
      }}
      attachLabel="tập tin"
      steps={
        [
          {
            node: 'I',
            label: 'Thông tin khoản vay',
            hasSub: false,
            attachment: 15,
          },
          {
            node: 'II',
            label: 'Thông tin giải ngân',
            hasSub: false,
            attachment: 15,
          },
          {
            node: 'III',
            label: 'Tài sản bảo đảm',
            hasSub: false
          },
          {
            node: 'IV',
            label: 'Thông tin liên hệ',
            hasSub: false
          }
        ]
      }
    >
      <Routes>
        <Route path=":declare/*" element={< LoanInfo />}/>
      </Routes>
      <Routes>
        <Route path=":declare/*" element={ <Disbursement /> }/>
      </Routes>
      <Routes>
        <Route path=":declare/*" element={ <Collateral /> }/>
      </Routes>
      <Routes>
        <Route path=":declare/*"  element={ <Contact /> } />
      </Routes>
    </Steps>
  </>;
}
export default Drafting;