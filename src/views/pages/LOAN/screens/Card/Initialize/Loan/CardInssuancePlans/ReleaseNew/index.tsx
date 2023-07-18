import { FC } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import Box from '@mui/material/Box';
import Steps from 'views/components/layout/Steps';
import CardHolder from './CardHolder';
import SuppCard from './SuppCard';

const ReleaseNew: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const sName = params['*'];
  const current = sName === 'sub-card' ? 1 : 0;

  const beforeChange = (_: number, next: number) => {
    const s = next === 1 ? 'sub-card' : 'card-holder';
    navigate(`/loan/card/init/${ params.id }/loan-card/plans/release-new/${ s }`);
    return true;
  }

  return <Box>
    <Steps
      className='step-child'
      alternative
      onChange={ beforeChange }
      current={ current }
      steps={[
        { label: 'Chủ thẻ chính', node: '1' },
        { label: 'Chủ thẻ phụ', node: '2' },
      ]}
      // sx={{
      //     '& .MuiTabs-flexContainer ':{
      //       transform: 'translateX(-18%)', 
      //     },
      // }}
    >
      <Routes>
        <Route path="card-holder" element={ <CardHolder /> } />
      </Routes>
      <Routes>
        <Route path="sub-card" element={ <SuppCard /> } />
      </Routes>
    </Steps>
  </Box>

}

export default ReleaseNew;