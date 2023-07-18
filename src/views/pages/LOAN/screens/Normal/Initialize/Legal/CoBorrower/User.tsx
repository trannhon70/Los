import { FC, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import ObjectList, { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import { useSelector } from "react-redux";
import { ObjectListOption } from 'views/components/layout/ObjectList'
import { addLegalUseList, deleteLegalUserListByPersonUUID, deleteLegalUserListLocal, onchangeUseList, saveLegalCoBorrower } from 'features/loan/normal/storage/legal/actions';
import { getLoanLegalBasic, getLoanLegalUseListActive, getLOANNormalStorageLegalBorrower } from 'features/loan/normal/storage/legal/selectors';
import useNotify from 'app/hooks/useNotify';
import { FaUserAlt } from 'react-icons/fa';
import { ILOANNormalStorageLegalDeclareState, ILOANNormalStorageLegalFile } from 'types/models/loan/normal/storage/Legal';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import Box from '@mui/material/Box';
import { EActionMenu } from 'features/loan/normal/storage/collateralV2/case';
import { ELegalTypeScreen } from 'features/loan/normal/storage/legal/case';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import AttachmentModalServices from '../AttachmentModalServices';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import * as _ from 'lodash';
import { PREFIX_LOCAL } from 'utils';
import { sxObjectList } from '../style';

export interface UserProps {
  onChange?(value: string): void;
}
const CoBorrowerUser: FC<UserProps> = props => {

  const SCREEN = ELegalTypeScreen.CO_BRW;
  const [DeleteDeclare, setDeleteDeclare] = useState<ILOANNormalStorageLegalDeclareState | null>(null);
  const dispatch = useDispatch();
  const valueDeclare = useSelector(getLOANNormalStorageLegalBorrower)
  const notify = useNotify();
  const [isOpen, setOpenAttachment] = useState<boolean>(false);
  const [uuidAttachment, setUuidAttachment] = useState<string>('');

  const onClickAdd = () => {
    if (!valueDeclare.includes(SCREEN)) {
      notify('Vui lòng khai báo đối tượng', 'warning');
      return
    }
    dispatch(addLegalUseList("", { declare: SCREEN }))
  }

  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN));
  
  const dataUserList = useSelector(getLoanLegalBasic(SCREEN))
  const ruleDisabled = useSelector(getRuleDisbled)
  const params = useParams() as ILOANURLParams;

  const calAttachment = (data: ILOANNormalStorageLegalFile[]) => {
    let count = 0;
    data?.forEach(doc => {
      count += doc?.child_files?.filter((item) => !item.uuid.startsWith(`${PREFIX_LOCAL}`)).length ?? 0;
    })
    return count;
  }

  const optionsUseList: ObjectListOption[] = dataUserList?.map((item) => ({
    label: item.basic.fullname ? item.basic.fullname : "Vui lòng nhập tên người đồng vay",
    circle: <FaUserAlt />,
    attachment: calAttachment(item.document_info_list),
  }))

  const onChangeUser = (current: number) => {
    const currentActive = dataUserList[current].uuidActiveLocal ?? ""
    dispatch(onchangeUseList(currentActive, { declare: SCREEN }))
  }

  const activeUserList = dataUserList.findIndex(item => item.uuidActiveLocal === activeUserListLegal)
  const onCloseDelete = () => setDeleteDeclare(null);

  const onConfirmDelete = () => {
    let uuidDelete = DeleteDeclare?.uuidActiveLocal ?? ""
    if (!uuidDelete) {
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else {
      const uuidActivePersonList = DeleteDeclare?.basic.person_uuid ?? "";
      if(uuidActivePersonList){
        dispatch(deleteLegalUserListByPersonUUID({ los_uuid: params.id, declare_type: SCREEN }, { valueDeclare: [], person_uuid: uuidActivePersonList, valueChangeDeclare: [] }));
      }
      else{
        dispatch(deleteLegalUserListLocal(uuidDelete, { declare: SCREEN }));
      }
      onCloseDelete();
    }
    onCloseDelete()
  }

  const onClickMenu = (menu: ObjectListMenuItem, position: number) => {
    let dataDelete = dataUserList.find((item, idx) => idx === position)
    if (menu.value === EActionMenu.DELETE) {
      dataDelete && setDeleteDeclare(dataDelete);
    }
  }

  const handleOpenAttach = (index:number) => {
    const uuid = _.get(dataUserList[index],'basic.person_uuid','');
    if(!uuid) {
      notify("Vui lòng khởi tạo đối tượng", "warning");
      return;
    };
    setUuidAttachment(uuid);
    setOpenAttachment(!isOpen);
  }


  return <Fragment>
    <ObjectList
      labelLength="Số lượng người đồng vay:&nbsp;"
      avatar
      attachLabel="tập tin"
      enableMenu={!ruleDisabled}
      onClickMenu={onClickMenu}
      current={activeUserList}
      onAdd={onClickAdd}
      onChange={onChangeUser}
      menuWidth='110px'
      enableAdd={!ruleDisabled && optionsUseList.length < 4}
      options={optionsUseList}
      onAttach={handleOpenAttach}
      menu={[
        { value: 'delete', label: 'Xoá' },
      ]}
      sx={sxObjectList}
    />
    <ModalConfirm
      open={DeleteDeclare !== null}
      onClose={onCloseDelete}
      onConfirm={onConfirmDelete}>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc muốn xoá người đồng vay?
      </Box>
      <Box className="text-center">
        Các thông tin của {DeleteDeclare?.basic.fullname} sẽ mất hoàn toàn!
      </Box>
    </ModalConfirm>
    {isOpen && <AttachmentModalServices
      open={Boolean(isOpen)}
      onClose={()=>setOpenAttachment(false)}
      uuidActive={uuidAttachment}
    />}
  </Fragment>

}

export default CoBorrowerUser;