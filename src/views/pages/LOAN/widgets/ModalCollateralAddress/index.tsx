import { FC, Fragment, useEffect, useState, memo } from 'react';
import Modal from 'views/components/layout/Modal';
import { Box, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TableSticky from 'views/components/layout/TableSticky';
import useStorage from './../../screens/Normal/Initialize/Legal/useStorage';
import Empty from 'views/components/layout/Empty';
import useMasterData from 'app/hooks/useMasterData';
import { Radio } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { ILOANNormalStorageAddress } from 'types/models/loan/normal/storage/Legal';
import useNotify from 'app/hooks/useNotify';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { useSelector } from 'react-redux';
export interface ModalCollateralAddressProps {
  open?: boolean;
  onClose?(): void;
  onSave?(data: ILOANNormalStorageAddress): void;
  screen?: string;
  disabled?: boolean
}



const ModalCollateralAddress: FC<ModalCollateralAddressProps> = props => {

  const {
    open,
    onClose,
    onSave,
    disabled
  } = props
  const notify = useNotify();
  const { dataAllCollateral } = useStorage('')
  const { Province, District, Ward, register } = useMasterData()
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false)
  const [checked, setChecked] = useState<string>()
  const ruleDisabled = useSelector(getRuleDisbled)
  useEffect(() => {
    if (open) {
      for (let i = 0; i < dataAllCollateral.length; i++) {
        register("district", dataAllCollateral[i].province)
        register("ward", dataAllCollateral[i].district)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAllCollateral])


  const clickPrimary = (uuid: string) => {
    setChecked(uuid)
  }
  const onHandleClick = (val: ILOANNormalStorageAddress) => {
    if (checked) {
      onSave && onSave(val);
    } else {
      notify('Chưa chọn địa chỉ', 'warning')
    }
  }
  const onOpenConfirm = () => {
    setIsOpenConfirm(!isOpenConfirm)
  }


  const renderBody = () => {
    if (!dataAllCollateral?.length) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <Empty sx={{ minHeight: '400px' }}>
                Không có dữ liệu hiển thị
              </Empty>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    } else {
      return <TableBody>
        {
          dataAllCollateral?.filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.apartment === value.apartment 
            && t.district === value.district 
            && t.ward === value.ward
            && t.province === value.province
          )))?.map((i, index) => {
            
            return <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{
                (i?.apartment ? i?.apartment.toUpperCase() + ', ' : "")
                + (Ward[i.district]?.data?.find(w => w.code === i.ward)?.name ?? "") + (Ward[i.district]?.data?.find(w => w.code === i.ward)?.name ? ', ' : "")
                + (District[i.province]?.data?.find(dt => dt.code === i.district)?.name ?? "") + (District[i.province]?.data?.find(dt => dt.code === i.district)?.name ? ', ' :"")
                + (Province.find(pv => pv.code === i.province)?.name ?? "")}
              </TableCell>
              <TableCell align='center'>
                <Radio
                  disabled={ruleDisabled || disabled}
                  checkedIcon={<CheckCircleIcon sx={{ fontSize: '16px' }} />}
                  icon={<RadioButtonIcon sx={{ fontSize: '16px' }} />}
                  checked={i.uuid === checked}
                  onClick={() => {
                    clickPrimary(i.uuid)
                  }}
                />
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    }
  }

  return <Fragment>
    <Modal
      open={open}
      onClose={onClose}
      isStatic
      footer={
        <Box className="pt-2 pb-2 pr-4">
          <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={onClose}
            disabled={disabled}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            disabled={ruleDisabled || disabled}
            color="primary"
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={() => {
              onHandleClick(dataAllCollateral.find(i => i.uuid === checked) as ILOANNormalStorageAddress)
            }}
          >
            Lưu
          </Button>
        </Box>
      }
      sx={{
        '& .MuiPaper-root': {
          minWidth: '60%',
          position: 'relative',
          borderRadius: 0,
        }
      }}
    >
      <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
        Danh sách địa chỉ
      </Typography>
      <TableSticky
        className="mscb-table mscb-table-border"
        sx={{
          maxHeight: '57vh'
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>ĐỊA CHỈ</TableCell>
            <TableCell>CHỌN SAO CHÉP</TableCell>
          </TableRow>
        </TableHead>

        {
          renderBody()
        }
      </TableSticky>
      <IconButton
        onClick={onClose}
        color="error"
        sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}
      >
        <CloseIcon />
      </IconButton>
    </Modal>

    <ModalConfirm
      open={isOpenConfirm}
      onClose={onOpenConfirm}
      onConfirm={() => {
        onHandleClick(dataAllCollateral.find(i => i.uuid === checked) as ILOANNormalStorageAddress)
        onOpenConfirm()
      }}
    >
      <Box className="text-18 font-medium text-primary text-center">

      </Box>
    </ModalConfirm>
  </Fragment>
}

export default memo(ModalCollateralAddress)
