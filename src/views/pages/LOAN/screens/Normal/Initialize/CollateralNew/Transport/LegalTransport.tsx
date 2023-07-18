import { FC, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckboxTransportType,
  setCollaretalRPRO,
} from 'features/loan/normal/storage/collateralV2/actions';
import { ILOANNormalCollateralData, ISubItems, ISubtype, IValueOnChangeCollateral } from 'types/models/loan/normal/storage/CollaretalV2';
import { Grid} from '@mui/material';
import Input from 'views/components/base/Input';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useStorageCollateral from '../useStorageCollateral';
import CardInside from 'views/components/layout/CardInside';
import SelectorVehicleDetail from 'views/components/widgets/SelectorVehicleDetail';
import { EDetailsTransport } from 'features/loan/normal/storage/collateralV2/case';
import SelectCountriesManufacture from 'views/components/widgets/SelectCountriesManufacture';
import SelectVehicleStatus from 'views/components/widgets/SelectVehicleStatus';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import CheckBoxLegalDocs, { CheckBoxRef } from './CheckBoxLegalDocs';

export interface TransportProps {
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const LegalTransport: FC<TransportProps> = (props) => {
  const dispatch = useDispatch();
  const { collateralData, subType } = props;
  const ruleDisabled = useSelector(getRuleDisbled)
 
  const getMessage = useNormalCollateralMessage();
  const checkboxRef = useRef<CheckBoxRef>(null);

  const {
    SubTypeId,
    SubTypeItemsActive,
    dataItems,
    dataLegalDocs,
  } = useStorageCollateral("ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? "");

  const handleChangeParent = () => {
    dispatch(
      setCheckboxTransportType("", {
        uuidActiveData: collateralData?.uuidActiveData ?? "",
        uuidActiveSubtype: subType?.uuidActiveSubtype ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        dataMeta: checkboxRef.current?.getValue() ?? [],
        parentId: undefined,
        otherFlag: "",
      })
    );
  };
  const handleChangeChild = (
    parentId: string,
    otherFlag: string,
    otherValue?: string | null
  ) => {
    dispatch(
      setCheckboxTransportType("", {
        uuidActiveData: collateralData?.uuidActiveData ?? "",
        uuidActiveSubtype: subType?.uuidActiveSubtype ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        dataMeta: checkboxRef.current?.getValueChild() ?? [],
        parentId: parentId,
        otherFlag,
        otherValue,
      })
    );
  };
 
  const onChangeDataDetails = (value: IValueOnChangeCollateral, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: collateralData?.uuidActiveData ?? "", uuidActive: subType?.uuidActiveSubtype ?? "", key }))
  }

 
  return (
    <Fragment>
      <CardInside title="I. Thông tin Phương tiện vận tải" fieldsetClass="px-4" classBody="h-full p-6" >
        <Grid container spacing={3}>
          <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
            {
              SubTypeId === EDetailsTransport.NRVE ?
                <Input
                  label="1. Loại phương tiện"
                  placeholder="Nhập loại phương tiện"
                  required
                  value={(dataItems?.transportation_sub_type ?? '')}
                  onDebounce={(val) => onChangeDataDetails(val, 'transportation_sub_type')}
                  message={getMessage('transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}
                  disabled={ruleDisabled}
                />
                :
                < SelectorVehicleDetail
                  label="1. Loại phương tiện"
                  placeholder="Chọn loại phương tiện"
                  required
                  value={(dataItems?.transportation_sub_type ?? '')}
                  onChange={(val) => {
                    onChangeDataDetails(val, 'transportation_sub_type')
                    if (val !== 'TRVE_OTHER' && dataItems?.other_transportation_sub_type !== '') {
                      onChangeDataDetails(null, 'other_transportation_sub_type')
                    }
                  }}
                  transportType={SubTypeId}
                  message={getMessage('transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}
                  disabled={ruleDisabled}
                />
            }
          </Grid>
          {SubTypeId === EDetailsTransport.NRVE
            ?
            null
            :
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
              <Input
                label="2. Chi tiết loại phương tiện khác"
                placeholder="Nhập chi tiết loại phương tiện khác"
                required={SubTypeId === EDetailsTransport.NRVE ? false : (dataItems?.transportation_sub_type === "TRVE_OTHER" ? false : true)}
                value={(dataItems?.other_transportation_sub_type ?? '')}
                onDebounce={(val) => onChangeDataDetails(val, 'other_transportation_sub_type')}
                disabled={SubTypeId === EDetailsTransport.NRVE ? false : (dataItems?.transportation_sub_type === "TRVE_OTHER" ? false : true) || ruleDisabled}
                message={getMessage('other_transportation_sub_type', { position: dataItems?.activeUUID ?? '' })}

              />
            </Grid>}
          <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="3. Nhãn hiệu"
              placeholder="Nhập nhãn hiệu"
              required
              value={(dataItems?.branch ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'branch')}
              message={getMessage('branch', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="4. Model (số loại)"
              placeholder="Nhập model (số loại)"
              required
              value={(dataItems?.model ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'model')}
              message={getMessage('model', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
            <SelectCountriesManufacture
              label="5. Nơi sản xuất/lắp ráp"
              placeholder="Nhập nơi sản xuất/lắp ráp"
              required
              value={dataItems?.origin_of_production ?? ''}
              onChange={(val) => onChangeDataDetails(val, 'origin_of_production')}
              message={getMessage('origin_of_production', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="6. Nơi sản xuất/lắp ráp khác"
              placeholder="Nhập nơi sản xuất lắp ráp khác"
              required={dataItems?.origin_of_production === "OT" ? true : false}
              value={(dataItems?.other_origin_of_production ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'other_origin_of_production')}
              disabled={dataItems?.origin_of_production === "OT" ? false : true || ruleDisabled}
              message={getMessage('other_origin_of_production', { position: dataItems?.activeUUID ?? '' })}
            />
          </Grid>
        </Grid>
      </CardInside>
      <CardInside title="II. Thông tin pháp lý" fieldsetClass="px-4" classBody="h-full p-6" >
        <Grid container spacing={3}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <CheckBoxLegalDocs valueDocs={dataLegalDocs}
              uuidActiveData={collateralData?.uuidActiveData ?? ""}
              uuidActiveItem={SubTypeItemsActive}
              ref={checkboxRef}
              handleChangeChild={handleChangeChild}
              handleChangeParent={handleChangeParent}
              uuidActiveSubType={subType?.uuidActiveSubtype ?? ""}
              message={getMessage('legal_document_types', { position: dataItems?.activeUUID ?? '' })}
            />
          </Grid>
          <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="2. Số giấy đăng ký/HSPL"
              placeholder="Nhập số giấy đăng ký/HSPL"
              // required
              value={(dataItems?.license ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'license')}
              message={getMessage('license', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
            <SelectVehicleStatus
              label="3. Tình trạng PTVT"
              placeholder="Chọn tình trạng PTVT"
              required
              value={(dataItems?.status ?? '')}
              onChange={(val) => onChangeDataDetails(val, 'status')}
              message={getMessage('status', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="4. Số khung"
              placeholder="Nhập số khung"
              // required
              value={(dataItems?.vehicle_identification_number ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'vehicle_identification_number')}
              message={getMessage('vehicle_identification_number', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={3} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="5. Số máy"
              placeholder="Nhập số máy"
              // required
              value={(dataItems?.engine_number ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'engine_number')}
              message={getMessage('engine_number', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="6. Biển số đăng ký"
              placeholder="Nhập biển số đăng ký"
              // required
              value={(dataItems?.license_plate ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'license_plate')}
              message={getMessage('license_plate', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="7. Mô tả tài sản"
              placeholder="Nhập mô tả tài sản"
              required
              value={(dataItems?.description ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'description')}
              message={getMessage('description', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
            <Input
              label="8. Chất lượng còn lại thẩm định"
              placeholder="Nhập chất lượng còn lại thẩm định"
              required
              type="number"
              format
              value={(dataItems?.CLCL?.toString() ?? '')}
              onDebounce={(val) => onChangeDataDetails(val, 'CLCL')}
              message={getMessage('CLCL', { position: dataItems?.activeUUID ?? '' })}
              disabled={ruleDisabled}
            />
          </Grid>
        </Grid>
      </CardInside>
    </Fragment>
  )
}
export default LegalTransport;