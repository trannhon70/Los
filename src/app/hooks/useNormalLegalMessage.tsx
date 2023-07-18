import { getValidateLOANNormalStorageLegal } from "features/loan/normal/storage/legal/selectors";
import { useSelector } from "react-redux";
import { ValidateMessageeLegal } from "views/pages/LOAN/utils/message";

const useNormalLegalMessage = () => {

  const validate = useSelector(getValidateLOANNormalStorageLegal);

  return (declare: string, field: string, options?: Record<string, string | number | boolean>) => {
    if (validate.valid || validate.declare !== declare || field !== validate.field) return '';
    
    const fieldMessage = ValidateMessageeLegal[validate.field as keyof typeof ValidateMessageeLegal];
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

export default useNormalLegalMessage;