import { FC } from 'react';
import { Button, Grid } from '@mui/material';
import { Box } from "@mui/system";
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import { FiEdit } from 'react-icons/fi';
import TextArea from 'views/components/base/TextArea';
import clsx from 'clsx';
import resultsStyle from './style';


const Results: FC = () => {
  const classes = resultsStyle();
  return (
  <Box className='pt-5'>
    <div className={classes.title}>
      <h5>B. KẾT QUẢ</h5>
      <Button
        variant="outlined"
        color="primary"
        type="button"
        style={{ height: '36px' }}
        size="small"
      >
        Xếp hạng tín dụng
      </Button>
    </div>
    <Grid container columnSpacing='20'>
      <Grid item xl={4} md={12} xs={12}>
        <CardInside
          title="I. Tại nhân viên kinh doanh"
          className={clsx(classes.cardRoot)}
        >
          <Grid container columnSpacing='20' rowSpacing='20'>
            <Grid item xs={12} md={6}>
              <Input
                label="1. Tổng điểm"
                value="-"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="2. Hạng"
                value="-"
                disabled
              />
              <div className="update-info">
                <span className="label">Thời gian cập nhật: -</span>
                <span className="updated-at"/>
              </div>
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={4} md={12} xs={12}>
        <CardInside
          title="II. Tại cấp phê duyệt"
          className={clsx(classes.cardRoot)}
        >
          <Grid container columnSpacing='20' rowSpacing='20'>
            <Grid item xs={12} md={6}>
              <Input
                label="1. Tổng điểm"
                value="-"
                disabled
                className='disable-black'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="2. Hạng"
                value="-"
                disabled
                className='disable-black'
              />
              <div className="update-info">
                <span className="label">Thời gian cập nhật: -</span>
                <span className="updated-at"/>
              </div>
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={4} md={12} xs={12}>
      <CardInside
          title="III. Quản lý rủi ro"
          className={clsx(classes.cardRoot)}
        >
          <Grid container columnSpacing='20' rowSpacing='20'>
            <Grid item xs={12} md={6}>
              <Input
                label="1. Tổng điểm"
                value="-"
                disabled
              />
            </Grid>
            <Grid item xs={12}  md={6} className='rating-grid'>
              <div className='edit'>
                <FiEdit />
                <span> Chỉnh sửa</span>
              </div>
              <Input
                label="2. Hạng"
                value="-"
                disabled
              />
              <div className='update-info' style={{position: 'absolute', right: '0'}}>
                  <span className='label'>Cập nhật: -</span>
                  {/* API chưa có 'count' nên tạm thời hardcode */}
                  <span className='count'></span>
                  <span></span>
                  <span className='updated-at'/>
              </div>
            </Grid>
            <Grid item xs={12} style={{paddingTop: '16px'}}>
              <TextArea
								label="3. Ghi chú"
								className={classes.textarea}
                disabled
							/>
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
    </Grid>
  </Box>
  )
}

export default Results;