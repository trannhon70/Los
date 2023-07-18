import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from 'views/includes/NotFound';
import ProfileList from './screens/ProfileList';

const Corrdinator: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="corrdinator-profile/*" element={ <ProfileList /> } />
      <Route path="corrdinator-description-task/*" element={ <NotFound /> } />
    </Routes>
  )
}

export default Corrdinator;