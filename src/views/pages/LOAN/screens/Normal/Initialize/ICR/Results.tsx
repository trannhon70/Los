import { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import Button from '@mui/material/Button';
import TextArea from 'views/components/base/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import {setLoanNormalEmpICRResult} from 'features/loan/normal/storage/icr/actions';
import { ILOANNormalStorageICRData, ILOANNormalStorageICRDataBusinessCommon } from 'types/models/loan/normal/storage/ICR';
import { getLoanNormalICRData } from 'features/loan/normal/storage/icr/selector';
import { timestampToDate } from 'utils/date';
import { checkRuleICR, getGuide } from 'features/loan/normal/storageGuide/selector';


const ICRResults: FC = () => {
  const dispatch = useDispatch();

  const data = useSelector(getLoanNormalICRData)
  const changeData = (value: string| number,name: keyof ILOANNormalStorageICRDataBusinessCommon,gr: keyof ILOANNormalStorageICRData) => {
    dispatch(setLoanNormalEmpICRResult(value,{key:name,gr}))
  };

  const ruleIcr = useSelector(checkRuleICR);
  const getCurrentStateGroup = useSelector(getGuide)?.current_state_group;

  console.log("ruleIcr",ruleIcr)

  const checkTypeApproved = ():boolean =>{
    if(getCurrentStateGroup === "APPROVER_BRANCH"){
      return false;
    }
    return true;
  }

  return <Box className="mt-6">
    <Typography variant="h4" component="div" className="flex items-center">
      <Box className="font-bold text-20 text-upper">
        B. KẾT QUẢ
      </Box>
      <Button
        variant="outlined"
        color="primary"
        className="ml-6"
        sx={{
          borderRadius: 0,
          boxShadow: '0 3px 6px 0 rgba(24, 37, 170, 0.2)',
          textTransform:'unset'
        }}
      >Xếp hạng tín dụng</Button>
    </Typography>
    <Grid container spacing={3}>
      <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
        <CardInside
          title="I. Tại nhân viên kinh doanh"
          classBody="h-full p-6"
          sx={{ height: 'calc(100% - 20px)' }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Box>
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="1. Tổng điểm"
                  disabled={getCurrentStateGroup !== "INITIALIZER"}
                  placeholder='Nhập điểm'
                  value={ data?.business_employee?.score?.toString() ?? '' }
                  type="number"
                  onDebounce={(val)=>{
                    changeData(Number(val),'score','business_employee')
                  }}
                  format
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="2. Hạng"
                  disabled={getCurrentStateGroup !== "INITIALIZER"}
                  placeholder='Nhập hạng'
                  value={data?.business_employee?.ranking}
                  onDebounce={(val)=>{
                    changeData(val,'ranking','business_employee')
                  }}

                />
              </Grid>
            </Grid>
          </Box>
          {  data?.business_employee?.approval_date ? <Box className="text-right mt-6">
            <em className="text-small">Thời gian cập nhật: </em>
            <em className="text-primary text-small">{timestampToDate(+data.business_employee.approval_date)}</em>
          </Box>:null}
        </CardInside>
      </Grid>
      <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
        <CardInside
          title="II. Tại cấp phê duyệt"
          classBody="h-full p-6"
          sx={{ height: 'calc(100% - 20px)' }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Box>
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="1. Tổng điểm"
                  disabled={getCurrentStateGroup !== "APPROVER_BRANCH"}
                  value={data?.approval_level?.score?.toString()}
                  placeholder='Nhập điểm'
                  type="number"
                  format
                  onDebounce={(val)=>{
                    changeData(Number(val),'score','approval_level')
                  }}

                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="2. Hạng"
                  disabled={getCurrentStateGroup !== "APPROVER_BRANCH"}
                  placeholder='Nhập hạng'
                  value={data?.approval_level?.ranking}
                  onDebounce={(val)=>{
                    changeData((val),'ranking','approval_level')
                  }}


                />
              </Grid>
            </Grid>
          </Box>
          {  data?.approval_level?.approval_date ? <Box className="text-right mt-6">
            <em className="text-small">Thời gian cập nhật: </em>
            <em className="text-primary text-small">{timestampToDate(+data.approval_level.approval_date)}</em>
          </Box>:null}
        </CardInside>
      </Grid>
      <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
        <CardInside
          title="III. Quản lý rủi ro"
          classBody="h-full px-6 pt-6 pb-0"
          sx={{ height: 'calc(100% - 20px)' }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <Box>
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="1. Tổng điểm"
                  disabled={true}
                  placeholder='Nhập điểm'
                  value={data?.risk_management?.score?.toString()}
                  type="number"
                  format
                  onDebounce={(val)=>{
                    changeData(Number(val),'score','risk_management')
                  }}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Input
                  label="2. Hạng"
                  placeholder='Nhập hạng'
                  value={data?.risk_management?.ranking}
                  onDebounce={(val)=>{
                    changeData(val,'ranking','risk_management')
                  }}
                  disabled={true}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextArea
                  className="extra-textarea"
                  label={
                    <Box className="flex justify-between">
                      <span>3. Ghi chú</span>
                        {data?.risk_management?.approval_date?                       <span>
                        <em className="text-small">Thời gian cập nhật: </em>
                        <em className="text-primary text-small">{timestampToDate(+data.risk_management.approval_date)}</em>
                      </span>:null}
                    </Box>
                  }
                  onDebounce={(val)=>{
                    changeData(val,'description','risk_management')
                  }}
                  disabled={true}
                  value={data?.risk_management?.description}
                  placeholder='Nhập ghi chú'
                  sx={{
                    '&.extra-textarea': {
                      '& label': {
                        display: 'flex',
                        '&>div': {
                          width: '100%',
                          '& em': { fontWeight: 400 }
                        }
                      },
                      '& textarea': {
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        mb: '0!important'
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box className="text-right mt-6">
          </Box>
        </CardInside>
      </Grid>
    </Grid>
  </Box>

}

export default ICRResults;