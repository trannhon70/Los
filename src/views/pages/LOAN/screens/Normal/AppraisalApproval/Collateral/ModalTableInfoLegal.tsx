import { useState, useEffect, FunctionComponent, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Modal from 'views/components/layout/Modal';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSticky from 'views/components/layout/TableSticky';
import { SxTable } from "./style";
import Empty from "views/components/layout/Empty";
import Checkbox, { CheckboxRef } from "views/components/base/Checkbox";
import { getLOANormalStoreLegalCertifiCatePersionListLegalData } from "features/loan/normal/storage/collateralV2/selector";
import { Button, Divider } from "@mui/material";
import { ILOANNormalCollateralV2StateFullInfoLegalOwners, IPerson } from "types/models/loan/normal/storage/CollaretalV2";
import { setCollaretalCertificatePersion } from "features/loan/normal/storage/collateralV2/actions";

export interface IModalTableInfoLegalProps {
  activeSubType?: string;
  uuIdData?: string;
  uuidActiveitems?: string;
  uuidActiveCer?: string;
  open?: boolean;
  onClose?(): void;
  listInfo?:ILOANNormalCollateralV2StateFullInfoLegalOwners[];
  listDetail?: IPerson[];
}

const ModalTableInfoLegal: FunctionComponent<IModalTableInfoLegalProps> = (props) => {

  const { open = false, onClose, activeSubType = "", uuIdData = "", listInfo, uuidActiveitems, uuidActiveCer,listDetail} = props;

  const dispatch = useDispatch();
  
  const dataUserListLegaDetails = useSelector(getLOANormalStoreLegalCertifiCatePersionListLegalData(
    uuIdData ?? '',
    activeSubType ?? '',
    uuidActiveCer ?? ''
  ))

  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [listOwner, setListOwner] = useState<IPerson[]>(listDetail ?? []);
  const checkRef =  useRef<CheckboxRef>(null);

  useEffect(() => {
    if (listDetail !== listOwner){
      setListOwner(listDetail ?? [] )
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDetail])


  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    onClose && onClose();
  }

  const onChangeOwner = () => {
    const listUser =[...listOwner]
    if(checkRef.current?.getValue()[0].checked === false){
     const index = listUser?.findIndex( o => o.person_uuid === checkRef.current?.getValue()[0].value);
     if(index !== -1) listUser?.splice(index, 1);
     setListOwner(listUser);
 
    }
    if (checkRef.current?.getValue()[0].checked === true) {
      const index = listUser?.find(o => o.person_uuid === checkRef.current?.getValue()[0].value)?.person_uuid;
      const temp = listInfo?.map(i => {
        return {
          full_name: i.full_name,
          person_uuid: i.uuid,
          apart_owner_cert_item_uuid: ""
        }
      }
      ) ?? []
      if (index === undefined) {
        listUser.push(...temp?.filter( i => i.person_uuid === checkRef.current?.getValue()[0].value))

      }
      setListOwner(listUser);
    }

  };

  const onSave = ()=>{
    dispatch(setCollaretalCertificatePersion('',{
      uuidActiveData: uuIdData ?? '', 
      uuidActiveSubtype: activeSubType ?? '',
      uuidActiveitems: uuidActiveitems ?? '',
      uuidActiveCer: uuidActiveCer ?? '',
      listPerson: listOwner
    }))
    onClose && onClose();

  }

  const onClickCancel = ()=>{
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
        },
        '& .MuiPaper-elevation':{
          maxHeight:'calc(100% - 10px)'
        }
      }}
    >
      <IconButton onClick={onClose} color="error" sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
        Thêm chủ sở hữu
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
                  <TableCell align="center">TÊN CHỦ SỞ HỮU</TableCell>
                  <TableCell align="center">CMND/CCCD</TableCell>
                  <TableCell align="center">SỐ ĐIỆN THOẠI</TableCell>
                  <TableCell align="center" >CHỦ SỞ HỮU</TableCell>
                </TableRow>
              </TableHead>
              
              {
                (()=> {
                  if (listInfo?.length === 0) {
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
                         listInfo?.map((cbt, index) => {
                           return (
                             <TableRow key={index}> 
                               <TableCell width="50px" align="center">{index + 1}</TableCell>
                               <TableCell >{cbt.full_name}</TableCell>
                               <TableCell >{cbt.identity_num}</TableCell>
                               <TableCell align="center">{cbt.mobile_num}</TableCell>
                               <TableCell align="center" className="text-success flex-center">
                                 <Checkbox 
                                    ref={checkRef}
                                    onChange={onChangeOwner}
                                    options={[{
                                      value: cbt.uuid, checked: cbt.uuid === dataUserListLegaDetails?.find( o => o.person_uuid === cbt.uuid)?.person_uuid
                                    }]} 
                                 />
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
      <Divider className="my-6" />
      <Grid className='text-right'>
        <Button
          variant="contained"
          className="ml-4 rounded-0"
          color="error"
          onClick={onClickCancel}
          sx={{ minWidth: '100px' }}
        >HỦY</Button>

        <Button
          variant="contained"
          className="ml-4 rounded-0"
          color="primary"
          onClick={onSave}
          sx={{ minWidth: '100px' }}
        >LƯU</Button>
      </Grid>

    </Modal>
  )
}

export default ModalTableInfoLegal;