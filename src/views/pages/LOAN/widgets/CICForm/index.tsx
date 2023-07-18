import { FC } from 'react';
import Box from '@mui/material/Box';
import CICBasic from './Basic';
import CICDetail from './Detail';
import CreditScoreInfo from './CreditScoreInfo';

export interface CICFormProps{
  label: string;
  type: string;
  enableList?: boolean;
}

const CICForm: FC<CICFormProps> = props => {

  const { label, type, enableList } = props;

  return <Box>
    <CICBasic label={ label } enableList={ enableList } />
    <CICDetail type={ type } />
    <CreditScoreInfo titleCard='Rủi ro tín dụng'/>
  </Box>
}

export default CICForm;