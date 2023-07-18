import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Portal from '@mui/material/Portal';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import { autofillAllLegal, autofillBorrower, saveLegalBorrower } from 'features/loan/normal/storage/legal/actions';
import { autoFillBussiness, autoFillFinance, autoFillNeedAndPlan, autoFillStepA, saveLoanProduct } from 'features/loan/normal/storage/loan/actions';
import { FC, Fragment, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AUTO_ALL_LEGAL } from './slice';

const DevToolLOANNormalInitLegal: FC = () => {

  const [open, setOpen] = useState(false);
  const [openAll, setOpenAll] = useState(true);

  const dispatch = useDispatch();

  const toggleOpen = (s: boolean) => () => setOpen(s);
  const clickOpenAll = () => setOpenAll(!openAll);


  const startAutoFill = () =>{
   
      dispatch(autofillBorrower(""));
   
      dispatch(saveLegalBorrower(true)) ;
   
      dispatch(autoFillStepA(''))
    
   
      dispatch(saveLoanProduct("product"))
    
   
      dispatch(autoFillNeedAndPlan(''))
    
   
      dispatch(saveLoanProduct("need-and-plan"))
    
   
      dispatch(autoFillBussiness(''))
    
   
      dispatch(saveLoanProduct("business/household-legal"))
    
   
      dispatch(autoFillFinance(''))
    
   
      dispatch(saveLoanProduct("business/finance-analysis"))
    
  }
  const onSaveTTPL = () =>{
    dispatch(autofillBorrower(""))
    dispatch(saveLegalBorrower(true))
  }

  const autoFillAllLegalStep = () =>{
    dispatch(autofillAllLegal(""))
    dispatch(AUTO_ALL_LEGAL(true))
  }

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
                  <Grid item xl={3}>
                    <Tooltip title="Nhập người vay chính" onClick={autoFillAllLegalStep}>
                      <Fab sx={{ color: 'var(--mscb-primary)' }}>
                        <PersonIcon />
                      </Fab>
                    </Tooltip>
                  </Grid>

                  <Grid item xl={9}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={startAutoFill}
                      sx={{ width: '500px' }}
                    >PL_D</Button>
                  </Grid>

                  <Grid item xl={3}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={() => dispatch(autoFillNeedAndPlan(''))}
                      sx={{ minWidth: '100px' }}
                    >B</Button>
                  </Grid>
                  <Grid item xl={3}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={() => dispatch(autoFillBussiness(''))}
                      sx={{ minWidth: '100px' }}
                    >C.I</Button>
                  </Grid>
                  <Grid item xl={3}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={() => dispatch(autoFillFinance(''))}
                      sx={{ minWidth: '100px' }}
                    >C.II</Button>
                  </Grid>
                  <Grid item xl={12}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={onSaveTTPL}
                      sx={{ minWidth: '100px' }}
                    >TTPL</Button>
                  </Grid>
                  <Grid item xl={12}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={()=>{
                        dispatch(autoFillStepA(''))
                        dispatch(saveLoanProduct("product"))
                      }}
                      sx={{ minWidth: '100px' }}
                    >LOAN_A</Button>
                  </Grid>
                  <Grid item xl={12}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={()=>{
                        dispatch(autoFillNeedAndPlan(''))
                        dispatch(saveLoanProduct("need-and-plan"))
                      }}
                      sx={{ minWidth: '100px' }}
                    >LOAN_B</Button>
                  </Grid>
                  <Grid item xl={12}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={()=>{
                        dispatch(autoFillBussiness(''))
                        dispatch(saveLoanProduct("business/household-legal"))
                      }}
                      sx={{ minWidth: '100px' }}
                    >LOAN_C1</Button>
                  </Grid>
                  <Grid item xl={12}>
                    <Button
                      variant="contained"
                      className="ml-4 rounded-0"
                      color="primary"
                      onClick={()=>{
                        dispatch(autoFillFinance(''))
                        dispatch(saveLoanProduct("business/finance-analysis"))
                      }}
                      sx={{ minWidth: '100px' }}
                    >LOAN_C2</Button>
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

export default memo(DevToolLOANNormalInitLegal);