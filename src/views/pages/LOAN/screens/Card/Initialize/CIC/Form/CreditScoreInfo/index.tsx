import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FC } from 'react';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import CardInside from 'views/components/layout/CardInside';
import clsx from 'clsx';
import PersonIcon from '@mui/icons-material/Person';
import creditScoreInfoStyles from './style';
import TableSticky from 'views/components/layout/TableSticky';
import Checkbox from 'views/components/base/Checkbox';


interface CreditScoreInfoProps {
  titleCard: string;
  disabled?: boolean;
}
const CreditScoreInfo: FC<CreditScoreInfoProps> = props => {

  const { titleCard, disabled = false } = props
  const classes = creditScoreInfoStyles();
  const THeader = () => {
    return (
      <TableRow>
        <TableCell width="220px" align="center">THÔNG TIN</TableCell>
        <TableCell align="center" colSpan={2}>XẤU</TableCell>
        <TableCell align="center" colSpan={2}>DƯỚI TRUNG BÌNH</TableCell>
        <TableCell align="center" colSpan={2}>TRUNG BÌNH</TableCell>
        <TableCell align="center" colSpan={2}>TỐT</TableCell>
        <TableCell align="center" colSpan={2}>RẤT TỐT</TableCell>
      </TableRow>
    )
  }


  return <div>
    <CardInside title={titleCard} className={clsx(classes.root)} >
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12}>
          <Grid container columnSpacing="20" rowSpacing="20">
            <Grid item xl={ !disabled ? 3 : 4} md={12} xs={12}>
              <Grid container columnSpacing="20" rowSpacing="20" >
                <Grid item xl={6} md={6} xs={6} className={classes.inputLabel}>
                  <Input disabled={disabled} label="1. Điểm" />
                </Grid>
                <Grid item xl={6} md={6} xs={6} className={classes.inputLabel} >
                  <Input disabled={disabled} label="2. Hạng" />
                </Grid>
                <Grid item xl={12} md={6} xs={6} className={classes.inputLabel}>
                  <InputDate disabled={disabled} label="3. Ngày chấm điểm" />
                </Grid>
                <Grid item xl={12} md={6} xs={6} className={classes.inputLabel}>
                  <Input disabled={disabled} label="4. Đánh giá điểm tín dụng (%)" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={!disabled ? 9 : 8}>
              <Grid container className="type_customer" >
                <Typography className="text-14 font-medium w-full">5. Phân loại khách hàng</Typography>
                <Checkbox
                  required
                  className="checkbox_type_customer w-full"
                  options={[
                    { value: 'S01', label: 'S01 - Khách hàng không có nợ quá hạn trong 12 tháng gần nhất' },
                    { value: 'S02', label: 'S02 - Khách hàng không có thông tin quan hệ tín dụng trong 24 tháng gần nhất' },
                    { value: 'S03', label: 'S03 - Khách hàng có lịch sử nợ quá hạn trong 12 tháng gần nhất' },
                    { value: 'S04', label: 'S04 - Khách hàng hiện đang có nợ xấu' },
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12} >
          <Typography className="text-14 font-medium">6. Chi tiết điểm và hạng </Typography>
          <TableContainer className="mt-2">
            <TableSticky
              className="mscb-table mscb-table-border-score"
            >
              <TableHead >
                <THeader />
              </TableHead>
              <TableBody >
                <TableRow>
                  <TableCell align="left"> Hạng</TableCell>
                  <TableCell className="font-bold" align="center">10</TableCell>
                  <TableCell className="font-bold" align="center">09</TableCell>
                  <TableCell className="active font font-bold" align="center">08</TableCell>
                  <TableCell className="font-bold" align="center">07</TableCell>
                  <TableCell className="font-bold" align="center">06</TableCell>
                  <TableCell className="font-bold" align="center">05</TableCell>
                  <TableCell className="font-bold" align="center">04</TableCell>
                  <TableCell className="font-bold" align="center">03</TableCell>
                  <TableCell className="font-bold" align="center">02</TableCell>
                  <TableCell className="font-bold" align="center">01</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Điểm</TableCell>
                  <TableCell align="center">403 - 429</TableCell>
                  <TableCell align="center">430 - 454</TableCell>
                  <TableCell className="active" align="center">455 - 479</TableCell>
                  <TableCell align="center">480 - 544</TableCell>
                  <TableCell align="center">545 - 571</TableCell>
                  <TableCell align="center">572 - 587</TableCell>
                  <TableCell align="center">588 - 605</TableCell>
                  <TableCell align="center">606 - 621</TableCell>
                  <TableCell align="center">622 - 644</TableCell>
                  <TableCell align="center">645 - 706</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"> Khách hàng</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell className="active" align="center"><PersonIcon className="customer_icon" /></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>

              </TableBody>
            </TableSticky>
          </TableContainer >
        </Grid>
      </Grid>

    </CardInside>
  </div>
}

export default CreditScoreInfo;