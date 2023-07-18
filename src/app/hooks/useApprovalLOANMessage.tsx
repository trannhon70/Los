import { getLOANApprovalValidate } from "features/loan/normal/storageApproval/loan/selectors";
import { useSelector } from "react-redux";
import { ValidateApprovalLOANMessage } from "views/pages/LOAN/utils/message";

const useApprovalLOANMessage = () => {

  const validate = useSelector(getLOANApprovalValidate);

  return (field: string, options?: Record<string, string | number | boolean>) => {
    if (validate.valid || field !== validate.field) return '';
    
    const fieldMessage = ValidateApprovalLOANMessage[validate.field as keyof typeof ValidateApprovalLOANMessage];
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

export default useApprovalLOANMessage;