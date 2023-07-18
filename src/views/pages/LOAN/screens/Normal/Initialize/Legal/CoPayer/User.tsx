import Box from "@mui/material/Box";
import useNotify from "app/hooks/useNotify";
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import {
  addLegalUseList,
  deleteLegalUserListByPersonUUID,
  deleteLegalUserListLocal,
  onchangeUseList
} from "features/loan/normal/storage/legal/actions";
import { ELegalTypeScreen } from "features/loan/normal/storage/legal/case";
import {
  getdataLegal,
  getLoanLegalBasic,
  getLoanLegalUseListActive, getLOANNormalStorageLegalBorrower
} from "features/loan/normal/storage/legal/selectors";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { FC, Fragment, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { ILOANNormalStorageLegalDeclareState, ILOANNormalStorageLegalFile } from "types/models/loan/normal/storage/Legal";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, {
  ObjectListMenuItem, ObjectListOption
} from "views/components/layout/ObjectList";
import AttachmentModalServices from "../AttachmentModalServices";
import * as _ from 'lodash';
import { PREFIX_LOCAL } from "utils";
import { sxObjectList } from "../style";

const CoPayerUser: FC = () => {

  const [DeleteDeclare, setDeleteDeclare] = useState<ILOANNormalStorageLegalDeclareState | null>(null);
  const SCREEN = ELegalTypeScreen.CO_PAYER;
  const params = useParams() as ILOANURLParams;
  const valueDeclare = useSelector(getLOANNormalStorageLegalBorrower)
  const ruleDisabled = useSelector(getRuleDisbled)
  const notify = useNotify();
  const dispatch = useDispatch();
  const [isOpen, setOpenAttachment] = useState<boolean>(false);
  const [uuidAttachment, setUuidAttachment] = useState<string>('');

  const onClickAdd = () => {
    if (!valueDeclare.includes(SCREEN)) {
      notify('Vui lòng khai báo đối tượng', 'warning');
      return
    }
    dispatch(addLegalUseList("", { declare: SCREEN }))
  }
  const dataUserList = useSelector(getLoanLegalBasic(SCREEN));
  const activeUserListLegal = useSelector(getLoanLegalUseListActive(SCREEN));

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

  const handleOpenAttach = (index: number) => {
    const uuid = _.get(dataUserList[index], 'basic.person_uuid', '');
    if(!uuid) {
      notify("Vui lòng khởi tạo đối tượng", "warning");
      return;
    };
    setUuidAttachment(uuid);
    setOpenAttachment(!isOpen);
  }
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

  return (
    <Fragment>
      <ObjectList
        labelLength="Số lượng người đồng trả nợ:&nbsp;"
        avatar
        enableMenu={!ruleDisabled}
        options={optionsUseList}
        onAdd={onClickAdd}
        current={activeUserList}
        onChange={onChangeUser}
        onAttach={handleOpenAttach}
        enableAdd={!ruleDisabled && optionsUseList.length < 4}
        onClickMenu={onClickMenu}
        menuWidth="110px"
        menu={[{ value: "delete", label: "Xoá" }]}
        sx={sxObjectList}
      />
      <ModalConfirm
        open={DeleteDeclare !== null}
        onClose={onCloseDelete}
        onConfirm={onConfirmDelete}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá người đồng trả nợ?
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
  );
};

export default CoPayerUser;
