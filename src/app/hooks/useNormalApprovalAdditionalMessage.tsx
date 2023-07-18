import { getValidateAA } from "features/loan/normal/storageApproval/additionalApproval/selectors";
import { useSelector } from "react-redux";
import { ValidateApprovalAdditionalMesssage } from "views/pages/LOAN/utils/message";

const useNormalCICMessage = () => {
    const validate = useSelector(getValidateAA);

    return ( field:string, index?: number, options?: Record<string, string | number | boolean>) => {
      if (validate.valid || validate.field !== field || validate.index !== index) return '';
  
      const fieldMessage = ValidateApprovalAdditionalMesssage[validate.field as keyof typeof ValidateApprovalAdditionalMesssage];
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

export default useNormalCICMessage;