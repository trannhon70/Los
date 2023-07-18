import { Grid } from "@mui/material";
import {
  setOnChangeCollaretalDepartmentInfoApproval,
} from "features/loan/normal/storageApproval/collateral/actions";
import { FC } from "react";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import ObjectList, {
  ObjectListOption,
} from "views/components/layout/ObjectList";
import SelectTypeApartment from "views/components/widgets/SelectTypeApartment";
import { SxOnjectListLandAssets, SxSelectDisiable } from "views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style";
import {
  getLOANormalStoreLegalDepartmentInfoApproval,
  getLOANormalStoreLegalDepartmentInfoDataApproval,
} from "features/loan/normal/storageApproval/collateral/selector";
export interface DepartmentInfoProps {
  uuIdSubType?: string;
  uuIdData?: string;
}

const DepartmentInfo: FC<DepartmentInfoProps> = (props) => {

  const { uuIdSubType = "", uuIdData = "" } = props;
  const dispatch = useDispatch();

  const dataDepartment = useSelector(
    getLOANormalStoreLegalDepartmentInfoApproval(uuIdData, uuIdSubType)
  );

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
      setOnChangeCollaretalDepartmentInfoApproval(currentActive, {
        uuidActiveData: uuIdData ?? "",
        uuidActiveSubtype: uuIdSubType ?? "",
        uuidActiveitems: dataDepartment?.departmentInfoActiveUUID ?? "",
      })
    );
  };

  const data = useSelector(
    getLOANormalStoreLegalDepartmentInfoDataApproval(
      uuIdData ?? "",
      uuIdSubType ?? "",
      dataDepartment?.departmentInfoActiveUUID ?? ""
    )
  );

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
              enableAdd={false}
              enableMenu={false}
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
              value={data?.house_type}
              disabled
              required
            />
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
            <SelectTypeApartment
              label="2. Loại căn hộ"
              value={data?.apartment_type}
              disabled
              sx={SxSelectDisiable}
              required
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="3. Loại căn hộ khác"
              value={data?.other_apartment_type}
              disabled
              required={data?.apartment_type === "OTHER" ? true : false}
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="4. Căn hộ số"
              value={data?.apartment_number?.toString()}
              disabled
              required
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="5. Block/Tháp"
              value={data?.block}
              disabled
              required
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="6. Tầng"
              value={data?.floor?.toString()}
              disabled
              required
              />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <InputDate
              label="7. Thời gian đưa vào sử dụng"
              value={data?.start_date}
              disabled
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="8. Diện tích căn hộ theo pháp lý (m2)"
              // value={data?.real_area?.toString()}
              value={data?.certificate_area?.toString()}
              disabled
              required
              type="number"
              format
            />
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="9. Diện tích căn hộ theo thực tế (m2)"
              // value={data?.certificate_area?.toString()}
              value={data?.real_area?.toString()}
              type='number'
              disabled
              required
              format
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="10. Hình thức sở hữu theo GCN"
              value={data?.usage_form?.toString()}
              disabled
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="11. Thời hạn sở hữu theo GCN"
              value={data?.duration}
              disabled
            />
          </Grid>
          <Grid item xl={6} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="12. Hạng mục được sở hữu chung ngoài căn hộ theo GCN"
              value={data?.ownership_category}
              disabled
            />
          </Grid>
        </Grid>
      </CardInside>
    </>
  );
};

export default DepartmentInfo;
