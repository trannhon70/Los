import React from 'react'
import modalReviewImageStyle from './style'
import { Dialog, SxProps, Theme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
export interface ModalReviewImageProps {
  openModal: boolean;
  imageToShow: string,
  handleCloseModal(): void;
  className?: string;
  sx?: SxProps<Theme>
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalReviewImage: React.FC<ModalReviewImageProps> = (props) => {
  const { openModal, handleCloseModal, imageToShow, sx } = props;
  const classes = modalReviewImageStyle();

  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openModal}
      TransitionComponent={Transition}
      sx={sx}
      className={classes.root}>
      <React.Fragment>
        <div className={classes.identity_image}>
          <img src={imageToShow} alt="" />
        </div>
      </React.Fragment>
    </Dialog>
  )
}

export default ModalReviewImage;