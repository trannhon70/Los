import { getCurrentUser } from "features/auth/store/slice";
import { useSelector } from "react-redux";
import { IBasicStaffInformation } from "types/models/loan/StaffInformation";


const useStorage = () => {

  const useAuth = useSelector(getCurrentUser);

  const basicInfo = () => {
    const data: IBasicStaffInformation = {
      avatar: useAuth?.avatar ?? "-",
      full_name: useAuth?.full_name ?? "-",
      user_id: useAuth?.user_id ?? "-",
      user_name: useAuth?.user_name ?? "-",
      branch_address: useAuth?.branch.branch_address ?? "-",
      branch_phone: useAuth?.branch.branch_phone ?? "-",
      hrm_position_name: useAuth?.hrm_position_name ?? "-"
    }
    return data;
  }

  return {
    basicInfo: basicInfo()
  }
}

export default useStorage;