import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
// import { getStoredCorrdinatorUsers } from "features/corrdinator/corrdinatorUser/selector";
import { checkRoleButtonBar } from 'features/loan/normal/storageGuide/selector';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { IValidate } from 'types';
import { ApplyControl1 } from 'types/models/loan/normal/storageControl';
import { getValidate } from 'utils';
import Radio, { RadioOption, RadioRef } from 'views/components/base/Radio';
import TextArea, { TextAreaRef } from 'views/components/base/TextArea';
import Modal from 'views/components/layout/Modal';
import clsx from 'clsx';
import approvalStyle, {
  SXTypeUserList,
} from 'views/pages/LOAN/widgets/ModalApproval/style';
import { getStoredCorrdinatorUsers } from 'features/corrdinator/corrdinatorUser/selector';
import AutocompleteCustom, { AutocompleteOption, AutocompleteRef } from 'views/components/base/AutocompleteCustom';
import { ICorrdinatorLOANUserNewData } from 'types/models/loan/corrdinator/user';

export interface IModalControlHeadquarterProps {
  open: boolean;
  onClose?: () => void;
  onSave?: () => void;
}

export interface IModalControlHeadquarterRef {
  getValue(): ApplyControl1;
  validate(): boolean;
}
interface ModalControlHeadquarterComponent
  extends ForwardRefRenderFunction<
    IModalControlHeadquarterRef,
    IModalControlHeadquarterProps
  > {}

const ModalControlHeadquarter: ModalControlHeadquarterComponent = (
  props,
  ref
) => {
  const { open, onClose, onSave } = props;
  const classes = approvalStyle();

  const selectRef = useRef<AutocompleteRef>(null);
  const textRef = useRef<TextAreaRef>(null);
  const radioRef = useRef<RadioRef>(null);
  const [role, setRole] = useState<string>('')

  const [msgRole, setMsgRole] = useState<IValidate>(getValidate());
  const [msgCode, setMsgCode] = useState<IValidate>(getValidate());
  const [msgText, setMsgText] = useState<IValidate>(getValidate());
  const dataRole = useSelector(checkRoleButtonBar);
  useEffect(() => {
    if(dataRole?.current_state_group === 'REAPPRAISE_HEADQUARTER'){
      setRole("CONTROL")
      radioRef.current?.setValue("CONTROL")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataRole])
  const userList = useSelector(getStoredCorrdinatorUsers);
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
  // const generateUserList = (data: any, dept = 0): SelectOption[] => {
  //   let rs: SelectOption[] = [];
  //   data?.map((use: any) => {
  //     rs.push({
  //       label: use.title,
  //       value: use.title_code,
  //       isGroup: dept === 0 ? false : true,
  //       disabled: true,
  //     });
  //     if (use.users?.length) {
  //       use.users.map((l: any) => {
  //         rs.push({
  //           label: l.employee_name,
  //           value: l.username,
  //         });
  //         return null;
  //       }, dept + 1);
  //     }
  //     return null;
  //   });
  //   return rs;
  // };

  const optionRadio: RadioOption[] = [
    {
      label:  'CẤP KIỂM SOÁT' ,
      value: 'CONTROL',
      disabled: dataRole?.current_state_group === 'REAPPRAISE_HEADQUARTER',
    },
    {
      label:'CẤP PHÊ DUYỆT',
      value: 'APPROVAL',
      disabled: dataRole?.current_state_group === 'REAPPRAISE_HEADQUARTER',
    },
  ];
  const handleChangeRadio = () => {
    setRole(radioRef.current?.getValue()?.value ?? '');
  }
  const validateSelect = () => {
    if (!radioRef.current?.getValue()?.value) {
      setMsgRole(getValidate('Vui lòng chọn', { name: '' }));
      return false;
    }
    else {
      setMsgRole(getValidate('', { name: '' }));
    }

    if (!selectRef.current?.getValue()?.toString().length) {
      setMsgCode(getValidate('Vui lòng chọn', { name: '' }));
      return false;
    }
    else {
      setMsgCode(getValidate('', { name: '' }));
    }
    if (!textRef.current?.getValue().toString().length) {
      setMsgText(getValidate('Vui lòng nhập ghi chú', { name: '' }));
      return false;
    }
    else {
      setMsgText(getValidate('', { name: '' }));
    }
    setMsgRole(getValidate());
    setMsgCode(getValidate());
    setMsgText(getValidate());
    return true;
  };

  useImperativeHandle(ref, () => ({
    getValue() {
      return {
        username: selectRef.current?.getValue()?.value ?? '',
        is_prev_user: false,
        note: textRef.current?.getValue() ?? '',
        approval_level: radioRef.current?.getValue()?.value ?? "",
      };
    },
    validate() {
      return validateSelect();
    },
  }));

  const handleClose = () => onClose && onClose();
  const handleSave = () => onSave && onSave();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isStatic
      sx={{
        '& .MuiPaper-root': {
          minWidth: '550px',
          position: 'relative',
          borderRadius: 0,

          '& .MuiDialogContent-root': {
            padding: '16px 24px',
            borderBottom: 'unset !important',
          },

          '& .MuiDialogActions-root': {
            padding: '0px 24px 30px 24px',
          },
        },
      }}
      footer={
        <Box>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            style={{ borderRadius: 'unset', width: '130px' }}
          >
            Trình hồ sơ
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
          Trình hồ sơ
        </Typography>
        <IconButton
          onClick={onClose}
          color="error"
          sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}
        >
          <CloseIcon />
        </IconButton>
        <Box className="flex-center">
          <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
              <Radio
                label="1. Trình hồ sơ đến"
                required
                variant="checkbox"
                options={optionRadio}
                onChange={handleChangeRadio}
                ref={radioRef}
                value={role}
                sx={{
                  '& .MuiFormGroup-root': {
                    flexDirection: 'row',
                    display: 'flex',
                  },
                }}
              />
              {
                !!msgRole.message && <p className='m-0 text-12 text-danger'>{msgRole.message}</p> 
              }
            </Grid>
            <Grid item xl={12} md={12} xs={12}>
              <AutocompleteCustom
                label={`2. Người thực hiện`}
                // fullWidth
                disabled={!role}
                required
                message={msgCode.message}
                ref={selectRef}
                sx={SXTypeUserList}
                className={clsx(classes.approval, 'select-user')}
                options={generateUserList(userList)}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextArea
                disabled={!role}
                label="3. Ghi chú"
                required
                message={msgText.message}
                ref={textRef}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider
          sx={{
            borderBottomWidth: '1px',
            margin: '10px 0px',
            borderColor: '#d5d5d5',
          }}
        />
      </Box>
    </Modal>
  );
};
export default forwardRef(ModalControlHeadquarter);
