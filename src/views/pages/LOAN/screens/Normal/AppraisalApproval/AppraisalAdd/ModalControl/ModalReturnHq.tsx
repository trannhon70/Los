import {
    Box,
    Grid,
    IconButton,
    Button,
    Divider,
    Typography
  } from '@mui/material';
  import Modal from "views/components/layout/Modal";
  import CloseIcon from "@mui/icons-material/Close";
  import TextArea, { TextAreaRef } from 'views/components/base/TextArea';
  import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef, useState } from "react";
  import Select, { SelectOption, SelectRef } from 'views/components/base/Select';
  import { IApplyLos } from 'types/models/loan/normal/storageControl';
  import { IValidate } from 'types';
import { getValidate } from 'utils';
import { useSelector } from 'react-redux';
import { getStoredCorrdinatorUsers } from 'features/corrdinator/corrdinatorUser/selector';
import clsx from 'clsx';
import approvalStyle, { SXTypeUserList } from 'views/pages/LOAN/widgets/ModalApproval/style';

  
  export interface ModalApply{
    username:string | number;
    reason:string;
  }
  
  export interface IModalReturnHQProps {
    open: boolean;
    onClose?: () => void;
    onSave?: () => void;
  }
  
  export interface IModalReturnHQRef{
    getValue(): IApplyLos;
    validate():boolean;
  }
  export interface ModalReturnHQComponent extends ForwardRefRenderFunction<IModalReturnHQRef, IModalReturnHQProps>{}
  
  const ModalReturnHQ: ModalReturnHQComponent = (props,ref) => {
  
    const { open, onClose, onSave } = props;
  
    const selectRef = useRef<SelectRef>(null);
    const textRef = useRef<TextAreaRef>(null);
    const classes = approvalStyle();
    const handleClose = () => {
      onClose && onClose();
    }
    const [msgCode, setMsgCode] = useState<IValidate>(getValidate());
    const [msgText, setMsgText] = useState<IValidate>(getValidate());
    
    const userList = useSelector(getStoredCorrdinatorUsers)

   
    const generateUserList = (data: any, dept = 0): SelectOption[] => {
      let rs: SelectOption[] = [];
      data?.map((use: any) => {
        rs.push({
          label: use.title,
          value: use.title_code,
          isGroup: dept === 0 ? false : true,
          disabled: true
        })
        if (use.users?.length) {
          use.users.map((l: any) => {
            rs.push({
              label: l.employee_name,
              value: l.username,
            })
            return null;
          }, dept + 1)
  
        }
        return null;
      })
      return rs;
    }
  
    const validateSelect = () => {
      if (!selectRef.current?.getValue().toString().length) {
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
          username:selectRef.current?.getValue() ?? "",
          note:textRef.current?.getValue() ?? "",
          is_prev_user:false,
        }
      },
      validate(){
        return validateSelect()
      }
    }));
  
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
                <Select 
                  label={`1. Người nhận hồ sơ`}
                  fullWidth
                  required
                  ref={selectRef}
                  message={msgCode.message}
                  options={generateUserList(userList)}
                  className={clsx(classes.approval,'select-user')}
                  sx={SXTypeUserList}
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
  export default forwardRef(ModalReturnHQ);