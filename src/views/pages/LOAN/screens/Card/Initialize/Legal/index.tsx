import { FC, Fragment, useEffect } from "react";
import CardLegalHolder from "./CardHolder";
import { Box } from "@mui/system";
import SuppCard from "./SuppCard";
import SpouseInfo from "./SpouseInfo";
import OtherCard from "./Other";
import ReferencePerson from "./ReferencePerson";
import ContactInfo from "./ContactInfo";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { useDispatch } from "react-redux";
import { DeclareNameCard } from "views/pages/LOAN/utils";
import ButtonBar from "views/components/layout/ButtonBar";
import Divider from "@mui/material/Divider";
import { SxSteps } from './style';
import Steps from "views/components/layout/Steps";
import DeclareStep from "views/components/widgets/DeclareStep";

const Legal: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const beforeChange = (_: number, next: number) => {

    navigate(`/loan/card/init/${params.id}/legal-card/${DeclareNameCard[next]}`);
    return true;
  }
  const current = DeclareNameCard.indexOf(params['*']);


  const onSave = () => {
    // dispatch(saveLOANNormalLegal(false));
  }

  const onContinue = () => {
    // dispatch(saveLOANNormalLegal(true));
  }

  const onBack = () => {
    const backPosition = current - 1;

    if (backPosition < 0){
      navigate(`/loan/card/init/${ params.id }/product-card`);
      return;
    }

    navigate(`/loan/card/init/${ params.id }/legal-card/${ DeclareNameCard[backPosition] }`);
  }

  const onExit = () => {
    navigate('/');
  }


  return (
    <Fragment>
      <DeclareStep
        className="my-6 mscb-loan-normal-legal"
        current={!!~current ? current : 0}
        sx={SxSteps}
        type='credit'
        onChange={beforeChange}
        
      >
        <Routes>
          <Route path="card-holder" element={<CardLegalHolder />} />
        </Routes>
        <Routes>
          <Route path="spouse" element={<SpouseInfo />} />
        </Routes>
        <Routes>
          <Route path="sub-card" element={<SuppCard />} />
        </Routes>
        <Routes>
          <Route path="contact" element={<ContactInfo />} />
        </Routes>
        <Routes>
          <Route path="ref-person" element={<ReferencePerson />} />
        </Routes>
        <Routes>
          <Route path="other" element={<OtherCard />} />
        </Routes>
      </DeclareStep>
      <Divider className="my-6" />
    <ButtonBar
      className="pb-6"
      onSave={ onSave }
      onContinue={ onContinue }
      onBack={ onBack }
      onExit={ onExit }
    />
    </Fragment>
  );
};

export default Legal;
