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
import Empty from "views/components/layout/Empty";
import Checkbox, { CheckboxRef } from "views/components/base/Checkbox";
import { getInfoAllUserLegal } from "features/loan/normal/storage/collateralV2/selector";
import { Button, Divider, Radio } from "@mui/material";
import { ILandOwner, ILOANNormalCollateralV2StateFullInfoLegalOwners } from "types/models/loan/normal/storage/CollaretalV2";
import { setCollaretalOwnerModal } from "features/loan/normal/storage/collateralV2/actions";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import useNotify from "app/hooks/useNotify";

export interface IModalTableCoOwnersProps {
  activeSubType?: string;
  uuIdData?: string;
  open?: boolean;
  onClose?(): void;
  type?: string;
  listInfo?: ILandOwner[];
}

const ModalTableCoOwners: FunctionComponent<IModalTableCoOwnersProps> = (props) => {

  const { open = false, onClose, type= "", activeSubType = "", uuIdData = "", listInfo } = props;

  const dispatch = useDispatch();
  const notify = useNotify();
  const DataCoOwners = useSelector(getInfoAllUserLegal);
  // const infoOwner =  useSelector(getLOANormalStoreLegalOwnerLegalData(uuIdData, activeSubType))

  const [isOpen, setIsOpen] = useState<boolean>(open);
  // const [collateralType, setCollateralType] = useState<string>(type);
  const [listOwner, setListOwner] = useState<ILandOwner[]>([]);

  
  const checkRef =  useRef<CheckboxRef>(null);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if(listInfo !== listOwner){
      setListOwner(listInfo ?? [])
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listInfo])

  const handleClose = () => {
    onClose && onClose();
  }
  const onChangeOwner = () => { 
    //  const list
   
    const listUser= [...listOwner]
    if(checkRef.current?.getValue()[0].checked === false){
     const index = listUser?.findIndex( o => o.person_uuid === checkRef.current?.getValue()[0].value);
     if(index !== -1) listUser?.splice(index, 1);
     setListOwner(listUser);
 
    }
    if (checkRef.current?.getValue()[0].checked === true) {
      const index = listUser?.find(o => o.person_uuid === checkRef.current?.getValue()[0].value)?.person_uuid;
      const temp = DataCoOwners?.map(i => {
        return {
          full_name: i.full_name,
          authorized_persons: [],
          has_authorize: "N",
          person_uuid: i.uuid,
          active: 0,
          type: i.type,
        }
      }
      )
      if (index === undefined) {
        listUser.push(...temp?.filter( i => i.person_uuid === checkRef.current?.getValue()[0].value))

      }
      setListOwner(listUser);
    }
  };

  const onChangeSeparate = (value: string) =>()=> { 
    //  const list
      const temp = DataCoOwners?.map(i => {
        return {
          full_name: i.full_name,
          authorized_persons: [],
          has_authorize: "N",
          person_uuid: i.uuid,
          active: 0,
          type: i.type,
        }
      }
      )
    dispatch(setCollaretalOwnerModal('',{
      uuidActiveData: uuIdData ?? '', 
      uuidActiveSubtype: activeSubType ?? '',
      objdataLegal: temp?.filter( i => i.person_uuid === value)
    }))
    notify('Chọn người sở hữu thành công', 'success');
  };


  const onSave = ()=>{

    dispatch(setCollaretalOwnerModal('',{
      uuidActiveData: uuIdData ?? '', 
      uuidActiveSubtype: activeSubType ?? '',
      objdataLegal: listOwner
    }))
    onClose && onClose();

  }

  const onClickCancel = ()=>{
    dispatch(setCollaretalOwnerModal('',{
      uuidActiveData: uuIdData ?? '', 
      uuidActiveSubtype: activeSubType ?? '',
      objdataLegal: listInfo ?? []
    }))
    onClose && onClose();
  }
  let infoLegal: ILOANNormalCollateralV2StateFullInfoLegalOwners[] = [];


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
        Thêm đồng sở hữu
      </Typography>

      <Grid container >
        <Grid item xl={12} md={12} xs={12} >
          <TableContainer className="mt-2">
            <TableSticky
              className="mscb-table mscb-table-border"
              // sx= {SxTable}
            >
              <TableHead >
                <TableRow>
                  <TableCell width="50px" align="center">STT</TableCell>
                  <TableCell align="center">TÊN ĐỒNG SỞ HỮU</TableCell>
                  <TableCell align="center">CMND/CCCD</TableCell>
                  <TableCell align="center">SỐ ĐIỆN THOẠI</TableCell>
                  <TableCell align="center" >ĐỒNG SỞ HỮU</TableCell>
                </TableRow>
              </TableHead>
              
              {
                
                (()=> {
                  switch (type) {
                    case 'CO_BORROWER':
                       infoLegal = DataCoOwners?.filter( i => i.type === 'co_brw')
                       break;
                    case 'THIRD_PARTY':
                      infoLegal = DataCoOwners?.filter( i =>  { return i.type !== 'borrower' && i.type !== 'co_brw' })
                      break;
                    case 'SEPARATE_PROPERTY':
                      infoLegal = DataCoOwners?.filter( i => { return i.type === 'borrower' || i.type === 'marriage' })
                      break;
                  }
                  if (infoLegal?.length === 0) {
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
                      
                      infoLegal?.map((cbt, index) => {
                           return (
                             <TableRow key={index} > 
                               <TableCell width="50px" className="font-medium" align="center">{index + 1}</TableCell>
                               <TableCell className="font-medium" >{cbt.full_name.toUpperCase()}</TableCell>
                               <TableCell align="center" className="font-medium">{cbt.identity_num}</TableCell>
                               <TableCell align="center" className="font-medium">{cbt.mobile_num}</TableCell>
                               {(() => {
                                 if(type !== "SEPARATE_PROPERTY"){
                                  return (
                                    <TableCell align="center" className="text-success flex-center">
                                      <Checkbox
                                        sx={{
                                          "& .MuiCheckbox-root": {
                                            padding: '0px'
                                          }
                                        }}
                                        ref={checkRef}
                                        onChange={onChangeOwner}
                                        options={[{
                                          value: cbt.uuid, checked: cbt.uuid === listInfo?.find(o => o.person_uuid === cbt.uuid)?.person_uuid
                                        }]}
                                      />
                                    </TableCell>
                                  )
                                 }else {
                                  return (
                                    <TableCell align="center" className="text-success flex-center"
                                    sx={{
                                      "& .MuiRadio-root": {
                                        padding: '0px'
                                      }
                                    }}
                                    >
                                      <Radio
                                        checkedIcon={<CheckCircleIcon sx={{ fontSize: '22px' }} />}
                                        icon={<RadioButtonIcon sx={{ fontSize: '22px' }} />}
                                        className="flex-center"
                                        checked={cbt.uuid === listInfo?.find(o => o.person_uuid === cbt.uuid)?.person_uuid}
                                       
                                        // ref={checkRef}
                                        onClick={onChangeSeparate(cbt.uuid)}

                                      />
                                    </TableCell>
                                  )
                                 }
                               })()

                               }

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
      {
        (()=> {
          if(type !== "SEPARATE_PROPERTY"){
            return (
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
            )
          }
        })()
      }


    </Modal>
  )
}

export default ModalTableCoOwners;