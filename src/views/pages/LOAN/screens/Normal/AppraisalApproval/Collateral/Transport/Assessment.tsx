import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
// import { useSelector } from 'react-redux';
import CollateralCheck from 'views/components/widgets/CollateralCheck';
// import {
//   getLoanNormalSubTypeItemsActive,
//   getLoanNormalSubTypeItemsData,
// } from 'features/loan/normal/storage/collateralV2/selector';
import { SxRadio } from 'views/pages/LOAN/screens/Normal/Initialize/CollateralNew/style';
import useStorageCollateral from '../useStorageCollateral';
import { ILOANNormalCollateralData, ISubtype } from 'types/models/loan/normal/storage/CollaretalV2';
export interface AssessmentTransportTypeProps {
  // uuidData?: string;
  // uuidSubtype?: string;
  collateralData?: ILOANNormalCollateralData;
  subType?: ISubtype;
}

const AssessmentTransportType: FC<AssessmentTransportTypeProps> = (props) => {

  const { collateralData , subType } = props;
  // const dataActiveItems = useSelector(getLoanNormalSubTypeItemsActive( uuidData,uuidSubtype)?? '')
  // const dataItems = useSelector(getLoanNormalSubTypeItemsData(uuidData, uuidSubtype, dataActiveItems ) ?? '');
  const {
    // getDataCollateral,
    // TotalValueTransportType,
    // SubTypeId,
    // SubTypeItems,
    // SubTypeItemsActive,
    dataItems,
    // dataLegalDocs
  } = useStorageCollateral("ALL",
    collateralData?.uuidActiveData ?? "",
    subType?.uuidActiveSubtype ?? "");
  
  return (
    <Grid container spacing={3}>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography
          variant="h6"
          gutterBottom
          className="text-19 text-secondary"
          sx={{ fontWeight: 'bold' }}
        >
          A. THÔNG TIN ĐỊNH GIÁ VÀ THẨM ĐỊNH TÀI SẢN
        </Typography>
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Grid container spacing={2} >
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="1. Tỷ lệ cho vay tối đa theo quy định"
              placeholder="Nhập tỷ lệ cho vay tối đa theo quy định"
              required
              value={dataItems?.ratio?.toString() ?? ""}
              type="number"
              format
              disabled={ true }
            />
          </Grid>

          <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
            <CollateralCheck
              label="2. TS hiện đang đảm bảo cho nghĩa vụ CTD"
              required
              sx={SxRadio}
              value={dataItems?.credit_extension_secured ?? ""}
              disabled={ true }
            />
          </Grid>

          <Grid item xl={5} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="3. Giá trị PTVT (VNĐ)"
              placeholder='Nhập giá trị PTVT (VNĐ)'
              required
              value={dataItems?.value?.toString() ?? ""}
              format
              type='number'
              disabled={ true }
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextArea
              label="4. Thông tin nghĩa vụ đang đảm bảo"
              placeholder='Nhập thông tin nghĩa vụ'
              required
              value={dataItems?.info_collatetal ?? ""}
              disabled={ true }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AssessmentTransportType;