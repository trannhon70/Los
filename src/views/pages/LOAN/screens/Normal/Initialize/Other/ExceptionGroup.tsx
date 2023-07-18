import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useBackdrop from 'app/hooks/useBackdrop';
import useMasterData from 'app/hooks/useMasterData';
import useNormalOtherMessage from 'app/hooks/useNormalOtherMessage';
import useNotify from 'app/hooks/useNotify';
import { addPolicyDetail, deleteException, setExceptionType } from 'features/loan/normal/storage/other/action';
import { getExeptions } from 'features/loan/normal/storage/other/selectors';
import { getLOANNormalStorageProductDetail } from 'features/loan/normal/storage/product/selectors';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useEffect, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageExceptionState } from 'types/models/loan/normal/storage/Other';
import Input from 'views/components/base/Input';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import SelectExceptionType from 'views/components/widgets/SelectExceptionType';
import ExceptionItem from './ExceptionItem';


export interface ExceptionGroupProps {
  stt: number;
  documentException: ILOANNormalStorageExceptionState;
}

const ExceptionGroup: FC<ExceptionGroupProps> = (props) => {

  const { stt, documentException } = props;

  const [ openTable, setOpenTable ] = useState(true);
  const { showBackdrop } = useBackdrop()
  const dispatch = useDispatch();
  const toggleTable = () => setOpenTable(!openTable);
  const getMessage = useNormalOtherMessage();
  const notify = useNotify();
  const ruleDisabled = useSelector(getRuleDisbled)
  const codeProduct = useSelector(getLOANNormalStorageProductDetail);
  const Exceptions = useSelector(getExeptions)
  const { PolicyGroup, register } = useMasterData();
    
  useEffect(() => {
    register('policyGroup')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const dataExc = PolicyGroup
  
  const [disabled, setDisabled] = useState(!!documentException.exceptionId) 
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);

  useEffect(() => {
      const newDisabled = !!documentException.exceptionId;
      disabled !== undefined && disabled !== newDisabled && setDisabled(newDisabled);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[documentException]);

  const handleAddPolicyDetail = (id: number) => {
    if(!id) return;
    dispatch(addPolicyDetail({exceptionId: id, stt: stt}))
  }

  const handleDeleteException = () => {
    setIsModalConfirm(!isModalConfirm);
  }

  const onChangeExceptionType = (value: string) => {
    const rule = Exceptions.some(o=>o.exceptionId === +value)
    if(rule){
      notify('Mã ngoại lệ đã tồn tại', 'warning');
      // dispatch(setExceptionType(0, {uuid: documentException.uuid, dataExc: dataExc, stt: stt }));
    }else{
      dispatch(setExceptionType(+value, {uuid: documentException.uuid, dataExc: dataExc, stt: stt }));
      handleAddPolicyDetail(+value)
    }

  }

  const onHandleCancelConfirm = () => {
      setIsModalConfirm(!isModalConfirm);
  }
  
  const onConfirmDelete = () => {
    if (!documentException.uuid){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{
      showBackdrop(true)
      dispatch(deleteException(documentException.uuid))
      setIsModalConfirm(!isModalConfirm);
    }
  }

  return <Fragment>
  <Table>
    <TableBody>
      <TableRow>
        <TableCell width="50px" className="text-16">
          {stt + 1}
        </TableCell>
        <TableCell width="240px">
          <SelectExceptionType
            code={codeProduct}
            disabled={disabled || ruleDisabled}
            value={documentException.exceptionId.toString() ?? ""}
            onChange={onChangeExceptionType}
            message={getMessage('exceptionName', { positionException: stt})}
            required
          />
        </TableCell>
        <TableCell>
          <Box className="flex items-center" sx={{ '&>span': { whiteSpace: 'nowrap', color:'var(--mscb-primary)' } }}>
            <span className="mr-2 text-16"  >Thêm mới</span>
            <Box>
              <Input
                disabled
                value={(documentException.detailList.length.toString())}
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
            {/* {documentException.detailList.length === 1 ? null : <IconButton onClick={()=>{
              // handleAddPolicyDetail()
            }} disabled={ruleDisabled}>
              <AiOutlinePlusSquare style={{ fontSize: '1.5rem' }} />
            </IconButton>} */}
            <IconButton onClick={handleDeleteException} disabled={ruleDisabled}>
              <IoTrashOutline fontSize={'1.5rem'} color='primary.main' />
            </IconButton>
            <IconButton 
              onClick={ toggleTable }
              sx={{
                '& svg': {
                  transition: 'all ease-in-out 0.3s',
                  ...(openTable ? {} : { transform: 'rotate(90deg)' })
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
            { documentException.detailList && documentException.detailList.map((ex, index) => {
              return <ExceptionItem groupLength={documentException.detailList.length} idxGroup={stt} key={index} data={ex} stt={index} idx={documentException.exceptionId} name={documentException.exceptionName} uuid={documentException.uuid}/>
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