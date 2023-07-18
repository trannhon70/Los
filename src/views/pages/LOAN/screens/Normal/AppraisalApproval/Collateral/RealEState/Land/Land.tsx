import { FC, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import {
  ILOANNormalCollateralData,
  ISubItems,
  ISubtype
} from 'types/models/loan/normal/storage/CollaretalV2';
import { Grid } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import useStorageCollateral from '../../useStorageCollateral';
import GroupListBase, { IGroupListBase } from 'views/components/layout/GroupListBase';
import { SxObjectListTypeCollateral } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style'; // done
import { FaHandHoldingUsd } from 'react-icons/fa';
import ObjectList from 'views/components/layout/ObjectList';
import { formatNumber } from 'utils';
import CTXDLand from './OwnerShipLand/CTXDLand';
import ActionTypeLand from './OwnerShipLand/ActionTypeLand';
import AssessmentInfomation from '../../AssessmentInfomation';
import CollateralLegal from './OwnerShipLand/LegalLand';
import CTXDGcn from './OwnerShipLand/CTXDGcn';
import {
  onChangeCollaretalRPROApproval,
  setTypeLandApproval
} from 'features/loan/normal/storageApproval/collateral/actions';
export interface LandProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
  subItem?: ISubItems;
  idx?: number
}
// done
const Land: FC<LandProps> = (props) => {  // done

  const dispatch = useDispatch();
  const { collateralData, subType } = props;
  const { SubTypeItems, SubTypeItemsActive, dataItems } = useStorageCollateral("ALL", collateralData?.uuidActiveData ?? "", subType?.uuidActiveSubtype ?? "")
  const [currentTypeDefault, setCurrentTypeDefault] = useState<number>(0);

  const optionGroupList: IGroupListBase[] = SubTypeItems
    ? SubTypeItems?.map((sty, index) => ({
      key: index + 1,
      value: sty.activeUUID,
      label: `BĐS${index + 1}`,
      valueMoney: formatNumber((Number(sty?.land.land_wrapper?.value_of_land ?? 0) +
      Number(sty?.ctxd_land.ctx_land_wrapper?.value_of_land ?? 0)+
      Number(sty?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.map(
        gcn => gcn?.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.value_of_land ?? 0)
        .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0)).toString()) + ' VNĐ'
    }))
    : [];

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
  const onChangeType = (current: number) => {
    if (currentTypeDefault !== current) {
      setCurrentTypeDefault(current);
    }
    dispatch(setTypeLandApproval(current, { uuidData: collateralData?.uuidActiveData ?? "", uuIdSubType: subType?.uuidActiveSubtype ?? "" }))
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
                isDelete={false}
                isAdd={false}
                isValueMoney={true}
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
    </Fragment>
  )
}
export default Land;