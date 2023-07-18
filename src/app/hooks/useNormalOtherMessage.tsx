import { getValidateNormalStorageOther } from "features/loan/normal/storage/other/selectors";
import { useSelector } from "react-redux";
import { ValidateMessageOther } from "views/pages/LOAN/utils/message";

const useNormalOtherMessage = () => {

  const validate = useSelector(getValidateNormalStorageOther);

  return (field: string, options?: Record<string, string | number | boolean>) => {
    if (validate.valid || field !== validate.field) return '';

    const fieldMessage = ValidateMessageOther[validate.field as keyof typeof ValidateMessageOther];
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

export default useNormalOtherMessage;