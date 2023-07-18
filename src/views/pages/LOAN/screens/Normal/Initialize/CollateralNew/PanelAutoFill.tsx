import { FC, Fragment, memo, useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Portal from '@mui/material/Portal';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { autoFillRESTDepartment, autoFillRESTLANDDDDDDDDDDDD,autoFillRESTMARKETTTTTTTTTT } from 'features/loan/normal/storage/collateralV2/actions';
import { useDispatch } from 'react-redux';



export interface PanelCollateralProps {
  isOpen?: boolean;
}

const PanelAutoFill: FC<PanelCollateralProps> = (props) => {

  const { isOpen = false } = props

  const [open, setOpen] = useState<boolean>(isOpen);
  const [openAll, setOpenAll] = useState(true);
  const dispatch = useDispatch();
  const toggleOpen = (s: boolean) => () => setOpen(s);
  const clickOpenAll = () => setOpenAll(!openAll);
  if (
    process.env.NODE_ENV !== 'development' &&
    sessionStorage.getItem('enabledDevTool') !== 'allowed'
  ) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return <Fragment>
    <Portal>
      <Box
        className="fixed"
        sx={{
          width: '40px',
          height: '40px',
          bottom: '0.2rem',
          right: '0.6rem'
        }}
      >
        <IconButton onClick={toggleOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </Box>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleOpen(false)}
        onOpen={toggleOpen(true)}
      // hideBackdrop
      >
        <Box sx={{
          width: "20vw",
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))',
          bgcolor: '#fff',
        }}>
          <List
            sx={{
              pt: 0,
              '& .MuiListItemIcon-root': {
                minWidth: '40px'
              }
            }}
          >
            <ListItemButton onClick={clickOpenAll} sx={{ bgcolor: 'var(--mscb-primary)!important', color: '#fff' }}>
              <ListItemIcon>
                <InboxIcon sx={{ color: '#2566e8' }} />
              </ListItemIcon>
              <ListItemText primary="Tài sản đảm bảo" />
              <ChevronRightIcon
                sx={{
                  transition: 'all ease 0.3s',
                  ...(openAll ? {
                    transform: 'rotate(90deg)'
                  } : {})
                }}
              />
            </ListItemButton>
            <Collapse in={openAll} timeout="auto" unmountOnExit>
              <Box
                className="p-4"
              >
                <Button variant='contained' color='primary' onClick={() => {
                  dispatch(autoFillRESTDepartment(""))
                }}>Chung cư</Button>
              </Box>
              <Box
                className="p-4"
              >
                <Button variant='contained' color='primary' onClick={() => {
                  dispatch(autoFillRESTMARKETTTTTTTTTT(""))
                }}>Chọ</Button>
              </Box>

              <Box
                className="p-4"
              >
                <Button variant='contained' color='primary' onClick={() => {
                  dispatch(autoFillRESTLANDDDDDDDDDDDD(""))
                }}>Đất</Button>
              </Box>

            </Collapse>
          </List>
          <Box className="py-1 text-center absolute bottom left right">
            <Tooltip title="Close tool">
              <Fab sx={{ width: '30px', minWidth: '30px', height: '30px', minHeight: '30px' }} >
                <CloseIcon sx={{ fontSize: '16px' }} />
              </Fab>
            </Tooltip>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Portal>
  </Fragment>

}

export default memo(PanelAutoFill);