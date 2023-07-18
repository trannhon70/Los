import { Box, Grid } from "@mui/material";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import useNotify from "app/hooks/useNotify";
import {
  addCollaretalDepartmentInfo,
  removeCollaretalDepartmentInfo,
  setOnChangeCollaretalDepartmentInfo,
  setOnChangeCollaretalDepartmentInfoData,
} from "features/loan/normal/storage/collateralV2/actions";
import { EActionMenu } from "features/loan/normal/storage/collateralV2/case";
import {
  getLoanNormalSubTypeItemsActive,
  getLOANormalStoreLandLegalItemActive,
  getLOANormalStoreLegalDepartmentInfo,
  getLOANormalStoreLegalDepartmentInfoData,
  getLOANormalStoreLegalDepartmentInfoUuid,
} from "features/loan/normal/storage/collateralV2/selector";
import { FC, useEffect, useState } from "react";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import {
  IDepartmentInfo,
} from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, {
  ObjectListMenuItem,
  ObjectListOption,
} from "views/components/layout/ObjectList";
import SelectTypeApartment from "views/components/widgets/SelectTypeApartment";
import { SxOnjectListLandAssets, SxSelectDisiable } from "../../../style";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector'
export interface DepartmentInfoProps {
  uuIdSubType?: string;
  uuIdData?: string;
}

const DepartmentInfo: FC<DepartmentInfoProps> = (props) => {

  const { uuIdSubType = "", uuIdData = "" } = props;
  const dispatch = useDispatch();
  const notify= useNotify();
  const ruleDisabled = useSelector(getRuleDisbled)
  const getMessage = useNormalCollateralMessage();

  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActive(uuIdData, uuIdSubType)
  );

  const dataDepartment = useSelector(
    getLOANormalStoreLegalDepartmentInfo(uuIdData, uuIdSubType)
  );

  const departmentInfoUuidActive = useSelector(getLOANormalStoreLegalDepartmentInfoUuid(uuIdData, uuIdSubType))

  const [ deleteIdDeInfo, setDeleteIdDeInfo ] = useState<IDepartmentInfo | null>(null);
  const [ disabledInputDepartmentInfo, setDisabledInputDepartmentInfo ] = useState<boolean>(false);
  const itemActive = useSelector(getLOANormalStoreLandLegalItemActive(uuIdData ?? '',uuIdSubType ?? ''));

  useEffect(() => {
    /**
     * Check uuid Department Cer is emty
     */
    let isCheck = departmentInfoUuidActive?.length > 0 ? false : true;
    if(disabledInputDepartmentInfo !== isCheck) {
      setDisabledInputDepartmentInfo(isCheck)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentInfoUuidActive])

  const onAdd = () => {
    dispatch(
      addCollaretalDepartmentInfo("", {
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
      })
    );
  };

  const optionsDep: ObjectListOption[] =
    dataDepartment?.department?.department_info?.map((item, i) => ({
      label: `Căn hộ chung cư ${i + 1}`,
      circle: <BsFillFileEarmarkFill />,
    })) ?? [];

  const activeDepartment = dataDepartment?.department?.department_info?.findIndex(
    (item) =>
      item.departmentInfoActiveUUID === dataDepartment.departmentInfoActiveUUID
  );

  const onChangeDep = (current: number) => {
    const currentActive = dataDepartment
      ? dataDepartment.department.department_info[current]?.departmentInfoActiveUUID ?? ""
      : "";
    dispatch(
      setOnChangeCollaretalDepartmentInfo(currentActive, {
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: dataDepartment?.departmentInfoActiveUUID ?? "",
      })
    );
  };

  const OnchangeDataDepartment = (
    value: string | number | null,
    key: keyof IDepartmentInfo
  ) => {
    dispatch(
      setOnChangeCollaretalDepartmentInfoData(value, {
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: SubTypeItemsActive ?? "",
        uuidActiveDepartment: dataDepartment?.departmentInfoActiveUUID ?? "",
        key,
      })
    );
  };

  const data = useSelector(
    getLOANormalStoreLegalDepartmentInfoData(
      uuIdData ?? "",
      uuIdSubType ?? "",
      dataDepartment?.departmentInfoActiveUUID ?? ""
    )
  );


  const onHandleClickMenuDepartmentCer = (menu: ObjectListMenuItem, position: number) => {
    let dataMenuDeInfo = dataDepartment?.department?.department_info?.find((cer, index) => index === position);
    if(menu.value === EActionMenu.DELETE){
      dataMenuDeInfo && setDeleteIdDeInfo(dataMenuDeInfo);
    }
  }

   /**
   * Action menu close modal confirm delete certifiCate
   * 
   */
  const onHandleCancelConfirmDeInfo = () => setDeleteIdDeInfo(null);


  /**
   * Action menu success delete certifiCate
   * 
   */
  const onHandleConfirmDeInfo = () =>{
    let uuidDelete = deleteIdDeInfo?.departmentInfoActiveUUID ?? "";
    if (!uuidDelete){
      notify('Không thể xóa, có lỗi xảy ra', 'error');
    }
    else{
      dispatch(
        removeCollaretalDepartmentInfo(uuidDelete, {
          uuidActiveData: uuIdData,
          uuidActiveSubtype: uuIdSubType,
          uuidActiveitems: SubTypeItemsActive,
          price_cert_uuid: "", 
          price_cert_asset_uuid: "",
          apart_room_uuid: "",
        })
      );
      notify('Xóa căn hộ chung cư thành công', 'success');
    }
    onHandleCancelConfirmDeInfo()
  }

  return (
    <>
      <CardInside
        title="I. Thông tin căn hộ"
        sx={{
          "& legend": {
            fontSize: "16px",
          },
        }}
      >
        <Grid container spacing={3} className="pl-4 pb-4">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ObjectList
              menu={[
                {
                  value: EActionMenu.DELETE,
                  label: "Xóa",
                }
              ]}
              onAdd={onAdd}
              enableAdd={!ruleDisabled}
              enableMenu={!ruleDisabled}
              onClickMenu={onHandleClickMenuDepartmentCer}
              onChange={onChangeDep}
              labelLength="Số lượng CHCC &nbsp;"
              current={activeDepartment}
              options={optionsDep}
              sx={SxOnjectListLandAssets}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="1. Loại nhà ở"
              onDebounce={(val) => OnchangeDataDepartment(val, "house_type")}
              value={data?.house_type}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              required
              message={ getMessage('house_type', {position: itemActive?.activeUUID ?? '', active: data?.departmentInfoActiveUUID ?? ''})}
              />
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
            <SelectTypeApartment
              label="2. Loại căn hộ"
              onChange={(val) => OnchangeDataDepartment(val, "apartment_type")}
              value={data?.apartment_type}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              sx={SxSelectDisiable}
              required
              message={ getMessage('apartment_type', {position: itemActive?.activeUUID ?? '', active: data?.departmentInfoActiveUUID ?? ''})}
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="3. Loại căn hộ khác"
              onDebounce={(val) => OnchangeDataDepartment(val, "other_apartment_type")}
              value={data?.other_apartment_type}
              disabled={(data?.apartment_type === "OTHER" ? false : true) || ruleDisabled}
              required={data?.apartment_type === "OTHER" ? true : false}
              message={ getMessage('other_apartment_type', {position: itemActive?.activeUUID ?? '', active: data?.departmentInfoActiveUUID ?? ''})}
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="4. Căn hộ số"
              onDebounce={(val) => OnchangeDataDepartment(val, "apartment_number")}
              value={data?.apartment_number?.toString()}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              required
              message={ getMessage('apartment_number', {position: itemActive?.activeUUID ?? '', active: data?.departmentInfoActiveUUID ?? ''})}
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="5. Block/Tháp"
              onDebounce={(val) => OnchangeDataDepartment(val, "block")}
              value={data?.block}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              required
              message={ getMessage('block', {position: itemActive?.activeUUID ?? '', active: data?.departmentInfoActiveUUID ?? ''})}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="6. Tầng"
              onDebounce={(val) => OnchangeDataDepartment(val, "floor")}
              value={data?.floor?.toString()}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              required
              message={ getMessage('floor', {position: itemActive?.activeUUID ?? '', active: data?.departmentInfoActiveUUID ?? ''})}
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <InputDate
              label="7. Thời gian đưa vào sử dụng"
              onChange={(val) => OnchangeDataDepartment(val, "start_date")}
              value={data?.start_date}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              // required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="8. Diện tích căn hộ theo pháp lý (m2)"
              onDebounce={(val) => OnchangeDataDepartment(val, "real_area")}
              value={data?.real_area?.toString()}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              required
              type="number"
              format
              message={ getMessage('real_area_apa_info', {position: itemActive?.activeUUID ?? '', active: data?.departmentInfoActiveUUID ?? ''})}
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="9. Diện tích căn hộ theo thực tế (m2)"
              onDebounce={(val) => OnchangeDataDepartment(val, "certificate_area")}
              value={data?.certificate_area?.toString()}
              type='number'
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              required
              format
              message={ getMessage('certificate_area_apa_info', {position: itemActive?.activeUUID ?? '', active: data?.departmentInfoActiveUUID ?? '', type: 'apaInfo'})}
              />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="10. Hình thức sở hữu theo GCN"
              onDebounce={(val) => OnchangeDataDepartment(val, "usage_form")}
              value={data?.usage_form?.toString()}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              // required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="11. Thời hạn sở hữu theo GCN"
              onDebounce={(val) => OnchangeDataDepartment(val, "duration")}
              value={data?.duration}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              // required
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="12. Hạng mục được sở hữu chung ngoài căn hộ theo GCN"
              onDebounce={(val) => OnchangeDataDepartment(val, "ownership_category")}
              value={data?.ownership_category}
              disabled={disabledInputDepartmentInfo || ruleDisabled}
              // required
            />
          </Grid>
        </Grid>

        <ModalConfirm open={ deleteIdDeInfo !== null } onClose={ onHandleCancelConfirmDeInfo } onConfirm={ onHandleConfirmDeInfo }>
          <Box className="text-18 font-medium text-primary text-center">
            Bạn có chắc chắn muốn xóa căn hộ chung cư?
          </Box>
        </ModalConfirm>
      </CardInside>
    </>
  );
};

export default DepartmentInfo;
