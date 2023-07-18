import Grid from '@mui/material/Grid';
import React, { FC } from 'react';
import Radio from 'views/components/base/Radio';
import CardInside from 'views/components/layout/CardInside';
import GiftsInfoStyle from './style';



const GiftsInfo: FC = () => {

  const classes = GiftsInfoStyle();

  return (
    <CardInside title="III. Quà tặng" className={classes.GiftsInfo}>
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12}   className={classes.radioBoxSelect} >
          <Radio
            variant="checkbox"
            required
            label="1. KH có thỏa điều kiện nhận quà tặng hay không?"
            options={[
              { value: "YES", label: "Có" },
              { value: "NO", label: "Không" },
            ]}
            value="1"
          />
        </Grid>
        <Grid item xl={12} md={12} xs={12}   className={classes.radioBoxSelectGift} >
          <Radio
            variant="checkbox"
            required
            label="2. Thông tin lựa chọn quà tặng"
            options={[
              { value: "1", label: "Phí thường niên năm đầu" },
              { value: "2", label: "Gói khám sức khỏe và tầm soát ung thư" },
              { value: "3", label: "Phí thường niên năm đầu và tặng tiền vào tài khoản thẻ" },
              { value: "4", label: "Dịch vụ phân tích Gen" },
              { value: "5", label: "Vali" },
              { value: "6", label: "E-Voucher" },
            ]}
            value="5"
          />
        </Grid>
      </Grid>
    </CardInside>
  );
};

export default GiftsInfo;
