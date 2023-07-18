import { FC, memo } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DropdownMenu, { DropdownMenuItem } from '../DropdownMenu';
import { getCurrentUser } from 'features/auth/store/slice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'features/auth/store/slice';
import {
  pathStaffInformation,
  pathWorkprofile,
  steptNameWorkProfile
} from 'views/pages/StaffInformation/utils';
import { splitAvatarLink } from 'utils';
import { clearStoreDashboard } from 'features/dashboard/store/slice';

const User: FC = () => {

  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();

  
  const clickMenu = (item: DropdownMenuItem) => {
    if (item.value === 'logout'){
      dispatch(logout());
      dispatch(clearStoreDashboard(""));
    }

    if (item.value === 'profile'){
      navigate(`${pathStaffInformation}${pathWorkprofile}${steptNameWorkProfile[0]}`);
    }
  }
  
  return <DropdownMenu
    isIcon
    icon={ <ArrowDropDownIcon /> }
    minWidthMenu="25ch"
    onClick={ clickMenu }
    menu={[
      {
        value: 'userAvatar',
        icon: <Avatar src={splitAvatarLink(user?.avatar)}/>,
        label: <>
          <div className='text-upper text-secondary'>{user?.full_name}</div>
          <small className="text-secondary text-upper" >{`${user?.user_name ?? "user"}@scb.com.vn`}</small>
        </>,
        disable: true
      },
      {
        value: 'divider0',
        devider: true
      },
      {
        icon: <Settings fontSize="small" />,
        className: 'text-secondary',
        value: 'profile',
        label: 'Profile'
      },
      {
        icon: <Logout fontSize="small" />,
        className: 'text-secondary',
        value: 'logout',
        label: 'Logout'
      }
    ]}
  />

}

export default memo(User);