import { FC, useRef, useState, useEffect, MouseEvent, useMemo, KeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuthErrors, getIsAuth, getIsFetching, login } from "features/auth/store/slice";
import { useDispatch, useSelector } from "react-redux";
import { IValidate } from "types";
import { getValidate, updateDocumentTitle } from "utils";
import { useTranslation } from "react-i18next";
import Input, { InputRef } from "views/components/base/Input";
import Checkbox, { CheckboxRef } from "views/components/base/Checkbox";
import clsx from "clsx";
import loginStyle from "./style";
import history from "app/history";
import PAGE_URL from "app/PageURL";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Loading from "views/components/base/Loading";
import Language from "views/components/layout/Language";
import Scrollbar from 'views/components/layout/Scrollbar';
import AlertMessage from "views/components/layout/AlertMessage";
import { Validator } from "utils/validate";
import FormRow from "views/components/base/FormRow";
import SliderSwiper from "views/components/layout/Slider";
import logo from "assets/images/logo/scb-topbar.png";
import ModalForgotPassword from "views/components/layout/ModalForgotPassword";

const LoginPage: FC = () => {
  const classes = loginStyle();

  const username =useRef<InputRef>(null);
  const password =useRef<InputRef>(null);
  const remember =useRef<CheckboxRef>(null);

  const location = useLocation();
  const isFetching = useSelector(getIsFetching);
  const isAuth = useSelector(getIsAuth);
  const errors = useSelector(getAuthErrors);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [ showPassword, setShowPassword ] =useState<boolean>(false);
  const [ msgUsername, setMsgUsername ] =useState<IValidate>(getValidate());
  const [ msgPassword, setMsgPassword ] =useState<IValidate>(getValidate());
  const [ showModalForgotPassword, setModalForgotPassword ] = useState<boolean>(false);

  useEffect(() => {
    updateDocumentTitle(t('Pages.Login.Title'));
  });

 useEffect(() => {
    isAuth && history.push(PAGE_URL.Dashboard);
  }, [ isAuth ]);

  const labelUsername = t('Pages.Login.Username');
  const labelPassword = t('Pages.Login.Password');
  const labelEnter = t('Common.Enter');
  const labelRemember = t('Pages.Login.Remember');

  const getUsername = () => username.current?.getValue() ?? '';
  const getPassword = () => password.current?.getValue() ?? '';

  const KeyupInput = (e: KeyboardEvent<HTMLInputElement>) => e.code === 'Enter' && handleClickLogin();

  const validateUsername = () => {
    if (Validator.empty(getUsername())){
      setMsgUsername(getValidate('Common.Error.Empty', { name: labelUsername }));
      return false;
    }

    setMsgUsername(getValidate());
    return true;
  }

  const validatePassword = () => {
    const _password = getPassword();

    if (Validator.empty(_password)){
      setMsgPassword(getValidate('Common.Error.Empty', { name: labelPassword }));
      return false;
    }
    if (Validator.maxLength(_password, 3, false)){
      setMsgPassword(getValidate('Common.Error.MinLength', { name: labelPassword, length: 3 }));
      return false;
    }

    setMsgPassword(getValidate());
    return true;
  }

  const validate = () => validateUsername() && validatePassword();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const onCloseModalForgotPassword= () => {
    setModalForgotPassword(false);
  }

  const handleModalForgotPassword= () => {
    setModalForgotPassword(true);
  }
  const handleClickLogin = () => {
    if (isFetching || !validate()) return;

    const data = {
      username: getUsername(),
      password: getPassword(),
      remember: remember.current?.getChecked()[0] ?? false,
      state: location.state
    }

    dispatch(login(data));
  }

  const loginClass = clsx("mscb-login-page flex-center h-full", classes.page);
  const titleClass = clsx(classes.title, "pb-2 text-upper");

  const AddonPassword = useMemo(() => {
    return <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        { showPassword ? <Visibility /> : <VisibilityOff /> }
      </IconButton>
    </InputAdornment>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ showPassword ]);

  return (
    <div className={loginClass}>
      { 
        !!errors.length && 
        <AlertMessage open variant="error" autoClose>
          { errors[0].detail }
        </AlertMessage>
      }
      <Grid container className="h-full">
        <Grid item lg={8} md={6} sm={6} xs={false}>
        <img src = {logo} alt='logo' style={{position:'absolute',zIndex:'1000',margin:'48px 0 0 61px',height:'4rem'}} />
          <SliderSwiper />
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12} className="h-full">
          <Scrollbar className={classes.scrollLogin}  >
            <div className="px-20 bg-white h-full relative flex-column flex-center">
              <div className="w-full">
                <Typography component="h1" variant="h4" sx={{fontWeight:700,color:'#353535'}}>
                  <span className={titleClass}>{ t('Pages.Login.Title') }</span>
                </Typography>
                <Box component="p" className="text-primary mt-6">
                  { t('Pages.Login.Description', { app_name: t('App.Name') }) }
                </Box>
                <Box component="div" className="mt-8">
                  <FormRow>
                    <Input
                      ref={ username }
                      label={ labelUsername }
                      placeholder={ labelEnter }
                      message={ msgUsername.message ? t(msgUsername.message, msgUsername.params) : '' }
                      onKeyup={KeyupInput}
                    />
                  </FormRow>
                  <FormRow>
                    <Input
                      ref={ password }
                      type={ showPassword ? 'text' : 'password' }
                      label={ labelPassword }
                      placeholder={ labelEnter }
                      suffix={ AddonPassword }
                      message={ msgPassword.message ? t(msgPassword.message, msgPassword.params) : '' }
                      onKeyup={KeyupInput}
                    />
                  </FormRow>
      
                  <div className="flex justify-between items-center mb-3">
                    <Checkbox ref={ remember } className="text-primary">
                      { labelRemember }
                    </Checkbox>
                    <Typography onClick={handleModalForgotPassword} component="span" className="text-primary" sx={{fontSize: '14px', cursor: 'pointer'}}>
                      <em>{ t('Pages.Login.Forgot') }</em>
                    </Typography>
                  </div>

                  <div className="flex flex-wrap items-center mb-4">
                    <div className="relative w-full">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        style={{ height: '48px' }}
                        onClick={ handleClickLogin }
                      >
                        {t('Pages.Login.Button')}
                        
                      </Button>
                      
                    </div>
                  </div>
                  
                </Box>

                <div className="flex-center">
                  <Language />
                </div>

              </div>
            </div>
          </Scrollbar>
        </Grid>
      </Grid>
      <ModalForgotPassword
        id={3}
        openModal={showModalForgotPassword}
        handleCloseModal={onCloseModalForgotPassword}
      />
    </div>
  );
};

export default LoginPage;