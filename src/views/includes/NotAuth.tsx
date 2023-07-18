import { FC } from 'react';
import { Button, Paper } from '@mui/material';
import { useNavigate  } from "react-router-dom";
import no_data from 'assets/images/bg/no_data.png';
import NotFoundStyle from './NotFoundStyle';

const NotAuth: FC = () => {
    const navigate = useNavigate();
    const classes = NotFoundStyle();
    const handleClick = () => {
        navigate('/');
    }
    return (
        <Paper sx={{ width: '100%', maxWidth: '100%' }}>
            <div className={classes.root}>
                <img src={no_data} alt="" className='system_img'/>
                <span className='system_span_34'>
                    BẠN KHÔNG CÓ QUYỀN TRUY CẬP HỒ SƠ NÀY
                </span>
                <Button 
                    variant="contained"
                    onClick={handleClick}
                >
                    <span className='button_span'>
                        QUAY LẠI
                    </span>
                </Button>
            </div>
        </Paper>
    )
}

export default NotAuth;