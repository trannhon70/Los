import { FunctionComponent, useEffect } from "react";
import Input from 'views/components/base/Input';
import { Grid, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";
import { useSelector } from "react-redux";
import { getCollateralIgnore, getLOANNormalCollateralCurrentValue, getLOANNormalRealEstateType } from "features/loan/normal/storage/collateralV2/selector";
import { formatNumber } from "utils";
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { useTranslation } from "react-i18next";
import { getLOANNormalConfigMetadataConstant } from "features/loan/normal/configs/metadata/selector";
import { METADATA_CONSTANT } from "utils/constants";

export interface ITableTotalValueAssetsProps{
  onChangeValueCollateral?: (value: string | number | null, key: keyof ILOANNormalCollateralData) => void;
  collateralData?: ILOANNormalCollateralData;
}

const TableTotalValueAssets: FunctionComponent<ITableTotalValueAssetsProps> = (props) => {

  const { onChangeValueCollateral, collateralData } = props;
  const { t } = useTranslation()
  const ruleDisabled = useSelector(getRuleDisbled)
  const onChangeDataFormReport = (value: string | number | null, key: keyof ILOANNormalCollateralData) => {
    onChangeValueCollateral && onChangeValueCollateral(value, key);
  }
  const dataIgnore = useSelector(getCollateralIgnore);

  const getMessage = useNormalCollateralMessage();
  const totalValue = useSelector(getLOANNormalRealEstateType(collateralData?.uuidActiveData ?? ""));
  const CollateralCurrentValue = useSelector(getLOANNormalCollateralCurrentValue(collateralData?.uuidActiveData ?? ""))
  const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant) 

  useEffect(() => {
    if(totalValue !== CollateralCurrentValue){
      onChangeDataFormReport(totalValue, 'collateral_value')
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[totalValue])


  return (
    <TableRow>
      <TableCell sx={{ border: 'none' }} width='3%'></TableCell>
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{ border: 'none', display: "flex" }}
        width="100%"
      >
        <Typography color="#1825aa" fontWeight={500} fontSize={14}>
        Tổng giá trị tsbđ

        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6" width='77%'>
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input 
              label="1. Tổng giá trị định giá (VNĐ)"
              sx={{
                "& .Mui-disabled":{
                  color: "var(--mscb-danger)",
                  fontSize:"14px",
                  fontWeight: "500",
                  WebkitTextFillColor: "unset"
                }
              }}
              disabled
              required
              value={formatNumber(CollateralCurrentValue.toString())}
            />
          </Grid>
          <Grid item xl={3}>
            <Input 
              label="2. Tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)" 
              placeholder='Nhập tỷ lệ cho vay/Giá trị TSBĐ (LTV) (%)'
              // required
              type="number"
              format
              onDebounce={(val) => { onChangeDataFormReport(val, 'max_percentage')}}  
              value={collateralData?.max_percentage?.toString() ?? ""}
              message={t(getMessage('max_percentage',{position: collateralData?.uuidActiveData ?? ''}), { percent: metadataConstant.data[METADATA_CONSTANT.COLLATERAL_LTV_MAX]?.find(i => i.id === collateralData?.type)?.value ?? 100})}
              maxlength={100}
              disabled={ruleDisabled || dataIgnore}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default TableTotalValueAssets;