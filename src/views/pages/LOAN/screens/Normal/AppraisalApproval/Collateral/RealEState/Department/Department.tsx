import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useBackdrop from 'app/hooks/useBackdrop';
import { onChangeCollaretalRPROApproval, postCollateralsApproval, updateCollateralsApproval } from 'features/loan/normal/storageApproval/collateral/actions';
import { getIsCollapseActive } from 'features/loan/normal/storage/collateralV2/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalCollateralData, ISubItems, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import { formatNumber } from 'utils';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import AssessmentInfomation from 'views/pages/LOAN/screens/Normal/AppraisalApproval/Collateral/AssessmentInfomation';
import useStorageCollateral from '../../useStorageCollateral';
import LegalInfo from './legalInfo';
export interface DepartmentProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
  subItem?: ISubItems;
  idx?: number
}

// TODO: Bất động sản
const Department: FC<DepartmentProps> = (props) => {

  const dispatch = useDispatch();
  const { collateralData, subType } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
  const { SubTypeItems, SubTypeItemsActive } = useStorageCollateral("ALL", collateralData?.uuidActiveData ?? "", subType?.uuidActiveSubtype ?? "")
  const [uuidItem, setUuidItem] = useState<string>(); // Check is exist subType
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const { showBackdrop } = useBackdrop();
  const isCollapsedItem = useSelector(getIsCollapseActive);
  
  // const onHandleAddGroupList = () => {
  //   if (isCollapsedItem) {
  //     showBackdrop(true);
  //     if (isCollapsedItem.isSaved && isCollapsedItem.price_cert_uuid) {
  //       dispatch(updateCollateralsApproval({type: isCollapsedItem.type , addItem: true} ))
  //     }
  //     else {
  //       dispatch(postCollateralsApproval({type:isCollapsedItem.type, addItem: true}))
  //     }
  //   }
  // }

  const optionGroupList: IGroupListBase[] = SubTypeItems
    ? SubTypeItems?.map((sty, index) => ({
      key: index + 1,
      value: sty.activeUUID,
      label: `BĐS${index + 1}`,
      valueMoney: formatNumber((sty?.department?.department_wrapper?.value_of_land ?? 0).toString())+ ' VNĐ'
    }))
    : [];

  // const onHandleDeleteGroupList = (val: IGroupListBase) => {
  //   setUuidItem(val.value.toString());
  //   setIsModalConfirm(!isModalConfirm);
  // };
  
  // const onHandleConfirm = () => {
  //   dispatch(
  //     deleleteItemApproval(uuidItem ?? '', {
  //       uuidData: collateralData?.uuidActiveData ?? "",
  //       uuidSubType: subType?.uuidActiveSubtype ?? "",
  //     })
  //   );
  //   setIsModalConfirm(!isModalConfirm);
  // }
  // const onHandleCancelConfirm = () => {
  //   setIsModalConfirm(!isModalConfirm);
  // }
  const onHandleSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = SubTypeItems[current].activeUUID ?? "";
    dispatch(
      onChangeCollaretalRPROApproval(currentActive, {
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
                isDelete={!ruleDisabled}
                isAdd={true}
                isValueMoney={true}
                // onDelete={(val) => onHandleDeleteGroupList(val)}
                // onAdd={onHandleAddGroupList}
                onSelected={onHandleSelectGroupList}
                options={optionGroupList}
                activeId={(SubTypeItems?.findIndex((d) => d.activeUUID === SubTypeItemsActive) ?? 0) + 1}
              />
            </TableCell>
            <TableCell width='100%' sx={{ border: 'none' }}>
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
      {/* <ModalConfirm
        open={isModalConfirm}
        children="Bạn có chắc chắn muốn xóa GCN hợp khối này"
        labelConfirm="Xác nhận"
        labelCancel="Hủy"
        onClose={onHandleCancelConfirm}
        onConfirm={onHandleConfirm}
      /> */}
    </Fragment>
  )
}

export default Department;