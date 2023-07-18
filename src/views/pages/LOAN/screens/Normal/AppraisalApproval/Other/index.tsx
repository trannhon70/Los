import { FC, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ILOANURLParams } from "types/models/loan";
import Box from "@mui/material/Box";
import Steps from "views/components/layout/Steps";
import OtherException from "./Exception";
import OtherRisk from "./Risk";
import Divider from "@mui/material/Divider";
import OtherStyle from "./style";
import { saveLOANApprovalOther } from "features/loan/normal/storageApproval/Other/actions";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataGuideState } from "features/loan/normal";
import { getPositionLoanS2Params } from "features/loan/normal/storageGuide/generateTypeStateGuide";
import ButtonBarRole from "views/components/layout/ButtonBarRole";
import { ETypeButton } from "features/loan/normal/storageControl/case";
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from "features/loan/normal/storageControl/action";
import useBackdrop from "app/hooks/useBackdrop";
import { getLOANNormalLOSId } from "features/loan/normal/storage/selectors";

const AAOther: FC = () => {
  const dispatch = useDispatch()
  const classes = OtherStyle();
  const navigate = useNavigate();
  const params = useParams() as ILOANURLParams;
  const current = ["approval-exception", "approval-risk"].indexOf(params["*"]);
  const { showBackdrop } = useBackdrop();
  const los_id = useSelector(getLOANNormalLOSId)

  const beforeChange = (_: number, next: number) => {
    const step = next === 1 ? "approval-risk" : "approval-exception";
    navigate(`/loan/normal/appraisal-approval/${params.id}/other/` + step);
    return true;
  };


  const onSave = () => {
    // showBackdrop()
    dispatch(saveLOANApprovalOther(current));
  };

  const dataPosition = getPositionLoanS2Params(`${params['*']}`) ?? ""

  useEffect(() => {
    params.stage === "appraisal-approval" && dispatch(fetchDataGuideState({ los_id, position: dataPosition }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

 

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.appraise:
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
    navigate("/");
  };

  const onContinue = () => { 
    if (current === 0) {
      
      navigate(`/loan/normal/appraisal-approval/${params.id}/other/approval-risk`);
      return;
    }
    if (current === 1) {
      
      navigate(`/loan/normal/appraisal-approval/${params.id}/icr`);
      return;
    }
  };
  
  const onBack = () =>{
    if (current === 0) {
      navigate(`/loan/normal/appraisal-approval/${params.id}/collatera-app`);
      return;
    }
    if (current === 1) {
      navigate(`/loan/normal/appraisal-approval/${params.id}/other/approval-exception`);
      return;
    }
    
  }
  return (
    <Box>
      <Steps
        className={classes.root}
        current={!!~current ? current : 0}
        onChange={beforeChange}
        steps={[
          { label: "Thông tin về ngoại lệ", node: "A" },
          { label: "Phân tích và biện pháp hạn chế rủi ro", node: "B" },
        ]}
      >
        <Routes>
          <Route path="approval-exception" element={<OtherException />} />
        </Routes>
        <Routes>
          <Route path="approval-risk" element={<OtherRisk />} />
        </Routes>
      </Steps>
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
      {/* <ButtonBar className="mb-6" onSave={onSave} onContinue={onContinue} /> */}
    </Box>
  );
};

export default AAOther;
