/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useBackdrop from 'app/hooks/useBackdrop';
import { fetchDataGuideState } from 'features/loan/normal';
import {
  clearDataLOANNormalINCOME,
  fetchDeclareIncomeDataWithLegal, handleContinueIncome, saveLOANNormalINCOME, setActiveINCOME
} from 'features/loan/normal/storage/income/action';
import {
  checkCurrentExistDataBeforeSave,
  checkDataUserList,
  getLoanDataIncomeTypeContinue,
  getLOANNormalIncomeCompletedByDeclare, getLOANNormalIncomeTabsCompleted,
  getLOANNormalStorageIncomeTotalData
} from 'features/loan/normal/storage/income/selector';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import {
  callApprovalApprove,
  callControlComfirm,
  callDisApproved,
  callDisConfirm
} from 'features/loan/normal/storageControl/action';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import _ from 'lodash';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import { ILOANNormalStorageIncomeDeclare, ILOANNormalStorageIncomeDeclareSalary } from 'types/models/loan/normal/storage/Income';
import Backdrop from 'views/components/base/Backdrop';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import Steps from 'views/components/layout/Steps';
import {
  cicRouterNormal2 as cicRouterNormal, incomeMain, incomeSource, urlToDeclare, urlToIncomeSource
} from 'views/pages/LOAN/utils';
import IncomeForm from 'views/pages/LOAN/widgets/IncomeForm';
import IncomeAbilityRepay from './AbilityRepay';
import IncomeBalance from './Balance';
import { SxSteps } from "./style";

const IncomeRoute: FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams() as unknown as ILOANURLParams;
  const stepName = params['*'].split('/')[0];
  const inComeType = params['*'].split('/')[2];
  const current = incomeMain.indexOf(stepName);
  const currentIncomeName = useRef(incomeMain[0]); // A B C
  const mainPath = params['*'].split('/');
  const current_MainIncome = mainPath.length > 1 ? incomeMain[0] : mainPath[0];
  const current_Income_declare = mainPath.length > 1 ? mainPath[0] : ''; // declare
  const current_Income_source = mainPath.length > 1 ? mainPath[2] : '';
  const { showBackdrop } = useBackdrop();
  const incomeOptions = urlToIncomeSource(inComeType) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const incomData = useSelector(getLOANNormalStorageIncomeTotalData());
  const ruleDisabled = useSelector(getRuleDisbled)
  const IncomeTabCompleted = useSelector(getLOANNormalIncomeTabsCompleted);
  const los_id = useSelector(getLOANNormalLOSId)

  const dataStepName = () => {
    let stepNameAdd = "";
    if (stepName === "borrower" || stepName === "marriage") {
      stepNameAdd = stepName
      return stepNameAdd;
    }
    else {
      stepNameAdd = `${stepName}/${params['*'].split('/')[1]}`
      return stepNameAdd;
    }
  }

  
  const declare = urlToDeclare(stepName ?? '') as keyof ILOANNormalStorageIncomeDeclare;
  const checkDisabledUserList = useSelector(checkDataUserList(declare))
  const incomeCompletedData = useSelector(getLOANNormalIncomeCompletedByDeclare(dataStepName()));
  const dataFilter = _.pickBy(incomeCompletedData, (val, key) => val === true) // filter item Disabled

  const current_uuid_person_params = params['*'].split('/')[1]

  const dataFilterIncomeSource = useSelector(getLoanDataIncomeTypeContinue)

  const nextRuleDisabled = Object.keys(dataFilter).map(item => {
    if (item === "assetRent") {
      item = "asset-rent"
      return item
    }
    return item
  })


  useEffect(() => {
    dispatch(fetchDeclareIncomeDataWithLegal('', null));
  }, []);



  const beforeChange = (_: number, next: number) => {
    const name = incomeMain[next];
    currentIncomeName.current = name;
    const uuid = params.uuid || '-';
    if (name === 'income') {
      let suffix = next === 0 ? `/borrower/${uuid}/salary` : '';
      navigate(`/loan/normal/init/${params.id}/${name}${suffix}`);
      return true;
    }
    let suffix = next === 0 ? `/borrower/${uuid}/salary` : '';
    navigate(`/loan/normal/init/${params.id}/income/${name}${suffix}`);
    return true;
  }

  useEffect(() => {
    dispatch(setActiveINCOME(current <= 0 ? incomeOptions : incomeMain[current]));
  }, [stepName]);

  const checkExistDataBeforeSave = useSelector(checkCurrentExistDataBeforeSave)

  const onSave = () => {
    // // showBackdrop(true);
    // setTimeout(() => {
    if(checkExistDataBeforeSave){
      dispatch(saveLOANNormalINCOME(current <= 0 ? incomeOptions : incomeMain[current]));
    }
    // }, 500);
  }
  const getDelareArr = () => {
    const objectData: { [key: string]: string[] } = {
      'borrower': [],
      'marriage': [],
      'co-borrower': [],
      'co-payer': [],
    }
    const getUuid = (key: string) => (item: ILOANNormalStorageIncomeDeclareSalary) => {
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
  
  const onBack = () => {
    const backPosition = incomeMain.indexOf(current_MainIncome) - 1;
    const backPositionCicRouterNormal = cicRouterNormal.indexOf(current_Income_declare) - 1;
    const backPositionIncomeSource = incomeSource.indexOf(current_Income_source) - 1;
    const lastIncomesource = incomeSource[incomeSource.length - 1];
    const delareData = getDelareArr();
    if(ruleDisabled){   
      const backPositionIncomeSourceBorrower = dataFilterIncomeSource.dataBorrowerIncomeSource?.indexOf(current_Income_source) - 1; // current incomeSource
      const backPositionIncomeSourceMarriage = dataFilterIncomeSource.dataMarriageIncomeSource?.indexOf(current_Income_source) - 1; // current incomeSource
      const person_uuid_coBorr = dataFilterIncomeSource?.dataCoBorrower?.map(item=>item.person_uuid)
      const person_uuid_coPayer = dataFilterIncomeSource?.dataCoPayer?.map(item=>item.person_uuid)
      const backperson_uuid = dataFilterIncomeSource.listPerson_uuid?.indexOf(current_uuid_person_params) - 1;
      const backIncomeSource = dataFilterIncomeSource.data?.find(item=>item.person_uuid === dataFilterIncomeSource.listPerson_uuid[backperson_uuid])?.incomeSource ?? []
      if(current_Income_declare === "borrower"){
        if(backPositionIncomeSourceBorrower < 0){
          navigate(`/loan/normal/init/${params.id}/loan/business/finance-analysis`);
        }
        else{
          navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${mainPath[1]}/${dataFilterIncomeSource.dataBorrowerIncomeSource[backPositionIncomeSourceBorrower]}`);
        }
      }
      if(current_Income_declare === "marriage"){
        if(backPositionIncomeSourceMarriage < 0){ // back to borrower 
          navigate(`/loan/normal/init/${params.id}/income/${dataFilterIncomeSource.routerIncomeDeclare[backperson_uuid]}/${dataFilterIncomeSource.listPerson_uuid[backperson_uuid]}/${backIncomeSource[backIncomeSource.length-1]}`);
        }
        else{
          navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${mainPath[1]}/${dataFilterIncomeSource.dataMarriageIncomeSource[backPositionIncomeSourceMarriage]}`);
        }
      }
      if(current_Income_declare === "co-borrower"){
        const backDeclareCoborrower = person_uuid_coBorr.indexOf(current_uuid_person_params) - 1
        const currentIncomeSourceByUuidPerson= dataFilterIncomeSource.dataCoBorrower?.find(item=>item.person_uuid === current_uuid_person_params)?.incomeSource ?? []
        const backPositionIncomeSourceCoborrower = currentIncomeSourceByUuidPerson?.indexOf(current_Income_source) - 1; // current incomeSource
        const backUserIncomeSource = dataFilterIncomeSource.dataCoBorrower.find((item,idx)=>idx === backDeclareCoborrower)?.incomeSource ?? []
        const backIncomeSource = dataFilterIncomeSource.data.find(item=>item.person_uuid === dataFilterIncomeSource.listPerson_uuid[backperson_uuid])?.incomeSource ?? []
        if(person_uuid_coBorr[person_uuid_coBorr.length-1] === current_uuid_person_params && backDeclareCoborrower > 0){  // 
          if(backPositionIncomeSourceCoborrower < 0){ // return back user list
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${person_uuid_coBorr[backDeclareCoborrower]}/${backUserIncomeSource[backUserIncomeSource.length-1]}`); 
          }else{
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${current_uuid_person_params}/${currentIncomeSourceByUuidPerson[backPositionIncomeSourceCoborrower]}`); // current user
          }
        }else{ // user list cuối cùng
         
          if(backPositionIncomeSourceCoborrower < 0){ //
            navigate(`/loan/normal/init/${params.id}/income/${dataFilterIncomeSource.routerIncomeDeclare[backperson_uuid]}/${dataFilterIncomeSource.listPerson_uuid[backperson_uuid]}/${backIncomeSource[backIncomeSource.length-1]}`); // return back type params and uuid person
          }else{
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${current_uuid_person_params}/${currentIncomeSourceByUuidPerson[backPositionIncomeSourceCoborrower]}`); // current user
          }
        }

      }
      if(current_Income_declare === "co-payer"){
        const backDeclareCopayer = person_uuid_coPayer.indexOf(current_uuid_person_params) - 1
        const currentIncomeSourceByUuidPerson= dataFilterIncomeSource.dataCoPayer?.find(item=>item.person_uuid === current_uuid_person_params)?.incomeSource ?? []
        const backPositionIncomeSourceCoPayer = currentIncomeSourceByUuidPerson?.indexOf(current_Income_source) - 1; // current incomeSource
        const backUserIncomeSource = dataFilterIncomeSource.dataCoPayer.find((item,idx)=>idx === backDeclareCopayer)?.incomeSource ?? []
        const backIncomeSource = dataFilterIncomeSource.data.find(item=>item.person_uuid === dataFilterIncomeSource.listPerson_uuid[backperson_uuid])?.incomeSource ?? []
        if(person_uuid_coPayer[person_uuid_coPayer.length-1] === current_uuid_person_params && backDeclareCopayer > 0){  // 
          if(backPositionIncomeSourceCoPayer < 0){ // return back user list
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${person_uuid_coPayer[backDeclareCopayer]}/${backUserIncomeSource[backUserIncomeSource.length-1]}`); 
          }else{
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${current_uuid_person_params}/${currentIncomeSourceByUuidPerson[backPositionIncomeSourceCoPayer]}`); // current user
          }
        }else{ // user list cuối cùng
         
          if(backPositionIncomeSourceCoPayer < 0){ //
            navigate(`/loan/normal/init/${params.id}/income/${dataFilterIncomeSource.routerIncomeDeclare[backperson_uuid]}/${dataFilterIncomeSource.listPerson_uuid[backperson_uuid]}/${backIncomeSource[backIncomeSource.length-1]}`); // return back type params and uuid person
          }else{
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${current_uuid_person_params}/${currentIncomeSourceByUuidPerson[backPositionIncomeSourceCoPayer]}`); // current user
          }
        }

      }
      if(current_MainIncome === "balance"){
        const backIncomeUser = dataFilterIncomeSource.data.find(item=>item.person_uuid === dataFilterIncomeSource.listPerson_uuid[dataFilterIncomeSource.listPerson_uuid.length-1])?.incomeSource ?? [] 
        navigate(`/loan/normal/init/${params.id}/income/${dataFilterIncomeSource.routerIncomeDeclare[dataFilterIncomeSource.routerIncomeDeclare.length-1]}/${dataFilterIncomeSource.listPerson_uuid[dataFilterIncomeSource.listPerson_uuid.length-1]}/${backIncomeUser[backIncomeUser.length-1]}`); // return back type params and uuid person
      }
      if(params['*'] === "ability-repay"){
        navigate(`/loan/normal/init/${params.id}/income/balance`);
      }

    }else{
      if (current <= 0) {
        if (backPositionIncomeSource >= 0) {
          navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${mainPath[1]}/${incomeSource[backPositionIncomeSource]}`);
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
                for (let index = 1; index <= (cicRouterNormal.length - 2); index--) {
                  const backPersonNonData = cicRouterNormal[index];
                  const backDataNonData = delareData[backPersonNonData as string];
                  if (backDataNonData.length > 0) {
                    navigate(`/loan/normal/init/${params.id}/income/${backPersonNonData}/${backDataNonData[backDataNonData?.length - 1]}/${lastIncomesource}`);
                    break;
                  }
                }
              } else {
                navigate(`/loan/normal/init/${params.id}/income/${backPerson}/${route}/${lastIncomesource}`);
              }
            } else {
              route = currentData[existCurrentPerson - 1];
              navigate(`/loan/normal/init/${params.id}/income/${currentPerson}/${route}/${lastIncomesource}`);
            }
  
          } else {
            navigate(`/loan/normal/init/${params.id}/loan/product`);
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
          navigate(`/loan/normal/init/${params.id}/income/${backPerson}/${route}/${last}`);
        } else {
          navigate(`/loan/normal/init/${params.id}/income/${incomeMain[backPosition]}`);
        }
      }
    }
  }

  const onDelete = () => dispatch(clearDataLOANNormalINCOME(current, { incomeMain: stepName }));

  const onContinue = () => {
    const delareData = getDelareArr();
    if(ruleDisabled){
      onContinueNextRule()
    }else{
    dispatch(handleContinueIncome(current <= 0 ? incomeOptions : incomeMain[current], {
      checkExistDataBeforeSave,
      delareData ,
      mainPath ,
      nextRuleDisabled ,
      current ,
      current_MainIncome ,
      current_Income_declare ,
      current_Income_source ,
      checkDisabledUserList,
    }))
  }
  }

  const onContinueNextRule = () =>{
    if(ruleDisabled){
      const nextperson_uuid = dataFilterIncomeSource.listPerson_uuid?.indexOf(current_uuid_person_params) + 1
      const nextPositionRouterDeclare = dataFilterIncomeSource.routerIncomeDeclare?.indexOf(current_Income_declare) + 1; // nguoi vay ....
      const person_uuid_coBorr = dataFilterIncomeSource?.dataCoBorrower?.map(item=>item.person_uuid)
      const person_uuid_coPayer = dataFilterIncomeSource?.dataCoPayer?.map(item=>item.person_uuid)
      const uuid_marriage = dataFilterIncomeSource.data?.find(item=>item.typeDeclare=== "MARRIAGE")?.person_uuid
      const nextIncomeSource = dataFilterIncomeSource.data?.find(item=>item.person_uuid === dataFilterIncomeSource.listPerson_uuid[nextperson_uuid])?.incomeSource ?? []
      if(current_Income_declare === "borrower"){
        const nextPositionIncomeSourceBorrower = dataFilterIncomeSource.dataBorrowerIncomeSource?.indexOf(current_Income_source) + 1; // current incomeSource
        if(dataFilterIncomeSource.dataBorrowerIncomeSource.length !== nextPositionIncomeSourceBorrower){
          navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${mainPath[1]}/${dataFilterIncomeSource.dataBorrowerIncomeSource[nextPositionIncomeSourceBorrower]}`);
        }else if(dataFilterIncomeSource.dataBorrowerIncomeSource.length === nextPositionIncomeSourceBorrower  && nextIncomeSource.length > 0){ /// next list person uuid
          navigate(`/loan/normal/init/${params.id}/income/${dataFilterIncomeSource.routerIncomeDeclare[nextPositionRouterDeclare]}/${dataFilterIncomeSource.listPerson_uuid[nextperson_uuid]}/${nextIncomeSource[0]}`);
        }
        else if(nextIncomeSource.length === 0){
          navigate(`/loan/normal/init/${params.id}/income/balance`);
        }
      }
      if(current_Income_declare === "marriage" && dataFilterIncomeSource.dataMarriageIncomeSource){
        const nextPositionIncomeSourceMarriage = dataFilterIncomeSource.dataMarriageIncomeSource?.indexOf(current_Income_source) + 1; // current incomeSource
        if(dataFilterIncomeSource.dataMarriageIncomeSource.length !== nextPositionIncomeSourceMarriage){
          navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${uuid_marriage}/${dataFilterIncomeSource.dataMarriageIncomeSource[nextPositionIncomeSourceMarriage]}`);
        }else if(dataFilterIncomeSource.dataMarriageIncomeSource.length === nextPositionIncomeSourceMarriage && nextIncomeSource.length > 0){ // next user list
          navigate(`/loan/normal/init/${params.id}/income/${dataFilterIncomeSource.routerIncomeDeclare[nextPositionRouterDeclare]}/${dataFilterIncomeSource.listPerson_uuid[nextperson_uuid]}/${nextIncomeSource[0]}`);
        }
        else if(nextIncomeSource.length === 0){
          navigate(`/loan/normal/init/${params.id}/income/balance`);
        }
      }
      if(current_Income_declare === "co-borrower" && dataFilterIncomeSource.dataCoBorrowerIncomeSource){
        const nextDeclareCoborrower = person_uuid_coBorr.indexOf(current_uuid_person_params) + 1
        const currentIncomeSourceByUuidPerson= dataFilterIncomeSource.dataCoBorrower?.find(item=>item.person_uuid === current_uuid_person_params)?.incomeSource ?? []
        const nextPositionIncomeSourceCoborrower = currentIncomeSourceByUuidPerson?.indexOf(current_Income_source) + 1; // current incomeSource
        const nextUserNextIncomeSource = dataFilterIncomeSource.dataCoBorrower.find((item,idx)=>idx === nextDeclareCoborrower)?.incomeSource ?? []
        const nextIncomeSource = dataFilterIncomeSource.data.find(item=>item.person_uuid === dataFilterIncomeSource.listPerson_uuid[nextperson_uuid])?.incomeSource ?? []
        if(person_uuid_coBorr[person_uuid_coBorr.length-1] === current_uuid_person_params){ // user list cuối cùng
          if(currentIncomeSourceByUuidPerson.length === nextPositionIncomeSourceCoborrower){ // next user list person
            if(nextIncomeSource.length === 0){
              navigate(`/loan/normal/init/${params.id}/income/balance`);
            }
            else{
              navigate(`/loan/normal/init/${params.id}/income/${dataFilterIncomeSource.routerIncomeDeclare[nextPositionRouterDeclare]}/${dataFilterIncomeSource.listPerson_uuid[nextperson_uuid]}/${nextIncomeSource[0]}`);
            }
          }else{
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${current_uuid_person_params}/${currentIncomeSourceByUuidPerson[nextPositionIncomeSourceCoborrower]}`);
          }
          
        }else{ // userList not last item
          if(currentIncomeSourceByUuidPerson.length !== nextPositionIncomeSourceCoborrower){ //  not current user
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${current_uuid_person_params}/${currentIncomeSourceByUuidPerson[nextPositionIncomeSourceCoborrower]}`);
          }else{ /// next user item in list
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${person_uuid_coBorr[nextDeclareCoborrower]}/${nextUserNextIncomeSource[0]}`);
          }
        }
      }
      if(current_Income_declare === "co-payer" && dataFilterIncomeSource.dataCoPayerIncomeSource){
        const nextDeclareCopayer = person_uuid_coPayer.indexOf(current_uuid_person_params) + 1
        const currentIncomeSourceByUuidPerson= dataFilterIncomeSource.dataCoPayer?.find(item=>item.person_uuid === current_uuid_person_params)?.incomeSource ?? []
        const nextPositionIncomeSourceCopayer = currentIncomeSourceByUuidPerson?.indexOf(current_Income_source) + 1; // current incomeSource
        const nextUserNextIncomeSource = dataFilterIncomeSource.dataCoPayer.find((item,idx)=>idx === nextDeclareCopayer)?.incomeSource ?? []
        if(person_uuid_coPayer[person_uuid_coPayer.length-1] === current_uuid_person_params){ // user liset cuối cùng
          if(currentIncomeSourceByUuidPerson.length === nextPositionIncomeSourceCopayer){ // next user list person
             if(nextUserNextIncomeSource.length === 0){
              navigate(`/loan/normal/init/${params.id}/income/balance`);
            }
            else{
              navigate(`/loan/normal/init/${params.id}/income/${dataFilterIncomeSource.routerIncomeDeclare[nextPositionRouterDeclare]}/${person_uuid_coPayer[0]}/${dataFilterIncomeSource.dataCoPayer[0].incomeSource[0]}`);
            }
          }else{
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${current_uuid_person_params}/${currentIncomeSourceByUuidPerson[nextPositionIncomeSourceCopayer]}`);
          }
        }else{ // userList not last item
          if(currentIncomeSourceByUuidPerson.length !== nextPositionIncomeSourceCopayer){ //  not current user
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${current_uuid_person_params}/${currentIncomeSourceByUuidPerson[nextPositionIncomeSourceCopayer]}`);
          }else{ /// next user item in list
            navigate(`/loan/normal/init/${params.id}/income/${mainPath[0]}/${person_uuid_coPayer[nextDeclareCopayer]}/${nextUserNextIncomeSource[0]}`);
          }
        }
      }
      if(current_MainIncome === "balance"){
        navigate(`/loan/normal/init/${params.id}/income/ability-repay`);
      }
      if(params['*'] === "ability-repay"){
        navigate(`/loan/normal/init/${params.id}/collateral`);
      }
    }
  }

  const onExit = () => navigate(`/`);

  const getPositionStept = () => {
    let position = "";
    if (stepName === "borrower") {
      switch (inComeType) {
        case "salary":
          position = ETypeButtonBarRole.INCOME_BORROWER_SALARY;
          break;
        case "asset-rent":
          position = ETypeButtonBarRole.INCOME_BORROWER_ASSRENT;
          break;
        case "business":
          position = ETypeButtonBarRole.INCOME_BORROWER_BUSSINESS;
          break;
        case "company":
          position = ETypeButtonBarRole.INCOME_BORROWER_COMPANY;
          break;
        case "stock":
          position = ETypeButtonBarRole.INCOME_BORROWER_STOCK;
          break;
        case "deposit":
          position = ETypeButtonBarRole.INCOME_BORROWER_DEPOSIT;
          break;
        case "pension":
          position = ETypeButtonBarRole.INCOME_BORROWER_PENSION;
          break;
        case "other":
          position = ETypeButtonBarRole.INCOME_BORROWER_OTHER;
          break;
      }
    }
    if (stepName === "marriage") {
      switch (inComeType) {
        case "salary":
          position = ETypeButtonBarRole.INCOME_MARRIAGE_SALARY;
          break;
        case "asset-rent":
          position = ETypeButtonBarRole.INCOME_MARRIAGE_ASSRENT;
          break;
        case "business":
          position = ETypeButtonBarRole.INCOME_MARRIAGE_BUSSINESS;
          break;
        case "company":
          position = ETypeButtonBarRole.INCOME_MARRIAGE_COMPANY;
          break;
        case "stock":
          position = ETypeButtonBarRole.INCOME_MARRIAGE_STOCK;
          break;
        case "deposit":
          position = ETypeButtonBarRole.INCOME_MARRIAGE_DEPOSIT;
          break;
        case "pension":
          position = ETypeButtonBarRole.INCOME_MARRIAGE_PENSION;
          break;
        case "other":
          position = ETypeButtonBarRole.INCOME_MARRIAGE_OTHER;
          break;
      }
    }
    if (stepName === "co-borrower") {
      switch (inComeType) {
        case "salary":
          position = ETypeButtonBarRole.INCOME_COBORROWER_SALARY;
          break;
        case "asset-rent":
          position = ETypeButtonBarRole.INCOME_COBORROWER_ASSRENT;
          break;
        case "business":
          position = ETypeButtonBarRole.INCOME_COBORROWER_BUSSINESS;
          break;
        case "company":
          position = ETypeButtonBarRole.INCOME_COBORROWER_COMPANY;
          break;
        case "stock":
          position = ETypeButtonBarRole.INCOME_COBORROWER_STOCK;
          break;
        case "deposit":
          position = ETypeButtonBarRole.INCOME_COBORROWER_DEPOSIT;
          break;
        case "pension":
          position = ETypeButtonBarRole.INCOME_COBORROWER_PENSION;
          break;
        case "other":
          position = ETypeButtonBarRole.INCOME_COBORROWER_OTHER;
          break;
      }
    }
    if (stepName === "co-payer") {
      switch (inComeType) {
        case "salary":
          position = ETypeButtonBarRole.INCOME_COPAYER_SALARY;
          break;
        case "asset-rent":
          position = ETypeButtonBarRole.INCOME_COPAYER_ASSRENT;
          break;
        case "business":
          position = ETypeButtonBarRole.INCOME_COPAYER_BUSSINESS;
          break;
        case "company":
          position = ETypeButtonBarRole.INCOME_COPAYER_COMPANY;
          break;
        case "stock":
          position = ETypeButtonBarRole.INCOME_COPAYER_STOCK;
          break;
        case "deposit":
          position = ETypeButtonBarRole.INCOME_COPAYER_DEPOSIT;
          break;
        case "pension":
          position = ETypeButtonBarRole.INCOME_COPAYER_PENSION;
          break;
        case "other":
          position = ETypeButtonBarRole.INCOME_COPAYER_OTHER;
          break;
      }
    }
    if (stepName === "balance") {
      position = ETypeButtonBarRole.INCOME_BALANCE;
    }
    if (stepName === "ability-repay") {
      position = ETypeButtonBarRole.INCOME_ABILITY;
    }
    return position;
  }

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ title: "", position: getPositionStept() }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ title: "", position: getPositionStept() }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: "", position: getPositionStept() }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: "", position: getPositionStept() }));
        break;
      case ETypeButton.save:
        onSave();
        break;
    }
  };


  useEffect(() => {
    params.stage === "init" && dispatch(fetchDataGuideState({ los_id, position: getPositionStept() }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

  return <Box>
    <Steps
      className="my-6 mscb-loan-normal-income"
      sx={SxSteps}
      current={!!~current ? current : 0}
      onChange={beforeChange}
      steps={[
        { label: 'NGUỒN THU NHẬP', node: 'A', hasSub: true, completed: IncomeTabCompleted.incomes },
        { label: 'Cân đối thu nhập - chi phí', node: 'B', completed: IncomeTabCompleted.balance },
        { label: 'Khả năng trả nợ gốc lãi', node: 'C', completed: IncomeTabCompleted.ability },
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
    </Steps>
    <Divider className="mb-6"/>

    <Backdrop />

    <ButtonBarRole
      className="mb-6"
      onSave={onSave}
      onBack={onBack}
      onExit={onExit}
      isApply={true}
      hideDelete={!ruleDisabled}
      hideSave={false}
      onDelete={onDelete}
      positionCode={getPositionStept()}
      onBtnMenu={(val) => onSaveMenu(val)}
      onContinue={onContinue}
      hideContinue={false}
    />

  </Box>

}

export default IncomeRoute;