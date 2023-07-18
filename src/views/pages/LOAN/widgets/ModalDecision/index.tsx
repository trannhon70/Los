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
import { getValidate } from '../../utils';
import { IValidate } from 'types';
import { IModalDecisionItem } from 'types/models/loan/normal/storageControl';


export interface IModalDecisionOfficialRef{
  getValue(): IModalDecisionItem;
  validate():boolean;
}

export interface IModalDecisionOfficialProps {
  open: boolean;
  onClose?: () => void;
  onSave?: () => void;
}

export interface ModalDecisionOfficialComponent extends ForwardRefRenderFunction<IModalDecisionOfficialRef, IModalDecisionOfficialProps>{}


const ModalDecisionOfficial: ModalDecisionOfficialComponent = (props,ref) => {

  const { open, onClose, onSave } = props;

  const handleClose = () => {
    onClose && onClose();
  }

  const handleSave = () => {
    onSave && onSave()
  }
  const [msgText, setMsgText] = useState<IValidate>(getValidate());
  const textRefReason = useRef<TextAreaRef>(null);
  const textRefNote = useRef<TextAreaRef>(null);
  const radioRef = useRef<RadioRef>(null);

  const validateSelect = () => {
    if (!textRefReason.current?.getValue().toString().length) {
      setMsgText(getValidate("Vui lòng nhập lý do", { name: "" }));
      return false;
    }
    setMsgText(getValidate());
    return true;
  };

  useImperativeHandle(ref, () => ({
    getValue(){
      return {
        optionsCheck:radioRef.current?.getValue().value ?? "",
        reason:textRefReason.current?.getValue() ?? "",
        note:textRefNote.current?.getValue() ?? "",
      }
    },
    validate(){
      return validateSelect()
    }
  }));

  const optionRadio: RadioOption[] = [
    {
      label: <span dangerouslySetInnerHTML={{__html: "Đồng ý"}}></span>,
      value: "Y",
      checked:radioRef.current?.getValue().value === "Y"
    },
    {
      label: <span dangerouslySetInnerHTML={{__html: "Từ chối"}}></span>,
      value: "N",
      checked:radioRef.current?.getValue().value === "N"
    },
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
          XỬ LÝ PHÊ DUYỆT
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
                value="Y"
                sx={{ 
                  "& .MuiFormGroup-root":{
                    flexDirection: 'column', display: 'flex'
                  }  
                }}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextArea
                label="1. Lý do"
                required
                message={msgText.message}
                ref={textRefReason}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextArea
                label="2. Ghi chú"
                ref={textRefNote}
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

export default forwardRef(ModalDecisionOfficial);