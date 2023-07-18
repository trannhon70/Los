import CloseIcon from "@mui/icons-material/Close";
import {
  Box, Button,
  Divider, Grid,
  IconButton, Typography
} from '@mui/material';
import clsx from 'clsx';
import { getStoredCorrdinatorLOANUsers, isFetchedCorrdinatorLOANUsers } from 'features/loan/corrdinator/corrdinatorUser/selector';
import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { IValidate } from 'types';
import { ICorrdinatorLOANUserNewData } from 'types/models/loan/corrdinator/user';
import { IApplyLos } from 'types/models/loan/normal/storageControl';
import AutocompleteCustom, { AutocompleteOption, AutocompleteRef } from 'views/components/base/AutocompleteCustom';
import TextArea, { TextAreaRef } from 'views/components/base/TextArea';
import Modal from "views/components/layout/Modal";
import { getValidate } from '../../utils';
import approvalStyle, { SXTypeUserList } from '../ModalApproval/style';

export interface ModalApply{
  username:string | number;
  reason:string;
}

export interface IModalReturnInitProps {
  open: boolean;
  onClose?: () => void;
  onSave?: () => void;
  userNameReturn?:string;
}

export interface IModalReturnInitRef{
  getValue(): IApplyLos;
  validate():boolean;
}
export interface ModalReturnInitComponent extends ForwardRefRenderFunction<IModalReturnInitRef, IModalReturnInitProps>{}

const ModalReturnInit: ModalReturnInitComponent = (props,ref) => {

  const { open, onClose, onSave,userNameReturn } = props;

  const selectRef = useRef<AutocompleteRef>(null);
  const textRef = useRef<TextAreaRef>(null);
  const classes = approvalStyle();
  const handleClose = () => {
    onClose && onClose();
  }
  const [msgCode, setMsgCode] = useState<IValidate>(getValidate());
  const [msgText, setMsgText] = useState<IValidate>(getValidate());
  const isFetchedUsers = useSelector(isFetchedCorrdinatorLOANUsers);
  const StoredCorrdinatorLOANUsers = useSelector(getStoredCorrdinatorLOANUsers);

  const generateUserList = (data: ICorrdinatorLOANUserNewData[], dept = 0): AutocompleteOption[] => {
    let rs: AutocompleteOption[] = [];
    data.forEach(group => {
      group.users.forEach(user => {
        rs.push({
          value: user.username,
          label: user.employee_name.toUpperCase(),
          group: group.title,
        })
      })
    })
    return rs;
  }

  const validateSelect = () => {
    if (!selectRef.current?.getValue()?.toString().length) {
      setMsgCode(getValidate("Vui lòng chọn", { name: "" }));
      return false;
    }
    if (!textRef.current?.getValue().toString().length) {
      setMsgText(getValidate("Vui lòng nhập lý do", { name: "" }));
      return false;
    }
    setMsgCode(getValidate());
    setMsgText(getValidate());
    return true;
  };

  useImperativeHandle(ref, () => ({
    getValue(){
      return {
        username:selectRef.current?.getValue()?.value ?? "",
        note:textRef.current?.getValue() ?? "",
        is_prev_user:false,
      }
    },
    validate(){
      return validateSelect()
    }
  }));


  useEffect(() => {
    if (!isFetchedUsers){
      // dispatch(fetchCorrdinatorLOANUserList({group_role_code: dataTile?.current_Group}));
    }
  })

  const handleSave = () => {
    onSave && onSave()
  }

  return (
    <Modal
      open={open} 
      onClose={handleClose}
      isStatic
      sx={{
        "& .MuiPaper-root": {
          minWidth: "550px",
          position: "relative",
          borderRadius: 0,

          "& .MuiDialogContent-root": {
            padding: "16px 24px",
            borderBottom: "unset !important",
          },

          "& .MuiDialogActions-root": {
            padding: "0px 24px 30px 24px",
          },
        },
      }}
      footer={
        <Box>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            style={{ borderRadius: "unset" }}
          >
            TRẢ KẾT QUẢ
          </Button>
        </Box>
      }
    >
      <Box>
        <Typography
          variant="h5"
          component="div"
          className="text-upper text-primary font-medium text-18 pb-3"
        >
         CHUYỂN TRẢ HỒ SƠ
        </Typography>
        <IconButton
          onClick={onClose}
          color="error"
          sx={{ position: "absolute", right: "0.8rem", top: "0.5rem" }}
        >
          <CloseIcon />
        </IconButton>
        <Box className="flex-center">
          <Grid container spacing={3} >
            <Grid item xl={12} md={12} xs={12}>
              <AutocompleteCustom 
                label={`1. Người nhận hồ sơ`}
                required
                ref={selectRef}
                disabled={true}
                sx={SXTypeUserList}
                message={msgCode.message}
                className={clsx(classes.approval,'select-user')}
                options={generateUserList(StoredCorrdinatorLOANUsers)}
                value={userNameReturn}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextArea
                label="2. Lý do"
                required
                message={msgText.message}
                ref={textRef}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: "1px",
            margin: "10px 0px",
            borderColor: "#d5d5d5",
          }}
        />
      </Box>
    </Modal>
  )
}
export default forwardRef(ModalReturnInit);