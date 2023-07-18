import { Grid, TableCell, TableRow, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { ILOANNormalCollateralData} from "types/models/loan/normal/storage/CollaretalV2";
import { PREFIX_LOCAL } from "utils";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import SelectAppraisalPurpose from "views/components/widgets/SelectAppraisalPurpose";
import SelectAppraisalUnitType from "views/components/widgets/SelectAppraisalUnitType";
import SelectIndenpendentValuation from "views/components/widgets/SelectIndenpendentValuation";
import SelectPriceAppraisal from "views/components/widgets/SelectPriceAppraisal";
import ButtonAttachmentModalCollateral from "./ButtonAttachmentModalCollateral";

export interface ITableInfoReportCollaretalTypeProps {
  collateralData?: ILOANNormalCollateralData;
  onChangeValueCollateral?: (
    value: string | number | null,
    key: keyof ILOANNormalCollateralData
  ) => void;
}

const TableInfoReportCollaretalType: FC<ITableInfoReportCollaretalTypeProps> = (
  props
) => {
  const {collateralData } = props;

  const countAttachFile = useMemo(()=>{
    if(!collateralData?.documents) return 0;
    let count = 0;
    collateralData?.documents?.forEach(doc=>{
      if(doc.child_files?.length === 0) return;
      doc.child_files?.forEach(file=>{
        if(file.uuid?.includes(PREFIX_LOCAL)) return;
        count++;
      })
    });
    return count;
  },[collateralData?.documents])

  return (
    <TableRow>
      <TableCell sx={{ border: "none" }} width="3%"></TableCell>
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{
          border: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        width="100%"
      >
        <Typography color="#1825aa" fontWeight={500} fontSize={14}>
          THÔNG TIN BÁO CÁO/CHỨNG THƯ THẨM ĐỊNH GIÁ
        </Typography>
        <ButtonAttachmentModalCollateral
          data={collateralData?.documents ?? []}
          attachment={countAttachFile}
        />
      </TableCell>
      <TableCell className="px-0 py-6" width="77%">
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input
              label="1. Mã báo cáo/Chứng thư thẩm định giá"
              placeholder="Nhập mã báo cáo/Chứng thư thẩm định giá"
              required
              value={collateralData?.valuation_id ?? ""}
              disabled={true}
            />
          </Grid>
          <Grid item xl={3}>
            <InputDate
              label="2. Thời điểm báo cáo/Chứng thư TĐ giá"
              required
              disabled={true}
              value={collateralData?.valuation_date ?? 0}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectAppraisalUnitType
              label="3. Đơn vị thực hiện thẩm định giá"
              placeholder="Chọn đơn vị thực hiện thẩm định giá"
              required
              disabled={true}
              value={collateralData?.valuation_unit_type}
            />
          </Grid>
          <Grid item xl={3}>
            <Input
              label="4. ĐVKD thẩm định giá"
              placeholder="Nhập ĐVKD thẩm định giá"
              disabled={true}
              value={collateralData?.valuation_unit ?? ""}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectPriceAppraisal
              label="5. TT.TĐTS thực hiện thẩm định giá"
              placeholder="Chọn TT.TĐTS thực hiện thẩm định giá"
              disabled={true}
              value={collateralData?.valuation_center ?? ""}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="6. Ý kiến tái thẩm định, tái định giá của TT.TĐTS"
              placeholder="Nhập thông tin ý kiến tái thẩm định, tái định giá của TT. TĐTS"
              disabled={true}
              value={collateralData?.valuation_center_opinion ?? ""}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectIndenpendentValuation
              label="7. Tổ chức định giá độc lập"
              placeholder="Chọn tổ chức địng giá độc lập"
              disabled={true}
              value={collateralData?.independence_organization ?? ""}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="8. Tổ chức định giá độc lập khác"
              placeholder="Nhập thông tin tổ chức định giá độc lập khác"
              required={
                collateralData?.independence_organization === "13"
                  ? true
                  : false
              }
              disabled={true}
              value={collateralData?.other_independence_organization ?? ""}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectAppraisalPurpose
              label="9. Mục đích định giá"
              // placeholder="Chọn mục đích định giá"
              required
              disabled={true}
              value={collateralData?.purpose}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="10. Mục đích định giá khác"
              placeholder="Nhập thông tin mục đích định giá khác"
              required={collateralData?.purpose !== "OTHER" ? false : true}
              disabled={true}
              value={collateralData?.other_purpose ?? ""}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default TableInfoReportCollaretalType;
