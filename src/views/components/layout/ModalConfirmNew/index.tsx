import { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { AiOutlineExclamation } from "react-icons/ai";

import ModalConfirmNewStyle from './style';

export interface ModalConfirmNewProps<T = unknown>{
    isOpen: boolean;
    data?: T,
    labelTitle?: string;
    labelDecription?: string;
    labelBtnSuccess?: string;
    labelBtnCancel?: string;
    onSuccess?(data: T): void;
    onCancel?(): void;
}

const ModalConfirmNew: FC<ModalConfirmNewProps> = (props) =>{

    const {
        isOpen,
        labelTitle,
        labelDecription,
        labelBtnSuccess,
        labelBtnCancel,
        data,
        onSuccess,
        onCancel
    } = props;
    const classes = ModalConfirmNewStyle();

    const handleClose = () => {
        onCancel && onCancel()
    }

    const handleSuccess = () =>{
        onSuccess && onSuccess(data)
    }

    return(
        <Modal
            keepMounted
            open={isOpen}
            onClose={handleClose}
        >
            <Box className={classes.root}>
                <Avatar>
                    <AiOutlineExclamation />
                </Avatar>
                {
                    labelTitle && <Typography variant="h3" className="title">
                        {labelTitle}
                    </Typography>
                }

                {
                    labelDecription && <Typography variant="body2" className="decription">
                        {labelDecription}
                    </Typography>
                }

                <div className="action">
                    <Button 
                        className="cancel" 
                        variant="contained"
                        size="large"
                        onClick={handleClose}
                    >
                        {labelBtnCancel?.toLocaleUpperCase()}
                    </Button>
                    <Button 
                        className="success"
                        variant="contained"
                        size="large"
                        onClick={handleSuccess}
                    >
                        {labelBtnSuccess?.toLocaleUpperCase()}
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalConfirmNew;