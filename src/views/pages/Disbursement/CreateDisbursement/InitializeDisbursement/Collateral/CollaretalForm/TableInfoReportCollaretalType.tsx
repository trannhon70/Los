import { FC } from 'react';
import Input from 'views/components/base/Input';
import { Grid, Typography } from '@mui/material';
import InputDate from 'views/components/base/InputDate';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SelectAppraisalUnitType from 'views/components/widgets/SelectAppraisalUnitType';
import SelectIndenpendentValuation from 'views/components/widgets/SelectIndenpendentValuation';
import SelectAppraisalPurpose from 'views/components/widgets/SelectAppraisalPurpose';
import SelectPriceAppraisal from 'views/components/widgets/SelectPriceAppraisal';


const TableInfoReportCollaretalType: FC = () => {

  const disableUnit_BRANCH = false
  const disableAPPRAISAL_CENTER = true;
  const disableAPPRAISAL_VALUATION = false;


  return (
    <TableRow>
      <TableCell
        className="text-upper text-primary font-medium pt-6"
        sx={{ border: 'none', display: "flex" }}
        width="230px"
      >
        <Typography color="#1825aa" fontWeight={500}>
          THÔNG TIN BÁO CÁO CHỨNG THƯ THẨM ĐỊNH GIÁ
        </Typography>
      </TableCell>
      <TableCell className="px-0 py-6">
        <Grid container spacing={3}>
          <Grid item xl={3}>
            <Input
              label="1. Mã báo cáo/Chứng thư thẩm định giá"
              required
            />
          </Grid>
          <Grid item xl={3}>
            <InputDate
              label="2. Thời điểm báo cáo/Chứng thư TĐ giá"
              required
            />
          </Grid>
          <Grid item xl={3}>
            <SelectAppraisalUnitType
              label="3. Đơn vị thực hiện thẩm định giá"
              required
            />
          </Grid>
          <Grid item xl={3}>
            <Input
              label="4. ĐVKD thẩm định giá"
              disabled={disableUnit_BRANCH}
              required
            />
          </Grid>
          <Grid item xl={3}>
            <SelectPriceAppraisal
              label="5. TT.TĐTS thực hiện thẩm định giá"
              required
              disabled={disableAPPRAISAL_CENTER}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="6. Ý kiến tái thẩm định, tái định giá của TT.TĐTS"
              disabled={disableAPPRAISAL_CENTER}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectIndenpendentValuation
              label="7. Tổ chức định giá độc lập"
              required
              disabled={disableAPPRAISAL_VALUATION}
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="8. Tổ chức định giá độc lập khác"
              required
              disabled={disableAPPRAISAL_VALUATION}
            />
          </Grid>
          <Grid item xl={3}>
            <SelectAppraisalPurpose
              label="9. Mục đích định giá"
              required
            />
          </Grid>
          <Grid item xl={9}>
            <Input
              label="10. Mục đích định giá khác"
              required
              disabled={false}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow >
  )
}

export default TableInfoReportCollaretalType;

