import { FC, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import { addCollaretalRPRO, deleleteItem, deleteAllCollateral, deleteCollateralItem, onChangeCollaretalRPRO, postCollaterals, updateCollaterals } from 'features/loan/normal/storage/collateralV2/actions';
import { ILOANNormalCollateralData, ISubItems, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import { Grid } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AssessmentInfomation from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/AssessmentInfomation';
import useStorageCollateral from '../../useStorageCollateral';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import { formatNumber } from 'utils';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import LegalInfo from './legalInfo';
import useNotify from 'app/hooks/useNotify';
import { getIsCollapseActive } from 'features/loan/normal/storage/collateralV2/selector';
import useBackdrop from 'app/hooks/useBackdrop';
export interface DepartmentProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
  subItem?: ISubItems;
  idx?: number
}

// TODO: Bất động sản
const Department: FC<DepartmentProps> = (props) => {

  const dispatch = useDispatch();
  const { showBackdrop } = useBackdrop();
  const { collateralData, subType } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const { SubTypeItems, SubTypeItemsActive } = useStorageCollateral("ALL", collateralData?.uuidActiveData ?? "", subType?.uuidActiveSubtype ?? "")
  const [uuidItem, setUuidItem] = useState<string>(); // Check is exist subType
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const isCollapsedItem = useSelector(getIsCollapseActive);

  const onHandleAddGroupList = () => {
    if (isCollapsedItem) {
      showBackdrop(true);
      if (isCollapsedItem.isSaved && isCollapsedItem.price_cert_uuid) {
        dispatch(updateCollaterals({type: isCollapsedItem.type , addItem: true} ))
      }
      else {
        dispatch(postCollaterals({type:isCollapsedItem.type, addItem: true}))
      }
    }
  }

  const optionGroupList: IGroupListBase[] = SubTypeItems
    ? SubTypeItems?.map((sty, index) => ({
      key: index + 1,
      value: sty.activeUUID,
      label: `BĐS${index + 1}`,
      valueMoney: formatNumber((sty?.department?.department_wrapper?.value_of_land ?? 0).toString())+ ' VNĐ'
    }))
    : [];
  const onHandleDeleteGroupList = (val: IGroupListBase) => {
    setUuidItem(val.value.toString());
    setIsModalConfirm(!isModalConfirm);
  };
  const notify = useNotify();

  const onHandleConfirm = () => {
    if(optionGroupList.length === 1 ){
      collateralData && dispatch(deleteAllCollateral({
        cert_uuid: collateralData.price_cert_uuid,
        uuid: collateralData.uuidActiveData
      },{key:"item"})) 
    }else if (collateralData?.uuidActiveData) {
      let dataMenuCer = SubTypeItems?.find((cer, index) => cer.activeUUID === uuidItem);
      if (dataMenuCer?.price_cert_asset_uuid) {
        dispatch(deleteCollateralItem(
          uuidItem ?? "",
          {
            price_cert_uuid: collateralData.price_cert_uuid ?? "",
            price_cert_asset_uuid: dataMenuCer?.price_cert_asset_uuid ?? "",
            uuidData: collateralData?.uuidActiveData ?? "",
            uuidSubType: subType?.uuidActiveSubtype ?? "",
          }
        ));
      } else {
        dispatch(
          deleleteItem(uuidItem ?? '', {
            uuidData: collateralData?.uuidActiveData ?? "",
            uuidSubType: subType?.uuidActiveSubtype ?? "",
          })
        );
      }
      notify("Xóa thành công", "success")

    }
    setIsModalConfirm(!isModalConfirm);
  }
  const onHandleCancelConfirm = () => {
    setIsModalConfirm(!isModalConfirm);
  }
  const onHandleSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = SubTypeItems[current].activeUUID ?? "";
    dispatch(
      onChangeCollaretalRPRO(currentActive, {
        uuid: collateralData?.uuidActiveData ?? "",
        uuidActive: subType?.uuidActiveSubtype ?? "",
      })
    );
  };

  return (
    <Fragment>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width='3%' sx={{ border: 'none' }}></TableCell>
            <TableCell width='100%' sx={{
              border: 'none', display: 'flex', width: '100%', '& .MuiList-root': {
                overflow: 'scroll'
              }
            }}>

              <GroupListBase
                className="group-list"
                labelAdd='Thêm GCN hợp khối'
                isDelete={!ruleDisabled && !(SubTypeItems.length === 1)}
                isAdd={ruleDisabled || collateralData?.is_compactness === "N"}
                isValueMoney={true}
                onDelete={(val) => onHandleDeleteGroupList(val)}
                onAdd={onHandleAddGroupList}
                onSelected={onHandleSelectGroupList}
                options={optionGroupList}
                activeId={
                  (SubTypeItems?.findIndex(
                    (d) => d.activeUUID === SubTypeItemsActive
                  ) ?? 0) + 1
                }
              />
            </TableCell>
            <TableCell width='77%' sx={{ border: 'none' }}>
              <Grid container spacing={3} >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <AssessmentInfomation
                    uuidData={collateralData?.uuidActiveData ?? ""}
                    uuidSubtype={subType?.uuidActiveSubtype ?? ""}
                  />
                  <LegalInfo
                    uuIdData={collateralData?.uuidActiveData ?? ""}
                    activeSubType={subType?.uuidActiveSubtype ?? ""}
                  />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ModalConfirm
        open={isModalConfirm}
        children="Bạn có chắc chắn muốn xóa GCN hợp khối này"
        labelConfirm="Xác nhận"
        labelCancel="Hủy"
        onClose={onHandleCancelConfirm}
        onConfirm={onHandleConfirm}
      />
    </Fragment>
  )
}

export default Department;