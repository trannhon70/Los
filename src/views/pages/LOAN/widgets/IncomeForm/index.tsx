import { FC, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import { DeclareName, stageName, urlToDeclare, urlToIncomeSource } from '../../utils';
import IncomeSteps from './IncomeSteps';
// import {
//   getLOANNormalLegalCoBorrower,
//   getLOANNormalLegalCoPayer,
//   getLOANNormalLegalFirstMarriageUuid,
//   getLOANNormalLegalFirstUuid
// } from 'features/loan/normal/storage/selectors';
import { Document, ILOANNormalStorageIncomeDeclare } from 'types/models/loan/normal/storage/Income';
import DeclareStepIncome from 'views/components/widgets/DeclareStepIncome';
import { pathKeyStore } from 'utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Steps from 'views/components/layout/Steps';
import {
  checkDataUserList,
  getLOANNormalLegalBorrowerUuid,
  getLOANNormalLegalCoBorrower,
  getLOANNormalLegalCoPayer,
  getLOANNormalLegalMarriageUuid
} from 'features/loan/normal/storage/income/selector';
import { useDispatch, useSelector } from 'react-redux';
import { assignLegalDataToIncome,
  setIncomeDeclareActive,
  setIncomeDeclarePositionActive,
  setIncomeSourceActive
} from 'features/loan/normal/storage/income/action';
import { fetchDataDocumentType } from 'features/loan/normal/configs/actions';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import stepStyleIncome from './style';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
const IncomeForm: FC = () => {

  const classes = stepStyleIncome();
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();

  const brwUuid = useSelector(getLOANNormalLegalBorrowerUuid);
  const mrgUuid = useSelector(getLOANNormalLegalMarriageUuid);
  const coBrw = useSelector(getLOANNormalLegalCoBorrower);

  const coPayer = useSelector(getLOANNormalLegalCoPayer);

  const declare = urlToDeclare(params.declare ?? '') as keyof ILOANNormalStorageIncomeDeclare;
  const sourceIncome = urlToIncomeSource(params['*'] ?? '');


  const current = DeclareName.indexOf(params.declare ?? '');

  const cobCurrent = coBrw?.findIndex((c) => c.uuid === params.uuid);
  const copCurrent = coPayer?.findIndex(c => c.uuid === params.uuid);
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbled)
  const checkDisabledUserList = useSelector(checkDataUserList(declare))

  useLayoutEffect(() => {
    dispatch(fetchDataDocumentType({document_group_type: "NGUON_THU", type_loan: "Loan"}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "pension"))

  const incomeDocument: Document[] = ChildListIncome?.map(cl => ({
    data_file: [],
    document_id: Number(cl.id),
    document_name: cl.name.toString(),
    document_type: cl.type.toString(),
  })) 

  useEffect(() => {
    if (params.stage === stageName[0] && declare === "borrower" && params.uuid === "-" && brwUuid?.length > 0){
      navigate(`/loan/normal/init/${params.id}/income/${declare}/${brwUuid}/salary`);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [declare, params.uuid])

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIncomeSourceActive(sourceIncome, { declare: declare as keyof ILOANNormalStorageIncomeDeclare }))
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(setIncomeDeclareActive(declare, { declare: declare as keyof ILOANNormalStorageIncomeDeclare })) &&
    dispatch(setIncomeDeclarePositionActive(params.uuid ?? '', { declare: declare as keyof ILOANNormalStorageIncomeDeclare })) &&
    dispatch(assignLegalDataToIncome(params.uuid ?? '', { declare: declare as keyof ILOANNormalStorageIncomeDeclare, incomeDocument:incomeDocument})) &&
    dispatch(setIncomeSourceActive(sourceIncome, { declare: declare as keyof ILOANNormalStorageIncomeDeclare })) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [declare, params.uuid])

  // useEffect(() => {
  //   dispatch(setIncomeSourceActive(sourceIncome, { declare: declare as keyof ILOANNormalStorageIncomeDeclare }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sourceIncome])

  const beforeChange = (_: number, next: number) => {
    const { id } = params;
    const declare = DeclareName[next];
    const uuid = [
        brwUuid,
        mrgUuid,
        coBrw[0]?.uuid,
        coPayer[0]?.uuid
      ][next] || '-';
    navigate(`/loan/normal/init/${id}/income/${declare}/${uuid}/salary`);
    return true;
  }

  const beforeChangeUser = (type: string) => (_: number, next: number) => {
    const { declare } = params;
    const uuid = (type === 'cop' ? coPayer : coBrw)[next].uuid;
    navigate(`/loan/normal/init/${params.id}/income/${declare}/${uuid}/salary`);
  }


  return <DeclareStepIncome
    isSub
    // nodeNumber
    incomeStepsTotal={true}
    current={!!~current ? current : 0}
    hasSub={[true, true, true, true, true, true]}
    beforeChange={beforeChange}
    exclude={['LAW_RLT', 'RELATED', 'OTHER']}
    type='loan'
    alternative
    nodeRoman
    className={`declare-normal-income ${classes.stepIncome}`}
  >
    <IncomeSteps typeDeclare={'borrower'} />
    <IncomeSteps typeDeclare={'marriage'} />
    {/* <IncomeSteps />
    <IncomeSteps /> */}
    <Steps
      current={!!~cobCurrent ? cobCurrent : 0}
      className={`step-user ${classes.stepUserCoBrw}
      ${coBrw?.length === 2 && classes.stepUserCoBrwLength2}
      ${coBrw?.length === 3 && classes.stepUserCoBrwLength3}
      ${coBrw?.length === 4 && classes.stepUserCoBrwLength4}
      ${coBrw?.length > 4 && classes.stepUserCoBrwMore}
      `}
      onChange={beforeChangeUser('cob')}
      classStep={classes.stepUserItem}
      steps={
        coBrw?.length ?
          coBrw?.map((c, i) => ({ label: c.full_name, node: <AccountCircleIcon />, hasSub: true, isTooltip: true ,disabled: ruleDisabled && checkDisabledUserList[i]})) :
          []
      }
    >
      {
        coBrw?.length ?
          coBrw?.map((item) => <IncomeSteps typeDeclare={`co-borrower/${item.uuid}`} key={item.uuid}/>) :
          <IncomeSteps typeDeclare={'co-borrower/add-new'}  />
      }
    </Steps>
    <Steps
      className={`step-user ${classes.stepUserCoPayer} 
      ${coPayer?.length === 2 && classes.stepUserCoPayerLength2}
      ${coPayer?.length === 3 && classes.stepUserCoPayerLength3}
      ${coPayer?.length === 4 && classes.stepUserCoPayerLength4}
      ${coPayer?.length > 4 && classes.stepUserCoPayerMore}
      `}
      current={!!~copCurrent ? copCurrent : 0}
      onChange={beforeChangeUser('cop')}
      classStep={classes.stepUserItem}
      steps={
        coPayer?.length ?
          coPayer?.map((c,i) => ({ label: c?.full_name, node: <AccountCircleIcon />, hasSub: true, isTooltip: true,disabled: ruleDisabled && checkDisabledUserList[i]})) :
          []
      }
    >
      {
        coPayer?.length ?
          coPayer?.map((item) => <IncomeSteps typeDeclare={`co-payer/${item.uuid}`} key={item.uuid} />) :
          <IncomeSteps typeDeclare={'co-payer/add-new'} />
      }
    </Steps>
  </DeclareStepIncome>
}

export default IncomeForm;