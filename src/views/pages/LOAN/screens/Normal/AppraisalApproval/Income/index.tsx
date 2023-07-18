/* eslint-disable no-useless-computed-key */
import { Divider } from '@mui/material';
import useBackdrop from 'app/hooks/useBackdrop';
import { fetchDataGuideState } from 'features/loan/normal';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import { saveLOANApprovalINCOME, setActiveINCOMEApproval } from 'features/loan/normal/storageApproval/income/action';
import { checkIncomeApprovalExistData, getLOANNormalStorageApprovalIncomeTotalData } from 'features/loan/normal/storageApproval/income/selector';
import { getLOANApprovalSourceBorrowerUuid } from 'features/loan/normal/storageApproval/selectors';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import _ from 'lodash';
import { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import * as IncomeApprovalType from 'types/models/loan/normal/storageApproval/SourceIncomeForm';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import Steps from 'views/components/layout/Steps';
import { cicRouterNormal2 as cicRouterNormal, incomeMain, incomeSource, stageName, urlToIncomeSource } from 'views/pages/LOAN/utils';
import IncomeAbilityRepay from './IncomeAbilityRepay';
import IncomeBalance from './IncomeBalance';
import IncomeForm from './IncomeForm';
import { SxSteps } from './style';

const Income: FC = () => {
  const { showBackdrop } = useBackdrop();
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;


  const inComeType = params['*'].split('/')[2];
  const stepName = params['*'].split('/')[0];
  const current = incomeMain.indexOf(stepName);
  const mainPath = params['*'].split('/');
  const current_MainIncome = mainPath.length > 1 ? incomeMain[0] : mainPath[0];
  const current_Income_declare = mainPath.length > 1 ? mainPath[0] : '';
  const current_Income_source = mainPath.length > 1 ? mainPath[2] : '';
  const dispatch = useDispatch();
  const incomeOptions = urlToIncomeSource(inComeType) as keyof IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary;
  const incomData = useSelector(getLOANNormalStorageApprovalIncomeTotalData());
  const brwUuid = useSelector(getLOANApprovalSourceBorrowerUuid);
  const los_id = useSelector(getLOANNormalLOSId)

  const isActiveData = useSelector(checkIncomeApprovalExistData(current_Income_declare, params["*"].split('/')[1] ,current_Income_source))
  // const hasIncomeSoruce = useSelector(getLOANNormalIncomeDisbledByDeclare(current_Income_declare, params["*"].split('/')[1]))
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
  // console.log({current_MainIncome});
  const hasNoData = Object.keys(getDelareArr()).every(key => getDelareArr()[key].length === 0);

  useEffect(() => {
    if(params.stage === stageName[1] && current_MainIncome === "income"){
      if(!isActiveData && !hasNoData){
        onContinue()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params, isActiveData, current_MainIncome])
  
  const beforeChange = (_: number, next: number) => {
    const name = incomeMain[next];
    const uuid = params.uuid || '-';
    if (name === 'income') {
      let suffix = next === 0 ? `/borrower/${brwUuid}/salary` : '';
      navigate(`/loan/normal/${stageName[1]}/${params.id}/${name}${suffix}`);
      return true;
    }
    let suffix = next === 0 ? `/borrower/${uuid}/salary` : '';
    navigate(`/loan/normal/${stageName[1]}/${params.id}/income/${name}${suffix}`);
    return true;
  }

 
  
  useEffect(() => {
    dispatch(setActiveINCOMEApproval(current <= 0 ? incomeOptions : incomeMain[current]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  
  const onSave = () => {
    showBackdrop(true);
    // setTimeout(() => {
      dispatch(saveLOANApprovalINCOME(current <= 0 ? incomeOptions : incomeMain[current]));
    // }, 500);
  }

  const getPositionStept = () => {
    let position = "";
    if (stepName === "borrower") {
      switch (inComeType) {
        case "salary":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_BORROWER_SALARY;
          break;
        case "asset-rent":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_BORROWER_ASSRENT;
          break;
        case "business":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_BORROWER_BUSSINESS;
          break;
        case "company":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_BORROWER_COMPANY;
          break;
        case "stock":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_BORROWER_STOCK;
          break;
        case "deposit":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_BORROWER_DEPOSIT;
          break;
        case "pension":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_BORROWER_PENSION;
          break;
        case "other":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_BORROWER_OTHER;
          break;
      }
    }
    if (stepName === "marriage") {
      switch (inComeType) {
        case "salary":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_MARRIAGE_SALARY;
          break;
        case "asset-rent":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_MARRIAGE_ASSRENT;
          break;
        case "business":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_MARRIAGE_BUSSINESS;
          break;
        case "company":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_MARRIAGE_COMPANY;
          break;
        case "stock":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_MARRIAGE_STOCK;
          break;
        case "deposit":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_MARRIAGE_DEPOSIT;
          break;
        case "pension":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_MARRIAGE_PENSION;
          break;
        case "other":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_MARRIAGE_OTHER;
          break;
      }
    }

    if (stepName === "co-borrower") {
      switch (inComeType) {
        case "salary":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COBORROWER_SALARY;
          break;
        case "asset-rent":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COBORROWER_ASSRENT;
          break;
        case "business":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COBORROWER_BUSSINESS;
          break;
        case "company":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COBORROWER_COMPANY;
          break;
        case "stock":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COBORROWER_STOCK;
          break;
        case "deposit":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COBORROWER_DEPOSIT;
          break;
        case "pension":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COBORROWER_PENSION;
          break;
        case "other":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COBORROWER_OTHER;
          break;
      }
    }
    if (stepName === "co-payer") {
      switch (inComeType) {
        case "salary":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COPAYER_SALARY;
          break;
        case "asset-rent":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COPAYER_ASSRENT;
          break;
        case "business":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COPAYER_BUSSINESS;
          break;
        case "company":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COPAYER_COMPANY;
          break;
        case "stock":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COPAYER_STOCK;
          break;
        case "deposit":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COPAYER_DEPOSIT;
          break;
        case "pension":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COPAYER_PENSION;
          break;
        case "other":
          position = ETypeButtonBarRole.LOAN_S2_INCOME_INCOME_COPAYER_OTHER;
          break;
      }
    }
    if (stepName === "balance") {
      position = ETypeButtonBarRole.LOAN_S2_INCOME_BALANCE;
    }
    if (stepName === "ability-repay") {
      position = ETypeButtonBarRole.LOAN_S2_INCOME_ABILITY;
    }
    return position;
  }

  useEffect(() => {
    params.stage === "appraisal-approval" && dispatch(fetchDataGuideState({ los_id, position: getPositionStept() }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

  const onContinue = () => {
    if(hasNoData && current_MainIncome === "income"){
      navigate(`/loan/normal/appraisal-approval/${params.id}/income/balance`);
      return
    }
    const nextPosition = incomeMain.indexOf(current_MainIncome) + 1;
    const nextPositionCicRouterNormal = cicRouterNormal.indexOf(current_Income_declare) + 1;
    const nextPositionIncomeSource = incomeSource.indexOf(current_Income_source) + 1;
    if (current <= 0) {
      const lastIndexIncomeSource = incomeSource.length - 1;
      if (nextPositionIncomeSource <= lastIndexIncomeSource) {
        navigate(`/loan/normal/appraisal-approval/${params.id}/income/${mainPath[0]}/${mainPath[1]}/${incomeSource[nextPositionIncomeSource]}`);
      } else {
        const delareData = getDelareArr();
        let person = '-';
        const lastIndexCicRouterNormal = cicRouterNormal.length - 1;
        const currentPerson = cicRouterNormal[cicRouterNormal.indexOf(current_Income_declare)];
        person = currentPerson;
        const currentData: string[] = delareData[currentPerson as string];
        const existCurrentPerson = currentData.indexOf(mainPath[1]);
        const nextPerson = cicRouterNormal[nextPositionCicRouterNormal];
        const nextData: string[] = delareData[nextPerson as string];
        let route = '-';
        if (nextPositionCicRouterNormal <= lastIndexCicRouterNormal && existCurrentPerson === currentData.length - 1) {
          person = nextPerson;
          const exist = nextData.indexOf(mainPath[1]);
          if (exist === -1 && nextData.length > 0) {
            navigate(`/loan/normal/appraisal-approval/${params.id}/income/${person}/${nextData[0]}/${incomeSource[0]}`);
          } else {
            const index = cicRouterNormal.indexOf(person);
            const dataNext = cicRouterNormal.slice(index);
            const dataIdDelare = dataNext.map((item) => {
              return delareData[item as string];
            });
            const isCheck = (arr: any) => arr.length === 0;
            if (dataIdDelare.every(isCheck)) {
              navigate(`/loan/normal/appraisal-approval/${params.id}/income/${incomeMain[nextPosition]}`);
            } else {
              for (let index = 1; index <= (cicRouterNormal.length - 1); index++) {
                const nextPersonNonData = cicRouterNormal[index];
                const nextDataNonData = delareData[nextPersonNonData as string];
                if (nextDataNonData.length > 0) {
                  navigate(`/loan/normal/appraisal-approval/${params.id}/income/${nextPersonNonData}/${nextDataNonData[exist + 1]}/${incomeSource[0]}`);
                }
              }
            }
          }
          setTimeout(function () {
            // eslint-disable-next-line no-restricted-globals
           location.reload()
         }, 10);
        } else if (existCurrentPerson !== currentData.length - 1) {
          //case next by user
          if (existCurrentPerson === -1 && currentData.length > 0) {
            route = currentData[0];
          } else if (currentData[existCurrentPerson + 1]) {
            route = currentData[existCurrentPerson + 1];
          }
          navigate(`/loan/normal/appraisal-approval/${params.id}/income/${person}/${route}/${incomeSource[0]}`);
        } else {
          navigate(`/loan/normal/appraisal-approval/${params.id}/income/${incomeMain[nextPosition]}`);
        }
      }
    } else {
      const lastIncomeMain = incomeMain.length - 1;
      if (nextPosition <= lastIncomeMain) {
        navigate(`/loan/normal/appraisal-approval/${params.id}/income/${incomeMain[nextPosition]}`);
      } else {
        navigate(`/loan/normal/appraisal-approval/${params.id}/collatera-app`);
      }
    }
  }

  const onBack = () => {
    if(hasNoData && current_MainIncome === "income"){
      navigate(`/loan/normal/appraisal-approval/${params.id}/loan/loan-method`);
      return
    }
    const backPosition = incomeMain.indexOf(current_MainIncome) - 1;
    const backPositionCicRouterNormal = cicRouterNormal.indexOf(current_Income_declare) - 1;
    const backPositionIncomeSource = incomeSource.indexOf(current_Income_source) - 1;
    const lastIncomesource = incomeSource[incomeSource.length - 1];
    const delareData = getDelareArr();

    if (current <= 0) {
      if (backPositionIncomeSource >= 0) {
        navigate(`/loan/normal/appraisal-approval/${params.id}/income/${mainPath[0]}/${mainPath[1]}/${incomeSource[backPositionIncomeSource]}`);
      } else {
        const currentPerson = cicRouterNormal[cicRouterNormal.indexOf(current_Income_declare)];
        const currentData: string[] = delareData[currentPerson as string];
        let route = '-';
        const existCurrentPerson = currentData.indexOf(mainPath[1]);
        if (backPositionCicRouterNormal >= 0) {
          // change user
          if (existCurrentPerson === 0) {
            const backPerson = cicRouterNormal[backPositionCicRouterNormal];
            const backData: string[] = delareData[backPerson as string];
            let route = '-';
            if (backData.length > 0) {
              route = backData[backData.length - 1];
            }
            if (backData.length === 0) {
              for (let index = (cicRouterNormal.length - 2); index >= 0; index--) {
                const backPersonNonData = cicRouterNormal[index];
                const backDataNonData = delareData[backPersonNonData as string];
                if (backDataNonData.length > 0) {
                  navigate(`/loan/normal/appraisal-approval/${params.id}/income/${backPersonNonData}/${backDataNonData[backDataNonData?.length - 1]}/${lastIncomesource}`);
                  break;
                }
              }
            } else {
              navigate(`/loan/normal/appraisal-approval/${params.id}/income/${backPerson}/${route}/${lastIncomesource}`);
            }
          } else {
            route = currentData[existCurrentPerson - 1];
            navigate(`/loan/normal/appraisal-approval/${params.id}/income/${currentPerson}/${route}/${lastIncomesource}`);
          }
        } else {
          navigate(`/loan/normal/appraisal-approval/${params.id}/loan/product`);
        }
      }
    } else {
      if (current <= 1) {
        let backPerson = cicRouterNormal[cicRouterNormal.length - 1];
        const personData: string[] = delareData[backPerson as string];
        let last = _.last(incomeSource);
        let route = '-';
        if (personData.length > 0) {
          route = personData[personData.length - 1];
        } else {
          backPerson = 'borrower';
          route = _.get(delareData, [backPerson, 0], '-');
          last = _.get(incomeSource, [0], '-');
        }
        navigate(`/loan/normal/appraisal-approval/${params.id}/income/${backPerson}/${route}/${last}`);
      } else {
        navigate(`/loan/normal/appraisal-approval/${params.id}/income/${incomeMain[backPosition]}`);
      }
    }
  }

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.appraise: // phê duyệt
        onSave();
        break;
      case ETypeButton.confirm:
        showBackdrop(true)
        dispatch(callControlComfirm({ position: getPositionStept(), title: "" }));
        break;
      case ETypeButton.approve:
        showBackdrop(true)
        dispatch(callApprovalApprove({ position: getPositionStept(), title: "" }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true)
        dispatch(callDisConfirm({ title: "", position: getPositionStept() }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true)
        dispatch(callDisApproved({ title: "", position: getPositionStept() }));
        break;
    }
  }

  const onExit = () => navigate(`/`);
  
  return (
    <Fragment>
      <Steps
        className="my-6 mscb-loan-normal-income"
        sx={SxSteps}
        current={!!~current ? current : 0}
        onChange={beforeChange}
        steps={[
          {
            node: "A",
            label: "Nguồn thu nhập",
            hasSub: true
            // hasSub: !Object.keys(getDelareArr()).every(key => getDelareArr()[key].length === 0),
            // disabled: Object.keys(getDelareArr()).every(key => getDelareArr()[key].length === 0),
          },
          {
            node: "B",
            label: "Cân đối thu nhập - chi phí",
            hasSub: false
          },
          {
            node: "C",
            label: "Khả năng trả nợ gốc lãi",
            hasSub: false
          },
        ]}
      >
        <Routes>
          <Route>
            <Route path=":declare">
              <Route path=":uuid/*" element={<IncomeForm />} />
            </Route>
          </Route>
        </Routes>
        <Routes>
          <Route path="balance" element={<IncomeBalance />} />
        </Routes>
        <Routes>
          <Route path="ability-repay" element={<IncomeAbilityRepay />} />
        </Routes>
      </Steps >
      <Divider className="my-6" />
      {/* <ButtonBar
        className="pb-6"
        labelSave="Xử lý thẩm định"
        isDelete={false}
        onSave={ onSave }
        onContinue={ onContinue }
        onBack={ onBack }
        onExit={ onExit }
      /> */}
      <ButtonBarRole
        hideSave={false}
        hideContinue={false}
        hideDelete={false}
        onBtnMenu={(item) => onSaveMenu(item)}
        disableContinue={false} // check rule continue
        onExit={onExit}
        isApply={true}
        onContinue={onContinue}
        onBack={onBack}
        className="mb-6"
        positionCode={getPositionStept()}
      />
    </Fragment>
  )
}

export default Income;