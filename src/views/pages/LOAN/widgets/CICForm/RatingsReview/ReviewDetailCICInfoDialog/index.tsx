import React from 'react'
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { FC } from 'react';
import { DialogTitle } from '@mui/material';
import ReviewDetailCICInfoStyles from './style';
import CICReview from '../../ReviewCICInfoTable';

interface ReviewDetailCICInfoDialogProps {
    open: boolean;
    onClose?: () => void;
}

const  ReviewDetailCICInfoDialog:FC<ReviewDetailCICInfoDialogProps> = (props) =>{
    const { open, onClose } = props;

    const classes = ReviewDetailCICInfoStyles();
    const handleClose = () => {
      onClose && onClose()
    };
    return (
        <Dialog open={open} onClose={handleClose} maxWidth={"lg"} fullWidth={true}>
            <DialogTitle className={classes.title} style={{ color: 'var(--mscb-primary)' }}>
                THÔNG TIN CHI TIẾT CIC
                <IconButton
                    className={classes.iconClose}
                    aria-label="close"
                    onClick={handleClose}
                    style={{ color: "#eb0029" }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}
                >
                    <i className="fas fa-times"></i>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <CICReview label='Người vay'/>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewDetailCICInfoDialog
