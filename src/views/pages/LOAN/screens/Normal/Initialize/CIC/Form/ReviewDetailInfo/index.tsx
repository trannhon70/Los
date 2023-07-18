import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell, TableHead,
  TableRow
} from '@mui/material';
import useMasterData from "app/hooks/useMasterData";
import { FC, Fragment, useEffect } from "react";
import { RiBankFill } from 'react-icons/ri';
import { ILOANNormalStorageCICDeclareDataDetail, ILOANNormalStorageCICOrganData } from "types/models/loan/normal/storage/CIC";
import { formatNumber, intToAlphabet, intToRoman } from "utils";
import { timestampToDate } from "utils/date";
import Input from "views/components/base/Input";
import ReviewDetailInfoStyles from "./style";

export interface ModalReviewDetailInfoCICProps {
  open: boolean;
  onClose?: () => void;
  data: ILOANNormalStorageCICOrganData;
  declare: string;
  pos: number;
}
const ReviewDetailsInfo: FC<ModalReviewDetailInfoCICProps> = (props) => {
  const classes = ReviewDetailInfoStyles();

  const { open, onClose, data, declare, pos } = props;
  const { CifIfType, CreditInstitution, TypeTermLoan, DebtClassification, register } = useMasterData();
  
  useEffect(() => {
    register('cifIfType')
    register('creditInstitution')
    register('typeTermLoan')
    register('debtClassification')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    onClose && onClose()
  };

  const THeader = () => {
    return (
      <TableRow>
        <TableCell sx={{ width: "4%" }} align="center">STT</TableCell>
        <TableCell sx={{ width: "12%" }} align="center">TÊN TỔ CHỨC TÍN DỤNG</TableCell>
        <TableCell sx={{ width: "6%" }} align="center">THỜI HẠN VAY <span className="text-lowercase fw-normal">(tháng)</span></TableCell>
        <TableCell sx={{ width: "9%" }} align="center">SỐ TIỀN CẤP TÍN DỤNG THỰC TẾ <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "9%" }} align="center">DƯ NỢ THỰC TẾ <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "10%" }} align="center">SỐ TIỀN CẤP TÍN DỤNG THEO CIC <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "9%" }} align="center">DƯ NỢ THEO CIC <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "25%" }} align="center">GHI CHÚ </TableCell>
        <TableCell sx={{ width: "8%" }} align="center">GIÁ TRỊ TSBĐ <span className="fw-normal">(VND)</span></TableCell>
        <TableCell sx={{ width: "8%" }} align="center">NGÀY TRA CIC</TableCell>
      </TableRow>
    )
  }

  const renderTitleHeader = (price: number, lastUpdatedDate: number | null, type?: boolean, isExitNormal?: boolean) => {
    return <TableRow>
      <TableCell align="center" component="th" scope="row">
        {!type ? intToRoman(1) : (
          isExitNormal ? intToRoman(2) : intToRoman(1)
        )}
      </TableCell>
      <TableCell align="left" component="th" scope="row">
        {!type ? 'Vay thông thường' : 'Thẻ tín dụng'}
      </TableCell>
      <TableCell colSpan={6} align="left" scope="row"></TableCell>
      {
        !type ? (
          <TableCell align="right" className="danger" scope="row">
            {formatNumber(price.toString())}
          </TableCell>
        ) : (
          isExitNormal ? (
            <TableCell align="right" scope="row"></TableCell>
          ) : (
            <TableCell align="right" className="danger" scope="row">
              {formatNumber(price.toString())}
            </TableCell>
          )
        )
      }
      <TableCell align="left" scope="row">
        {/* <Grid container className='flex-center'>
          <Grid item xs={7}>
            <p className="text-danger">Ngày cập nhật CIC mới nhất</p>
          </Grid>
          <Grid item xs={5}>
            {(() => {
              if (Number(lastUpdatedDate) < 0) {
                return <Input disabled value='-' />
              } else {
                return <InputDate disabled value={lastUpdatedDate} />
              }
            })()}
          </Grid>
        </Grid> */}
      </TableCell>
    </TableRow>
  }

  const renderBankInfoRow = (index: number, bankName: string, price: number, date: number | null, type: boolean) => {
    return <TableRow>
      <TableCell align="center" scope="row">{index}</TableCell>
      <TableCell colSpan={7} align="left" scope="row">
        <div className="bank-info">
          <Avatar
            className="image"
            children={<RiBankFill/>}
          />
          <p className="name">{bankName}</p>
        </div>
      </TableCell>
      {
        !type ? <TableCell align="right" scope="row"></TableCell> : <TableCell align="right" className="text-danger" scope="row">{formatNumber(price.toString())}</TableCell>
      }
      {
        date !== null ? (
          <TableCell align="left" scope="row">
            {timestampToDate(date / 1000)}
          </TableCell>
        ) : <TableCell align="left" scope="row"></TableCell>
      }
    </TableRow>
  }

  const renderCreditLoanInfo = (data: ILOANNormalStorageCICDeclareDataDetail) => {
    return <>
      {
        data.credit?.filter(x => x.detail?.loan?.list?.length > 0)?.map((x, i) => {
          return <Fragment key={i}>
            { !!x.detail.loan.list.find(x => x.balance !== null) ?
              renderBankInfoRow(i + 1, CreditInstitution?.find(c => c.code === x.code)?.name ?? "",
                x.detail.collateral.list?.map(x => x.value ?? 0)?.reduce((a, b) => Number(a) + Number(b), 0) ?? 0,
                x.detail.loan.date ?? null,
                true) : null
            }
            {
              x.detail.loan?.list?.filter(e => e.balance !== null)?.map((l, pos) => {
                return <TableRow key={l.uuid}>
                  <TableCell align="center" scope="row">{(i + 1) + "." + (pos + 1)}</TableCell>
                  <TableCell align="left" scope="row">{TypeTermLoan?.find(t => t.code === l.code)?.name ?? ''}</TableCell>
                  <TableCell align="left" scope="row">{l.expired}</TableCell>
                  <TableCell align="right" scope="row">{formatNumber(l.amount?.toString() ?? '')}</TableCell>
                  <TableCell align="right" scope="row">{formatNumber(l.balance?.toString() ?? '')}</TableCell>
                  <TableCell align="right" scope="row">{formatNumber(l.amountCIC?.toString() ?? '')}</TableCell>
                  <TableCell align="right" scope="row">{formatNumber(l.balanceCIC?.toString() ?? '')}</TableCell>
                  <TableCell align="left" scope="row">{l.note ?? ''}</TableCell>
                  <TableCell align="left" scope="row"/>
                  <TableCell align="left" scope="row"/>
                </TableRow>
              })
            }
          </Fragment>

        })
      }
    </>
  }


  const renderCreditCardInfo = (data: ILOANNormalStorageCICDeclareDataDetail) => {
    return (
      data && data.credit?.map((x, i) => {
        return <Fragment key={i}>
          {
            x.detail.card.list.length > 0 ? (
              x.detail.loan.list.map(a => a.amount).reduce((a,b) => Number(a) + Number(b), 0) ? (
                renderBankInfoRow(i + 1, CreditInstitution?.find(cre => cre.code === x.code)?.name ?? "",
                  x.detail.collateral.list?.map(x => x.value ?? 0)?.reduce((a, b) => Number(a) + Number(b), 0) ?? 0,
                  x.detail.card.date ?? null,
                  false)
              ) : (
                renderBankInfoRow(i + 1, CreditInstitution?.find(cre => cre.code === x.code)?.name ?? "",
                  x.detail.collateral.list?.map(x => x.value ?? 0)?.reduce((a, b) => Number(a) + Number(b), 0) ?? 0,
                  x.detail.card.date ?? null,
                  true)
              )
            ) : null
          }
          {
            x.detail.card.list?.map((c, pos) => {
              if (c.balance !== null) {
                return <TableRow key={c.uuid}>
                  <TableCell align="center" scope="row">{(i + 1) + "." + (pos + 1)}</TableCell>
                  <TableCell align="left" colSpan={2} scope="row">{`THẺ TÍN DỤNG ${pos + 1}`}</TableCell>
                  <TableCell align="right" scope="row">{formatNumber(c.limited?.toString() ?? '')}</TableCell>
                  <TableCell align="right" scope="row">{formatNumber(c.balance?.toString() ?? '')}</TableCell>
                  <TableCell align="right" scope="row">{formatNumber(c.limitedCIC?.toString() ?? '')}</TableCell>
                  <TableCell align="right" scope="row">{formatNumber(c.balanceCIC?.toString() ?? '')}</TableCell>
                  <TableCell align="left" scope="row">{c.note ?? ''}</TableCell>
                  <TableCell align="left" scope="row"></TableCell>
                  <TableCell align="left" scope="row"></TableCell>
                </TableRow>
              }
              return null
            })
          }
        </Fragment>
      })
    )
  }

  // console.log("totallllllllllllllllllllll", data[declare]?.[pos]?.data);
  // data[declare]?.[pos]?.data?.map(x => x.totalLoan ?? 0)?.reduce((a, b) => Number(a) + Number(b), 0)

  return <Dialog 
    sx={{
      '& .MuiDialog-paper':{
        width: "calc(100% - 164px)",
        maxHeight: "calc(100% - 164px)",
      }
    }}
    open={open} 
    onClose={handleClose} 
    maxWidth={false} 
    fullWidth={true}
    >
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
        <Grid item xl={4} md={4} xs={4} className={classes.inputLabel}>
          <Input
            sx={{
              '& .Mui-disabled': {
                '-webkit-text-fill-color': '#353535',
                fontWeight: 500,
                textTransform: 'uppercase'
              }
            }}
            label="1. Tên khách hàng"
            disabled
            value={data[declare as keyof ILOANNormalStorageCICOrganData]?.data?.[pos]?.full_name ?? ''}
          />
        </Grid>
        <Grid item xl={4} md={4} xs={4} className={classes.inputLabel}>
          <Input 
            className="currency-amount"
            label="2. Tổng dư nợ (VND)"
            value={data[declare as keyof ILOANNormalStorageCICOrganData]?.data?.[pos]?.data?.map(x => x.totalLoan ?? 0)?.reduce((a, b) => Number(a) + Number(b), 0).toString() ?? ''}
            disabled
            type='number'
            format
          />
        </Grid>
        <Grid item xl={4} md={4} xs={4} className={classes.inputLabel}>
          <Input 
            className="currency-amount"
            label="3. Tổng giá trị TSBĐ (VND)"
            disabled
            type='number'
            format
            value={data[declare]?.data?.[pos]?.data?.map(x => x.totalCollateral ?? 0)?.reduce((a, b) => Number(a) + Number(b), 0).toString() ?? ''}
          />
        </Grid>
      </Grid>

      {data[declare]?.data?.[pos]?.data?.map((id, index) => {
        // console.log("idddddddddddddd", id.credit.map(item => item.detail.collateral.list).reduce((a, b) => {
        //   return a.concat(b)
        // }).map(a => a.value ?? 0).reduce((a, b) => Number(a) + Number(b), 0))
        const checkDataLOAN = id.credit.map(item => item.detail.loan.list).find(item=>item.find(i=>i.amount))
        return <Fragment key={id.uuid}>
          <div className={classes.root}>
            <Box className="flex justify-between">
              <p className="title">
                {`${intToAlphabet(index)} THÔNG TIN ${CifIfType?.find(c => c.code === id.identity_type)?.name} - ${id.identity_num}`}
              </p>
              {
                DebtClassification?.find(x => x.code === id.debtGroup)?.name && <p className="title flex-end">
                {`Nhóm nợ cao nhất: ${DebtClassification?.find(x => x.code === id.debtGroup)?.name}`}
                </p>
              }
              
            </Box>
            <Table
              className="mscb-table mscb-table-border"
              sx={{
                "& .MuiTable-root":{
                  tableLayout:"fixed"
                }
              }}>
              <Table className={classes.table}>
                <TableHead className="table__header">
                  <THeader />
                </TableHead>
                <TableBody className="table__body">{id.credit?.length ?
                    <>
                      {
                        !!checkDataLOAN === false ? null :
                        (
                          renderTitleHeader(id.credit.map(item => item.detail.collateral.list).reduce((a, b) => {return a.concat(b)})
                            ?.map(a => a.value ?? 0).reduce((a, b) => Number(a) + Number(b), 0) ?? 0,
                            Number(id.credit?.filter(x => x?.detail?.loan?.list?.length > 0)?.find(x => Number(x.detail.loan.date) > 0)?.detail.loan.date) ?? null, false
                          )
                        )
                      }
                      {renderCreditLoanInfo(id)}
                      {
                        !!id.credit?.find(x => x.detail?.card.list.length > 0) ?
                        (
                          (Number(id.totalLoan) > 0) ?
                          (
                            renderTitleHeader(id.credit.map(item => item.detail.collateral.list).reduce((a, b) => {return a.concat(b)})
                            ?.map(a => a.value ?? 0).reduce((a, b) => Number(a) + Number(b), 0) ?? 0,
                              Number(id.credit?.filter(x => x?.detail?.loan?.list?.length > 0)?.find(x => Number(x.detail.card.date) > 0)?.detail.card.date) ?? null
                              , true, !!checkDataLOAN ? true : false
                            )
                          ) : (
                            renderTitleHeader(id.credit.map(item => item.detail.collateral.list).reduce((a, b) => {return a.concat(b)})
                            ?.map(a => a.value ?? 0).reduce((a, b) => Number(a) + Number(b), 0) ?? 0,
                              Number(id.credit?.filter(x => x?.detail?.loan?.list?.length > 0)?.find(x => Number(x.detail.card.date)> 0)?.detail.card.date ) ?? null,
                              true, !!checkDataLOAN ? true : false
                            )
                          )
                        )
                        : null
                      }
                      {renderCreditCardInfo(id)}
                    </>
                    : <TableCell align='center' colSpan={10}>
                        Khách hàng chưa từng phát sinh quan hệ tín dụng 
                      </TableCell>}</TableBody>
              </Table>
            </Table>
          </div>
        </Fragment>
      })}

    </DialogContent>
  </Dialog>
}
export default ReviewDetailsInfo;