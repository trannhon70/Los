import { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextArea from 'views/components/base/TextArea';
import CardInside from 'views/components/layout/CardInside';
import { useDispatch } from 'react-redux';
import { setAnalysisEvaluateInfo } from 'features/loan/normal/storage/loan/actions';
import { useSelector } from 'react-redux';
import { getLOANNormalStorageLOANFinance } from 'features/loan/normal/storage/loan/selectors';
import SelectRemark from 'views/components/widgets/SelectRemark';
import AbelPayLabelCheckCheck from 'views/components/widgets/AbelPayLabelCheck';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';

const AnalysisEvaluate: FC = () => {

  const dispatch = useDispatch()
  const Finance = useSelector(getLOANNormalStorageLOANFinance);
  const ruleDisabled = useSelector(getRuleDisbled)
  const getMessage =  useNormalLoanMessage();
  return <Box>
    <Typography 
      variant="h4" 
      component="h4" 
      className="font-bold text-upper mt-6 mb-3" 
      sx={{
        fontSize: '19px'
      }}
    >
      E. PHÂN TÍCH / ĐÁNH GIÁ
      <span className="text-danger"> (*)</span>
    </Typography>
    <Box>
      <CardInside 
        title="I. Nội dung"
        classBody="pt-6 pb-0 px-6" 
        fieldsetClass="px-4" 
        titleClass="px-2"
      >
        <Grid container spacing={ 3 }>
          <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 } className='pb-6'>
            <Box>
              <AbelPayLabelCheckCheck
                disabled= { ruleDisabled }
                onChange={(value) =>{
                  dispatch(setAnalysisEvaluateInfo(value.toString() ?? '',{key:"loan_appraised_analysis_info"}))
                }}
                value={Finance?.E?.loan_appraised_analysis_info === '' ? 'N' :  Finance?.E?.loan_appraised_analysis_info }
              />
            </Box>
            <Box className="mt-3">
              <SelectRemark
                value={Finance?.E?.loan_evaluate_info}
                label="1. Đánh giá về Phương án và nhu cầu vay vốn" 
                onChange={(value) =>{
                  dispatch(setAnalysisEvaluateInfo(value,{key:"loan_evaluate_info"}))
                }}
                message={getMessage('business/finance-analysis', 'evaluate_info')}
                disabled= { ruleDisabled }
              />
            </Box>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 12 } sm={ 12 } xs={ 12 }>
            <Box>
              <TextArea 
                onDebounce={(value)=>{
                  dispatch(setAnalysisEvaluateInfo(value,{key:"loan_comment"}))
                }} 
                label="2. Nhận xét"  
                value={Finance?.E?.loan_comment} //BE res null
                message={getMessage('business/finance-analysis', 'loan_comment')}
                disabled= { ruleDisabled }
              />
            </Box>
          </Grid>
        </Grid>
      </CardInside>
    </Box>
  </Box>

}

export default AnalysisEvaluate;