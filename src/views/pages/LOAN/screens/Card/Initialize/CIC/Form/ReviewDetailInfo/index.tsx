import { FC, Fragment } from "react";

import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { intToRoman, numberToCurrency } from "utils";
import ReviewDetailInfoStyles from "./style";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";

export interface ModalReviewDetailInfoCICProps {
  open: boolean;
  onClose?: () => void;
}
const ReviewDetailsInfo: FC<ModalReviewDetailInfoCICProps> = (props) => {
  const classes = ReviewDetailInfoStyles();

  const { open, onClose } = props;

  const handleClose = () => {
    onClose && onClose()
  };

  const THeader = () => {
    return (
      <TableRow>
        <TableCell sx={{ width: "4%" }} align="center">STT</TableCell>
        <TableCell sx={{ width: "15%" }} align="center">TÊN TỔ CHỨC TÍN DỤNG</TableCell>
        <TableCell sx={{ width: "14%" }} align="center">THỜI HẠN VAY <span className="text-lowercase fw-normal">(tháng)</span></TableCell>
        <TableCell sx={{ width: "16%" }} align="center">SỐ TIỀN CẤP TÍN DỤNG <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "16%" }} align="center">SỐ DƯ THỰC TẾ QUY ĐỔI <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "11%" }} align="center">GIÁ TRỊ TSBĐ <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "24%" }} align="center">NGÀY TRA CIC</TableCell>
      </TableRow>
    )
  }


  const renderTitleHeader = (price: string, lastUpdatedDate: number, type?: string) => {
    return <TableRow>
      <TableCell align="center" component="th" scope="row">
        {!type ? intToRoman(1) : intToRoman(2)}
      </TableCell>
      <TableCell align="left" component="th" scope="row">
        {!type ? 'Vay thông thường' : 'Thẻ tín dụng'}
      </TableCell>
      <TableCell colSpan={3} align="left" scope="row"></TableCell>
      <TableCell align="right" className="danger" scope="row">
        {price}
      </TableCell>
      <TableCell align="left" scope="row">
        <Grid container className="dept-group">
          <Grid item xs={7}>
            <p className="text-danger">Ngày cập nhật CIC mới nhất</p>
          </Grid>
          <Grid item xs={5}>
            {(() => {
              if (lastUpdatedDate === 0) {
                return <Input disabled value='-' />
              } else {
                return <InputDate disabled value={lastUpdatedDate} />
              }
            })()}
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  }

  const renderBankInfoRow = (index: number, bankName: string, price: string) => {
    return <TableRow>
      <TableCell align="center" scope="row">{index}</TableCell>
      <TableCell colSpan={4} align="left" scope="row">
        <div className="bank-info">
          <Avatar
            className="image"
            src=""
          />
          <p className="name">{bankName}</p>
        </div>
      </TableCell>
      <TableCell align="right" className="text-danger" scope="row">{price}</TableCell>
      <TableCell align="left" scope="row"></TableCell>
    </TableRow>
  }

  const renderCreditLoanInfo = () => {
    return <Fragment >
      {renderBankInfoRow(1, 'Ngân hàng HSBC', '300.000.000')}
      <TableRow>
        <TableCell align="center" scope="row">1.1</TableCell>
        <TableCell align="left" scope="row">Ngắn hạn</TableCell>
        <TableCell align="left" scope="row">12</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(10000)}</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(50000)}</TableCell>
        <TableCell align="left" scope="row"></TableCell>
        <TableCell align="left" scope="row"></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" scope="row">1.2</TableCell>
        <TableCell align="left" scope="row">Trung hạn</TableCell>
        <TableCell align="left" scope="row">24</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(900000)}</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(10920)}</TableCell>
        <TableCell align="left" scope="row"></TableCell>
        <TableCell align="left" scope="row"></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" scope="row">1.3</TableCell>
        <TableCell align="left" scope="row">Dài hạn</TableCell>
        <TableCell align="left" scope="row">96</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(150000)}</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(15500)}</TableCell>
        <TableCell align="left" scope="row"></TableCell>
        <TableCell align="left" scope="row"></TableCell>
      </TableRow>
    </Fragment>
  }
  const renderBody = () => {
    return <>
      {renderTitleHeader('100000000000', 812327918)}
      {renderCreditLoanInfo()}
      {renderTitleHeader('2.390.000.000', 2321887, 'Card')}
      {renderCreditCardInfo()}
    </>
  }

  const renderCreditCardInfo = () => {
    return <Fragment>
      {renderBankInfoRow(1, 'Ngân hàng HSBC', numberToCurrency(30000))}
      <TableRow>
        <TableCell align="center" scope="row">1.1</TableCell>
        <TableCell align="left" colSpan={2} scope="row">Ngân hàng HSBC</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(120000)}</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(4000)}</TableCell>
        <TableCell align="left" scope="row"></TableCell>
        <TableCell align="left" scope="row"></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" scope="row">1.2</TableCell>
        <TableCell align="left" colSpan={2} scope="row">Ngân hàng ACB</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(19450000)}</TableCell>
        <TableCell align="right" scope="row">{numberToCurrency(400230)}</TableCell>
        <TableCell align="left" scope="row"></TableCell>
        <TableCell align="left" scope="row"></TableCell>
      </TableRow>
    </Fragment>

  }


  return <Dialog open={open} onClose={handleClose} maxWidth={"lg"} fullWidth={true}>

    <DialogTitle className={classes.title} style={{ color: 'var(--mscb-primary)' }}>
      THÔNG TIN CHI TIẾT CIC
      <IconButton
          className={classes.iconClose}
          aria-label="close"
          onClick={handleClose}
          style={{ color: "#eb0029" }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <i className="fas fa-times"></i>
        </IconButton>
    </DialogTitle>
    <DialogContent>
    <Grid container columnSpacing="20px" rowSpacing="20px">
      <Grid item xl={3} md={3} xs={3} className={classes.inputLabel}>
      <Input
          label="1. Chủ thẻ chính"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3} className={classes.inputLabel}>
      <Input className="currency-amount"
          label="2. Tổng dư nợ (VND)"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3} className={classes.inputLabel}>
      <Input className="currency-amount"
          label="3. Tổng giá trị TSBĐ (VND)"
        />
      </Grid>
      <Grid item xl={3} md={3} xs={3}className={classes.inputLabel}>
      <Input
          label="4. Nhóm nợ cao nhất"
        />
      </Grid>

    </Grid>

      <Fragment >
        <div className={classes.root}>
          <p className="title">
            A. THÔNG TIN CIC- CMND - 024723847
          </p>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead className="table__header">
                <THeader />
              </TableHead>
              <TableBody className="table__body">
                {renderBody()}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Fragment>
    </DialogContent>
  </Dialog>
}
export default ReviewDetailsInfo;