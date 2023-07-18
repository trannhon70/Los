import { FC, Fragment } from 'react';
import Category from './Category';
import { Divider, Grid } from '@mui/material';
import History from './History';
import ListMetadata from './ListMetadata';
import Info from './Info';
import PdfViewer from './PdfView';
import formStyle from './style';
import clsx from "clsx";
import ButtonBar from 'views/components/layout/ButtonBar';
const Forms: FC = () => {
  const classes = formStyle();
  return <Fragment>

   <Grid container spacing={2} columnSpacing="20px" rowSpacing="20px" className={clsx(classes.root,"pt-5")}>
    <Grid item xl={3} lg={12} md={12} xs={12}>
      <Category />
    </Grid>
    <Grid item xl={6} lg={12} md={12} xs={12} className={classes.viewPdf}>
      <PdfViewer />
      <Info />
    </Grid>
    <Grid item xl={3} lg={12} md={12} xs={12}>
      <ListMetadata />
      <History />
    </Grid>

  </Grid>
    <Divider className="my-6" />
    <ButtonBar
    disableContinue
    disableDelete
    disableExit
    disableSave
      className="pb-6"
    // onSave={ onSave }
    // onContinue={ onContinue }
    // onBack={ onBack }
    // onExit={ onExit }
    />
  </Fragment>

}

export default Forms;