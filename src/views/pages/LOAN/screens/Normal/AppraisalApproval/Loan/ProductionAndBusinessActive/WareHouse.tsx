import { FC, Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import AddIcon from '@mui/icons-material/Add';

import SelectLocation from 'views/components/widgets/SelectLocation';
import {
  addNewWarehouseApproval,
  deleteWarehouseApproval,
  setBusinessActivitiesWareHousePrimary,
  setPrimaryWarehouseApproval,
  updateWarehouseApproval,
} from 'features/loan/normal/storageApproval/loan/action';
import { useDispatch, useSelector } from 'react-redux';
import { IApprovalLOANBAWareHouses } from 'types/models/loan/normal/storageApproval/LoanInfoForm';
import { getApprovalLOANBusinessActivitiesWareHouses } from 'features/loan/normal/storageApproval/loan/selectors';
import ModalWarehouseApproval from '../Widgets/ModalWarehouseApproval';
import useApprovalLOANMessage from 'app/hooks/useApprovalLOANMessage';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const WareHouse: FC = () => {

  const [ openModal, setOpenModal ] = useState(false);
  const [ modalAdd, setModalAdd ] = useState<boolean | null>(null);
  const dispatch = useDispatch()
  const warehouses = useSelector(getApprovalLOANBusinessActivitiesWareHouses)

  const primary  = warehouses?.find( i => i.primary_flag)
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  useEffect(() => {
    setOpenModal(modalAdd !== null);
  }, [ modalAdd ]);

  const clickList = () => setModalAdd(false);

  const clickAddWarehouse = () =>  setModalAdd(true);

  const onCloseModal = () => setModalAdd(null);

  const onAddWarehouse = (w: IApprovalLOANBAWareHouses) =>   dispatch(addNewWarehouseApproval(w))

  const onSavePrimary = (uuid: string) => dispatch(setPrimaryWarehouseApproval(uuid))

  const changeWarehouse = (name: keyof IApprovalLOANBAWareHouses, value: string | number | null) => {
    dispatch(setBusinessActivitiesWareHousePrimary(value,name))
  }

  const onDeleteWarehouse = (uuid: string) => {
    dispatch(deleteWarehouseApproval(uuid))
  }
  const onUpdateWarehouse = (w: IApprovalLOANBAWareHouses) => {
    dispatch(updateWarehouseApproval(w))
  }

  const onChangeModal = () => setModalAdd(true);
  const getMessage = useApprovalLOANMessage();

  return <CardInside title="III. Kho hàng" classBody="p-6">
    <SelectLocation
      before={
        <Fragment>
          <Grid item>
            <Input
              label="1. Diện tích (m2)"
              type="number"
              format
              onDebounce={v => changeWarehouse('area', v === '' ? null : +v)}
              value={primary?.area?.toString()}
              disabled={ruleDisabled}
              message={getMessage('emptyBasic',{fieldName:"areaWare"})}
            />
          </Grid>
          <Grid item>
            <Input
              label="2. Địa chỉ"
              onDebounce={v => changeWarehouse('address', v === '' ? null : v)}
              value={primary?.address}
              disabled={ruleDisabled}
              message={getMessage('emptyBasic',{fieldName:"addressWare"})}
            />
          </Grid>
        </Fragment>
      }
      onChange={(val) =>{
        changeWarehouse('province', val.province)
        changeWarehouse('district', val.district)
        changeWarehouse('ward', val.ward)
      }}
      disabled={ruleDisabled}
      value={{
        country: "VN",
        province: primary?.province?.toString() ?? "",
        district: primary?.district?.toString() ?? "",
        ward: primary?.ward?.toString() ?? ""
      }}
      label={[
        '3. Tỉnh/TP',
        '4. Quyện/huyện',
        '5. Phường/xã'
      ]}
      col="auto"
      required={[ true, true, true ]}
      sx={{
        '& .MuiGrid-item': {
          minWidth: '20%',
          maxWidth: '20%'
        }
      }}
      message={
        [
          getMessage('emptyBasic',{fieldName:"provinceWare"}),
          getMessage('emptyBasic',{fieldName:"districtWare"}),
          getMessage('emptyBasic',{fieldName:"wardWare"})
        ]
      }
    />
    <Box className="pt-6 text-right">
      <Button 
        variant="contained"
        sx={{ borderRadius: 0, textTransform: 'revert' }} 
        className="mr-6"
        onClick={ clickList }
      >
        Danh sách
      </Button>
      <Button 
        variant="outlined" 
        sx={{ borderRadius: 0, textTransform: 'revert' }} 
        startIcon={ <AddIcon /> }
        onClick={ clickAddWarehouse }
        disabled={ruleDisabled}
      >
        Thêm địa chỉ kho hàng
      </Button>
    </Box>
    <ModalWarehouseApproval
      open={ openModal } 
      add={ !!modalAdd } 
      warehouses={warehouses}
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

export default WareHouse;