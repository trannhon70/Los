import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNormalOtherApprovalMessage from 'app/hooks/useNormalOtherApprovalMessage';
import useNotify from 'app/hooks/useNotify';
import { getLOANNormalConfigMetadataConstant } from 'features/loan/normal/configs/metadata/selector';
import { getLOANNormalStorageProductDetail } from 'features/loan/normal/storage/product/selectors';
import { addApprovalPolicyDetail, deleteApprovalException, setApprovalExceptionType } from 'features/loan/normal/storageApproval/Other/actions';
import { getApprovalExceptions } from 'features/loan/normal/storageApproval/Other/selectors';
import { getRuleDisbled, getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useEffect, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { IApprovalStorageExceptionInfo } from 'types/models/loan/normal/storageApproval/OtherProFile';
import { METADATA_CONSTANT } from 'utils/constants';
import Input from 'views/components/base/Input';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import SelectApprovalExceptionType from 'views/components/widgets/SelectApprovalExceptionType';
import SelectExceptionType from 'views/components/widgets/SelectExceptionType';
import ExceptionItem from './ExceptionItem';


export interface ExceptionGroupProps {
  stt: number;
  documentException: IApprovalStorageExceptionInfo;
}

const ExceptionGroup: FC<ExceptionGroupProps> = (props) => {

  const { stt, documentException } = props;

  const [ openTable, setOpenTable ] = useState(true);
  const dispatch = useDispatch();
  const toggleTable = () => setOpenTable(!openTable);
  const notify = useNotify();
  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant)
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const getMessage = useNormalOtherApprovalMessage()
  const Exceptions = useSelector(getApprovalExceptions)
  
  const [disabled, setDisabled] = useState(!!documentException.exception_type_id) 
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);

  useEffect(() => {
      const newDisabled = !!documentException.exception_type_id;
      disabled !== undefined && disabled !== newDisabled && setDisabled(newDisabled);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[documentException]);

  const handleDeleteException = () => {
    setIsModalConfirm(!isModalConfirm);
  }

  const onChangeExceptionType = (index: number) => (value: number) => {
    const rule = Exceptions.some(o => o.exception_type_id === value)
    if(rule){
      notify('Mã ngoại lệ đã tồn tại', 'warning');
      // dispatch(setExceptionType(0, {uuid: documentException.uuid, dataExc: dataExc, stt: stt }));
    }else{
      dispatch(setApprovalExceptionType(value, { 
        index ,
        name: metadataConstant.data[METADATA_CONSTANT.CONST_POLICY_GROUP].find(e => Number(e.id) === value)?.name ?? "",
      }));
    }
  }

  const onHandleCancelConfirm = () => {
      setIsModalConfirm(!isModalConfirm);
  }
  
  const onConfirmDelete = () => {
    dispatch(deleteApprovalException({
      id: documentException.exception_type_id,
      index: stt,
      isLocal: documentException.isLocal
    }))
    setIsModalConfirm(!isModalConfirm);
  }

  const handleAddPolicyDetail = () => {
    dispatch(addApprovalPolicyDetail(stt))
  }

  return <Fragment>
  <Table>
    <TableBody>
      <TableRow>
        <TableCell width="50px" className="text-16">
          {stt + 1}
        </TableCell>
        <TableCell width="240px">
          <SelectApprovalExceptionType
            value={documentException.exception_type_id ?? -1}
            onChange={onChangeExceptionType(stt)}
            disabled={!!documentException.exception_type_id || ruleDisabled}
            message={getMessage('exception_type_id', { exceptionIdx: stt})}
            required
          />
        </TableCell>
        <TableCell>
          <Box className="flex items-center" sx={{ '&>span': { whiteSpace: 'nowrap', color:'var(--mscb-primary)' } }}>
            <span className="mr-2 text-16"  >Thêm mới</span>
            <Box>
              <Input
                disabled
                value={(documentException.detail_info_list.length.toString())}
                fullWidth={ false }
                sx={{ 
                  width: '187px',
                  '& .MuiInput-root': { overflow: 'hidden' },
                  ':hover': {
                    '& input': { pr: '0!important' },
                    '& .tbl-ipt-toolbar,& .done-wrapper': { mr: 0 }
                  },
                  '& input:focus': {
                    pr: '0!important',
                    '&+.tbl-ipt-toolbar': {
                      mr: 0,
                      '& .done-wrapper':{ mr: 0 }
                    }
                  }
                }}
                suffix={
                  <Box 
                    className="flex tbl-ipt-toolbar"
                    sx={{ 
                      mr: '-36px',
                      transition: 'margin-right ease-in-out 0.3s',
                      '& .MuiSvgIcon-root': { 
                        fontSize: '1.125rem',
                        '&.done': { color: 'var(--mscb-success)!important' },
                        '&.cancel': { color: 'var(--mscb-danger)!important' }
                      }

                    }}
                  >
                    <IconButton 
                      className="done-wrapper" 
                      color="success" 
                      sx={{ mr: '-36px', transition: 'margin-right ease-in-out 0.6s' }}
                    >
                      <CheckIcon className="done" />
                    </IconButton>
                    {/* <IconButton color="error">
                      <CancelOutlinedIcon className="cancel" />
                    </IconButton> */}
                  </Box>
                }
              />
            </Box>
          </Box>
        </TableCell>
        <TableCell width="112px" className="pr-0">
          <Box className="flex" sx={{ '& svg': { color: 'primary.main' } }}>
            <IconButton 
              onClick={handleAddPolicyDetail} 
              disabled={ruleDisabled}
            >
              <AiOutlinePlusSquare style={{ fontSize: '1.5rem' }} />
            </IconButton>
            <IconButton 
              onClick={handleDeleteException}
              disabled={ruleDisabled}
              >
              <IoTrashOutline fontSize={'1.5rem'} color='primary.main' />
            </IconButton>
            <IconButton 
              onClick={ toggleTable }
              sx={{
                '& svg': {
                  transition: 'all ease-in-out 0.3s',
                  ...(openTable ? {} : { transform: 'rotate(-90deg)' })
                }
              }}
            >
                <BiChevronDownCircle style={{ fontSize: '1.5rem' }} />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={ 4 } sx={{ pl: '66px', pr: 0, py: 0 }}>
          <Collapse unmountOnExit in={ openTable }>
            { documentException?.detail_info_list?.map((ex, index) => {
              return <ExceptionItem 
                key={ex.uuid} 
                data={ex}
                group={documentException}
                groupIndex={stt}
                index={index}
              />
            })}
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <ModalConfirm
      open={isModalConfirm}
      children="Bạn có chắc chắn muốn xóa loại ngoại lệ này"
      labelConfirm="Xác nhận"
      labelCancel="Hủy"
      onClose={onHandleCancelConfirm}
      onConfirm={onConfirmDelete}
    />
  </Fragment>
}

export default ExceptionGroup;
