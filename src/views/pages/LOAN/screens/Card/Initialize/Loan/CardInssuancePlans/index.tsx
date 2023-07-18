import { FC } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import Box from '@mui/material/Box';
import Steps from 'views/components/layout/Steps';
import { SxSteps } from './style';
import ReleaseNew from './ReleaseNew';
import ChangeCreditLimit from './ChangeCreditLimit';

const LOANCardIssuancePlans: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const sName = params['*'];
  const current = sName === 'update-credit-limit' ? 1 : 0;

  const beforeChange = (_: number, next: number) => {
    const s = next === 1 ? 'update-credit-limit' : 'release-new/card-holder';
    navigate(`/loan/card/init/${ params.id }/loan-card/plans/${ s }`);
    return true;
  }

  return <Box>
    <Steps
      className="mscb-loan-card-loan"
      alternative
      onChange={ beforeChange }
      current={ current }
      steps={[
        { label: 'Phát hành mới', node: 'I', hasSub: true },
        { label: 'Thay đổi hạn mức hiện tại /hình thức đảm bảo thẻ', node: 'II', hasSub: false },
      ]}
      sx={SxSteps}
    >
      <Routes>
        <Route path="release-new/*" element={ <ReleaseNew /> } />
      </Routes>
      <Routes>
        <Route path="update-credit-limit/*" element={ <ChangeCreditLimit /> } />
      </Routes>
    </Steps>
  </Box>

}

export default LOANCardIssuancePlans;