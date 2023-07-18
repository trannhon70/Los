import Divider from "@mui/material/Divider";
import useBackdrop from "app/hooks/useBackdrop";
import { fetchDataGuideState } from "features/loan/normal";
import { getLOANNormalLOSId } from "features/loan/normal/storage/selectors";
import { postBlackListApproval, postDedupeApproval } from "features/loan/normal/storageApproval/dedupe/actions";
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from "features/loan/normal/storageControl/action";
import { ETypeButton } from "features/loan/normal/storageControl/case";
import { getPositionLoanS2Params } from "features/loan/normal/storageGuide/generateTypeStateGuide";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import ButtonBarRole from "views/components/layout/ButtonBarRole";
import Steps from "views/components/layout/Steps";
import { CICNormalAA, DedupeBlacklistUrl, stageName, tabAppraisalURL } from "views/pages/LOAN/utils";
import Blacklist from "./Blacklist";
import Dedupe from "./Dedupe";
import BlacklistStyle from "./style";

const DedupeBlackList: FC = () => {
  const classes = BlacklistStyle()
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  const { showBackdrop } = useBackdrop();
  const los_id = useSelector(getLOANNormalLOSId)

  const organName = params['*'].split('/')[0]; // main/addition

  const current = DedupeBlacklistUrl.indexOf(organName);

  const dataPosition = getPositionLoanS2Params(`${params['*']}`) ?? ""

  useEffect(() => {
    params.stage === "appraisal-approval" && dispatch(fetchDataGuideState({ los_id, position: dataPosition }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])


  const navigate = useNavigate();

  const beforeChange = (_: number, next: number) => {
    const organ = next === 0 ? 'dedupe' : 'blacklist';
    navigate(`/loan/normal/${stageName[1]}/${params.id}/${tabAppraisalURL[6]}/${organ}`);
    return true;
  }


  const handleSave = () => {
    if (organName === "dedupe") {
      dispatch(postDedupeApproval(""))
    } else
      if (organName === "blacklist") {
        dispatch(postBlackListApproval(""))
      }
  }

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.appraise: // phê duyệt
        handleSave();
        break;
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ position: dataPosition, title: "" }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ position: dataPosition, title: "" }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: "", position: dataPosition }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: "", position: dataPosition }));
        break;
    }
  }
  const onExit = () => {
    navigate("/");
  };

  const onBack = () => {

    if (current === 0) {
      navigate(`/loan/normal/appraisal-approval/${params.id}/icr`);
      return;
    }
    if (current === 1) {
      navigate(`/loan/normal/appraisal-approval/${params.id}/dedupe-blacklist/dedupe`);
      return;
    }
  }

  const onContinue = () => { 
    if (current === 0) {
      
      navigate(`/loan/normal/appraisal-approval/${params.id}/dedupe-blacklist/blacklist`);
      return;
    }
    if (current === 1) {
      
      navigate(`/loan/normal/appraisal-approval/${params.id}/appraisal-add/report`);
      return;
    }
  };

  return <>
    <Fragment>
      <Steps
        className={classes.root}
        current={!!~current ? current : 0}
        onChange={beforeChange}
        steps={[
          {
            node: "A",
            label: "Thông tin Dedupe",
          },
          {
            node: "B",
            label: "Thông tin Blacklist",
          },
        ]}
      >
        <Routes>
          <Route path="dedupe/" element={<Dedupe />} />
        </Routes>
        <Routes>
          <Route path="blacklist/" element={<Blacklist />} />
        </Routes>
      </Steps >
      <Divider className="my-6" />
      <ButtonBarRole
        hideSave={false}
        hideContinue={false}
        hideDelete={false}
        onBtnMenu={(item) => onSaveMenu(item)}
        disableContinue={false} // check rule continue
        onExit={onExit}
        onContinue={onContinue}
        onBack={onBack}
        isApply={true}
        className="my-6"
        positionCode={dataPosition}
      />
    </Fragment>
  </>
}
export default DedupeBlackList;