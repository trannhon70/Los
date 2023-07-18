import { FC } from 'react';
import DropdownMenu from '../DropdownMenu';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';

const EventList: FC = () => {

  return <DropdownMenu
    disabled={true}
    isIcon
    icon={ <EventAvailableIcon className="mscb-topbar-icon mscb-events-icon" /> }
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
      }
    ]}
  />

}

export default EventList;