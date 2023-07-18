import { LibraryBooks } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { FC } from 'react';
import Input from 'views/components/base/Input';
import Select from 'views/components/base/Select';
import ObjectList from 'views/components/layout/ObjectList';
import SelectDebtClassification from 'views/components/widgets/SelectDebtClassification';
import CollaretalInfo from '../../../CIC/Form/CollaretalInfo';
import CreditScoreInfo from '../../../CIC/Form/CreditScoreInfo';
import NormalLoan from '../../../CIC/Form/NormalLoan';
import CreditCard from '../CreditCard';

import basicInfoStyle from './style';

interface BasicInfoProps {
  isSCB?: boolean;
}

const MainCardHolder: FC<BasicInfoProps> = props => {

  const { isSCB } = props
  const classes = basicInfoStyle();

  return <div className="pt-5">
    <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
    <span className={classes.title}>THÔNG TIN CƠ BẢN</span>
    <Grid container columnSpacing="20" rowSpacing="20" className={classes.root}>
      <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
        <Input label="1. Chủ thẻ chính" disabled />
      </Grid>
      <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.relative}>
        <IconButton>
          <LibraryBooks />
        </IconButton>
        <Select label="2. Giấy tờ định danh" options={[]} />
      </Grid>
      <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
        <Input label="3. Tổng số lượng thẻ của các TCTD" disabled />
      </Grid>
      <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
        <Input label="4. Tổng dư nợ (VND)" disabled />
      </Grid>
      <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
        <Input label="5. Tổng giá trị TSBĐ (VND)" disabled />
      </Grid>
      <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
      <SelectDebtClassification
          label="6. Nhóm nợ cao nhất"
        />
      </Grid>
      {(() => {
        if (isSCB) {
          return <>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <Select label="7. Mã tài chính tín dụng" options={[]} />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <Input label="8. Tên tài chính tín dụng" disabled />
            </Grid>
          </>
        } else {
          return <>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ObjectList
                labelLength="Số lượng TCTD khác :"
                options={[
                  { label: 'HSCB' },
                  { label: 'ACB' },
                ]}
                enableMenu={false}
                onAdd={() => { }}
              />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <Select label="7. Mã tài chính tín dụng" options={[]} />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <Input label="8. Tên tài chính tín dụng" disabled />
            </Grid>
          </>
        }
      })()}
      <Grid item xl={12} md={12} xs={12}>
        <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
        <span className={classes.title} >THÔNG TIN CHI TIẾT</span>
        <Grid container rowSpacing="20px" columnSpacing="20px" className={`${classes.detailInfoWrap}`}>
          <Grid item xl={4} md={12} xs ={12}>
            <NormalLoan />
          </Grid>
          <Grid item xl={4}  md={12} xs ={12}>
            <CreditCard />
          </Grid>
          <Grid item xl={4}  md={12} xs ={12}>
            <CollaretalInfo />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} md={12} xs={12}>
        <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
        <span className={classes.title}>THÔNG TIN ĐIỂM TÍN DỤNG</span>
        <CreditScoreInfo titleCard='Rủi ro tín dụng' />
      </Grid>
    </Grid>

  </div>
}

export default MainCardHolder;