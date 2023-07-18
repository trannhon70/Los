import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SystemStyleObject, Theme } from '@mui/system';
import { addNewApprovalException, deleteAllApprovalException } from 'features/loan/normal/storageApproval/Other/actions';
import { getApprovalExceptions, getApprovalReport } from 'features/loan/normal/storageApproval/Other/selectors';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'views/components/base/TextArea';
import Empty from 'views/components/layout/Empty';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import TableSticky from 'views/components/layout/TableSticky';
import TitleSquare from 'views/components/layout/TitleSquare';
import ExceptionGroup from './ExceptionGroup';

const OtherException: FC = () => {

  const Exceptions = useSelector(getApprovalExceptions)
  const report = useSelector(getApprovalReport)
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const handleAddException = () => {
    dispatch(addNewApprovalException())
  }
  const handleDeleteAllException = () => {
    setIsModalConfirm(!isModalConfirm);
  }
  
  const onConfirmDelete = () => {
    dispatch(deleteAllApprovalException());
    setIsModalConfirm(!isModalConfirm);
  }
  const onHandleCancelConfirm = () => {
    setIsModalConfirm(!isModalConfirm);
  }
  
  return <Box className="mt-6">
    <TableSticky>
      <TableHead>
        <TableRow className="text-upper " sx={{ '& th': { py: '7px' },
          // "& .MuiTableCell-head":{
          //   borderBottom:'2px solid rgb(160 156 156)'
          // }
       }}>
          <TableCell width="50px" className="text-16">
            STT
          </TableCell>
          <TableCell width="299px" className="text-16">
            Loại ngoại lệ
          </TableCell>
          <TableCell>
            <Box className='flex justify-between items-center'>
              <span className="mr-2 text-16 " >Số lượng</span>
              {/* <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 0, textTransform: 'revert!important' as SystemStyleObject<Theme>, height: '32px' }}
              >
                Kiểm tra ngoại lệ
              </Button> */}

            </Box>
    
          </TableCell>
         
          <TableCell width="90px" className="px-0">
            <Box sx={{ 
              '& svg': { color: 'error.main' },
                 
              }}>
              {/* <Box sx={{
                width: 0,
                height: '21px',
                borderLeft: '1px solid #d5d5d5',
                display: 'unset',
              }}  /> */}
              <IconButton onClick={handleAddException} disabled={ruleDisabled}>
                <AiOutlinePlusSquare style={{ fontSize: '1.5rem' }} />
              </IconButton>
              <IconButton onClick={handleDeleteAllException} disabled={ruleDisabled}>
                <IoTrashOutline fontSize={'1.5rem'} color='error.main' />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className="p-0" sx={{ borderRadius: 0, borderBottom: 'unset !important' }} colSpan={ 4 }>
            {
             Exceptions.length > 0 ? Exceptions?.map((item, index) => {
                return (
                  <ExceptionGroup
                    key={index}
                    stt={index}
                    documentException={item}
                  />
                )
                }) : <Empty sx={{
                  minHeight: 250,
                  "& img": {
                    width: "23%"
                  },
                  fontSize: '20px',
                  fontWeight: 300,
                  // fontStyle: 'italic',
                }}>
                  Chưa có dữ liệu
                </Empty>
              }
          </TableCell>
        </TableRow>
        {
          report !== null && <TableRow>
          <TableCell colSpan={ 4 } className="pr-0">
            <TitleSquare className="my-3">ĐÁNH GIÁ CHUNG CỦA ĐVKD</TitleSquare>
            <TextArea 
              value={report ?? ""}
              disabled
              label="Cơ sở đề xuất"
              placeholder='Nhập cơ sở đề xuất'
            />
          </TableCell>
        </TableRow>
        }
       
      </TableBody>
    </TableSticky>
    <ModalConfirm
      open={isModalConfirm}
      children="Bạn có chắc chắn muốn xóa tất cả ngoại lệ"
      labelConfirm="Xác nhận"
      labelCancel="Hủy"
      onClose={onHandleCancelConfirm}
      onConfirm={onConfirmDelete}
    />
  </Box>

}

export default OtherException;
