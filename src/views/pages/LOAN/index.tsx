import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import LOANNormal from './screens/Normal';
import LOANCard from './screens/Card';
import StaffInformation from '../StaffInformation';
import CorrdinatorLOAN from './screens/Corrdinator';

const LOANPage: FC = () => {
  return <Routes>
    <Route path="normal/*">
      <Route path=":stage/*">
        <Route path=":id/*" element={ <LOANNormal /> } />
          {/* <Route path=":tab/*" element={ <LOANNormal /> } />
        </Route> */}
      </Route>
    </Route>
    <Route path="card/*">
      <Route path=":stage/*">
        <Route path=":id/*" element={ <LOANCard /> }>
          {/* <Route path=":tab/*" element={ <LOANCard /> } /> */}
        </Route>
      </Route>
    </Route>

    <Route path="corrdinator/*" element={ <CorrdinatorLOAN /> } />

    <Route path=":tab/*" element={ <StaffInformation /> } />
  </Routes>
}

export default LOANPage;