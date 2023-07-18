import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";
import { Grid, TableCell, TableRow, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import {
  ILOANNormalCollateralData,
  IValueOnChangeCollateral,
} from "types/models/loan/normal/storage/CollaretalV2";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import SelectAppraisalPurpose from "views/components/widgets/SelectAppraisalPurpose";
import SelectAppraisalUnitType from "views/components/widgets/SelectAppraisalUnitType";
import SelectIndenpendentValuation from "views/components/widgets/SelectIndenpendentValuation";
import SelectPriceAppraisal from "views/components/widgets/SelectPriceAppraisal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthUserBranch,
  getCollateralIgnore,
  ValidateCollateralRestStorage,
  ValidateCollateralStorage,
} from "features/loan/normal/storage/collateralV2/selector";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { SxSelectDisabled } from "../../screens/Normal/AppraisalApproval/Income/IncomeForm/style";
import ButtonAttachFile from "views/components/base/ButtonAttachFile";
import AttachmentModalCollaretalType from "./AttachmentModalCollaretalType";
import { PREFIX_LOCAL } from "utils";
import useNotify from "app/hooks/useNotify";
import { setCollateralValidate } from "features/loan/normal/storage/collateralV2/actions";
export interface ITableInfoReportCollaretalTypeProps {
  collateralData?: ILOANNormalCollateralData;
  onChangeValueCollateral?: (
    value: IValueOnChangeCollateral,
    key: keyof ILOANNormalCollateralData
  ) => void;
}

const TableInfoReportCollaretalType: FC<ITableInfoReportCollaretalTypeProps> = (
  props
) => {
  const { onChangeValueCollateral, collateralData } = props;
  const ruleDisabled = useSelector(getRuleDisbled);
  const notify = useNotify();
  const [openAttachModal, setOpenAttachModal] = useState<boolean>(false);
  const valid = useSelector(ValidateCollateralStorage);
  const validRest = useSelector(ValidateCollateralRestStorage);
  const dispatch = useDispatch()
  const onChangeDataFormReport = (
    value: IValueOnChangeCollateral,
    key: keyof ILOANNormalCollateralData
  ) => {
    onChangeValueCollateral && onChangeValueCollateral(value, key);
  };
  const branch = useSelector(getAuthUserBranch);
  const dataIgnore = useSelector(getCollateralIgnore);
  const disableUnit_BRANCH =
    collateralData?.valuation_unit_type !== "APPRAISAL_BRANCH";
  const disableAPPRAISAL_CENTER =
    collateralData?.valuation_unit_type !== "APPRAISAL_CENTER";
  const disableAPPRAISAL_VALUATION =
    collateralData?.valuation_unit_type !== "APPRAISAL_VALUATION";
  const getMessage = useNormalCollateralMessage();
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

  const handleAttach = () => {
    if((collateralData?.type === "REST" && validRest.valid) || (collateralData?.type !== "REST" && valid?.valid)){
      dispatch(setCollateralValidate({valid : true}))
      if(!collateralData?.isSaved) {
        notify('Vui lòng khởi tạo tài sản bảo đảm','warning');
        return;
      }
      setOpenAttachModal(true);
    }
    else{
      if(collateralData?.type === "REST" && !validRest.valid){
        dispatch(setCollateralValidate(validRest))
        notify(validRest.message ? validRest.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "warning")
      }
      else if(valid && collateralData?.type !== "REST" && !valid?.valid){
        dispatch(setCollateralValidate(valid))
        notify(valid.message ? valid.message : "Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "warning")
      }
    }
  }

  return (
    <>
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
          <Typography color="#1825aa" fontWeight={500} fontSize={14} mb={1}>
            THÔNG TIN BÁO CÁO/CHỨNG THƯ THẨM ĐỊNH GIÁ
          </Typography>
          <ButtonAttachFile
            onClick={handleAttach}
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
                onDebounce={(val) => {
                  onChangeDataFormReport(val, "valuation_id");
                }}
                value={collateralData?.valuation_id ?? ""}
                disabled={ruleDisabled || dataIgnore}
                message={getMessage("valuation_id", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
            <Grid item xl={3}>
              <InputDate
                label="2. Thời điểm báo cáo/Chứng thư TĐ giá"
                required
                disabled={ruleDisabled || dataIgnore}
                onChange={(val) => {
                  onChangeDataFormReport(val, "valuation_date");
                }}
                value={collateralData?.valuation_date ?? 0}
                message={getMessage("valuation_date", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
            <Grid item xl={3}>
              <SelectAppraisalUnitType
                label="3. Đơn vị thực hiện thẩm định giá"
                placeholder="Chọn đơn vị thực hiện thẩm định giá"
                required
                disabled={ruleDisabled || dataIgnore}
                onChange={(val) => {
                  onChangeDataFormReport(val, "valuation_unit_type");
                  collateralData?.valuation_unit &&
                    onChangeDataFormReport(null, "valuation_unit");
                  collateralData?.valuation_center &&
                    onChangeDataFormReport(null, "valuation_center");
                  collateralData?.valuation_center_opinion &&
                    onChangeDataFormReport(null, "valuation_center_opinion");
                  collateralData?.independence_organization &&
                    onChangeDataFormReport(null, "independence_organization");
                  collateralData?.other_independence_organization &&
                    onChangeDataFormReport(
                      null,
                      "other_independence_organization"
                    );
                  if (val === "APPRAISAL_BRANCH") {
                    onChangeDataFormReport(
                      `${branch?.branch_code} - ${branch?.branch_name}` ?? "",
                      "valuation_unit"
                    );
                  }
                }}
                sx={SxSelectDisabled}
                value={collateralData?.valuation_unit_type}
                message={getMessage("valuation_unit_type", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
            <Grid item xl={3}>
              <Input
                label="4. ĐVKD thẩm định giá"
                placeholder="Nhập ĐVKD thẩm định giá"
                disabled={true}
                required={disableUnit_BRANCH ? false : true}
                onDebounce={(val) => {
                  onChangeDataFormReport(val, "valuation_unit");
                }}
                value={collateralData?.valuation_unit ?? ""}
                message={getMessage("valuation_unit", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
            <Grid item xl={3}>
              <SelectPriceAppraisal
                label="5. TT.TĐTS thực hiện thẩm định giá"
                placeholder="Chọn TT.TĐTS thực hiện thẩm định giá"
                required={disableAPPRAISAL_CENTER ? false : true}
                disabled={disableAPPRAISAL_CENTER || ruleDisabled || dataIgnore}
                onChange={(val) => {
                  onChangeDataFormReport(val, "valuation_center");
                }}
                value={collateralData?.valuation_center ?? ""}
                message={getMessage("valuation_center", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
            <Grid item xl={9}>
              <Input
                label="6. Ý kiến tái thẩm định, tái định giá của TT.TĐTS"
                placeholder="Nhập thông tin ý kiến tái thẩm định, tái định giá của TT. TĐTS"
                disabled={disableAPPRAISAL_CENTER || ruleDisabled || dataIgnore}
                onDebounce={(val) => {
                  onChangeDataFormReport(val, "valuation_center_opinion");
                }}
                value={collateralData?.valuation_center_opinion ?? ""}
                message={getMessage("valuation_center_opinion", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
            <Grid item xl={3}>
              <SelectIndenpendentValuation
                label="7. Tổ chức định giá độc lập"
                placeholder="Chọn tổ chức định giá độc lập"
                required={disableAPPRAISAL_VALUATION ? false : true}
                disabled={
                  disableAPPRAISAL_VALUATION || ruleDisabled || dataIgnore
                }
                onChange={(val) => {
                  onChangeDataFormReport(val, "independence_organization");
                  if (val !== "13") {
                    onChangeDataFormReport(
                      null,
                      "other_independence_organization"
                    );
                  }
                }}
                value={collateralData?.independence_organization ?? ""}
                message={getMessage("independence_organization", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
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
                disabled={
                  (collateralData?.independence_organization === "13"
                    ? false
                    : true) ||
                  ruleDisabled ||
                  dataIgnore
                }
                onDebounce={(val) => {
                  onChangeDataFormReport(
                    val,
                    "other_independence_organization"
                  );
                }}
                value={collateralData?.other_independence_organization ?? ""}
                message={getMessage("other_independence_organization", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
            <Grid item xl={3}>
              <SelectAppraisalPurpose
                label="9. Mục đích định giá"
                sx={SxSelectDisabled}
                required
                disabled={ruleDisabled || dataIgnore}
                onChange={(val) => {
                  onChangeDataFormReport(val, "purpose");
                  if (val !== "OTHER") {
                    onChangeDataFormReport(null, "other_purpose");
                  }
                }}
                value={collateralData?.purpose}
                message={getMessage("purpose", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
            <Grid item xl={9}>
              <Input
                label="10. Mục đích định giá khác"
                placeholder="Nhập thông tin mục đích định giá khác"
                required={collateralData?.purpose !== "OTHER" ? false : true}
                disabled={
                  collateralData?.purpose !== "OTHER" ||
                  ruleDisabled ||
                  dataIgnore
                }
                onDebounce={(val) => {
                  onChangeDataFormReport(val, "other_purpose");
                }}
                value={collateralData?.other_purpose ?? ""}
                message={getMessage("other_purpose", {
                  position: collateralData?.uuidActiveData ?? "",
                })}
              />
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      {openAttachModal && (
        <AttachmentModalCollaretalType
          open={openAttachModal}
          onClose={() => setOpenAttachModal(false)}
          data={collateralData?.documents ?? []}
          onChange={(newDoc) => onChangeDataFormReport(newDoc, "documents")}
          uuidActiveData={collateralData?.uuidActiveData ?? ''}
          collaretalType ={collateralData?.type}
        />
      )}
    </>
  );
};

export default TableInfoReportCollaretalType;
