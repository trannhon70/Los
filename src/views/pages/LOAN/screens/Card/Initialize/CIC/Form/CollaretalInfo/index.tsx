import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { FC } from 'react';
import InputDate from 'views/components/base/InputDate';
import CardInside from 'views/components/layout/CardInside';
import ObjectList from 'views/components/layout/ObjectList';
import { FaHandHoldingUsd } from 'react-icons/fa';
import collaretalInfoStyle from './style';
import Select from 'views/components/base/Select';
import Input from 'views/components/base/Input';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';

const CollaretalInfo: FC = () => {

  const classes = collaretalInfoStyle();
  const cardInLineClasses = clsx(classes.root, "h-full");
  const gridContainerClasses = clsx("mscb-form-row", classes.item);
  return <>
    <Grid container className={cardInLineClasses}>
      <Grid item xl={12} md={12} xs={12} style={{ height: '12%' }}>

        <Typography className={clsx(classes.headerTitleCard, 'font-medium text-14 mb-2')}>
          C. Tổng dư nợ tài sản bảo đảm
        </Typography>
        <Input
          className={classes.inputTotal}
          disabled
        />
      </Grid>
      {/* <Grid item xl={12}>
      </Grid> */}
      <Grid item xl={12} md={12} xs={12}  style={{ height: '88%' }}>
        <CardInside title="Tài sản bảo đảm" className={classes.cardInside}>
          <Grid container rowSpacing="20" columnSpacing="20" className={gridContainerClasses}>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabelLastUpdateDate}>
              <span>
                Lần cuối
              </span>
              <InputDate
                className={classes.inputLabel}
                label='I. Ngày cập nhật CIC'
              />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <Divider />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <label className={classes.inputLabel}>II. Chọn tài sản</label>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <ObjectList
                options={[
                  { label: 'Tài Sản 1', circle: <FaHandHoldingUsd />, },
                  { label: 'Tài Sản 2', circle: <FaHandHoldingUsd /> },
                  { label: 'Tài Sản 3', circle: <FaHandHoldingUsd /> },
                  { label: 'Tài Sản 4', circle: <FaHandHoldingUsd /> },
                  { label: 'Tài Sản 5', circle: <FaHandHoldingUsd /> },
                  { label: 'Tài Sản 6', circle: <FaHandHoldingUsd /> },
                  { label: 'Tài Sản 7', circle: <FaHandHoldingUsd /> },
                ]}
                className={classes.collaretalObjList}
                enableLength={false}
                enableMenu={false}
                onAdd={() => { }}
              />
            </Grid>
            <Grid item xl={6} md={6} xs={12}  className={classes.inputLabel}>
              <Select label="1. Tên loại TSBĐ" options={[]} />
            </Grid>
            <Grid item xl={6} md={6} xs={12}  className={classes.inputLabel}>
              <Input label="2. Giá trị TSBĐ (VND)" type="number"/>
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
  </>
}

export default CollaretalInfo