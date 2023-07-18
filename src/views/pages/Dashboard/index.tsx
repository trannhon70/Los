import { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { updateDocumentTitle } from 'utils';
import Statistic from './Statistic';
import Map from './Map';
import dashboardStyle from './style';
import Grid from '@mui/material/Grid';
import Loan from './Loan';
import RaisedChart from './RaisedChart';
import LoanChart from './LoanChart';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { clearLOANNormalStorageLegal, clearLOANNormalStorageProduct, clearStorageApprovalFullData, clearStorageCollateral } from 'features/loan/normal';
import { ILOANURLParams } from 'types/models/loan';
import { clearNormalLOAN } from 'features/loan/normal/storage/loan/actions';
import { clearLOANNormalStorageCIC } from 'features/loan/normal/storage/cic/actions';
import { clearLOANNormalGuide } from 'features/loan/normal/storageGuide/action';
import { clearStorageApprovalICR } from 'features/loan/normal/storageApproval/icr/actions';
import { clearCustomerStoreData } from 'features/loan/normal/storage/customer/actions';
import { clearStorageApprovalCIC } from 'features/loan/normal/storageApproval/cic/actions';
import { clearStoredHistoryLogs } from 'features/loan/normal/storage/historyLogs/action';
import { clearLOANNormalStorageIncome } from 'features/loan/normal/storage/income/action';
import { clearNormalOtherStorage } from 'features/loan/normal/storage/other/action';
import { clearNormalICRStorage } from 'features/loan/normal/storage/icr/actions';
import { clearStoreDashboard } from 'features/dashboard/store/slice';
import { clearApprovalStorageLoan } from 'features/loan/normal/storageApproval/loan/action';
import { setTitlePage } from 'features/app/store/slice';

const Dashboard: FC = () => {

  const { t } = useTranslation();
  const classes = dashboardStyle();
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  useEffect(() => {
    updateDocumentTitle(t('Pages.Dashboard.Sidebar'));
   
    if (!params['*']) {
      dispatch(clearStoreDashboard(""));
      dispatch(clearLOANNormalStorageProduct());
      dispatch(clearLOANNormalStorageLegal());
      dispatch(clearNormalLOAN());
      dispatch(clearLOANNormalStorageCIC());
      dispatch(clearStorageCollateral());
      dispatch(clearLOANNormalStorageIncome());
      dispatch(clearNormalOtherStorage())
      dispatch(clearNormalICRStorage())
      
      dispatch(clearStorageApprovalFullData())
      dispatch(clearLOANNormalGuide());
      dispatch(clearStorageApprovalICR());
      dispatch(clearCustomerStoreData());
      dispatch(clearStorageApprovalCIC());
      dispatch(clearStoredHistoryLogs());
      dispatch(clearApprovalStorageLoan())

      dispatch( setTitlePage(""));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return <Box>

    <Statistic className={ classes.statistic } />

    <Grid container spacing={ 3 } className={ classes.second }>
      <Grid item xl={ 4 } lg={ 12 } md={ 12 }>
        <Map className={ classes.map } classNameMapBox= {classes.MapBox} />
      </Grid>
      <Grid item xl={ 8 } lg={ 12 } md={ 12 } className={ classes.loan }>
        <Loan />
      </Grid>
    </Grid>

    <Grid container spacing={ 3 } className={ classes.charts }>
      <Grid item md={ 6 }>  
        <RaisedChart />
      </Grid>
      <Grid item md={ 6 }>
        <LoanChart />
      </Grid>
    </Grid>

  </Box>


}

export default Dashboard;
