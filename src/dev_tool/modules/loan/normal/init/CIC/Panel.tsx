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
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { autoFillAllCIC } from './action';
import useMasterData from 'app/hooks/useMasterData';

const DevToolLOANNormalInitCIC: FC = () => {

  const { CreditInstitution, register } = useMasterData(); 

  useEffect(() => {
    register("creditInstitution")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const ramdomCredit = CreditInstitution[Math.floor(Math.random()*CreditInstitution.length)]?.code;

  const [open, setOpen] = useState(false);
  const [openAll, setOpenAll] = useState(true);

  const dispatch = useDispatch();
  const toggleOpen = (s: boolean) => () => setOpen(s);
  const clickOpenAll = () => setOpenAll(!openAll);

  if (
    process.env.NODE_ENV !== 'development' &&
    sessionStorage.getItem('enabledDevTool') !== 'allowed'
  ) return null;

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
        hideBackdrop
      >
        <Box sx={{
          width: 250,
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))',
          bgcolor: 'rgba(18, 18, 18, 0.3)',
        }}>
          <List
            sx={{
              pt: 0,
              '& .MuiListItemIcon-root': {
                minWidth: '40px'
              }
            }}
          >
            <ListItemButton onClick={clickOpenAll} sx={{ bgcolor: 'rgb(0, 30, 60)', color: '#fff' }}>
              <ListItemIcon>
                <InboxIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="AUTO FILL" />
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
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: 0,
                    height: '42.5px'
                  },
                  '& button': {
                    maxWidth: '42.5px',
                    minWidth: '42.5px',
                    minHeight: '42.5px',
                    maxHeight: '42.5px',
                    p: 0
                  },
                  '& .br': {
                    position: 'relative',

                    '&::after': {
                      position: 'absolute',
                      content: '""',
                      top: 0,
                      bottom: 0,
                      right: '-0.6rem',
                      borderRight: '1px solid rgba(130, 130, 130, 0.045)',
                      borderLeft: '1px solid rgba(130, 130, 130, 0.15)'
                    }
                  }
                }}
              >
                <Grid container spacing={2}>
                autoFillAllCIC
                <Grid item xl={12}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={()=>{dispatch(autoFillAllCIC(ramdomCredit.toString()))}}
                      sx={{ minWidth: '100px' }}
                    >CIC</Button>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </List>
          <Box className="py-1 text-center absolute bottom left right">
            <Tooltip title="Close tool">
              <Fab sx={{ width: '30px', minWidth: '30px', height: '30px', minHeight: '30px' }} onClick={toggleOpen(false)}>
                <CloseIcon sx={{ fontSize: '16px' }} />
              </Fab>
            </Tooltip>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Portal>
  </Fragment>

}

export default memo(DevToolLOANNormalInitCIC);