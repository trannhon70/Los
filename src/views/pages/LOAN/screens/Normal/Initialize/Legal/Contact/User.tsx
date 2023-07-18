import { FC, Fragment, useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { ILOANNormalStorageLegalDeclareState, ILOANNormalStorageLegalFile } from 'types/models/loan/normal/storage/Legal';
import ObjectList, { ObjectListMenuItem } from 'views/components/layout/ObjectList';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import Box from '@mui/material/Box';
import { ObjectListOption } from 'views/components/layout/ObjectList';
import {
  addLegalUseList,
  deleteLegalUserListByPersonUUID,
  deleteLegalUserListLocal,
  onchangeUseList,
} from 'features/loan/normal/storage/legal/actions';
import {
  getLoanLegalBasic,
  getLoanLegalUseListActive,
} from 'features/loan/normal/storage/legal/selectors';
import useNotify from 'app/hooks/useNotify';
import { FaUserAlt } from 'react-icons/fa';
import { EActionMenu } from 'features/loan/normal/storage/collateralV2/case';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import AttachmentModalServices from '../AttachmentModalServices';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { PREFIX_LOCAL } from 'utils';
import * as _ from 'lodash';
import { sxObjectList } from '../style';

export interface UserProps {
  onChange?(value: string): void;
}

const ContactUser: FC<UserProps> = props => {

  
  const SCREEN = 'RELATED';
  
  const dispatch = useDispatch();
  const notify = useNotify();
  const [ DeleteDeclare, setDeleteDeclare ] = useState<ILOANNormalStorageLegalDeclareState | null>(null);
  const dataUserList = useSelector(getLoanLegalBasic(SCREEN))
  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN));
  const ruleDisabled = useSelector(getRuleDisbled)
  const params = useParams() as ILOANURLParams;
  const [isOpen, setOpenAttachment] = useState<boolean>(false);

  const handleOpenAttach = (index:number) => {
    const uuid = _.get(dataUserList[index], 'basic.person_uuid','');
    if(!uuid) {
      notify("Vui lòng khởi tạo đối tượng", "warning");
      return;
    };
    setUuidAttachment(uuid);
    setOpenAttachment(!isOpen);
  }

  const [uuidAttachment, setUuidAttachment] = useState<string>('');

  const onClickAdd = () => {
    // if(!valueDeclare.includes(SCREEN)){
    //   notify('Vui lòng khai báo đối tượng', 'warning');
    //   return
    // }
    dispatch(addLegalUseList("",{declare:SCREEN}))
  }

  const calAttachment = (data:ILOANNormalStorageLegalFile[]) => {
    let count = 0;
    data?.forEach(doc=>{
      count += doc?.child_files?.filter((item) => !item.uuid.startsWith(`${PREFIX_LOCAL}`)).length ?? 0;

    })
    return count;
  }

  const optionsUseList:ObjectListOption[] = dataUserList?.map((item)=>({
    label: item.basic.fullname ? item.basic.fullname : "Vui lòng nhập tên người liên hệ",
    circle: <FaUserAlt/>,
    attachment: calAttachment(item.document_info_list),
  }))

  const onChangeUser = (current: number) =>{
    const currentActive = dataUserList[current].uuidActiveLocal ?? ""
    dispatch(onchangeUseList(currentActive,{declare:SCREEN}))
  }
  const onCloseDelete = () => setDeleteDeclare(null);
  const activeUserList = dataUserList.findIndex(item=>item.uuidActiveLocal === activeUserListLegal)
  const onClickMenu = (menu: ObjectListMenuItem, position: number) => {
    let dataDelete = dataUserList[position]
    if(menu.value === EActionMenu.DELETE){
      dataDelete && setDeleteDeclare(dataDelete);
    }
  }


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
  return <Fragment>
    <ObjectList
      labelLength="Số lượng người liên hệ:"
      avatar
      enableMenu={ !ruleDisabled }
      menuWidth='110px'
      onClickMenu={onClickMenu}
      current={activeUserList}
      onAdd={onClickAdd}
      onChange={onChangeUser}
      onAttach={handleOpenAttach}
      enableAdd={ !ruleDisabled && optionsUseList.length < 4}
      options={optionsUseList}
      menu={[
        { value: 'delete', label: 'Xoá' },
      ]}
      sx={sxObjectList}
    />
   <ModalConfirm
      open={ DeleteDeclare !== null }
      onClose={onCloseDelete}
      onConfirm={onConfirmDelete}>
      <Box className="text-18 font-medium text-primary text-center">
        Bạn có chắc muốn xoá người liên hệ?
      </Box>
      <Box className="text-center">
        Các thông tin của {DeleteDeclare?.basic.fullname} sẽ mất hoàn toàn!
      </Box>
    </ModalConfirm>
    {isOpen && <AttachmentModalServices
      open={Boolean(isOpen)}
      onClose={() => setOpenAttachment(false)}
      uuidActive={uuidAttachment}

    />}
  </Fragment>

}

export default ContactUser;