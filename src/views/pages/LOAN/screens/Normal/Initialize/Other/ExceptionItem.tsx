import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';
import { deleteException, deleteExceptionDetail, setRealityDescription } from 'features/loan/normal/storage/other/action';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageExceptionDetail } from 'types/models/loan/normal/storage/Other';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import ModalConfirm from 'views/components/layout/ModalConfirm';

export interface ExceptionItemProps{
  data: ILOANNormalStorageExceptionDetail;
  stt: number;
  uuid:string;
  idx: number;
  name: string;
  idxGroup: number;
  groupLength: number
}

const ExceptionItem: FC<ExceptionItemProps> = (props) => {

  const { data, stt, uuid, name, groupLength } = props;
  const dispatch = useDispatch();
  // const detailsList = useSelector(getDetailsList(uuid));
  const ruleDisabled = useSelector(getRuleDisbled)
  const { showBackdrop } = useBackdrop()
  // const policyRef = useRef<Select>
  // const details = useSelector(getDetailsList(uuid))?.detailList.find(item=>item.uuid === data.uuid)
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false) ;

  const notify = useNotify()

  // const dataPolicy = useSelector(getLOANNormalConfigPolicyDetail(data.exceptionId.toString()));
  // const getMessage = useNormalOtherMessage();

  // const onChangePolicyDetail = (value: string) => {
  //   const isEsixt = detailsList?.detailList.find(a => a.exceptionDetailCode === value)

  //   if (isEsixt) {
  //     notify("Mã ngoại lệ đã tồn tại", "warning");

  //     dispatch(setPolicyDetail('', { detail: data, stt: stt, policyDetail: dataPolicy.data }));
  //     return;
  //   } else {
  //     value && dispatch(setPolicyDetail(value, { detail: data, stt: stt, policyDetail: dataPolicy.data }));
  //   }
    
  // }

  const handleChangeRealityDescription = (value: string) => {
    dispatch(setRealityDescription(value, {detail: data, stt: stt}));
  }

  useEffect(() => {
    if (data.displayOrder === 1){
      setDisabled(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.displayOrder])

  // const handleEdit = () => {
  //   if(disabled === false){
  //     setDisabled(true)
  //   }else{
  //     setDisabled(false)
  //   }
  // }
    
  // const handleDelete = () => {
  //   setIsModalConfirm(!isModalConfirm);
  // }

  const onHandleCancelConfirm = () => {
      setIsModalConfirm(!isModalConfirm);
  }

  
  const onConfirmDelete = () => {
    if (!data.uuid){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    showBackdrop(true)
    if(groupLength === 1){
      dispatch(deleteException(uuid))
    }else{
      dispatch(deleteExceptionDetail({uuid_list:uuid,uuid_item: data.uuid}))
    }
    setIsModalConfirm(!isModalConfirm);
  }

  return <Fragment>
  <Table sx={{
    '& .MuiTableCell-root':{
      borderBottom: 'none'
    }
  }}>
    <TableBody>
      {
        data.displayOrder !== 0 ? (
          <TableRow>
            <TableCell width="150px" className="font-medium text-upper text-primary pl-0" sx={{ verticalAlign: 'top' }}>
              {name}
            </TableCell>
            <TableCell width="224px"  sx={{ verticalAlign: 'top' }}>
              <Input
                label="1. Mã ngoại lệ"
                // code={data.exceptionId.toString()}
                // ref={policyRef}
                disabled
                value={"Khác"}
                // onChange={onChangePolicyDetail}
                // message={getMessage('exceptionDetailCode', { positionException: idx, positionDetail: stt })}
                // required
              />
            </TableCell>
            <TableCell>
              <Input
                label="2. Diễn giải"
                value={""}
                disabled
              />
              <TextArea
                className="mt-6"
                label="3. Diễn giải thực tế"
                onDebounce={handleChangeRealityDescription}
                value={data.exceptionRealityDescription}
                // message={getMessage('exceptionRealityDescription', { positionException: idx, positionDetail: stt })} 
                disabled={disabled || ruleDisabled}
                maxlength={500}
              />
            </TableCell>
            {/* <TableCell width="78px" className="px-0" sx={{ verticalAlign: 'top' }}> */}
              {/* <Box className="flex h-full justify-between" sx={{ pt: '30px', '& svg': { color: 'primary.main' } }}> */}
                {/* <IconButton onClick={handleEdit} disabled={ruleDisabled}> */}
                 {/* { disabled === true ? <MdOutlineEdit style={{ fontSize: '1.5rem' }} /> : <img src={Check} alt="Edit" />}  */}
                  {/* <MdOutlineEdit style={{ fontSize: '1.25rem' }} /> */}
                {/* </IconButton> */}
                {/* <IconButton onClick={handleDelete} sx={{ width: '36px' }} disabled={ruleDisabled}> */}
                  {/* <IoTrashOutline style={{fontSize: '1.5rem'}}/> */}
                {/* </IconButton> */}
              {/* </Box> */}
            {/* </TableCell> */}
          </TableRow>
        ) : (
          <TableRow>
            <TableCell width="150px" className="font-medium text-upper text-primary pl-0" sx={{ verticalAlign: 'top' }}>
              {name}
            </TableCell>
            <TableCell width="224px" sx={{ verticalAlign: 'top' }}>
              <Input
                label="1. Mã ngoại lệ"
                // code={data.exceptionId.toString()}
                value={"Khác"}
                // onChange={onChangePolicyDetail}
                disabled
                // message={getMessage('exceptionDetailCode', { positionException: idx, positionDetail: stt })}
                // required
              />
            </TableCell>
            <TableCell>
              <Input
                label="2. Diễn giải"
                value={""}
                disabled
              />
              <TextArea
                className="mt-6"
                label="3. Diễn giải thực tế"
                onDebounce={handleChangeRealityDescription}
                value={data.exceptionRealityDescription}
                disabled={ruleDisabled}
                maxlength={1000}
                // message={getMessage('exceptionRealityDescription', { positionException: idx, positionDetail: stt })}
              />
            </TableCell>
            {/* <TableCell width="88px" className="py-0" sx={{ verticalAlign: 'top' }}>
              <Box className="flex h-full" sx={{ pt: '30px', '& svg': { color: 'primary.main' } }}>
                <IconButton onClick={handleEdit}  disabled={ruleDisabled}>
                 { disabled === true ? <MdOutlineEdit style={{ fontSize: '1.5rem' }} /> : <img src={Check} alt="Edit" />} 
                </IconButton>
                <IconButton onClick={handleDelete} sx={{ width: '36px' }} disabled={ruleDisabled}>
                  <IoTrashOutline style={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Box>
            </TableCell> */}
          </TableRow>
        )
      }
     
    </TableBody>
  </Table>

  <ModalConfirm
      open={isModalConfirm}
      children="Bạn có chắc chắn muốn xóa mã ngoại lệ này"
      labelConfirm="Xác nhận"
      labelCancel="Hủy"
      onClose={onHandleCancelConfirm}
      onConfirm={onConfirmDelete}
    />
  </Fragment>
}

export default ExceptionItem;