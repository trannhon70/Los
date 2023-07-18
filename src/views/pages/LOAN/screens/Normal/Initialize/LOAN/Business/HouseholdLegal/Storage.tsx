import { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLOANNormalStorageLOANWarehouses } from 'features/loan/normal/storage/loan/selectors';
import { ILOANNormalStorageLOANLegalBusinessStore } from 'types/models/loan/normal/storage/LOAN';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import AddIcon from '@mui/icons-material/Add';
import ModalWarehouse from 'views/pages/LOAN/widgets/ModalWarehouse';
import useNotify from 'app/hooks/useNotify';
import {
  addLOANNormalStorageLOANWarehouse,
  deleteLOANNormalStorageLOANWarehouse,
  saveLoanProduct,
  setLOANNormalStorageLOANWarehouse,
  updateLOANNormalStorageLOANPrimaryWarehouse,
  updateLOANNormalStorageLOANWarehouse 
} from 'features/loan/normal/storage/loan/actions';
import SelectLocation from 'views/components/widgets/SelectLocation';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import useMasterData from 'app/hooks/useMasterData';

const HouseholdLegalStorage: FC = () => {

  const [ openModal, setOpenModal ] = useState(false);
  const [ modalAdd, setModalAdd ] = useState<boolean | null>(null);

  const notify = useNotify();
  const dispatch = useDispatch();
  const warehouses = useSelector(getLOANNormalStorageLOANWarehouses);
  const ruleDisabled = useSelector(getRuleDisbled)
  const warehouse = warehouses.find(w => w.primary);
  const { register } = useMasterData();

  useEffect(() => {
    warehouses.forEach(e => {
      register('province', 'VN');
      register('district', e.province)
      register('ward', e.district)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[warehouses])

  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [ modalAdd ]);

  const changeWarehouse = (name: keyof ILOANNormalStorageLOANLegalBusinessStore) => (value: string | number | null) => {
    dispatch(setLOANNormalStorageLOANWarehouse(value, name));
  }

  const clickList = () => {
    setModalAdd(false);
  }

  const clickAddWarehouse = () => {
    setModalAdd(true);
  }

  const onCloseModal = () => {
    setModalAdd(null);
  }

  const onAddWarehouse = (w: ILOANNormalStorageLOANLegalBusinessStore) => {
    dispatch(addLOANNormalStorageLOANWarehouse(w));
  }

  const onSavePrimary = (uuid: string) => {
    dispatch(updateLOANNormalStorageLOANPrimaryWarehouse(uuid));
    notify('Cập nhật kho hàng chính thành công', 'success');
  }

  const onUpdateWarehouse = (Warehouse: ILOANNormalStorageLOANLegalBusinessStore) => {
    dispatch(updateLOANNormalStorageLOANWarehouse(Warehouse));
    notify('Cập nhật thông tin kho hàng thành công', 'success');
  }

  const onDeleteWarehouse = (uuid: string) => {
    dispatch(deleteLOANNormalStorageLOANWarehouse(uuid));
    dispatch(saveLoanProduct('business/household-legal'))
    notify('Đã xóa kho hàng', 'success');

  }

  const onChangeModal = () => setModalAdd(true);

  return <CardInside title="III. Kho hàng" classBody="p-4">
    <SelectLocation
      spacing={2}
      before={
        <Fragment>
          <Grid item>
            <Input
              label="1. Diện tích (m&sup2;)"
              type="number"
              format
              disabedNegative
              value={ (warehouse?.area ?? '').toString() }
              onDebounce={v => changeWarehouse('area')(v === '' ? null : +v)}
              disabled={ ruleDisabled }
            />
          </Grid>
          <Grid item>
            <Input
              label="2. Địa chỉ"
              value={ warehouse?.apartment }
              onDebounce={ changeWarehouse('apartment') }
              disabled={ ruleDisabled }
            />
          </Grid>
        </Fragment>
      }
      label={[
        '3. Tỉnh/TP',
        '4. Quyện/huyện',
        '5. Phường/xã'
      ]}
      value={{
        country: 'VN',
        province: warehouse?.province ?? '',
        district: warehouse?.district ?? '',
        ward: warehouse?.ward ?? ''
      }}
      onChange={v => {
        const { country, ...r } = v;
        changeWarehouse('province')(r.province);
        changeWarehouse('district')(r.district);
        changeWarehouse('ward')(r.ward);
      }}
      col="auto"
      // required={[ true, true, true ]}
      sx={{
        '& .MuiGrid-item': {
          minWidth: '20%',
          maxWidth: '20%'
        }
      }}
      disabled={ ruleDisabled }
    />
    <Box className="pt-6 text-right">
      <Button 
        variant="contained" 
        sx={{ borderRadius: 0, textTransform: 'revert' }} 
        className={ruleDisabled ? "" : "mr-6"}
        onClick={ clickList }
      >Danh sách</Button>
      {ruleDisabled ? null : <Button
        variant="outlined"
        sx={{ borderRadius: 0, textTransform: 'revert' }}
        startIcon={<AddIcon />}
        onClick={clickAddWarehouse}
      >
        Thêm địa chỉ kho hàng
      </Button>
      }
    </Box>
    <ModalWarehouse
      open={ openModal } 
      add={ !!modalAdd } 
      warehouses={ warehouses }
      country="VN"
      onClose={ onCloseModal }
      onAdd={ onAddWarehouse }
      onSave={ onSavePrimary }
      onUpdate={ onUpdateWarehouse }
      onDelete={ onDeleteWarehouse }
      onChange={ onChangeModal }
    />
  </CardInside>
  
}

export default HouseholdLegalStorage;