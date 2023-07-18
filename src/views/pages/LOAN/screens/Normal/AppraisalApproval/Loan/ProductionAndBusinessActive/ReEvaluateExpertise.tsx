import { Grid } from '@mui/material';
import { setBusinessActivitiesEvaluation } from 'features/loan/normal/storageApproval/loan/action';
import { getApprovalLOANBusinessActivitiesEvaluation } from 'features/loan/normal/storageApproval/loan/selectors';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import CardInside from 'views/components/layout/CardInside';
import { IApprovalLOANBAEvaluationAssessment } from 'types/models/loan/normal/storageApproval/LoanInfoForm';
import useApprovalLOANMessage from 'app/hooks/useApprovalLOANMessage';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const ReEvaluateExpertise: FC = () => {
  const dispatch = useDispatch();
  const evaluation = useSelector(getApprovalLOANBusinessActivitiesEvaluation);
  const ruleDisabled = useSelector(getRuleDisbledReappraise);
  const onChangData = (
    value: string | number | null,
    key: keyof IApprovalLOANBAEvaluationAssessment
  ) => {
    dispatch(setBusinessActivitiesEvaluation(value, { key: key }));
  };
  const getMessage = useApprovalLOANMessage();
  return (
    <CardInside title="IV. Đánh giá tái thẩm định" classBody="p-6">
      <Grid container spacing={3}>
        <Grid item xl={6} md={6} xs={6}>
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} xs={12}>
              <Input
                label="1. Phương thức kinh doanh"
                onDebounce={(val) => {
                  onChangData(val, 'method_business');
                }}
                value={evaluation?.method_business}
                disabled={ruleDisabled}
              />
            </Grid>
            <Grid item xl={6} md={6} xs={12}>
              <Input
                label="2. Số lượng nhân viên"
                required
                type="number"
                onDebounce={(val) => {
                  onChangData(val, 'number_members');
                }}
                value={evaluation?.number_members?.toString()}
                disabled={ruleDisabled}
                message={getMessage('emptyBasic', {
                  fieldName: 'number_members',
                })}
              />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <TextArea
                label="3. Hiệu quả kinh doanh"
                required
                onDebounce={(val) => {
                  onChangData(val, 'business_efficiency');
                }}
                value={evaluation?.business_efficiency}
                disabled={ruleDisabled}
                message={getMessage('emptyBasic', {
                  fieldName: 'business_efficiency',
                })}
                sx={{
                  '& textarea': {
                    height: '107px !important',
                    overflowY: 'scroll!important ',
                    overflowX: 'hidden!important',
                    // marginBottom: "23px!important",
                    border: 'none',
                    backgroundColor: '#f2f3f9',
                    resize: 'none',
                    outline: 0,
                    padding: '8px 12px',
                    fontSize: 'var(--mscb-fontsize)',
                    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  },
                  '& textarea::-webkit-scrollbar': {
                    width: '5px',
                    'border-radius': '50px',
                  },
                  '& textarea::-webkit-scrollbar-thumb': {
                    background: '#d5d5d5',
                    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
                  },
                  '& textarea:focus': {
                    outline: 'none',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6} md={6} xs={6}>
          <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
              <TextArea
                label="4. Đầu vào"
                required
                disabled={ruleDisabled}
                onDebounce={(val) => {
                  onChangData(val, 'input');
                }}
                value={evaluation?.input}
                message={getMessage('emptyBasic', { fieldName: 'input' })}
                sx={{
                  '& textarea': {
                    height: '70px !important',
                    overflowY: 'scroll!important ',
                    minHeight: '70px !important',
                    overflowX: 'hidden!important',
                    // marginBottom: "23px!important",
                    border: 'none',
                    backgroundColor: '#f2f3f9',
                    resize: 'none',
                    outline: 0,
                    padding: '8px 12px',
                    fontSize: 'var(--mscb-fontsize)',
                    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  },
                  '& textarea::-webkit-scrollbar': {
                    width: '5px',
                    'border-radius': '50px',
                  },
                  '& textarea::-webkit-scrollbar-thumb': {
                    background: '#d5d5d5',
                    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
                  },
                  '& textarea:focus': {
                    outline: 'none',
                  },
                }}
              />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <TextArea
                label="5. Đầu ra"
                required
                disabled={ruleDisabled}
                onDebounce={(val) => {
                  onChangData(val, 'output');
                }}
                value={evaluation?.output}
                message={getMessage('emptyBasic', { fieldName: 'output' })}
                sx={{
                  '& textarea': {
                    height: '70px !important',
                    overflowY: 'scroll!important ',
                    overflowX: 'hidden!important',
                    minHeight: '70px !important',
                    // marginBottom: "23px!important",
                    border: 'none',
                    backgroundColor: '#f2f3f9',
                    resize: 'none',
                    outline: 0,
                    padding: '8px 12px',
                    fontSize: 'var(--mscb-fontsize)',
                    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  },
                  '& textarea::-webkit-scrollbar': {
                    width: '5px',
                    'border-radius': '50px',
                  },
                  '& textarea::-webkit-scrollbar-thumb': {
                    background: '#d5d5d5',
                    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
                  },
                  '& textarea:focus': {
                    outline: 'none',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <TextArea
            label="6. Đánh giá"
            required
            disabled={ruleDisabled}
            onDebounce={(val) => {
              onChangData(val, 'evaluate');
            }}
            value={evaluation?.evaluate}
            message={getMessage('emptyBasic', { fieldName: 'evaluate' })}
            sx={{
              '& textarea': {
                height: '120px !important',
                overflowY: 'scroll!important ',
                overflowX: 'hidden!important',
                border: 'none',
                backgroundColor: '#f2f3f9',
                resize: 'none',
                outline: 0,
                padding: '8px 12px',
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                fontSize: 'var(--mscb-fontsize)',
              },
              '& textarea::-webkit-scrollbar': {
                width: '5px',
                'border-radius': '50px',
              },
              '& textarea::-webkit-scrollbar-thumb': {
                background: '#d5d5d5',
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
              },
              '& textarea:focus': {
                outline: 'none',
              },
            }}
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default ReEvaluateExpertise;
