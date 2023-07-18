import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMasterData from "app/hooks/useMasterData";
import { ETypeCollateral } from "features/loan/normal/storage/collateralV2/case";
import { getLOANNormalCollapseByTypeV2 } from "features/loan/normal/storage/collateralV2/selector";
import { FunctionComponent, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { ITypeRealEstateList } from "types/models/master-data/state";
import { ucfirst } from "utils";
import Empty from "views/components/layout/Empty";
import Modal from 'views/components/layout/Modal';
import TableSticky from 'views/components/layout/TableSticky';
import { generaterNameCollateral } from "views/pages/LOAN/utils";
import { SxTable } from "./style";

export interface IModalListCollateralProps {
  open?: boolean;
  onClose?(): void;
  type?: string;
}

const ModalListCollateral: FunctionComponent<IModalListCollateralProps> = (props) => {

  const { open = false, onClose, type= "" } = props;

  const collateralByType = useSelector(getLOANNormalCollapseByTypeV2(type));
  const {Province, District, Ward, register, CollateralType, TypeRealEstate, VehicleType, MachineType} = useMasterData();
    
  useEffect(() => {
    register('collateralType')
    register('typeRealEstate')
    register('vehicleType')
    register('machineType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    if (open) {
      for (let i = 0; i < collateralByType.length; i++) {
        register("district", collateralByType[i].province)
        register("ward", collateralByType[i].district)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralByType])

  const totalType: ITypeRealEstateList[] = [];
  TypeRealEstate.forEach(e => {
   totalType.push(...e.list)
  })

  const generaterNameSubTypeCollateral = (type: string, childType: string) => {
    switch (type) {
      case ETypeCollateral.REST:
        return totalType?.find(e => e.real_estate_code === childType)?.real_estate_name ?? "-"
      case ETypeCollateral.MEST:
        return VehicleType.find(e => e.code === childType)?.name?? "-"
      case ETypeCollateral.DEVI:
        return MachineType.find(e => e.code === childType)?.name?? "-"
      default:
        return ucfirst(CollateralType.find(e => e.code === type)?.name?.toLowerCase() ?? "") ?? "-"
    }
  }


  // const renderCarouselItem = (data: ILOANNormalCollateralData[]) =>{
  //   return data?.map((cbt, index) => {
  //     return (
  //       <TableRow key={index}>
  //         <TableCell width="50px" align="center">{index + 1}</TableCell>
  //         <TableCell >{generaterNameSubTypeCollateral(cbt?.sub_type[0]?.id)}</TableCell>
  //         <TableCell > {cbt?.valuation_id}</TableCell>
  //         <TableCell align="center">{cbt?.sub_type[0]?.items.length}</TableCell>
  //         <TableCell align="center" className="text-success">{cbt.is_compactness === "Y" ? <BsCheckLg/> : null}</TableCell>
  //         <TableCell align="left">
  //           {cbt?.address && cbt?.address + ", "}
  //           {cbt?.district && cbt?.ward && Ward[cbt.district]?.data?.find(w => w.code === cbt?.ward)?.name + ", "}
  //           {cbt?.district && cbt?.province && District[cbt.province]?.data?.find(d => d.code === cbt?.district)?.name + ", "}
  //           {cbt?.province && Province.find(p => p.id === cbt?.province)?.name}
  //           {!cbt?.address && !cbt.district && !cbt?.province ? '-': null}
  //         </TableCell>
  //       </TableRow>
  //     )
  //   })
  // }
  
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
                  <TableCell align="center">TÀI SẢN HỢP KHỐI</TableCell>
                  <TableCell align="center">ĐỊA CHỈ</TableCell>

                </TableRow>
              </TableHead>
              {
                (() => {
                  if (collateralByType?.length === 0) {
                    return (
                      <TableBody >
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Empty> Không có dữ liệu</Empty>
                          </TableCell>

                        </TableRow>
                      </TableBody>
                    )
                  } else {
                    return <TableBody >
                      {
                        collateralByType?.map((cbt, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell width="50px" align="center">{index + 1}</TableCell>
                              <TableCell >{cbt.type ==="REST" ? generaterNameSubTypeCollateral(cbt.type, cbt?.sub_type[0]?.child_sub_type) : generaterNameSubTypeCollateral(cbt.type, cbt?.sub_type[0]?.id)}</TableCell>
                              <TableCell > {cbt?.valuation_id ? cbt?.valuation_id : '-'}</TableCell>
                              <TableCell align="center">{cbt?.sub_type[0]?.items.length}</TableCell>
                              <TableCell align="center" className="text-success">{cbt.type ==="REST" ? <BsCheckLg /> : '-'}</TableCell>
                              <TableCell align="left">
                                {cbt?.address && cbt?.address + ", "}
                                {cbt?.district && cbt?.ward && Ward[cbt.district]?.data?.find(w => w.code === cbt?.ward)?.name + ", "}
                                {cbt?.district && cbt?.province && District[cbt.province]?.data?.find(d => d.code === cbt?.district)?.name + ", "}
                                {cbt?.province && Province.find(p => p.id === cbt?.province)?.name}
                                {!cbt?.address && !cbt.district && !cbt?.province ? '-' : null}
                              </TableCell>
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