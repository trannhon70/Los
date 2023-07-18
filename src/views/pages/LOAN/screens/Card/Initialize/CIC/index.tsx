import { FC, Fragment } from 'react';
import Steps from 'views/components/layout/Steps';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import CICMain from './Main';
import { Divider } from '@mui/material';
import ButtonBar from 'views/components/layout/ButtonBar';
import RatingsReview from './Form/RatingsReview';
import { cicOrganRouter } from 'views/pages/LOAN/utils';
import { CICSteps } from './style';


const CIC: FC = () => {
  const params = useParams() as ILOANURLParams;

  const organName = params['*'].split('/')[0]; // other/scb

  const declare = params['*'].split('/')[1]; //declare

  const current = cicOrganRouter.indexOf(organName);

  const navigate = useNavigate();

  const beforeChange = (_: number, next: number) => {
    const organ = cicOrganRouter[next];
    navigate(`/loan/card/init/${ params.id }/cic-card/${ organ }/card-holder`);
    return true;
  }

  return (
    <Fragment>
      <Steps
        current={!!~current ? current : 0}
        onChange={beforeChange}
        className="my-6 mscb-loan-card-cic"
        sx={CICSteps}
        steps={[
          {
            node: "A",
            label: "QHTD tại các tổ chức tín dụng khác",
            hasSub: true,
          },
          {
            node: "B",
            label: "Khoản vay hiện hữu tại SCB",
            hasSub: true,
          },
          {
            node: "C",
            label: "Tổng hợp điểm xếp hạng",
            hasSub: false,
          },
        ]}
      >
        <Routes>
          <Route path=":organ/*" element={<CICMain organ={organName} isSCB={organName === 'scb'} />} />
        </Routes>
        <Routes>
          <Route path=":organ/*" element={<CICMain organ={organName} isSCB={organName === 'scb'} />} />
        </Routes>
        <Routes>
          <Route path="rating-review/*" element={<RatingsReview />} />
        </Routes>
      </Steps >
      <Divider className="my-6" />
      <ButtonBar
        className="mb-6"
      />
    </Fragment>
  );


}

export default CIC;