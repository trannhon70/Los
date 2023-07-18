import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import {
  FaDownload, FaExchangeAlt,
  FaFolder, FaLock, FaPrint,
  FaShareAlt, FaTrash
} from 'react-icons/fa';
import { Button, Divider } from '@mui/material';
import clsx from 'clsx';

import pdfViewStyle from './style';

const PDFToolbar: FC = () => {
  const classes = pdfViewStyle();
  return <Grid container className={classes.toolbar} >
      <Grid item xl={2} lg={2} md={3} xs={12}>
        <Typography className='border'>Tổng hợp hồ sơ</Typography>
        <Divider orientation="vertical" flexItem />
      </Grid>
      <Grid item xl={2} lg={2} md={3} xs={12} className='folder'>
        <span> <FaFolder size="16px" color="#313fd2" /></span>
        <div className={clsx('folder-icon-text ellipsis bg-white')}>0 tập tin</div>
      </Grid>

      <Grid item xl={8} lg={8} md={6} xs={12} className='icon'>
        <Button className="function-button"><FaDownload /></Button>
        <Divider orientation="vertical" flexItem className="divider" />
        <Button className="function-button"><FaExchangeAlt /></Button>
        <Divider orientation="vertical" flexItem className="divider" />
        <Button className="function-button"><FaShareAlt /></Button>
        <Divider orientation="vertical" flexItem className="divider" />
        <Button className="function-button"><FaLock /></Button>
        <Divider orientation="vertical" flexItem className="divider" />
        <Button className="function-button"><FaPrint /></Button>
        <Divider orientation="vertical" flexItem className="divider" />
        <Button className="function-button warning"><FaTrash color="#eb0029" /></Button>
      </Grid>
    </Grid>;
};
export default PDFToolbar;