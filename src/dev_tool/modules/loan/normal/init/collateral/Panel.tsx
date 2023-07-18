import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Portal from '@mui/material/Portal';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import { FC, Fragment, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  autoFillAllCollateral, autoFillCollateralBalc, autoFillCollateralDepartment, autoFillCollateralGoods, autoFillCollateralMachine, autoFillCollateralMarket,
  autoFillCollateralMEST, autoFillCollateralOther, autoFillCollateralProd,
  autoFillCollateralStoc
} from './action';

const DevToolLOANNormalInitCollateral: FC = () => {

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
      // hideBackdrop
      >
        <Box sx={{
          width: "20vw",
          height: '100%',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))',
          bgcolor: '#fff',
        }}>
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
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => { dispatch(autoFillAllCollateral("")) }}
                sx={{ minWidth: '150px' }}
              >Bất động Sản Loại Đất</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => { dispatch(autoFillCollateralDepartment("")) }}
                sx={{ minWidth: '100px' }}
              >Bất động Sản Loại Chung Cư</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => { dispatch(autoFillCollateralMarket("")) }}
                sx={{ minWidth: '100px' }}
              >Bất động Sản Loại Chợ</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => {
                  dispatch(autoFillCollateralMEST(""))
                }}
                sx={{ minWidth: '100px' }}
              >PTVT</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => {
                  dispatch(autoFillCollateralMachine(""))
                }}
                sx={{ minWidth: '100px' }}
              >Máy móc</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => { dispatch(autoFillCollateralGoods("")) }}
                sx={{ minWidth: '100px' }}
              >Vật tư hàng hóa</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => { dispatch(autoFillCollateralProd("")) }}
                sx={{ minWidth: '100px' }}
              >Quyền TS</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => { dispatch(autoFillCollateralStoc("")) }}
                sx={{ minWidth: '100px' }}
              >chứng khoán</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => { dispatch(autoFillCollateralBalc("")) }}
                sx={{ minWidth: '100px' }}
              >Số dư tiền gửi</Button>
            </Box>
            <Box className="p-4">
              <Button
                variant="contained"
                className="ml-4 rounded-0"
                color="primary"
                onClick={() => { dispatch(autoFillCollateralOther("")) }}
                sx={{ minWidth: '100px' }}
              >TS khác</Button>
            </Box>

          </Collapse>

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
  </Fragment >
}

export default memo(DevToolLOANNormalInitCollateral);