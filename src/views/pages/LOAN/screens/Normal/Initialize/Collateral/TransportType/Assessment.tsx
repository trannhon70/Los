import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import CollateralCheck from 'views/components/widgets/CollateralCheck';
import {
  setCollaretalRPRO,
} from 'features/loan/normal/storage/collateralV2/actions';
import {
  ISubItems,
} from 'types/models/loan/normal/storage/CollaretalV2';
import {
  getLoanNormalSubTypeItemsActive,
  getLoanNormalSubTypeItemsData,
} from 'features/loan/normal/storage/collateralV2/selector';
import { SxRadio } from '../style';
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface AssessmentTransportTypeProps {
  uuidData?: string;
  uuidSubtype?: string;
}

const AssessmentTransportType: FC<AssessmentTransportTypeProps> = (props) => {

  const { uuidData = "", uuidSubtype = "" } = props;
  const dispatch = useDispatch();
  const getMessage = useNormalCollateralMessage();
  const dataActiveItems = useSelector(getLoanNormalSubTypeItemsActive(uuidData, uuidSubtype))
  const dataItems = useSelector(getLoanNormalSubTypeItemsData(uuidData, uuidSubtype, dataActiveItems ?? ''));
  const ruleDisabled = useSelector(getRuleDisbled)

  const onChangeDataDetails = (value: string | number | null, key: keyof ISubItems) => {
    dispatch(setCollaretalRPRO(value, { uuid: uuidData, uuidActive: uuidSubtype, key }))
  }



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
              onDebounce={(value) => onChangeDataDetails(value, 'ratio')}
              value={dataItems?.ratio?.toString() ?? ""}
              type="number"
              format
              message={getMessage('ratio',{position:dataItems?.activeUUID?? '' })}
              disabled={ ruleDisabled }
            />
          </Grid>

          <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
            <CollateralCheck
              label="2. TS hiện đang đảm bảo cho nghĩa vụ CTD"
              required
              onChange={(value) => onChangeDataDetails(value, 'credit_extension_secured')}
              sx={SxRadio}
              value={dataItems?.credit_extension_secured ?? ""}
              disabled={ ruleDisabled }
            />
          </Grid>

          <Grid item xl={5} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="3. Giá trị PTVT (VNĐ)"
              placeholder='Nhập giá trị PTVT (VNĐ)'
              required
              onDebounce={(value) => onChangeDataDetails(value, 'value')}
              value={dataItems?.value?.toString() ?? ""}
              format
              type='number'
              message={getMessage('value_ptvt',{position:dataItems?.activeUUID ?? '' })}
              disabled={ ruleDisabled }
            />
          </Grid>

      
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextArea
              label="4. Thông tin nghĩa vụ đang đảm bảo"
              placeholder='Nhập thông tin nghĩa vụ đang đảm bảo'
              required
              onDebounce={(value) => onChangeDataDetails(value, 'info_collatetal')}
              value={dataItems?.info_collatetal ?? ""}
              message={getMessage('info_collatetal',{position:dataItems?.activeUUID?? '' })}
              disabled={ ruleDisabled }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AssessmentTransportType;