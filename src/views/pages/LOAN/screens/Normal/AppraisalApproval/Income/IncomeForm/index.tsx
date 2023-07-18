import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCodeDocumentTypeChildListIncome } from 'features/loan/normal/configs/document-type/selectors';
import {
  setIncomeApprovalDeclareActive,
  setIncomeApprovalDeclarePositionActive,
  setIncomeSourceApprovalActive
} from 'features/loan/normal/storageApproval/income/action';
import {
  getLOANApprovalSourceBorrowerUuid, getLOANApprovalSourceCoBorrowerUuid,
  getLOANApprovalSourceCoPayerUuid, getLOANApprovalSourceMarriageUuid, getLOANNormalStorageApprovalIncomeTotalData
} from 'features/loan/normal/storageApproval/income/selector';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import * as IncomeApprovalType from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import { Document, ILOANNormalStorageIncomeDeclare } from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import { pathKeyStore } from 'utils';
import Steps from 'views/components/layout/Steps';
import DeclareStepIncome from 'views/components/widgets/DeclareStepIncome/indexApproval';
import { DeclareName, stageName, urlToDeclare } from 'views/pages/LOAN/utils';
import IncomeSteps from './IncomeSteps';
import stepStyleIncome from './style';

const IncomeForm: FC = () => {

  const classes = stepStyleIncome();

  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  
  const brwUuid = useSelector(getLOANApprovalSourceBorrowerUuid);
  const mrgUuid = useSelector(getLOANApprovalSourceMarriageUuid);
  const coBrw = useSelector(getLOANApprovalSourceCoBorrowerUuid);
  const coPayer = useSelector(getLOANApprovalSourceCoPayerUuid);
  const incomData = useSelector(getLOANNormalStorageApprovalIncomeTotalData());

  const dispatch = useDispatch();
  const declare = urlToDeclare(params.declare ?? '') as keyof ILOANNormalStorageIncomeDeclare;
  const current = DeclareName.indexOf(params.declare ?? '');

  const ChildListIncome = useSelector(getCodeDocumentTypeChildListIncome(pathKeyStore({document_group_type: "NGUON_THU", type_loan: "Loan"}), "pension"))
  
  const incomeDocument: Document[] = ChildListIncome?.map(cl => ({
    data_file: [],
    document_id: Number(cl.id),
    document_name: cl.name.toString(),
    document_type: cl.type.toString(),
  })) 


  const beforeChange = (_: number, next: number) => {
    const { id } = params;
    const declare = DeclareName[next];
    const uuid = [
      brwUuid,
      mrgUuid,
      coBrw[0]?.uuid,
      coPayer[0]?.uuid
    ][next] || '-';
    navigate(`/loan/normal/${stageName[1]}/${id}/income/${declare}/${uuid}/salary`);
    return true;
  }


  const beforeChangeUser = (type: string) => (_: number, next: number) => {
    const { declare } = params;
    const uuid = (type === 'cop' ? coPayer : coBrw)[next].uuid;
    navigate(`/loan/normal/${stageName[1]}/${params.id}/income/${declare}/${uuid}/salary`);
  }
  useEffect(() => {
    dispatch(setIncomeApprovalDeclareActive(declare, { declare: declare as keyof ILOANNormalStorageIncomeDeclare })) &&
    dispatch(setIncomeApprovalDeclarePositionActive(params.uuid ?? '-', { declare: declare as keyof ILOANNormalStorageIncomeDeclare })) &&
    dispatch(setIncomeSourceApprovalActive(params['*'] === "asset-rent" ? "assetRent" : params['*'], { declare: declare as keyof ILOANNormalStorageIncomeDeclare })) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [declare , params])

  useEffect(() => {
    if (declare === "borrower" && params.uuid === "-" && brwUuid?.length > 0){
      navigate(`/loan/normal/${stageName[1]}/${params.id}/income/${declare}/${brwUuid}/salary`);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [declare, params.uuid])

  const getDelareArr = () => {
    const objectData: { [key: string]: string[] } = {
      'borrower': [],
      'marriage': [],
      'co-borrower': [],
      'co-payer': [],
    }
    const getUuid = (key: string) => (item: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary) => {
      if (objectData[key] && item.uuidDeclare) {
        objectData[key].push(item.uuidDeclare);
      }
    };

    incomData.borrower.dataPosition.forEach(getUuid('borrower'));
    incomData.marriage.dataPosition.forEach(getUuid('marriage'));
    incomData.coborrower.dataPosition.forEach(getUuid('co-borrower'));
    incomData.copayer.dataPosition.forEach(getUuid('co-payer'));

    return objectData;
  }
  const hasSub = Object.keys(getDelareArr()).map(key => getDelareArr()[key].length !== 0)
  // if(Object.keys(getDelareArr()).every(key => getDelareArr()[key].length === 0)) {
  //   return <Empty sx={{
  //     minHeight: 400,
  //     "& img": {
  //       width: "23%"
  //     },
  //     fontSize: '20px',
  //     fontWeight: 300,
  //     // fontStyle: 'italic',
  //   }}>
  //     Chưa có dữ liệu
  //   </Empty>
  // }

  return <DeclareStepIncome
    isSub
    // nodeNumber
    incomeStepsTotal={true}
    current={!!~current ? current : 0}
    hasSub={hasSub}
    beforeChange={beforeChange}
    exclude={['LAW_RLT', 'RELATED', 'OTHER']}
    type='loan'
    alternative
    nodeRoman
    className={`declare-normal-income ${classes.stepIncome}`}
  >
    <IncomeSteps typeDeclare={'borrower'}  />
    <IncomeSteps  typeDeclare={'marriage'} />
    <Steps
      alternative
      onChange={beforeChangeUser('cob')}
      classStep={classes.stepUserItem}
      className={`step-user ${classes.stepUserCoBrw}
      ${coBrw?.length === 2 && classes.stepUserCoBrwLength2}
      ${coBrw?.length === 3 && classes.stepUserCoBrwLength3}
      ${coBrw?.length === 4 && classes.stepUserCoBrwLength4}
      ${coBrw?.length > 4 && classes.stepUserCoBrwMore}
      `}
      steps={
        coBrw?.length ?
        coBrw?.map((c, i) => ({ label: c.full_name, node: <AccountCircleIcon />, hasSub: true, isTooltip: true })) :
          []
      }
    >
      {
        coBrw?.length ?
        coBrw?.map((item) => <IncomeSteps typeDeclare={`co-borrower/${item.uuid}`} key={item.uuid} />) :
          <IncomeSteps typeDeclare={'co-borrower/add-new'}  />
      }
    </Steps>
    <Steps
      alternative
      onChange={beforeChangeUser('cop')}
      className={`step-user ${classes.stepUserCoPayer}
      ${coPayer?.length === 2 && classes.stepUserCoPayerLength2}
      ${coPayer?.length === 3 && classes.stepUserCoPayerLength3}
      ${coPayer?.length === 4 && classes.stepUserCoPayerLength4}
      ${coPayer?.length > 4 && classes.stepUserCoPayerMore}
      `}
      classStep={classes.stepUserItem}
      steps={
        coPayer?.length ?
          coPayer?.map((c, i) => ({ label: c.full_name, node: <AccountCircleIcon />, hasSub: true, isTooltip: true })) :
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