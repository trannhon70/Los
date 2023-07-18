import { FC } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import Box from '@mui/material/Box';
import Steps from 'views/components/layout/Steps';
import LOANHouseHoldLegal from './HouseholdLegal';
import LOANFinanceAnalysis from './FinanceAnalysis';
import { useSelector } from 'react-redux';
import { getLOANNormalStorageFullLoan } from 'features/loan/normal/storage/loan/selectors';

const LOANBusiness: FC = () => {

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const dataLoanFull =  useSelector(getLOANNormalStorageFullLoan)

  const sName = params['*'];
  const current = sName === 'finance-analysis' ? 1 : 0;

  const beforeChange = (_: number, next: number) => {
    const s = next === 1 ? 'finance-analysis' : 'household-legal';
    navigate(`/loan/normal/init/${ params.id }/loan/business/${ s }`);
    return true;
  }

  return <Box>
    <Steps
      alternative
      // className="justify-end"
      onChange={ beforeChange }
      current={ current }
      steps={[
        { label: 'Pháp lý hộ kinh doanh', node: 'I', completed: dataLoanFull?.operation_business.business_household_info !== null ? true : false  },
        { label: 'Phân tích tài chính', node: 'II', completed: dataLoanFull?.operation_business.financial_analysis_info !== null ? true : false },
      ]}
      sx={{
        '& .MuiTabs-flexContainer ': {
          justifyContent: 'flex-end',
           transform: 'translateX(-6.5%)',
        },
      }}
    >
      <Routes>
        <Route path="household-legal" element={ <LOANHouseHoldLegal /> } />
      </Routes>
      <Routes>
        <Route path="finance-analysis" element={ <LOANFinanceAnalysis /> } />
      </Routes>
    </Steps>
  </Box>

}

export default LOANBusiness;