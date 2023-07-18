import { FC } from 'react';
import useBackdrop from 'app/hooks/useBackdrop';
import MuiBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import loadingStyle from "./style";

const Backdrop: FC = () => {

  const { options: { open, isStatic }, closeBackdrop } = useBackdrop();
  const handleClose = () => isStatic || closeBackdrop();
  const classes = loadingStyle();

  return <MuiBackdrop
    sx={{ color: '#fff', zIndex: 1400 }}
    open={open}
    onClick={handleClose}
  >
     <span className={classes.root}></span>
    <span className={classes.logoImage}></span>
  </MuiBackdrop>

}

export default Backdrop;