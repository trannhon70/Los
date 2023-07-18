import { FC, useEffect, useState } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Modal from '../Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export interface ModalConfirmReverseProps{
	sx?: SxProps<Theme>;
	onConfirm?(): void;
	onCancel?(): void;
	onClose?(): void;
	open?: boolean;
	labelConfirm?: string;
	labelCancel?: string;
	disabledActions?:('close'|'confirm')[];
}

const ModalConfirmReverse: FC<ModalConfirmReverseProps> = props => {

	const { 
		open = false, 
		onClose, 
		onConfirm,
		onCancel, 
		sx, 
		labelCancel, 
		labelConfirm,
		disabledActions,
		children
	} = props;
	const [ isOpen, setIsOpen ] = useState(false);

	useEffect(() => {
		setIsOpen(open);
	}, [ open ]);

	if(!isOpen) return null;

	return <Modal 
		sx={{
			'& .MuiPaper-root': {
				borderRadius: 0,
				maxWidth: '420px',
				minWidth: '420px',
			},
			...sx
		}} 
		open={ isOpen } 
		onClose={ onClose }
	>
		<Box className="text-center mb-3">
			<IconButton 
				color="primary"
				sx={{
					backgroundColor: 'rgba(24, 37, 170, 0.1)!important',
					cursor: 'auto'
				}}
				disableRipple
			>
				<PriorityHighIcon sx={{ fontSize: '84px' }} />
			</IconButton>
		</Box>
		<Box sx={{textAlign:"center"}} className="mscb-modal-confirm-content">
			{ children }
		</Box>
		<Box className="text-center mt-3">
			{!(disabledActions?.includes('confirm'))&&<Button 
				variant="contained" 
				color="error" 
				onClick={ onConfirm }
				sx={{
					borderRadius: 0,
					mr: 1,
					minWidth: '120px'
				}}
			>
				{ labelConfirm === undefined ? 'Xác nhận' : labelConfirm }
			</Button>}
			{!(disabledActions?.includes('close'))&&<Button 
				variant="contained" 
				color="primary" 
				onClick={ onCancel } 
				sx={{
					borderRadius: 0,
					ml: 1,
					minWidth: '120px'
				}}
			>
				{ labelCancel === undefined ? 'Huỷ' : labelCancel }
			</Button>}
		</Box>
	</Modal>

}

export default ModalConfirmReverse;