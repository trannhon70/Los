import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import useBackdrop from "app/hooks/useBackdrop";
import clsx from "clsx";
import { notify } from "features/app/store/slice";
import { fetchDataGuideState } from "features/loan/normal";
import {
  clearStorageDelete, deleteLOANNormalStorage, handleContinueLoan, saveLoanProduct
} from "features/loan/normal/storage/loan/actions";
import {
  getLOANNormalStorageCountFile,
  getLOANNormalStorageFullLoan,
  validateLOANNormalStorageLoanProduct
} from "features/loan/normal/storage/loan/selectors";
import { getLOANNormalLOSId } from "features/loan/normal/storage/selectors";
import {
  callApprovalApprove,
  callControlComfirm,
  callDisApproved,
  callDisConfirm
} from "features/loan/normal/storageControl/action";
import { ETypeButton, ETypeButtonBarRole } from "features/loan/normal/storageControl/case";
import { generateTypeParams } from "features/loan/normal/storageGuide/generateTypeStateGuide";
import {
  getRuleDisbled
} from "features/loan/normal/storageGuide/selector";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { setTimeout } from "timers";
import { ILOANURLParams } from "types/models/loan";
import ButtonBarRole from "views/components/layout/ButtonBarRole";
import ModalConfirm from "views/components/layout/ModalConfirm";
import Steps from "views/components/layout/Steps";
import { stepsLOAN } from "views/pages/LOAN/utils";
import AttachmentModalServices from "./AttachmentModalServices";
import LOANBusiness from "./Business";
import LOANNeedAndPlain from "./NeedAndPlan";
import LOANProduct from "./Product";
import LOANStyle from "./style";

const LOAN: FC = () => {
  const classes = LOANStyle();
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validate = useSelector(validateLOANNormalStorageLoanProduct);
  const dataLoanFull = useSelector(getLOANNormalStorageFullLoan);
  const { showBackdrop } = useBackdrop();
  const stepName = params["*"];
  let current = stepsLOAN.indexOf(stepName);
  current === 3 && (current = 2);
  const countlistFileNeedForPlan = useSelector(getLOANNormalStorageCountFile);
  const ruleDisabled = useSelector(getRuleDisbled);
  const los_id = useSelector(getLOANNormalLOSId)

  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const [isOpen, setOpenAttachModal] = useState<boolean>(false);

  const beforeChange = (_: number, next: number) => {
    navigate(`/loan/normal/init/${params.id}/loan/${stepsLOAN[next]}`);
    return true;
  };

  const onExit = () => navigate("/");

  const dataPosition = generateTypeParams(`loan/${params['*']}`) ?? ""


  useEffect(() => {
    params.stage === "init" && dispatch(fetchDataGuideState({ los_id, position: dataPosition }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']])

  const onBack = () => {
    if (current === 2 && stepName === "business/finance-analysis") {
      navigate(`/loan/normal/init/${params.id}/loan/${stepsLOAN[2]}`);
      return;
    }

    if (current - 1 < 0) {
      navigate(`/loan/normal/init/${params.id}/cic/other/borrower`);
      return;
    }

    navigate(`/loan/normal/init/${params.id}/loan/${stepsLOAN[current - 1]}`);
  };
  const onDelete = () => {
    setTimeout(() => {
      dispatch(clearStorageDelete(stepName));
    }, 600);
    // dispatch(clearStorageDelete(stepName));
    // setIsModalConfirm(!isModalConfirm);
  };
  const onHandleCancelConfirm = () => {
    setIsModalConfirm(!isModalConfirm);
  };
  const onHandleConfirm = () => {
    dispatch(deleteLOANNormalStorage(stepName));
    setIsModalConfirm(!isModalConfirm);
  };
  const onContinue = () => {
    dispatch(handleContinueLoan(current, {stepName, uuid: params.uuid ?? "-"}))
  };
  const handleSaveLOAN = () => {
    if (!validate) return;

    showBackdrop(true);
    setTimeout(() => {
      dispatch(saveLoanProduct(stepName));
    }, 700);
  };

  // const handleOnComfirm = (item: string) => {
  //   switch (stepName) {
  //     case "product":
  //       if (item === "confirm") {
  //         dispatch(
  //           callControlComfirm({
  //             position: ETypeButtonBarRole.LOAN_PRODUCT_LOAN_INFO_PROGRAM,
  //             title: "Thông tin sản phẩm chương trình vay",
  //           })
  //         );
  //       }
  //       if (item === "approve") {
  //         dispatch(
  //           callApprovalApprove({
  //             position: ETypeButtonBarRole.LOAN_PRODUCT_LOAN_INFO_PROGRAM,
  //             title: "Thông tin sản phẩm chương trình vay",
  //           })
  //         );
  //       }
  //       break;
  //     case "need-and-plan":
  //       if (item === "confirm") {
  //         dispatch(
  //           callControlComfirm({
  //             position: ETypeButtonBarRole.LOAN_CAPITAL_NEED_LOAN_PLAN_INFO,
  //             title: "Nhu cầu vốn và phương án vay vốn",
  //           })
  //         );
  //       }
  //       if (item === "approve") {
  //         dispatch(
  //           callApprovalApprove({
  //             position: ETypeButtonBarRole.LOAN_CAPITAL_NEED_LOAN_PLAN_INFO,
  //             title: "Nhu cầu vốn và phương án vay vốn",
  //           })
  //         );
  //       }
  //       break;
  //     case "business/household-legal":
  //       if (item === "confirm") {
  //         dispatch(
  //           callControlComfirm({
  //             position: ETypeButtonBarRole.LOAN_BUSSINESS_HOUSEHOLD_INFO,
  //             title: "Pháp lý hộ kinh doanh",
  //           })
  //         );
  //       }
  //       if (item === "approve") {
  //         dispatch(
  //           callApprovalApprove({
  //             position: ETypeButtonBarRole.LOAN_BUSSINESS_HOUSEHOLD_INFO,
  //             title: "Pháp lý hộ kinh doanh",
  //           })
  //         );
  //       }
  //       break;
  //     case "business/finance-analysis":
  //       if (item === "confirm") {
  //         dispatch(
  //           callControlComfirm({
  //             position: ETypeButtonBarRole.LOAN_FINANCIAL_ANALYSIS_INFO,
  //             title: "Phân tích tài chính",
  //           })
  //         );
  //       }
  //       if (item === "approve") {
  //         dispatch(
  //           callApprovalApprove({
  //             position: ETypeButtonBarRole.LOAN_FINANCIAL_ANALYSIS_INFO,
  //             title: "Phân tích tài chính",
  //           })
  //         );
  //       }
  //       break;
  //   }
  // };

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ title: "", position: dataPosition }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ title: "", position: dataPosition }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: "", position: dataPosition }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: "", position: dataPosition }));
        break;
      case ETypeButton.save:
        handleSaveLOAN();
        break;
    }
  };
  return (
    <Box>
      <Steps
        // alternative
        attachLabel="tập tin"
        className={clsx(classes.root)}
        onChange={beforeChange}
        current={!!~current ? current : 0}
        steps={[
          {
            label: "Thông tin sản phẩm chương trình vay",
            node: "A",
            completed:
              dataLoanFull?.product_loan_program_info !== null ? true : false,
          },
          {
            label: "Nhu cầu vốn và phương án vay vốn",
            node: "B",
            completed:
              dataLoanFull?.capital_need_loan_plan_info !== null ? true : false,
            attachment: countlistFileNeedForPlan,
          },
          { 
            label: "Hoạt động sản xuất kinh doanh", 
            node: "C", 
            hasSub: true,
            completed:  (dataLoanFull?.product_loan_program_info?.loan_program_info?.loan_purpose_info?.code === "BUSINESS"),
            disabled: !(dataLoanFull?.product_loan_program_info?.loan_program_info?.loan_purpose_info?.code === "BUSINESS")
          },
        ]}
        onAttach={(value) => {
          if (!dataLoanFull?.capital_need_loan_plan_info) {
            dispatch(
              notify("Vui lòng khởi tạo tài liệu", {
                options: { variant: "warning" },
              })
            );
            return;
          }
          setOpenAttachModal(true);
        }}
      >
        <Routes>
          <Route path="product" element={<LOANProduct />} />
        </Routes>
        <Routes>
          <Route path="need-and-plan" element={<LOANNeedAndPlain />} />
        </Routes>
        <Routes>
          <Route path="business/*" element={<LOANBusiness />} />
        </Routes>
      </Steps>
      <Divider className="my-6" />
      <ModalConfirm
        open={isModalConfirm}
        children="Bạn có chắc chắn muốn xóa"
        labelConfirm="Xác nhận"
        labelCancel="Hủy"
        onClose={onHandleCancelConfirm}
        onConfirm={onHandleConfirm}
      />
      {/* {isOpen && <AttachmentModalLOAN
      open={Boolean(isOpen)} 
      onClose={()=>setOpenAttachModal(false)}
      uuidActive={''} 
      declareType={''}
    />} */}
      {isOpen && (
        <AttachmentModalServices
          open={Boolean(isOpen)}
          onClose={() => setOpenAttachModal(false)}
        />
      )}
      {/* <ButtonBar 
      className="mb-6"
      onSave={handleSaveLOAN}
      onContinue={ onContinue }
      onDelete={ onDelete }
      onExit ={onExit}
      onBack={ onBack }
    /> */}
      <ButtonBarRole
        className="mb-6"
        isApply={true}
        hideDelete={!ruleDisabled}
        onExit={onExit}
        onDelete={onDelete}
        onContinue={onContinue}
        onBack={onBack}
        onSave={handleSaveLOAN}
        hideContinue={false}
        hideSave={false}
        positionCode={dataPosition}
        onBtnMenu={(item) => onSaveMenu(item)}
      />

    </Box>
  );
};

export default LOAN;
