import { FC } from 'react';
import DropdownMenu from '../DropdownMenu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';

const Notify: FC = () => {

  return <DropdownMenu
    disabled={true}
    isIcon
    icon={ <NotificationsIcon className="mscb-topbar-icon mscb-notification-icon" /> }
    minWidthMenu="35ch"
    loading
    menu={[
      {
        icon: <Avatar />,
        value: 'message1',
        label: <div>
          <div className="font-bold">Hồ Đình Tưởng</div>
          <div className="text-small">Hôm nay bạn thế nào?</div>
        </div>,
        right: <MoreVertIcon fontSize="small" />,
        disable: true
      },
      {
        value: 'divider1',
        devider: true
      },
      {
        icon: <Avatar />,
        value: 'message2',
        label: <div>
          <div className="font-bold">Hồ Đình Tưởng</div>
          <div className="text-small">I'm fine. Thank you. And you?</div>
        </div>
      },
      {
        value: 'divider2',
        devider: true
      },
      {
        icon: <Avatar />,
        value: 'message3',
        label: <div>
          <div className="font-bold">Hồ Đình Tưởng</div>
          <div className="text-small">I'm fine. Thanks.</div>
        </div>
      },
      {
        value: 'divider3',
        devider: true
      },
      {
        icon: <Avatar />,
        value: 'message4',
        label: <div>
          <div className="font-bold">Hồ Đình Tưởng</div>
          <div className="text-small">I'm fine. Thanks.</div>
        </div>
      },
      {
        value: 'divider4',
        devider: true
      },
      {
        icon: <Avatar />,
        value: 'message5',
        label: <div>
          <div className="font-bold">Hồ Đình Tưởng</div>
          <div className="text-small">I'm fine. Thanks.</div>
        </div>
      },
      {
        value: 'divider5',
        devider: true
      },
      {
        icon: <Avatar />,
        value: 'message6',
        label: <div>
          <div className="font-bold">Hồ Đình Tưởng</div>
          <div className="text-small">I'm fine. Thanks.</div>
        </div>
      },
      {
        value: 'divider6',
        devider: true
      },
      {
        icon: <Avatar />,
        value: 'message7',
        label: <div>
          <div className="font-bold">Hồ Đình Tưởng</div>
          <div className="text-small">I'm fine. Thanks.</div>
        </div>
      },
      {
        value: 'divider7',
        devider: true
      },
      {
        icon: <Avatar />,
        value: 'message8',
        label: <div>
          <div className="font-bold">Hồ Đình Tưởng</div>
          <div className="text-small">I'm fine. Thanks.</div>
        </div>
      }
    ]}
  />

}

export default Notify;