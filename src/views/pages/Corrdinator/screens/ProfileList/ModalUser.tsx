import CloseIcon from "@mui/icons-material/Close";
import {
  Box, Button,
  Divider, Grid,
  IconButton, Typography
} from '@mui/material';
import clsx from 'clsx';
import { getStoredCorrdinatorUsers } from "features/corrdinator/corrdinatorUser/selector";
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { IValidate } from "types";
import { ICorrdinatorDocumentList } from "types/models/corrdinator";
import { ICorrdinatorUserDataChange } from "types/models/corrdinator/user";
import { getValidate } from "utils";
import Autocomplete, { AutocompleteOption, AutocompleteRef } from "views/components/base/AutocompleteCustom";
import TextArea, { TextAreaRef } from 'views/components/base/TextArea';
import Modal from "views/components/layout/Modal";
import approvalStyle, { SXTypeUserList } from "views/pages/LOAN/widgets/ModalApproval/style";
export interface IModalUserGrandProps {
  open: boolean;
  onClose?: () => void;
  onSave?: () => void;
  data?: ICorrdinatorDocumentList;
}
interface IModalUserItem {
  reappraise_headquarter: string | number;
  note: string;
}
export interface IModalUserGrandRef {
  getValue(): IModalUserItem;
  validate(): boolean;
}
export interface ModalUserGrandComponent extends ForwardRefRenderFunction<IModalUserGrandRef, IModalUserGrandProps> { }

const ModalUserGrand: ModalUserGrandComponent = (props, ref) => {

  const { open, onClose, onSave } = props;
  const classes = approvalStyle();
  const selectRef = useRef<AutocompleteRef>(null);
  const textRef = useRef<TextAreaRef>(null);

  const [msgCode, setMsgCode] = useState<IValidate>(getValidate());
  const [msgText, setMsgText] = useState<IValidate>(getValidate());

  const userList = useSelector(getStoredCorrdinatorUsers)

  const generateUserList = (data: ICorrdinatorUserDataChange[], dept = 0): AutocompleteOption[] => {
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
      setMsgText(getValidate("Vui lòng nhập ghi chú", { name: "" }));
      return false;
    }
    setMsgCode(getValidate());
    setMsgText(getValidate());
    return true;
  };

  useImperativeHandle(ref, () => ({
    getValue() {
      return {
        reappraise_headquarter: selectRef.current?.getValue()?.value ?? "",
        note: textRef.current?.getValue() ?? "",
      }
    },
    validate() {
      return validateSelect()
    }
  }));

  const handleClose = () => onClose && onClose();
  const handleSave = () => onSave && onSave()



  return (
    <Modal
      open={open}
      onClose={handleClose}
      isStatic
      sx={{
        "& .MuiPaper-root": {
          minWidth: "650px",
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
            onClick={handleClose}
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: "unset", width: "100px" }}
          >
            HỦY
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            style={{ borderRadius: "unset", width: "120px" }}
          >
            ĐIỀU PHỐI
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
          ĐIỀU PHỐI THẨM ĐỊNH HỒ SƠ
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
              <Autocomplete
                label={`1. Người thẩm định`}
                // fullWidth
                required
                message={msgCode.message}
                ref={selectRef}
                className={clsx(classes.approval,'select-user')}
                sx={SXTypeUserList}
                options={generateUserList(userList)}
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
export default forwardRef(ModalUserGrand);

