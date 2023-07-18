import { LibraryBooks } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { FC } from 'react';
import Input from 'views/components/base/Input';
import Select from 'views/components/base/Select';
import ObjectList from 'views/components/layout/ObjectList';
import CreditCard from '../CreditCard';
import CollaretalInfo from '../CollaretalInfo';
import CreditScoreInfo from '../CreditScoreInfo';
import NormalLoan from '../NormalLoan';
import basicInfoStyle from './style';
import SelectDebtClassification from 'views/components/widgets/SelectDebtClassification';

interface BasicInfoProps {
  isSCB?: boolean;
}

const MainReferencePerson: FC<BasicInfoProps> = props => {

  const { isSCB } = props
  const classes = basicInfoStyle();

  return <div className="pt-5">
    <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
    <span className={classes.title}>THÔNG TIN CƠ BẢN</span>
    <Grid container columnSpacing="20" rowSpacing="20" className={classes.root}>
      <Grid item xl={12} md={12} xs={12}>
        <Grid container className={`basicInfo`} columnSpacing="20" rowSpacing="20" >
          <Grid item className={classes.inputLabel} md={12} xs={12}>
            <Input label="1. Người giới thiệu" disabled />
          </Grid>
          <Grid item className={classes.relative} md={12} xs={12}>
            <IconButton>
              <LibraryBooks />
            </IconButton>
            <Select label="2. Giấy tờ định danh" options={[]} />
          </Grid>
          <Grid item className={classes.inputLabel} md={12} xs={12}>
            <Input label="3. Tổng dư nợ (VND)" disabled />
          </Grid>
          <Grid item className={classes.inputLabel} md={12} xs={12}>
            <Input label="4. Tổng giá trị TSBĐ (VND)" disabled />
          </Grid>
          <Grid item className={classes.inputLabel} md={12} xs={12}>
            <SelectDebtClassification
              label="5. Nhóm nợ cao nhất"
            />
          </Grid>
        </Grid>
      </Grid>
      {(() => {
        if (isSCB) {
          return <>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <Select label="6. Mã tài chính tín dụng" options={[]} />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <Input label="7. Tên tài chính tín dụng" disabled />
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
              <Select label="6. Mã tài chính tín dụng" options={[]} />
            </Grid>
            <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
              <Input label="7. Tên tài chính tín dụng" disabled />
            </Grid>
          </>
        }
      })()}
      <Grid item xl={12} md={12} xs={12}>
        <Grid container rowSpacing="20px" columnSpacing="20px" className={`${classes.detailInfoWrap}`}>
          <Grid item xl={4} md={12} xs={12}>
            <NormalLoan />
          </Grid>
          <Grid item xl={4} md={12} xs={12}>
            <CreditCard />
          </Grid>
          <Grid item xl={4} md={12} xs={12}>
            <CollaretalInfo />
          </Grid>
        </Grid>
      </Grid>
      <Grid item  xl={12} md={12} xs={12}>
        <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
        <span className={classes.title}>THÔNG TIN ĐIỂM TÍN DỤNG</span>
        <CreditScoreInfo titleCard='Rủi ro tín dụng' />
      </Grid>
    </Grid>

  </div>
}

export default MainReferencePerson;