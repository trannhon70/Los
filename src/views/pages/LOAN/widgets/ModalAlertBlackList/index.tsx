import { Divider, Table, TableCell, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { clearBlackListAlert } from 'features/loan/normal/storage/legal/actions';
import { FC } from 'react';
import { AiOutlineExclamation } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { ILOANNormalAlertBlackListData } from 'types/models/loan/normal/storage/Legal';
import { timestampToDate } from 'utils/date';
import Modal from 'views/components/layout/Modal';
import { SxModalContainer, SxTable } from './style';

export interface ModalApply {}

export interface IModalAlertBlackListProps {
  open: boolean;
  data: ILOANNormalAlertBlackListData[] | null;
}

const ModalAlertBlackList: FC<IModalAlertBlackListProps> = (props) => {
  const { open, data } = props;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(clearBlackListAlert());
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isStatic
      sx={SxModalContainer}
      footer={
        <Box className="pt-2">
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: 'unset',
              minWidth: 100,
            }}
            onClick={handleClose}
          >
            Đóng
          </Button>
        </Box>
      }
    >
      <Box className="flex flex-column items-center pt-4">
        <Avatar
          sx={{
            width: '72px',
            height: '72px',
            bgcolor: 'var(--mscb-danger)',
          }}
        >
          <AiOutlineExclamation style={{ fontSize: '75px', color: '#FFF' }} />
        </Avatar>
        <Box className="text-danger text-upper text-center text-18 mt-4 font-medium mb-6">
          Cảnh báo thông tin blacklist
        </Box>
      </Box>
      <Divider />
      {
        data?.map((info, index) => (
          <Table key={index} sx={SxTable} className="text-secondary mt-6 mb-6">
            <TableRow>
              <TableCell className="p-1 font-medium">Tên khách hàng:</TableCell>
              <TableCell className="p-1">{info?.name ?? ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 font-medium">
                Số giấy tờ định danh:
              </TableCell>
              <TableCell className="p-1">{info?.identity_num ?? ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 font-medium">Số CIF:</TableCell>
              <TableCell className="p-1">{info?.cif_num ?? ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 font-medium">Chuyên đề:</TableCell>
              <TableCell className="p-1">{info?.job_content ?? ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 font-medium">Nội dung công văn:</TableCell>
              <TableCell className="p-1">{info?.reason ?? ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 font-medium">Ngày cập nhật:</TableCell>
              <TableCell className="p-1">
                {timestampToDate(info?.updated_at ?? 0, 'HH:mm - DD/MM/YYYY')}
              </TableCell>
            </TableRow>
          </Table>
        ))
      }
      
      <Divider />
    </Modal>
  );
};
export default ModalAlertBlackList;
