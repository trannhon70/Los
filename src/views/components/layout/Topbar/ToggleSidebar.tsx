import { FC } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from 'features/app/store/slice';

const ToggleSidebar: FC = () => {

  const dispatch = useDispatch();

  const clickToggleMenu = () => {
    dispatch(toggleSidebar())
  }

  return <IconButton
    size="large"
    edge="start"
    color="inherit"
    aria-label="open drawer"
    sx={{ mr: 2 }}
    onClick={ clickToggleMenu }
  >
    <MenuIcon className="text-primary" />
  </IconButton>

}

export default ToggleSidebar;