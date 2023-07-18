import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMasterData from 'app/hooks/useMasterData';
import { FC, useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import {
  ILOANNormalStorageIdentity
} from 'types/models/loan/normal/storage/Legal';
import Empty from 'views/components/layout/Empty';
import TableSticky from 'views/components/layout/TableSticky';
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { useSelector } from 'react-redux';
import { timestampToDate } from 'utils/date';


export interface IListDataIdentityProps {
  dataIdentity: ILOANNormalStorageIdentity[];
  onEdit?(val: string): void;
  onDelete?(val: string): void;
  onChanePrimary?(val: string): void;
}

const ListDataIdentity: FC<IListDataIdentityProps> = (props) => {

  const { dataIdentity, onEdit, onDelete, onChanePrimary } = props;
  const { CifIfType, register } = useMasterData();
    
  useEffect(() => {
    register('cifIfType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const ruleDisabled = useSelector(getRuleDisbled)

  const handleClickDelete = (val: string) => {
    onDelete && onDelete(val)
  }

  const handleClickEdit = (val: string) => {
    onEdit && onEdit(val);
  }

  const handleChangeIdentity = (val: string) => {
    onChanePrimary && onChanePrimary(val)
  }

  const emptyLayout = () => {
    return (
      <TableRow>
        <TableCell colSpan={8}>
          <Empty> Không có dữ liệu </Empty>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <Box>
      <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
        Danh sách giấy tờ định danh
      </Typography>
      <TableSticky className="mscb-table mscb-table-border">
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: 'center' }}>STT</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell>Số định danh</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Giấy tờ chính</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Ngày cấp</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Ngày hết hạn</TableCell>
            <TableCell>Nơi cấp</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            (() => {
              if (dataIdentity?.length === 0) {
                return emptyLayout()
              }
              else {
                return dataIdentity.map((id, index) => (
                  <TableRow key={id.uuid}>
                    <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                    <TableCell>{CifIfType.find(t => t.id === id.type)?.name}</TableCell>
                    <TableCell>{id.num}</TableCell>
                    <TableCell sx={{ textAlign: 'center', p: '0!important' }}>
                      <Radio
                        disabled={ruleDisabled}
                        checkedIcon={<CheckCircleIcon sx={{ fontSize: '20px' }} />}
                        icon={<RadioButtonIcon sx={{ fontSize: '20px' }} />}
                        checked={id.primaryFlag}
                        onClick={() => handleChangeIdentity(id.uuidRemote)}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{timestampToDate((id.issuedDate ?? 0)/1000)}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{ id.expiredDate ? timestampToDate((id.expiredDate ?? 0)/1000) : ""}</TableCell>
                    <TableCell>{id.placeOfIssue}</TableCell>
                    <TableCell sx={{ textAlign: 'center', p: '0!important' }}>
                      <IconButton color="primary" onClick={() => handleClickEdit(id.uuidRemote)} size="small" disabled={ruleDisabled}>
                        <BsPencil style={{ fontSize: '1.3rem' }} />
                      </IconButton>
                      <IconButton
                        color={id.primaryFlag ? 'secondary' : 'primary'}
                        disabled={id.primaryFlag || ruleDisabled}
                        onClick={() => handleClickDelete(id.uuidRemote)}
                        size="small"
                      >
                        <IoTrashOutline style={{ fontSize: '1.5rem' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            })()
          }
        </TableBody>
      </TableSticky>
    </Box>
  )
}

export default ListDataIdentity;