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
// import { SxTable } from "./style";
import Empty from "views/components/layout/Empty";
import Checkbox, { CheckboxRef } from "views/components/base/Checkbox";
import { getInfoAllUserLegal, getLOANormalStoreLegalOwnerDetailLegalData } from "features/loan/normal/storage/collateralV2/selector";
import { Button, Divider } from "@mui/material";
import { IInfoAuthorize } from "types/models/loan/normal/storage/CollaretalV2";
import { setCollaretalHasAuthor } from "features/loan/normal/storage/collateralV2/actions";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
export interface IModalTableCoOwnersHasAuthorizeProps {
  open?: boolean;
  onClose?(): void;
  active?: string;
  activeSubType?: string;
  uuIdData?: string;
}

const ModalTableCoOwnersHasAuthorize: FunctionComponent<IModalTableCoOwnersHasAuthorizeProps> = (props) => {

  const { open = false, onClose, active, activeSubType = "", uuIdData = "" } = props;

  const dispatch = useDispatch();

  // const DataAllUserLegal = useSelector(getDataModalTableCoOwners);
  const infoHasAuthor = useSelector(getLOANormalStoreLegalOwnerDetailLegalData(uuIdData, activeSubType));
  const DataAllUserLegal = useSelector(getInfoAllUserLegal);
  const ruleDisabled = useSelector(getRuleDisbled)
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [listHasAuthor, setListHasAuthor] = useState<IInfoAuthorize[]>([]);
  const checkRef =  useRef<CheckboxRef>(null);

  useEffect(() => {
    open === isOpen || setIsOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);


  useEffect(() => {
    if (infoHasAuthor && infoHasAuthor.authorized_persons !== listHasAuthor) {
      setListHasAuthor(infoHasAuthor.authorized_persons)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoHasAuthor])


  const handleClose = () => {
    onClose && onClose();
  }

  const onSave = () => {
    dispatch(setCollaretalHasAuthor('', {
      uuidActiveData: uuIdData ?? '',
      uuidActiveSubtype: activeSubType ?? '',
      objdataLegal: listHasAuthor
    }))
    onClose && onClose();
  }

  const onClickCancel = () => {
    onClose && onClose();
  }

  const onChangeHasAuthor = () => {
    const listUser =[...listHasAuthor]
    if(checkRef.current?.getValue()[0].checked === false){
     const index = listHasAuthor?.findIndex( o => o.person_uuid === checkRef.current?.getValue()[0].value);
     if(index !== -1) listUser?.splice(index, 1);
     setListHasAuthor(listUser);
 
    }
    if (checkRef.current?.getValue()[0].checked === true) {
      const index = listUser?.find(o => o.person_uuid === checkRef.current?.getValue()[0].value)?.person_uuid;
      const temp = DataAllUserLegal?.map(i => {
        return {
          documents: [],
          full_name: i.full_name,
          person_uuid: i.uuid,
          owner_relationship: "",
          borrower_relationship: "",
          authorize_contract: "",
          owner_auth_uuid: ""
        }
      }
      )
      if (index === undefined) {
        listUser.push(...temp?.filter( i => i.person_uuid === checkRef.current?.getValue()[0].value))

      }
      setListHasAuthor(listUser);
    }
  };

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
        '& .MuiPaper-elevation': {
          maxHeight: 'calc(100% - 10px)'
        }
      }}
    >
      <IconButton onClick={onClose} color="error" sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
        Thêm người được ủy quyền
      </Typography>

      <Grid container >
        <Grid item xl={12} md={12} xs={12} >
          <TableContainer className="mt-2">
            <TableSticky
              className="mscb-table mscb-table-border"
              // sx={SxTable}
            >
              <TableHead >
                <TableRow>
                  <TableCell width="50px" align="center">STT</TableCell>
                  <TableCell align="center">TÊN NGƯỜI ĐƯỢC ỦY QUYỀN</TableCell>
                  <TableCell align="center">CMND/CCCD</TableCell>
                  <TableCell align="center">SỐ ĐIỆN THOẠI</TableCell>
                  <TableCell align="center" >NGƯỜI ĐƯỢC ỦY QUYỀN</TableCell>
                </TableRow>
              </TableHead>

              {
                (() => {
                  if (DataAllUserLegal?.filter(i => i.uuid !== active).length === 0) {
                    return (
                      <TableBody >
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Empty> Không có dữ liệu</Empty>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )
                  } else {
                    return <TableBody >
                      {
                        DataAllUserLegal?.filter(i => i.uuid !== active)?.map((cbt, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell width="50px" className="font-medium" align="center">{index + 1}</TableCell>
                              <TableCell className="font-medium" >{cbt.full_name.toUpperCase()}</TableCell>
                              <TableCell align="center" className="font-medium">{cbt.identity_num}</TableCell>
                              <TableCell align="center" className="font-medium">{cbt.mobile_num}</TableCell>
                              <TableCell align="center" className="text-success flex-center">
                                <Checkbox
                                  sx={{
                                    "& .MuiCheckbox-root": {
                                      padding: '0px'
                                    }
                                  }}  
                                   ref={checkRef}
                                   onChange={onChangeHasAuthor}
                                   options={[{
                                     value: cbt.uuid,
                                     disabled:ruleDisabled,
                                     checked: cbt.uuid === infoHasAuthor?.authorized_persons.find( o => o.person_uuid === cbt.uuid)?.person_uuid
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
          disabled={ruleDisabled}
          onClick={onSave}
          sx={{ minWidth: '100px' }}
        >LƯU</Button>
      </Grid>

    </Modal>
  )
}

export default ModalTableCoOwnersHasAuthorize;