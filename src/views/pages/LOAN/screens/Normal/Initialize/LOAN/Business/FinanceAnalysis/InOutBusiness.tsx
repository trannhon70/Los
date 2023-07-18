import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageLOANInOut, ILOANNormalStorageLOANInOutInfo } from 'types/models/loan/normal/storage/LOAN';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import TitleSquare from 'views/components/layout/TitleSquare';
import TextArea from 'views/components/base/TextArea';
import ModalSupplier from './ModalSupplier';
import useNotify from 'app/hooks/useNotify';
import {
  addLOANNormalStorageLOANInOutInfo,
  setLOANNormalStorageLOANInOutNote,
  setLOANNormalStorageLOANInOutPrimary,
  setPrimarySupplier,
  deleteInOut,
  updateLOANInOutInfo,
  setPrimaryPurchasingPartner
} from 'features/loan/normal/storage/loan/actions';
import { getLOANNormalStorageLOANInOut, getLOANNormalStorageLOANFinance } from 'features/loan/normal/storage/loan/selectors';
import PaymentMethodCheck from 'views/components/widgets/PaymentMethodCheck';
import MethodReceivingSalaryCheck from 'views/components/widgets/MethodReceivingSalaryCheck';
import useNormalLoanMessage from 'app/hooks/useNormalLoanMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { formatNumber } from 'utils';


const InOutBusiness: FC = () => {

  const [openModal, setOpenModal] = useState(false);
  const [SwitchClick, setSwitchClick] = useState<boolean | null>(null);
  const InOutData = useSelector(getLOANNormalStorageLOANInOut);
  const Finance = useSelector(getLOANNormalStorageLOANFinance);
  const ruleDisabled = useSelector(getRuleDisbled)
  const getMessage = useNormalLoanMessage();

  const sp = InOutData.suppliers.find(s => s.primary);
  const pp = InOutData.purchasingPartner.find(p => p.primary);
  
  const notify = useNotify();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpenModal(SwitchClick !== null);
  }, [SwitchClick]);

  const changeNote = (key: keyof Pick<ILOANNormalStorageLOANInOut, 'note' | 'suggest'>) => (value: string) => {
    dispatch(setLOANNormalStorageLOANInOutNote(value, key));
  }

  const clickAddSupplier = (s: boolean) => () => {
    setSwitchClick(s);
  }

  const onCloseModal = () => {
    setSwitchClick(null);
  }

  const onAddSupplier = (w: ILOANNormalStorageLOANInOutInfo) => {
    dispatch(addLOANNormalStorageLOANInOutInfo(w, SwitchClick ? 'suppliers' : 'purchasingPartner'));
  }

  const onSavePrimary = (uuid: string) => {
    dispatch(setLOANNormalStorageLOANInOutPrimary(uuid, SwitchClick ? 'suppliers' : 'purchasingPartner'));
    notify(`Cập nhật ${SwitchClick ? 'nhà cung cấp' : 'đối tác mua hàng'} chính thành công`, 'success');
  }

  const onUpdateSupplier = (supplier: ILOANNormalStorageLOANInOutInfo) => {
    dispatch(updateLOANInOutInfo(supplier, SwitchClick ? 'suppliers' : 'purchasingPartner'));
    notify('Cập nhật thành công', 'success');
  }

  const onDeleteSupplier = (uuid: string) => {
    dispatch(deleteInOut(uuid));
    notify('Đã xóa thành công', 'success');
  }

  // const capital = Finance.B.find(item=>item.id === 19)
  // const payableCustomer = Finance.B?.find(item => item.id === 20)
  // // const totalAssets = Finance.B.find(item=>item.id === 14)
  // const recievableCustomer = Finance.B?.find(item => item.id === 17)
  return <Box>
    <Typography
      variant="h4"
      component="h4"
      className="font-bold text-upper mt-6 mb-3"
      sx={{
        fontSize: '19px'
      }}
    >
      C. Thông tin đầu vào - đầu ra hoạt động sản xuất kinh doanh
      <span className="text-danger"> (*)</span>
    </Typography>
    <Grid container spacing={3}>
      <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
        <CardInside
          title="I. Đầu vào"
          classBody="p-6"
          fieldsetClass="px-4"
          titleClass="px-2"
        >
          <TitleSquare className="my-3">Phải trả bình quân</TitleSquare>
          <Grid container spacing={3}>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="1. Kỳ T-2 (VNĐ)"
                disabled
                type="number"
                format
                value={Finance.C.supplyData?.T2?.toString()}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="2. Kỳ T-1 (VND)"
                disabled
                type="number"
                format
                value={Finance.C.supplyData?.T1?.toString()}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="3. Kỳ T (VND)"
                disabled
                type="number"
                format
                value={Finance.C.supplyData?.T?.toString()}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="4. Kỳ T+1 của KH (VND)"
                disabled
                type="number"
                format
                value={Finance.C.supplyData?.KH?.toString()}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="5. Kỳ T+1 của NVKD (VND)"
                disabled
                type="number"
                format
                value={Finance.C.supplyData?.NVKD?.toString()}
              />
            </Grid>
          </Grid>
          <TitleSquare className="mt-6 mb-3">Thông tin đầu vào</TitleSquare>
          <Box className="mb-6">
            <Input
              label="6. Thông tin nhà cung cấp chính"
              required
              disabled={ ruleDisabled }
              value={sp?.info}
              onDebounce={(value) => { dispatch(setPrimarySupplier(value, 'info')) }}
              message={getMessage('business/finance-analysis', 'infoInput')}

            />
          </Box>
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <PaymentMethodCheck
                label="7. Hình thức thanh toán"
                value={sp?.payment ?? ""}
                onChange={(value) => { dispatch(setPrimarySupplier(value, 'payment')) }}
                disabled={ ruleDisabled }
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <MethodReceivingSalaryCheck
                label="8. Phương thức thanh toán"
                value={ sp?.method ?? "" }
                onChange={(value) => { dispatch(setPrimarySupplier(value,'method')) }}
                disabled={ ruleDisabled }
              />
            </Grid>
          </Grid>
          {ruleDisabled ? null : <Box className="mt-6 text-right">
            <Button
              variant="outlined"
              sx={{ borderRadius: 0, textTransform: 'revert' }}
              startIcon={<AddIcon />}
              onClick={clickAddSupplier(true)}
            >
              Thêm đầu vào
            </Button>
          </Box>}
        </CardInside>
        <Box className="mt-6">
          <TextArea
            label="Nhận xét chung về đầu vào/ra của hoạt động sản xuất kinh doanh"
            required
            placeholder="Nhập nhận xét"
            value={InOutData.note}
            onDebounce={changeNote('note')}
            message={getMessage('business/finance-analysis', 'CNote')}
            disabled={ ruleDisabled }
          />
        </Box>
      </Grid>
      <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
        <CardInside
          title="II. Đầu ra"
          classBody="p-6"
          fieldsetClass="px-4"
          titleClass="px-2"
        >
          <TitleSquare className="my-3">PHẢI THU BÌNH QUÂN</TitleSquare>
          <Grid container spacing={3}>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="1. Kỳ T-2 (VNĐ)"
                type="number"
                format
                disabled
                value={Finance.C.purchasingData?.T2?.toString()}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="2. Kỳ T-1 (VND)"
                disabled
                type="number"
                format
                value={Finance.C.purchasingData?.T1?.toString()}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="3. Kỳ T (VND)"
                disabled
                type="number"
                format
                value={Finance.C.purchasingData?.T?.toString()}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="4. Kỳ T+1 của KH (VND)"
                disabled
                type="number"
                format
                value={Finance.C.purchasingData?.KH?.toString()}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Input
                label="5. Kỳ T+1 của NVKD (VND)"
                disabled
                type="number"
                format
                value={Finance.C.purchasingData?.NVKD?.toString()}
              />
            </Grid>
          </Grid>
          <TitleSquare className="mt-6 mb-3">THÔNG TIN ĐẦU RA</TitleSquare>
          <Box className="mb-6">
            <Input
              label="6. Thông tin đối tác mua hàng"
              required
              value={pp?.info}
              onDebounce={(value) => { dispatch(setPrimaryPurchasingPartner(value, 'info')) }}
              message={getMessage('business/finance-analysis', 'Output')}
              disabled={ ruleDisabled }
            />
          </Box>
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <PaymentMethodCheck
                label="7. Hình thức thanh toán"
                value={pp?.payment ?? ""}
                onChange={(value) => { dispatch(setPrimaryPurchasingPartner(value, 'payment')) }}
                disabled={ ruleDisabled }
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <MethodReceivingSalaryCheck
                label="8. Phương thức thanh toán"
                value={pp?.method ?? ""}
                onChange={(value) => { dispatch(setPrimaryPurchasingPartner(value, 'method')) }}
                disabled={ ruleDisabled }
              />
            </Grid>
          </Grid>
          {ruleDisabled ? null :<Box className="mt-6 text-right">
            <Button
              variant="outlined"
              sx={{ borderRadius: 0, textTransform: 'revert' }}
              startIcon={<AddIcon />}
              onClick={clickAddSupplier(false)}
            >
              Thêm đầu ra
            </Button>
          </Box>}
        </CardInside>
        <Box className="mt-6">
          <TextArea
            label="Đề xuất khác"
            required
            placeholder="Nhập đề xuất khác"
            value={InOutData.suggest}
            onDebounce={changeNote('suggest')}
            message={getMessage('business/finance-analysis', 'CSuggest')}
            disabled={ ruleDisabled }
          />
        </Box>
      </Grid>
    </Grid>
    <ModalSupplier
      open={openModal}
      data={SwitchClick ? InOutData.suppliers : InOutData.purchasingPartner}
      onClose={onCloseModal}
      onAdd={onAddSupplier}
      onSave={onSavePrimary}
      onUpdate={onUpdateSupplier}
      onDelete={onDeleteSupplier}
      label={SwitchClick ? 'nhà cung cấp' : 'đối tác mua hàng'}
    />
  </Box>

}

export default InOutBusiness;