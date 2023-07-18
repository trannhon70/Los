import Box from "@mui/material/Box";
import useNotify from "app/hooks/useNotify";
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import { addLegalUseList, deleteLegalUserListByPersonUUID, deleteLegalUserListLocal, onchangeUseList } from "features/loan/normal/storage/legal/actions";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import { getLoanLegalBasic, getLoanLegalUseListActive, getLOANNormalStorageLegalBorrower } from "features/loan/normal/storage/legal/selectors";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { FC, Fragment, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { ILOANNormalStorageLegalDeclareState, ILOANNormalStorageLegalFile } from "types/models/loan/normal/storage/Legal";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, { ObjectListMenuItem, ObjectListOption } from "views/components/layout/ObjectList";
import AttachmentModalServices from "../AttachmentModalServices";
import * as _ from 'lodash';
import { sxObjectList } from "../style";

const OtherUser: FC = () => {

  const SCREEN = ELegalTypeScreen.OTHER;
  const dispatch = useDispatch();

  const [DeleteDeclare, setDeleteDeclare] = useState<ILOANNormalStorageLegalDeclareState | null>(null);
  const [isOpen, setOpenAttachment] = useState<boolean>(false);

  const params = useParams() as ILOANURLParams;
  const valueDeclare = useSelector(getLOANNormalStorageLegalBorrower)
  const ruleDisabled = useSelector(getRuleDisbled)
  const [uuidAttachment, setUuidAttachment] = useState<string>('');

  const notify = useNotify();
  
  const onClickAdd = () => {
    if(!valueDeclare.includes(SCREEN)){ 
      notify('Vui lòng khai báo đối tượng', 'warning');
      return
    }
    dispatch(addLegalUseList("",{declare:SCREEN}))
  }

  const dataUserList = useSelector(getLoanLegalBasic(SCREEN))

  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN))
  // const dataUseList = useSelector(getLoanLegalUseListData(SCREEN,activeUserListLegal))

  const calAttachment = (data:ILOANNormalStorageLegalFile[]) => {
    let count = 0;
    data?.forEach(doc=>{
      count += (doc?.child_files?.length ?? 0);
    })
    return count;
  }

  const optionsUseList:ObjectListOption[] = dataUserList?.map((item)=>({
    label: item.basic.fullname ? item.basic.fullname : "Vui lòng nhập tên đối tượng khác",
    circle: <FaUserAlt/>,
    attachment: calAttachment(item.document_info_list),
  }))

  const onChangeUser = (current: number) =>{
    const currentActive = dataUserList[current].uuidActiveLocal ?? ""
    dispatch(onchangeUseList(currentActive,{declare:SCREEN}))
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

  const activeUserList = dataUserList.findIndex(item=>item.uuidActiveLocal === activeUserListLegal)

  const onCloseDelete =  () => setDeleteDeclare(null);
  
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
    let dataDelete = dataUserList.find((item,idx)=>idx === position)
    if(menu.value === EActionMenu.DELETE){
      dataDelete && setDeleteDeclare(dataDelete);
    }
  }

  return (
    <Fragment>
      <ObjectList
        labelLength="Số lượng đối tượng khác:"
        avatar
        enableMenu={!ruleDisabled}
        onClickMenu={onClickMenu}
        current={activeUserList}
        onAdd={onClickAdd}
        onChange={onChangeUser}
        menuWidth='110px'
        onAttach={handleOpenAttach}
        enableAdd={!ruleDisabled && optionsUseList.length < 4}
        options={optionsUseList}
        menu={[
          { value: 'delete', label: 'Xoá' },
        ]}
        sx={sxObjectList}
      />
      <ModalConfirm
        open={DeleteDeclare !== null}
        onClose={onCloseDelete}
        onConfirm={onConfirmDelete}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá đối tượng khác?
        </Box>
        <Box className="text-center">
          Các thông tin của {DeleteDeclare?.basic.fullname} sẽ mất hoàn toàn!
        </Box>
      </ModalConfirm>
    {isOpen && <AttachmentModalServices
      open={Boolean(isOpen)}
      onClose={()=> setOpenAttachment(false)}
      uuidActive={uuidAttachment}

    />}
    </Fragment>
  );
};

export default OtherUser;
