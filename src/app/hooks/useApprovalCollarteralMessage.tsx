import { getCollateralApprovalValidate } from "features/loan/normal/storageApproval/collateral/selector";
  import { useSelector } from "react-redux";
import { ValidateApprovalLOANCollateral } from "views/pages/LOAN/utils/message";

const useApprovalCollarteralMessage = () => {
  const validate = useSelector(getCollateralApprovalValidate);

  return (field: string, options?: Record<string, string | number | boolean>) => {
    if (validate.valid || field !== validate.field) return '';
    
    const fieldMessage = ValidateApprovalLOANCollateral[validate.field as keyof typeof ValidateApprovalLOANCollateral];
    const role = validate.role as string;
    if (!fieldMessage || !fieldMessage[role as keyof typeof fieldMessage]) return '';
    
    const currentMessage = fieldMessage[role as keyof typeof fieldMessage];
    if (!options) return (currentMessage || validate.message) ?? '';

    for (let x in options){
      if (validate[x as keyof typeof validate] !== options[x]){
        return '';
      }
    }
    return (currentMessage || validate.message) ?? '';
  }

}

export default useApprovalCollarteralMessage;