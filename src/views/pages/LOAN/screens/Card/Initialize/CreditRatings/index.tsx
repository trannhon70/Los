import { Divider } from '@mui/material';
import { FC } from 'react';
import ButtonBar from 'views/components/layout/ButtonBar';
import Indicators from './Indicators';
import Results from './Results';

const CreditRatings: FC = () => {

  return <div>
    <Indicators />
    <Results />
    <Divider className="my-6" />
    <ButtonBar
      className="pb-6"
      // onSave={ onSave }
      // onContinue={ onContinue }
      // onBack={ onBack }
      // onExit={ onExit }
    />
  </div>

}

export default CreditRatings;