import {
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { FC, Fragment } from 'react';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import CardInside from 'views/components/layout/CardInside';
import clsx from 'clsx';
import PersonIcon from '@mui/icons-material/Person';
import creditScoreInfoStyles from './style';
import TableSticky from 'views/components/layout/TableSticky';
import TitleSquare from 'views/components/layout/TitleSquare';
import { useDispatch } from 'react-redux';
import { ILOANNormalRiskInfo, ILOANNormalStorageCICState } from 'types/models/loan/normal/storage/CIC';
// import { setCICCardOtherHolderScoreEvaluation } from 'features/loan/normal/storage/cic/actions';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import CheckboxCustormerType from '../CheckboxCustormerType';
import { getMasterData } from 'features/master-data/selectors';


interface CreditScoreInfoProps {
  titleCard: string;
  disabled?: boolean;
}
const CreditScoreInfo: FC<CreditScoreInfoProps> = props => {

  const { titleCard, disabled = false } = props
  const classes = creditScoreInfoStyles();
  const { scoreRankDetail } = useSelector(getMasterData);

  const params = useParams() as ILOANURLParams;

  const organ = params.organ as keyof ILOANNormalStorageCICState;

  const dispatch = useDispatch();

  const onChangeScore = (value: string | number | null, keyof: keyof ILOANNormalRiskInfo) => {
    // dispatch(setCICCardOtherHolderScoreEvaluation(value, { organ: organ, keyof: keyof }))
  }

  const THeader = () => {
    return (
      // <Fragment>
        
      // </Fragment>
      
      <TableRow>
        <TableCell width="220px" align="center">THÔNG TIN</TableCell>
        {
          scoreRankDetail.data.map((sr, index) => {
            return <Fragment key={index}>
              <TableCell align="center" colSpan={2} key={sr.display_order}>{sr.name}</TableCell>
              {/* <TableCell align="center" colSpan={2}>DƯỚI TRUNG BÌNH</TableCell>
              <TableCell align="center" colSpan={2}>TRUNG BÌNH</TableCell>
              <TableCell align="center" colSpan={2}>TỐT</TableCell>
              <TableCell align="center" colSpan={2}>RẤT TỐT</TableCell> */}
            </Fragment>
          })
        }
      </TableRow>
    )
  }

  return <div className='mt-5'>
    <TitleSquare className='mt-5'>
      THÔNG TIN ĐIỂM TÍN DỤNG
    </TitleSquare>
    <CardInside title={titleCard} className={clsx(classes.root)} >
      <Grid container columnSpacing="20" rowSpacing="20">
        <Grid item xl={12} md={12} xs={12}>
          <Grid container columnSpacing="20" rowSpacing="20">
            <Grid item xl={!disabled ? 3 : 4} md={12} xs={12}>
              <Grid container columnSpacing="20" rowSpacing="20" >
                <Grid item xl={6} md={6} xs={6} >
                  <Input label="1. Điểm" onChange={(val) => onChangeScore(val, 'score_value')} />
                </Grid>
                <Grid item xl={6} md={6} xs={6}  >
                  <Input label="2. Hạng" onChange={(val) => onChangeScore(val, 'score_rank')} />
                </Grid>
                <Grid item xl={12} md={6} xs={6} >
                  <InputDate label="3. Ngày chấm điểm" onChange={(val) => onChangeScore(val, 'publish_date')} />
                </Grid>
                <Grid item xl={12} md={6} xs={6} >
                  <Input label="4. Đánh giá điểm tín dụng (%)" onChange={(val) => onChangeScore(val, 'evaluation')} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={!disabled ? 9 : 8}>
              <Grid container className="type_customer" >
                <Typography className="text-14 font-medium w-full">5. Phân loại khách hàng</Typography>
                <CheckboxCustormerType />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12} >
          <Typography className="text-14 font-medium">6. Chi tiết điểm và hạng </Typography>
          <TableContainer className="mt-2">
            <TableSticky
              className="mscb-table mscb-table-border-score"
            >
              <TableHead >
                <THeader />
              </TableHead>
              <TableBody >
                <TableRow>
                  <TableCell align="left"> Hạng</TableCell>
                  {
                    scoreRankDetail.data.map((sr, index) => {
                        return (sr.detail_info.map((dt, index) => {
                          return (
                            <Fragment key={index}>
                              <TableCell className="font-bold" align="center">{ dt.score_rank_score }</TableCell>
                            </Fragment>
                          )
                        }))
                    })
                  }
                  {/* <TableCell className="font-bold" align="center">10</TableCell>
                  <TableCell className="font-bold" align="center">09</TableCell>
                  <TableCell className="active font font-bold" align="center">08</TableCell>
                  <TableCell className="font-bold" align="center">07</TableCell>
                  <TableCell className="font-bold" align="center">06</TableCell>
                  <TableCell className="font-bold" align="center">05</TableCell>
                  <TableCell className="font-bold" align="center">04</TableCell>
                  <TableCell className="font-bold" align="center">03</TableCell>
                  <TableCell className="font-bold" align="center">02</TableCell>
                  <TableCell className="font-bold" align="center">01</TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell align="left">Điểm</TableCell>
                  {
                    scoreRankDetail.data.map((sr, index) => {
                        return (sr.detail_info.map((dt, index) => {
                          return (
                            <Fragment key={index}>
                              <TableCell className="font-bold" align="center">{dt.min_score} - {dt.max_score}</TableCell>
                            </Fragment>
                          )
                        }))
                    })
                  }
                  {/* <TableCell align="center">403 - 429</TableCell>
                  <TableCell align="center">430 - 454</TableCell>
                  <TableCell className="active" align="center">455 - 479</TableCell>
                  <TableCell align="center">480 - 544</TableCell>
                  <TableCell align="center">545 - 571</TableCell>
                  <TableCell align="center">572 - 587</TableCell>
                  <TableCell align="center">588 - 605</TableCell>
                  <TableCell align="center">606 - 621</TableCell>
                  <TableCell align="center">622 - 644</TableCell>
                  <TableCell align="center">645 - 706</TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell align="left"> Khách hàng</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell className="active" align="center"><PersonIcon className="customer_icon" /></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>

              </TableBody>
            </TableSticky>
          </TableContainer >
        </Grid>
      </Grid>

    </CardInside>
  </div>
}

export default CreditScoreInfo;