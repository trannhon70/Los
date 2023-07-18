import { FC, useEffect, useState, ClipboardEvent, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import TitleSquare from 'views/components/layout/TitleSquare';
import IncomeAttachment from '../Attachment';
import InputDate from 'views/components/base/InputDate';
import SelectFrequence from 'views/components/widgets/SelectFrequence';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import {
  Document,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
  ILOANNormalStorageIncomePension,
}
  from 'types/models/loan/normal/storage/Income';
import {
  getLOANNormalStorageIncomeSourcePensionData,
}
  from 'features/loan/normal/storage/income/selector';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIncomeSourceType,
  removeIncomeSourceType,
  setIncomeSourceActive,
  setIncomeSourcePensionData,
  setIncomeSourcePensionDataFREQ,
  setIncomeSourcePensionDataTotal
} from 'features/loan/normal/storage/income/action';
import useNormalIncomeMessage from 'app/hooks/useNormalIncomeMessage';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { CommentsDisabledOutlined } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import { pathKeyStore } from 'utils';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';


const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 1,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(19px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#069549',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const IncomeFormPension: FC = () => {

  const params = useParams() as ILOANURLParams;
  const declareTypeURL = params.declare ?? '';
  const incomeTypeURL = params['*'];
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const dispatch = useDispatch();
  const getMessage = useNormalIncomeMessage();
  const dataPension = useSelector(getLOANNormalStorageIncomeSourcePensionData(declareType, params.uuid ?? ''));
  const [onBlurError, setOnBlurError] = useState('');
  const [dateRecievePension, setDateRecievePension] = useState('');
  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({ document_group_type: "NGUON_THU", type_loan: "Loan" }), "pension"));
  const [isDelete, setDelete] = useState<boolean>(false);
  const ruleDisabled = useSelector(getRuleDisbled)
  const onChangePensionOther = (val: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomePension) => {

    dispatch(setIncomeSourcePensionData(val, { declare: declareType, key }))
  }
  // const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(setIncomeSourceActive('pension', { declare: declareType as keyof ILOANNormalStorageIncomeDeclare }));
  }, []);

  const alertMessage = (val: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomePension) => {
    if (key === 'startDate') {
      if (Number(val) > (new Date().getTime())) {
        setDateRecievePension('Vui lòng nhập thời gian bắt đầu nhận lương nghĩ hưu lớn hơn ngày hiện tại');
      } else {
        setDateRecievePension('');
      }
    }
  }

  const onChangeDataTotal = (val: string | number | null | Array<Document>, key: keyof ILOANNormalStorageIncomePension) => {
    Number(val) === 0 ? setOnBlurError('Số tiền lương hưu theo tháng (VND) phải lớn hơn 0') : setOnBlurError('');
    dispatch(setIncomeSourcePensionDataTotal(Number(val), { declare: declareType }));
  }
  const onChangeFreq = (value: string) => {
    dispatch(setIncomeSourcePensionDataFREQ(value, { declare: declareType }));
  }

  const calculateFrequencyType = (type: string | undefined) => {
    let cal = '';
    switch (type) {
      case 'FREQ':
        cal = ((dataPension?.salary ?? 0) * 1).toString();
        break;
      case 'INFREQ':
        cal = ((dataPension?.salary ?? 0) * 0.3).toString();
        break;

      default:
        break;
    }
    return cal;
  }
  const checked = useMemo(() => Boolean(dataPension?.uuid), [dataPension?.uuid]);

  const handleOnChecked = (e: React.SyntheticEvent<Element, Event>, value: boolean) => {
    if (value) {
      const incomeDocument: Document[] = ChildListIncome?.map(cl => ({
        data_file: [],
        document_id: Number(cl.id),
        document_name: cl.name.toString(),
        document_type: cl.type.toString()
      }))
      dispatch(addIncomeSourceType('', { declare: declareType, incomeSource: incomeType, incomeDocument: incomeDocument }));
      return;
    }
    setDelete(true);
  }

  const closeConfirmModal = () => {
    setDelete(false);
  }

  const handleConfirmDelete = () => {
    dispatch(removeIncomeSourceType(dataPension?.uuid ?? '', { declare: declareType, incomeSource: incomeType }));
    setDelete(false);
  }


  return <Box>
    <Grid container spacing={3}>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="1. Tổng thu nhập từ lương hưu trí (VND)"
          disabled
          className="input-red"
          type='number'
          format
          value={(dataPension?.income_from_pension ?? 0).toString()}
        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="2. Tổng thu nhập thường xuyên (VND)"
          disabled
          className="input-red"
          type='number'
          format
          value={(dataPension?.income_from_per ?? 0).toString()}

        />
      </Grid>
      <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
        <Input
          label="3. Tổng thu nhập không thường xuyên (VND)"
          disabled
          className="input-red"
          type='number'
          format
          value={(dataPension?.income_from_occ ?? 0).toString()}
        />
      </Grid>
    </Grid>
    <Grid container spacing={3} className='mt-5'>
      <Grid item xl={7} lg={7} md={6} sm={12} xs={12}>
        <TitleSquare>
          Thông tin LƯƠNG HƯU TRÍ
        </TitleSquare>
        <FormControlLabel
          style={{ marginLeft: '-5px' }}
          control={<IOSSwitch sx={{ m: 1 }} />}
          label="Có thông tin lương hưu trí"
          checked={checked}
          disabled={ruleDisabled}
          onChange={handleOnChecked}
          sx={{
            '& .MuiTypography-root': {
              fontWeight: 500,
              fontSize: 'var(--mscb-fontsize)',
              color: 'var(--mscb-secondary) !important',
              letterSpacing: '0.00938em',
            }
          }}
        />
        <Box className="mt-3">
          <Grid container spacing={3}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
                disabled={!checked || ruleDisabled}
                required
                label="1. Số quyết định nghỉ hưu"
                onDebounce={(val) => onChangePensionOther(val, 'license')}
                value={dataPension?.license}
                message={checked ? getMessage(declareType, incomeType, 'license') : ''}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <InputDate
                disabled={!checked || ruleDisabled}
                required
                label="2. Ngày bắt đầu nhận lương hưu"
                onChange={(val) => onChangePensionOther(val, 'startDate')}
                value={dataPension?.startDate}
                message={checked ? getMessage(declareType, incomeType, 'startDate') || dateRecievePension : ''}
                onAcept={(value) => alertMessage(value, 'startDate')}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
                disabled={!checked || ruleDisabled}
                required
                label="3. Số Bảo hiểm xã hội"
                onDebounce={(val) => onChangePensionOther(val, 'insurance')}
                value={dataPension?.insurance}
                message={checked ? getMessage(declareType, incomeType, 'insurance') : ''}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
                disabled={!checked || ruleDisabled}
                required
                label="4. Số tiền lương hưu theo tháng (VND)"
                type="number"
                // regex={/-?[0-9]*\.?[0-9]+/g}
                onDebounce={(val) => onChangeDataTotal(val, 'salary')}
                format
                value={(dataPension?.salary ?? '').toString()}
                message={checked ? getMessage(declareType, incomeType, 'salary') || onBlurError : ''}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <SelectFrequence
                disabled={!checked || ruleDisabled}
                required
                label="5. Tần suất thu nhập"
                onChange={onChangeFreq}
                value={dataPension?.frequency}
                message={checked ? getMessage(declareType, incomeType, 'frequency') : ''}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                label="6. Tỉ lệ nguồn thu nhập (%)"
                value={dataPension?.frequency === 'FREQ' ? '100' :
                  dataPension?.frequency === 'INFREQ' ? '30' : ''}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'var(--mscb-disable)',
                  },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: 'var(--mscb-disable)',
                  }
                }}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Input
                required
                disabled
                type="number"
                className="input-red"
                label="7. Thu  nhập từ lương hưu trí (VND)"
                format
                value={dataPension?.frequency ? calculateFrequencyType(dataPension?.frequency) : '0'}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={5} lg={5} md={6} sm={12} xs={12}>
        <IncomeAttachment isTitle={true}
          onChangeFile={(value) => (onChangePensionOther(value, 'documents'))}
          isDisabled={false} />
      </Grid>
    </Grid>
    <ModalConfirm open={isDelete} onClose={closeConfirmModal} onConfirm={handleConfirmDelete}>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc muốn xoá hồ sơ này?
      </Box>
      <Box className="text-center">
        Nếu bạn xóa dữ liệu sẽ không thể khôi phục
      </Box>
    </ModalConfirm>
  </Box>

}

export default IncomeFormPension;