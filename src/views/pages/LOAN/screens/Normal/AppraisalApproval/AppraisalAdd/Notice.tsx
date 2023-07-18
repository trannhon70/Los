import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import useNormalApprovalAdditionalMessage from 'app/hooks/useNormalApprovalAdditionalMessage';
import {
  addConditions, deleteCondition, updateNoticeCreditInfo, updateNoticeInfo, updateNoticeOpinion, updateProductRegulations
} from "features/loan/normal/storageApproval/additionalApproval/actions";
import { getApprovalNotice } from "features/loan/normal/storageApproval/additionalApproval/selectors";
import { FC, Fragment, useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  ConditionsType,
  IAANoticeBasicInfo,
  IAANoticeCreditInfo, IAANoticeOpinion, IAAProductRegulations, IConditionDeleteInfo
} from "types/models/loan/normal/storageApproval/AdditionalAppraisal";
import Input from "views/components/base/Input";
import InputDate from "views/components/base/InputDate";
import Select from "views/components/base/Select";
import CardInside from "views/components/layout/CardInside";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { getRuleDisbledReappraise } from 'features/loan/normal/storageGuide/selector';
const Notice: FC = () => {
  const tab = 'approval_notice'
  const dispatch = useDispatch()
  const notice = useSelector(getApprovalNotice)
  const { NoticeTitle, register } = useMasterData()
  
  useEffect(() => {
    register('noticeTitle')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getMessage = useNormalApprovalAdditionalMessage()
  const [deleteConditionInfo, setDeleteConditionInfo] = useState<IConditionDeleteInfo | null>(null)
  const ruleDisabled = useSelector(getRuleDisbledReappraise)
  const handleChangeNoticeInfo = (field: keyof IAANoticeBasicInfo ) => (value :string | number | null) => {
    dispatch(updateNoticeInfo({field, value}))
  }
  const handleChangeCreditInfo = (field: keyof IAANoticeCreditInfo ) => (value :string | number | null) => {
    dispatch(updateNoticeCreditInfo({field, value}))
  }
  const handleChangeOpinion = (field: keyof IAANoticeOpinion ) => (value :string) => {
    dispatch(updateNoticeOpinion({field, value}))
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
  const handleChangeProductRegulation = (field: keyof IAAProductRegulations, index?: number) => (value: string) => {
    dispatch(updateProductRegulations({tab ,field, index, value}))
  }

  return (
    <Grid container spacing={3}>
      <Grid item xl={6} md={6} xs={12}>
        <CardInside
          title="I. Thông tin cơ bản"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2"
        >
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} xs={12}>
              <Input
                label="1. Số thông báo phê duyệt của P.PDTD"
                required
                disabled={ruleDisabled}
                value={notice?.basic_info?.number_approval_notice ?? ""}
                //placeholder="XXXXX/P.PDTDKHCN.22.00"
                onDebounce={handleChangeNoticeInfo('number_approval_notice')}
                message={getMessage('number_approval_notice')}
              />
            </Grid>
            <Grid item xl={6} md={6} xs={12}>
              <InputDate 
                label="2. Thời gian xuất thông báo" 
                value={(notice?.basic_info?.notice_export_time ?? 0)*1000}
                required 
                disabled={ruleDisabled}
                onChange={handleChangeNoticeInfo('notice_export_time')}
                message={getMessage('notice_export_time')}
              />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <Select
                label="3. Tiêu đề thông báo"
                value={notice?.basic_info?.announcement_title}
                options={NoticeTitle?.map(e => ({value: e.code, label: e.name })) ?? []}
                required
                disabled={ruleDisabled}
                onChange={handleChangeNoticeInfo('announcement_title')}
                message={getMessage('announcement_title')}
              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={6} md={6} xs={12}>
        <CardInside
          title="I. Thông tin tờ trình"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2"
        >
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} xs={12}  sx={{
                  "& .Mui-disabled": {
                    WebkitTextFillColor: "#eb0029 !important",
                    fontWeight: "500",
                  },
                }}>
              <Input
                label="1. Số tiền vay (VND)"
                required
                disabled
                type="number"
                format
                value={notice?.credit_grant_information?.loan_amount?.toString() ?? ""}
               
              />
            </Grid>
            <Grid item xl={6} md={6} xs={12}>
              <Input
                label="2. Số tiền vay bằng chữ"
                required
                disabled
                value={notice?.credit_grant_information?.loan_amount_in_words ?? ""}
                onDebounce={handleChangeCreditInfo('loan_amount_in_words')}
                message={getMessage('loan_amount_in_words')}
                sx={{
                  "& input": {
                    WebkitTextFillColor: "#353535 !important",
                    fontWeight: "500",
                  },
                }}
              />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <Input
                label="3. Tổng HM cấp tín dụng (VND)"
                required
                type="number"
                format
                disabled={ruleDisabled}
                value={notice?.credit_grant_information?.total?.toString() ?? ""}
                onDebounce={handleChangeCreditInfo('total')}
                message={getMessage('total')}

              />
            </Grid>
          </Grid>
        </CardInside>
      </Grid>
      <Grid item xl={6} md={6} xs={12}>
        <CardInside
          title="III. Quy định sản phẩm"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2"
        >
          <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
              <Grid container spacing={3}>
                <Grid item xl={12} md={12} xs={12}>
                  <Typography variant="h6" className="text-14">
                    1. Điều kiện trước giải ngân <span className="text-danger">(*)</span>
                  </Typography>
                  {
                    notice.product_regulations?.disbursement_conditions?.map((condition, index) => (
                      <Box className="flex items-start" key={index}>
                        <Input 
                          sx={{ marginTop: '12px' }} 
                          value={condition.disbursement_conditions_detail}
                          disabled={ruleDisabled}
                          onDebounce={handleChangeProductRegulation('disbursement_conditions', index)}
                          message={getMessage('disbursement_conditions_detail', index)}
                        /> 
                        {
                          index !== 0 && <IconButton
                          className="ml-3 mt-3"  
                            onClick={() => setDeleteConditionInfo({tab, field: ConditionsType.Before, index, uuid: condition.uuid})}
                          >
                            <IoTrashOutline style={{fontSize: '1.5rem', color: 'var(--mscb-primary)'}}/>
                          </IconButton>
                        } 
                        
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
                    2. Điều kiện sau giải ngân <span className="text-danger">(*)</span>
                  </Typography>
                  {
                    notice?.product_regulations?.conditions_after_disbursements?.map((condition, index) => (
                      <Box className="flex items-start" key={index}>
                        <Input 
                          sx={{ marginTop: '12px' }} 
                          disabled={ruleDisabled}
                          value={condition.conditions_after_disbursement_detail}
                          onDebounce={handleChangeProductRegulation('conditions_after_disbursements', index)}
                          message={getMessage('conditions_after_disbursement_detail', index)}
                        />
                        {
                          index !== 0 && <IconButton 
                              className="ml-3 mt-3"  
                              disabled={ruleDisabled}
                              onClick={() => setDeleteConditionInfo({tab, field: ConditionsType.After, index, uuid: condition.uuid})}
                            >
                              <IoTrashOutline style={{fontSize: '1.5rem', color: 'var(--mscb-primary)'}}/>
                          </IconButton>
                        }
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
                      onClick={handleAddConditions(ConditionsType.After)}
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
                    3. Điều kiện khác <span className="text-danger"></span>
                  </Typography>
                  {
                    notice?.product_regulations?.conditions_other?.map((condition, index) => (
                      <Box className="flex items-start" key={index}>
                        <Input 
                        disabled={ruleDisabled}
                          sx={{ marginTop: '12px' }} 
                          value={condition?.conditions_other_detail}
                          onDebounce={handleChangeProductRegulation('conditions_other', index)}
                        />
                        <IconButton 
                          className="ml-3 mt-3"  
                          onClick={() => setDeleteConditionInfo({tab, field: ConditionsType.Other, index, uuid: condition.uuid})}
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
                    disabled={ruleDisabled}
                      variant="outlined"
                      color="primary"
                      className="ml-3"
                      sx={{
                        borderRadius: "unset",
                        display: "flex",
                        alignItems: "center",
                      }}
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
      <Grid item xl={6} md={6} xs={12}>
        <CardInside
          title="IV. Ý kiến"
          classBody="h-full p-6"
          sx={{ height: "calc(100% - 20px)" }}
          fieldsetClass="px-4"
          titleClass="px-2"
        >
          <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
              <Input 
                label="1. Nhân viên thẩm định"
                required
                disabled
                value={notice?.opinion?.appraisal_staff?.name ?? ""}
                sx={{
                  "& input": {
                    WebkitTextFillColor: "#353535 !important",
                    fontWeight: "500",
                  },
                }}
              />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <Input 
                label="2. Cấp phê duyệt"
                required
                value={notice?.opinion?.approval_level?.name ?? ""}
                onDebounce={handleChangeOpinion('approval_level')}
                disabled
                message={getMessage('approval_level')}
                sx={{
                  "& input": {
                    WebkitTextFillColor: "#353535 !important",
                    fontWeight: "500",
                  },
                }}
              />
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <Input 
                label="3. Chức danh người ký thông báo"
                disabled
                required
                value={notice?.opinion?.position_signing_notice ?? ""}
                sx={{
                  "& input": {
                    WebkitTextFillColor: "#353535 !important",
                    fontWeight: "500",
                  },
                }}
              />
            </Grid>
            {notice?.basic_info?.announcement_title === NoticeTitle[1]?.code &&
              <Fragment>
                <Grid item xl={12} md={12} xs={12}>
                  <Input 
                    label="4. Đề xuất"
                    required
                    value={notice?.opinion.offer ?? ""}
                    onDebounce={handleChangeOpinion('offer')}
                    message={getMessage('offer')}
                  />
                </Grid>
                <Grid item xl={12} md={12} xs={12}>
                  <Input 
                    label="5. Lý do"
                    value={notice?.opinion.reason ?? ""}
                    onDebounce={handleChangeOpinion('reason')}
                  />
                </Grid>
              </Fragment>
            }
            {/* <Grid item xl={12} md={12} xs={12}>
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
                >
                  Export file
                </Button>
              </Box>
            </Grid> */}
          </Grid>
        </CardInside>
      </Grid>
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
    </Grid>
  );
};

export default Notice;
