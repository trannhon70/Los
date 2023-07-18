import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CollateralCheck from 'views/components/widgets/CollateralCheck';
import { SxRadio } from './style';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import { 
  getLoanNormalSubTypeItemsActive, 
  getLOANormalStoreColalteralLandAssessment 
} from 'features/loan/normal/storage/collateralV2/selector';
import { setCollaretalAssessmentInfomation } from 'features/loan/normal/storage/collateralV2/actions';
import { ILandWrapper, ILandWrapperCheck } from 'types/models/loan/normal/storage/CollaretalV2';


export interface IAssessmentInfomationProps{
  uuidData?: string;
  uuidSubtype?: string;
}

const AssessmentInfomation: FunctionComponent<IAssessmentInfomationProps> = (props) => {

  const { uuidData = "", uuidSubtype = "" } = props;

  const dispatch = useDispatch();

  
  const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive( uuidData, uuidSubtype ))
  const dataItems = useSelector(getLOANormalStoreColalteralLandAssessment( uuidData, uuidSubtype, SubTypeItemsActive ?? ''));

  const onChangeSubItem = (value: string | number | null, key: keyof (ILandWrapper & ILandWrapperCheck)) => {
    dispatch(setCollaretalAssessmentInfomation(value, { uuid: uuidData, uuidActive: uuidSubtype, key }))
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
            <CollateralCheck
              label="1. TSBĐ được hình thành từ nguồn vốn CTD"
              required
              onChange={(value) => onChangeSubItem(value, 'from_credit_extension')}
              sx={SxRadio}
              value={dataItems?.from_credit_extension ?? undefined}
            />
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <CollateralCheck
              label="2. Nguồn tiền trả nợ là nguồn tiền hình thành từ việc kinh doanh, khai thác chính TSBĐ"
              required
              onChange={(value) => onChangeSubItem(value, 'is_exploited')}
              sx={SxRadio}
              value={dataItems?.is_exploited ?? ""}
            />
          </Grid>

          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <CollateralCheck
              label="3. TS hiện đang đảm bảo cho nghĩa vụ CTD"
              required
              onChange={(value) => onChangeSubItem(value, 'credit_extension_secured')}
              sx={SxRadio}
              value={dataItems?.credit_extension_secured ?? ""}
            />
          </Grid>

          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="4. Tỷ lệ diện tích BĐS không kinh doanh (%)"
              required
              type="number"
              onDebounce={(value) => onChangeSubItem(value, 'non_business_area')}
              value={dataItems?.non_business_area?.toString() ?? ""}
            />
          </Grid>

          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Input
              label="5. Tỷ lệ cho vay tối đa theo quy định (%)"
              required
              type="number"
              onDebounce={(value) => onChangeSubItem(value, 'max_percentage')}
              value={dataItems?.max_percentage ?? ""}
            />
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Input
              label="6. Giá trị QSD đất theo từng GCN (VNĐ)"
              required
              type="number"
              format
              onDebounce={(value) => onChangeSubItem(value, 'value_of_land')}
              value={dataItems?.value_of_land?.toString() ?? ""}
            />
          </Grid>

          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextArea
              label="7. Thông tin nghĩa vụ đang đảm bảo"
              required
              onDebounce={(value) => onChangeSubItem(value, 'description')}
              value={dataItems?.description ?? ""}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}


export default AssessmentInfomation;