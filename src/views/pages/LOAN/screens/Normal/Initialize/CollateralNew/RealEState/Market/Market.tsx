import { FC, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {
  addCollaretalRPRO,
  deleleteItem,
  deleteAllCollateral,
  deleteCollateralItem,
  onChangeCollaretalRPRO,
  postCollaterals,
  updateCollaterals,
} from "features/loan/normal/storage/collateralV2/actions";
import {
  ILOANNormalCollateralData,
  ISubItems,
  ISubtype,
} from "types/models/loan/normal/storage/CollaretalV2";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import useStorageCollateral from "../../useStorageCollateral";
import MarketInfoLegal from "./MarketInfoLegal";
import GroupListBase, {
  IGroupListBase,
} from "views/components/layout/GroupListBase";
import { formatNumber } from "utils";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import AssessmentInfomation from "../../AssessmentInfomation";
import useNotify from "app/hooks/useNotify";
import { getIsCollapseActive } from "features/loan/normal/storage/collateralV2/selector";
import useBackdrop from "app/hooks/useBackdrop";

export interface DepartmentProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
  subItem?: ISubItems;
  idx?: number;
}

// TODO: Bất động sản
const Market: FC<DepartmentProps> = (props) => {
  const { showBackdrop } = useBackdrop();
  const dispatch = useDispatch();
  const { collateralData, subType } = props;
  const { SubTypeItems, SubTypeItemsActive } = useStorageCollateral(
    "ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? ""
  );
  const ruleDisabled = useSelector(getRuleDisbled)
  const [uuidItem, setUuidItem] = useState<string>(); // Check is exist subType
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);

  const optionGroupList: IGroupListBase[] = SubTypeItems
    ? SubTypeItems?.map((sty, index) => ({
      key: index + 1,
      value: sty.activeUUID,
      label: `BĐS${index + 1}`,
      valueMoney: formatNumber(Number(sty?.market?.maket_wrapper?.value_of_land ?? 0).toString())+ ' VNĐ'
    }))
    : [];

  const onHandleDeleteGroupList = (val: IGroupListBase) => {
    setUuidItem(val.value.toString());
    setIsModalConfirm(!isModalConfirm);
  };
  const notify = useNotify();
  const isCollapsedItem = useSelector(getIsCollapseActive);

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
        notify("Xóa thành công", "success")
      }
    }
   
    setIsModalConfirm(!isModalConfirm);
  }
  const onHandleCancelConfirm = () => {
    setIsModalConfirm(!isModalConfirm);
  }
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
            <TableCell width="3%" sx={{ border: "none" }}></TableCell>
            <TableCell
              sx={{
                border: "none",
                display: "flex",
                width: "100%",
                "& .MuiList-root": {
                  overflow: "scroll",
                },
              }}
            >
              <GroupListBase
                className="group-list"
                labelAdd="Thêm GCN hợp khối"
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
            <TableCell width="77%" sx={{ border: "none" }}>
              <AssessmentInfomation
                uuidData={collateralData?.uuidActiveData ?? ""}
                uuidSubtype={subType?.uuidActiveSubtype ?? ""}
              />
              <MarketInfoLegal
                uuIdSubType={subType?.uuidActiveSubtype}
                collateral={collateralData}
              />
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
  );
};

export default Market;
