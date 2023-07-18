import { useState, useEffect, FunctionComponent } from "react";
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Modal from 'views/components/layout/Modal';
import { generaterNameCollateral, generaterNameSubTypeCollateral } from "views/pages/LOAN/utils";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSticky from 'views/components/layout/TableSticky';
import { BsCheckLg } from "react-icons/bs";
import { SxTable } from "./style";
import { getLOANNormalCollapseByType } from "features/loan/normal/storage/collateralV2/selector";
import Empty from "views/components/layout/Empty";

export interface IModalListCollateralProps {
  open?: boolean;
  onClose?(): void;
  type?: string;
}

const ModalListCollateral: FunctionComponent<IModalListCollateralProps> = (props) => {

  const { open = false, onClose, type= "" } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [collateralType, setCollateralType] = useState<string>(type);

  const collateralByType = useSelector(getLOANNormalCollapseByType(collateralType));

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if(type !== collateralType){
      setCollateralType(type)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const handleClose = () => {
    onClose && onClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isStatic
      sx={{
        '& .MuiPaper-root': {
          minWidth: '60%',
          position: 'relative',
          borderRadius: 0
        }
      }}
    >
      <IconButton onClick={onClose} color="error" sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
        { 
          generaterNameCollateral(type) 
        }
      </Typography>

      <Grid container spacing={3}>
        <Grid item xl={12} md={12} xs={12} >
          <TableContainer className="mt-2">
            <TableSticky
              className="mscb-table"
              sx= {SxTable}
            >
              <TableHead >
                <TableRow>
                  <TableCell width="50px" align="center">STT</TableCell>
                  <TableCell align="center">LOẠI TÀI SẢN CON</TableCell>
                  <TableCell align="center">MÃ CHỨNG THƯ</TableCell>
                  <TableCell align="center">SỐ LƯỢNG TÀI SẢN</TableCell>
                  <TableCell align="center">TÀI SẢN PHỐI HỢP</TableCell>
                </TableRow>
              </TableHead>
              {
                (()=> {
                  if (collateralByType?.length === 0) {
                    return (
                      <TableBody >
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Empty> Không có dữ liệu</Empty>
                          </TableCell>
                        
                        </TableRow>
                      </TableBody>
                    )
                  } else{
                    return <TableBody >
                      {
                         collateralByType?.map((cbt, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell width="50px" align="center">{index + 1}</TableCell>
                              <TableCell >{generaterNameSubTypeCollateral(cbt.id)}</TableCell>
                              <TableCell ></TableCell>
                              <TableCell align="center">{cbt.items.length}</TableCell>
                              <TableCell align="center" className="text-success"><BsCheckLg/></TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  }
                })()
              }
            </TableSticky>
          </TableContainer>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ModalListCollateral;