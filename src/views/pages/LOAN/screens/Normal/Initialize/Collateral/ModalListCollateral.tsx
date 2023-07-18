import { FunctionComponent } from "react";
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
import { getLOANNormalCollapseByTypeV2,getLOANNormalCollapse } from "features/loan/normal/storage/collateralV2/selector";
import Empty from "views/components/layout/Empty";
import { ILOANNormalCollateralData } from "types/models/loan/normal/storage/CollaretalV2";

export interface IModalListCollateralProps {
  open?: boolean;
  onClose?(): void;
  type?: string;
}

const ModalListCollateral: FunctionComponent<IModalListCollateralProps> = (props) => {

  const { open = false, onClose, type= "" } = props;

  const collateralByType = useSelector(getLOANNormalCollapseByTypeV2(type));

  const renderCarouselItem = (data: ILOANNormalCollateralData[]) =>{
    return data?.map((cbt, index) => {
      return (
        <TableRow key={index}>
          <TableCell width="50px" align="center">{index + 1}</TableCell>
          <TableCell >{generaterNameSubTypeCollateral(cbt?.sub_type[0]?.id)}</TableCell>
          <TableCell > {cbt?.valuation_id}</TableCell>
          <TableCell align="center">{cbt?.sub_type[0]?.items.length}</TableCell>
          <TableCell align="center" className="text-success">{cbt.is_compactness === "Y" ? <BsCheckLg/> : null}</TableCell>
        </TableRow>
      )
    })
  }
  
  return (
    <Modal
      open={open}
      onClose={onClose}
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
         type=== "ALL"?"DANH SÁCH TÀI SẢN BẢO ĐẢM" : generaterNameCollateral(type) 
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
                  <TableCell align="center">LOẠI TÀI SẢN CHI TIẾT</TableCell>
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
                      {renderCarouselItem(collateralByType)}
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