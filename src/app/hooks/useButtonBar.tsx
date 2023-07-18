import { useDispatch } from 'react-redux';
import { callApprovalApprove, callControlComfirm, callDisApproved, callDisConfirm } from 'features/loan/normal/storageControl/action';

 const useButtonBar = (type: string, position: string, title: string) => {

  const dispatch = useDispatch();

  if (type === "confirm") {
    return dispatch(callControlComfirm({ position: position, title: title }));
  }
  if (type === "approve") {
    return dispatch(callApprovalApprove({ position: position, title: title }));
  }
  if (type === 'disconfirm') {
    return dispatch(callDisConfirm({ title: title, position: position }));
  }
  if (type === 'disapprove') {
    return dispatch(callDisApproved({ title: title, position: position }));
  }
}
export default useButtonBar;