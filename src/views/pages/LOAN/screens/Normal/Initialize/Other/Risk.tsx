import { FC } from 'react';
import Box from '@mui/material/Box';
import CardInside from 'views/components/layout/CardInside';
import TableSticky from 'views/components/layout/TableSticky';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import TextArea from 'views/components/base/TextArea';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { addNewRisk, setAcceptCredit, setAcceptCreditControl, setReasonCredit } from 'features/loan/normal/storage/other/action';
import { getAnalysis, getRiskGroup } from 'features/loan/normal/storage/other/selectors';
import RiskItem from './RiskItem';
import useNormalOtherMessage from 'app/hooks/useNormalOtherMessage';
import AcceptCreditCheck from 'views/components/widgets/AcceptCreditCheck';
import { getGuide, getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { ILOANNormalStorageAnalysisState, ILOANNormalStorageControlApproval } from 'types/models/loan/normal/storage/Other';


const OtherRisk: FC = () => {

  const dispatch = useDispatch();

  const dataRiskGroup = useSelector(getRiskGroup);
  const dataAnalysis = useSelector(getAnalysis);

  const getMessage = useNormalOtherMessage();
  const ruleDisabled = useSelector(getRuleDisbled)
  const ruleData = useSelector(getGuide)?.current_state_group

  const handleAdd = () => dispatch(addNewRisk());

  const handleChangeRadio = (value: string) => dispatch(setAcceptCredit(value));

  const handleChangeDataControl = (
    key: keyof Pick<ILOANNormalStorageAnalysisState, 'controlCredit' | 'approveCredit'>,
    keydata: keyof ILOANNormalStorageControlApproval,
    value: string) => {
    dispatch(setAcceptCreditControl({ key: key, keydata: keydata, data: value }))
  }


  const onChangeNote = (value: string) => dispatch(setReasonCredit(value));

  const generateLayoutByRule = () => {
    if ((ruleData !== "INITIALIZER") && (ruleData !== 'CONTROLLER_BRANCH')) {
      return <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12} sx={{
          '& .MuiBox-root': {
            marginTop: 0,
          }
        }}>
          <CardInside
            title="III.  Kiến nghị và đề xuất CTD của CKS"
            classBody="h-full p-6"
            sx={{ height: 'calc(100% - 20px)' }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16"
          >
            <AcceptCreditCheck
              disabled={true}
              value={dataAnalysis?.controlCredit?.acceptCreditInfo?.length ? dataAnalysis?.controlCredit?.acceptCreditInfo : "Y"}
            />
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} xs={12}>
                <TextArea
                  sx={{
                    marginBottom: '20px'
                  }}
                  value={dataAnalysis?.controlCredit?.reasonCredit}
                  disabled={true}
                  label="1. Lí do"
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>

        <Grid item xl={6} lg={6} md={12} sm={12} xs={12} sx={{
          '& .MuiBox-root': {
            marginTop: 0,
          }
        }}>
          <CardInside
            title="IV.  Kiến nghị và đề xuất CTD của CPD"
            classBody="h-full p-6"
            sx={{ height: 'calc(100% - 20px)' }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16"
          >
            <AcceptCreditCheck
              disabled={ruleData !== 'APPROVER_BRANCH'}
              onChange={(value)=>handleChangeDataControl('approveCredit','acceptCreditInfo',value)}
              value={dataAnalysis?.approveCredit?.acceptCreditInfo?.length ? dataAnalysis?.approveCredit?.acceptCreditInfo : "Y"}
            />
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} xs={12}>
                <TextArea
                  disabled={ruleData !== 'APPROVER_BRANCH'}
                  sx={{
                    marginBottom: '20px'
                  }}
                  maxlength={500}
                  label="1. Lí do"
                  value={dataAnalysis?.approveCredit?.reasonCredit}
                  onDebounce={(value)=>handleChangeDataControl('approveCredit','reasonCredit',value)}
                  message={getMessage('reasonCredit')}
                />
              </Grid>
            </Grid>
          </CardInside>

        </Grid>
      </Grid>
    }
    else if (ruleData !== "INITIALIZER") {
      return <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12} sx={{
          '& .MuiBox-root': {
            marginTop: 0,
          }
        }}>
          <CardInside
            title="III.  Kiến nghị và đề xuất CTD của CKS"
            classBody="h-full p-6"
            sx={{ height: 'calc(100% - 20px)' }}
            fieldsetClass="px-4"
            titleClass="px-2 text-16"
          >
            <AcceptCreditCheck
              onChange={(value)=>handleChangeDataControl('controlCredit','acceptCreditInfo',value)}
              value={dataAnalysis?.controlCredit?.acceptCreditInfo?.length ? dataAnalysis?.controlCredit?.acceptCreditInfo : "Y"}
            />
            <Grid container spacing={3}>
              <Grid item xl={12} md={12} xs={12}>
                <TextArea
                  sx={{
                    marginBottom: '20px'
                  }}
                  maxlength={500}
                  label="1. Lí do"
                  value={dataAnalysis?.controlCredit?.reasonCredit}
                  onDebounce={(value)=>handleChangeDataControl('controlCredit','reasonCredit',value)}
                  message={getMessage('reasonCredit')}
                />
              </Grid>
            </Grid>
          </CardInside>
        </Grid>
      </Grid>
    }
    else return null
  }


  return <Box className="mt-6 ">
    <Grid container spacing={3}>
      <Grid item xl={6} lg={6} md={12} sm={12} xs={12} sx={{
        '& .MuiBox-root': {
          marginTop: 0,
        }
      }}>
        <CardInside
          title="I. Phân tích và biện pháp hạn chế rủi ro"
          classBody=" p-6"
          sx={{
            height: 'calc(100% - 20px)',
            '& .card-inside-body': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }
          }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <TableSticky>
            <TableBody>
              {
                dataRiskGroup && dataRiskGroup?.map((item, index) => {
                  return (
                    <RiskItem data={item} key={index} stt={index} />
                  )
                })
              }
            </TableBody>
          </TableSticky>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAdd}
            disabled={ruleDisabled}
            sx={{
              borderRadius: 'unset !important',
              marginTop: '8px',
              width: '25%',
              textTransform: 'unset',
              marginBottom: '20px'
            }}
            className="text-14"
          >
            Thêm loại rủi ro
          </Button>
        </CardInside>
      </Grid>
      <Grid item xl={6} lg={6} md={12} sm={12} xs={12}
        sx={{
          '& .MuiBox-root': {
            marginTop: 0,
          }
        }}
      >
        <CardInside
          title="II. Kiến nghị và đề xuất CTD"
          classBody="h-full p-6"
          sx={{ height: 'calc(100% - 20px)' }}
          fieldsetClass="px-4"
          titleClass="px-2 text-16"
        >
          <AcceptCreditCheck
            onChange={handleChangeRadio}
            disabled={ruleDisabled}
            value={dataAnalysis?.acceptCreditInfo?.length ? dataAnalysis?.acceptCreditInfo : "Y"}
          />
          <Grid container spacing={3}>
            {/* <Grid item xl={12} md={12} xs={12}>
              <Radio
                // value={dataAnalysis.}
                variant="checkbox"
                sx={{
                  '& .MuiFormGroup-root': {
                    '& .MuiFormControlLabel-root': {
                      width: '48%',
                    }
                  }
                }}
                options={[
                  { value: "Y", label: "Đồng ý cấp tín dụng và các ngoại lệ" },
                  { value: "N", label: "Không đồng ý cấp tín dụng" },
                ]} 
                name="except"
              />
            </Grid> */}
            <Grid item xl={12} md={12} xs={12}>
              <TextArea
                sx={{
                  marginBottom: '20px'
                }}
                disabled={ruleDisabled}
                maxlength={500}
                label="1. Lí do"
                value={dataAnalysis?.reasonCredit ?? ""}
                onDebounce={onChangeNote}
                message={getMessage('reasonCredit')}
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
    {generateLayoutByRule()}

  </Box>

}

export default OtherRisk;