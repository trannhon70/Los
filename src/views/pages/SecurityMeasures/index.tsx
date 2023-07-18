import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import RegSecurityMeasures from '../LOAN/screens/Normal/RegSecurityMeasures';
import AuthorInfo from './AuthorInfo';
import DashboardSec from './DashboardSec';
import ListRecCommitment from './ListRecCommitment';

const SecurityMeasuresPage: FC = () => {

  return <>
    <Routes>
      <Route path="/" element={<DashboardSec />} />
      <Route path="list-record/*" element={<ListRecCommitment />} />
      <Route path="loan/normal/reg-security-measures/42731u93832479312487/collateral-info" element={<RegSecurityMeasures />} />
      <Route path="author-info" element={<AuthorInfo />} />
    </Routes>
  </>
}

export default SecurityMeasuresPage