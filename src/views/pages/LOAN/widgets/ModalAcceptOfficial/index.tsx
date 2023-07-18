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
import Radio, { RadioOption, RadioRef } from 'views/components/base/Radio';
import { IApprovedLos } from 'types/models/loan/normal/storageControl';
import { getValidate } from '../../utils';
import { IValidate } from 'types';

export interface IModalAcceptOfficialRef{
  getValue(): IApprovedLos;
  validate():boolean;
}

export interface IModalAcceptOfficialProps {
  open: boolean;
  onClose?: () => void;
  onSave?: () => void;
}

export interface ModalAcceptOfficialComponent extends ForwardRefRenderFunction<IModalAcceptOfficialRef, IModalAcceptOfficialProps>{}


const ModalAcceptOfficial: ModalAcceptOfficialComponent = (props,ref) => {

  const { open, onClose, onSave } = props;

  const handleClose = () => {
    onClose && onClose();
  }

  const handleSave = () => {
    onSave && onSave()
  }
  const [ destination, setDestination ] = useState('')
  const [msgText, setMsgText] = useState<IValidate>(getValidate());
  const textRef = useRef<TextAreaRef>(null);
  const radioRef = useRef<RadioRef>(null);

  const validateSelect = () => {
    if (!textRef.current?.getValue().toString().length) {
      setMsgText(getValidate("Vui lòng nhập lý do", { name: "" }));
      return false;
    }
    setMsgText(getValidate());
    return true;
  };


  useImperativeHandle(ref, () => ({
    getValue(){
      return {
        target:radioRef.current?.getValue().value ?? "",
        note:textRef.current?.getValue() ?? "",
      }
    },
    validate(){
      return validateSelect()
    }
  }));

  const handleChangeRadio = () => {
    setDestination(radioRef.current?.getValue().value ?? "")
  }

  const optionRadio: RadioOption[] = [
    {
      label: <span dangerouslySetInnerHTML={{__html: "Vùng - SCB Nam Sài Gòn"}}></span>,
      value: "REGION"
    },
    {
      label: <span dangerouslySetInnerHTML={{__html: "Phòng Phê Duyệt và Thẩm Định"}}></span>,
      value: "HEAD_HEADQUARTER"
    },
    {
      label: <span dangerouslySetInnerHTML={{__html: "PFS"}}></span>,
      value: "PFS"
    }
  ]

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
            disabled={!destination}
          >
            TRÌNH HỒ SƠ
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
          TRÌNH HỒ SƠ THẨM ĐỊNH - PHÊ DUYỆT
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
              <Radio 
                variant="checkbox"
                ref={radioRef}
                options={optionRadio}
                onChange={handleChangeRadio}
                value={destination}
                label="1. Trình hồ sơ đến"
                sx={{ 
                  "& .MuiFormGroup-root":{
                    flexDirection: 'column', display: 'flex'
                  }  
                }}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextArea
                label="2. Ghi chú"
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

export default forwardRef(ModalAcceptOfficial);