import { FC } from 'react';
import Box from '@mui/material/Box';
// import ResultBusiness from './ResultBusiness';
// import Symmetrical from './Symmetrical';
import InOutBusiness from './InOutBusiness';
// import DefinationLimited from './DefinationLimited';
import AnalysisEvaluate from './AnalysisEvaluate';
import ResultBusinessV2 from './ResultBusinessV2';
import SymmetricalV2 from './SymmetricalV2';
import DefinationLimitedV2 from './DefinationLimitedV2';

import { autoFillFinance } from 'features/loan/normal/storage/loan/actions';
import { useDispatch } from 'react-redux';

const LOANFinanceAnalysis: FC = () => {

  const dispatch = useDispatch();
  const autoFill = () => {
    dispatch(autoFillFinance(''))
  }

  return <Box>
    {/* <ResultBusiness /> */}
    <ResultBusinessV2/>
    {/* <Symmetrical /> */}
    <SymmetricalV2 />
    <InOutBusiness />
    {/* <DefinationLimited /> */}
    <DefinationLimitedV2 />
    <AnalysisEvaluate />
    {/* <Button  onClick={autoFill}>AutoFill</Button> */}
  </Box>

}

export default LOANFinanceAnalysis;