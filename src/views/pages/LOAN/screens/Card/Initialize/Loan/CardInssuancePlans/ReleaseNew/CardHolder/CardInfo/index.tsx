import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { FC } from 'react';
import Checkbox from 'views/components/base/Checkbox';
import Input from 'views/components/base/Input';
import Radio from 'views/components/base/Radio';
import Select from 'views/components/base/Select';
import CardInside from 'views/components/layout/CardInside';
import CardInfoStyle from './style';

const data = [
  {
    label: "Tại SCB phát hành",
    value: '1',
  },
  {
    label: "Tại địa chỉ hộ khẩu",
    value: '2',
  },
  {
    label: "Tại địa chỉ đang sinh sống",
    value: '3',
  },
  {
    label: "Tại địa chỉ công ty",
    value: '4',
  },
  {
    label: "Tại SCB khác",
    value: '5',
  },
  {
    label: "Khác",
    value: '6',
  },
]

const CardInfo: FC = () => {

  const classes = CardInfoStyle();

  return (
    <CardInside title="I. Thông tin thẻ" className={classes.CardInfo}>
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={3} md={3} xs={6} className={classes.inputLabel}>
          <Input required label="1. Loại thẻ" />
        </Grid>
        <Grid item xl={3} md={3} xs={6} className={classes.inputLabel}>
          <Input label="2. Hạn mức thẻ (VND)" required />
        </Grid>
        {/* <Grid item xl={12} md={12} xs={12}>
          <Typography component="h6" className={`text-14 font-medium mb-0`}>
            3. Tên dập nổi trên thẻ <span className="text-danger">*</span>
          </Typography>
        </Grid> */}
        <Grid item xl={6} xs={6} md={12}>
          <Typography component="h6" sx={{marginBottom:'8px'}} className={`text-14 font-medium `}>
            3. Tên dập nổi trên thẻ <span className="text-danger">*</span>
          </Typography>
          <Grid container columnSpacing="20" rowSpacing="20">
            <Grid item xl={4} md={4} xs={12} className={classes.inputGroup}>
              <Typography component="h6" className={`text-14 mb-0`}>
                Họ
              </Typography>
              <Input />
            </Grid>
            <Grid item xl={4} md={4} xs={12} className={classes.inputGroup}>
              <Typography component="h6" className={`text-14 mb-0`}>
                Tên đệm
              </Typography>
              <Input />
            </Grid>
            <Grid item xl={4} md={4} xs={12} className={classes.inputGroup}>
              <Typography component="h6" className={`text-14 mb-0`}>
                Tên
              </Typography>
              <Input />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12} className={`mscb-input`}>
          <Grid container columnSpacing="20" rowSpacing="20">
            <Grid item xl={12} md={12} xs={12}>
              <Typography component="h6" className={`text-14 font-medium mb-0`}>
                4. Hình thức giao thẻ <span className="text-danger">*</span>
              </Typography>
            </Grid>
            {
              data.map(d => (
                <React.Fragment key={d.value}>
                  {(() => {
                    if (d.value === '5') {
                      return (
                        <Grid item xl={4} md={12} xs={12} className={classes.radioBoxSelect}>
                          <Radio
                            variant="checkbox"
                            options={[{ label: d.label, value: d.value }]}
                            className={`scb`}
                          />
                          <Select
                            className={`${classes.inputLabel} relative other-line`}
                            options={[]}
                          />
                        </Grid>
                      )
                    } else if (d.value === '6') {
                      return (
                        <Grid item xl={12} md={12} >
                          <Grid container columnSpacing="20" rowSpacing="20">
                            <Grid item xl={4} md={12} xs={12} className={classes.radioBoxSelect}>
                              <Grid container columnSpacing="20" rowSpacing="20">
                                <Grid item xl={3} style={{display:'flex'}}>
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

export default CardInfo;
