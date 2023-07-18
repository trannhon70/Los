import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import useNormalApprovalAdditionalMessage from 'app/hooks/useNormalApprovalAdditionalMessage';
import {
  addConditions, addNewPhoneNumber, deleteCondition, deletePhoneNumber,
  updateCreditGrantStatus,
  updateCreditInfo, updateCreditInfoHideFlag, updateExceptionValidation,
  updateLegalDueDiligence,
  updatePhoneAppraisal, updateProductRegulations, updateStaffProposal,
  updateStatementInfo
} from "features/loan/normal/storageApproval/additionalApproval/actions";
import { getStatementData } from "features/loan/normal/storageApproval/additionalApproval/selectors";
import { FC, useEffect, useRef, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  ConditionsType, IAACreditInfo,
  IAAException,
  IAALegal,
  IAAPhoneNumber,
  IAAProductRegulations,
  IAAStaffProposal,
  IAAStatementInfo, IConditionDeleteInfo, ILoanNormalApprovalAdditionalAppraisal, IPhoneDeleteInfo
} from "types/models/loan/normal/storageApproval/AdditionalAppraisal";
import Checkbox from "views/components/base/CheckboxCircle";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Radio, { RadioRef } from "views/components/base/Radio";
import Select from "views/components/base/Select";
import TextArea from "views/components/base/TextArea";
import CardInside from "views/components/layout/CardInside";
import Empty from "views/components/layout/Empty";
import ModalConfirm from "views/components/layout/ModalConfirm";
import AppraisalAddStyle, { SxTextAreaNoteH180, SxTextAreaNoteH60 } from "./style";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
import Label from "views/components/base/Label";
import { checkHasCollateralProduct } from "features/loan/normal/storage/product/selectors";
import TextTooltip from "views/components/base/TextTooltip";

const ReportPage: FC = () => {
  const tab: keyof ILoanNormalApprovalAdditionalAppraisal = 'statement'
  const statementData = useSelector(getStatementData)
  const classes = AppraisalAddStyle();
  const acceptRef = useRef<RadioRef>(null)
  const dispatch = useDispatch()
  const [acceptCreditGrant, setAcceptCreditGrant] = useState<boolean>(true);
  const [deleteConditionInfo, setDeleteConditionInfo] = useState<IConditionDeleteInfo | null>(null)
  const [deletePhoneNumberInfo, setDeletePhoneNumberInfo] = useState<IPhoneDeleteInfo | null>(null)
  const getMessage = useNormalApprovalAdditionalMessage()
  const { IsPass, ReasonForRefusal, register } = useMasterData()
  const hasCollateralProduct = useSelector(checkHasCollateralProduct)
  const [hiden] = useState<boolean>(true);
  
  useEffect(() => {
    register('isPass')
    register('reasonForRefusal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const IsPassOptions = IsPass?.map(e => ({value: e.code, label: e.name})) ?? []
  const ReasonForRefusalOptions = ReasonForRefusal?.map(e => ({value: e.code, label: e.name})) ?? []
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  useEffect(() => {
    setAcceptCreditGrant(statementData.appraisal_result.appraisal_staff_proposal.credit_grant_status === 'Y')
  },[statementData])

  const handleChangeCreditGrantStatus = () => {
    dispatch(updateCreditGrantStatus(acceptRef.current?.getValue().value ?? 'Y'))
  }

  const onDeletePhoneNumber = (info: IPhoneDeleteInfo | null) => () => {
    if(info){
      dispatch(deletePhoneNumber(true, {info}))
      setDeletePhoneNumberInfo(null)
    }
  }

  const handleAddPhoneNumber = () => {
    dispatch(addNewPhoneNumber())
  }

  const handleChangeStatementInfo = (field: keyof IAAStatementInfo ) => (value :string | number | null) => {
    dispatch(updateStatementInfo({field, value}))
  }
  const handleChangeLegalDueDiligence = (field: keyof IAALegal ) => (value :string) => {
    dispatch(updateLegalDueDiligence({field, value}))
  }
  const handleChangeExceptionValidation = (field: keyof IAAException ) => (value :string) => {
    dispatch(updateExceptionValidation({field, value}))
  }
  const handleChangePhoneAppraisal = (index: number , field: keyof IAAPhoneNumber) => (value: string) => {
    dispatch(updatePhoneAppraisal({index, field, value}))
  } 
  const handleChangeStaffProposal = (field: keyof IAAStaffProposal) => (value: string) => {
    dispatch(updateStaffProposal({field, value}))
  }
  const handleChangeCreditGrantHideFlag = (field: keyof IAACreditInfo) => (checked: boolean) => {
    dispatch(updateCreditInfoHideFlag({field, value : checked}))
  }
  const handleChangeCreditGrantinfo = (field: keyof IAACreditInfo) => (value: string) => {
    dispatch(updateCreditInfo({field, value}))
  }
  const handleChangeProductRegulation = (field: keyof IAAProductRegulations, index?: number) => (value: string) => {
    dispatch(updateProductRegulations({tab, field, index, value}))
  }
  const handleAddConditions = (field : ConditionsType) => () => {
    dispatch(addConditions({tab, field}))  
  }
  const handleDeleteCondition = (info: IConditionDeleteInfo | null) => () => {
    if(info){
      dispatch(deleteCondition(true, {info}))
      setDeleteConditionInfo(null)
    }
  }
  console.log({statementData});
  
  return (
    <Grid container spacing={3}>
      <Grid item xl={12} md={12} xs={12}>
        <CardInside
          title="I. Thông tin tờ trình"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2"
        >
          <Grid container spacing={2}>
            <Grid item xl={2} md={4} xs={12}>
              <Input
                className={classes.inputHeight}
                label="1. Số TTTTĐ của P.PDTD"
                disabled={ruleDisabled}
                //placeholder="XXXXX/P.PDTDKHCN.22.00"
                required
                value={statementData?.statement_info?.number_credit_approval ?? ''}
                onDebounce={handleChangeStatementInfo('number_credit_approval')}
                message={getMessage('number_credit_approval')}
              />
            </Grid>
            <Grid item xl={2} md={4} xs={12}>
              <InputDate 
                className={classes.inputHeight}
                label="2. Thời gian xuất tờ trình" 
                disabled={ruleDisabled}
                required 
                value={(statementData?.statement_info?.statement_export_time ?? 0)*1000}
                onChange={handleChangeStatementInfo('statement_export_time')}
                message={getMessage('statement_export_time')}
                />
            </Grid>
            <Grid item xl={2} md={4} xs={12}>
              <Input
                className={classes.inputHeight}
                label="3. Số TTTTĐ của ĐVKD"
                required
                disabled={ruleDisabled}
                value={statementData?.statement_info?.number_business_unit}
                message={getMessage('number_business_unit')}
                onDebounce={handleChangeStatementInfo('number_business_unit')}
              />
            </Grid>
            <Grid item xl={2} md={4} xs={12}>
              <InputDate
                className={classes.inputHeight}
                label={ <TextTooltip sx={{width: '92%'}}>4. Thời gian xuất TTTĐ của ĐVKD</TextTooltip> as any} 
                disabled={ruleDisabled}
                required 
                value={(statementData?.statement_info?.business_unit_export_time ?? 0)*1000}
                onChange={handleChangeStatementInfo('business_unit_export_time')}
                message={getMessage('business_unit_export_time')}
              />
            </Grid>
            <Grid item xl={2} md={4} xs={12}>
              <Input
                className={classes.inputHeight}
                label="5. Tên ĐVKD"
                disabled
                required
                value={`${statementData?.statement_info?.business_unit_name} - ${statementData?.statement_info?.branch_name}`}
                sx={{
                  "& input": {
                    WebkitTextFillColor: "#353535 !important",
                    fontWeight: "500",
                  },
                }}
                // onDebounce={handleChangeStatementInfo('business_unit_name')}
                // message={getMessage('business_unit_name')}
              />
            </Grid>
            <Grid item xl={2} md={4} xs={12}>
              <Input
                className={classes.inputHeight}
                label="6. Mã vùng của ĐVKD"
                disabled
                required
                value={statementData?.statement_info?.business_unit_code}
                sx={{
                  "& input": {
                    WebkitTextFillColor: "#353535 !important",
                    fontWeight: "500",
                  },
                }}
                // onDebounce={handleChangeStatementInfo('business_unit_code')}
                // message={getMessage('business_unit_code')}
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={12} md={12} xs={12}>
        <Grid container spacing={3}>
          <Grid item xl={4} md={12} xs={12}>
            <CardInside
              title="II. Thẩm định pháp lý"
              classBody="h-full p-6"
              sx={{ height: "calc(100% - 20px)" }}
              fieldsetClass="px-4"
              titleClass="px-2"
            >
              <Grid container spacing={3}>
                <Grid item xl={12} md={12} xs={12}>
                  <TextArea
                    label="1. Đánh giá Hồ sơ pháp lý"
                    required
                    placeholder="Nội dung đánh giá"
                    disabled={ruleDisabled}
                    value={statementData?.legal_due_diligence?.legal_file_review}
                    sx={SxTextAreaNoteH180}
                    onDebounce={handleChangeLegalDueDiligence('legal_file_review')}
                    message={getMessage('legal_file_review')}
                  />
                </Grid>
                <Grid item xl={12} md={12} xs={12}>
                  <TextArea
                    label="2. Ghi chú về hồ sơ pháp lý"
                    placeholder="Ghi chú đánh giá"
                    disabled={ruleDisabled}
                    onDebounce={handleChangeLegalDueDiligence('note')}
                    value={statementData?.legal_due_diligence?.note}
                    sx={SxTextAreaNoteH180}
                  />
                </Grid>
              </Grid>
            </CardInside>
          </Grid>
          <Grid item xl={8} md={12} xs={12}>
            <Box className="flex-column h-full">
              <CardInside
                title="III. Thẩm định ngoại lệ"
                classBody="h-full p-6"
                sx={{ height: "calc(100% - 20px)" }}
                fieldsetClass="px-4"
                titleClass="px-2"
              >
                <Grid container spacing={3}>
                  <Grid item xl={12} md={12} xs={12}>
                    <Input
                      label="1. Mã Ngoại lệ nhập hệ thống CORE"
                      disabled
                      value={statementData?.exception_validation?.exception_code}
                      sx={{
                        "& input": {
                          WebkitTextFillColor: "#353535 !important",
                          fontWeight: "500",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Label className="font-medium">2. Cơ sở của ĐVKD</Label>
                    <p className="text-secondary my-0">
                      {statementData?.exception_validation?.business_unit_premises}
                    </p>
                    {/* <Input
                      label="2. Cơ sở của ĐVKD"
                      value={statementData?.statement_info?.branch_name}
                      disabled
                      sx={{
                        "& input": {
                          WebkitTextFillColor: "#353535 !important",
                          fontWeight: "500",
                          background: 'none'
                        },
                      }}
                      //onDebounce={handleChangeExceptionValidation('business_unit_premises')}
                    /> */}
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <TextArea
                      label="3. Đánh giá của NVTTĐ"
                      disabled={ruleDisabled}
                      value={statementData?.exception_validation?.staff_reviews}
                      placeholder="Nội dung đánh giá hồ sơ "
                      sx={SxTextAreaNoteH60}
                      onDebounce={handleChangeExceptionValidation('staff_reviews')}
                    />
                  </Grid>
                </Grid>
              </CardInside>
              <Box className="h-full mt-5">
                <CardInside
                  title="IV. Thẩm định qua số điện thoại"
                  classBody="h-full p-6"
                  sx={{ height: "calc(100% - 20px)" }}
                  fieldsetClass="px-4"
                  titleClass="px-2"
                >
                  <Grid container spacing={3}>
                      <Grid item xl={12} md={12} xs={12}>
                        {
                          statementData?.phone_number_appraisals !== null && statementData?.phone_number_appraisals?.length > 0 ?
                          statementData?.phone_number_appraisals?.map((l, i) => {
                            return (
                              <Box className="flex mb-3 items-start" key={i}>
                                <Grid container spacing={3}>
                                  <Grid item xl={4} md={4} xs={12}>
                                    <Input 
                                      disabled={ruleDisabled}
                                      label={`1. Số điện thoại ${i + 1}`} 
                                      value={l.phone_number} 
                                      onDebounce={handleChangePhoneAppraisal(i, 'phone_number')}
                                      message={getMessage('phone_number', i)}
                                    />
                                  </Grid>
                                  <Grid item xl={4} md={4} xs={12}>
                                    <Select 
                                      disabled={ruleDisabled}
                                      options={IsPassOptions} 
                                      label={`2. Kết quả ${i + 1}`} 
                                      value={l.result}
                                      onChange={handleChangePhoneAppraisal(i, 'result')}
                                      message={getMessage('result', i)}
                                    />
                                  </Grid>
                                  <Grid item xl={4} md={4} xs={12}>
                                    <Input 
                                      disabled={ruleDisabled}
                                      label={`3. Ghi chú ${i + 1}`} 
                                      value={l.note}
                                      onDebounce={handleChangePhoneAppraisal(i, 'note')}
                                      message={getMessage('note', i)}
                                    />
                                  </Grid>
                                </Grid>
                                <IconButton className="ml-3 mt-7"  onClick={() => setDeletePhoneNumberInfo({uuid: l.uuid, index: i})}>
                                    <IoTrashOutline style={{fontSize: '1.5rem', color: 'var(--mscb-primary)'}}/>
                                </IconButton>
                              </Box>
                            )
                          }) : <Empty >Không có số điện thoại</Empty>
                        }
                      </Grid>
                    <Grid item xl={12} xs={12} md={12}>
                      <Box className="flex justify-end">
                        <Button
                          variant="outlined"
                          color="primary"
                          className="ml-3"
                          sx={{
                            borderRadius: "unset",
                            display: "flex",
                            alignItems: "center",
                          }}
                          disabled={ruleDisabled}
                          onClick={handleAddPhoneNumber}
                        >
                          <AddIcon sx={{ fontSize: "16px" }} />
                          Thêm số điện thoại
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardInside>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} md={12} xs={12} className="h-full">
        <Box className="flex items-center">
          <Typography variant="h4" className="font-bold text-20 text-upper">
            kết quả thẩm định
          </Typography>
          {/* <Button
            variant="outlined"
            color="primary"
            className="ml-6"
            sx={{
              borderRadius: 0,
              boxShadow: "0 3px 6px 0 rgba(24, 37, 170, 0.2)",
            }}
          >
            Export file
          </Button> */}
        </Box>
        <CardInside
          title="I. Đề xuất của NV/CVTĐ"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2"
        >
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} xs={12}>
              <Grid container spacing={3}>
                <Grid item xl={12} md={12} xs={12}>
                  <Radio
                    sx={{
                      "& .MuiFormGroup-root": {
                        display: "flex",
                        flexDirection: "column",
                      },
                    }}
                    disabled={ruleDisabled}
                    ref={acceptRef}
                    onChange={handleChangeCreditGrantStatus}
                    variant="checkbox"
                    options={[
                      { value: "Y", label: "Đồng ý cấp tín dụng" },
                      { value: "N", label: "Không đồng ý cấp tín dụng" },
                    ]}
                    value={statementData.appraisal_result.appraisal_staff_proposal.credit_grant_status ?? "Y"}
                  />
                </Grid>
                <Grid item xl={12} md={12} xs={12}>
                  <Grid container spacing={3}>
                    {
                      acceptCreditGrant ? (
                        <>
                          <Grid item xl={6} xs={6} md={6} sx={{
                            "& .Mui-disabled": {
                              WebkitTextFillColor: "#eb0029 !important",
                              fontWeight: "500",
                            },
                          }}>
                            <Input
                              label="1. Số tiền vay (VND)"
                              value={statementData.appraisal_result.appraisal_staff_proposal.loan_amount.toString()}
                              type="number"
                              format
                              disabled
                              //onDebounce={handleChangeStaffProposal('loan_amount')}
                            />
                          </Grid>
                          <Grid item xl={6} xs={6} md={6}>
                            <Input
                              label="2. Thời hạn vay (tháng)"
                              disabled
                              value={statementData.appraisal_result.appraisal_staff_proposal.loan_term.toString()}
                              type='number'
                              sx={{
                                "& input": {
                                  WebkitTextFillColor: "#353535 !important",
                                  fontWeight: "500",
                                },
                              }}
                            />
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xl={6} xs={6} md={6}>
                            <Select
                              label="1. Mã lý do từ chối"
                              required
                              disabled={ruleDisabled}
                              options={ReasonForRefusalOptions}
                              message={getMessage('reason_for_refusal_code')}
                              value={statementData.appraisal_result.appraisal_staff_proposal.reason_for_refusal_code}
                              onChange={handleChangeStaffProposal('reason_for_refusal_code')}
                              sx={{
                                "& .MuiInputBase-root": {
                                  WebkitTextFillColor: "#eb0029 !important",
                                  fontWeight: "500",
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xl={6} xs={6} md={6}>
                            <Input
                              label="2. Đề xuất"
                              disabled={ruleDisabled}
                              value={statementData.appraisal_result.appraisal_staff_proposal.proposal}
                              onDebounce={handleChangeStaffProposal('proposal')}
                            />
                          </Grid>
                        </>
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={6} md={6} xs={6}>
              <TextArea
                disabled={ruleDisabled}
                required={!acceptCreditGrant}
                label={acceptCreditGrant ? "3. Ý khác" : "3. Lý do"}
                value={acceptCreditGrant ?
                      statementData.appraisal_result.appraisal_staff_proposal.another_idea : statementData.appraisal_result.appraisal_staff_proposal.reason }
                onDebounce={acceptCreditGrant ? handleChangeStaffProposal('another_idea') : handleChangeStaffProposal('reason') }
                message={getMessage('reason')}
                sx={{
                  "& textarea": {
                    height: "145px !important",
                    padding: "10px",
                    overflowY: "scroll!important ",
                    overflowX: "hidden!important",
                    border: "none",
                    resize: "none",
                    fontSize: "14px",
                    background: "#f2f3f9 !important",
                    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  },
                  "& textarea::-webkit-scrollbar": {
                    width: "5px",
                    borderRadius: "50px",
                  },
                  "& textarea::-webkit-scrollbar-thumb": {
                    WebkitBoxShadow:
                      "inset 0 0 6px rgba(0,0,0,0.5) !important",
                  },
                  "& textarea:focus": {
                    outline: "none",
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      {
        acceptCreditGrant ? (
          <>
            <Grid item xl={6} md={6} xs={6}>
              <CardInside
                title="II. Thông tin cấp tín dụng"
                classBody="h-full p-6"
                sx={{ height: "calc(100% - 20px)" }}
                fieldsetClass="px-4"
                titleClass="px-2"
              >
                <Grid container spacing={3}>
                  <Grid item xl={6} md={6} xs={6} sx={{
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "#eb0029 !important",
                      fontWeight: "500",
                    },
                  }}>
                    <Input
                      label='1. Tổng hạn mức cấp TD (VND)'
                      disabled
                      format
                      type="number"
                      value={statementData.appraisal_result.credit_grant_information.total_credit_limit?.toString()}
                    />
                  </Grid>
                  {/* <Grid item xl={6} md={6} xs={6} className="flex items-end">
                    <Checkbox
                      options={[
                        { value: "true", label: "Ẩn thông tin trên tờ trình" },
                      ]}
                      disabled={ruleDisabled}
                      sx={{color: '#353535'}}
                      onChecked={handleChangeCreditGrantHideFlag('hide_information_flag')}
                      checked={statementData.appraisal_result.credit_grant_information.hide_information_flag}
                    />
                  </Grid> */}
                  <Grid item xl={12} md={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xl={12} md={12} xs={12}>
                        <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                        <span className={classes.title}>THÔNG TIN CƠ BẢN</span>
                      </Grid>
                      <Grid item xl={6} md={6} xs={6}>
                        <Input label="2. Dư nợ vay có TSBĐ đề xuất (VND)"
                          type="number"
                          format
                          disabled={ruleDisabled || !hasCollateralProduct}
                          value={statementData.appraisal_result.credit_grant_information.loan_balance_collateral_propose.toString()}
                          onDebounce={handleChangeCreditGrantinfo('loan_balance_collateral_propose')}
                        />
                      </Grid>
                      <Grid item xl={6} md={6} xs={6}>
                        <Input label="3. Dư nợ vay không TSBĐ đề xuất (VND)"
                          type="number"
                          format
                          disabled={ruleDisabled || hasCollateralProduct}
                          value={statementData.appraisal_result.credit_grant_information.loan_balance_no_collateral_propose.toString()}
                          onDebounce={handleChangeCreditGrantinfo('loan_balance_no_collateral_propose')}

                        />
                      </Grid>
                      <Grid item xl={6} md={6} xs={6}>
                        <Input label="4. Dư nợ vay có TSBĐ hiện hữu (VND)"
                          type="number"
                          format
                          disabled={ruleDisabled}
                          value={statementData.appraisal_result.credit_grant_information.loan_balance_collateral_exist.toString()}
                          onDebounce={handleChangeCreditGrantinfo('loan_balance_collateral_exist')}

                        />
                      </Grid>
                      <Grid item xl={6} md={6} xs={6}>
                        <Input label="5. Dư nợ vay không TSBĐ hiện hữu (VND)"
                          type="number"
                          format
                          disabled={ruleDisabled}
                          value={statementData.appraisal_result.credit_grant_information.loan_balance_no_collateral_exist.toString()}
                          onDebounce={handleChangeCreditGrantinfo('loan_balance_no_collateral_exist')}

                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xl={12} md={12} xs={12}>
                        <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                        <span className={classes.title}>THÔNG TIN THẺ</span>
                      </Grid>
                      <Grid item xl={6} md={6} xs={6}>
                        <Input label="6. Thẻ tín dụng (VND)"
                          format
                          disabled={ruleDisabled}
                          type="number"
                          value={statementData.appraisal_result.credit_grant_information.credit_info.toString()}
                          onDebounce={handleChangeCreditGrantinfo('credit_info')}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardInside>
            </Grid>
            <Grid item xl={6} md={6} xs={6}>
              <CardInside
                title="III. Quy định sản phẩm ádas"
                classBody="h-full p-6"
                sx={{ height: "calc(100% - 20px)" }}
                fieldsetClass="px-4"
                titleClass="px-2"
              >
                <Grid container spacing={3}>
                  <Grid item xl={12} md={12} xs={12}>
                    <Input
                      label='1. Phụ lục quy định sản phẩm'
                      disabled={ruleDisabled}
                      value={statementData.appraisal_result.product_regulations.addendum}
                      onDebounce={handleChangeProductRegulation('addendum')}

                    />
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Input
                      label='2. Thông báo quy định sản phẩm'
                      value={statementData.appraisal_result.product_regulations.notification}
                      onDebounce={handleChangeProductRegulation('notification')}
                      message={getMessage('notification')}
                      required
                      disabled={ruleDisabled}
                    />
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xl={12} md={12} xs={12}>
                        <Typography variant="h6" className="text-14">
                          3. Điều kiện trước giải ngân <span className="text-danger">(*)</span>
                        </Typography>
                        {
                          statementData?.appraisal_result?.product_regulations?.disbursement_conditions?.map((condition, index) => (
                            <Box className="flex items-start" key={index}>
                              <Input
                                sx={{ marginTop: '12px' }}
                                disabled={ruleDisabled}
                                value={condition.disbursement_conditions_detail}
                                onDebounce={handleChangeProductRegulation('disbursement_conditions', index)}
                                message={getMessage('disbursement_conditions_detail', index)}
                              />
                              {/* {
                                index !== 0 &&  */}
                              <IconButton className="ml-3 mt-3"
                                disabled={ruleDisabled}
                                onClick={() => setDeleteConditionInfo({ tab, field: ConditionsType.Before, index, uuid: condition.uuid })}
                              >
                                <IoTrashOutline style={{ fontSize: '1.5rem', color: 'var(--mscb-primary)' }} />
                              </IconButton>
                              {/* } */}
                            </Box>
                          ))
                        }
                      </Grid>
                      <Grid item xl={12} md={12} xs={12}>
                        <Box className="flex justify-end">
                          <Button
                            variant="outlined"
                            color="primary"
                            className="ml-3"
                            sx={{
                              borderRadius: "unset",
                              display: "flex",
                              alignItems: "center",
                            }}
                            disabled={ruleDisabled}
                            onClick={handleAddConditions(ConditionsType.Before)}
                          >
                            <AddIcon sx={{ fontSize: "16px" }} />
                            Thêm điều kiện
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xl={12} md={12} xs={12}>
                        <Typography variant="h6" className="text-14">
                          4. Điều kiện sau giải ngân <span className="text-danger">(*)</span>
                        </Typography>
                        {
                          statementData?.appraisal_result?.product_regulations?.conditions_after_disbursements?.map((condition, index) => (
                            <Box className="flex items-start" key={index}>
                              <Input
                                sx={{ marginTop: '12px' }}
                                disabled={ruleDisabled}
                                value={condition.conditions_after_disbursement_detail}
                                onDebounce={handleChangeProductRegulation('conditions_after_disbursements', index)}
                                message={getMessage('conditions_after_disbursement_detail', index)}
                              />
                              {/* {
                                index !== 0 &&  */}
                              <IconButton className="ml-3 mt-3" disabled={ruleDisabled}
                                onClick={() => setDeleteConditionInfo({ tab, field: ConditionsType.After, index, uuid: condition.uuid })}
                              >
                                <IoTrashOutline style={{ fontSize: '1.5rem', color: 'var(--mscb-primary)' }} />
                              </IconButton>
                              {/* } */}
                            </Box>
                          ))
                        }
                      </Grid>
                      <Grid item xl={12} md={12} xs={12}>
                        <Box className="flex justify-end">
                          <Button
                            variant="outlined"
                            color="primary"
                            className="ml-3"
                            sx={{
                              borderRadius: "unset",
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={handleAddConditions(ConditionsType.After)}
                            disabled={ruleDisabled}
                          >
                            <AddIcon sx={{ fontSize: "16px" }} />
                            Thêm điều kiện
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xl={12} md={12} xs={12}>
                        <Typography variant="h6" className="text-14">
                          5. Điều kiện khác <span className="text-danger"></span>
                        </Typography>
                        {
                          statementData?.appraisal_result.product_regulations?.conditions_other?.map((condition, index) => (
                            <Box className="flex items-start" key={index}>
                              <Input
                                disabled={ruleDisabled}
                                sx={{ marginTop: '12px' }}
                                value={condition.conditions_other_detail}
                                onDebounce={handleChangeProductRegulation('conditions_other', index)}
                              />
                              <IconButton className="ml-3 mt-3"
                                disabled={ruleDisabled}
                                onClick={() => setDeleteConditionInfo({ tab, field: ConditionsType.Other, index, uuid: condition.uuid })}
                              >
                                <IoTrashOutline style={{fontSize: '1.5rem', color: 'var(--mscb-primary)'}}/>
                              </IconButton>
                            </Box>
                          ))
                        }
                      </Grid>
                      <Grid item xl={12} md={12} xs={12}>
                        <Box className="flex justify-end">
                          <Button
                            variant="outlined"
                            color="primary"
                            className="ml-3"
                            sx={{
                              borderRadius: "unset",
                              display: "flex",
                              alignItems: "center",
                            }}
                            disabled={ruleDisabled}
                            onClick={handleAddConditions(ConditionsType.Other)}
                          >
                            <AddIcon sx={{ fontSize: "16px" }} />
                            Thêm điều kiện
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardInside>
            </Grid>
            
          </>
        ) : null
      }
      {
        hiden ? (
          null 
        ):
        <>
          {/* cấp kiểm soát */}
          <Grid item xl={12} md={12} xs={12}>
            <Box className={classes.controlOpinion} >
              Ý KIẾN CẤP KIỂM SOÁT
            </Box>
            <CardInside
              title={<div className={classes.control} >Cấp kiểm soát 1</div>}
              className="pl-5 pb-5 pt-5"

            >
              <Grid container sx={{ fontSize: '14px' }}>
                <Grid item xs={2}>
                  Người kiểm soát: <span style={{ color: '#eb0029', fontWeight: 500 }}>Trần Hùng Dũng</span>
                </Grid>
                <Grid item xs={2}>
                  Chức vụ: <span style={{ fontWeight: 500 }}>Phó Phòng PDTD KHCN</span>
                </Grid>
              </Grid>
              <Divider className="mt-5 mb-2" />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <Radio
                      sx={{
                        "& .MuiFormGroup-root": {
                          display: "flex",
                          flexDirection: "column",
                        },
                      }}
                      variant="checkbox"
                      options={[
                        { value: "Y", label: "Đồng ý cấp tín dụng" },
                        { value: "N", label: "Không đồng ý cấp tín dụng" },
                      ]}
                    />
                  </Grid>
                  <Grid container spacing={3} >
                  <Grid item xs={6}>
                    <Input
                      label="1. Số tiền vai (VNĐ)"
                      type='number'
                      sx={{
                        "& input": {
                          WebkitTextFillColor: "#353535 !important",
                          fontWeight: "500",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      label="2. Thời hạng vai (tháng)"
                      type='number'
                      sx={{
                        "& input": {
                          WebkitTextFillColor: "#353535 !important",
                          fontWeight: "500",
                        },
                      }}
                    />
                  </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <TextArea
                    className="mt-2"
                    label="3. Ý khác"
                    sx={
                      {
                      "& textarea": {
                        height: "115px !important",
                        padding: "10px",
                        overflowY: "scroll!important ",
                        overflowX: "hidden!important",
                        border: "none",
                        resize: "none",
                        fontSize: "14px",
                        background: "#f2f3f9 !important",
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                      },
                      "& textarea::-webkit-scrollbar": {
                        width: "5px",
                        borderRadius: "50px",
                      },
                      "& textarea::-webkit-scrollbar-thumb": {
                        WebkitBoxShadow:
                          "inset 0 0 6px rgba(0,0,0,0.5) !important",
                      },
                      "& textarea:focus": {
                        outline: "none",
                      },
                    }
                  }
                  />
                </Grid>
              </Grid>

            </CardInside>
          </Grid>
          {/* cấp phê duyệt */}
          <Grid item xl={12} md={12} xs={12}>
            <Box className={classes.controlOpinion} >
              Ý KIẾN CẤP PHÊ DUYỆT
            </Box>
            <Grid item xl={12} md={12} xs={12}>
              <CardInside
                title='I. Đề xuất của CPD'
                className="pl-5 pb-5"
              >
               
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <Radio
                        sx={{
                          "& .MuiFormGroup-root": {
                            display: "flex",
                            flexDirection: "column",
                          },
                        }}
                        variant="checkbox"
                        options={[
                          { value: "Y", label: "Đồng ý cấp tín dụng" },
                          { value: "N", label: "Không đồng ý cấp tín dụng" },
                        ]}
                      />
                    </Grid>
                    <Grid container spacing={3} >
                    <Grid item xs={6}>
                      <Input
                        label="1. Số tiền vai (VNĐ)"
                        type='number'
                        sx={{
                          "& input": {
                            WebkitTextFillColor: "#353535 !important",
                            fontWeight: "500",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        label="2. Thời hạng vai (tháng)"
                        type='number'
                        sx={{
                          "& input": {
                            WebkitTextFillColor: "#353535 !important",
                            fontWeight: "500",
                          },
                        }}
                      />
                    </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TextArea
                      className="mt-2"
                      label="3. Ý khác"
                      sx={
                        {
                        "& textarea": {
                          height: "115px !important",
                          padding: "10px",
                          overflowY: "scroll!important ",
                          overflowX: "hidden!important",
                          border: "none",
                          resize: "none",
                          fontSize: "14px",
                          background: "#f2f3f9 !important",
                          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        },
                        "& textarea::-webkit-scrollbar": {
                          width: "5px",
                          borderRadius: "50px",
                        },
                        "& textarea::-webkit-scrollbar-thumb": {
                          WebkitBoxShadow:
                            "inset 0 0 6px rgba(0,0,0,0.5) !important",
                        },
                        "& textarea:focus": {
                          outline: "none",
                        },
                      }
                    }
                    />
                  </Grid>
                </Grid>

              </CardInside>
            </Grid>

            <Grid className="pt-4" item xl={12} md={12} xs={12}  >
              <CardInside
                title='II. Quy định sản phẩm'
                className="pl-5 pb-5"
              >
                <Grid container>
                  <Grid item xl={12} md={12} xs={12}>
                    <Typography variant="h6" className="text-14">
                      1. Điều kiện trước giải ngân <span className="text-danger">(*)</span>
                    </Typography>
                    <Box className="flex items-start">
                      <Input
                        sx={{ marginTop: '12px' }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Box className="flex justify-end mt-3">
                      <Button
                        variant="outlined"
                        color="primary"
                        className="ml-3"
                        sx={{
                          borderRadius: "unset",
                          display: "flex",
                          alignItems: "center",
                        }}
                      
                      >
                        <AddIcon sx={{ fontSize: "16px" }} />
                        Thêm điều kiện
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xl={12} md={12} xs={12}>
                    <Typography variant="h6" className="text-14">
                      2. Điều kiện sau giải ngân <span className="text-danger">(*)</span>
                    </Typography>
                    <Box className="flex items-start">
                      <Input
                        sx={{ marginTop: '12px' }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Box className="flex justify-end mt-3">
                      <Button
                        variant="outlined"
                        color="primary"
                        className="ml-3"
                        sx={{
                          borderRadius: "unset",
                          display: "flex",
                          alignItems: "center",
                        }}
                      
                      >
                        <AddIcon sx={{ fontSize: "16px" }} />
                        Thêm điều kiện
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xl={12} md={12} xs={12}>
                    <Typography variant="h6" className="text-14">
                      3. Điều kiện khác <span className="text-danger">(*)</span>
                    </Typography>
                    <Box className="flex items-start">
                      <Input
                        sx={{ marginTop: '12px' }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xl={12} md={12} xs={12}>
                    <Box className="flex justify-end mt-3">
                      <Button
                        variant="outlined"
                        color="primary"
                        className="ml-3"
                        sx={{
                          borderRadius: "unset",
                          display: "flex",
                          alignItems: "center",
                        }}
                      
                      >
                        <AddIcon sx={{ fontSize: "16px" }} />
                        Thêm điều kiện
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardInside>
            </Grid>
          </Grid>
        </>
      }
      
      <ModalConfirm
        open={deleteConditionInfo !== null}
        onClose={()=> setDeleteConditionInfo(null)}
        onConfirm={handleDeleteCondition(deleteConditionInfo)}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá Điều kiện này ?
        </Box>
        <Box className="text-center">
          Các thông tin của Điều kiện này sẽ mất hoàn toàn!
        </Box>
      </ModalConfirm>
      <ModalConfirm
        open={deletePhoneNumberInfo !== null}
        onClose={()=> setDeletePhoneNumberInfo(null)}
        onConfirm={onDeletePhoneNumber(deletePhoneNumberInfo)}
      >
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc muốn xoá Số điện thoại này ?
        </Box>
        <Box className="text-center">
          Các thông tin của Số điện thoại này sẽ mất hoàn toàn!
        </Box>
      </ModalConfirm>
    </Grid>
  );
};

export default ReportPage;