import {
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC, Fragment, useEffect } from "react";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import CardInside from "views/components/layout/CardInside";
import clsx from "clsx";
import PersonIcon from "@mui/icons-material/Person";
import creditScoreInfoStyles from "./style";
import TableSticky from "views/components/layout/TableSticky";
import CheckboxCustormerType from "views/pages/LOAN/widgets/CICForm/CheckboxCustormerType";
import useMasterData from "app/hooks/useMasterData";
import Select from "views/components/base/Select";
import {IPersonCICInfoCreditScoreRiskInfo } from 'types/models/loan/normal/storageApproval/CIC'
interface CreditScoreInfoProps {
  titleCard: string;
  disabled?: boolean;
  data: IPersonCICInfoCreditScoreRiskInfo;
}
const CreditScoreInfo: FC<CreditScoreInfoProps> = (props) => {
  const { titleCard, disabled = false , data } = props;
  const classes = creditScoreInfoStyles();

  const { ScoreRankDetail, register } = useMasterData();
  
  useEffect(() => {
    register('scoreRankDetail')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const THeader = () => {
    return (
      <TableRow>
        <TableCell width="220px" align="center">
          THÔNG TIN
        </TableCell>
        {
          ScoreRankDetail.map((sr, index) => {
            return <Fragment key={index}>
              <TableCell align="center" colSpan={2} key={sr.display_order}>{sr.name}</TableCell>
            </Fragment>
          })
        }
      </TableRow>
    );
  };

  return (
    <div>
      <CardInside title={titleCard} className={clsx(classes.root, classes.disabledInput)}>
        {
          data.score_value !== null ? <Grid container columnSpacing="20" rowSpacing="20">
          <Grid item xl={12} md={12} xs={12}>
            <Grid container columnSpacing="20" rowSpacing="20">
              <Grid item xl={!disabled ? 3 : 4} md={12} xs={12}>
                <Grid container columnSpacing="20" rowSpacing="20">
                  <Grid
                    item
                    xl={6}
                    md={6}
                    xs={6}
                    className={classes.inputLabel}
                  >
                    <Input
                      // onDebounce={(val: string | number | null) => handleChangeValue(val, 'score_value')}
                      disabled={disabled}
                      label="1. Điểm"
                      value={data.score_value ?? ''}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={6}
                    md={6}
                    xs={6}
                    className={classes.inputLabel}
                  >
                    <Select
                      disabled={disabled}
                      label="2. Hạng"
                      options={[
                        {value: '01', label: '01'},
                        {value: '02', label: '02'},
                        {value: '03', label: '03'},
                        {value: '04', label: '04'},
                        {value: '05', label: '05'},
                        {value: '06', label: '06'},
                        {value: '07', label: '07'},
                        {value: '08', label: '08'},
                        {value: '09', label: '09'},
                        {value: '10', label: '10'},
                      ]}
                      // onChange={(val) => handleChangeValue(val, 'score_rank')}
                      value={data.score_rank}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={12}
                    md={6}
                    xs={6}
                    className={classes.inputLabel}
                  >
                    <InputDate
                      disabled={disabled}
                      label="3. Ngày chấm điểm"
                      // onChange={(val: number | null)=> handleChangeDate(val)}
                      value={Number(data.publish_date)*1000 ?? null}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={12}
                    md={6}
                    xs={6}
                    className={classes.inputLabel}
                  >
                    <Input
                      disabled={disabled}
                      label="4. Đánh giá điểm tín dụng (%)"
                      // onDebounce={(val: string | number | null) => handleChangeValue(val, 'evaluation')}
                      value={(data?.evaluation ?? '').toString()}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={!disabled ? 9 : 8}>
                <Grid container className="type_customer">
                  <Typography className="text-14 font-medium w-full">
                    5. Phân loại khách hàng
                  </Typography>
                  <CheckboxCustormerType
                    // onChange={handleChangeGetValue}
                    value={data?.customer_segment.map(e => e.id) ?? []}
                    disabled={disabled}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} md={12} xs={12}>
            <Typography className="text-14 font-medium">
              6. Chi tiết điểm và hạng{" "}
            </Typography>
            <TableContainer className="mt-2">
              <TableSticky className="mscb-table mscb-table-border-score">
                <TableHead>
                  <THeader />
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left"> Hạng</TableCell>
                    {
                      ScoreRankDetail.map((sr, index) => {
                          return (sr.detail_info.map((dt, index) => {
                            return (
                              <Fragment key={index}>
                                <TableCell className={`
                                  ${(Number(dt.score_rank_score) === Number(data?.score_rank)) ? 'active' : null}
                                  font font-bold `} align="center">{ dt.score_rank_score }</TableCell>
                              </Fragment>
                            )
                          }))
                      })
                    }
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Điểm</TableCell>
                    {
                      ScoreRankDetail.map((sr, index) => {
                        return (sr.detail_info.map((dt, index) => {
                          return (
                            <Fragment key={index}>
                              <TableCell className={`${
                                (Number(dt.score_rank_score) === Number(data?.score_rank)) ? 'active' : null
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
                                Number(dt.score_rank_score) === Number(data?.score_rank) ? (
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
        </Grid> : <p className="text-center text-secondary py-2 text-15">Khách hàng chưa từng phát sinh quan hệ tín dụng</p>
        }
        
      </CardInside>
    </div>
  );
};

export default CreditScoreInfo;
