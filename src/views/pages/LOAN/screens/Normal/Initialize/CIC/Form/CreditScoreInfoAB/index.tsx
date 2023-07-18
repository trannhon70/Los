import PersonIcon from "@mui/icons-material/Person";
import {
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import useNormalCICMessage from "app/hooks/useNormalCICMessage";
import clsx from "clsx";
import { setCICScore, setCustomerSegment, setLOANScoreDate } from "features/loan/normal/storage/cic/actions";
import { getActiveOrgan, getDeclareActive, getListCustomerSegment, getLOANNormalStorageCICIdentityActive, getLOANNormalStorageCICPosition } from "features/loan/normal/storage/cic/selectors";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { ILOANNormalStorageCICOther } from "types/models/loan/normal/storage/CIC";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Select from "views/components/base/Select";
import CardInside from "views/components/layout/CardInside";
import TableSticky from "views/components/layout/TableSticky";
import CheckboxCustormerType from "views/pages/LOAN/widgets/CICForm/CheckboxCustormerType";
import creditScoreInfoStyles from "./style";

interface CreditScoreInfoProps {
  titleCard: string;
  disabled?: boolean;
  declare?: string
}
const CreditScoreInfoAB: FC<CreditScoreInfoProps> = (props) => {
  const { titleCard, disabled = false, declare = 'borrower' } = props;
  const classes = creditScoreInfoStyles();

  const { ScoreRankDetail, register } = useMasterData();
  
  useEffect(() => {
    register('scoreRankDetail')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const params = useParams() as unknown as ILOANURLParams;
  //handle maximun render date
  const organActive = useSelector(getActiveOrgan());
  const ruleDisabled = useSelector(getRuleDisbled);
  const declareActive = useSelector(getDeclareActive());
  const dispatch = useDispatch();

  const organ = params.organ as keyof ILOANNormalStorageCICOther;

  const customerSeggmentList = useSelector(getListCustomerSegment(declare))

  const getMessage = useNormalCICMessage();

  const identity = useSelector(
    getLOANNormalStorageCICIdentityActive(organ, declare)
  );

  const handleChangeValue = (val: string | number | null, key: string) => {
    dispatch(setCICScore(val, { key }));
  }

  const handleChangeGetValue = (value: string[]) => {
    dispatch(setCustomerSegment(value, organ));
  };

  const handleChangeDate = (val: number | null) => {
    !!val && dispatch(setLOANScoreDate(val))
  }

  const THeader = () => {
    return (
      <TableRow sx={{ color: 'var(--mscb-primary)!important' }}>
        <TableCell width="220px" align="center" sx={{ borderLeft: 'solid 1px #d5d5d5' }}>
          THÔNG TIN
        </TableCell>
        {
          ScoreRankDetail.map((sr, index) => {
            return <Fragment key={index}>
              <TableCell align="center" colSpan={2} key={sr.display_order} sx={{
                borderLeft: 'solid 1px #d5d5d5',
                '&:last-child': {
                  borderRight: 'solid 1px #d5d5d5',
                }
              }}>{sr.name}</TableCell>
            </Fragment>
          })
        }
      </TableRow>
    );
  };
  
  return (
    <div>
      <CardInside title={titleCard} className={clsx(classes.root, classes.disabledInput)}>
        <Grid container columnSpacing="20" rowSpacing="20">
          <Grid item xl={12} md={12} xs={12}>
            <Grid container columnSpacing="20" rowSpacing="20">
              <Grid item xl={!disabled ? 3 : 4} md={12} xs={12}>
                <Grid container columnSpacing="20" rowSpacing="20">
                  <Grid item xl={6} md={6} xs={6} className={classes.inputLabel} >
                    <Input
                      onDebounce={(val: string | number | null) => handleChangeValue(val, 'score_value')}
                      disabled={disabled || ruleDisabled}
                      label="1. Điểm"
                      required
                      type="number"
                      // value={(organActive === params.organ && declareActive === params.declare) ?(customerSeggmentList?.score_value ?? '').toString() : '0'}
                      value={customerSeggmentList?.score_value?.toString()}
                      message={getMessage('score_value', {
                        identity: identity ?? '',
                      })}
                    />
                  </Grid>
                  <Grid item xl={6} md={6} xs={6} className={classes.inputLabel} >
                    <Select
                      disabled={disabled || ruleDisabled}
                      label="2. Hạng"
                      required
                      options={[
                        { value: '01', label: '01' },
                        { value: '02', label: '02' },
                        { value: '03', label: '03' },
                        { value: '04', label: '04' },
                        { value: '05', label: '05' },
                        { value: '06', label: '06' },
                        { value: '07', label: '07' },
                        { value: '08', label: '08' },
                        { value: '09', label: '09' },
                        { value: '10', label: '10' },
                      ]}
                      onChange={(val) => handleChangeValue(val, 'score_rank')}
                      value={customerSeggmentList?.score_rank}
                      message={getMessage('score_rank', {
                        identity: identity ?? '',
                      })}
                    />
                  </Grid>
                  <Grid item xl={12} md={6} xs={6} className={classes.inputLabel} >
                    <InputDate
                      disabled={disabled || ruleDisabled}
                      label="3. Ngày chấm điểm"
                      required
                      onChange={(val) => handleChangeDate(val)}
                      value={(organActive === params.organ && declareActive === params.declare) ? (Number(customerSeggmentList?.publish_date) ?? 0) : 0}
                      message={getMessage('date', {
                        identity: identity ?? '',
                        key: 'score'
                      })}
                    />
                  </Grid>
                  <Grid item xl={12} md={6} xs={6} className={classes.inputLabel}>
                    <Input
                      disabled={disabled || ruleDisabled}
                      label="4. Đánh giá điểm tín dụng"
                      maxlength={255}
                      onDebounce={(val: string | number | null) => handleChangeValue(val, 'evaluation')}
                      value={(customerSeggmentList?.evaluation ?? '').toString()}
                      message={getMessage('evaluation', {
                        identity: identity ?? '',
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={!disabled ? 9 : 8}>
                <Grid container className={clsx('type_customer', (disabled || ruleDisabled) && classes.checkboxTypeCustomerDisabled )}>
                  <Typography className="text-14 font-medium w-full">
                    5. Phân loại khách hàng
                  </Typography>
                  <CheckboxCustormerType
                    onChange={handleChangeGetValue}
                    value={customerSeggmentList?.customer_segment}
                    disabled={disabled || ruleDisabled}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} md={12} xs={12}>
            <Typography className="text-14 font-medium" sx={{ color: "var(--mscb-disable)" }}>
              6. Chi tiết điểm và hạng{" "}
            </Typography>
            <TableContainer className="mt-2" sx={{ borderTop: 'solid 1px #d5d5d5' }}>
              <TableSticky className="mscb-table">
                <TableHead >
                  <THeader />
                </TableHead>
                <TableBody className='mscb-table-border-score'>
                  <TableRow >
                    <TableCell align="left"> Hạng</TableCell>
                    {
                      ScoreRankDetail.map((sr, index) => {
                        return (sr.detail_info.map((dt, index) => {
                          return (
                            <Fragment key={index}>
                              <TableCell className={`
                                  ${(dt.score_rank_score === customerSeggmentList?.score_rank) ? 'active' : null}
                                  font font-bold `} align="center">{dt.score_rank_score}</TableCell>
                            </Fragment>
                          )
                        }))
                      })
                    }
                  </TableRow>
                  <TableRow >
                    <TableCell align="left">Điểm</TableCell>
                    {
                      ScoreRankDetail.map((sr, index) => {
                        return (sr.detail_info.map((dt, index) => {
                          return (
                            <Fragment key={index}>
                              <TableCell className={`${(dt.score_rank_score === customerSeggmentList?.score_rank) ? 'active' : null
                                }`} align="center">{dt.min_score} - {dt.max_score}</TableCell>
                            </Fragment>
                          )
                        }))
                      })
                    }
                  </TableRow>
                  <TableRow>
                    <TableCell align="left"> Khách hàng</TableCell>
                    {
                      ScoreRankDetail.map((sr, index) => {
                        return (sr.detail_info.map((dt, index) => {
                          return (
                            <Fragment key={index}>
                              {
                                dt.score_rank_score === customerSeggmentList?.score_rank ? (
                                  <TableCell className="active" align="center">
                                    <PersonIcon className="customer_icon" />
                                  </TableCell>
                                ) : <TableCell align="center"></TableCell>
                              }
                            </Fragment>
                          )
                        }))
                      })
                    }
                  </TableRow>
                </TableBody>
              </TableSticky>
            </TableContainer>
          </Grid>
        </Grid>
      </CardInside>
    </div>
  );
};

export default CreditScoreInfoAB;
