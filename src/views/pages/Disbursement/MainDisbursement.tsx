import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { clearStoreDashboard } from 'features/dashboard/store/slice';
import { clearLOANNormalStorageLegal, clearLOANNormalStorageProduct, clearStorageApprovalFullData, clearStorageCollateral } from 'features/loan/normal';
import { clearLOANNormalStorageCIC } from 'features/loan/normal/storage/cic/actions';
import { clearStoredHistoryLogs } from 'features/loan/normal/storage/historyLogs/action';
import { clearLOANNormalStorageIncome } from 'features/loan/normal/storage/income/action';
import { clearNormalLOAN } from 'features/loan/normal/storage/loan/actions';
import { clearStorageApprovalICR } from 'features/loan/normal/storageApproval/icr/actions';
import { clearApprovalStorageLoan } from 'features/loan/normal/storageApproval/loan/action';
import { clearLOANNormalGuide } from 'features/loan/normal/storageGuide/action';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { updateDocumentTitle } from 'utils';
import Map from '../../pages/Dashboard/Map';
import ListRecordMain from './Form/ListRecordMain';
import ListRecordsDraft from './Form/ListRecordsDraft';
import SearchForm from './Form/SearchForm';
import mainDisbursement from './style';


const MainDisbursement: FC = () => {

  const { t } = useTranslation();
  const classes = mainDisbursement();
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;

  useEffect(() => {
    updateDocumentTitle(t('Pages.SecurityMeasures'));

    if (!params['*']) {
      dispatch(clearStoreDashboard(""));
      dispatch(clearLOANNormalStorageProduct());
      dispatch(clearLOANNormalStorageLegal());
      dispatch(clearNormalLOAN());
      dispatch(clearLOANNormalStorageCIC());
      dispatch(clearStorageCollateral());
      dispatch(clearLOANNormalStorageIncome());

      dispatch(clearStorageApprovalFullData())
      dispatch(clearLOANNormalGuide());
      dispatch(clearStorageApprovalICR());
      dispatch(clearStoredHistoryLogs());
      dispatch(clearApprovalStorageLoan())

    }

  });


  return <Box>


    <Grid container spacing={3} className={classes.second}>
      <Grid item xl={4} lg={12} md={12}>
        <Map className={classes.map} classNameMapBox={classes.MapBox} />
      </Grid>
      <Grid item xl={8} lg={12} md={12} className={classes.loan}>
        <SearchForm />
        <ListRecordMain />
      </Grid>
    </Grid>

    <Grid container spacing={3} className={classes.charts}>
      <Grid item xl={12} md={12} sm={12}>
        <ListRecordsDraft isHideBtn={false} />
      </Grid>

    </Grid>

  </Box >


}

export default MainDisbursement;
