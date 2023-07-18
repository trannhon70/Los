import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system';
import { FC, useRef } from 'react';
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import Label from 'views/components/base/Label';
import CardInside from 'views/components/layout/CardInside';
import ObjectList from 'views/components/layout/ObjectList';
import TitleSquare from 'views/components/layout/TitleSquare';
import SelectCollateralType from '../../../../components/widgets/SelectCollateralType';

export interface CICDetailProps {
  type: string;
}


const CICDetail: FC<CICDetailProps> = props => {

  // const { type } = props;

  // const selectCollateralRef = useRef<SelectCollateralTypeRef>(null);
  // const params = useParams() as ILOANURLParams;
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const notify = useNotify();

  // const declareURL = params['*'];
  // const declare = urlToDeclare(declareURL);
  // const organ = params.organ as keyof ILOANNormalStorageCICState;
  // const currentIdentity = useSelector(getLOANNormalStorageCICIdentityActive(organ, declare));
  // const CurrentCreditGroup = useSelector(getLOANNormalStorageCICCurrentCreditGroup(organ, declare, currentIdentity));
  // const uuid = CurrentCreditGroup?.activeCredit;
  // const CurrentCredit = CurrentCreditGroup?.credit?.find(c => c.uuid === uuid);
  // const { TypeTermLoan } = useMasterData();
  // const CurrentActiveLOAN = TypeTermLoan?.findIndex(p => p.id === CurrentCredit?.detail.loan.active);
  // const CurrentDataLOAN = CurrentCredit?.detail.loan.list?.find(l => l.code === CurrentCredit?.detail.loan.active);

  // const CurrentCardList = CurrentCredit?.detail.card.list ?? [];
  // const CurrentActiveCard = CurrentCardList?.findIndex(c => c.uuid === CurrentCredit?.detail.card.active) ?? -1;
  // const CurrentCard = CurrentCardList[CurrentActiveCard];

  // const CurrentCollateralList = CurrentCredit?.detail.collateral.list ?? [];
  // const CurrentActiveCollateral = CurrentCollateralList?.findIndex(c => c.uuid === CurrentCredit?.detail.collateral.active) ?? -1;
  // const CurrentCollateral = CurrentCollateralList[CurrentActiveCollateral];

  // const clickReview = () => {
  //   navigate(`/loan/${type}/init/${params.id}/cic/${params.organ}/${declareURL}/review`);
  //   return ;
  // }

  // const changeLOANDate = (value: number | null) => {
  //   dispatch(setLOANNormalStorageCICCreditLOANDate(value, organ));
  // }

  // const changeCardDate = (value: number | null) => {
  //   dispatch(setLOANNormalStorageCICCreditCardDate(value, organ));
  // }

  // const changeCollateralDate = (value: number | null) => {
  //   dispatch(setLOANNormalStorageCICCreditCollateralDate(value, organ));
  // }

  // const changeActiveLOAN = (value: number) => {
  //   const code = TypeTermLoan?.find((_, i) => i === value)?.id ?? '';
  //   dispatch(setLOANNormalStorageCICCreditLOANActive(code, organ));
  // }

  // const changeActiveCard = (value: number) => {
  //   const code = CurrentCardList?.find((_, i) => i === value)?.uuid ?? '';
  //   dispatch(setLOANNormalStorageCICCreditCardActive(code, organ));
  // }

  // const changeActiveCollateral = (value: number) => {
  //   const uuid = CurrentCollateralList?.find((_, i) => i === value)?.uuid ?? '';
  //   dispatch(setLOANNormalStorageCICCreditCollateralActive(uuid, organ));
  // }

  // const changeExpiredLOAN = (value: string) => {
  //   const currentPos = !!~CurrentActiveLOAN ? CurrentActiveLOAN : 0;
  //   const code = TypeTermLoan[currentPos].id;
  //   dispatch(setLOANNormalStorageCICCreditLOANExpired(value?.length ? +value : null, { organ, code }));
  // }

  // const changeAmountLOAN = (value: string) => {
  //   const currentPos = !!~CurrentActiveLOAN ? CurrentActiveLOAN : 0;
  //   const code = TypeTermLoan[currentPos].id;
  //   dispatch(setLOANNormalStorageCICCreditLOANAmount(value?.length ? +value : null, { organ, code }));

  //   value && +value
  //     && CurrentDataLOAN?.balance !== undefined
  //     && CurrentDataLOAN?.balance !== null
  //     && +value < CurrentDataLOAN.balance
  //     && notify('Số tiền cấp tín dụng không được nhỏ hơn dư nợ.', 'warning');
  // }

  // const changeBalanceLOAN = (value: string) => {

  //   const currentPos = !!~CurrentActiveLOAN ? CurrentActiveLOAN : 0;
  //   const code = TypeTermLoan[currentPos].id;
  //   dispatch(setLOANNormalStorageCICCreditLOANBalance(value?.length ? +value : null, { organ, code }));

  //   value && +value
  //     && CurrentDataLOAN?.amount !== undefined
  //     && CurrentDataLOAN?.amount !== null
  //     && +value > CurrentDataLOAN.amount
  //     && notify('Dư nợ không được lớn hơn số tiền cấp tín dụng.', 'warning');
  // }

  // const clickAddCard = () => {
  //   CurrentCredit && CurrentCredit.basic.code &&
  //     dispatch(addLOANNormalStorageCICCreditCard(organ));
  // }

  // const clickAddCollateral = () => {
  //   CurrentCredit && CurrentCredit.basic.code &&
  //     dispatch(addLOANNormalStorageCICCreditCollateral(organ));
  // }

  // const changeLimitedCard = (value: string) => {
  //   dispatch(setLOANNormalStorageCICCreditCardLimited(value?.length ? +value : null, organ));
  //   value && +value
  //     && CurrentCard.balance !== undefined
  //     && CurrentCard.balance !== null
  //     && +value < CurrentCard.balance
  //     && notify('Hạn mức thẻ không được nhỏ hơn dư nợ thẻ.', 'warning');
  // }

  // const changeBalanceCard = (value: string) => {
  //   dispatch(setLOANNormalStorageCICCreditCardBalance(value?.length ? +value : null, organ));
  //   value && +value
  //     && CurrentCard?.limited !== undefined
  //     && CurrentCard?.limited !== null
  //     && +value > CurrentCard.limited
  //     && notify('Dư nợ thẻ không được lớn hơn hạn mức thẻ.', 'warning');
  // }

  // const changeCollateralCode = (value: string) => {
  //   dispatch(setLOANNormalStorageCICCreditCollateralCode(value, organ));
  // }

  // const changeCollateralValue = (value: string) => {
  //   dispatch(setLOANNormalStorageCICCreditCollateralValue(value?.length ? +value : null, organ));
  // }

  // const LOANSum = CurrentCredit?.detail.loan.list?.map(l => l.balance).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
  // const CARDSum = CurrentCardList?.map(c => c.balance).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
  // const COLLATERALSum = CurrentCollateralList?.map(c => c.value).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
  return <Box className="mt-6">
    <TitleSquare>
      Thông tin chi tiết
    </TitleSquare>
    <Grid container spacing={3}>
      <Grid item xl={4} lg={4} sm={12} md={12} xs={12}>
        <Box className="flex-column h-full">
          <Box className="my-3">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} sm={12} md={12} xs={12}>
                <Label bold>A. Tổng dư nợ vay thông thường</Label>
                <Box sx={{
                  height: '36px',
                  bgcolor: 'var(--mscb-danger)',
                  color: '#fff',
                  fontWeight: 500,
                  padding: '0 8px',
                  lineHeight: '36px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}>
                  {/* {LOANSum > 0 ? formatNumber(LOANSum.toString()) : ''} */}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="h-full">
            <CardInside
              title="Vay thông thường"
              classBody="h-full pr-0 pt-0"
              sx={{ height: 'calc(100% - 20px)' }}
              fieldsetClass="px-4"
              titleClass="px-2"
            >
              <Box className="p-6">
                <InputDate
                  label="I. Ngày cập nhật CIC"
                  // onChange={changeLOANDate}
                  // value={CurrentCredit?.detail.loan.date ?? null}
                  // disabled={ !CurrentCredit || !CurrentCredit.basic.code }
                />
              </Box>
              <Divider />
              <Box className="p-6">
                <Label bold>II. Chọn khoản vay</Label>
                <ObjectList
                  enableLength={false}
                  enableAdd={false}
                  enableMenu={false}
                  className="mb-6"
                  // isDisable={!CurrentCredit || !CurrentCredit.basic.code}
                  // options={
                  //   TypeTermLoan?.map(p => ({ label: p.name, circle: <FaHandHoldingUsd /> }))
                  // }
                  // onChange={changeActiveLOAN}
                  // current={!!~CurrentActiveLOAN ? CurrentActiveLOAN : 0}
                  sx={{
                    '& .ObjectListContent, & .MuiTabs-root, & .MuiTabs-flexContainer ': {
                      width: '100%'
                    },
                    '& .MuiTab-root': {
                      width: '25%'
                    },
                    '& .object-list-circle': {
                      bgcolor: '#d5d5d5',
                      '& svg': {
                        color: '#707070'
                      },
                      '&:hover': {
                        border: '1px solid var(--mscb-primary)',

                        '& svg': {
                          color: '#fff'
                        },
                      }
                    },
                    '& .object-list-box-name': {
                      textDecoration: 'none!important',
                      textTransform: 'initial!important' as SystemStyleObject<Theme>
                    },
                    '& .object-list-box': {
                      '&.active,&:hover': {
                        '& .object-list-circle': {
                          border: '1px solid var(--mscb-primary)!important',
                          bgcolor: 'var(--mscb-primary)',
                          '& svg': {
                            color: '#fff'
                          }
                        },
                        '& .object-list-box-name': {
                          color: 'var(--mscb-primary)!important'
                        }
                      }
                    }
                  }}
                />
                <Grid container spacing={3}>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      type="number"
                      label="1. Thời hạn cấp tín dụng (tháng)"
                      format
                      disabedNegative
                      // onDebounce={changeExpiredLOAN}
                      // value={(formatNumber(CurrentDataLOAN?.expired?.toString() ?? '')).toString()}
                      // value={CurrentDataLOAN?.expired?.toString() ?? ''}
                      // disabled={!CurrentCredit || !CurrentCredit.basic.code}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      type="number"
                      label="2. Số tiền cấp tín dụng (VNĐ)"
                      format
                      disabedNegative
                      // onDebounce={changeAmountLOAN}
                      // value={(formatNumber(CurrentDataLOAN?.amount?.toString() ?? '')).toString()}
                      // value={CurrentDataLOAN?.amount?.toString() ?? ''}
                      // disabled={!CurrentCredit || !CurrentCredit.basic.code}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      type="number"
                      label="3. Dư nợ (VNĐ)"
                      format
                      disabedNegative
                      // onDebounce={changeBalanceLOAN}
                      // value ={CurrentDataLOAN?.balance?.toString()??''}
                      // value={(formatNumber(CurrentDataLOAN?.balance?.toString() ?? '')).toString()}
                      // disabled={!CurrentCredit || !CurrentCredit.basic.code}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardInside>
          </Box>
        </Box>
      </Grid>
      <Grid item xl={4} lg={4} sm={12} md={12} xs={12}>
        <Box className="flex-column h-full">
          <Box className="my-3">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} sm={12} md={12} xs={12}>
                <Label bold>B. Tổng dư nợ thẻ tín dụng</Label>
                <Box sx={{
                  height: '36px',
                  bgcolor: 'var(--mscb-danger)',
                  color: '#fff',
                  fontWeight: 500,
                  padding: '0 8px',
                  lineHeight: '36px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}>
                  {/* {CARDSum > 0 ? formatNumber(CARDSum.toString()) : ''} */}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="h-full">
            <CardInside
              title="Thẻ tín dụng"
              classBody="h-full pr-0 pt-0"
              sx={{ height: 'calc(100% - 20px)' }}
              fieldsetClass="px-4"
              titleClass="px-2"
            >
              <Box className="p-6">
                <InputDate
                  label="I. Ngày cập nhật CIC"
                  // onChange={changeCardDate}
                  // value={CurrentCredit?.detail.card.date ?? null}
                  // disabled={!CurrentCredit || !CurrentCredit.basic.code || !CurrentCardList?.length}
                />
              </Box>
              <Divider />
              <Box className="p-6">
                <Label bold>II. Chọn thẻ tín dụng</Label>
                <ObjectList
                  enableLength={false}
                  enableMenu={false}
                  className="mb-6"
                  // isDisable={!CurrentCredit || !CurrentCredit.basic.code}
                  // current={!!~CurrentActiveCard ? CurrentActiveCard : 0}
                  // options={CurrentCardList?.map((_, i) => ({ label: `Thẻ TD ${i + 1}`, circle: <BsFillCreditCardFill /> }))}
                  // onAdd={clickAddCard}
                  // onChange={changeActiveCard}
                  sx={{
                    '& .object-list-circle': {
                      bgcolor: '#d5d5d5',
                      '& svg': {
                        color: '#707070'
                      },
                      '&:hover': {
                        border: '1px solid var(--mscb-primary)',

                        '& svg': {
                          color: '#fff'
                        },
                      }
                    },
                    '& .object-list-box-name': {
                      textDecoration: 'none!important',
                      textTransform: 'initial!important' as SystemStyleObject<Theme>
                    },
                    '& .object-list-add': {
                      '& .object-list-circle': {
                        bgcolor: 'rgba(24, 37, 170, 0.19)!important',
                        border: '1px solid transparent!important',
                        '& svg': {
                          color: 'var(--mscb-primary)!important'
                        }
                      }
                    },
                    '& .object-list-box': {
                      '&.active,&:hover': {
                        '& .object-list-circle': {
                          border: '1px solid var(--mscb-primary)',
                          bgcolor: 'var(--mscb-primary)',
                          '& svg': {
                            color: '#fff'
                          }
                        },
                        '& .object-list-box-name': {
                          color: 'var(--mscb-primary)!important'
                        }
                      }
                    }
                  }}
                />
                <Grid container spacing={3}>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      type="number"
                      label="1. Hạn mức thẻ (VNĐ)"
                      disabedNegative
                      format={true}
                      // disabled={!CurrentCredit || !CurrentCredit.basic.code || !CurrentCardList?.length}
                      // onDebounce={changeLimitedCard}
                      // value={(formatNumber(CurrentCard?.limited?.toString() ?? '')).toString()}
                      // value={CurrentCard?.limited?.toString() ?? ''}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      type="number"
                      label="2. Dư nợ thẻ (VNĐ)"
                      disabedNegative
                      format={true}
                      // disabled={!CurrentCredit || !CurrentCredit.basic.code || !CurrentCardList?.length}
                      // onDebounce={changeBalanceCard}
                      // value={CurrentCard?.balance?.toString() ?? ''}
                      // value={(formatNumber(CurrentCard?.balance?.toString() ?? '')).toString()}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardInside>
          </Box>
        </Box>
      </Grid>
      <Grid item xl={4} lg={4} sm={12} md={12} xs={12}>
        <Box className="flex-column h-full">
          <Box className="my-3">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} sm={12} md={12} xs={12}>
                <Label bold>C. Tổng dư nợ tài sản bảo đảm</Label>
                <Box sx={{
                  height: '36px',
                  bgcolor: 'var(--mscb-danger)',
                  color: '#fff',
                  fontWeight: 500,
                  padding: '0 8px',
                  lineHeight: '36px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}>
                  {/* {COLLATERALSum > 0 ? formatNumber(COLLATERALSum.toString()) : ''} */}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="h-full">
            <CardInside
              title="Tài sản bảo đàm"
              classBody="h-full pr-0 pt-0"
              sx={{ height: 'calc(100% - 20px)' }}
              fieldsetClass="px-4"
              titleClass="px-2"
            >
              <Box className="p-6">
                <InputDate
                  label="I. Ngày cập nhật CIC"
                  // onChange={changeCollateralDate}
                  // value={CurrentCredit?.detail.collateral.date ?? null}
                  // disabled={!CurrentCredit || !CurrentCredit.basic.code || !CurrentCollateralList?.length}
                />
              </Box>
              <Divider />
              <Box className="p-6">
                <Label bold>II. Chọn tài sản</Label>
                <ObjectList
                  enableLength={false}
                  enableMenu={false}
                  className="mb-6"
                  // isDisable={!CurrentCredit || !CurrentCredit.basic.code}
                  // current={!!~CurrentActiveCollateral ? CurrentActiveCollateral : 0}
                  // onChange={changeActiveCollateral}
                  // onAdd={clickAddCollateral}
                  // options={CurrentCollateralList?.map((_, i) => ({ label: `Tài sản ${i + 1}`, circle: <FaHandHoldingUsd /> }))}
                  sx={{
                    '& .object-list-circle': {
                      bgcolor: '#d5d5d5',
                      '& svg': {
                        color: '#707070'
                      },
                      '&:hover': {
                        border: '1px solid var(--mscb-primary)',

                        '& svg': {
                          color: '#fff'
                        },
                      }
                    },
                    '& .object-list-box-name': {
                      textDecoration: 'none!important',
                      textTransform: 'initial!important' as SystemStyleObject<Theme>
                    },
                    '& .object-list-add': {
                      '& .object-list-circle': {
                        bgcolor: 'rgba(24, 37, 170, 0.19)!important',
                        border: '1px solid transparent!important',
                        '& svg': {
                          color: 'var(--mscb-primary)!important'
                        }
                      }
                    },
                    '& .object-list-box': {
                      '&.active,&:hover': {
                        '& .object-list-circle': {
                          border: '1px solid var(--mscb-primary)',
                          bgcolor: 'var(--mscb-primary)',
                          '& svg': {
                            color: '#fff'
                          }
                        },
                        '& .object-list-box-name': {
                          color: 'var(--mscb-primary)!important'
                        }
                      }
                    }
                  }}
                />
                <Grid container spacing={3}>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <SelectCollateralType
                      label="1. Tên loại TSBĐ"
                      // ref={selectCollateralRef}
                      // value={CurrentCollateral?.code ?? ''}
                      // disabled={!CurrentCredit || !CurrentCredit.basic.code || !CurrentCollateralList?.length}
                      // onChange={changeCollateralCode}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Input
                      type="number"
                      label="2. Giá trị TSBĐ (VNĐ)"
                      format
                      disabedNegative
                      // value={CurrentCollateral?.value?.toString() ?? ''}
                      // value={(formatNumber(CurrentCollateral?.value?.toString() ?? '')).toString()}
                      // disabled={!CurrentCredit || !CurrentCredit.basic.code || !CurrentCollateralList?.length}
                      // onDebounce={changeCollateralValue}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardInside>
          </Box>
        </Box>
      </Grid>
    </Grid>
    {/* <Box className="text-right mt-6">
      <Button
        variant="outlined"
        color="primary"
        disabled={!CurrentCredit}
        sx={{
          borderRadius: 0
        }}
        onClick={clickReview}
      >
        Xem lại thông tin CIC
      </Button>
    </Box> */}
  </Box>

}

export default CICDetail;