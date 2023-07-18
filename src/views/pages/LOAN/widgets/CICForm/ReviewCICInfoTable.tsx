import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { ILOANNormalStorageCICState } from 'types/models/loan/normal/storage/CIC';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import { urlToDeclare } from '../../utils';

export interface CICReviewProps {
  label: string;
}

const CICReview: FC<CICReviewProps> = props => {

  const { label } = props;
  const params = useParams() as unknown as ILOANURLParams;
  const declareURL = params['*'];
  const organ = params.organ as keyof ILOANNormalStorageCICState;
  const dec = declareURL.replace('/review', '');
  const declare = urlToDeclare(dec);
  

  // const TotalBalance = Total?.map(t => t[0]).reduce((a, b) => a + b, 0) ?? 0;

  return <Box className="mt-6">
    <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          // value={CurrentDeclare?.basic.fullname}
          label={`1. ${label}`}
          disabled
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng dư nợ (VND)"
          disabled
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng giá trị TSBĐ (VND)"
          disabled
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <InputDate
          label="4. Flexcube ngày"
          disabled
        />
      </Grid>
    </Grid>
    <Box>
     
    </Box>
  </Box >
}

export default CICReview;