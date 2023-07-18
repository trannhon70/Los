import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';
import { deleleteItem, deleteAllCollateral, deleteCollateralItem, onChangeCollaretalRPRO, postCollaterals, setTypeLand, updateCollaterals } from 'features/loan/normal/storage/collateralV2/actions';
import { getIsCollapseActive } from 'features/loan/normal/storage/collateralV2/selector';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useState } from 'react';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalCollateralData, ISubItems, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
import { formatNumber } from 'utils';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import ObjectList from 'views/components/layout/ObjectList';
import AssessmentInfomation from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/AssessmentInfomation'; // done
import ActionTypeLand from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/RealEState/Land/OwnerShipLand/ActionTypeLand'; // done 
import CTXDGcn from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/RealEState/Land/OwnerShipLand/CTXDGcn'; // done 
import CollateralLegal from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/RealEState/Land/OwnerShipLand/LegalLand'; // done 
import { SxObjectListTypeCollateral } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style'; // done
import useStorageCollateral from '../../useStorageCollateral';
import CTXDLand from './OwnerShipLand/CTXDLand';
export interface LandProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
  subItem?: ISubItems;
  idx?: number
}
// done
const Land: FC<LandProps> = (props) => {  // done

  const dispatch = useDispatch();
  const { showBackdrop } = useBackdrop();
  const { collateralData, subType } = props;
  const { SubTypeItems, SubTypeItemsActive, dataItems } = useStorageCollateral("ALL", collateralData?.uuidActiveData ?? "", subType?.uuidActiveSubtype ?? "")
  const [currentTypeDefault, setCurrentTypeDefault] = useState<number>(0);
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

  const ruleDisabled = useSelector(getRuleDisbled)

  const optionGroupList: IGroupListBase[] = SubTypeItems
    ? SubTypeItems?.map((sty, index) => ({
      key: index + 1,
      value: sty.activeUUID,
      label: `BĐS${index + 1}`,
      valueMoney: formatNumber((Number(sty?.land.land_wrapper?.value_of_land ?? 0) +
      (sty?.land?.land_wrapper.has_land_asset === 'Y' ? Number(sty?.ctxd_land.ctx_land_wrapper?.value_of_land ?? 0) : 0) + 
      Number(sty?.land?.land_wrapper?.has_certificated_land_asset === 'Y' ? sty?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.map(gcn => gcn?.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.value_of_land ?? 0)
        .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0 : 0)).toString()) + ' VNĐ'
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
        notify("Xóa thành công", "success")

      }
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
    // if (currentTypeDefault !== current) {
      onChangeType(0)
    // }
  };
  const onChangeType = (current: number) => {
    if (currentTypeDefault !== current) {
      setCurrentTypeDefault(current);
    }
    dispatch(setTypeLand(current, { uuidData: collateralData?.uuidActiveData ?? "", uuIdSubType: subType?.uuidActiveSubtype ?? "" }))
  }

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
                  <ObjectList
                    enableAdd={false}
                    onChange={(current) => onChangeType(current)}
                    enableMenu={false}
                    labelLength="Chọn loại"
                    current={currentTypeDefault}
                    options={[
                      { label: 'Đất', circle: <FaHandHoldingUsd className='land' /> },
                      { label: 'CTXD trên đất', circle: <FaHandHoldingUsd className='ctxd-land' /> },
                      { label: 'CTXD có GCN QSH riêng', circle: <FaHandHoldingUsd className='ctxd-gcn-land' /> }
                    ]}
                    sx={{
                      ...SxObjectListTypeCollateral,
                      "& [role='tablist'] >[role='tab']:nth-child(2)": {
                        pointerEvents: dataItems?.land.land_wrapper.has_land_asset === "Y" ? "" : "none"
                      },
                      "& [role='tablist'] >[role='tab']:nth-child(3)": {
                        pointerEvents: dataItems?.land.land_wrapper.has_certificated_land_asset === "Y" ? "" : "none"
                      }
                    }}
                  // sx={{SxObjectListTypeCollateral}}
                  />
                </Grid>
                <ActionTypeLand
                  currentType={currentTypeDefault}
                  uuidActiveData={collateralData?.uuidActiveData ?? ""}
                  uuIdSubType={subType?.uuidActiveSubtype ?? ""}
                />
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <AssessmentInfomation
                    uuidData={collateralData?.uuidActiveData ?? ""}
                    uuidSubtype={subType?.uuidActiveSubtype ?? ""}
                  />
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  {
                    currentTypeDefault === 0 ? <CollateralLegal uuIdData={collateralData?.uuidActiveData ?? ""} uuIdSubType={subType?.uuidActiveSubtype ?? ""} activeSubType={subType?.uuidActiveSubtype ?? ""} /> :
                      currentTypeDefault === 1 ? <CTXDLand uuIdData={collateralData?.uuidActiveData ?? ""} activeSubType={subType?.uuidActiveSubtype ?? ""} /> :
                        currentTypeDefault === 2 ? <CTXDGcn uuidData={collateralData?.uuidActiveData ?? ""} uuidSubType={subType?.uuidActiveSubtype ?? ""} /> : null
                  }
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
export default Land;