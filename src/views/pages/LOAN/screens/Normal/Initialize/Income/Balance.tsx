import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMasterData from "app/hooks/useMasterData";
import useNormalIncomeMessage from "app/hooks/useNormalIncomeMessage";
import { fetchLOANNormalDataBalanceAbility } from "features/loan/normal/configs/actions";
import { setIncomeSourceBalanceData, setIncomeSourceBalanceDataDesc } from "features/loan/normal/storage/income/action";
import {
  getLOANNormalStorageIncomeSourceBalance
} from "features/loan/normal/storage/income/selector";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { ILOANNormalStorageIncomeBalance } from "types/models/loan/normal/storage/Income";
import { formatNumber } from "utils";
import Input from "views/components/base/Input";
import TextArea from "views/components/base/TextArea";
import ModalConfirm from "views/components/layout/ModalConfirm";
import TitleSquare from "views/components/layout/TitleSquare";

const IncomeBalance: FC = () => {
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  const balance = useSelector(getLOANNormalStorageIncomeSourceBalance());
  // const balanceDesc = useSelector(getLOANNormalStorageIncomeSourceBalanceDesc());


  const [visibleModal,setVisibleModal ]= useState<{key:keyof ILOANNormalStorageIncomeBalance,oldValue:number, message:string}|null>(null);
  const total_income = balance.totalIncome ?? 0;
  const total_cost = balance.totalCost ?? 0;
  const occasionalIncomeAmount = balance.occasionalIncomeAmount ?? 0;
  const permanentIncomeAmount = balance.permanentIncomeAmount ?? 0;
  const differentValue = balance.differentValue??0;
  const getMessage = useNormalIncomeMessage();  
  const { ValidateMaCostType, register } = useMasterData()
    
  useEffect(() => {
    register('validateMaCostType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getNameCostType = (code : string) => {
    return ValidateMaCostType.find(e => e.code === code)?.value ?? ""
  }
  useEffect(()=>{
    dispatch(fetchLOANNormalDataBalanceAbility(params.id ?? ''));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const onChangeDataBalance = (
    value: string,
    key: keyof ILOANNormalStorageIncomeBalance
  ) => {
    dispatch(setIncomeSourceBalanceData(+value, { key }));
  };
  const onChangeDataBalanceDesc = (
    value: string,
    key: keyof ILOANNormalStorageIncomeBalance
  ) => {
    dispatch(setIncomeSourceBalanceDataDesc(value, { key }));
  };
  const handleOnCloseModal = ()=>{
    if(!visibleModal)return ;
    const {key,oldValue,message} = visibleModal;
    setVisibleModal(null);
  }
  const ruleDisabled = useSelector(getRuleDisbled)


  return (
    <Box className="mt-6">
      <Box>
        <Grid
          container
          spacing={3}
          sx={{
            "&>.MuiGrid-root": {
              minWidth: "20%",
              maxWidth: "20%",
            },
            "& .Mui-disabled input": {
              color: "var(--mscb-danger)!important",
              WebkitTextFillColor: "var(--mscb-danger)!important",
              fontWeight: "bold",
            },
          }}
        >
          <Grid item>
            <Input
              format
              type="number"
              label="1. Tổng thu nhập (VND)"
              required
              disabled
              value={total_income.toString()}
              // message={getMessage('balance', '1234', 'totalIncome', {})}
            />
          </Grid>
          <Grid item>
            <Input
              format
              type="number"
              label="1.1 Tổng thu nhập thường xuyên (VND)"
              disabled
              value={permanentIncomeAmount.toString()}
              // onDebounce={() => onChangeDataBalance(TotalFREQ.toString(), 'totalRegularIncome')}
            />
          </Grid>
          <Grid item>
            <Input
              format
              type="number"
              label="1.2 Tổng thu nhập không thường xuyên (VND)"
              disabled
              value={occasionalIncomeAmount.toString()}
              // onDebounce={() => onChangeDataBalance(TotalINFREQ.toString(), 'totalIrregularIncome')}
            />
          </Grid>
          <Grid item>
            <Input
              format
              type="number"
              label="2. Tổng chi phí (VND)"
              required
              disabled
              value={total_cost.toString()}
              // message={getMessage('balance', 'balance', 'totalCost', {})}
            />
          </Grid>
          <Grid item>
            <Input
              format
              label="3. Cân đối Thu nhập - Chi phí (VND)"
              required
              disabled
              value={formatNumber(differentValue.toString())}
              message={getMessage('balance', 'balance', 'differentValue', {})}
            />
          </Grid>
        </Grid>
      </Box>
      <TitleSquare className="mt-6">CHI TIẾT CHI PHÍ</TitleSquare>
      <Box className="mt-3 mb-6">
        <Grid
          container
          spacing={3}
          sx={{
            "& .Mui-disabled": {
              fontWeight: "500",
              WebkitTextFillColor: "var(--mscb-danger) !important",
            },
          }}
        >
          <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
            <Input
              format
              type="number"
              disabled={ruleDisabled}
              label={`1. ${getNameCostType(balance.familyCost.id)}`}
              onDebounce={(val) => onChangeDataBalance(val, "familyCost")}
              value={(balance.familyCost.value || '').toString()}
            />
            <TextArea 
              label='Diễn giải'
              maxlength={500}
              className="mt-4"
              onDebounce={(val)=>{
                onChangeDataBalanceDesc(val,'familyCost')
              }}
              value={balance.familyCost.description ?? ""}
              disabled={ruleDisabled}
            />
          </Grid>
          
          <Grid item xl={3} lg={5} md={6} sm={12} xs={12}>
            <Input
              format
              type="number"
              disabled={ruleDisabled}
              label={`2. ${getNameCostType(balance.interestPayment.id)}`}
              onDebounce={(val) => onChangeDataBalance(val, "interestPayment")}
              value={(balance.interestPayment.value || '').toString()}
            />
            <TextArea 
              label='Diễn giải'
              maxlength={500}
              className="mt-4"
              onDebounce={(val)=>{
                onChangeDataBalanceDesc(val,'interestPayment')
              }}
              value={balance.interestPayment.description ?? ""}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
            <Input
              format
              type="number"
              disabled={ruleDisabled}
              onDebounce={(val) => onChangeDataBalance(val, "disbCost")}
              label={`3. ${getNameCostType(balance.disbCost.id)}`}
              value={(balance.disbCost.value || '').toString()}
            />
            <TextArea 
              label='Diễn giải'
              maxlength={500}
              className="mt-4"
              onDebounce={(val)=>{
                onChangeDataBalanceDesc(val,'disbCost')
              }}
              value={balance.disbCost.description ?? ""}
              disabled={ruleDisabled}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
            <Input
              format
              type="number"
              disabled={ruleDisabled}
              onDebounce={(val) => onChangeDataBalance(val, "otherCost")}
              label={`4. ${getNameCostType(balance.otherCost.id)}`}
              value={(balance.otherCost.value || '').toString()}
            />
            <TextArea 
              label='Diễn giải'
              maxlength={500}
              className="mt-4"
              onDebounce={(val)=>{
                onChangeDataBalanceDesc(val,'otherCost')
              }}
              value={ balance.otherCost.description ?? "" } 
              disabled={ ruleDisabled }
            />
          </Grid>
        </Grid>
      </Box>
        <ModalConfirm
        open={Boolean(visibleModal)}
        disabledActions={["close"]}
        onClose={handleOnCloseModal}
        onConfirm={handleOnCloseModal}
        labelConfirm="OK"
      >
        <Box className="text-18 font-medium text-primary text-center">
        {Boolean(visibleModal?.message)?visibleModal?.message :"Cảnh báo Tổng Chi phí đang lớn hơn Tổng thu nhập"}
        </Box>
      </ModalConfirm>
    </Box>
  );
};

export default IncomeBalance;
