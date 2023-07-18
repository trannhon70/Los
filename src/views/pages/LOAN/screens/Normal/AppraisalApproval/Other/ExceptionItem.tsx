import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNormalOtherApprovalMessage from 'app/hooks/useNormalOtherApprovalMessage';
import useNotify from 'app/hooks/useNotify';
import { getLOANNormalConfigMetadataConstant } from 'features/loan/normal/configs/metadata/selector';
import { deleteApprovalException, deleteApprovalExceptionDetail, setApprovalPolicyDetailType, setApprovalRealityDescription } from 'features/loan/normal/storageApproval/Other/actions';
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import {
  IApprovalExceptionInfoDetail,
  IApprovalStorageExceptionInfo
} from 'types/models/loan/normal/storageApproval/OtherProFile';
import { METADATA_CONSTANT } from 'utils/constants';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import SelectPolicy from 'views/components/widgets/SelectPolicy';

export interface ExceptionItemProps {
  data: IApprovalExceptionInfoDetail;
  group: IApprovalStorageExceptionInfo;
  index: number,
  groupIndex: number
}

const ExceptionItem: FC<ExceptionItemProps> = (props) => {
  const { data, group, index, groupIndex } = props;
  const dispatch = useDispatch();
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const getMessage = useNormalOtherApprovalMessage()
  const notify = useNotify();
  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant)
  const ruleDisabled = useSelector(getRuleDisbledReappraise)

  const onChangePolicyDetail = (value: number) => {
    const isEsixt = group?.detail_info_list.find((a) => a.exception_detail_id === value);
    const policy = metadataConstant.data[METADATA_CONSTANT.CONST_POLICY_GROUP_DETAIL]?.find(e => Number(e.id) === value)
    if (isEsixt) {
      notify('Mã ngoại lệ đã tồn tại', 'warning');
      return;
    } else {
      dispatch(setApprovalPolicyDetailType(value, {
        groupIdx: groupIndex,
        dataIdx: index,
        name: policy?.name ?? "",
        description: policy?.description ?? ""
      }))
    }
  };

  const handleChangeRealityDescription = (value: string) => {
    dispatch(setApprovalRealityDescription(value, { 
      groupIdx: groupIndex,
      dataIdx: index,
     }));
  };

  const handleDelete = () => {
    setIsModalConfirm(!isModalConfirm);
  };

  const onHandleCancelConfirm = () => {
    setIsModalConfirm(!isModalConfirm);
  };

  const onConfirmDelete = () => {
    if (group.detail_info_list.length === 1) {
      dispatch(deleteApprovalException({
        id: group.exception_type_id,
        index: groupIndex,
        isLocal: group.isLocal
      }));
    } else {
      dispatch(
        deleteApprovalExceptionDetail({ 
            groupId: group.exception_type_id,
            uuid: data.uuid,
            index, 
            groupIndex
         })
      );
    }
    setIsModalConfirm(!isModalConfirm);
  };

  return (
    <Fragment>
      <Table sx={{
          '& .MuiTableCell-root':{
            borderBottom: 'none'
          }
        }}>
        <TableBody>
          <TableRow>
            <TableCell
              width="150px"
              className="font-medium text-upper text-primary pl-0"
              sx={{ verticalAlign: 'top' }}
            >
              {group.exception_type_name} {index + 1}
            </TableCell>
            <TableCell width="224px" sx={{ verticalAlign: 'top' }}>
              <SelectPolicy
                label="1. Mã ngoại lệ"
                code={group.exception_type_id}
                // ref={policyRef}
                disabled={ruleDisabled}
                value={data.exception_detail_id ?? undefined}
                onChange={onChangePolicyDetail}
                message={getMessage('exception_detail_id', { exceptionIdx: groupIndex, uuid: data.uuid})}
                required
              />
            </TableCell>
            <TableCell>
              <Input 
                label="2. Diễn giải" 
                value={data.description} 
                disabled 
                />
              <TextArea
                className="mt-6"
                disabled={ruleDisabled}
                label="3. Diễn giải thực tế"
                onDebounce={handleChangeRealityDescription}
                value={data.reality_description}
                // message={getMessage('exceptionRealityDescription', { positionException: idx, positionDetail: stt })}
                maxlength={500}
              />
            </TableCell>
            <TableCell width="78px" className="px-0" sx={{ verticalAlign: 'top' }}>
              <Box className="flex h-full justify-between" sx={{ pt: '30px', '& svg': { color: 'primary.main' } }}>
                <IconButton 
                  onClick={handleDelete}
                  disabled={ruleDisabled}
                  >
                  <IoTrashOutline style={{fontSize: '1.5rem'}}/>
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
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
  );
};

export default ExceptionItem;
