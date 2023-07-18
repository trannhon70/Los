import { getValidateLOANNormalStorageApprovalIncome } from "features/loan/normal/storageApproval/income/selector";
import { useSelector } from "react-redux";
import { ValidateMessageIncome } from "views/pages/LOAN/utils/message";

const useNormalIncomeApprovalMessage = () => {

  const validate = useSelector(getValidateLOANNormalStorageApprovalIncome);

  return (declare: string, declarePosition: string, field: string, options?: Record<string, string | number | boolean>) => {
    if (validate.valid || validate.declare !== declare || validate.declarePosition !== declarePosition || field !== validate.field) return '';
    
    const fieldMessage = ValidateMessageIncome[validate.field as keyof typeof ValidateMessageIncome];

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

export default useNormalIncomeApprovalMessage;