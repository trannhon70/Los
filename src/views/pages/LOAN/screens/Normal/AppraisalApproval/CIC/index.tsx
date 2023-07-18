import Divider from "@mui/material/Divider";
import useBackdrop from "app/hooks/useBackdrop";
import { fetchDataGuideState } from "features/loan/normal";
import { getLOANNormalLOSId } from "features/loan/normal/storage/selectors";
import {
  getSummaryCIC,
  saveLOANNormalApprovalCIC, setGroupActive, setObjectActive, setPersonActivePosition
} from 'features/loan/normal/storageApproval/cic/actions';
import { getListPerson, getLOANNormalApprovalStorageCICAdditional, getLOANNormalApprovalStorageCICMain, getObjectTotalAmount, getPersonActivePosition } from 'features/loan/normal/storageApproval/cic/selectors';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from "features/loan/normal/storageControl/action";
import { ETypeButton } from "features/loan/normal/storageControl/case";
import { getPositionLoanS2Params } from "features/loan/normal/storageGuide/generateTypeStateGuide";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { formatNumber } from "utils";
import ButtonBarRole from "views/components/layout/ButtonBarRole";
import Empty from "views/components/layout/Empty";
import Steps from "views/components/layout/StepsApproval";
import { CICNormalAA, declareCICTabBURL, declareCICURL, stageName } from "views/pages/LOAN/utils";
import Addition from "./Addition";
import MainCIC from "./Main";
import TotalRankingGrade from "./TotalRankingGrade";

const CIC: FC = () => {

  const params = useParams() as ILOANURLParams;
  const organName = params['*'].split('/')[0]; // main/addition
  const groupName = params['*'].split('/')[1] ?? ""
  const additionalData = useSelector(getLOANNormalApprovalStorageCICAdditional)
  const mainData = useSelector(getLOANNormalApprovalStorageCICMain)
  const navigate = useNavigate();
  const { showBackdrop } = useBackdrop();
  const checkExistData = (organ: string, group: string) => {
    if (organ === 'main') {
      return mainData[group]?.data?.length > 0;
    }
    else if (organ === 'additional') {
      return additionalData[group]?.data?.length > 0;
    }
    return true
  }

  const dataPosition = getPositionLoanS2Params(`${params['*']}`) ?? ""
  const los_id = useSelector(getLOANNormalLOSId)

  useEffect(() => {
    if (params.id && params.id !== '-') {
      dispatch(fetchDataGuideState({ los_id, position: dataPosition }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

  const convertUrlGroupToState = (group: string) => {
    switch (group) {
      case 'marriage':
        return 'marriage';
      case 'co-borrower':
        return 'co_brw';
      case 'co-payer':
        return 'co_payer';
      case 'legal-related':
        return 'law_rlt';
      case 'other':
        return 'others';
      case 'borrower':
        return 'borrower';
      default:
        return ''
    }
  }

  useEffect(() => {
    if (params.stage === stageName[1]) {
      dispatch(setObjectActive(organName === "total-ranking-grade" ? "summary" : organName))
      const convertGroup = convertUrlGroupToState(groupName)
      if(organName === 'main' || organName === 'additional'){
        dispatch(setGroupActive(convertGroup))
      }
      // console.log(organName, convertGroup, checkExistData(organName, convertGroup));
      if(convertGroup && !checkExistData(organName, convertGroup) && ((groupName !== 'borrower' && organName === 'main') || (organName === 'additional'))){
        navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/main/borrower`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organName, groupName])

  useEffect(() => {
    if(organName === "total-ranking-grade"){
      dispatch(getSummaryCIC(dataPosition))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[organName])

  const current = CICNormalAA.indexOf(organName);

  const dispatch = useDispatch()

  const objectTotalAmount = useSelector(getObjectTotalAmount)

  const listPerson = useSelector(getListPerson)
  const positionActive = useSelector(getPersonActivePosition)

  const beforeChange = (_: number, next: number) => {
    const organ = CICNormalAA[next];
    if (organ === 'main') {
      const currentDeclare = declareCICURL.indexOf(groupName);

      for (let index = currentDeclare + 1; index < declareCICURL.length; index++) {
        if (checkExistData(CICNormalAA[0], convertUrlGroupToState(declareCICURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[0]}/${declareCICURL[index]}`);
          return;
        }
      }

      navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/main/borrower`);
      // navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/main/borrower`);
    } else if (organ === 'additional') {
      const currentDeclare = declareCICTabBURL.indexOf(groupName);

      for (let index = currentDeclare + 1; index < declareCICTabBURL.length; index++) {
        if (checkExistData(CICNormalAA[1], convertUrlGroupToState(declareCICTabBURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[1]}/${declareCICTabBURL[index]}`);
          return;
        }
      }
      navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/additional/legal-related`);
    }
    else {
      navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/total-ranking-grade/`);
    }
    return true;
  }

  const onSave = () => {
    if (organName === 'total-ranking-grade') {
      dispatch(saveLOANNormalApprovalCIC(true, { type: 'saveSummary', dataPosition }))
    }
    else {
      showBackdrop()
      setTimeout(() => {
        dispatch(saveLOANNormalApprovalCIC(true, { type: 'save', dataPosition }))
      }, 500);
    }
  };

  const onSaveMenu = ( item: string ) => {
    switch ( item ) {
      case ETypeButton.appraise: // phê duyệt
        onSave();
        break;
      case ETypeButton.confirm:
        showBackdrop(true)
        dispatch(callControlComfirm({ position: dataPosition, title: "" }));
        break;
      case ETypeButton.approve:
        showBackdrop(true)
        dispatch(callApprovalApprove({ position: dataPosition, title: "" }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true)
        dispatch(callDisConfirm({ title: "", position: dataPosition }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true)
        dispatch(callDisApproved({ title: "", position: dataPosition }));
        break;
    }
  }

  const onExit = () => {
    navigate(`/`);
  }

  const onContinue = () => {

    if (listPerson && positionActive < listPerson.length - 1) {
      dispatch(setPersonActivePosition(positionActive + 1))
      return
    }

    if (current === 0) {
      const currentDeclare = declareCICURL.indexOf(groupName);

      for (let index = currentDeclare + 1; index < declareCICURL.length; index++) {
        if (checkExistData(CICNormalAA[0], convertUrlGroupToState(declareCICURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[0]}/${declareCICURL[index]}`);
          return;
        }
      }
      for (let index = 0; index < declareCICTabBURL.length; index++) {
        if (checkExistData(CICNormalAA[1], convertUrlGroupToState(declareCICTabBURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[1]}/${declareCICTabBURL[index]}`);
          return;
        }
      }
      navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/total-ranking-grade/`);

    }
    else if (current === 1) {
      const currentDeclare = declareCICTabBURL.indexOf(groupName);

      for (let index = currentDeclare + 1; index < declareCICTabBURL.length; index++) {
        if (checkExistData(CICNormalAA[1], convertUrlGroupToState(declareCICTabBURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[1]}/${declareCICTabBURL[index]}`);
          return;
        }
      }
    }
    else if (current === 2) {
      navigate(`/loan/normal/${stageName[1]}/${params.id}/loan/product`);
      return;
    }
    navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/total-ranking-grade/`);
  }

  const onBack = () => {

    if (positionActive > 0) {
      dispatch(setPersonActivePosition(positionActive - 1));
      return
    }

    if (current === 2) {
      for (let index = declareCICTabBURL.length - 1; index > -1; index--) {
        if (checkExistData(CICNormalAA[1], convertUrlGroupToState(declareCICTabBURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[1]}/${declareCICTabBURL[index]}`);
          return;
        }
      }

      for (let index = declareCICURL.length - 1; index > -1; index--) {

        if (checkExistData(CICNormalAA[0], convertUrlGroupToState(declareCICURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[0]}/${declareCICURL[index]}`);
          return;
        }
      }
    }
    else if (current === 1) {
      const currentDeclare = declareCICTabBURL.indexOf(groupName);

      for (let index = currentDeclare - 1; index > -1; index--) {
        if (checkExistData(CICNormalAA[1], convertUrlGroupToState(declareCICTabBURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[1]}/${declareCICTabBURL[index]}`);
          return;
        }
      }
      for (let index = declareCICURL.length - 1; index > -1; index--) {
        if (checkExistData(CICNormalAA[0], convertUrlGroupToState(declareCICURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[0]}/${declareCICURL[index]}`);
          return;
        }
      }
    }
    else if (current === 0) {
      const currentDeclare = declareCICURL.indexOf(groupName);

      for (let index = currentDeclare - 1; index > -1; index--) {
        if (checkExistData(CICNormalAA[0], convertUrlGroupToState(declareCICURL[index]))) {
          navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/${CICNormalAA[0]}/${declareCICURL[index]}`);
          return;
        }
      }
    }

    navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/main/borrower`);
  };

  // const onBack = () => {
  //   setDirection(false)
  //   if(organName === 'total-ranking-grade'){
  //     navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/additional/other`);
  //   }
  //   else{
  //     if(positionActive > 0){
  //       dispatch(setPersonActivePosition(positionActive - 1))
  //     }
  //     else {
  //       if (organName === 'main') {
  //         const cur = declareCICURL.indexOf(groupName)
  //         if(cur > 0){
  //           navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/main/${declareCICURL[cur - 1]}`)
  //         }
  //       }
  //       else if (organName === 'additional') {
  //         const cur = declareCICTabBURL.indexOf(groupName)
  //         if(cur > 0){
  //           navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/additional/${declareCICTabBURL[cur - 1]}`)
  //         }
  //         else
  //         {
  //           navigate(`/loan/normal/${stageName[1]}/${params.id}/cic-app/main/co-payer`);
  //         }
  //       }
  //     }
  //   }
  // }
  if(Object.keys(mainData).every(e => mainData[e].data.length === 0) 
      && Object.keys(additionalData).every(e => additionalData[e].data.length === 0)){
    return<Empty sx={{
      minHeight: 400,
      "& img": {
        width: "23%"
      },
      fontSize: '20px',
      fontWeight: 300,
      // fontStyle: 'italic',
    }}>
      Chưa có dữ liệu
    </Empty>
  }

  return <>
    <Fragment>
      <Steps
        className="my-5"
        current={!!~current ? current : 0}
        onChange={beforeChange}
        incomeStepsTotal
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: "center",
          },
          '& .mscb-step-text':{
            fontWeight: 500
          }
        }}
        steps={[
          {
            node: "A",
            label: "ĐỐI TƯỢNG TRA CỨU CHÍNH",
            hasSub: true,
            extra: formatNumber(objectTotalAmount.main.toString()),
            value: 'MAIN',
            completed: !Object.keys(mainData).every(e => mainData[e].data.length === 0)
          },
          {
            node: "B",
            label: "ĐỐI TƯỢNG TRA CỨU BỔ SUNG",
            hasSub: true,
            extra: formatNumber(objectTotalAmount.additional.toString()),
            value: 'ADDITIONAL',
            disabled: Object.keys(additionalData).every(e => additionalData[e].data.length === 0),
            completed: !Object.keys(additionalData).every(e => additionalData[e].data.length === 0),
          },
          {
            node: "C",
            label: "TỔNG ĐIỂM XẾP HẠNG",
            hasSub: false,
            value: 'SUMMARY',
            completed: !Object.keys(mainData).every(e => mainData[e].data.length === 0) || !Object.keys(additionalData).every(e => additionalData[e].data.length === 0),
          },
        ]}  
      >
        <Routes>
          <Route path=":organ/*" element={<MainCIC organ={organName} dataPosition={dataPosition} />} />
        </Routes>
        <Routes>
          <Route path=":organ/*" element={<Addition organ={organName} dataPosition={dataPosition} />} />
        </Routes>
        <Routes>
          <Route path=":organ/*" element={<TotalRankingGrade organ={organName} dataPosition={dataPosition} />} />
        </Routes>
      </Steps >
      <Divider className="my-6" />
      <ButtonBarRole
        onSave={onSave}
        hideSave={false}
        hideContinue={false}
        hideDelete={false}
        onBtnMenu={(item) => onSaveMenu(item)}
        disableContinue={false} // check rule continue
        onExit={onExit}
        onContinue={onContinue}
        onBack={onBack}
        isApply={true}
        className="mb-6"
        positionCode={dataPosition}
      />
      {/* <ButtonBar
        onSave={onSave}
        onExit={onExit}
        onContinue={onContinue}
        onBack={onBack}
        className="mb-6"
      /> */}
    </Fragment>
  </>
}
export default CIC;