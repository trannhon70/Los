import { getValidateOtherApproval } from "features/loan/normal/storageApproval/Other/selectors";
import { useSelector } from "react-redux";
import { ValidateMessageOtherApproval } from "views/pages/LOAN/utils/message";

const useNormalOtherApprovalMessage = () => {

  const validate = useSelector(getValidateOtherApproval);

  return (field: string, options?: Record<string, string | number | boolean>) => {
    if (validate.valid || field !== validate.field) return '';

    const fieldMessage = ValidateMessageOtherApproval[validate.field as keyof typeof ValidateMessageOtherApproval];
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

export default useNormalOtherApprovalMessage;