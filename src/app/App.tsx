import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import { 
  APP_NOTIFICATION_HORIZONTAL, 
  APP_NOTIFICATION_MAX_STACK, 
  APP_NOTIFICATION_VERTICAL 
} from 'utils/constants';
import i18n from './i18n';
import theme from './theme';
import store from './store';
import Loading from 'views/components/base/Loading';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalCss from 'views/includes/GlobalCss';
import AuthContext from 'views/includes/AuthContext';
import Guard from 'views/includes/Guard';
import AuthRoutes from './navigations/auth';
import Backdrop from 'views/components/base/Backdrop';
import PAGE_URL from './PageURL';

const useStyles = makeStyles(() => ({
  customSnackbarTop: {
    top: '70px!important',
  }
}));

const App: FC = () => {
  const classes = useStyles();

  return (
    <Provider store={ store }>
      <I18nextProvider i18n={ i18n }>
        <Suspense fallback={ <Loading /> }>
          <ThemeProvider theme={ theme }>
            
              <CssBaseline />
              <StyledEngineProvider injectFirst>
                <GlobalCss />
              </StyledEngineProvider>
              
              <SnackbarProvider
                autoHideDuration={3000}
                maxSnack={ APP_NOTIFICATION_MAX_STACK } 
                anchorOrigin={{
                  vertical: APP_NOTIFICATION_VERTICAL,
                  horizontal: APP_NOTIFICATION_HORIZONTAL,
                } as SnackbarOrigin}
                classes={{
                  containerRoot: classes.customSnackbarTop
                }}
              >
                <BrowserRouter basename={ PAGE_URL.BASE }>
                  <AuthContext>
                    <Routes>
                        <Route path="/*" element={ <Guard /> } />
                        {AuthRoutes.map((route, i) => {
                          const { component: AuthComponent, path = '/' } = route;
                          return <Route key={ i } path={ path } element={ AuthComponent ? <AuthComponent />: null } />
                        })}
                    </Routes>
                  </AuthContext>
                </BrowserRouter>
                <Backdrop />
              </SnackbarProvider>
          </ThemeProvider>
        </Suspense>
      </I18nextProvider>
    </Provider>
    
  )

}

export default App;
