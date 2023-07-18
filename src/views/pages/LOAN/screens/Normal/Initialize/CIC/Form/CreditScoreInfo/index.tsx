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
import clsx from "clsx";
import { FC, Fragment, useEffect } from "react";
import { ILOANNormalStorageCICDeclareDataDetail } from "types/models/loan/normal/storage/CIC";
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
  declare?: string;
  data: ILOANNormalStorageCICDeclareDataDetail;
}
const CreditScoreInfo: FC<CreditScoreInfoProps> = (props) => {
  const { titleCard, disabled = false, data } = props;
  const classes = creditScoreInfoStyles();

  const { ScoreRankDetail, register } = useMasterData();
  
  useEffect(() => {
    register('scoreRankDetail')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // const params = useParams() as unknown as ILOANURLParams;

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
        <CardInside titleClass="text-16" title={titleCard} className={clsx(classes.root, classes.disabledInput)}>
          {
            data.credit_score_info.risk_info.score_value !== null ? <Grid container columnSpacing="20" rowSpacing="20">
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
                        sx={{
                          '& .Mui-disabled': {
                            WebkitTextFillColor: '#353535 !important'
                          }
                        }}
                        disabled={disabled}
                        label="1. Điểm"
                        value={(data?.credit_score_info?.risk_info?.score_value ?? '').toString()}
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
                        sx={{
                          '& .Mui-disabled': {
                            WebkitTextFillColor: '#353535 !important'
                          }
                        }}
                        // onChange={(val) => handleChangeValue(val, 'score_rank')}
                        value={data?.credit_score_info?.risk_info?.score_rank ?? ''}
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
                        sx={{
                          '& .Mui-disabled': {
                            WebkitTextFillColor: '#353535 !important'
                          }
                        }}
                        disabled={disabled}
                        label="3. Ngày chấm điểm"
                        // onChange={(val: number | null)=> handleChangeDate(val)}
                        value={Number(data?.credit_score_info?.risk_info?.publish_date) ?? null}
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
                        sx={{
                          '& .Mui-disabled': {
                            WebkitTextFillColor: '#353535 !important'
                          }
                        }}
                        disabled={disabled}
                        label="4. Đánh giá điểm tín dụng"
                        // onDebounce={(val: string | number | null) => handleChangeValue(val, 'evaluation')}
                        value={(data?.credit_score_info?.risk_info?.evaluation ?? '').toString()}
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
                      value={data?.credit_score_info?.risk_info?.customer_segment ?? []}
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
                                    ${(dt.score_rank_score === data?.credit_score_info?.risk_info?.score_rank) ? 'active' : null}
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
                                  (dt.score_rank_score === data?.credit_score_info?.risk_info?.score_rank) ? 'active' : null
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
                                  dt.score_rank_score === data?.credit_score_info?.risk_info?.score_rank ? (
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
