import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { FC } from 'react';
import Input from 'views/components/base/Input';
import Radio from 'views/components/base/Radio';
import Select from 'views/components/base/Select';
import CardInside from 'views/components/layout/CardInside';
import PaymentInfoStyle from './style';

const dataPayment = [
  {
    label: "Không đăng ký trích nợ tự động",
    value: '1',
  },
  {
    label: "Đăng ký trích nợ tối thiểu",
    value: '2',
  },
  {
    label: "Đăng ký trích nợ toàn bộ",
    value: '3',
  },
  {
    label: "Trích nợ số tiền cố định hàng tháng",
    value: '4',
  },
]
const data = [
  {
    label: "Không đăng ký trích nợ tự động",
    value: '1',
  },
  {
    label: "Đăng ký trích nợ tối thiểu",
    value: '2',
  },
  {
    label: "Đăng ký trích nợ toàn bộ",
    value: '3',
  },
  {
    label: "Trích nợ số tiền cố định hàng tháng",
    value: '4',
  },
  {
    label: "Khác",
    value: '5',
  },
 
]

const PaymentInfo: FC = () => {

  const classes = PaymentInfoStyle();

  return (
    <CardInside title="II. Thông tin thanh toán" className={classes.PaymentInfo}>
      <Grid container columnSpacing="20" rowSpacing="20">
         <Grid item xl={12} md={12} xs={12} className={`mscb-input`}>
          <Grid container columnSpacing="20" rowSpacing="20" >
            <Grid item xl={12} md={12} xs={12}>
              <Typography component="h6" className={`text-14 font-medium mb-0`}>
                1. Hình thức thanh toán dư nợ <span className="text-danger">(*)</span>
              </Typography>
            </Grid>
            {
              dataPayment.map(d => (
                <React.Fragment key={d.value}>
                  {(() => {
                    if (d.value === '4') {
                      return (
                        <Grid item xl={6} md={12} xs={12} className={classes.radioBoxSelect}>
                          <Grid container>
                            <Grid item xl={5}>
                              <Radio
                                variant="checkbox"
                                options={[{ label: d.label, value: d.value }]}
                              // className={`scb`}
                              />
                            </Grid>
                            <Grid item xl={7}>
                              <Select
                                className={`${classes.inputLabel} relative other-line`}
                                options={[]}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      )
                    } else {
                      return (
                        <Grid item xl={2} md={3} xs={3} className={classes.radioBoxSelect}>
                          <Radio
                            variant="checkbox"
                            options={[{ label: d.label, value: d.value }]}
                            className='scb'
                          />
                        </Grid>
                      )
                    }
                  })()}
                </React.Fragment>
              ))
            }
            <Grid item xl={3} md={6} xs={6}>
              <Select label="2. Số tài khoản thanh toán để trích nợ" options={[]} />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <Typography component="h6" className={`text-14 font-medium mb-0`}>
                3. Hình thức nhận bảng sao kê và các thông báo khác <span className="text-danger">(*)</span>
              </Typography>
            </Grid>
            {
              data.map(d => (
                <React.Fragment key={d.value}>
                  {(() => {
                    if (d.value === '5') {
                      return (
                        <Grid item xl={12} md={12} >
                          <Grid container columnSpacing="20" rowSpacing="20">
                            <Grid item xl={4} md={12} xs={12} className={classes.radioBoxSelect}>
                              <Grid container columnSpacing="20" rowSpacing="20">
                                <Grid item xl={3} style={{ display: 'flex' }}>
                                  <Radio
                                    variant="checkbox"
                                    options={[{ label: d.label, value: d.value }]}
                                    className={`other`}
                                  />
                                </Grid>

                                <Grid item xl={9} md={9} xs={9} className={`${classes.inputLabel} relative line-contact`}>
                                  <Input
                                    required
                                    label="1. Địa chỉ liên hệ"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xl={8} md={12} xs={12}>
                              <Grid container columnSpacing="20" rowSpacing="20">
                                <Grid item xl={4} md={4} xs={4} className={`${classes.inputLabel} relative line`}>
                                  <Select
                                    required
                                    label="2. Tỉnh/TP"
                                    options={[]}
                                  />
                                </Grid>
                                <Grid item xl={4} md={4} xs={4} className={`${classes.inputLabel} relative line`}>
                                  <Select
                                    required
                                    label="3. Quận/Huyện"
                                    options={[]}
                                  />
                                </Grid>
                                <Grid item xl={4} md={4} xs={4} className={`${classes.inputLabel} relative line`}>
                                  <Select
                                    required
                                    label="4. Phường/Xã"
                                    options={[]}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                      )
                    } else {
                      return (
                        <Grid item xl={2} md={3} xs={3} className={classes.radioBoxSelect}>
                          <Radio
                            variant="checkbox"
                            options={[{ label: d.label, value: d.value }]}
                            className='scb'
                          />
                        </Grid>
                      )
                    }
                  })()}
                </React.Fragment>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default PaymentInfo;
