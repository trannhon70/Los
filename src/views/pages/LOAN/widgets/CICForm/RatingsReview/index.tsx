import { Button, Divider, Grid, Input } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import ObjectList from 'views/components/layout/ObjectList';
import CreditScoreInfo from 'views/pages/LOAN/screens/Card/Initialize/CIC/Form/CreditScoreInfo';
import ReviewDetailCICInfoDialog from './ReviewDetailCICInfoDialog';
import ratingsReviewStyles from './style';

const RatingsReview: FC = () => {

  const classes = ratingsReviewStyles();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(!isOpenModal);
  }
  const handleCloseModal = () => {
    setOpenModal(!isOpenModal);
  }

  return <Fragment>
    <div className={`${classes.root} pt-6`}>
      <Grid xl={12} className="css-control">
        <span className="control-number">STT</span>
        <span className="control-label">THÔNG TIN ĐIỂM TÍN DỤNG</span>
        <span className="control-count"></span>
      </Grid>
      <hr className='hr-style' />
      <Grid container columnSpacing="20px" rowSpacing="20px" >
        <Grid item xl={12} className="type-person pl-8 pt-9">
          <span>I</span>
          <Input className={`${classes.colorWhite} `} disabled value="CHỦ THẺ CHÍNH" />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Divider />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Grid
            container
            columnSpacing="20px"
            rowSpacing="20px"
            className="info-cic flex-row"
          >
            <div className="pl-7 pt-5">
              <span className="cic-stt">1</span>
              <span className="cic-title">THÔNG TIN CIC</span>
              <div className="cic-customer">
                <ObjectList
                  enableMenu={false}
                  options={[
                    { label: 'Nguyễn Anh Đào', },
                  ]}
                  className={`${classes.userListClass} `}
                />
              </div>
              <Button
                className="buttonReview"
                variant="outlined"
                onClick={handleOpenModal}
              >
                Xem lại thông tin CIC
              </Button>

            </div>
            <Grid item xl={12} md={12} xs={12} className="pl-9" rowSpacing="20px">
              <CreditScoreInfo
                titleCard='Rủi ro tín dụng - CMND - 343525968'
                disabled={true} />
              <CreditScoreInfo
                titleCard='Rủi ro tín dụng - PASSPORT - 159829625'
                disabled={true} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Divider />
        </Grid>

      </Grid>
      <Grid container columnSpacing="20px" rowSpacing="20px" >
        <Grid item xl={12} md={12} xs={12} className="type-person pl-7 pt-9">
          <span>II</span>
          <Input className={`${classes.colorWhite} `} disabled value="ĐỐI TƯỢNG KHÁC" />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Divider />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <Grid
            container
            columnSpacing="20px"
            rowSpacing="20px"
            className="info-cic flex-row"
          >
            <div className="pl-7 pt-5">
              <span className="cic-stt">1</span>
              <span className="cic-title">THÔNG TIN CIC</span>
              <div className="cic-customer">
                <ObjectList
                  enableMenu={false}
                  options={[
                    { label: 'Nguyễn Anh Đào', },
                  ]}
                  className={`${classes.userListClass} `}
                />
              </div>
              <Button
                className="buttonReview"
                variant="outlined"
                onClick={handleOpenModal}
              >
                Xem lại thông tin CIC
              </Button>

            </div>
            <Grid item xl={10} className="pl-9" rowSpacing="20px">
              <CreditScoreInfo
                titleCard='Rủi ro tín dụng - CMND - 343525968'
                disabled={true} />
              <CreditScoreInfo
              titleCard='Rủi ro tín dụng - PASSPORT - 159829625'
              disabled={true} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ReviewDetailCICInfoDialog open={isOpenModal} onClose={handleCloseModal} />
    </div>
  </Fragment>
}

export default RatingsReview;