import { getValidateLOANNormalApprovalStorageCIC } from "features/loan/normal/storageApproval/cic/selectors";
import { useSelector } from "react-redux";
import { ValidateApprovalCICMesssage } from "views/pages/LOAN/utils/message";

const useNormalCICMessage = () => {

    const validate = useSelector(getValidateLOANNormalApprovalStorageCIC);

    return (field: string,position?: string, cic?: string, inst?: string, child?: string, agree?: string, options?: Record<string, string | number | boolean>) => {
      if (validate.valid || position !== validate.position || field !== validate.field || validate.agree !== agree
          || validate.cic !== cic || validate.child !== child || validate.inst !== inst) return '';
  
      const fieldMessage = ValidateApprovalCICMesssage[validate.field as keyof typeof ValidateApprovalCICMesssage];
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