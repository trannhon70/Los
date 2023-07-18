import { FC } from 'react';
import clsx from 'clsx';
import userStyle from './style';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'features/auth/store/slice';
import { Tooltip } from '@mui/material';
import { splitAvatarLink } from 'utils';

const User: FC = () => {
  const classes = userStyle();
  const user = useSelector(getCurrentUser);

  return (
    <div className={classes.root}>
      <div className={clsx(classes.branch, 'text-upper mscb-sidebar-branch overflow-ellipsis')}>
        {user?.branch.branch_name}
      </div>
      <div className="flex item-center">

        <Avatar
          src={splitAvatarLink(user?.avatar)}
          className="mscb-sidebar-avatar"
        >
          {/* {user?.full_name.substr(0, 1)} */}
        </Avatar>

        <div className={clsx(classes.info, 'mscb-sidebar-user-info')}>
          <div className="sidebar-user-name text-upper pt-1">
            {user?.full_name}
          </div>
               <div className={clsx(classes.departmentName, "sidebar-user-title text-normal text-13")}>
              {`${user?.hrm_position_name}`}
            </div>
          <Tooltip
            title={
              <>
                <p className={clsx(classes.tooltipTitle, 'my-0')}>
                  Chức vụ&nbsp;:
                </p>
                <p className="my-0 text-upper">
                  {`${user?.hrm_title_name} ${user?.department.name}` ?? ''}
                </p>
              </>
            }
            arrow
            placement="top"
          >
            <div className={clsx(classes.departmentName, "sidebar-user-title text-normal text-13")}>
              {`${user?.department.name}`}
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default User;
